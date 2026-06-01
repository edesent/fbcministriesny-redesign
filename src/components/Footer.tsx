import Image from "next/image";
import Link from "next/link";
import { contactMethods, navItems, serviceTimes, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="footer-brand" href="/">
            <Image src="/logo.jpg" alt="" width={52} height={52} />
            <span>
              <strong>{site.name}</strong>
              <small>{site.tagline}</small>
            </span>
          </Link>
          <p>
            A Christ-centered community in Sprakers, New York, seeking to glorify God
            through worship, discipleship, care, and gospel proclamation.
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
