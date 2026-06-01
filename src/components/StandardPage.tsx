import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { serviceTimes, site } from "@/lib/site";

type StandardPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  points: readonly string[];
  cta: string;
};

export function StandardPage({ eyebrow, title, intro, points, cta }: StandardPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="split-section">
        <div>
          <span className="kicker">{eyebrow}</span>
          <h2>{cta}</h2>
          <div className="check-list">
            {points.map((point) => (
              <p key={point}>
                <CheckCircle2 size={20} />
                <span>{point}</span>
              </p>
            ))}
          </div>
        </div>
        <aside className="service-panel">
          <span>Weekly Gatherings</span>
          <h3>Join us this week</h3>
          {serviceTimes.map((service) => (
            <div key={service.label} className="service-row">
              <div>
                <strong>{service.label}</strong>
                <small>{service.detail}</small>
              </div>
              <b>{service.time}</b>
            </div>
          ))}
          <Link className="button primary full" href="/contact">
            Contact the Church <ArrowRight size={18} />
          </Link>
        </aside>
      </section>
      <section className="contact-band">
        <div>
          <span className="kicker">Faith Bible Church</span>
          <h2>{site.address}</h2>
          <p>{site.email} · {site.phone}</p>
        </div>
        <div className="band-actions">
          <a className="button light" href={site.mapHref}>Directions</a>
          <a className="button dark" href={site.phoneHref}>Call Now</a>
        </div>
      </section>
    </>
  );
}
