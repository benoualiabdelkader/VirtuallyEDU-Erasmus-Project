---
name: Literacy Coach System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#574144'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8a7174'
  outline-variant: '#debfc2'
  surface-tint: '#aa304f'
  primary: '#670024'
  on-primary: '#ffffff'
  primary-container: '#8a1538'
  on-primary-container: '#ff97a8'
  inverse-primary: '#ffb2bd'
  secondary: '#635d5d'
  on-secondary: '#ffffff'
  secondary-container: '#e9e0e0'
  on-secondary-container: '#696363'
  tertiary: '#003921'
  on-tertiary: '#ffffff'
  tertiary-container: '#005232'
  on-tertiary-container: '#7fc49b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dd'
  primary-fixed-dim: '#ffb2bd'
  on-primary-fixed: '#400013'
  on-primary-fixed-variant: '#8a1538'
  secondary-fixed: '#e9e0e0'
  secondary-fixed-dim: '#cdc5c5'
  on-secondary-fixed: '#1e1b1b'
  on-secondary-fixed-variant: '#4b4646'
  tertiary-fixed: '#abf2c6'
  tertiary-fixed-dim: '#90d5ab'
  on-tertiary-fixed: '#002111'
  on-tertiary-fixed-variant: '#005232'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Noto Serif
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-md-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  caption-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  caption-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
---

## Brand & Style

The visual narrative bridges authoritative academic mentorship with high-clarity accessibility for digital literacy learners. Built on a foundation of dignity, patience, and clear affordances, the aesthetic draws upon classical editorial clarity balanced against warm, human-scale instructional design.

The design movement combines **Minimalism** with an **Editorial Tactile** balance: pristine white canvases, soft tinted containers, and sharp typographic hierarchy. Every interactive element avoids decorative noise to prioritize learner confidence, reduce cognitive friction, and establish deep trust.

## Colors

The palette is strictly restricted to five dedicated values to avoid visual clutter and maintain strict cognitive focus:

- **Primary Maroon (`#8A1538`)**: Anchor color for primary actions, active states, key icons, and leading highlights.
- **Surface Light / Tint (`#F2E9E9`)**: Subtle warm tint used for card backgrounds, secondary containers, and active input fills.
- **Background (`#FFFFFF`)**: Base canvas for full-screen viewports, modals, and crisp card surfaces when nesting.
- **Text Dark (`#1A1A1A`)**: High-contrast, near-black ink for headlines, body copy, and high-priority instruction.
- **Text Gray (`#6B6B6B`)**: Accessible mid-tone gray for metadata, assistive captions, inactive icons, and dismissive actions.

No decorative tints, semantic greens, or alert blues are introduced; all feedback and hierarchy are mediated strictly through this calibrated monochrome-and-maroon spectrum.

## Typography

Typography establishes an instructive cadence between academic poise and ergonomic legibility:

- **Headlines (`Noto Serif`, 20–24px, Bold)**: Ground every educational section with dignity and literary authority, distinguishing guidance headers from operational controls.
- **Body & Prompts (`Plus Jakarta Sans`, 14–16px, Regular/Bold)**: Ensure effortless tracking and maximum legibility across varied digital literacy levels, rendering exercise copy, coaching cues, and instructional prompts cleanly.
- **Captions & Microcopy (`Plus Jakarta Sans`, 11–12px, Medium)**: Provide compact support for timestamps, secondary helper notes, and metadata while strictly adhering to contrast standards against `#FFFFFF` and `#F2E9E9`.

## Layout & Spacing

The layout is structured around an accessible, single-column or dual-column mobile-first flow that prevents visual fragmentation:

- **Screen Margins**: Minimum `16px` (`margin: 1rem`) screen-edge gutters keep interactive touch points comfortably inside reachable device boundaries.
- **Component Padding**: Interactive cards, instructional callouts, and task boxes use internal padding between `16px` (`space-md`) and `20px` (`space-lg`), giving content breathing room.
- **Vertical Rhythm & Stacking**: Stacked instructional units maintain a uniform gap of `12px` (`space-sm`) to `16px` (`space-md`), creating cohesive visual groups between instructions, examples, and user responses.

## Elevation & Depth

This system avoids synthetic drop-shadows and blurred elevations, relying exclusively on **Tonal Surface Framing** and **Precise Surface Borders**:

- **Layer 0 (Canvas Base)**: Pristine `#FFFFFF` representing global layout surfaces.
- **Layer 1 (Card & Module Layer)**: Tinted `#F2E9E9` containers that isolate coaching modules, reading panels, and interactive question sets against the canvas without drop-shadow interference.
- **Layer 2 (Foreground Elements)**: Floating or elevated interactive components use clean 1px or 2px boundaries using `#8A1538` or clean white cutouts over `#F2E9E9`.
- **Focus & States**: Subtle inset boundaries and tonal shifts define focus states; no ambient blur rings are used.

## Shapes

The geometric identity relies upon a uniform, friendly curvature:

- **Consistent 16px Radius**: All interactive cards, surface containers, action buttons, dialogs, and text input fields strictly feature a `16px` (`1rem` / `rounded-2xl`) corner radius.
- **Consistency Across Scales**: No sharp corners or arbitrary pill buttons; every major surface preserves the same `16px` radius to maintain predictable spatial rhythm and ergonomic feel.

## Components

### Buttons
- **Primary Button**: Solid `#8A1538` background, `#FFFFFF` text, `16px` corner radius, bold body typography (`16px`). Used strictly for primary progression (e.g., "Continue", "Submit Answer").
- **Secondary Button**: `#FFFFFF` or transparent background, 1.5px solid `#8A1538` border, `#8A1538` text, `16px` corner radius. Used for alternative paths (e.g., "Practice Again", "View Hint").
- **Dismissive / Tertiary Button**: Plain text in `#6B6B6B`, no border, no background fill, padding aligned with text. Used for low-priority escapes (e.g., "Skip for now", "Dismiss").

### Cards & Lesson Containers
- **Lesson Surface**: `#F2E9E9` container fill with `16px` radius and `16px` to `20px` internal padding. 
- **Nested Focus Card**: `#FFFFFF` nested within a `#F2E9E9` container with `16px` radius to isolate quotes, drills, or vocabulary words.

### Input Fields
- **Text Inputs**: `#FFFFFF` background with a subtle `#6B6B6B` border (1px) in idle state, shifting to a solid 2px `#8A1538` border on focus. Corner radius fixed at `16px` with `16px` internal padding. Text typed is `#1A1A1A`; placeholder text is `#6B6B6B`.

### Checkboxes & Radio Selectors
- **Radio Buttons & Toggles**: 20px circular selection tokens with a 2px `#8A1538` border when active, housing a solid `#8A1538` dot. Inactive state features a `#6B6B6B` border against a `#FFFFFF` center.
- **Selection Cards**: Entire question choice blocks wrap inside `16px` radius cards; selecting an option shifts card background to `#F2E9E9` with a 2px `#8A1538` perimeter.

### Chips & Badges
- **Coaching Level / Progress Chip**: Compact pill or rounded shape with `16px` radius, styled using `#F2E9E9` fill and `#8A1538` caption text (`12px`, Medium).

### Iconography
- **Style**: Strict single-line, flat outline stroke (1.5px to 2px weight).
- **Coloration**: Rendered exclusively in `#8A1538` for actionable and highlighted items, or `#6B6B6B` for passive informational cues.