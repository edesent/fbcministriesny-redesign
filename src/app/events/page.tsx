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

        <div style={{
          maxWidth: 780,
          margin: "0 auto",
          background: "#fff",
          border: "1px solid #D0C8BC",
          borderTop: "4px solid #7C2D2D",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}>

          {/* Nursery */}
          <div style={{ background: "#7C2D2D", padding: "10px 20px", borderBottom: "3px solid #C9A84C" }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
              Nursery
            </span>
          </div>
          <div style={{ padding: "14px 20px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0 20px", borderBottom: "1px solid #EDE8E0" }}>
            {/* Sunday School */}
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8C7E72", marginBottom: 6 }}>Sunday School</div>
              <div style={{ fontSize: 12 }}>Marcia Watson <span style={{ fontStyle: "italic", color: "#8C7E72" }}>(all month)</span></div>
            </div>
            {/* AM */}
            <div style={{ borderLeft: "1px solid #EDE8E0", paddingLeft: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8C7E72", marginBottom: 6 }}>AM Service</div>
              {[["6/7","Birdie & Kristen S"],["6/14","Sigrid & Rebecca T"],["6/21","Carolyn & Stephanie B"],["6/28","Jeannette & Sandy"]].map(([d,n]) => (
                <div key={d} style={{ display: "flex", gap: 8, alignItems: "baseline", padding: "3px 0", borderBottom: "1px dashed #EDE8E0" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#7C2D2D", background: "#EDE8E0", borderRadius: 2, padding: "1px 5px", minWidth: 30, textAlign: "center" }}>{d}</span>
                  <span style={{ fontSize: 12 }}>{n}</span>
                </div>
              ))}
            </div>
            {/* PM */}
            <div style={{ borderLeft: "1px solid #EDE8E0", paddingLeft: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8C7E72", marginBottom: 6 }}>PM Service</div>
              {[["6/7","Fellowship Dinner"],["6/14","As Needed"],["6/21","Kay"],["6/28","Vyanna"]].map(([d,n]) => (
                <div key={d} style={{ display: "flex", gap: 8, alignItems: "baseline", padding: "3px 0", borderBottom: "1px dashed #EDE8E0" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#7C2D2D", background: "#EDE8E0", borderRadius: 2, padding: "1px 5px", minWidth: 30, textAlign: "center" }}>{d}</span>
                  <span style={{ fontSize: 12, fontStyle: "italic", color: "#5A5047" }}>{n}</span>
                </div>
              ))}
            </div>
            {/* Wednesday */}
            <div style={{ borderLeft: "1px solid #EDE8E0", paddingLeft: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8C7E72", marginBottom: 6 }}>Wednesday</div>
              {[["6/10","Kristen S & Stefani E"],["6/17","Amy A"],["6/24","Amy A"],["7/1","Amy A"]].map(([d,n]) => (
                <div key={d} style={{ display: "flex", gap: 8, alignItems: "baseline", padding: "3px 0", borderBottom: "1px dashed #EDE8E0" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#7C2D2D", background: "#EDE8E0", borderRadius: 2, padding: "1px 5px", minWidth: 30, textAlign: "center" }}>{d}</span>
                  <span style={{ fontSize: 12 }}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom four sections */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            {[
              { title: "Behind-the-Scenes", rows: [["6/6","Victoria S & Kay P"],["6/13","Birdie S & Nancy K"],["6/20","Bethann & The Kellys"],["6/27","Michelle T & Mark S"]] },
              { title: "Special Music",      rows: [["6/7","Jesse N"],["6/14","The Watsons"],["6/21","Vyanna"],["6/28","Praise Team"]] },
              { title: "Bible Challenge",    rows: [["6/14","Eric W"],["6/21","Jesse N"],["6/28","Casey W"]] },
              { title: "Greeters",           rows: [["6/7","Bill & Kay"],["6/14","Laura"],["6/21","Roger & Sigrid"],["6/28","Mark S"]] },
            ].map(({ title, rows }, i) => (
              <div key={title} style={{ padding: "14px 16px", borderLeft: i > 0 ? "1px solid #EDE8E0" : undefined }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7C2D2D", marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid #EDE8E0" }}>{title}</div>
                {rows.map(([d, n]) => (
                  <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "3.5px 0", borderBottom: "1px dashed #EDE8E0", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#1E1E1E" }}>{n}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#C9A84C", flexShrink: 0 }}>{d}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="events-section" style={{ paddingTop: 0 }}>
        <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 44px" }}>
          <span className="kicker">Special Event · July 5</span>
          <h2>Opening Chicken BBQ — Christian Lake Bible Conference</h2>
          <p>Come enjoy a great evening at the lake! Church service, BBQ dinner, Kids Fishing Derby, and fireworks display.</p>
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
