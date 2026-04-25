/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
} from "lucide-react";
import { venueCatalog, type VenueRecord, type VenueType } from "@/lib/data/venues";
import { formatMYR } from "@/lib/utils/currency";
import { AvailabilityBooking } from "@/components/venues/availability-booking";
import styles from "./venue-details.module.css";

const typeLabels: Record<VenueType, string> = {
  wedding: "Wedding Hall",
  corporate: "Conference Venue",
  party: "Event Hall",
  networking: "Social Venue",
};

const venueTaglines: Partial<Record<string, string>> = {
  "v-001": "Skyline-ready space for launches, receptions, and premium corporate nights.",
  "v-002": "A warm heritage estate designed for elegant wedding ceremonies.",
  "v-003": "Industrial creative space for showcases and high-energy private events.",
  "v-004": "Contemporary gallery built for networking sessions and brand activations.",
};

const venueHours: Partial<Record<string, string>> = {
  "v-001": "09:00 - 23:00",
  "v-002": "10:00 - 22:00",
  "v-003": "11:00 - 23:30",
  "v-004": "09:00 - 21:00",
};

type Review = {
  name: string;
  role: string;
  quote: string;
};

const reviewsByVenue: Partial<Record<string, Review[]>> = {
  "v-001": [
    {
      name: "Aisyah Rahman",
      role: "Event Producer",
      quote: "The team support was excellent and the skyline backdrop impressed every guest.",
    },
    {
      name: "Daniel Wong",
      role: "Brand Manager",
      quote: "Setup was smooth, timing was punctual, and AV quality was exactly what we needed.",
    },
    {
      name: "Nadia F.",
      role: "Wedding Planner",
      quote: "Elegant venue flow with plenty of room for ceremony and reception transitions.",
    },
  ],
};

function getVenue(id: string) {
  return venueCatalog.find((item) => item.id === id);
}

function getGallery(venue: VenueRecord) {
  return [
    venue.image,
    ...venueCatalog
      .filter((item) => item.id !== venue.id)
      .slice(0, 3)
      .map((item) => item.image),
  ];
}

function getDescriptions(venue: VenueRecord) {
  return [
    `${venue.title} is optimized for high-impact events with comfortable flow for guests, vendors, and organizers.`,
    `Use it for weddings, networking sessions, launches, private parties, and formal corporate gatherings. The layout supports both seated and standing formats.`,
    `Its biggest strengths are practical location access, flexible seating arrangements, and reliable on-site support for production and guest management.`,
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = getVenue(id);
  return {
    title: venue ? `${venue.title} | Venue Details` : "Venue Details",
  };
}

export default async function VenueDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = getVenue(id);

  if (!venue) {
    notFound();
  }

  const gallery = getGallery(venue);
  const descriptions = getDescriptions(venue);
  const reviews = reviewsByVenue[venue.id] ?? [
    {
      name: "Amirul Hakim",
      role: "Corporate Host",
      quote: "Great venue flow and very easy guest movement from reception to main hall.",
    },
    {
      name: "Grace Lee",
      role: "Wedding Coordinator",
      quote: "Beautiful layout and dependable operations support throughout the day.",
    },
    {
      name: "Kavita S.",
      role: "Community Organizer",
      quote: "Excellent value for capacity and location, with friendly on-site management.",
    },
  ];

  const fullDayRate = venue.hourlyRate * 8;
  const halfDayRate = venue.hourlyRate * 4;
  const facilities = [
    { label: "Air conditioning", icon: Sparkles },
    { label: "Sound system", icon: Building2 },
    { label: "Parking", icon: ShieldCheck },
    { label: "WiFi", icon: Wifi },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <img src={venue.image} alt={venue.title} className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Venue Details</p>
          <h1 className={styles.heroTitle}>{venue.title}</h1>
          <p className={styles.heroTagline}>
            {venueTaglines[venue.id] ?? "Flexible venue setup for premium events in Malaysia."}
          </p>
          <Link href="#booking" className={styles.heroCta}>
            <CalendarDays size={16} />
            Book Now
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Key Information</h2>
          <div className={styles.infoGrid}>
            <article className={styles.infoCard}>
              <MapPin size={16} />
              <span>Location</span>
              <p>{venue.location}</p>
            </article>
            <article className={styles.infoCard}>
              <Users size={16} />
              <span>Capacity</span>
              <p>Up to {venue.pax} guests</p>
            </article>
            <article className={styles.infoCard}>
              <Building2 size={16} />
              <span>Type</span>
              <p>{typeLabels[venue.venueType]}</p>
            </article>
            <article className={styles.infoCard}>
              <Clock3 size={16} />
              <span>Available Hours</span>
              <p>{venueHours[venue.id] ?? "09:00 - 22:00"}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Image Gallery</h2>
          <div className={styles.galleryGrid}>
            {gallery.map((image, index) => (
              <img key={`${venue.id}-gallery-${index}`} src={image} alt={`${venue.title} gallery ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Description</h2>
          <div className={styles.descriptionBlock}>
            {descriptions.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Availability + Booking</h2>
          <div className={styles.bookingGrid}>
            <div className={styles.bookingCard}>
              <h3>Request Your Preferred Slot</h3>
              <p>
                Pick your date and time to check live slot status, then submit your booking
                request directly.
              </p>
              <AvailabilityBooking venueId={venue.id} venueTitle={venue.title} />
            </div>
            <aside className={styles.bookingAside}>
              <h4>Booking Notes</h4>
              <ul>
                <li>Requests are reviewed by venue staff within 24 hours.</li>
                <li>Slots marked booked are not available for new requests.</li>
                <li>For custom setups, include requirements in booking notes.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Facilities</h2>
          <div className={styles.facilityGrid}>
            {facilities.map((item) => (
              <article key={item.label} className={styles.facilityCard}>
                <item.icon size={18} />
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Pricing</h2>
          <div className={styles.pricingGrid}>
            <article className={styles.priceCard}>
              <span>Half-day</span>
              <p>{formatMYR(halfDayRate)}</p>
            </article>
            <article className={styles.priceCard}>
              <span>Full-day</span>
              <p>{formatMYR(fullDayRate)}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          <div className={styles.reviewGrid}>
            {reviews.map((review) => (
              <article key={`${review.name}-${review.role}`} className={styles.reviewCard}>
                <div className={styles.reviewStars}>
                  <Star size={14} fill="#005bbf" />
                  <Star size={14} fill="#005bbf" />
                  <Star size={14} fill="#005bbf" />
                  <Star size={14} fill="#005bbf" />
                  <Star size={14} fill="#005bbf" />
                </div>
                <p>{review.quote}</p>
                <span>
                  {review.name} - {review.role}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
