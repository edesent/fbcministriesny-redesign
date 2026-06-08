import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpen, HeartHandshake, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Counseling",
  description:
    "Free biblical counseling by appointment at Faith Bible Church in Sprakers, NY.",
};

export default function CounselingPage() {
  return (
    <>
      <PageHero
        eyebrow="Biblical Counseling"
        title="Need counseling? There is hope."
        intro="Real problems require real solutions. In every case, we look to the Bible to answer the problems of life — because God has given us all we need to know Him and to live in a way that is pleasing to Him."
      />

      <section className="split-section">
        <div>
          <span className="kicker">There Is Hope</span>
          <h2>Help and hope from God's sufficient Word.</h2>
          <p>
            Faith Bible offers biblical counseling for the struggles we all face —
            marriage difficulties, parenting challenges, sexual sin, emotional
            battles, and more. We have found that those who come for counseling
            often experience meaningful progress within a few months.
          </p>
          <p>
            Counseling is offered free of charge. Our counselors volunteer their
            time, and the church provides the facilities, so there is no cost to you.
          </p>
        </div>
        <aside className="service-panel">
          <span>Qualified Counselors</span>
          <h3>Trained to walk with you</h3>
          <p style={{ color: "var(--ink-soft)" }}>
            Pastor Mark and his wife Kathy have completed rigorous biblical
            counseling training and would count it a privilege to meet with you.
          </p>
          <div className="counsel-points">
            <p><BookOpen size={20} /> A Bible-centered approach to real solutions</p>
            <p><HeartHandshake size={20} /> Care for marriage, family, and emotional needs</p>
            <p><Phone size={20} /> Appointments available by phone or email</p>
          </div>
          <a className="button primary full" href={site.phoneHref}>
            Call {site.phone} <ArrowRight size={18} />
          </a>
        </aside>
      </section>

      <section className="contact-band">
        <div>
          <span className="kicker">Schedule an Appointment</span>
          <h2>We would love to walk through it with you.</h2>
          <p>Call {site.phone} or email {site.email} to set up an appointment.</p>
        </div>
        <div className="band-actions">
          <a className="button light" href={site.phoneHref}>Call Now</a>
          <a className="button glass" href={`mailto:${site.email}`}>Email Us</a>
        </div>
      </section>
    </>
  );
}
