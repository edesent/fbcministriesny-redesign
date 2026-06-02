import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ministries, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ministries.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  if (!ministry) return { title: "Ministry" };
  return {
    title: ministry.title,
    description: ministry.blurb,
  };
}

export default async function MinistryPage({ params }: Props) {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  if (!ministry) notFound();

  return (
    <>
      <PageHero eyebrow="Ministry" title={ministry.title} intro={ministry.blurb} />

      {ministry.verse && (
        <section className="verse-band verse-band-light">
          <blockquote>&ldquo;{ministry.verse}&rdquo;</blockquote>
          <cite>{ministry.verseRef}</cite>
        </section>
      )}

      <section className="service-section">
        {ministry.intro && (
          <div className="section-heading">
            <span className="kicker">{ministry.title}</span>
            <p>{ministry.intro}</p>
          </div>
        )}

        <div className="program-grid">
          {ministry.programs.map((program) => (
            <article className="program-card" key={program.name}>
              <h3>{program.name}</h3>
              {program.schedule && <span className="program-when">{program.schedule}</span>}
              {program.description && <p>{program.description}</p>}
            </article>
          ))}
        </div>

        {ministry.contact && <p className="program-contact">{ministry.contact}</p>}

        <div className="band-actions" style={{ justifyContent: "center", marginTop: 40 }}>
          <Link className="button outline" href="/ministries">
            <ArrowLeft size={18} /> All Ministries
          </Link>
        </div>
      </section>

      <section className="contact-band">
        <div>
          <span className="kicker">Get Involved</span>
          <h2>We&apos;d love to help you take a next step.</h2>
          <p>{site.email} · {site.phone}</p>
        </div>
        <div className="band-actions">
          <Link className="button light" href="/contact">
            Contact the Church <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
