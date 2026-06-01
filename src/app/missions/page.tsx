import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cross, Globe, HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Missions",
  description:
    "Faith Bible Church supports missionaries proclaiming the gospel locally and around the world.",
};

const pillars = [
  {
    icon: Cross,
    title: "One Message",
    text: "We proclaim one message — the Lord Jesus Christ — and support gospel work that functions in harmony with God's Word.",
  },
  {
    icon: Globe,
    title: "Around the World",
    text: "We pray for and partner with missionaries carrying the gospel across the United States and to the nations.",
  },
  {
    icon: HeartHandshake,
    title: "Pray, Give, Go",
    text: "Our church family supports missions through faithful prayer, generous giving, and a willingness to go.",
  },
];

export default function MissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Missions"
        title="Proclaiming God's saving grace to the world."
        intro="Faith Bible exists to glorify God in the salvation of souls, build up Christians through the teaching of God's Word, and proclaim God's saving grace to the world."
      />

      <section className="service-section">
        <div className="section-heading">
          <span className="kicker">Our Missionaries</span>
          <h2>Partners in the gospel</h2>
          <p>
            Faith Bible Church prayerfully supports a number of missionaries and
            gospel-preaching works at home and abroad. Contact the church office to
            learn more about the missionaries we support and how you can pray for them.
          </p>
        </div>
        <div className="ministry-grid">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <article className="service-card" key={p.title}>
                <Icon size={26} strokeWidth={1.6} />
                <span>Missions</span>
                <strong>{p.title}</strong>
                <p>{p.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-band">
        <div>
          <span className="kicker">Join the Work</span>
          <h2>Pray, give, and go with us.</h2>
          <p>{site.email} · {site.phone}</p>
        </div>
        <div className="band-actions">
          <Link className="button light" href="/give">Give to Missions</Link>
          <Link className="button glass" href="/contact">Contact the Church</Link>
        </div>
      </section>
    </>
  );
}
