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

      {/* ── JUNE MINISTRY SCHEDULE ── */}
      <section className="events-section" style={{ paddingTop: 0 }}>
        <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 36px" }}>
          <span className="kicker">Ministry Schedule · June</span>
          <h2>June Ministry Assignments</h2>
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
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 32, color: "#E8C55A", lineHeight: 1 }}>June</div>
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
                { label: "AM Service", rows: [["6/7","Birdie & Kristen S"],["6/14","Sigrid & Rebecca T"],["6/21","Carolyn & Stephanie B"],["6/28","Jeannette & Sandy"]], italic: false },
                { label: "PM Service", rows: [["6/7","Fellowship Dinner"],["6/14","As Needed"],["6/21","Kay"],["6/28","Vyanna"]], italic: true },
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
                {[["6/10","Kristen S & Stefani E"],["6/17","Amy A"],["6/24","Amy A"],["7/1","Amy A"]].map(([d, n]) => (
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
                { title: "Behind-the-Scenes", rows: [["6/6","Victoria S & Kay P"],["6/13","Birdie S & Nancy K"],["6/20","Bethann & The Kellys"],["6/27","Michelle T & Mark S"]] },
                { title: "Special Music",     rows: [["6/7","Jesse N"],["6/14","The Watsons"],["6/21","Vyanna"],["6/28","Praise Team"]] },
                { title: "Bible Challenge",   rows: [["6/14","Eric W"],["6/21","Jesse N"],["6/28","Casey W"]] },
                { title: "Greeters",          rows: [["6/7","Bill & Kay"],["6/14","Laura"],["6/21","Roger & Sigrid"],["6/28","Mark S"]] },
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
          <p style={{ marginTop: 8 }}>To let us know you&apos;re attending, text us at <a href="sms:+15182572335" style={{ fontWeight: 600, color: "inherit", textDecoration: "underline", whiteSpace: "nowrap" }}>text Ethan</a>.</p>
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
          <span className="kicker">Missionary Spotlight</span>
          <h2>Richard & Anna Marshall — Mali, West Africa</h2>
          <p>Richard and Anna Marshall faithfully served the Lord in the Republic of Mali. Please plan to join us this Sunday to hear a final ministry update from Anna.</p>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Image
            src="/events/img-1950.jpeg"
            alt="Richard and Anna Marshall missionary ministry in Mali"
            width={1080}
            height={1350}
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
