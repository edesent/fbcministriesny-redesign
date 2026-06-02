import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { googleCalendar, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Stay up to date on service times, guest speakers, and special events at Faith Bible Church.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Stay close to what's happening in the church family."
        intro="Keep up with service times, guest speakers, special events, and ministry nights on our church calendar."
      />

      <section className="calendar-section">
        <div className="section-heading">
          <span className="kicker">Church Calendar</span>
          <h2>Upcoming events</h2>
          <p>
            Stay up to date on service times, guest speakers, special events, and
            more on our church calendar.
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
