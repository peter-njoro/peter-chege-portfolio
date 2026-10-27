# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and potential collaborators visit Peter Njoroge Chege's portfolio to assess his machine-learning engineering capability and decide whether to engage with him.

## Product Purpose

The portfolio presents Peter's background and work so visitors can evaluate his engineering skills, explore projects, and contact him or access a CV.

## Positioning

The portfolio uses project descriptions and reported results to demonstrate practical engineering work. Its content distinguishes measured performance from unmeasured qualities: for example, the ReconRoll case study describes synthetic-frame concurrency and latency results, and explicitly says model accuracy has not been measured.

## Operating Context

Visitors browse the home, projects, project-detail, About, and Resume pages in a web browser. They can follow project links, download a CV when the files are present, or use the email, GitHub, and LinkedIn links to continue the conversation.

## Capabilities and Constraints

- This is a dependency-free static website built with HTML, CSS, and JavaScript. Content is maintained in `content/content.js`; there is no build step.
- Shared rendering supports project cards and case studies, project tags and status, optional images and embeds, more-work entries, CV links, and contact links.
- Existing content includes ReconRoll, glass-widgets, H-1B sponsorship analysis, and additional work entries. Some case-study fields are still marked TODO; they are draft gaps, not facts to fill by assumption.
- The site currently references CV and image files that are not present. Future work must not imply that unavailable assets can be downloaded or viewed.

## Brand Commitments

Use a friendly tone. Preserve the portfolio name, Peter Njoroge Chege, and the existing identity and contact links unless the owner changes them.

## Evidence on Hand

- `content/content.js` contains the portfolio biography, project descriptions, technology lists, links, and reported results.
- The ReconRoll entry reports a benchmark on synthetic frames: up to two concurrent sessions with 0% frame drop and p95 latency under 500 ms on a 2 vCPU AWS instance. It states that accuracy has not been measured.
- The glass-widgets entry reports 1,429 users within two weeks, one merged outside pull request, and two versions approved on extensions.gnome.org.
- The more-work entries report an ALX capstone analysis of 60,000 records across eight tables with 100+ discrepancies flagged; Kaggle Titanic accuracy and rank; and WorldQuant BRAIN Sharpe, Fitness, and turnover figures.
- These are claims in the current portfolio content, not independently verified by the site. Some project sections remain TODO. There are no project images or CV PDFs in the repository at present.

## Product Principles

- Make it easy for recruiters and collaborators to assess relevant work and make contact.
- Preserve project facts, methods, and stated limitations; do not invent results or overstate evidence.
- Keep the portfolio straightforward to browse and maintain as a static site.
- Use a friendly, direct voice that reflects the owner's supplied content.
