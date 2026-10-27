---
name: Peter Njoroge Chege portfolio
description: A restrained, monochrome portfolio presented as a well-formatted technical document.
colors:
  paper: "#fff"
  ink: "#111"
  charcoal: "#333"
  muted: "#555"
  soft-line: "#ddd"
  surface: "#f6f6f6"
typography:
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
  weights: [400, 700]
  display:
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontSize: "14px"
    fontWeight: 400
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "10px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    padding: "10px 20px"
  button-disabled:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    typography: "{typography.body}"
    padding: "10px 20px"
  project-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "20px"
---

# Design System: Peter Njoroge Chege portfolio

## Overview

**Creative North Star: "The Working Technical Document"**

The portfolio reads like a well-formatted technical document: direct, legible, and organized by headings, text, lists, and fine borders. Its monochrome treatment keeps attention on engineering work; typography, spacing, and structure provide hierarchy rather than decorative chrome.

The page frame stays single-column. Grids appear where the shipped pages need them, notably for project cards, case-study galleries, and metrics. The visual language is quiet and square-edged, with reversible hover treatments and a visible keyboard-focus outline. This direction supports the product's friendly, direct voice without adding a separate visual identity.

**Direction contract**
- **THESIS:** A restrained portfolio lets recruiters and collaborators assess engineering work without decorative chrome.
- **OWN-WORLD:** A well-formatted technical document, where headings, text, lists, and borders organize information.
- **STORY:** Start with a clear introduction, then present selected projects, supporting details, About information, and contact paths.
- **FORM:** Keep the page frame single-column; use grids for the three-card project grid and responsive gallery. Use the monochrome palette, square borders, and reversible hover states. The case-study embed has a 16:9 aspect ratio and a 400px minimum height on mobile.
- **Seed reference:** `seed:aa9d78ea82e4ea75`; the recorded roll is [roll.json](./.impeccable/questions/roll.json). The user's detailed design brief remains the governing visual reference.

**Quality bar retained:** The preview demonstrates the tokens and component states. All six site routes should remain usable without horizontal overflow at 375px, 768px, and 1280px; interactive elements should retain visible keyboard focus and 44px targets; empty image slots should retain their dimensions; print should remain black on white and hide navigation and buttons. These are retained acceptance criteria, not claims of a new responsive or print audit.

**Key Characteristics:**
- Monochrome, document-like hierarchy.
- Square forms, one-pixel borders, and restrained gray surfaces.
- Responsive, content-led grids rather than a multi-column page frame.

## Colors

The shipped palette is strictly monochrome: black and white carry primary contrast, while two text grays and a pale surface support secondary information and placeholders.

### Neutral
- **Paper:** The page and default component background.
- **Ink:** Primary text, strong borders, and the dark button state.
- **Charcoal:** Supporting body copy.
- **Muted gray:** Metadata, captions, and placeholder text.
- **Soft gray line:** Disabled button borders.
- **Pale gray surface:** Empty image/embed placeholders and the card hover surface.

### Named Rules
**The Monochrome Document Rule.** Keep hierarchy in the neutral palette; let type, spacing, borders, and surface contrast do the organizing.

## Typography

**Character:** The hierarchy is compact and functional: bold headings mark levels, while regular-weight body copy and smaller metadata distinguish supporting information. The system font stack is an explicit requirement of the brief, used at weights 400 and 700.

### Hierarchy
- **Display:** The large page heading role; it scales down on narrow screens.
- **Headline:** Section headings use the second heading level.
- **Title:** Project and row titles use the third heading level.
- **Body:** Regular copy, with paragraphs constrained to a readable measure.
- **Label:** Small helper text; metadata is smaller still. Status labels are bold and uppercase.

The frontmatter holds the shipped heading, body, and small-text sizes and line heights. The hero lead is larger than body copy; metric values, button labels, navigation, and status text use their own observed component sizing.

## Layout

The centered page frame is capped at 960px overall, including horizontal padding. Side padding is 24px on wider screens and 16px at 600px and below. Paragraphs are capped at 70ch. A compact spacing rhythm is defined in the frontmatter; some components also use direct 20px and 56px spacing values.

Project cards use an auto-fitting grid with a 260px minimum track; from 601px through 900px the grid is explicitly two columns, and at narrow widths it naturally becomes one column. At wide desktop widths the available content area accommodates the three-card layout. Galleries use two columns and collapse to one at 600px and below. Case-study metrics auto-fit from 180px tracks; the page frame itself remains single-column. The header changes to a stacked name/navigation layout at the same mobile breakpoint, the about image stacks above copy, and row content stacks vertically.

Image slots preserve their aspect-ratio geometry: cover imagery is 16:9, avatar imagery is square, and empty cover/gallery slots retain a 16:9 placeholder. The case-study embed uses a 16:9 frame with a 400px minimum height at 600px and below; at narrow widths that minimum can make the rendered frame taller than 16:9.

### Named Rules
**The Responsive Document Frame Rule.** Keep the page frame single-column; let the project, gallery, and metric grids respond within it.

## Elevation & Depth

The shipped system is flat: it uses no shadows or motion transitions. Hierarchy comes from spacing, typography, one-pixel borders, and the pale hover/placeholder surface. Focus is communicated with an outline rather than elevation.

