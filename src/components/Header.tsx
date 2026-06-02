import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${site.name} home`}>
        <Image
          className="brand-logo"
          src="/logo-horizontal.png"
          alt={site.name}
          width={1254}
          height={229}
          priority
        />
      </Link>
      <nav aria-label="Primary navigation">
        {navItems.map((item) =>
          item.children?.length ? (
            <div className="nav-group" key={item.href}>
              <Link href={item.href}>
                {item.label} <ChevronDown size={13} strokeWidth={2.4} aria-hidden />
              </Link>
              <ul className="nav-dropdown">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href}>{child.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ),
        )}
      </nav>
      <Link className="header-action" href="/contact">
        Plan a Visit <ArrowRight size={16} strokeWidth={2.2} />
      </Link>
    </header>
  );
}
