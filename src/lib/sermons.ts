// Sermons are pulled from the church's YouTube channel — the latest videos for
// the archive (via the channel's public RSS feed) and a live-broadcast check so
// the page can surface a service that's streaming right now. No API key needed.
// Set the channel in `youtube` (site.ts); everything no-ops gracefully until then.

import { site, youtube } from "@/lib/site";

export type Sermon = {
  videoId: string;
  title: string;
  published: string;
  thumbnail: string;
  views?: number;
  // For live broadcasts: when the service actually started (from the YouTube
  // Data API). The RSS `published` time is when YouTube finished publishing the
  // recording — often hours later, sometimes tipping past midnight — so it's
  // unreliable as the service date. Undefined for ordinary uploads.
  liveStart?: string;
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
    // The Data API's uploads playlist returns the whole archive. The RSS feed
    // (fallback when there's no key) only returns the latest ~15 uploads — so a
    // batch of back-dated uploads can push genuinely-recent services (e.g. live
    // streams) out of view, which is why we prefer the API when we have a key.
    const sermons =
      (await fetchUploadsViaApi()) ?? (await fetchSermonsViaRss());

    // Live broadcasts have no date in their title and an unreliable publish
    // time — look up when each actually started so its date is correct.
    await attachLiveStartTimes(sermons);

    // Order by service date, newest first: the date written in the title when
    // present (the bulk-upload date is meaningless), otherwise the live/upload
    // time. Same-day videos keep their trailing part-number order ("... 1/2/3").
    return sermons.sort(
      (a, b) => sermonTime(b) - sermonTime(a) || titlePart(a) - titlePart(b),
    );
  } catch {
    return [];
  }
}

