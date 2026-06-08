"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { isLiveStream, sermonDate, sermonTitle, type Sermon } from "@/lib/sermons";

// Shown if YouTube's thumbnail won't load (e.g. a brand-new live recording, or a
// blocked CDN host on some mobile networks).
const THUMB_FALLBACK = "/church-building.jpg";

// How many sermons per page in the archive grid.
const PAGE_SIZE = 12;

// Build the thumbnail from the canonical host. The RSS feed hands back
// region-sharded hosts (i1/i3/i4.ytimg.com) that some mobile networks block,
// which is why a thumbnail can be blank on one device but fine on another.
function thumbUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

// The page numbers to render: first, last, the current page ± 1, and an
// ellipsis (-1) wherever there's a gap. e.g. 1 … 4 5 6 … 22
function pageList(current: number, total: number): number[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push(-1); // ellipsis marker
    out.push(sorted[i]);
  }
  return out;
}

export default function SermonGrid({ sermons }: { sermons: Sermon[] }) {
  const [active, setActive] = useState<Sermon | null>(null);
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setActive(null), []);

  const totalPages = Math.max(1, Math.ceil(sermons.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const paged = sermons.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const goTo = useCallback((p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
      <div ref={topRef} aria-hidden style={{ scrollMarginTop: "90px" }} />
      <ul className="sermon-grid">
        {paged.map((s) => (
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

      {totalPages > 1 && (
        <nav className="sermon-pagination" aria-label="Sermon pages">
          <button
            type="button"
            className="sermon-page-arrow"
            onClick={() => goTo(current - 1)}
            disabled={current === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          <ul>
            {pageList(current, totalPages).map((p, i) =>
              p === -1 ? (
                <li key={`gap-${i}`} className="sermon-page-gap" aria-hidden>
                  …
                </li>
              ) : (
                <li key={p}>
                  <button
                    type="button"
                    className={p === current ? "is-current" : undefined}
                    onClick={() => goTo(p)}
                    aria-label={`Page ${p}`}
                    aria-current={p === current ? "page" : undefined}
                  >
                    {p}
                  </button>
                </li>
              ),
            )}
          </ul>
          <button
            type="button"
            className="sermon-page-arrow"
            onClick={() => goTo(current + 1)}
            disabled={current === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      )}

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
