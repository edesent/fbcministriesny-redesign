import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  PlayCircle,
} from "lucide-react";
import { actionCards, ministryCards, quickLinks, serviceTimes, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          src="/mountains.jpg"
          alt="Mountain landscape in New York"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow">Sprakers, New York · Mohawk Valley</span>
          <h1>An Upstate church home on Crosby Road.</h1>
          <p>
            Faith Bible Church is a Christ-centered community in the Carlisle
            area, forty-five minutes west of Albany, gathering to worship, grow,
            serve, and proclaim God&apos;s saving grace.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/contact">
              Plan a Visit <ArrowRight size={18} />
            </Link>
            <Link className="button glass" href="/events">
              <PlayCircle size={18} /> Watch Online
            </Link>
          </div>
        </div>
        <div className="hero-card ny-card">
          <Image src="/church-building.jpg" alt="" width={420} height={280} />
          <div>
            <span>Next Gathering</span>
            <strong>Sunday Worship · 11:00 AM</strong>
            <small>Sunday School begins at 9:45 AM</small>
          </div>
        </div>
      </section>

      <section className="action-strip" aria-label="Church details">
        {actionCards.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              <Icon size={23} />
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          );
        })}
      </section>

      <section className="welcome-section">
        <div>
          <span className="kicker">Welcome</span>
          <h2>Come and see what God is doing at Faith Bible Church.</h2>
          <p>
            When you step into the building, you can expect a warm welcome from
            people who are genuinely glad to see you. Services include praise songs
            and hymns, prayer, encouragement, and a message from the Bible.
          </p>
          <div className="check-list">
            <p><CheckCircle2 size={20} /> Bible-centered preaching and teaching</p>
            <p><CheckCircle2 size={20} /> Ministries for children, teens, and adults</p>
            <p><CheckCircle2 size={20} /> A church family committed to gospel witness</p>
          </div>
        </div>
        <figure className="image-feature">
          <Image src="/mountains.jpg" alt="New York mountain landscape" fill sizes="(max-width: 900px) 100vw, 44vw" />
          <figcaption>{site.tagline}</figcaption>
        </figure>
      </section>

      <section className="service-section" id="services">
        <div className="section-heading">
          <span className="kicker">Services</span>
          <h2>Weekly gatherings</h2>
          <p>Simple rhythms for worship, prayer, discipleship, and encouragement.</p>
        </div>
        <div className="service-grid">
          {serviceTimes.map((service) => (
            <article key={service.label} className="service-card">
              <Clock3 size={24} />
              <span>{service.label}</span>
              <strong>{service.time}</strong>
              <p>{service.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ministries-section">
        <div className="section-heading">
          <span className="kicker">Discover Ministries</span>
          <h2>For every age and life stage</h2>
          <p>Grow in faith, build friendships, and find a meaningful place to serve.</p>
        </div>
        <div className="ministry-grid">
          {ministryCards.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <article key={ministry.title} className="ministry-card">
                <Icon size={25} />
                <h3>{ministry.title}</h3>
                <p>{ministry.text}</p>
                <span>{ministry.meta}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="quick-section">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link className="quick-card" href={link.href} key={link.title}>
              <Icon size={26} />
              <span>{link.title}</span>
              <p>{link.text}</p>
              <ArrowRight size={18} />
            </Link>
          );
        })}
      </section>

      <section className="visit-section">
        <div>
          <span className="kicker">Visit This Week</span>
          <h2>Find us at the junction of Carlisle Road and Crosby Road.</h2>
          <p>
            Faith Bible Church is located in the town of Root and is easily accessible
            from the Montgomery County area.
          </p>
        </div>
        <div className="visit-panel">
          <p><MapPin size={20} /> {site.address}</p>
          <p><CalendarDays size={20} /> Sunday School 9:45 AM · Worship 11 AM</p>
          <div className="panel-actions">
            <a className="button dark" href={site.mapHref}>Get Directions</a>
            <a className="button light" href={site.phoneHref}>Call {site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
