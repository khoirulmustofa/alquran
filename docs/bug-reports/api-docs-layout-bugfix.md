# Bug Remediation Plan: API Docs Container Layout & Response Scroll Fix

**Report ID:** `BUG-2026-APIDOCS-001`  
**Target File:** [`app/pages/api-docs.vue`](file:///c:/Users/Zahra/Documents/JS/alquran/app/pages/api-docs.vue)  
**Status:** DRAFT (Awaiting Execution Approval)  
**Severity:** Medium (UI/UX Layout Defect & Scroll Usability Trap)

---

## 1. Problem Classification & Root Cause Analysis

### 1.1 Category
- **Root Cause Category:** *CSS Flexbox Min-Width Violation, Non-Standard Shell Geometry & Nested Scroll Trap*.

### 1.2 Identified Failure Seams
1. **Case Over-Lebar (Inconsistent Outer Geometry & Horizontal Flex Blowout):**
   - **Shell Width Mismatch:** [`app/pages/api-docs.vue`](file:///c:/Users/Zahra/Documents/JS/alquran/app/pages/api-docs.vue#L4) was configured with `max-w-[1360px]` and `min-h-[720px]`, whereas [`app/pages/quran.vue`](file:///c:/Users/Zahra/Documents/JS/alquran/app/pages/quran.vue#L4) uses the exact standard of `max-w-[1280px]` and `min-h-[680px]`.
   - **Left Directory Column Mismatch:** `api-docs.vue` used `lg:w-80` (320px) instead of the standard `w-72` (288px) used in `quran.vue`.
   - **Missing `min-w-0` on Flex Containers:** Under CSS Flexbox, flex children have `min-width: auto` by default. Because `<pre>` blocks inside the JSON and code snippet viewer contain long preformatted strings, the flex child expanded horizontally beyond the screen, blowing out the right edge of the desktop window container ("case over lebar").

2. **Scroll Hasil API (Nested Double Scroll Trap):**
   - In [`app/pages/api-docs.vue`](file:///c:/Users/Zahra/Documents/JS/alquran/app/pages/api-docs.vue#L98), the main right console has `overflow-y-auto`.
   - Inside that same console, the JSON display box ([#L250](file:///c:/Users/Zahra/Documents/JS/alquran/app/pages/api-docs.vue#L250)) had a fixed `max-h-96` (384px) with another `overflow-y-auto`.
   - When large API responses (such as `chapters.json` with 2,054 lines or surah verses) render, users encounter a dual scrollbar conflict: the mouse wheel gets trapped in the inner 384px box, making it difficult to scroll through the page and causing awkward clipping.

---

## 2. Invariant Specifications

- **INV-001 (Geometry Parity):** The window shell of `api-docs.vue` must strictly match `quran.vue`:
  `w-full max-w-[1280px] h-[92vh] min-h-[680px] max-h-[960px] bg-white rounded-3xl shadow-2xl flex overflow-hidden border border-slate-200/80 relative`
- **INV-002 (Left Column Parity):** The endpoint sidebar must have `w-full lg:w-72 shrink-0 border-r border-slate-100 flex flex-col bg-slate-50/40`.
- **INV-003 (Flexbox Overflow Immunity):** All flex items and code containers must enforce `min-w-0` and proper `break-all` / `overflow-x-auto` to strictly prevent horizontal window expansion.
- **INV-004 (Scroll Ergonomics):** The JSON response inspector must feature smooth, ergonomic scrolling:
  - Add height mode toggle: **Compact (max-h-96)** vs **Expanded / Maximize (max-h-[650px] or full)** so developer can read the response comfortably like Quran text without being trapped in a tiny box.
  - Apply custom sleek scrollbars and prevent wheel trapping on the outer page.

---

## 3. Surgical Remediation Plan

### Step 1: Align Outer Container Dimensions & Left Column
In [`app/pages/api-docs.vue`](file:///c:/Users/Zahra/Documents/JS/alquran/app/pages/api-docs.vue):
- Change `max-w-[1360px] min-h-[720px]` to `max-w-[1280px] min-h-[680px]` (exact parity with `quran.vue`).
- Change `w-full lg:w-80` to `w-full lg:w-72` on the endpoint directory column.
- Add `min-w-0` to the outer content wrapper `flex-1 flex flex-col min-w-0 bg-[#fbfcfd]`.
- Add `min-w-0` to the 2-column flex area and the right-hand main console.

### Step 2: Fix Nested Scroll Trap & Add JSON Viewer Expand/Collapse
- Introduce `isJsonExpanded = ref(false)` state.
- Add toggle button in JSON console header: "Perluas Tampilan" / "Perkecil".
- When expanded, JSON viewer uses `max-h-[600px]` with clear scroll indicator and line counter.
- Add `overscroll-contain` to the JSON container so mouse wheel scroll does not jump or trap outer page scroll.
- Ensure `<pre>` block has `overflow-x-auto break-words min-w-0`.

---

## 4. Verification Plan

1. **Geometry Verification:**
   - Verify `api-docs.vue` matches `quran.vue` width (1280px container on desktop, centered with identical padding).
2. **Horizontal Overflow Check:**
   - Inspect viewport at 1024px, 1280px, and 1440px to confirm zero horizontal scroll on the outer window.
3. **Scroll Test:**
   - Fetch `/data/quran/chapters.json` (2,054 lines).
   - Test mouse wheel scrolling inside JSON box and outer console. Verify smooth interaction without trap.
   - Test "Expand View" toggle button.
