import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { getUpcomingEvents } from "@/lib/events";

// Server component: reads the church's public calendar feed and renders the
// next few events as custom cards (not the Google Calendar iframe).
export async function UpcomingEvents() {
  const events = await getUpcomingEvents(4);

  return (
    <section className="events-section">
      <div className="section-heading">
        <span className="kicker">Mark Your Calendar</span>
        <h2>Upcoming events</h2>
        <p>
          Here&apos;s what&apos;s coming up next at Faith Bible Church. See the full
          calendar for everything on the schedule.
        </p>
      </div>

      {events.length > 0 ? (
        <ul className="events-list">
          {events.map((ev) => (
            <li key={ev.id} className="event-row">
              <div className="event-date" aria-hidden>
                <span className="event-month">{ev.monthLabel}</span>
                <strong className="event-day">{ev.dayLabel}</strong>
              </div>
              <div className="event-body">
                <h3>{ev.title}</h3>
                <div className="event-meta">
                  <span>
                    <CalendarDays size={16} /> {ev.weekdayLabel}
                  </span>
                  <span>
                    <Clock3 size={16} /> {ev.timeLabel ?? "All day"}
                  </span>
                  {ev.location && (
                    <span>
                      <MapPin size={16} /> {ev.location}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="events-empty">
          <CalendarDays size={36} strokeWidth={1.4} />
          <p>Our next events are being scheduled. Check the full calendar for the latest.</p>
        </div>
      )}

      <div className="events-actions">
        <Link className="button primary" href="/events">
          View full calendar <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
