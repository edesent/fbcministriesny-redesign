"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { site } from "@/lib/site";

const INTERESTS = [
  "I want to follow Jesus",
  "I want to get baptized",
  "I want to join the church",
  "I want to talk to a pastor",
  "I want to get connected to a group",
  "I need prayer and care",
  "Other",
];

export default function ConnectionCard({
  label = "Fill Out a Connection Card",
}: {
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);

  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleInterest = (value: string) => {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    const lines = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      "",
      `I'm interested in:`,
      ...interests.map((i) => `  • ${i}`),
      message && "",
      message && `Message:`,
      message && message,
    ].filter(Boolean);

    const mailSubject = subject || `Connection Card — ${firstName} ${lastName}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setOpen(false);
  };

  return (
    <>
      <button type="button" className="button primary" onClick={() => setOpen(true)}>
        {label} <ArrowRight size={18} />
      </button>

      {open && (
        <div
          className="connect-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="connect-modal">
            <button
              type="button"
              className="connect-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>

            <span className="kicker">Connection Card</span>
            <h2 id="connect-title">Connect with us!</h2>
            <p className="connect-intro">
              Tell us a little about you and how we can help. Pastor Mark will
              follow up personally.
            </p>

            <form className="connect-form" onSubmit={handleSubmit}>
              <div className="connect-row">
                <label>
                  <span className="connect-label">First name<span className="req" aria-hidden>*</span></span>
                  <input name="firstName" type="text" required autoComplete="given-name" />
                </label>
                <label>
                  <span className="connect-label">Last name<span className="req" aria-hidden>*</span></span>
                  <input name="lastName" type="text" required autoComplete="family-name" />
                </label>
              </div>

              <div className="connect-row">
                <label>
                  <span className="connect-label">Email<span className="req" aria-hidden>*</span></span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label>
                  <span className="connect-label">Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
              </div>

              <fieldset className="connect-fieldset">
                <legend>
                  Choose any of the following items<span className="req" aria-hidden>*</span>
                </legend>
                <div className="connect-checks">
                  {INTERESTS.map((item) => {
                    const checked = interests.includes(item);
                    return (
                      <label
                        key={item}
                        className={`connect-check${checked ? " is-checked" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleInterest(item)}
                        />
                        <span className="connect-box" aria-hidden>
                          {checked && <Check size={14} strokeWidth={3} />}
                        </span>
                        {item}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <label>
                <span className="connect-label">Subject</span>
                <input name="subject" type="text" />
              </label>

              <label>
                <span className="connect-label">Message</span>
                <textarea name="message" rows={4} />
              </label>

              <button
                type="submit"
                className="button primary full"
                disabled={interests.length === 0}
              >
                Submit <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
