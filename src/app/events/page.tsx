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

      <section className="events-section" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <span className="kicker">Special Event · July 5</span>
          <h2>Opening Chicken BBQ — Christian Lake Bible Conference</h2>
          <p>Come enjoy a great evening at the lake! Church service, BBQ dinner, Kids Fishing Derby, and fireworks display.</p>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Image
            src="/events/chicken-bbq-july5.jpeg"
            alt="Opening Chicken BBQ – July 5 – Christian Lake Bible Conference"
            width={1080}
            height={1080}
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
        </div>
      </section>

      <section className="events-section" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <span className="kicker">Special Guest · June 7</span>
          <h2>Mark &amp; Valerie Appell — Missionaries to Marseille, France</h2>
          <p>Join us as we welcome Mark and Valerie Appell, missionaries reaching people in Marseille, France through the gospel of Jesus Christ.</p>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Image
            src="/events/appell-june7.jpg"
            alt="Mark and Valerie Appell – Missionaries to Marseille, France – June 7"
            width={1320}
            height={959}
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
