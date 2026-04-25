"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Building2, LayoutDashboard, Globe, LogOut, Search } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.push("/admin/login");
    router.refresh();
  }

  const dashboardActive = pathname === "/admin/dashboard";

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-[var(--color-bg-card)] border-r border-[rgba(193,198,214,0.35)] p-4">
        <Link href="/admin/dashboard" className="px-2 py-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white">
              <Building2 size={18} />
            </span>
            <div>
              <p className="font-extrabold text-[var(--color-primary-dark)] leading-none">RuangKita</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-light)] mt-1">
                Management Portal
              </p>
            </div>
          </div>
        </Link>

        <nav className="space-y-1">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              dashboardActive
                ? "bg-[var(--color-approved-bg)] text-[var(--color-primary)]"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)]"
            }`}
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] transition-colors"
          >
            <Globe size={16} /> View Site
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-[rgba(193,198,214,0.35)]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-muted)] transition-colors"
            id="admin-logout"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <div className="md:ml-64 min-h-screen">
        <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-[rgba(193,198,214,0.35)] px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--color-text)]">
              Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-light)]">
              Review and process booking requests.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
              <input
                type="text"
                placeholder="Search records..."
                className="input pl-9 w-56"
                aria-label="Search records"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="btn btn-outline btn-sm px-2.5 sm:px-3">
              <Globe size={14} />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm px-2.5 sm:px-3"
              id="admin-logout-mobile"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
