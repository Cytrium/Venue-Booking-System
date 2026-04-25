import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  AirVent,
  Calendar,
  Check,
  MapPin,
  Music,
  ParkingCircle,
  Ruler,
  Shield,
  Sparkles,
  Users,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";

const amenities = [
  { icon: Users, label: "Up to 500 Guests" },
  { icon: Ruler, label: "8,000 sq ft Ballroom" },
  { icon: UtensilsCrossed, label: "In-House Catering" },
  { icon: Music, label: "Pro Sound System" },
  { icon: Sparkles, label: "Crystal Chandeliers" },
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: ParkingCircle, label: "Valet Parking (200 cars)" },
  { icon: AirVent, label: "Climate Control" },
  { icon: Accessibility, label: "Wheelchair Accessible" },
  { icon: Shield, label: "24/7 Security" },
];

const packages = [
  {
    name: "Intimate",
    capacity: "Up to 50 guests",
    features: [
      "Private dining room",
      "Basic sound system",
      "Standard decor",
      "4-hour venue access",
      "Dedicated coordinator",
    ],
    highlighted: false,
  },
  {
    name: "Grand",
    capacity: "Up to 200 guests",
    features: [
      "Main ballroom access",
      "Premium sound and lighting",
      "Elegant decor package",
      "8-hour venue access",
      "Dedicated coordinator",
      "Complimentary bridal suite",
      "In-house catering options",
    ],
    highlighted: true,
  },
  {
    name: "Royal",
    capacity: "Up to 500 guests",
    features: [
      "Full venue exclusive access",
      "Premium AV setup with LED wall",
      "Luxury decor and floral",
      "12-hour venue access",
      "Senior event manager",
      "Bridal and VIP suites",
      "Full catering and bar service",
      "Valet parking included",
    ],
    highlighted: false,
  },
];

export default function VenuePage() {
  return (
    <>
      <section className="bg-[var(--color-primary)]">
        <div className="container mx-auto px-4 sm:px-6 pt-8 pb-12">
          <div className="text-center mb-8">
            <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-[0.15em] mb-3">
              Our Space
            </p>
            <h1
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The Grand RuangKita Ballroom
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
              A space designed for grandeur, equipped for perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="md:col-span-2 relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
              <Image
                src="/venue-hero.png"
                alt="Grand Ballroom"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:h-96">
              <div className="relative h-40 sm:h-56 md:h-full rounded-xl overflow-hidden">
                <Image
                  src="/venue-gallery-1.png"
                  alt="Wedding setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="relative h-40 sm:h-56 md:h-full rounded-xl overflow-hidden">
                <Image
                  src="/venue-gallery-2.png"
                  alt="Conference setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="amenities" className="section bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-[0.15em] mb-3">
              Amenities
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              World-Class Facilities
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {amenities.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-xl bg-[var(--color-bg-muted)] hover:bg-[var(--color-accent)]/10 transition-colors text-center group"
              >
                <item.icon
                  size={28}
                  className="text-[var(--color-accent)] group-hover:scale-110 transition-transform"
                />
                <span className="text-xs sm:text-sm font-medium text-[var(--color-text)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="section bg-[var(--color-bg-muted)]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-[0.15em] mb-3">
              Packages
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Choose Your Experience
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-xl mx-auto">
              Contact us for custom pricing tailored to your specific event needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-5 sm:p-8 transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-[var(--color-primary)] text-white shadow-xl md:scale-[1.02]"
                    : "bg-white border border-[var(--color-border)] hover:shadow-lg"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--color-accent)] text-[var(--color-primary)] text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3
                  className="text-xl sm:text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    pkg.highlighted ? "text-gray-300" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {pkg.capacity}
                </p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          pkg.highlighted
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-approved)]"
                        }`}
                      />
                      <span
                        className={
                          pkg.highlighted ? "text-gray-200" : "text-[var(--color-text-muted)]"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  className={`btn w-full ${pkg.highlighted ? "btn-primary" : "btn-dark"}`}
                >
                  <Calendar size={16} /> Request Booking
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="section bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-6">
              <MapPin size={32} />
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Find Us
            </h2>
            <p className="text-[var(--color-text-muted)] mb-3">
              28 Jalan Sultan Ismail, 50250 Kuala Lumpur
            </p>
            <p className="text-sm text-[var(--color-text-light)] mb-8">
              Conveniently located downtown, 15 minutes from Kuala Lumpur International Airport.
            </p>

            <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden bg-[var(--color-bg-muted)] border border-[var(--color-border)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                  <MapPin size={34} className="mx-auto text-[var(--color-accent)] mb-2" />
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                    Interactive map -{" "}
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-accent)] underline"
                    >
                      Open in Google Maps
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-20 sm:py-24"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Book?
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-8 text-sm sm:text-base">
            Submit your booking request and our events team will get back to you within 24
            hours.
          </p>
          <Link
            href="/book"
            className="btn btn-primary btn-lg w-full sm:w-auto justify-center"
            id="venue-cta-book"
          >
            <Calendar size={20} /> Book This Venue
          </Link>
        </div>
      </section>
    </>
  );
}
