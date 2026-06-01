import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  PlayCircle,
  Sunrise,
} from "lucide-react";
import { ministryCards, quickLinks, serviceTimes, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          src="/church-building.jpg"
          alt="Faith Bible Church in Sprakers, New York"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          style={{ objectPosition: "center 38%" }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tag">
            <Sunrise size={14} /> Sprakers, New York · Mohawk Valley
          </span>
          <h1>Loving <span className="gold">Jesus</span> by Loving Others.</h1>
          <p>
            A Christ-centered country church on Crosby Road, forty-five minutes
            west of Albany, gathering to worship, grow, serve, and proclaim
            God&apos;s saving grace.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/contact">
              Plan a Visit <ArrowRight size={18} />
            </Link>
            <Link className="button outline" href="/events">
              <PlayCircle size={18} /> Watch Online
            </Link>
          </div>
        </div>
      </section>

      <section className="hero-strip" aria-label="Church details">
        <div>
          <Clock3 size={26} strokeWidth={1.6} />
          <div>
            <span>Sunday Worship</span>
            <strong>11:00 AM</strong>
          </div>
        </div>
        <div>
          <CalendarDays size={26} strokeWidth={1.6} />
          <div>
            <span>Sunday School</span>
            <strong>9:45 AM</strong>
          </div>
        </div>
        <div>
          <MapPin size={26} strokeWidth={1.6} />
          <div>
            <span>Find Us</span>
            <strong>108 Crosby Road</strong>
          </div>
        </div>
      </section>

      <section className="welcome-section">
        <div>
          <span className="kicker">Welcome</span>
          <h2>Come and see what God is doing here.</h2>
          <p>
            When you step inside, expect a warm welcome from people genuinely glad
            to see you. Our services hold praise and hymns, prayer, encouragement,
            and a message straight from the Bible.
          </p>
          <div className="check-list">
            <p><CheckCircle2 size={20} /> Bible-centered preaching and teaching</p>
            <p><CheckCircle2 size={20} /> Ministries for children, teens, and adults</p>
            <p><CheckCircle2 size={20} /> A church family committed to gospel witness</p>
          </div>
          <div className="hero-actions">
            <Link className="button primary" href="/about">
              About Our Church <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <figure className="image-feature">
          <Image
            src="/logo.jpg"
            alt="Faith Bible Church along the road in Sprakers, New York"
            fill
            sizes="(max-width: 900px) 100vw, 44vw"
          />
          <figcaption>A country church for the valley.</figcaption>
        </figure>
      </section>

      <section className="service-section" id="services">
        <div className="section-heading">
          <span className="kicker">Gather With Us</span>
          <h2>Weekly gatherings</h2>
          <p>Simple, steady rhythms for worship, prayer, discipleship, and encouragement.</p>
        </div>
        <div className="service-grid">
          {serviceTimes.map((service) => (
            <article key={service.label} className="service-card">
              <Clock3 size={26} strokeWidth={1.6} />
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
          <h2>A place to grow for every season of life</h2>
          <p>Grow in faith, build friendships, and find a meaningful place to serve.</p>
        </div>
        <div className="ministry-grid">
          {ministryCards.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <article key={ministry.title} className="ministry-card">
                <Icon size={26} strokeWidth={1.6} />
                <h3>{ministry.title}</h3>
                <p>{ministry.text}</p>
                <span>{ministry.meta}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="verse-band">
        <blockquote>
          &ldquo;For God so loved the world, that he gave his only begotten Son.&rdquo;
        </blockquote>
        <cite>John 3:16</cite>
      </section>

      <section className="quick-section">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link className="quick-card" href={link.href} key={link.title}>
              <Icon size={28} strokeWidth={1.6} />
              <span>{link.title}</span>
              <p>{link.text}</p>
              <ArrowRight size={20} />
            </Link>
          );
        })}
      </section>

      <section className="visit-section">
        <div>
          <span className="kicker">Visit This Week</span>
          <h2>Find us where Carlisle Road meets Crosby Road.</h2>
          <p>
            Faith Bible Church sits in the town of Root, easily reached from across
            Montgomery County. Come as you are — we&apos;d love to save you a seat.
          </p>
        </div>
        <div className="visit-panel">
          <p><MapPin size={20} /> {site.address}</p>
          <p><CalendarDays size={20} /> Sunday School 9:45 AM · Worship 11 AM</p>
          <p><Clock3 size={20} /> Wednesday Ministries 7:00 PM</p>
          <div className="panel-actions">
            <a className="button light" href={site.mapHref}>Get Directions</a>
            <a className="button glass" href={site.phoneHref}>Call {site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
