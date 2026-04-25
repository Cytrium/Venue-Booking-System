"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Menu, X, LogIn } from "lucide-react";

const navLinks = [
  { href: "/", label: "Explore" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/venues", label: "Venue Listing" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/") {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(193,198,214,0.35)] bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2.5" id="nav-logo">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white">
              <Building2 size={18} />
            </span>
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-[var(--color-primary-dark)]">
              RuangKita
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "text-[var(--color-primary)] bg-[var(--color-approved-bg)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-muted)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link href="/admin/login" className="btn btn-primary btn-sm ml-3" id="nav-cta">
              <LogIn size={14} />
              Login
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-muted)]"
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="rounded-xl border border-[rgba(193,198,214,0.35)] bg-white p-2 shadow-[var(--shadow-md)]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-[var(--color-approved-bg)] text-[var(--color-primary)]"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary w-full mt-2"
              >
                <LogIn size={14} />
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