// The full archive via the Data API's uploads playlist. Pages through the whole
// channel (50 per page, capped for safety) so back-dated uploads can't bury a
// genuinely-recent service. Returns null without a key (caller falls back to RSS).
async function fetchUploadsViaApi(): Promise<Sermon[] | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || !youtube.channelId) return null;
  // A channel's uploads playlist shares its ID with the channel, "UC" → "UU".
  const uploadsId = `UU${youtube.channelId.slice(2)}`;
  const sermons: Sermon[] = [];
  let pageToken = "";
  try {
    for (let page = 0; page < 8; page++) {
      const url =
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet` +
        `&maxResults=50&playlistId=${uploadsId}&key=${key}` +
        (pageToken ? `&pageToken=${pageToken}` : "");
      const res = await fetch(url, {
        next: { revalidate: 300 },
        headers: { Referer: site.url },
      });
      if (!res.ok) return sermons.length ? sermons : null;
      const data = (await res.json()) as {
        nextPageToken?: string;
        items?: {
          snippet?: {
            title?: string;
            publishedAt?: string;
            resourceId?: { videoId?: string };
            thumbnails?: Record<string, { url?: string }>;
          };
        }[];
      };
      for (const item of data.items ?? []) {
        const s = item.snippet;
        const videoId = s?.resourceId?.videoId;
        const title = s?.title?.trim();
        const published = s?.publishedAt;
        if (!videoId || !title || !published) continue;
        // Skip placeholders and removed videos.
        if (/^(test|private video|deleted video)$/i.test(title)) continue;
        const thumbnail =
          s?.thumbnails?.high?.url ??
          s?.thumbnails?.medium?.url ??
          s?.thumbnails?.default?.url ??
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        sermons.push({ videoId, title, published, thumbnail });
      }
      if (!data.nextPageToken) break;
      pageToken = data.nextPageToken;
    }
    return sermons;
  } catch {
    return sermons.length ? sermons : null;
  }
}

// The latest ~15 uploads via the public RSS feed (no API key required).
async function fetchSermonsViaRss(): Promise<Sermon[]> {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtube.channelId}`;
  const res = await fetch(feedUrl, { cache: "no-store" });
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

  return entries.filter((e) => e.title.trim().toLowerCase() !== "test");
}

// Fill in `liveStart` for entries that look like live broadcasts (no date in
// the title). Best-effort: needs YOUTUBE_API_KEY; silently no-ops without it,
// leaving those entries to fall back to their RSS publish time.
async function attachLiveStartTimes(sermons: Sermon[]): Promise<void> {
  const key = process.env.YOUTUBE_API_KEY;
  const live = sermons.filter((s) => !titleDateParts(s.title));
  if (!key || live.length === 0) return;
  try {
    const ids = live.map((s) => s.videoId).slice(0, 50);
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${ids.join(",")}&key=${key}`,
      { cache: "no-store", headers: { Referer: site.url } },
    );
    if (!res.ok) return;
    const data = (await res.json()) as {
      items?: { id: string; liveStreamingDetails?: { actualStartTime?: string } }[];
    };
    const startById = new Map<string, string>();
    for (const item of data.items ?? []) {
      const start = item.liveStreamingDetails?.actualStartTime;
      if (start) startById.set(item.id, start);
    }
    for (const s of live) {
      const start = startById.get(s.videoId);
      if (start) s.liveStart = start;
    }
  } catch {
    // Leave liveStart unset — callers fall back to the publish time.
  }
}

// [year, month, day] written in the title, or null. Handles year-first
// ("2025 04 13", any of space/-/./_ separators) and month-first ("5-24-20" /
// "5/24/2020"). Live streams ("Live June 04") have no numeric date → null.
function titleDateParts(title: string): [number, number, number] | null {
  const ymd = title.match(/\b(20\d{2})[\s._\-/]+(\d{1,2})[\s._\-/]+(\d{1,2})\b/);
  if (ymd) {
    const [, y, mo, d] = ymd.map(Number);
    if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) return [y, mo, d];
  }
  const mdy = title.match(/\b(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})\b/);
  if (mdy) {
    const mo = Number(mdy[1]);
    const d = Number(mdy[2]);
    let y = Number(mdy[3]);
    if (y < 100) y += 2000;
    if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) return [y, mo, d];
  }
  return null;
}

// Sortable timestamp: the date written in the title when present (the bulk
// upload date is meaningless — every past service was uploaded together), else
// the live broadcast's actual start time, falling back to the publish time.
function sermonTime(s: Sermon): number {
  const parts = titleDateParts(s.title);
  if (parts) return Date.UTC(parts[0], parts[1] - 1, parts[2]);
  return Date.parse(s.liveStart || s.published) || 0;
}

// Trailing part number on same-day services ("... 2025 04 13 2" → 2), else 0.
// Only consulted for year-first dated titles, where a number after the day is
// the service/part index.
function titlePart(s: Sermon): number {
  if (!/\b20\d{2}[\s._\-/]+\d{1,2}[\s._\-/]+\d{1,2}/.test(s.title)) return 0;
  const m = s.title.trim().match(/(\d{1,2})\s*$/);
  return m ? Number(m[1]) : 0;
}

// The church's timezone — live-stream publish timestamps are in UTC, so a
// service that went up at e.g. 02:00 UTC must read as the prior evening here.
const CHURCH_TZ = "America/New_York";

const DATE_FMT = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

// The date to show for a sermon. Past services use the date written in their
// title (their upload date is meaningless — all bulk-uploaded together); live
// streams have no date in the title, so we use the publish date in church time.
export function sermonDate(s: Sermon): string {
  const parts = titleDateParts(s.title);
  if (parts) {
    // Built in UTC, formatted in UTC, so the title date is shown verbatim.
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).toLocaleDateString(
      "en-US",
      { ...DATE_FMT, timeZone: "UTC" },
    );
  }
  return new Date(s.liveStart || s.published).toLocaleDateString("en-US", {
    ...DATE_FMT,
    timeZone: CHURCH_TZ,
  });
}

// A live broadcast — placeholder title ("Live June 04", "... Live Stream") with
// no date written into it. These get their date from the actual broadcast time.
export function isLiveStream(s: Sermon): boolean {
  return /\blive\b/i.test(s.title) && !titleDateParts(s.title);
}

// The title with a trailing written date / part index stripped ("Worship
// Service 2025 12 14 1" → "Worship Service") — the date is shown separately.
export function sermonTitle(s: Sermon): string {
  // Live streams get a clean label with the real service date baked in (their
  // raw title carries no usable date), so callers don't show the date twice.
  if (isLiveStream(s)) return `Live Stream — ${sermonDate(s)}`;
  const cleaned = s.title
    .replace(/\b20\d{2}[\s._\-/]+\d{1,2}[\s._\-/]+\d{1,2}(\s+\d{1,2})?\s*$/, "")
    .replace(/\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\s*$/, "")
    .trim();
  return cleaned || s.title;
}

// The live video to show, if any:
//  1) keyless scrape of /channel/<id>/live (same as Bellingham — instant),
//  2) if that finds nothing, the YouTube Data API (reliable backup; needs
//     YOUTUBE_API_KEY). FBC's channel clutters its /live page, so the API is
//     what actually catches its lives.
export async function getLiveVideoId(opts?: { noStore?: boolean }): Promise<string | null> {
  const viaScrape = await fetchLiveScrape(opts);
  if (viaScrape) return viaScrape;
  return fetchLiveViaApi(opts);
}

// Keyless scrape of the channel's /live page. When a broadcast is active YouTube
// serves it as the live watch page (canonical → live video, "isLive":true, no
// OFFLINE/upcoming flags). Misses lives on channels with stray scheduled streams.
async function fetchLiveScrape(opts?: { noStore?: boolean }): Promise<string | null> {
  if (!youtube.channelId) return null;
  try {
    const res = await fetch(
      `https://www.youtube.com/channel/${youtube.channelId}/live`,
      {
        ...(opts?.noStore ? { cache: "no-store" } : { next: { revalidate: 30 } }),
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

type YtVideosResponse = {
  items?: { id: string; snippet?: { liveBroadcastContent?: string } }[];
};

// Distinct video IDs scraped (free) from the channel's home page. YouTube
// features a current live stream there first, so this catches a fresh live that
// hasn't hit the RSS feed yet.
async function channelPageVideoIds(opts?: { noStore?: boolean }): Promise<string[]> {
  if (!youtube.channelId) return [];
  try {
    const res = await fetch(`https://www.youtube.com/channel/${youtube.channelId}`, {
      ...(opts?.noStore ? { cache: "no-store" } : { next: { revalidate: 30 } }),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const ids: string[] = [];
    for (const m of html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)) {
      if (!ids.includes(m[1])) ids.push(m[1]);
      if (ids.length >= 40) break;
    }
    return ids;
  } catch {
    return [];
  }
}

// Reliable backup: gather candidate video IDs (channel home page + RSS feed),
// then ask the YouTube Data API which — if any — is broadcasting right now.
// videos.list is ~1 quota unit per check (cheap enough to poll constantly). The
// key is referrer-restricted to the site, so we send the matching Referer header.
async function fetchLiveViaApi(opts?: { noStore?: boolean }): Promise<string | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || !youtube.channelId) return null;
  try {
    const [pageIds, recent] = await Promise.all([
      channelPageVideoIds(opts),
      fetchSermons(),
    ]);
    const ids = Array.from(
      new Set([...pageIds, ...recent.map((s) => s.videoId)]),
    ).slice(0, 50);
    if (!ids.length) return null;
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids.join(",")}&key=${key}`,
      {
        ...(opts?.noStore ? { cache: "no-store" } : { next: { revalidate: 30 } }),
        headers: { Referer: site.url },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as YtVideosResponse;
    return data.items?.find((i) => i.snippet?.liveBroadcastContent === "live")?.id ?? null;
  } catch {
    return null;
  }
}
