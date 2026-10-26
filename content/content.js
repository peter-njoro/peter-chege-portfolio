/* HOW TO UPDATE THIS SITE
 *
 * All visible text, links, projects and image paths live here in `window.SITE`.
 * Do not edit any HTML file to change content.
 *
 * Adding a project:
 *   1. Copy one object from the `projects` array.
 *   2. Paste it and change `slug`, `title`, `summary`, `tags`, `links`, etc.
 *   3. Set `show: false` to hide a project without deleting it.
 *   4. Reorder projects by moving objects in the array.
 *
 * Image slots (all in `images/`):
 *   - project cover: 16:9, 1600x900
 *   - project gallery: any ratio, 1600px wide
 *   - About photo: square, 800x800 (optional)
 *   - favicon + social preview image (1200x630)
 * Empty or missing image slots show a placeholder box instead of a broken image.
 *
 * CV files go in `files/`.
 *
 * The page validates content on load and logs readable warnings to the
 * console for missing fields, missing alt text, or TODO values. It never
 * breaks the page.
 */

window.SITE = {
  name: "Peter Njoroge Chege",
  tagline: "ML engineer. I build systems and test whether they hold up.",
  intro: "Computer science graduate in Kenya. I work on computer vision, deployment and data analysis with Python, Docker and AWS.",
  location: "Kenya",
  email: "peterchegen12@gmail.com",
  links: {
    github: "https://github.com/peter-njoro",
    linkedin: "https://linkedin.com/in/chege-peter"
  },
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Projects", href: "projects.html" },
    { label: "About", href: "about.html" },
    { label: "Resume", href: "resume.html" }
  ],
  about: {
    text: "I like finding out why something is slow or broken, and checking that a result is real before I trust it. I started as a self-taught backend developer and moved into machine learning and data work.",
    photo: { src: "", alt: "" }
  },
  resumes: [
    { label: "ML Engineer CV", file: "files/cv-ml.pdf" },
    { label: "Data Science CV", file: "files/cv-ds.pdf" }
  ],
  projects: [
    {
      slug: "reconroll",
      show: true,
      featured: true,
      title: "ReconRoll",
      summary: "Real-time facial recognition attendance system.",
      status: "live",
      metric: "",
      tags: ["Python", "Docker", "AWS ECS Fargate", "dlib", "OpenCV", "Django REST Framework", "PostgreSQL"],
      links: [{ label: "GitHub", url: "https://github.com/peter-njoro" }],
      cover: { src: "", alt: "" },
      gallery: [],
      embed: "",
      sections: [
        { heading: "The problem", body: "Tracking attendance in real time with facial recognition needed low detection latency and stable concurrent sessions on a small cloud instance. TODO: add more context about the original problem and constraints." },
        { heading: "What I built", body: "A Python service using dlib and OpenCV for face detection and recognition, wrapped in a Django REST Framework API, with PostgreSQL for storage, containerised with Docker and deployed on AWS ECS Fargate. TODO: describe the architecture and data flow in more detail." },
        { heading: "The hard part", body: "Benchmarking found a configuration bug that cut detection time from 708ms to 46ms per frame. I also found and fixed a thread-safety bug in the benchmark script itself that had produced a false 96% drop rate. TODO: explain the root cause of both bugs." },
        { heading: "Results", body: "Verified ceiling of 2 concurrent real-time sessions at 0% frame drop and p95 latency under 500ms on a 2 vCPU AWS instance (synthetic frames). Three versions exist: a local SQLite prototype, the current cloud-deployed rewrite, and an InsightFace/ArcFace migration in progress. Accuracy has not been measured, so no accuracy claim is made. TODO: add tables or charts of the benchmark results." },
        { heading: "What's next", body: "Migrate to InsightFace / ArcFace. TODO: add timeline and any open questions." }
      ]
    },
    {
      slug: "glass-widgets",
      show: true,
      featured: true,
      title: "glass-widgets",
      summary: "GNOME Shell extension (JavaScript/GJS).",
      status: "live",
      metric: "",
      tags: ["JavaScript", "GJS", "GNOME Shell extension"],
      links: [{ label: "GitHub", url: "https://github.com/peter-njoro" }],
      cover: { src: "", alt: "" },
      gallery: [],
      embed: "",
      sections: [
        { heading: "The problem", body: "TODO: describe the problem this extension solves." },
        { heading: "What I built", body: "A GNOME Shell extension written in JavaScript/GJS." },
        { heading: "The hard part", body: "TODO: describe the hardest part of building it." },
        { heading: "Results", body: "1,429 users within two weeks of release, one merged outside pull request, two versions approved on extensions.gnome.org." },
        { heading: "What's next", body: "TODO: describe planned next steps." }
      ]
    },
    {
      slug: "h1b-sponsorship-analysis",
      show: true,
      featured: true,
      title: "H-1B sponsorship analysis",
      summary: "SQL, Python (pandas) and Power BI on US Department of Labor LCA disclosure data.",
      status: "in-progress",
      metric: "",
      tags: ["SQL", "Python", "pandas", "Power BI"],
      links: [],
      cover: { src: "", alt: "" },
      gallery: [],
      embed: "",
      sections: [
        { heading: "The problem", body: "TODO: describe the analysis goal." },
        { heading: "What I built", body: "An analysis of US Department of Labor LCA disclosure data using SQL, Python (pandas) and Power BI." },
        { heading: "The hard part", body: "TODO: describe the hardest part." },
        { heading: "Results", body: "TODO: add findings." },
        { heading: "What's next", body: "Publish the Power BI dashboard. TODO: add link when ready." }
      ]
    }
  ],
  moreWork: [
    { title: "ALX data analytics capstone", summary: "SQL on a 60,000-record, 8-table database; flagged 100+ data discrepancies.", url: "" },
    { title: "Kaggle Titanic", summary: "0.73444 accuracy, rank 1,569.", url: "" },
    { title: "WorldQuant BRAIN alpha", summary: "Sharpe 1.66, Fitness 1.00, turnover about 32%.", url: "" }
  ]
};
