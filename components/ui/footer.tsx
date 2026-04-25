"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/") {
    return null;
  }

  return (
    <footer className="mt-10 border-t border-[rgba(193,198,214,0.35)] bg-[var(--color-bg-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white">
                <Building2 size={18} />
              </span>
              <span className="text-base font-extrabold tracking-tight text-[var(--color-primary-dark)]">
                RuangKita
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-sm">
              RuangKita. a Hall / Venue Booking Web App in Malaysia.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-light)] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "How it Works", "Venue Listing", "Book Venue", "Admin Portal"].map((label) => {
                const href =
                  label === "Home"
                    ? "/"
                    : label === "How it Works"
                      ? "/how-it-works"
                      : label === "Venue Listing"
                        ? "/venues"
                        : label === "Book Venue"
                        ? "/book"
                        : "/admin/login";

                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-light)] mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                <MapPin size={15} className="mt-0.5 text-[var(--color-primary)]" />
                <span>12 Jalan Bukit Bintang, 55100 Kuala Lumpur</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Phone size={15} className="text-[var(--color-primary)]" />
                <span>+60 3-2143 2024</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Mail size={15} className="text-[var(--color-primary)]" />
                <span>support@ruangkita.my</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(193,198,214,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs text-center text-[var(--color-text-light)]">
            {new Date().getFullYear()} RuangKita Venue Booking. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
