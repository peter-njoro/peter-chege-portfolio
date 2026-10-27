# Peter Njoroge Chege — Portfolio

A simple, fast, static portfolio site for an early-career ML engineer in Kenya. No frameworks, no build step, no dependencies. Plain HTML, CSS and JavaScript only.

## Preview locally

Double-click `index.html`. No local server is needed.

Open `design-preview.html` for the component guide. Responsive captures are in `screenshots/`.

The site reads all content from `content/content.js`. Open your browser console to see validation warnings (missing fields, missing alt text, TODO values). These are warnings only and never break the page.

## How to update

All visible text, links, projects and image paths live in `content/content.js` as `window.SITE`. Edit that file only; do not edit the HTML.

### Edit text
Change any string value in `content/content.js` (name, tagline, intro, about text, project summaries, etc.).

### Add a project
1. Copy one object from the `projects` array.
2. Paste it and change `slug`, `title`, `summary`, `status`, `tags`, `links`, `sections`, etc.
3. Set `featured: true` to show it on the home page; omit or set `false` to list it only under "More work" (actually, non-featured projects are not shown on the index; they appear... note: the brief groups projects.html as Featured and More work, but the schema only has `projects` and `moreWork`. Non-featured `projects` are rendered only on `project.html?p=<slug>` if you know the slug. Reordering = reordering the array.
4. Set `show: false` to hide a project without deleting it.

### Add or swap an image
- Place image files in `images/`.
- Update the matching `src` path in `content/content.js` (project cover, gallery, About photo).
- Recommended: JPG or WebP under 200 KB each.
- Empty or missing image slots show a visible placeholder box (1px dashed #111, same aspect ratio) instead of a broken image.

### Replace a CV
- Place PDF files in `files/`.
- Update the `file` path in the `resumes` array in `content/content.js`.
- Set `available: true` for each CV once its PDF is present; unavailable CVs are not shown as download links.
- Available CVs are listed on the Resume page.

### Hide a project
Set `show: false` on that project object.

## Deploy to Netlify

Drag the whole project folder onto Netlify (site deploy → drag and drop). The site works by double-clicking `index.html`, so no build step or server is required.

## What is built

- `index.html` — hero, featured projects grid, short About box, contact row
- `projects.html` — featured projects and more work
- `project.html?p=<slug>` — case-study page rendered from the content file
- `about.html` — longer About text plus optional photo slot
- `resume.html` — download button for each CV file
- `404.html` — not found page
- `styles.css` — all colours, sizes and spacing in CSS variables at the top
- `DESIGN.md` — design tokens and reusable component examples
- `design-preview.html` — visual guide to tokens, type, spacing, and components
- `screenshots/` — design-preview captures at 375px, 768px, and 1280px
- `site.js` — shared header/footer injection, content validation, page rendering
- `content/content.js` — the single content file (`window.SITE`)
- `images/.gitkeep` — image slots (covers, gallery, About photo, favicon, social preview)
- `files/.gitkeep` — CV PDFs

## What is still TODO

Content placeholders marked `TODO` in `content/content.js`:
- ReconRoll sections need more detail (problem context, architecture, root cause of bugs, benchmark tables/charts, migration timeline).
- glass-widgets sections need problem, hard part, next steps.
- H-1B sponsorship analysis is "in-progress" with empty `embed` slot; results and next steps are TODO.
- No images exist yet (covers, gallery, About photo, favicon, social preview). All image slots show placeholders.
- No CV files exist yet (`files/cv-ml.pdf`, `files/cv-ds.pdf`).
- `moreWork` items have empty `url` values.

## Assumptions

- GitHub and LinkedIn links are treated as full URLs (`https://...`).
- The first resume in `resumes` is used for the home-page "Download CV" button.
- Non-featured projects are reachable directly via `project.html?p=<slug>`; they are not listed on the index page.
- `moreWork` items link to external URLs (empty in seed content, so the Open button is hidden until a URL is added).
- Accuracy for ReconRoll is not claimed, per the brief.
