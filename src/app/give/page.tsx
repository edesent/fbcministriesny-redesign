import type { Metadata } from "next";
import { HandCoins, Mailbox } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support the ministry of Faith Bible Church in Sprakers, NY through in-person or mailed gifts.",
};

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Give"
        title="The ministry of Faith Bible Church exists thanks to you."
        intro="Every offering we receive goes directly to our Gospel-sharing, truth-seeking, people-loving mission. Thank you for your support and prayers!"
      />

      <section className="service-section">
        <div className="section-heading">
          <span className="kicker">Ways to Give</span>
          <h2>Two simple ways to give</h2>
          <p>Faithful giving supports the ministry of the church, local outreach, discipleship, and worldwide gospel work.</p>
        </div>
        <div className="ministry-grid duo">
          <article className="service-card">
            <HandCoins size={26} strokeWidth={1.6} />
            <span>In Person</span>
            <strong>At a Service</strong>
            <p>
              Place your offering in the brown boxes at the back of the sanctuary
              after the service. Please make checks payable to Faith Bible Church.
            </p>
          </article>
          <article className="service-card">
            <Mailbox size={26} strokeWidth={1.6} />
            <span>By Mail</span>
            <strong>Send a Gift</strong>
            <p>
              Mail checks or money orders to Faith Bible Church, 108 Crosby Rd.,
              Sprakers, NY 12166.
            </p>
          </article>
        </div>
      </section>

      <section className="contact-band">
        <div>
          <span className="kicker">Why Give?</span>
          <h2>Partner in the work God is doing.</h2>
          <p>For giving questions, contact the church office at {site.phone}.</p>
        </div>
        <div className="band-actions">
          <a className="button light" href={site.phoneHref}>Call the Church</a>
          <a className="button glass" href={`mailto:${site.email}`}>Email Us</a>
        </div>
      </section>
    </>
  );
}
