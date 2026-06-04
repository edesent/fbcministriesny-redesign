import Image from "next/image";
import Link from "next/link";
import { contactMethods, navItems, site, youtube } from "@/lib/site";
import type { LucideIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label={`${site.name} home`}>
            <Image
              className="footer-logo"
              src="/logo-white.png"
              alt={site.name}
              width={1220}
              height={592}
            />
          </Link>
          <p className="footer-tagline">{site.tagline}</p>
          <p>
            A Christ-centered community in Sprakers, New York, gathering in the
            Mohawk Valley to worship, grow, serve, and proclaim God&apos;s saving grace.
          </p>
        </div>
        <div>
          <h2>Follow Us</h2>
          <div className="footer-socials">
            <a href={site.facebookHref} aria-label="Faith Bible Church on Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.9 3.78-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94z" />
              </svg>
            </a>
            {youtube.channelUrl && (
              <a href={youtube.channelUrl} aria-label="Faith Bible Church on YouTube" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z" />
                </svg>
              </a>
            )}
          </div>
          <p className="footer-social-note">
            Stay connected for sermons, events, and church family updates.
          </p>
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
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
                {item.children?.length ? (
                  <ul className="footer-subnav">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
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
