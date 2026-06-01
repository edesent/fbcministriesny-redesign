import Link from "next/link";
import { ArrowRight, TreePine } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${site.name} home`}>
        <span className="brand-mark" aria-hidden>
          <TreePine size={24} strokeWidth={1.6} />
        </span>
        <span>
          <strong>Faith Bible Church</strong>
          <small>Sprakers, New York</small>
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-action" href="/contact">
        Plan a Visit <ArrowRight size={16} strokeWidth={2.2} />
      </Link>
    </header>
  );
}
