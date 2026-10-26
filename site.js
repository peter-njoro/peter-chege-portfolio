/* site.js - shared rendering and validation for the portfolio site.
 * Reads window.SITE from content/content.js and builds the page.
 * Never throws: validation errors are logged as console warnings only.
 */

(function () {
  "use strict";

  var SITE = window.SITE || {};

  // ---------- Validation ----------
  function validate() {
    var warnings = [];
    function warn(msg) { warnings.push(msg); }

    if (!SITE.name) warn("Missing SITE.name");
    if (!SITE.tagline) warn("Missing SITE.tagline");
    if (!SITE.intro) warn("Missing SITE.intro");
    if (!SITE.email) warn("Missing SITE.email");
    if (!SITE.links) warn("Missing SITE.links");
    if (!Array.isArray(SITE.nav) || SITE.nav.length === 0) warn("Missing SITE.nav");

    if (SITE.about) {
      if (!SITE.about.text) warn("Missing SITE.about.text");
      if (SITE.about.photo && (!SITE.about.photo.src || !SITE.about.photo.alt)) {
        warn("About photo missing src or alt");
      }
    }

    if (!Array.isArray(SITE.resumes)) warn("Missing SITE.resumes");
    else {
      SITE.resumes.forEach(function (r, i) {
        if (!r.label) warn("resumes[" + i + "] missing label");
        if (!r.file) warn("resumes[" + i + "] missing file");
      });
    }

    if (!Array.isArray(SITE.projects)) warn("Missing SITE.projects");
    else {
      SITE.projects.forEach(function (p, i) {
        if (!p.slug) warn("projects[" + i + "] missing slug");
        if (!p.title) warn("projects[" + i + "] missing title");
        if (!p.summary) warn("projects[" + i + "] missing summary");
        if (!p.status) warn("projects[" + i + "] missing status");
        if (!Array.isArray(p.tags)) warn("projects[" + i + "] tags should be an array");
        if (!Array.isArray(p.links)) warn("projects[" + i + "] links should be an array");
        if (p.cover && (!p.cover.src || !p.cover.alt)) warn("projects[" + i + "] cover missing src or alt");
        if (Array.isArray(p.gallery)) {
          p.gallery.forEach(function (g, j) {
            if (!g.src || !g.alt) warn("projects[" + i + "] gallery[" + j + "] missing src or alt");
          });
        }
        if (Array.isArray(p.sections)) {
          p.sections.forEach(function (s, j) {
            if (!s.heading) warn("projects[" + i + "] sections[" + j + "] missing heading");
            if (!s.body) warn("projects[" + i + "] sections[" + j + "] missing body");
            if (s.body.indexOf("TODO") !== -1) warn("projects[" + i + "] sections[" + j + "] body contains TODO");
          });
        }
        if (typeof p.show === "undefined") warn("projects[" + i + "] missing show");
      });
    }

    if (!Array.isArray(SITE.moreWork)) warn("Missing SITE.moreWork");

    var json = JSON.stringify(SITE);
    if (json.indexOf("TODO") !== -1) {
      warn("Content contains TODO values - review before launch");
    }

    if (warnings.length > 0) {
      warnings.forEach(function (w) { console.warn("[SITE] " + w); });
    }
  }

  // ---------- Helpers ----------
  function esc(text) {
    if (text == null) return "";
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function getParam(name) {
    var match = window.location.search.match(new RegExp("[?&]" + name + "=([^&]+)"));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    if (path === "" || path === "/") path = "index.html";
    return path;
  }

  // ---------- Header / Footer ----------
  function injectHeader() {
    var header = document.querySelector("header");
    if (!header || !SITE.nav) return;

    var nameLink = document.createElement("a");
    nameLink.href = "index.html";
    nameLink.textContent = SITE.name || "";
    nameLink.className = "site-name";

    var nav = document.createElement("nav");
    var ul = document.createElement("ul");
    ul.className = "nav-list";
    var current = currentPage();
    SITE.nav.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href || "#";
      a.textContent = item.label || "";
      if (item.href === current) a.className = "current";
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);

    header.innerHTML = "";
    header.appendChild(nameLink);
    header.appendChild(nav);
  }

  function injectFooter() {
    var footer = document.querySelector("footer");
    if (!footer) return;
    var html = "";
    if (SITE.links && SITE.links.github) {
      html += '<a href="' + esc(SITE.links.github) + '" class="footer-link">GitHub</a>';
    }
    if (SITE.links && SITE.links.linkedin) {
      html += '<a href="' + esc(SITE.links.linkedin) + '" class="footer-link">LinkedIn</a>';
    }
    if (SITE.email) {
      html += '<a href="mailto:' + esc(SITE.email) + '" class="footer-link">Email</a>';
    }
    footer.innerHTML = '<div class="footer-inner">' + html + '</div>';
  }

  // ---------- Image rendering ----------
  function imageSlot(slot, label, width, height, lazy) {
    var src = (slot && slot.src) ? slot.src : "";
    var alt = (slot && slot.alt) ? slot.alt : "";
    var loadingAttr = lazy ? ' loading="lazy"' : "";
    var wAttr = width ? ' width="' + width + '"' : "";
    var hAttr = height ? ' height="' + height + '"' : "";

    if (src) {
      return '<img src="' + esc(src) + '" alt="' + esc(alt) + '"' + wAttr + hAttr + loadingAttr + ' style="display:block;width:100%;height:auto;">';
    }
    var ratioStyle = "";
    if (width && height) {
      ratioStyle = ' style="aspect-ratio:' + width + ' / ' + height + ';"';
    }
    return '<div class="placeholder"' + ratioStyle + '>' + esc(label) + '</div>';
  }

  // ---------- Project card ----------
  function projectCard(p) {
    var tagsHtml = "";
    if (Array.isArray(p.tags)) {
      p.tags.forEach(function (t) {
        tagsHtml += '<span class="tag">' + esc(t) + '</span>';
      });
    }
    var linksHtml = "";
    if (Array.isArray(p.links)) {
      p.links.forEach(function (l) {
        linksHtml += '<a href="' + esc(l.url) + '" class="btn btn-secondary">' + esc(l.label) + '</a>';
      });
    }
    var statusBadge = p.status ? '<span class="status status-' + p.status + '">' + esc(p.status) + '</span>' : "";

    return (
      '<article class="project-card">' +
      imageSlot(p.cover, "Image goes here, 16:9", 1600, 900, true) +
      '<div class="card-body">' +
      '<h3>' + esc(p.title) + '</h3>' +
      statusBadge +
      '<p>' + esc(p.summary) + '</p>' +
      '<div class="tags">' + tagsHtml + '</div>' +
      '<div class="card-links">' + linksHtml + '</div>' +
      '</div>' +
      '</article>'
    );
  }

  // ---------- Page renderers ----------
  function renderIndex() {
    var main = document.querySelector("main");
    if (!main) return;

    var featured = [];
    if (Array.isArray(SITE.projects)) {
      featured = SITE.projects.filter(function (p) { return p.show !== false && p.featured; });
    }

    var cardsHtml = "";
    featured.forEach(function (p) { cardsHtml += projectCard(p); });

    var aboutShort = SITE.about && SITE.about.text ? SITE.about.text : "";
    var photoHtml = "";
    if (SITE.about && SITE.about.photo && SITE.about.photo.src) {
      photoHtml = imageSlot(SITE.about.photo, "About photo", 800, 800, false);
    } else if (SITE.about && SITE.about.photo) {
      photoHtml = '<div class="placeholder" style="aspect-ratio:1;">Image goes here, 800x800</div>';
    }

    var contactHtml = "";
    if (SITE.email) contactHtml += '<a href="mailto:' + esc(SITE.email) + '" class="btn btn-primary">Email me</a>';
    if (SITE.links && SITE.links.github) contactHtml += '<a href="' + esc(SITE.links.github) + '" class="btn btn-secondary">GitHub</a>';
    if (SITE.links && SITE.links.linkedin) contactHtml += '<a href="' + esc(SITE.links.linkedin) + '" class="btn btn-secondary">LinkedIn</a>';

    var downloadCvHtml = "";
    if (Array.isArray(SITE.resumes) && SITE.resumes.length > 0) {
      downloadCvHtml = '<a href="' + esc(SITE.resumes[0].file) + '" class="btn btn-primary">Download CV</a>';
    }

    main.innerHTML =
      '<section class="hero">' +
      '<h1>' + esc(SITE.tagline || "") + '</h1>' +
      '<p>' + esc(SITE.intro || "") + '</p>' +
      '<div class="hero-actions">' +
      '<a href="projects.html" class="btn btn-primary">View projects</a>' +
      downloadCvHtml +
      '</div>' +
      '</section>' +

      '<section class="featured">' +
      '<h2>Featured projects</h2>' +
      '<div class="project-grid">' + cardsHtml + '</div>' +
      '</section>' +

      '<section class="about-short">' +
      '<h2>About</h2>' +
      photoHtml +
      '<p>' + esc(aboutShort) + '</p>' +
      '</section>' +

      '<section class="contact">' +
      '<h2>Contact</h2>' +
      contactHtml +
      '</section>';
  }

  function renderProjects() {
    var main = document.querySelector("main");
    if (!main) return;

    var featured = [];
    var more = [];
    if (Array.isArray(SITE.projects)) {
      SITE.projects.forEach(function (p) {
        if (p.show === false) return;
        if (p.featured) featured.push(p);
        else more.push(p);
      });
    }

    var featuredHtml = "";
    featured.forEach(function (p) { featuredHtml += projectCard(p); });

    var moreHtml = "";
    if (Array.isArray(SITE.moreWork)) {
      SITE.moreWork.forEach(function (m) {
        moreHtml +=
          '<div class="more-item">' +
          '<h3>' + esc(m.title) + '</h3>' +
          '<p>' + esc(m.summary) + '</p>' +
          (m.url ? '<a href="' + esc(m.url) + '" class="btn btn-secondary">Open</a>' : "") +
          '</div>';
      });
    }

    main.innerHTML =
      '<section class="featured">' +
      '<h2>Featured projects</h2>' +
      '<div class="project-grid">' + featuredHtml + '</div>' +
      '</section>' +

      '<section class="more-work">' +
      '<h2>More work</h2>' +
      '<div class="more-list">' + moreHtml + '</div>' +
      '</section>';
  }

  function renderProject() {
    var main = document.querySelector("main");
    if (!main) return;
    var slug = getParam("p");
    var project = null;
    if (Array.isArray(SITE.projects)) {
      SITE.projects.forEach(function (p) { if (p.slug === slug) project = p; });
    }

    if (!project) {
      main.innerHTML = '<h2>Project not found</h2><p><a href="projects.html">Back to projects</a></p>';
      return;
    }

    var statusBadge = project.status ? '<span class="status status-' + project.status + '">' + esc(project.status) + '</span>' : "";
    var tagsHtml = "";
    if (Array.isArray(project.tags)) {
      project.tags.forEach(function (t) { tagsHtml += '<span class="tag">' + esc(t) + '</span>'; });
    }
    var linksHtml = "";
    if (Array.isArray(project.links)) {
      project.links.forEach(function (l) {
        linksHtml += '<a href="' + esc(l.url) + '" class="btn btn-secondary">' + esc(l.label) + '</a>';
      });
    }

    var galleryHtml = "";
    if (Array.isArray(project.gallery)) {
      project.gallery.forEach(function (g) {
        galleryHtml +=
          '<figure class="gallery-item">' +
          '<a href="' + esc(g.src) + '">' + imageSlot(g, g.alt || "Image", 1600, 900, true) + '</a>' +
          (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : "") +
          '</figure>';
      });
    }

    var embedHtml = "";
    if (project.embed) {
      embedHtml = '<div class="embed"><iframe src="' + esc(project.embed) + '" loading="lazy" style="width:100%;height:600px;border:none;"></iframe></div>';
    }

    var sectionsHtml = "";
    if (Array.isArray(project.sections)) {
      project.sections.forEach(function (s) {
        sectionsHtml += '<div class="case-section"><h3>' + esc(s.heading) + '</h3><p>' + esc(s.body) + '</p></div>';
      });
    }

    document.title = project.title + " · " + (SITE.name || "");

    main.innerHTML =
      '<article class="case-study">' +
      '<header class="case-header">' +
      imageSlot(project.cover, "Image goes here, 16:9", 1600, 900, false) +
      '<div class="case-meta">' +
      statusBadge +
      '<h1>' + esc(project.title) + '</h1>' +
      '<p>' + esc(project.summary) + '</p>' +
      '<div class="tags">' + tagsHtml + '</div>' +
      '<div class="card-links">' + linksHtml + '</div>' +
      '</div>' +
      '</header>' +
      embedHtml +
      '<div class="gallery">' + galleryHtml + '</div>' +
      '<div class="case-sections">' + sectionsHtml + '</div>' +
      '</article>';
  }

  function renderAbout() {
    var main = document.querySelector("main");
    if (!main) return;
    var photoHtml = "";
    if (SITE.about && SITE.about.photo) {
      if (SITE.about.photo.src) {
        photoHtml = imageSlot(SITE.about.photo, "About photo", 800, 800, false);
      } else {
        photoHtml = '<div class="placeholder" style="aspect-ratio:1;">Image goes here, 800x800</div>';
      }
    }
    main.innerHTML =
      '<article class="about-page">' +
      '<h1>About</h1>' +
      photoHtml +
      '<p>' + esc(SITE.about && SITE.about.text ? SITE.about.text : "") + '</p>' +
      '</article>';
  }

  function renderResume() {
    var main = document.querySelector("main");
    if (!main) return;
    var buttonsHtml = "";
    if (Array.isArray(SITE.resumes)) {
      SITE.resumes.forEach(function (r) {
        buttonsHtml += '<a href="' + esc(r.file) + '" class="btn btn-primary">' + esc(r.label) + '</a>';
      });
    }
    main.innerHTML =
      '<article class="resume-page">' +
      '<h1>Resume</h1>' +
      '<p>Download a CV below.</p>' +
      '<div class="resume-buttons">' + buttonsHtml + '</div>' +
      '</article>';
  }

  function render404() {
    var main = document.querySelector("main");
    if (!main) return;
    main.innerHTML =
      '<article class="not-found">' +
      '<h1>404</h1>' +
      '<p>Page not found.</p>' +
      '<a href="index.html" class="btn btn-primary">Go home</a>' +
      '</article>';
  }

  // ---------- Init ----------
  function init() {
    validate();
    injectHeader();
    injectFooter();

    var page = currentPage();
    if (page === "index.html") renderIndex();
    else if (page === "projects.html") renderProjects();
    else if (page === "project.html") renderProject();
    else if (page === "about.html") renderAbout();
    else if (page === "resume.html") renderResume();
    else if (page === "404.html") render404();
    else render404();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
