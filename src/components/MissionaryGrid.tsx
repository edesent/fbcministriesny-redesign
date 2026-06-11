"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Missionary } from "@/lib/site";

/** Inline Facebook "f" SVG — no external dependency needed */
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

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
          <div key={m.photo} style={{ position: "relative" }}>
            <button
              type="button"
              className="missionary-card"
              style={{ width: "100%" }}
              onClick={() => setIndex(i)}
              aria-label={`View ${m.name}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="missionary-photo" src={m.photo} alt={alt(m)} loading="lazy" />
              <span className="missionary-caption">
                <strong>{m.name.split(" — ")[0]}</strong>
                {m.field && <span className="missionary-field">{m.field}</span>}
              </span>
            </button>
            {m.facebookHref && (
              <a
                href={m.facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on Facebook`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  bottom: "44px",
                  right: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#1877F2",
                  color: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
                  zIndex: 10,
                }}
              >
                <FacebookIcon size={15} />
              </a>
            )}
          </div>
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
