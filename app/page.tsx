"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AtSign,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Globe,
  Heart,
  MapPin,
  Search,
  Share2,
  Star,
  Users,
  Wallet,
  X,
} from "lucide-react";
import {
  popularCategories,
  venueCatalog,
  type PriceRange,
  type VenueRecord,
} from "@/lib/data/venues";
import { searchFiltersSchema, type SearchFilters } from "@/lib/schemas/search-filters";
import { formatMYR } from "@/lib/utils/currency";
import styles from "./home.module.css";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAXVuysBWVNVEWQRqggqtYUlDU946ter5ZutClGkCN8iiATnsGat9S0TrYZ3KFjoIL61dqW9Up2nAUOfxnztGPYY8R9cRDQM5dczk2lqbl5cVyzOEp1scvY-dNuZ20wBsJ9atHoxhTfg8VFt3jsOMidpN7j4VFFu8b7ScMicaDcs25g-UtHk180LAdiiJ-TzFhWBh1RSrZfAdBayUyWFQBykXbqljhNuyOM61U34jUOPf3qlHcUVgSfsU2uDIuApgpnIsvyGIpeGi4";

const defaultFilters: SearchFilters = {
  venueType: "any",
  location: "",
  date: "",
  pax: "",
  priceRange: "any",
};

const venueTypeOptions: Array<{ label: string; value: SearchFilters["venueType"] }> = [
  { label: "Any venue type", value: "any" },
  { label: "Wedding", value: "wedding" },
  { label: "Corporate", value: "corporate" },
  { label: "Party", value: "party" },
  { label: "Networking", value: "networking" },
];

const locationOptions = [
  "Kuala Lumpur",
  "Ampang",
  "Bandar Tasik Selatan",
  "Bangsar",
  "Bangsar South",
  "Penang",
  "Johor Bahru",
  "Malacca",
  "Shah Alam",
];

function inPriceRange(rate: number, range: PriceRange) {
  if (range === "budget") return rate < 700;
  if (range === "standard") return rate >= 700 && rate <= 1200;
  if (range === "premium") return rate > 1200 && rate <= 1800;
  if (range === "luxury") return rate > 1800;
  return true;
}

function matchVenue(filters: SearchFilters, venue: VenueRecord) {
  const typeMatch = filters.venueType === "any" || filters.venueType === venue.venueType;
  const locationMatch =
    filters.location.trim().length === 0 ||
    venue.location.toLowerCase().includes(filters.location.trim().toLowerCase()) ||
    venue.city.toLowerCase().includes(filters.location.trim().toLowerCase());
  const paxValue = Number(filters.pax);
  const paxMatch = Number.isNaN(paxValue) || filters.pax.trim() === "" || venue.pax >= paxValue;
  const priceMatch = inPriceRange(venue.hourlyRate, filters.priceRange);
  const dateMatch = filters.date.trim() === "" || venue.availableDates.includes(filters.date);
  return typeMatch && locationMatch && paxMatch && priceMatch && dateMatch;
}

function collectFilterErrors(result: ReturnType<typeof searchFiltersSchema.safeParse>) {
  if (result.success) {
    return {};
  }

  const issues: Partial<Record<keyof SearchFilters, string>> = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof SearchFilters | undefined;
    if (field && !issues[field]) {
      issues[field] = issue.message;
    }
  });
  return issues;
}

