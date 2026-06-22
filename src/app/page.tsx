import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Church,
  Clock3,
  HeartHandshake,
  MessageCircle,
  Phone,
  PlayCircle,
  Users,
} from "lucide-react";
import { serviceTimes } from "@/lib/site";
import { getLiveVideoId } from "@/lib/sermons";

const stripIcons = [BookOpen, Church, HeartHandshake, Users];

// Re-check live status every 30s so the "Live Now" banner appears/clears on its own.
export const revalidate = 30;

export default async function Home() {
  const liveVideoId = await getLiveVideoId();
  return (
    <>
      {liveVideoId && (
        <Link className="live-banner" href="/sermons">
          <span className="live-banner-dot" aria-hidden />
          <strong>We&apos;re Live Now</strong>
          <span className="live-banner-cta">
            Watch the service <ArrowRight size={16} />
          </span>
        </Link>
      )}

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
        <p style={{
          position: "absolute",
          top: "1.5rem",
          right: "2rem",
          fontStyle: "italic",
          opacity: 0.85,
          color: "white",
          textAlign: "right",
          maxWidth: "320px",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          zIndex: 2,
        }}>
          &ldquo;By this shall all men know that ye are my disciples, if ye have love one to another.&rdquo; — John 13:35
        </p>
        <div className="hero-content">
          <h1>Loving <span className="gold">Jesus</span> by Loving Others.</h1>
          <p>
            We are a Christ-centered country church on Crosby Road, forty-five minutes
            west of Albany, gathering to worship, grow, serve, and proclaim
            God&apos;s saving grace.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/contact">
              Plan a Visit <ArrowRight size={18} />
            </Link>
            <Link className="button outline" href="/sermons">
              <PlayCircle size={18} /> Watch Online
            </Link>
          </div>
        </div>
      </section>

      <section className="hero-strip" id="times" aria-label="Service times">
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

      <section className="welcome-section" id="welcome" style={{ gridTemplateColumns: "1fr", justifyItems: "center", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", width: "100%" }}>
          <span className="kicker" style={{ fontSize: "2em", display: "block", textAlign: "center" }}>Welcome</span>
          <h2 style={{ textAlign: "center" }}>Come and see what God is doing here.</h2>
          <div className="check-list" style={{ textAlign: "center", maxWidth: "540px", margin: "28px auto 0" }}>
            <p><CheckCircle2 size={20} /> Bible-centered preaching and teaching</p>
            <p><CheckCircle2 size={20} /> Ministries for children, teens, and adults</p>
            <p><CheckCircle2 size={20} /> We are a church family committed to gospel witness and discipleship</p>
          </div>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link className="button primary" href="/about">
              About Our Church <ArrowRight size={18} />
            </Link>
            <a
              className="button outline"
              href="https://www.google.com/maps/dir/?api=1&destination=108+Crosby+Road,+Sprakers,+NY+12166"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions <ArrowRight size={18} />
            </a>
          </div>
        </div>

      </section>

      <section id="prayer" style={{
        padding: "3rem 1.5rem",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          background: "var(--card, #1a2235)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1rem",
          padding: "2.5rem 2rem",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          color: "#ffffff",
        }}>
          <span className="kicker" style={{ color: "#ffffff" }}>Prayer</span>
          <h2 style={{ marginTop: "0.5rem", color: "#ffffff" }}>We&apos;d Love to Pray for You</h2>
          <p style={{ opacity: 0.9, lineHeight: 1.7, marginBottom: "2rem", color: "#ffffff" }}>
            Whatever you&apos;re going through, you don&apos;t have to face it alone.
            Feel free to message us with any prayer request — we&apos;d be
            honored to bring it before the Lord.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a className="button primary" href="sms:+15186053177">
              <MessageCircle size={18} /> Text a Prayer Request
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
