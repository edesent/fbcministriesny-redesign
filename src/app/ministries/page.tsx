import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ministries, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Ministries for men, women, adults, teens, and children at Faith Bible Church in Sprakers, NY.",
};

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Discover Ministries"
        title="A place to grow for every age and life stage."
        intro="Ministry at Faith Bible isn't a program — it's people. Men, women, teens, and children all have a place to study God's Word, build real friendships, and serve the church family together."
      />

      <section className="ministries-section">
        <div className="ministry-grid">
          {ministries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <Link
                className="ministry-card ministry-card-link"
                key={ministry.slug}
                href={`/ministries/${ministry.slug}`}
              >
                <Icon size={26} strokeWidth={1.6} />
                <h3>{ministry.title}</h3>
                <p>{ministry.blurb}</p>
                <span className="ministry-more">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="callout">
        <div className="callout-inner">
          <GraduationCap size={34} strokeWidth={1.5} />
          <span className="kicker">A Ministry of Faith Bible Church</span>
          <h2>Faith Bible Academy</h2>
          <p>
            A quality Christian education for grades K-12, on a foundation anchored
            in the Word of God.
          </p>
          <div style={{ marginTop: "1.25rem", textAlign: "left", maxWidth: 420 }}>
            <strong style={{ display: "block", marginBottom: "0.5rem", fontSize: "1rem" }}>Graduation Parties</strong>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.8 }}>
              <li>🎓 <strong>Silas</strong> — After graduation on the church property</li>
              <li>🎓 <strong>Ruth</strong> — 2:00 PM at the Appell home</li>
              <li>🎓 <strong>Elijah</strong> — 2:00 PM at the Gural home</li>
            </ul>
          </div>
          <a className="button light" href={site.phoneHref} style={{ marginTop: "1.5rem" }}>
            Call the Church <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="contact-band">
        <div>
          <span className="kicker">Get Involved</span>
          <h2>Ask about the ministry that fits your season.</h2>
          <p>{site.email} · {site.phone}</p>
        </div>
        <div className="band-actions">
          <Link className="button light" href="/contact">Contact the Church</Link>
        </div>
      </section>
    </>
  );
}
