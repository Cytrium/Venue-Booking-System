import Link from "next/link";
import { ArrowRight, CalendarCheck2, CreditCard, SearchCheck, Sparkles } from "lucide-react";
import { howItWorksSteps } from "@/lib/data/venues";

const highlights = [
  {
    title: "Transparent Pricing",
    description: "Compare venues with hourly MYR pricing and no hidden fees.",
    icon: CreditCard,
  },
  {
    title: "Fast Confirmation",
    description: "Most requests are reviewed by venue teams within 24 hours.",
    icon: CalendarCheck2,
  },
  {
    title: "Curated Marketplace",
    description: "Only quality-checked halls, rooftops, and event spaces are listed.",
    icon: Sparkles,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section
        className="py-14 sm:py-20 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,91,191,0.98) 0%, rgba(26,115,232,0.95) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[var(--color-approved-bg)] text-xs sm:text-sm font-bold uppercase tracking-[0.16em] mb-4">
            How It Works
          </p>
          <h1
            className="text-3xl sm:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Book the right venue in four clear steps
          </h1>
          <p className="mt-4 text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            RuangKita simplifies venue discovery, shortlisting, and booking for every event type
            across Malaysia.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {howItWorksSteps.map((step, index) => (
              <article key={step.title} className="card p-5 sm:p-6">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[var(--color-approved-bg)] text-[var(--color-primary)] text-sm font-bold mb-4">
                  {index + 1}
                </span>
                <h2 className="text-lg font-bold text-[var(--color-text)] mb-2">{step.title}</h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-bg-muted)]">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <p className="text-[var(--color-primary)] text-xs sm:text-sm font-bold uppercase tracking-[0.16em] mb-3">
              Why Teams Use RuangKita
            </p>
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built for real event workflows
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {highlights.map((item) => (
              <article key={item.title} className="card p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-approved-bg)] text-[var(--color-primary)] mb-4">
                  <item.icon size={20} />
                </span>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <div className="card p-6 sm:p-10 bg-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Ready to start shortlisting venues?
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-3 max-w-2xl">
                  Use smart filters, compare options, and send your booking request in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/venues" className="btn btn-primary">
                  <SearchCheck size={16} />
                  Browse Venues
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/venues" className="btn btn-primary btn-lg">
            View Full Venue Listing
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