export default function HomePage() {
  const [draft, setDraft] = useState<SearchFilters>(defaultFilters);
  const [applied, setApplied] = useState<SearchFilters>(defaultFilters);
  const [errors, setErrors] = useState<Partial<Record<keyof SearchFilters, string>>>({});
  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const [showVenueTypePanel, setShowVenueTypePanel] = useState(false);

  const selectedVenueTypeLabel =
    venueTypeOptions.find((option) => option.value === draft.venueType)?.label ?? "Any venue type";

  const filteredVenues = useMemo(
    () => venueCatalog.filter((venue) => matchVenue(applied, venue)),
    [applied],
  );

  const filteredTopRated = useMemo(
    () =>
      [...filteredVenues]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3),
    [filteredVenues],
  );

  const filteredNewListings = useMemo(() => {
    const newest = filteredVenues.filter((venue) => venue.isNew).slice(0, 4);
    if (newest.length > 0) {
      return newest;
    }
    return filteredVenues.slice(0, 4);
  }, [filteredVenues]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = searchFiltersSchema.safeParse(draft);
    if (!result.success) {
      setErrors(collectFilterErrors(result));
      return;
    }

    setErrors({});
    setDraft(result.data);
    setApplied(result.data);
    setShowLocationPanel(false);
    setShowVenueTypePanel(false);
    if (typeof window !== "undefined") {
      window.location.hash = "results";
    }
  }

  function applyLocationSuggestion(location: string) {
    setDraft((prev) => ({ ...prev, location }));
    setErrors((prev) => ({ ...prev, location: undefined }));
    setShowLocationPanel(false);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandWrap}>
            <span className={styles.brandIcon}>
              <Building2 size={18} />
            </span>
            <span className={styles.brand}>RuangKita</span>
          </div>
          <nav className={styles.nav}>
            <Link href="/" className={`${styles.navLink} ${styles.navActive}`}>
              Explore
            </Link>
            <Link href="/how-it-works" className={styles.navLink}>
              How it Works
            </Link>
            <Link href="/venues" className={styles.navLink}>
              Venue Listing
            </Link>
          </nav>
          <div className={styles.headerActions}>
            <button aria-label="Search" className={styles.iconBtn}>
              <Search size={16} />
            </button>
            <Link href="/admin/login" className={styles.loginBtn}>
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <img src={HERO_IMAGE} alt="Luxury ballroom" className={styles.heroBg} />
          <div className={styles.heroOverlay} />

          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>Find the perfect space for your next event.</h1>
              <p className={styles.heroSub}>
                Curated venues for weddings, corporate events, and private gatherings across
                Malaysia.
              </p>
            </div>

            <form className={styles.searchPanel} onSubmit={handleSearch} noValidate>
              <div className={styles.fieldGrid}>
                <div
                  className={`${styles.fieldBlock} ${errors.venueType ? styles.fieldInvalid : ""}`}
                  onBlur={() => window.setTimeout(() => setShowVenueTypePanel(false), 120)}
                >
                  <span className={styles.fieldLabel}>Venue Type</span>
                  <button
                    type="button"
                    className={styles.dropdownTrigger}
                    onClick={() => {
                      setShowVenueTypePanel((prev) => !prev);
                      setShowLocationPanel(false);
                    }}
                  >
                    <span className={styles.inputRow}>
                      <Building2 size={16} color="#4b5f8c" />
                      <span>{selectedVenueTypeLabel}</span>
                    </span>
                    <ChevronDown size={16} />
                  </button>
                  {showVenueTypePanel && (
                    <div className={styles.dropdownPanel}>
                      {venueTypeOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`${styles.dropdownOption} ${
                            draft.venueType === option.value ? styles.dropdownOptionActive : ""
                          }`}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            setDraft((prev) => ({ ...prev, venueType: option.value }));
                            setErrors((prev) => ({ ...prev, venueType: undefined }));
                            setShowVenueTypePanel(false);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.venueType && <span className={styles.fieldError}>{errors.venueType}</span>}
                </div>

                <div
                  className={`${styles.fieldBlock} ${styles.locationField} ${
                    errors.location ? styles.fieldInvalid : ""
                  }`}
                  onBlur={() => window.setTimeout(() => setShowLocationPanel(false), 120)}
                >
                  <span className={styles.fieldLabel}>Location</span>
                  <span className={styles.inputRow}>
                    <MapPin size={16} color="#4b5f8c" />
                    <input
                      value={draft.location}
                      onFocus={() => {
                        setShowLocationPanel(true);
                        setShowVenueTypePanel(false);
                      }}
                      onChange={(event) => {
                        setDraft((prev) => ({ ...prev, location: event.target.value }));
                        setErrors((prev) => ({ ...prev, location: undefined }));
                        setShowLocationPanel(true);
                      }}
                      placeholder="Search destinations"
                    />
                    {draft.location.trim() !== "" && (
                      <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={() => {
                          setDraft((prev) => ({ ...prev, location: "" }));
                          setShowLocationPanel(true);
                        }}
                        aria-label="Clear location"
                      >
                        <X size={14} />
                      </button>
                    )}
                    <ChevronDown size={16} color="#6a7282" />
                  </span>
                  {showLocationPanel && (
                    <div className={styles.locationPanel}>
                      <p className={styles.locationTitle}>Kuala Lumpur</p>
                      {locationOptions
                        .filter((location) =>
                          location.toLowerCase().includes(draft.location.trim().toLowerCase()),
                        )
                        .map((location) => (
                          <button
                            key={location}
                            type="button"
                            className={styles.locationOption}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => applyLocationSuggestion(location)}
                          >
                            {location}
                          </button>
                        ))}
                      {locationOptions
                        .filter((location) =>
                          !location.toLowerCase().includes(draft.location.trim().toLowerCase()),
                        )
                        .slice(0, 3)
                        .map((location) => (
                          <button
                            key={`extra-${location}`}
                            type="button"
                            className={styles.locationOption}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => applyLocationSuggestion(location)}
                          >
                            {location}
                          </button>
                        ))}
                    </div>
                  )}
                  {errors.location && <span className={styles.fieldError}>{errors.location}</span>}
                </div>

                <div
                  className={`${styles.fieldBlock} ${
                    errors.date || errors.pax ? styles.fieldInvalid : ""
                  }`}
                >
                  <span className={styles.fieldLabel}>Date & Pax</span>
                  <span className={styles.dualInput}>
                    <span className={styles.inputChip}>
                      <CalendarDays size={16} color="#4b5f8c" />
                      <input
                        type="date"
                        value={draft.date}
                        onChange={(event) => {
                          setDraft((prev) => ({ ...prev, date: event.target.value }));
                          setErrors((prev) => ({ ...prev, date: undefined }));
                        }}
                      />
                    </span>
                    <span className={styles.inputChip}>
                      <Users size={16} color="#4b5f8c" />
                      <input
                        type="number"
                        min={1}
                        value={draft.pax}
                        onChange={(event) => {
                          setDraft((prev) => ({ ...prev, pax: event.target.value }));
                          setErrors((prev) => ({ ...prev, pax: undefined }));
                        }}
                        placeholder="Add guests"
                      />
                    </span>
                  </span>
                  {errors.date && <span className={styles.fieldError}>{errors.date}</span>}
                  {errors.pax && <span className={styles.fieldError}>{errors.pax}</span>}
                </div>

                <label
                  className={`${styles.fieldBlock} ${errors.priceRange ? styles.fieldInvalid : ""}`}
                >
                  <span className={styles.fieldLabel}>Price Range</span>
                  <span className={styles.inputRow}>
                    <Wallet size={16} color="#4b5f8c" />
                    <select
                      value={draft.priceRange}
                      onChange={(event) => {
                        setDraft((prev) => ({
                          ...prev,
                          priceRange: event.target.value as PriceRange,
                        }));
                        setErrors((prev) => ({ ...prev, priceRange: undefined }));
                      }}
                    >
                      <option value="any">Any budget</option>
                      <option value="budget">Under MYR 700/hr</option>
                      <option value="standard">MYR 700-1,200/hr</option>
                      <option value="premium">MYR 1,201-1,800/hr</option>
                      <option value="luxury">Above MYR 1,800/hr</option>
                    </select>
                    <ChevronDown size={16} color="#6a7282" />
                  </span>
                  {errors.priceRange && (
                    <span className={styles.fieldError}>{errors.priceRange}</span>
                  )}
                </label>
              </div>

              <button className={styles.searchBtn} type="submit">
                <Search size={16} />
                Search
              </button>
            </form>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Popular Categories</h2>
              <p className={styles.sectionSub}>Explore venues tailored to your event needs.</p>
            </div>
          </div>

          <div className={styles.bento}>
            {popularCategories.map((category, index) => (
              <CategoryCard
                key={category.title}
                className={index === 0 || index === 3 ? styles.bentoWide : styles.bentoNarrow}
                image={category.image}
                title={category.title}
                description={category.description}
              />
            ))}
          </div>
        </section>

        <section id="results" className={`${styles.section} ${styles.sectionMuted}`}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Top Rated Venues</h2>
              <p className={styles.sectionSub}>Filtered spaces matched to your search.</p>
            </div>
            <Link href="/venues" className={styles.viewAll}>
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className={styles.cards3}>
            {filteredTopRated.length === 0 && (
              <p className={styles.sectionSub}>No venues match the selected filters.</p>
            )}
            {filteredTopRated.map((venue) => (
              <article key={venue.id} className={styles.venueCard}>
                <div className={styles.venueMedia}>
                  <img src={venue.image} alt={venue.title} className={styles.venueImage} loading="lazy" />
                  <div className={styles.venueBadge}>
                    <Star size={12} fill="#005bbf" /> {venue.rating.toFixed(1)} ({venue.reviews} reviews)
                  </div>
                  <button className={styles.venueFav} aria-label="Add to favourites">
                    <Heart size={15} />
                  </button>
                </div>

                <div className={styles.venueBody}>
                  <div className={styles.venueHead}>
                    <h3 className={styles.venueName}>{venue.title}</h3>
                    <span className={styles.venuePrice}>{formatMYR(venue.hourlyRate)}/hr</span>
                  </div>

                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                      <Users size={14} /> {venue.pax} Pax
                    </span>
                    <span className={styles.metaItem}>
                      <MapPin size={14} /> {venue.location}
                    </span>
                  </div>

                  <Link href={`/venues/${venue.id}`} className={styles.checkBtn}>
                    Check Availability
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>New Listings</h2>
              <p className={styles.sectionSub}>Discover the latest spaces added to our network.</p>
            </div>
          </div>

          <div className={styles.listingGrid}>
            {filteredNewListings.length === 0 && (
              <p className={styles.sectionSub}>No listings match the selected filters.</p>
            )}
            {filteredNewListings.map((listing) => (
              <article key={listing.id} className={styles.listingCard}>
                <img
                  src={listing.image}
                  alt={listing.title}
                  className={styles.listingImage}
                  loading="lazy"
                />
                <div className={styles.listingMeta}>
                  <span className={styles.newTag}>NEW</span>
                  <span className={styles.listingCategory}>{listing.category}</span>
                </div>
                <h4 className={styles.listingTitle}>{listing.title}</h4>
                <p className={styles.listingLocation}>
                  {listing.location} - {listing.pax} Pax
                </p>
                <p className={styles.listingPrice}>{formatMYR(listing.hourlyRate)}/hr</p>
                <Link href={`/venues/${listing.id}`} className={styles.listingDetailsLink}>
                  View Details
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.ctaWrap}>
          <div className={styles.cta}>
            <div className={styles.ctaGlow} />
            <div>
              <h2 className={styles.ctaTitle}>Have a unique space to share?</h2>
              <p className={styles.ctaText}>
                Join thousands of venue owners and start earning today. Our platform makes
                management simple.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/book" className={styles.ctaPrimary}>
                List Your Venue
              </Link>
              <Link href="/how-it-works" className={styles.ctaSecondary}>
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerCopy}>
              {new Date().getFullYear()} RuangKita Venue Booking. All rights reserved.
            </p>
          </div>

          <div className={styles.footerCols}>
            <div>
              <span className={styles.footerColTitle}>Company</span>
              <Link href="/venues" className={styles.footerLink}>
                Venue Listing
              </Link>
              <Link href="/how-it-works" className={styles.footerLink}>
                How it Works
              </Link>
            </div>

            <div>
              <span className={styles.footerColTitle}>Legal</span>
              <a href="#" className={styles.footerLink}>
                Terms of Service
              </a>
              <a href="#" className={styles.footerLink}>
                Privacy Policy
              </a>
            </div>

            <div>
              <span className={styles.footerColTitle}>Social</span>
              <div className={styles.socialRow}>
                <button aria-label="Public" className={styles.socialBtn}>
                  <Globe size={16} />
                </button>
                <button aria-label="Email" className={styles.socialBtn}>
                  <AtSign size={16} />
                </button>
                <button aria-label="Share" className={styles.socialBtn}>
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

type CategoryCardProps = {
  className: string;
  image: string;
  title: string;
  description: string;
};

function CategoryCard({ className, image, title, description }: CategoryCardProps) {
  return (
    <article className={`${styles.categoryCard} ${className}`}>
      <img src={image} alt={title} className={styles.categoryImage} loading="lazy" />
      <div className={styles.categoryShade} />
      <div className={styles.categoryText}>
        <h3 className={styles.categoryTitle}>{title}</h3>
        <p className={styles.categoryDesc}>{description}</p>
        <span className={styles.categoryCta}>
          Explore <ChevronRight size={15} />
        </span>
      </div>
    </article>
  );
}
