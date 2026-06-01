import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { pageContent, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Faith Bible Church in Sprakers, New York.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero {...pageContent.contact} />
      <section className="contact-page">
        <div>
          <span className="kicker">Connect With Us</span>
          <h2>Send a note, ask for prayer, or plan your first visit.</h2>
          <p>
            The church office can help with service questions, ministry connections,
            counseling appointments, baptism, membership, or prayer requests.
          </p>
          <div className="contact-stack">
            <a href={site.phoneHref}><Phone size={20} /> {site.phone}</a>
            <a href={`mailto:${site.email}`}><Mail size={20} /> {site.email}</a>
            <a href={site.mapHref}><MapPin size={20} /> {site.address}</a>
          </div>
        </div>
        <form className="contact-form" action={`mailto:${site.email}`} method="post" encType="text/plain">
          <label>
            First name
            <input name="first-name" autoComplete="given-name" />
          </label>
          <label>
            Last name
            <input name="last-name" autoComplete="family-name" />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label className="wide">
            Subject
            <input name="subject" />
          </label>
          <label className="wide">
            Message
            <textarea name="message" rows={6} />
          </label>
          <button className="button primary wide" type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