### Named Rules
**The Flat Surface Rule.** Keep components unraised; use the existing border and neutral surface changes for structure and hover feedback.

## Shapes

Corners are square throughout; components use thin, solid black borders. Empty image slots use a dashed border to distinguish placeholders without changing their dimensions. Focus outlines are separate from component borders: 3px, black, with a 2px offset. No rounded-corner or shadow scale is present in the stylesheet.

## Components

### Header and navigation
- A document-style header places the portfolio name opposite a wrapping horizontal menu, separated from the page by a thin border. At the mobile breakpoint, name and navigation stack.
- Menu links are plain text links with a 44px minimum target; the current page is bold and underlined. Hover removes the underline; focus uses the shared visible outline.

```html
<header class="c-header"><a class="c-name" href="/">Site name</a><nav><ul class="c-menu"><li><a aria-current="page" href="/">Home</a></li></ul></nav></header>
```

### Links
- Text links are underlined with a 2px underline offset. Hover removes the underline; keyboard focus remains visible.

```html
<a class="c-link" href="#">View details</a>
```

### Buttons
- Buttons are square, bordered, centered controls with a 44px minimum height. Primary starts dark with light text; secondary starts light with dark text. Hover reverses each treatment. Disabled controls use a soft border and muted text.
- All interactive controls use a 3px outline with a 2px offset when focused.

```html
<a class="c-btn c-btn--primary" href="#">Continue</a>
```

Use a native disabled button for unavailable actions: `<button class="c-btn c-btn--disabled" disabled>Not available yet</button>`.

### Section heading
- Section titles use the shared second-level heading treatment and a 16px lower gap.

```html
<h2 class="c-section-title">Featured projects</h2>
```

### Project card
- Project cards use a thin border, 20px inner padding, and a white resting surface. Hover/focus-within changes the surface to pale gray. Image, title/status, summary, tags, and details link form a consistent vertical stack.
- Progress status is a bordered, uppercase label. Empty and absent-image cards are supported; cover placeholders keep their 16:9 dimensions.

```html
<article class="c-card c-project-card"><div class="c-card__heading"><h3>Project title</h3></div><p class="c-card__summary">Short summary goes here.</p><p class="c-card__tags">Python, Docker</p><a class="c-card__details c-link" href="#">View details</a></article>
```

For progress, add `.c-card--progress` and a `.c-card__status c-card__status--progress` label inside `.c-card__heading`. Cards flow in `.c-card-grid`.

### Metric callout
- A compact bordered block emphasizes a bold value over a smaller supporting caption.

```html
<div class="c-metric"><span class="c-metric__value">24</span><span class="c-metric__caption">Metric caption</span></div>
```

### About box
- A bordered text container supports an optional square portrait floated beside copy on wider screens; the image moves above the text on mobile.

```html
<div class="c-box c-box--about"><div class="c-box__image"><img class="c-img c-img--avatar" src="portrait.jpg" alt="Portrait"></div><p>About text goes here.</p></div>
```

### Image slot
- Real images and empty placeholders share the same ratio class. Placeholders use a dashed outline and pale-gray fill to preserve layout.

```html
<div class="c-img c-img--cover c-img--empty" role="img" aria-label="Image goes here (16:9)">Image goes here (16:9)</div>
```

### Gallery and embed
- Galleries use a two-column figure layout that collapses on mobile. Captions are muted metadata. Embeds fill their bordered frame, retain a 16:9 aspect ratio, and have a 400px mobile minimum height.

```html
<div class="c-gallery"><figure><img class="c-img c-img--gallery" src="work.jpg" alt="Project view"><figcaption class="c-gallery__caption">Caption goes here</figcaption></figure></div>
```

```html
<div class="c-embed c-embed--empty">Embedded project goes here (16:9)</div>
```

### Footer and skip link
- The footer separates contact links from page content with a top border. The skip link is visually hidden until focused, then appears as a bordered control.

```html
<footer class="c-footer"><nav class="c-footer__links" aria-label="Footer"><a class="c-link" href="#">Email</a></nav></footer>
```

```html
<a class="c-skip-link" href="#main">Skip to content</a>
```

### Page layout classes

Use `.page-home`, `.page-projects`, `.page-about`, `.page-resume`, `.page-404`, and `.c-case` for page-level composition. Shared helpers include `.c-hero`, `.c-section`, `.c-card-grid`, `.c-more-work`, `.c-case__meta`, `.c-case__metrics`, `.c-case__sections`, `.c-case__gallery`, and `.c-case__back`.

## Do's and Don'ts

### Do:
- **Do** keep the palette monochrome and let type, spacing, and borders create hierarchy.
- **Do** retain the responsive project-card and gallery grids, and the embed's mobile minimum height.
- **Do** preserve the visible focus outline, 44px control targets, placeholder dimensions, and black-on-white print treatment.
- **Do** use square corners, thin borders, and reversible hover treatments.

### Don't:
- **Don't** add decorative chrome, accent colors, shadows, or motion transitions to this document-like system.
- **Don't** turn the single-column page frame into a multi-column shell.
- **Don't** remove the mobile breakpoints or allow empty image slots to collapse.
