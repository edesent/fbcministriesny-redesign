"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Missionary } from "@/lib/site";

export default function MissionaryGrid({ missionaries }: { missionaries: Missionary[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + missionaries.length) % missionaries.length)),
    [missionaries.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % missionaries.length)),
    [missionaries.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const active = index !== null ? missionaries[index] : null;
  const alt = (m: Missionary) => (m.field ? `${m.name} — ${m.field}` : m.name);

  return (
    <>
      <div className="missionary-grid">
        {missionaries.map((m, i) => (
          <button
            type="button"
            className="missionary-card"
            key={m.photo}
            onClick={() => setIndex(i)}
            aria-label={`View ${m.name}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="missionary-photo" src={m.photo} alt={alt(m)} loading="lazy" />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={alt(active)}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button type="button" className="lightbox-close" aria-label="Close" onClick={close}>
            <X size={24} />
          </button>
          {missionaries.length > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              aria-label="Previous"
              onClick={prev}
            >
              <ChevronLeft size={28} />
            </button>
          )}
          <figure className="lightbox-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.photo} alt={alt(active)} />
          </figure>
          {missionaries.length > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              aria-label="Next"
              onClick={next}
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
