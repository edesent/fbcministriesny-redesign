import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Church,
  Clock3,
  PlayCircle,
  Sunset,
  Users,
} from "lucide-react";
import { serviceTimes } from "@/lib/site";
import { getLiveVideoId } from "@/lib/sermons";

const stripIcons = [BookOpen, Church, Sunset, Users];

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
        <div className="hero-content">
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

      <section className="welcome-section" id="welcome">
        <div>
          <span className="kicker">Welcome</span>
          <h2>Come and see what God is doing here.</h2>
          <p>
            When you step inside, expect a warm welcome from people genuinely glad
            to see you.
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

      </section>
    </>
  );
}
