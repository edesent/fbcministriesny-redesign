import Link from "next/link";
import { TreePine } from "lucide-react";
import { contactMethods, navItems, serviceTimes, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="lockup" href="/">
            <span className="brand-mark" aria-hidden>
              <TreePine size={24} strokeWidth={1.6} />
            </span>
            <span>
              <strong>{site.name}</strong>
              <small>{site.tagline}</small>
            </span>
          </Link>
          <p>
            A Christ-centered community in Sprakers, New York, gathering in the
            Mohawk Valley to worship, grow, serve, and proclaim God&apos;s saving grace.
          </p>
        </div>
        <div>
          <h2>Service Times</h2>
          <ul>
            {serviceTimes.map((service) => (
              <li key={service.label}>
                <span>{service.label}</span>
                <strong>{service.time}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            {contactMethods.map((method) => (
              <li key={method.label}>
                <a href={method.href}>{method.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            {navItems.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href={site.facebookHref}>Facebook</a>
      </div>
    </footer>
  );
}
