import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${site.name} home`}>
        <Image src="/logo.jpg" alt="Faith Bible Church logo" width={56} height={56} priority />
        <span>
          <strong>Faith Bible</strong>
          <small>Church</small>
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
