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
    nameLink.className = "c-name";

    var nav = document.createElement("nav");
    var ul = document.createElement("ul");
    ul.className = "c-menu";
    var current = currentPage();
    SITE.nav.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href || "#";
      a.textContent = item.label || "";
      if (item.href === current) a.setAttribute("aria-current", "page");
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);

    header.innerHTML = "";
    header.className = "c-header";
    header.appendChild(nameLink);
    header.appendChild(nav);
  }

  function injectFooter() {
    var footer = document.querySelector("footer");
    if (!footer) return;
    var html = "";
    if (SITE.links && SITE.links.github) {
      html += '<a href="' + esc(SITE.links.github) + '" class="c-link">GitHub</a>';
    }
    if (SITE.links && SITE.links.linkedin) {
      html += '<a href="' + esc(SITE.links.linkedin) + '" class="c-link">LinkedIn</a>';
    }
    if (SITE.email) {
      html += '<a href="mailto:' + esc(SITE.email) + '" class="c-link">Email</a>';
    }
    footer.className = "c-footer";
    footer.innerHTML = '<div class="c-footer__links">' + html + '</div>';
  }

  // ---------- Image rendering ----------
  function imageSlot(slot, label, width, height, lazy, kind) {
    var src = (slot && slot.src) ? slot.src : "";
    var alt = (slot && slot.alt) ? slot.alt : "";
    var loadingAttr = lazy ? ' loading="lazy"' : "";
    var wAttr = width ? ' width="' + width + '"' : "";
    var hAttr = height ? ' height="' + height + '"' : "";
    var imageKind = kind || (width === height ? "avatar" : "cover");
    var imageClass = "c-img c-img--" + imageKind;

    if (src) {
      return '<img class="' + imageClass + '" src="' + esc(src) + '" alt="' + esc(alt) + '"' + wAttr + hAttr + loadingAttr + '>';
    }
    return '<div class="' + imageClass + ' c-img--empty" role="img" aria-label="' + esc(label) + '">' + esc(label) + '</div>';
  }

  // ---------- Project card ----------
  function projectCard(p) {
    var tags = Array.isArray(p.tags) ? p.tags.map(esc).join(", ") : "";
    var isInProgress = p.status === "in-progress";
    var cardClass = "c-card c-project-card" + (isInProgress ? " c-card--progress" : "");
    var statusLabel = isInProgress
      ? '<span class="c-card__status c-card__status--progress">In progress</span>'
      : "";
    var detailsLink = p.slug
      ? '<a class="c-card__details c-link" href="project.html?p=' + encodeURIComponent(p.slug) + '">View details</a>'
      : "";
    var coverHtml = imageSlot(p.cover, "Image goes here (16:9)", 1600, 900, true, "cover");

    return (
      '<article class="' + cardClass + '">' +
      '<div class="c-card__image">' + coverHtml + '</div>' +
      '<div class="c-card__heading"><h3>' + esc(p.title) + '</h3>' + statusLabel + '</div>' +
      '<p class="c-card__summary">' + esc(p.summary) + '</p>' +
      '<p class="c-card__tags">' + tags + '</p>' +
      detailsLink +
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
    if (SITE.about && SITE.about.photo) {
      photoHtml = imageSlot(SITE.about.photo, "Image goes here (1:1)", 800, 800, false, "avatar");
    }

    var contactHtml = "";
    if (SITE.email) contactHtml += '<a href="mailto:' + esc(SITE.email) + '" class="c-btn c-btn--primary">Email me</a>';
    if (SITE.links && SITE.links.github) contactHtml += '<a href="' + esc(SITE.links.github) + '" class="c-btn">GitHub</a>';
    if (SITE.links && SITE.links.linkedin) contactHtml += '<a href="' + esc(SITE.links.linkedin) + '" class="c-btn">LinkedIn</a>';
    var heroContactHtml = SITE.email
      ? '<a href="mailto:' + esc(SITE.email) + '" class="c-btn">Get in touch</a>'
      : "";

    main.innerHTML =
      '<div class="page-home">' +
      '<section class="c-hero">' +
      '<h1>' + esc(SITE.tagline || "") + '</h1>' +
      '<p>' + esc(SITE.intro || "") + '</p>' +
      '<div class="c-hero__actions">' +
      '<a href="projects.html" class="c-btn c-btn--primary">Explore my projects</a>' +
      heroContactHtml +
      '</div>' +
      '</section>' +

      '<section class="c-section">' +
      '<h2 class="c-section-title">Featured projects</h2>' +
      '<div class="c-card-grid">' + cardsHtml + '</div>' +
      '</section>' +

      '<section class="c-box c-box--about">' +
      '<h2 class="c-section-title">About</h2>' +
      (photoHtml ? '<div class="c-box__image">' + photoHtml + '</div>' : "") +
      '<p>' + esc(aboutShort) + '</p>' +
      '</section>' +

      '<section class="c-contact">' +
      '<h2 class="c-section-title c-contact__title">Contact</h2>' +
      '<div class="c-action-row">' + contactHtml + '</div>' +
      '</section>' +
      '</div>';
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
          '<article class="c-row">' +
          '<div class="c-row__copy"><h3>' + esc(m.title) + '</h3>' +
          '<p>' + esc(m.summary) + '</p></div>' +
          (m.url ? '<a href="' + esc(m.url) + '" class="c-link">View details</a>' : "") +
          '</article>';
      });
    }

    main.innerHTML =
      '<div class="page-projects">' +
      '<h1 class="c-page-title">Projects</h1>' +
      '<section class="c-section">' +
      '<h2 class="c-section-title">Featured</h2>' +
      '<div class="c-card-grid">' + featuredHtml + '</div>' +
      '</section>' +

      '<section class="c-section">' +
      '<h2 class="c-section-title">More work</h2>' +
      '<div class="c-more-work">' + moreHtml + '</div>' +
      '</section>' +
      '</div>';
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

    var statusBadge = project.status ? '<span class="c-status">' + esc(project.status.replace(/-/g, " ")) + '</span>' : "";
    var tagsHtml = Array.isArray(project.tags) ? project.tags.map(esc).join(", ") : "";
    var linksHtml = "";
    if (Array.isArray(project.links)) {
      project.links.forEach(function (l) {
        linksHtml += '<a href="' + esc(l.url) + '" class="c-link">' + esc(l.label) + '</a>';
      });
    }
    var metaParts = [];
    if (statusBadge) metaParts.push(statusBadge);
    if (tagsHtml) metaParts.push('<span>' + tagsHtml + '</span>');
    if (linksHtml) metaParts.push('<span class="c-case__links">' + linksHtml + '</span>');

    var galleryHtml = "";
    if (Array.isArray(project.gallery)) {
      project.gallery.forEach(function (g) {
        galleryHtml +=
          '<figure>' +
          '<a href="' + esc(g.src) + '">' + imageSlot(g, g.alt || "Image goes here", null, null, true, "gallery") + '</a>' +
          (g.caption ? '<figcaption class="c-gallery__caption">' + esc(g.caption) + '</figcaption>' : "") +
          '</figure>';
      });
    }

    var embedHtml = "";
    if (project.embed) {
      embedHtml = '<div class="c-embed"><iframe src="' + esc(project.embed) + '" title="' + esc(project.title) + ' embedded project" loading="lazy"></iframe></div>';
    }

    var sectionsHtml = "";
    if (Array.isArray(project.sections)) {
      project.sections.forEach(function (s) {
        sectionsHtml += '<section class="c-case__section"><h2>' + esc(s.heading) + '</h2><p>' + esc(s.body) + '</p></section>';
      });
    }

    var metricHtml = project.metric
      ? '<div class="c-metric"><span class="c-metric__value">' + esc(project.metric) + '</span><span class="c-metric__caption">Project metric</span></div>'
      : "";
    var coverHtml = imageSlot(project.cover, "Image goes here (16:9)", 1600, 900, false, "cover");

    document.title = project.title + " · " + (SITE.name || "");

    main.innerHTML =
      '<article class="c-case">' +
      '<h1 class="c-case__title">' + esc(project.title) + '</h1>' +
      '<div class="c-case__meta">' + metaParts.join("") + '</div>' +
      '<div class="c-case__cover">' + coverHtml + '</div>' +
      (metricHtml ? '<div class="c-case__metrics">' + metricHtml + '</div>' : "") +
      '<div class="c-case__sections">' + sectionsHtml + '</div>' +
      (galleryHtml ? '<div class="c-case__gallery c-gallery">' + galleryHtml + '</div>' : "") +
      (embedHtml ? '<div class="c-case__embed">' + embedHtml + '</div>' : "") +
      '<a class="c-case__back c-link" href="projects.html">Back to projects</a>' +
      '</article>';
  }

  function renderAbout() {
    var main = document.querySelector("main");
    if (!main) return;
    var photoHtml = "";
    if (SITE.about && SITE.about.photo) {
      photoHtml = imageSlot(SITE.about.photo, "Image goes here (1:1)", 800, 800, false, "avatar");
    }
    main.innerHTML =
      '<article class="page-about">' +
      '<h1 class="c-page-title">About</h1>' +
      '<div class="c-box c-box--about">' +
      (photoHtml ? '<div class="c-box__image">' + photoHtml + '</div>' : "") +
      '<p>' + esc(SITE.about && SITE.about.text ? SITE.about.text : "") + '</p>' +
      '</div>' +
      '</article>';
  }

  function renderResume() {
    var main = document.querySelector("main");
    if (!main) return;
    var buttonsHtml = "";
    if (Array.isArray(SITE.resumes)) {
      SITE.resumes.forEach(function (r) {
        var action = r.available === false
          ? '<button class="c-btn c-btn--disabled" type="button" disabled aria-disabled="true">Not available yet</button>'
          : '<a href="' + esc(r.file) + '" class="c-btn c-btn--primary">' + esc(r.label) + '</a>';
        buttonsHtml +=
          '<div class="c-row">' +
          '<div class="c-row__copy"><h3>' + esc(r.label) + '</h3></div>' +
          action +
          '</div>';
      });
    }
    main.innerHTML =
      '<article class="page-resume">' +
      '<h1 class="c-page-title">Resume</h1>' +
      '<p>Choose a CV to download. Some files may not be available yet.</p>' +
      '<div class="c-resume-list">' + buttonsHtml + '</div>' +
      '</article>';
  }

  function render404() {
    var main = document.querySelector("main");
    if (!main) return;
    main.innerHTML =
      '<article class="page-404">' +
      '<h1 class="c-page-title">404</h1>' +
      '<p>Page not found.</p>' +
      '<p><a href="index.html" class="c-btn c-btn--primary">Go home</a></p>' +
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
