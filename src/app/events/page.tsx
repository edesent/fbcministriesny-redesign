import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { googleCalendar, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Stay up to date on service times, guest speakers, and special events at Faith Bible Church.",
};

// Render on every request so the events list always matches the live calendar.
export const dynamic = "force-dynamic";

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Stay close to what's happening in the church family."
        intro="Keep up with service times, guest speakers, special events, and ministry nights on our church calendar."
      />

      <UpcomingEvents
        limit={6}
        kicker="What's Coming Up"
        heading="Upcoming events"
        blurb="Please join us at the upcoming events for some fun and fellowship. See the full month below."
        showCalendarLink={false}
      />

      {/* ── JULY MINISTRY SCHEDULE ── */}
      <section className="events-section" style={{ paddingTop: 0 }}>
        <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 36px" }}>
          <span className="kicker">Ministry Schedule · July</span>
          <h2>July Ministry Assignments</h2>
          <p>Serving schedules for nursery, music, greeters, and more.</p>
        </div>

        {/* Navy card */}
        <div style={{ maxWidth: 700, margin: "0 auto", background: "#0F1B2D", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>

          {/* Header bar */}
          <div style={{ padding: "20px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #243C5A", position: "relative" }}>
            <div style={{ position: "absolute", bottom: -2, left: 24, right: 24, height: 2, background: "linear-gradient(90deg, #E8C55A, #4A9CC7, transparent)" }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#4A9CC7", marginBottom: 4 }}>Ministry Schedule</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#fff", lineHeight: 1 }}>Serving Together</div>
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 32, color: "#E8C55A", lineHeight: 1 }}>July</div>
          </div>

          {/* Nursery */}
          <div style={{ padding: "16px 24px 0" }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4A9CC7", display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              Nursery<span style={{ flex: 1, height: 1, background: "#243C5A", display: "block" }} />
            </div>
            {/* Sunday School */}
            <div style={{ background: "#1A2E47", borderLeft: "3px solid #E8C55A", borderRadius: 3, padding: "8px 14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A96B0", marginBottom: 2 }}>Sunday School</div>
                <div style={{ fontSize: 13, color: "#C8D8E8" }}>Marcia Watson</div>
              </div>
              <div style={{ fontSize: 10, fontStyle: "italic", color: "#7A96B0" }}>all month</div>
            </div>
            {/* AM / PM grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "#1A2E47", borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
              {[
                { label: "AM Service", rows: [["7/5","Carolyn B & Andrea L"],["7/12","Birdie S & Stephanie B"],["7/19","Sigrid G & Rebecca T"],["7/26","Jeannette T & Sandy B"]], italic: false },
                { label: "PM Service", rows: [["7/5","Fellowship Dinner"],["7/12","Kathy K"],["7/19","Kay P"],["7/26","Vyanna W"]], italic: true },
              ].map(({ label, rows, italic }, ci) => (
                <div key={label} style={{ padding: "10px 14px", borderLeft: ci > 0 ? "1px solid #243C5A" : undefined }}>
                  <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A96B0", marginBottom: 7, paddingBottom: 5, borderBottom: "1px solid #243C5A" }}>{label}</div>
                  {rows.map(([d, n]) => (
                    <div key={d} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ flexShrink: 0, width: 34, fontSize: 10, fontWeight: 700, color: "#E8C55A", textAlign: "center", background: "rgba(232,197,90,0.12)", borderRadius: 3, padding: "2px 0" }}>{d}</span>
                      <span style={{ fontSize: 12, color: italic ? "#7A96B0" : "#C8D8E8", fontStyle: italic ? "italic" : "normal" }}>{n}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Wednesday */}
            <div style={{ background: "#1A2E47", borderRadius: 3, padding: "10px 14px", marginBottom: 16 }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A96B0", marginBottom: 7, paddingBottom: 5, borderBottom: "1px solid #243C5A" }}>Wednesday Service</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                {[["7/8","Kristen S & Stefani E"],["7/15","Amy A"],["7/22","Amy A"],["7/29","Kristen S"]].map(([d, n]) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ flexShrink: 0, width: 34, fontSize: 10, fontWeight: 700, color: "#E8C55A", textAlign: "center", background: "rgba(232,197,90,0.12)", borderRadius: 3, padding: "2px 0" }}>{d}</span>
                    <span style={{ fontSize: 12, color: "#C8D8E8" }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ministry Assignments */}
          <div style={{ padding: "0 24px 20px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4A9CC7", display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              Ministry Assignments<span style={{ flex: 1, height: 1, background: "#243C5A", display: "block" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { title: "Behind-the-Scenes", rows: [["7/4","April S & Becky T"],["7/11","JP, Amy W & Victoria S"],["7/18","Bethann D & Kay P"],["7/25","Birdie S & Nancy K"]] },
                { title: "Special Music",     rows: [["7/5","Vyanna W"],["7/12","Victoria"],["7/19","Ally"],["7/26","Jessi L"]] },
                { title: "Bible Challenge",   rows: [["7/12","Roger G"],["7/19","Jesse W"],["7/26","Dan U"]] },
                { title: "Greeters",          rows: [["7/5","Marcia T"],["7/12","Jeff & JoAnn May"],["7/19","Victoria"],["7/26","Wendy"]] },
              ].map(({ title, rows }) => (
                <div key={title} style={{ background: "#1A2E47", borderTop: "2px solid #4A9CC7", borderRadius: 3, padding: "10px 12px" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A8D4EC", marginBottom: 8, paddingBottom: 5, borderBottom: "1px solid #243C5A" }}>{title}</div>
                  {rows.map(([d, n]) => (
                    <div key={d} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ flexShrink: 0, width: 34, fontSize: 10, fontWeight: 700, color: "#E8C55A", textAlign: "center", background: "rgba(232,197,90,0.12)", borderRadius: 3, padding: "2px 0" }}>{d}</span>
                      <span style={{ fontSize: 12, color: "#C8D8E8" }}>{n}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="events-section" style={{ paddingTop: 0 }}>
        <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 44px" }}>
          <span className="kicker">Special Event · July 5</span>
          <h2>Opening Chicken BBQ — Christian Lake Bible Conference</h2>
          <p>Come enjoy a great evening at the lake! Church service, BBQ dinner, Kids Fishing Derby, and fireworks display.</p>
          <p style={{ marginTop: 8 }}>To let us know you&apos;re attending, <a href="sms:+15182572335" style={{ fontWeight: 600, color: "inherit", textDecoration: "underline", whiteSpace: "nowrap" }}>text Ethan at (518) 257-2335</a>.</p>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Image
            src="/events/img-1914.jpeg"
            alt="Opening Chicken BBQ – July 5 – Christian Lake Bible Conference"
            width={1080}
            height={1080}
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
        </div>
      </section>

      <section className="events-section" style={{ paddingTop: 0 }}>
        <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 44px" }}>
          <span className="kicker">Special Event · July 4</span>
          <h2>4th of July Parade &amp; Float</h2>
          <p>Join us! Float prep at <strong>3:00 PM</strong> at the Price Chopper parking lot. Parade begins at <strong>4:00 PM</strong>. Help needed to ride the float, hand out candy, and share Gospel tracts.</p>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Image
            src="/events/img-2019.jpeg"
            alt="4th of July Parade and Float — Faith Bible Church"
            width={1275}
            height={1650}
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
        </div>
      </section>

      <section className="calendar-section">
        <div className="section-heading">
          <span className="kicker">Church Calendar</span>
          <h2>The full calendar</h2>
          <p>
            Browse the whole month — services, guest speakers, special events, and
            ministry nights.
          </p>
        </div>
        {googleCalendar.embedSrc ? (
          <div className="calendar-embed">
            <iframe
              src={googleCalendar.embedSrc}
              title="Faith Bible Church calendar"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="calendar-placeholder">
            <CalendarDays size={40} strokeWidth={1.4} />
            <p>Our church calendar is on its way. In the meantime, call the office for the latest schedule.</p>
            <a className="button primary" href={site.phoneHref}>
              Call {site.phone} <ArrowRight size={18} />
            </a>
          </div>
        )}
        {googleCalendar.publicUrl && (
          <div className="band-actions" style={{ justifyContent: "center", marginTop: 28 }}>
            <a className="button outline" href={googleCalendar.publicUrl} target="_blank" rel="noopener noreferrer">
              <Clock3 size={18} /> Open the full calendar
            </a>
          </div>
        )}
      </section>

      <section className="contact-band">
        <div>
          <span className="kicker">Questions?</span>
          <h2>Contact the office for the latest updates.</h2>
          <p>{site.email} · {site.phone}</p>
        </div>
        <div className="band-actions">
          <a className="button light" href={site.phoneHref}>Call Now</a>
        </div>
      </section>
    </>
  );
}
