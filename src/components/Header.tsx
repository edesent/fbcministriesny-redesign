import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${site.name} home`}>
        <Image
          className="brand-logo"
          src="/logo-full.png"
          alt={site.name}
          width={1224}
          height={597}
          priority
        />
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
