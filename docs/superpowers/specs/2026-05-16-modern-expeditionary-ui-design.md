# Design Spec: The Modern Expeditionary UI Update

**Date:** 2026-05-16
**Status:** Approved
**Topic:** UI/UX overhaul of the Roam-Kumaon website to match the "Reliable Local Expert" brand.

## 1. Goal
Transform the current minimal, form-only landing page into a comprehensive, premium landing page that establishes trust, showcases local expertise, and drives WhatsApp-based quote requests.

## 2. Architecture & Layout
The site will be converted from a single-section app to a multi-section landing page using a 12-column fluid grid on desktop and a 4-column grid on mobile.

### Sections
1.  **Sticky Header:**
    *   Logo: "Roam-Kumaon" (Primary Green).
    *   Nav: "Routes", "Vehicles", "About" (Smooth scroll to anchors).
    *   CTA: "Book Now" (Smooth scroll to Hero Form).
2.  **Hero Section:**
    *   Background: High-quality mountain imagery with a 70% opacity Primary Green overlay.
    *   Text: "Your Journey Through the Kumaon Himalayas Starts Here" (Headline XL).
    *   Form Card: Floating card containing the service tabs (Cab/Bike) and the request form.
3.  **Feature Highlights:**
    *   Three-column grid showcasing "Local Expertise", "Verified Drivers", and "Safety First".
    *   Uses Material Symbols for iconography.
4.  **Pilot Routes:**
    *   Two-column grid with image-heavy cards for "Haldwani / Kathgodam" and "Bageshwar".
5.  **Fleet Preview:**
    *   Three-column grid showcasing "Compact", "SUV / 4x4", and "Premium Sedan" categories.
6.  **Footer:**
    *   Branding, copyright info, and legal links (Privacy, Terms).

## 3. Visual System

### Colors
*   **Primary (Pine Green):** `#012d1d` (Nav, branding, success states).
*   **Secondary (Cedar Brown):** `#755750` (Footer, text accents).
*   **Tertiary (Sunset Orange):** (Optional for highlights, or vibrant green for WhatsApp).
*   **Background:** `#f8f9fa`.
*   **Surface:** `#ffffff` (Cards).

### Typography
*   **Headings:** Montserrat (Bold).
*   **Body/Labels:** Inter (Regular/Semi-bold).
*   **Scale:** Headline XL (48px), Headline LG (32px), Body LG (18px), Body MD (16px).

### Shapes & Elevation
*   **Radius:** 8px for standard components, 16px for containers/cards.
*   **Shadows:** Soft "Ambient Shadows" with a deep green tint.

## 4. Components & Interactions

*   **Service Tabs:** Toggle between Cab and Bike forms with a sliding background or high-contrast state.
*   **Inputs:** 1px border (#outline-variant), shifts to Pine Green on focus.
*   **WhatsApp Button:** Large, high-priority button. Uses `#25D366` (WhatsApp Green) or brand orange, with a chat icon.
*   **Navigation:** Smooth scroll implementation for all internal anchors.

## 5. Technical Implementation
*   **Framework:** React 19 + Vite.
*   **Styling:** Tailwind CSS 4.
*   **Assets:** Stock imagery from Unsplash; icons from Material Symbols.
*   **State Management:** Maintain existing `useState` for form fields and service toggling.

## 6. Testing Strategy
*   **Visual Regression:** Verify layout across mobile (375px) and desktop (1280px+).
*   **Interactions:** Ensure smooth scroll works for all nav links.
*   **Form Logic:** Verify WhatsApp message generation remains correct with new UI fields.
