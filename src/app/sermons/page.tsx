import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import SermonGrid from "@/components/SermonGrid";
import {
  getLiveVideoId,
  fetchSermons,
  YOUTUBE_CHANNEL_URL,
} from "@/lib/sermons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch recent sermons and online services from Faith Bible Church in Sprakers, New York. Services streamed live on YouTube.",
};

// Refresh every 30s so a live stream shows up within half a minute of going live,
// without re-checking YouTube on every single page load.
export const revalidate = 30;

export default async function SermonsPage() {
  const [sermons, liveVideoId] = await Promise.all([fetchSermons(), getLiveVideoId()]);
  const latest = sermons[0];
  const archive = sermons.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Watch & Listen"
        title="Sit under the preaching of the Word."
        intro="Services and devotionals are streamed on YouTube and gathered here. Whether you're away or new to us, you're welcome to listen in."
      />

      {liveVideoId ? (
        <section className="sermon-feature sermon-feature-live">
          <div className="sermon-feature-head">
            <span className="sermon-live-tag">
              <span className="sermon-live-dot" aria-hidden />
              Live Now
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${liveVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sermon-feature-link"
            >
              Open on YouTube ↗
            </a>
          </div>
          <h2>Service in progress — join us.</h2>
          <div className="sermon-player">
            <iframe
              src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1&rel=0`}
              title={`${site.name} — Live Service`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      ) : latest ? (
        <section className="sermon-feature">
          <div className="sermon-feature-head">
            <span className="kicker">Most Recent</span>
            <a
              href={`https://www.youtube.com/watch?v=${latest.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sermon-feature-link"
            >
              Open on YouTube ↗
            </a>
          </div>
          <h2>{latest.title}</h2>
          <div className="sermon-player">
            <iframe
              src={`https://www.youtube.com/embed/${latest.videoId}?rel=0`}
              title={latest.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      ) : null}

      <section className="sermon-archive">
        <div className="section-heading">
          <span className="kicker">The Archive</span>
          <h2>Recent messages</h2>
          <p>
            Catch up on past services and devotionals, or follow along on our
            YouTube channel.
          </p>
        </div>

        {archive.length === 0 ? (
          <div className="calendar-placeholder">
            <p>
              {sermons.length === 0
                ? "Our sermons will appear here as they're posted. In the meantime, visit our YouTube channel."
                : "More sermons will appear here as they're streamed."}
            </p>
            {YOUTUBE_CHANNEL_URL && (
              <a className="button primary" href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                Visit our YouTube channel <ArrowRight size={18} />
              </a>
            )}
          </div>
        ) : (
          <>
            <SermonGrid sermons={archive} />
            {YOUTUBE_CHANNEL_URL && (
              <div className="band-actions" style={{ justifyContent: "center", marginTop: 36 }}>
                <a className="button outline" href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                  Full channel on YouTube ↗
                </a>
              </div>
            )}
          </>
        )}
      </section>

      <section className="contact-band">
        <div>
          <span className="kicker">Better in Person</span>
          <h2>We&apos;d love to see you Sunday.</h2>
          <p>Streaming is a gift, but the gathered church is a greater one.</p>
        </div>
        <div className="band-actions">
          <Link className="button light" href="/#times">Service Times</Link>
          <Link className="button glass" href="/contact">Plan a Visit</Link>
        </div>
      </section>
    </>
  );
}
