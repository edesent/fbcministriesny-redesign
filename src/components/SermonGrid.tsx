"use client";

import { useCallback, useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { isLiveStream, sermonDate, sermonTitle, type Sermon } from "@/lib/sermons";

// Shown if YouTube's thumbnail won't load (e.g. a brand-new live recording, or a
// blocked CDN host on some mobile networks).
const THUMB_FALLBACK = "/church-building.jpg";

// Build the thumbnail from the canonical host. The RSS feed hands back
// region-sharded hosts (i1/i3/i4.ytimg.com) that some mobile networks block,
// which is why a thumbnail can be blank on one device but fine on another.
function thumbUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export default function SermonGrid({ sermons }: { sermons: Sermon[] }) {
  const [active, setActive] = useState<Sermon | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <>
      <ul className="sermon-grid">
        {sermons.map((s) => (
          <li key={s.videoId}>
            <button type="button" className="sermon-card" onClick={() => setActive(s)}>
              <span className="sermon-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbUrl(s.videoId)}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.endsWith(THUMB_FALLBACK)) img.src = THUMB_FALLBACK;
                  }}
                />
                <span className="sermon-play" aria-hidden>
                  <Play size={22} fill="currentColor" strokeWidth={0} />
                </span>
              </span>
              <span className="sermon-info">
                {!isLiveStream(s) && (
                  <span className="sermon-eyebrow">{sermonDate(s)}</span>
                )}
                <strong>{sermonTitle(s)}</strong>
                {typeof s.views === "number" && (
                  <small>{s.views.toLocaleString()} views</small>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          className="sermon-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="sermon-modal">
            <div className="sermon-modal-head">
              <div>
                {!isLiveStream(active) && (
                  <span className="sermon-eyebrow">{sermonDate(active)}</span>
                )}
                <h2>{sermonTitle(active)}</h2>
              </div>
              <button type="button" className="sermon-close" aria-label="Close" onClick={close}>
                <X size={22} />
              </button>
            </div>
            <div className="sermon-player">
              <iframe
                src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="sermon-open">
              <a
                href={`https://www.youtube.com/watch?v=${active.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on YouTube ↗
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
