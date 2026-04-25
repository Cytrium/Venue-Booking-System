# Design System Specification

## 1. Overview & Creative North Star
This design system is engineered to elevate the venue booking experience from a mere utility to a curated journey. While the platform demands high information density and practical efficiency, the aesthetic execution moves beyond generic templates to establish a signature visual authority.

**Creative North Star: The Precision Concierge**
The system is built on the principle of "Functional Elegance." It prioritizes clarity and trust through a structured architectural layout, using layered depth and high-contrast typography to guide users through complex booking flows without cognitive fatigue. We avoid the "flatness" of standard SaaS by treating the interface as a series of sophisticated, physical planes.

---

## 2. Colors & Surface Architecture
The palette is rooted in professional stability, utilizing a refined spectrum of blues and a highly disciplined approach to white space and depth.

### Surface Hierarchy & Nesting
We reject the use of 1px solid borders for sectioning. Contrast and containment are achieved through **Tonal Layering**.
- **Surface (`#f7f9fb`):** The base canvas.
- **Surface Container Lowest (`#ffffff`):** Reserved for the primary interactive cards and elevated content blocks.
- **Surface Container Low (`#f2f4f6`):** Used for background sectioning to differentiate content areas.
- **Surface Container High (`#e6e8ea`):** Used for secondary UI elements like search bars or inactive tabs.

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for layout division. Boundaries must be defined solely through background color shifts. If an inner container sits on a `surface`, it should transition to `surface-container-low` or `surface-container-lowest` to define its perimeter.

### The "Glass & Gradient" Rule
To inject professional "soul," main CTAs and Hero sections should utilize a subtle gradient transition from `primary` (`#005bbf`) to `primary_container` (`#1a73e8`). For floating navigation or modal headers, apply **Glassmorphism**: use semi-transparent surface colors with a `24px` backdrop blur to create a sense of lightness and premium polish.

---

## 3. Typography
The system utilizes **Manrope** across all levels. Manrope’s geometric yet humanist qualities provide the "Practical & Polished" vibe required for high-utility hospitality platforms.

*   **Display (Display-LG: 3.5rem):** Used for high-impact hero headings. Minimal letter spacing (-2%) to feel authoritative.
*   **Headline (Headline-MD: 1.75rem):** Used for venue titles and major section headers. High-contrast against body text to ensure a clear scanning path.
*   **Title (Title-MD: 1.125rem):** Used for card titles and form section headers. Semi-bold weight to denote importance.
*   **Body (Body-MD: 0.875rem):** The workhorse. Optimized for readability in high-density data views.
*   **Label (Label-MD: 0.75rem):** Used for metadata, status tags, and micro-copy.

---

## 4. Elevation & Depth
Depth is not a decoration; it is a functional tool for information hierarchy.

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift. This mimics the appearance of fine paper layers.

### Ambient Shadows
When an element must "float" (e.g., a sticky search bar or a hover state), use **Ambient Shadows**.
- **Shadow Property:** `0px 12px 32px rgba(25, 28, 30, 0.06)`
- Use a tinted version of the `on-surface` color at ultra-low opacity to mimic natural light rather than artificial grey dropshadows.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use a **Ghost Border**: the `outline-variant` token at 15% opacity. Standard 100% opaque borders are strictly forbidden.

---

## 5. Components

### Cards
*   **Structure:** No external borders. Use `surface-container-lowest` backgrounds.
*   **Padding:** Generous internal spacing (`1.5rem`) to ensure information density doesn't feel cluttered.
*   **Imagery:** Aspect ratio fixed at 4:3 or 16:9 with a `0.75rem (md)` corner radius.

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`). `0.5rem` radius. White text for maximum contrast.
*   **Secondary:** `surface-container-high` background with `on-secondary-container` text. No border.
*   **States:** On hover, increase the shadow spread rather than darkening the color to maintain the "light-filled" hospitality vibe.

### Search & Filtering
*   **The Hub:** The search bar should be a "Floating Hub." Use a `surface-container-lowest` fill with a subtle ambient shadow and backdrop blur if positioned over imagery.
*   **Inputs:** Use `label-md` for persistent floating labels. Input fields should use a subtle `surface-container-high` background shift on focus.

### Status Indicators (Chips)
*   **Success:** `on-primary` text on a soft green background (derived from success tokens).
*   **Pending:** `on-tertiary-fixed` text on `tertiary-fixed` (amber).
*   **Rejected:** `on-error-container` text on `error-container` (red).

---

## 6. Do's and Don'ts

### Do
*   **DO** use vertical white space as a primary separator instead of lines.
*   **DO** use Manrope’s Medium and Semi-Bold weights to create hierarchy within cards.
*   **DO** ensure all interactive elements have a minimum tap target of 44px.
*   **DO** use "surface-bright" for page backgrounds to keep the platform feeling airy and modern.

### Don't
*   **DON'T** use 1px solid black or grey borders to separate list items; use a `surface-container-low` background shift instead.
*   **DON'T** use high-saturation shadows; they break the clean, hospitality aesthetic.
*   **DON'T** mix font families. Stick strictly to the Manrope scale to maintain a functional, engineered feel.
*   **DON'T** overcrowd the search bar. Use a "progressive disclosure" pattern for advanced filters.