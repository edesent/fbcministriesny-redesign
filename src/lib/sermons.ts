// Sermons are pulled from the church's YouTube channel — the latest videos for
// the archive (via the channel's public RSS feed) and a live-broadcast check so
// the page can surface a service that's streaming right now. No API key needed.
// Set the channel in `youtube` (site.ts); everything no-ops gracefully until then.

import { youtube } from "@/lib/site";

export type Sermon = {
  videoId: string;
  title: string;
  published: string;
  thumbnail: string;
  views?: number;
};

export const YOUTUBE_CHANNEL_URL = youtube.channelUrl;

function unescapeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function fetchSermons(): Promise<Sermon[]> {
  if (!youtube.channelId) return [];
  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtube.channelId}`;
    // Refresh every 30s so a just-finished live stream / new upload appears near
    // the top quickly (it sorts by created date when its title has no date).
    const res = await fetch(feedUrl, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const entries: Sermon[] = [];
    for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const entry = match[1];
      const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      const thumbnail = entry.match(/<media:thumbnail\s+url="([^"]+)"/)?.[1];
      const views = entry.match(/views="(\d+)"/)?.[1];

      if (videoId && title && published && thumbnail) {
        entries.push({
          videoId,
          title: unescapeXml(title),
          published,
          thumbnail,
          views: views ? Number(views) : undefined,
        });
      }
    }

    // Drop placeholder "test" uploads, then order by the date written in the
    // title, newest first — the YouTube upload date is meaningless here because
    // the videos were all uploaded together. Same-day videos keep their trailing
    // part number order (e.g. "... 2025 04 13 1", "... 2", "... 3").
    return entries
      .filter((e) => e.title.trim().toLowerCase() !== "test")
      .sort((a, b) => titleDate(b) - titleDate(a) || titlePart(a) - titlePart(b));
  } catch {
    return [];
  }
}

// Sortable timestamp from the date written in the title. Handles year-first
// ("2025 04 13", any of space/-/./_ separators) and month-first ("5-24-20" /
// "5/24/2020"); falls back to the upload date when no title date is present.
function titleDate(s: Sermon): number {
  const ymd = s.title.match(/\b(20\d{2})[\s._\-/]+(\d{1,2})[\s._\-/]+(\d{1,2})\b/);
  if (ymd) {
    const [, y, mo, d] = ymd.map(Number);
    if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) return Date.UTC(y, mo - 1, d);
  }
  const mdy = s.title.match(/\b(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})\b/);
  if (mdy) {
    const mo = Number(mdy[1]);
    const d = Number(mdy[2]);
    let y = Number(mdy[3]);
    if (y < 100) y += 2000;
    if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) return Date.UTC(y, mo - 1, d);
  }
  return Date.parse(s.published) || 0;
}

// Trailing part number on same-day services ("... 2025 04 13 2" → 2), else 0.
// Only consulted for year-first dated titles, where a number after the day is
// the service/part index.
function titlePart(s: Sermon): number {
  if (!/\b20\d{2}[\s._\-/]+\d{1,2}[\s._\-/]+\d{1,2}/.test(s.title)) return 0;
  const m = s.title.trim().match(/(\d{1,2})\s*$/);
  return m ? Number(m[1]) : 0;
}

export function formatSermonDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Keyless live detection — the same method the Bellingham site uses. When a
// broadcast is active, YouTube serves /channel/{id}/live as the live watch page:
// the canonical link points at the live video, "isLive":true is present, and the
// OFFLINE / upcoming flags are absent. (Reliability depends on the channel not
// having stray scheduled/old streams cluttering its /live page.)
export async function getLiveVideoId(): Promise<string | null> {
  if (!youtube.channelId) return null;
  try {
    const res = await fetch(
      `https://www.youtube.com/channel/${youtube.channelId}/live`,
      {
        next: { revalidate: 30 },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    );
    if (!res.ok) return null;
    const html = await res.text();

    const videoId =
      html.match(
        /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]+)"/,
      )?.[1] ?? null;
    if (!videoId) return null;

    const offline =
      /"status":"LIVE_STREAM_OFFLINE"/.test(html) || /"isUpcoming":true/.test(html);
    const isLive = !offline && /"isLive":true/.test(html);
    return isLive ? videoId : null;
  } catch {
    return null;
  }
}
