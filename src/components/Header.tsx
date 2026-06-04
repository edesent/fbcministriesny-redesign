"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape and lock body scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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

      {/* Desktop inline links */}
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile dropdown menu */}
      <nav
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
