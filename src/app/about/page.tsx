import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { pastorMessage, pastors, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Faith Bible Church is a Christ-centered congregation in Sprakers, NY, and home of Faith Bible Academy.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Faith Bible"
        title="A Christ-centered church family in the Carlisle community."
        intro="Faith Bible Church is a Christ-centered community in Sprakers, New York — forty-five minutes west of Albany — gathering each week to worship, grow, and proclaim God's saving grace."
      />

      <section className="split-section">
        <div>
          <span className="kicker">Who We Are</span>
          <h2>Loving Jesus by loving others.</h2>
          <p>
            When you step inside, you can expect a warm welcome and a service of
            praise and hymns, prayer, encouragement, and a message straight from
            the Bible. We hold to Baptist practices — salvation by faith in Jesus
            Christ, followed by water baptism and discipleship.
          </p>
          <p>
            Faith Bible is an autonomous congregation — self-governing and
            self-supporting — with Jesus Christ as the Head of the church and the
            Bible as our final authority for faith and practice.
          </p>
          <div className="check-list">
            <p><CheckCircle2 size={20} /> Bible-centered preaching, praise, and prayer</p>
            <p><CheckCircle2 size={20} /> An autonomous congregation with Christ as its Head</p>
            <p><CheckCircle2 size={20} /> Home of Faith Bible Academy, a K-12 Christian school</p>
          </div>
        </div>
        <figure className="image-feature">
          <Image
            src="/church-building.jpg"
            alt="Faith Bible Church in Sprakers, New York"
            fill
            sizes="(max-width: 900px) 100vw, 44vw"
          />
          <figcaption>108 Crosby Road, Sprakers</figcaption>
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
          {pastors.map((pastor) => (
            <article className="pastor-card" key={pastor.name}>
              {"photo" in pastor && pastor.photo ? (
                <Image
                  className="pastor-photo"
                  src={pastor.photo}
                  alt={pastor.name}
                  width={64}
                  height={64}
                />
              ) : (
                <span className="pastor-avatar" aria-hidden>{pastor.initials}</span>
              )}
              <div>
                <strong>{pastor.name}</strong>
                <span className="pastor-role">{pastor.role}</span>
                {pastor.phone && <a href={pastor.phoneHref}>{pastor.phone}</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="callout">
        <div className="callout-inner">
          <GraduationCap size={34} strokeWidth={1.5} />
          <span className="kicker">A Ministry of Faith Bible Church</span>
          <h2>Faith Bible Academy</h2>
          <p>
            Faith Bible Academy offers a quality Christian education for grades K-12,
            built on a foundation anchored in the Word of God.
          </p>
          <a className="button light" href={site.phoneHref}>
            Call the Church <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="contact-band">
        <div>
          <span className="kicker">Faith Bible Church</span>
          <h2>{site.address}</h2>
          <p>{site.email} · {site.phone}</p>
        </div>
        <div className="band-actions">
          <a className="button light" href={site.mapHref}>Directions</a>
          <Link className="button glass" href="/contact">Plan a Visit</Link>
        </div>
      </section>
    </>
  );
}
