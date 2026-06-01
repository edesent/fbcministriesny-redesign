import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Music,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Ministries for men, women, adults, teens, and children at Faith Bible Church in Sprakers, NY.",
};

const ministries = [
  {
    title: "Men's Ministry",
    icon: Users,
    text: "Fellowship, Bible study, prayer, and accountability that encourage men to grow as strong soldiers of Jesus Christ.",
  },
  {
    title: "Women's Ministry",
    icon: HeartHandshake,
    text: "Encouragement, prayer, and spiritual growth as women study God's Word and build lasting friendships.",
  },
  {
    title: "Adult's Ministry",
    icon: BookOpen,
    text: "Bible-centered teaching and discipleship that care for believers in every season of life.",
  },
  {
    title: "Teen's Ministry",
    icon: Music,
    text: "A place for 7th–12th grade students to enjoy games, worship, and solid Bible teaching on Wednesday nights.",
  },
  {
    title: "Kid's Ministry",
    icon: Baby,
    text: "Sunday School, Children's Church, Wednesday clubs, and nursery care that point children to Jesus.",
  },
];

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Discover Ministries"
        title="A place to grow for every age and life stage."
        intro="The ministries at Faith Bible Church exist to help you get involved, meet other believers in a similar season of life, and connect and grow with God."
      />

      <section className="ministries-section">
        <div className="ministry-grid">
          {ministries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <article className="ministry-card" key={ministry.title}>
                <Icon size={26} strokeWidth={1.6} />
                <h3>{ministry.title}</h3>
                <p>{ministry.text}</p>
              </article>
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
          <a className="button light" href={site.phoneHref}>
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
