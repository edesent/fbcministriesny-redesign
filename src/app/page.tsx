import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Church,
  Clock3,
  MapPin,
  PlayCircle,
  Sunrise,
  Sunset,
  Users,
} from "lucide-react";
import {
  ministryCards,
  pastorMessage,
  pastors,
  serviceTimes,
  site,
} from "@/lib/site";
import ConnectionCard from "@/components/ConnectionCard";

const stripIcons = [BookOpen, Church, Sunset, Users];

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

      <section className="hero-strip" aria-label="Service times">
        {serviceTimes.map((service, i) => {
          const Icon = stripIcons[i] ?? Clock3;
          return (
            <div className="strip-item" key={service.label}>
              <span className="strip-icon">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <div>
                <span className="strip-label">{service.label}</span>
                <strong className="strip-time">{service.time}</strong>
                <small className="strip-detail">{service.detail}</small>
              </div>
            </div>
          );
        })}
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

      <section className="pastors-section" id="pastors">
        <div className="pastors-message">
          <span className="kicker">Our Pastors</span>
          <h2>A word from our pastor</h2>
          <div className="message-body">
            {pastorMessage.paragraphs.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <p className="signature">— {pastorMessage.from}</p>
        </div>
        <div className="pastors-cards">
          {site.pastorPhoto && (
            <figure className="pastor-portrait">
              <Image
                src={site.pastorPhoto}
                alt="Pastor Mark Kelly"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </figure>
          )}
          {pastors.map((pastor) => (
            <article className="pastor-card" key={pastor.name}>
              <span className="pastor-avatar" aria-hidden>{pastor.initials}</span>
              <div>
                <strong>{pastor.name}</strong>
                <span className="pastor-role">{pastor.role}</span>
                {pastor.phone && (
                  <a href={pastor.phoneHref}>{pastor.phone}</a>
                )}
              </div>
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

      <section className="visit-section">
        <div className="visit-intro">
          <span className="kicker">Visit This Week</span>
          <h2>Find us where Carlisle Road meets Crosby Road.</h2>
          <p>
            Faith Bible Church sits in the town of Root, easily reached from across
            Montgomery County. Come as you are — we&apos;d love to save you a seat.
          </p>
          <p className="visit-connect-prompt">
            New here or want to take a next step? Fill out a connection card and
            Pastor Mark will reach out personally.
          </p>
          <ConnectionCard />
        </div>
        <div className="visit-panel">
          <div className="visit-map">
            <iframe
              src={site.mapEmbedSrc}
              title={`Map to ${site.name}, ${site.address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="visit-panel-info">
            <p><MapPin size={20} /> {site.address}</p>
            <p><CalendarDays size={20} /> Sunday School 9:45 AM · Worship 11 AM</p>
            <p><Clock3 size={20} /> Wednesday Ministries 7:00 PM</p>
            <div className="panel-actions">
              <a className="button light" href={site.mapHref}>Get Directions</a>
              <a className="button glass" href={site.phoneHref}>Call {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
