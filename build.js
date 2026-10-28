// Builds the whole site from data.yaml (+ the hand-written pages) into _site/.  Usage: node build.js [--serve]
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  cpSync,
  existsSync,
  readdirSync,
  statSync,
  watch,
} from "node:fs";
import { join, dirname, extname } from "node:path";
import { createServer } from "node:http";
import { execFileSync } from "node:child_process";
import { randomBytes, pbkdf2Sync, createCipheriv } from "node:crypto";
import YAML from "yaml";
import sharp from "sharp";

const OUT = "_site";
const PHOTO = "/images/profile.png"; // also hard-coded in index.html
const CV_PDF = "/files/Coscia-Adam-CV.pdf";
// Share cards (1200x630): the default, plus per-page cards. Both are static images in the repo.
const SHARE_CARD = {
  src: "/images/share-card.jpg",
  alt: "Adam Coscia, Assistant Professor, Stevens Institute of Technology",
};
const PAGE_CARDS = {
  "/dissertation/": {
    src: "/dissertation/share-card.jpg",
    alt: "Overview figure of Adam Coscia's dissertation chapters",
  },
};
const STATIC = ["images", "fonts", "files", "dissertation", "projects", "fun"];
const ROOT_FILES = ["CNAME", "robots.txt", "style.css"];

// ---------- helpers ----------
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Inline markdown: **bold**, *italic*, [text](url). Input is escaped first. */
const md = (s = "") =>
  esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<i>$2</i>");
/** Conservative CSS minifier: drops comments and whitespace around { } ; , > (never inside calc, where + and - need
 *  their spaces; the stylesheet's strings contain none of these characters). */
const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
/** Links that leave adamcoscia.com open in a new tab (target="_blank" rel="noopener"), unless they already set a target. */
const externalTargets = (html) =>
  html.replace(/<a\s[^>]*>/g, (tag) => {
    const href = (tag.match(/\shref="([^"]*)"/) || [])[1] || "";
    if (!/^https?:\/\//i.test(href) || /^https?:\/\/(www\.)?adamcoscia\.com(\/|$)/i.test(href) || /\starget=/.test(tag))
      return tag;
    const t = /\srel="/.test(tag)
      ? tag.replace(/\srel="([^"]*)"/, ' rel="$1 noopener"')
      : tag.replace(/>$/, ' rel="noopener">');
    return t.replace(/>$/, ' target="_blank">');
  });
const write = (path, data) => {
  mkdirSync(dirname(join(OUT, path)), { recursive: true });
  writeFileSync(join(OUT, path), path.endsWith(".html") ? externalTargets(data) : data);
};
const ic = (name, cls = "") =>
  `<svg class="ic ic-${name}${cls ? " " + cls : ""}" aria-hidden="true"><use href="/images/icons.svg#${name}"/></svg>`;

/** Icon for a link row, by label/url. */
const linkIcon = (label, url = "") => {
  const l = label.toLowerCase();
  if (/youtu/.test(url) || l === "talk") return "youtube";
  if (l === "paper" || (/\.pdf$/.test(url) && l !== "slides")) return "file-pdf";
  if (l === "slides") return "file-powerpoint";
  if (l === "poster") return "chalkboard";
  if (l === "video" || l === "recording") return "video";
  if (l === "code" || l === "data" || /github\.com/.test(url)) return "github";
  if (l === "demo" || l === "live demo") return "rocket";
  if (l === "project page" || l === "project") return "house";
  return "link";
};

/** "Oct 26, 2026": the file's last commit date, or its modified time if it has uncommitted changes. */
const lastUpdated = (file) => {
  let when = statSync(file).mtime;
  try {
    const dirty = execFileSync("git", ["status", "--porcelain", "--", file], { encoding: "utf8" }).trim();
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { encoding: "utf8" }).trim();
    if (!dirty && iso) when = new Date(iso);
  } catch {}
  return when.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// ---------- internal/: password-protected, never indexed ----------
// GitHub Pages has no server-side auth, so each HTML page is encrypted (AES-256-GCM, key from PBKDF2) and replaced
// by a password form that decrypts it in the browser. Set INTERNAL_PASSWORD (a repo secret in the deploy workflow);
// without it, internal/ is left out of the build. Only HTML is encrypted: other files (scripts, data) are unlinked
// but public to anyone who knows their URL.
const NOINDEX = '<meta name="robots" content="noindex, nofollow">';
function buildInternal() {
  if (!existsSync("internal")) return;
  const pw = process.env.INTERNAL_PASSWORD;
  if (!pw) return console.warn("internal/ skipped: set INTERNAL_PASSWORD to publish it");
  cpSync("internal", join(OUT, "internal"), { recursive: true });
  const salt = randomBytes(16);
  const iter = 600000;
  const key = pbkdf2Sync(pw, salt, iter, 32, "sha256"); // one key per build, so unlocking once covers every page
  const b64 = (b) => Buffer.from(b).toString("base64");
  const walk = (dir) =>
    readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));
  for (const f of walk(join(OUT, "internal")).filter((f) => f.endsWith(".html"))) {
    let h = readFileSync(f, "utf8");
    h = /<head[^>]*>/i.test(h) ? h.replace(/<head[^>]*>/i, (m) => m + NOINDEX) : NOINDEX + h;
    const iv = randomBytes(12);
    const c = createCipheriv("aes-256-gcm", key, iv);
    const data = Buffer.concat([c.update(h, "utf8"), c.final(), c.getAuthTag()]);
    writeFileSync(f, gatePage({ salt: b64(salt), iv: b64(iv), data: b64(data), iter }));
  }
}
const gatePage = (enc) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${NOINDEX}
<title>Password required</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<div id="wrapper"><main id="main" class="gate">
<h1 class="page-h">Password required</h1>
<form id="gate"><label for="pw">This page is private. Enter the password to view it.</label>
<div class="gate-row"><input id="pw" type="password" autocomplete="current-password" required autofocus><button class="btn" type="submit">Unlock</button></div>
<p class="gate-err" role="alert" hidden>That password didn't work.</p></form>
</main></div>
<script>
const E=${JSON.stringify(enc)},S="internal-key:"+E.salt,u=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function unlock(raw){const k=await crypto.subtle.importKey("raw",raw,"AES-GCM",false,["decrypt"]);
const h=new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:u(E.iv)},k,u(E.data)));
sessionStorage.setItem(S,btoa(String.fromCharCode(...new Uint8Array(raw))));document.open();document.write(h);document.close()}
const saved=sessionStorage.getItem(S);if(saved)unlock(u(saved)).catch(()=>sessionStorage.removeItem(S));
document.getElementById("gate").onsubmit=async e=>{e.preventDefault();const err=document.querySelector(".gate-err");err.hidden=true;
const pw=await crypto.subtle.importKey("raw",new TextEncoder().encode(document.getElementById("pw").value),"PBKDF2",false,["deriveBits"]);
const raw=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:u(E.salt),iterations:E.iter},pw,256);
unlock(raw).catch(()=>{err.hidden=false})};
</script>
</body>
</html>
`;

// ---------- images: responsive WebP copies ----------
// After the pages are written, every local <img> with a width attribute (its display width) gets WebP copies at 1x,
// 2x and 3x that width (never wider than the source), a srcset, and real width/height so the browser reserves its
// space. Small files (< 20 KB) are left alone. Copies are cached in .cache/img/ and only remade when the source changes.
const CACHE = ".cache/img";
const IMG_MIN_BYTES = 20 * 1024;
async function optimizeImages() {
  mkdirSync(CACHE, { recursive: true });
  const meta = new Map(); // source path -> { width, height } or null (skip)
  const made = new Set();
  const walk = (dir) =>
    readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));
  const pages = walk(OUT).filter((f) => f.endsWith(".html") && !f.startsWith(join(OUT, "internal")));
  let count = 0;
  for (const f of pages) {
    const html = readFileSync(f, "utf8");
    const tags = [...new Set(html.match(/<img\b[^>]*>/g) || [])];
    let out = html;
    for (const tag of tags) {
      const src = (tag.match(/\ssrc="(\/[^"?#]+\.(?:png|jpe?g|webp))"/i) || [])[1];
      const w = +((tag.match(/\swidth="(\d+)"/) || [])[1] || 0);
      if (!src || !w || /\ssrcset=/.test(tag)) continue;
      const file = join(OUT, src);
      if (!meta.has(file)) {
        const ok = existsSync(file) && statSync(file).size >= IMG_MIN_BYTES;
        meta.set(file, ok ? await sharp(file).metadata() : null);
      }
      const m = meta.get(file);
      if (!m) continue;
      // 1x/2x/3x the display width, plus 1x/2x any other fixed width named in `sizes` (e.g. a larger mobile size)
      const named = [...((tag.match(/\ssizes="([^"]*)"/) || [])[1] || "").matchAll(/(?:^|[\s,)])(\d+)px/g)].map(
        (x) => +x[1],
      );
      const widths = [
        ...new Set([w, 2 * w, 3 * w, ...named, ...named.map((x) => 2 * x)].map((x) => Math.min(x, m.width))),
      ].sort((a, b) => a - b);
      const base = src.replace(/\.[a-z]+$/i, "");
      for (const x of widths) {
        const rel = `${base}-${x}w.webp`;
        if (made.has(rel)) continue;
        const cached = join(CACHE, rel.replace(/\//g, "__"));
        if (!existsSync(cached) || statSync(cached).mtimeMs < statSync(file).mtimeMs)
          await sharp(file).resize({ width: x }).webp({ quality: 80 }).toFile(cached);
        cpSync(cached, join(OUT, rel));
        made.add(rel);
      }
      const h = Math.round((w * m.height) / m.width);
      let t = tag
        .replace(
          /\ssrc="[^"]*"/,
          ` src="${base}-${widths[0]}w.webp" srcset="${widths.map((x) => `${base}-${x}w.webp ${x}w`).join(", ")}"`,
        )
        .replace(/\sheight="\d+"/, "");
      t = t.replace(/\swidth="\d+"/, ` width="${w}" height="${h}"`);
      if (!/\ssizes=/.test(t)) t = t.replace(/^<img/, `<img sizes="${w}px"`);
      if (/loading="lazy"/.test(t) && !/decoding=/.test(t)) t = t.replace(/^<img/, '<img decoding="async"');
      out = out.split(tag).join(t);
      count++;
    }
    if (out !== html) writeFileSync(f, out);
  }
  return { count, files: made.size };
}

// ---------- build ----------
async function build() {
  const d = YAML.parse(readFileSync("data.yaml", "utf8"));
  const { site, profile: P } = d;
  const lab = site.lab;
  const year = new Date().getFullYear();
  const pubs = [...d.publications].sort((a, b) => b.year - a.year || (b.month || 0) - (a.month || 0));
  rmSync(OUT, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 }); // retries ride out brief Windows file locks (antivirus, the dev server)

  // --- header (the original: centered name, icon link row) and footer ---
  const NAV = [
    ["/", "house", "Home"],
    ["/publications/", "pen-nib", "Publications"],
    ["/projects/", "diagram-project", "Projects"],
    ["/fun/", "gamepad", "Fun"],
    ["/cv/", "address-card", "CV & Bio"],
  ];
  const navLink = ([h, i, l], path) =>
    `<a href="${h}"${h === path ? ' aria-current="page"' : ""}>${ic(i)}<span>${esc(l)}</span></a>`;
  const nav = (path) =>
    `<header id="header"><p class="header-title"><span>${esc(P.name)}</span></p><nav class="header-links" aria-label="Site">${NAV.map((n) => navLink(n, path)).join("")}</nav></header>`;
  // the home page's section links (left column and profile column): every page but Home
  const sectionLinks = (cls) =>
    `<ul class="${cls}">${NAV.slice(1)
      .map((n) => `<li>${navLink(n)}</li>`)
      .join("")}</ul>`;
  const footer = `<footer id="footer">
<nav class="footer-icons" aria-label="Social links"><a href="mailto:${esc(P.email)}" aria-label="Email" title="Email">${ic("envelope")}</a>${P.links.map((l) => `<a href="${esc(l.url)}" rel="me" aria-label="${esc(l.label)}" title="${esc(l.label)}">${ic(l.icon)}</a>`).join("")}</nav>
<p class="footer-bio">${esc(P.name)} is a professor at Stevens Institute of Technology and the founding director of the Stevens Visualization Lab. He received his PhD from Georgia Tech. Read about his research group's work here: <a href="${lab}/">${lab.replace("https://", "")}</a></p>
<p>&copy; ${year} ${esc(P.name)}</p></footer>`;

  // Home page structured data: the site, and the person it's about.
  const person = {
    "@type": "Person",
    "@id": site.url + "/#person",
    name: P.fullName,
    alternateName: P.name,
    jobTitle: P.title,
    url: site.url,
    email: P.email,
    image: site.url + PHOTO,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Stevens Institute of Technology",
      url: "https://www.stevens.edu/",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Georgia Institute of Technology" },
      { "@type": "CollegeOrUniversity", name: "Stevens Institute of Technology" },
    ],
    sameAs: [...P.links.map((l) => l.url).filter((u) => !u.startsWith("/")), lab],
  };
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": site.url + "/#website",
        url: site.url + "/",
        name: P.name,
        inLanguage: "en",
        publisher: { "@id": site.url + "/#person" },
      },
      person,
    ],
  });
  // Dissertation: Google Scholar citation tags and Thesis structured data. (No citation_pdf_url: the PDF isn't hosted here.)
  const diss = {
    title: "Detecting and Mitigating Pedagogical Risks in Large Language Models with Visual Analytics",
    date: "2026/05",
    institution: "Georgia Institute of Technology",
  };
  const dissHead = (desc) => `<meta name="citation_title" content="${esc(diss.title)}">
<meta name="citation_author" content="Coscia, Adam">
<meta name="citation_publication_date" content="${diss.date}">
<meta name="citation_dissertation_institution" content="${diss.institution}">
<meta name="citation_abstract_html_url" content="${site.url}/dissertation/">
<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Thesis",
    name: diss.title,
    headline: diss.title,
    description: desc
      .replace(/&amp;/g, "&")
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&quot;/g, '"'),
    url: site.url + "/dissertation/",
    image: site.url + PAGE_CARDS["/dissertation/"].src,
    inSupportOf: "Ph.D. in Human-Centered Computing",
    datePublished: diss.date.replace("/", "-"),
    inLanguage: "en",
    author: { "@type": "Person", name: P.fullName, url: site.url + "/" },
    sourceOrganization: { "@type": "CollegeOrUniversity", name: diss.institution },
  })}</script>`;

  const headTags = ({ title, desc, path, ld }) => `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="${esc(P.name)}">
${site.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">\n` : ""}<link rel="canonical" href="${site.url}${path}">
<link rel="icon" href="/images/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
<link rel="preload" href="/fonts/lato-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/lato-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css">
<meta name="theme-color" content="#ffffff">
<meta property="og:type" content="${path === "/dissertation/" ? "article" : "website"}"><meta property="og:site_name" content="${esc(P.name)}"><meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${site.url}${path}">
${((
  card,
) => `<meta property="og:image" content="${site.url}${card.src}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(card.alt)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${site.url}${card.src}"><meta name="twitter:image:alt" content="${esc(card.alt)}">`)(
  PAGE_CARDS[path] || SHARE_CARD,
)}
${ld ? `<script type="application/ld+json">${ld}</script>` : ""}${path === "/dissertation/" ? "\n" + dissHead(desc) : ""}`;

  const page = ({ path, title, desc, body, ld, noindex }) => `<!doctype html>
<html lang="en">
<head>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ""}${headTags({ title, desc, path, ld })}
</head>
<body>
<div id="wrapper"><main id="main">
${nav(path)}
${body}
${footer}
</main></div>
</body>
</html>
`;

  // --- publications ---
  const labUrl = (u) => (u.startsWith("/papers/") ? lab + u : u);
  const LABELS = {
    project: "Project",
    pdf: "Paper",
    doi: "DOI",
    demo: "Demo",
    talk: "Talk",
    slides: "Slides",
    poster: "Poster",
    video: "Video",
    code: "Code",
    data: "Data",
  };
  const pubLinks = (p) => {
    const links = Object.entries(p.links || {}).map(([k, u]) => [LABELS[k] || k, labUrl(u)]);
    if (p.slug) links.unshift(["Project page", `${lab}/papers/${p.slug}/`]);
    return links;
  };
  const linkA = ([l, u]) => `<a href="${esc(u)}">${ic(linkIcon(l, u))}${esc(l)}</a>`;
  const authorHtml = (a) => (/^Adam (J\. )?Coscia$/.test(a) ? `<b>${esc(a)}</b>` : esc(a));
  const awardHtml = (p) => (p.award ? `<div class="awards">${ic("award")}${esc(p.award)}</div>` : "");
  const statusHtml = (p) =>
    p.status && p.status !== "published" ? `<span class="status">${esc(p.status)}</span> ` : "";
  // BibTeX without JS: a visually hidden checkbox whose label sits in the link row; the <pre> shows while it's checked.
  // The checkbox must be a sibling before the <pre> (see .bib-toggle in style.css).
  const pubId = (p) => p.slug || p.id;
  const bibToggle = (p) =>
    p.bibtex
      ? `<input type="checkbox" class="bib-toggle" id="bib-${pubId(p)}" aria-label="Show BibTeX for ${esc(p.short || p.title)}">`
      : "";
  const bibLabel = (p) =>
    p.bibtex
      ? `<label class="bib-label" for="bib-${pubId(p)}" aria-hidden="true">${ic("quote-right")}BibTeX</label>`
      : "";
  const bibPre = (p) =>
    p.bibtex ? `<pre class="bibtex" title="Click to select, then copy">${esc(p.bibtex.trim())}</pre>` : "";
  // Images are found by name (no data.yaml field): images/<name>.(webp|png|jpg|jpeg|gif), where <name> is a paper's
  // slug (or id, if it has no slug) or a project's id. Papers show a placeholder box until the file exists.
  const IMG_EXT = ["webp", "png", "jpg", "jpeg", "gif"];
  const imageFor = (name) => {
    const ext = IMG_EXT.find((e) => existsSync(`images/${name}.${e}`));
    return ext ? `/images/${name}.${ext}` : "";
  };
  const pubImage = (p) => imageFor(pubId(p));
  const thumb = (p) => {
    const src = pubImage(p);
    // full width on small screens (see style.css), 250px otherwise
    const img = src
      ? `<img src="${esc(src)}" alt="" width="250" sizes="(max-width: 600px) calc(100vw - 2.5rem), 250px" loading="lazy">`
      : `<span class="thumb-ph"></span>`;
    return p.slug
      ? `<a class="thumb" href="${lab}/papers/${p.slug}/" tabindex="-1" aria-hidden="true">${img}</a>`
      : `<span class="thumb">${img}</span>`;
  };
  const missingImages = [
    ...d.publications.filter((p) => !pubImage(p)).map((p) => `images/${pubId(p)}.webp`),
    ...d.projects.filter((p) => !imageFor(p.id)).map((p) => `images/${p.id}.webp`),
  ];

  /** Publications page entry: thumbnail left; title is plain text (not a link); BibTeX in the link row. */
  const pubEntry = (p) => {
    const links = pubLinks(p);
    return `<div class="publication${p.status && p.status !== "published" ? " unreviewed" : ""}">${thumb(p)}<div class="pub-body">${statusHtml(p)}<h3>${esc(p.title)}</h3>
<div class="authors">${p.authors.map(authorHtml).join(", ")}</div>
<div class="venue"><i>${esc(p.venueFull || p.venue)}</i></div>
${awardHtml(p)}${bibToggle(p)}${links.length || p.bibtex ? `<div class="extra-links">${links.map(linkA).join("")}${bibLabel(p)}</div>` : ""}${bibPre(p)}</div></div>`;
  };

  /** Home page entry: thumbnail left; only the title is a link (to the lab page); venue on its own line. */
  const featuredPub = (p) => {
    const href = p.slug ? `${lab}/papers/${p.slug}/` : labUrl(p.links?.pdf || p.links?.doi || "#");
    return `<div class="publication">${thumb(p)}<div class="pub-body"><a class="pub-title" href="${esc(href)}">${esc(p.title)}</a>
<div class="authors">${p.authors.map(authorHtml).join(", ")}</div>
<div class="venue"><i>${esc(p.venue)}</i></div>${awardHtml(p)}</div></div>`;
  };

  // --- projects (Dom style cards) ---
  const projectCard = (p) => {
    const first = (p.links || []).find((l) => /demo/i.test(l.label)) || (p.links || [])[0];
    const img = imageFor(p.id);
    return `<div class="project" id="${p.id}"><span class="title">${esc(p.title)}</span>
${img ? `<a href="${esc(first?.url || "#")}" class="preview-image" style="background-image:url(${img})" aria-label="${esc(p.title)}"></a>` : ""}
<p>${esc(p.blurb)}</p>
<p class="venue"><i>${esc(p.venue)}</i></p>${p.award ? `<p class="awards">${ic("award")}${esc(p.award)}</p>` : ""}
<div class="spacer"></div>
<div class="links">${(p.links || []).map((l) => linkA([l.label, l.url])).join("")}</div></div>`;
  };
  const featuredProjects = d.featured.projects.map((id) => d.projects.find((p) => p.id === id)).filter(Boolean);
  const featuredPubs = d.featured.publications.map((id) => pubs.find((p) => (p.id || p.slug) === id)).filter(Boolean);

  // --- profile column ---
  // The photo, name, and address are hand-written in index.html; these fill in the rest of the column.
  // Students, teaching, and funding all live in their CV sections; this column lists a summary of each.
  // Students: `advisees` (this column and the CV) and `mentees` (CV only), ordered like Polo Chau's CV: by level,
  // then role, then start term. A student with no `end` is current.
  const advisees = d.cv.find((s) => s.advisees)?.advisees || [];
  const mentees = d.cv.find((s) => s.mentees)?.mentees || [];
  // Teaching: the CV entries with role: Instructor.
  const taught = d.cv.flatMap((s) => s.items || []).filter((e) => e.role === "Instructor");
  // Funding: one line naming each funder once (first-listed first), with any award numbers in parentheses.
  const funders = new Map();
  for (const g of d.cv.flatMap((s) => s.items || []).filter((e) => e.funder)) {
    if (!funders.has(g.funder)) funders.set(g.funder, []);
    if (g.award) funders.get(g.funder).push(...String(g.award).split(/\s*,\s*/));
  }
  const fundingLine = [...funders]
    .map(([f, awards]) => (awards.length ? `${f} (${[...new Set(awards)].join(", ")})` : f))
    .join("; ");
  const LEVELS = [
    // [level, heading for advisees, left-column label for mentees]
    ["postdoc", "Postdocs", "Postdoc"],
    ["phd", "Ph.D. Students", "Ph.D."],
    ["ms", "Masters Students", "Masters"],
    ["bs", "Undergraduate Students", "Undergraduate"],
    ["hs", "High School Students", "High School"],
  ];
  const levelRank = (s) => LEVELS.findIndex(([k]) => k === s.level);
  // Advisee roles, in display order: [value in data.yaml, left-column label]
  const ROLES = [
    ["advising", "Advising"],
    ["co-advising", "Co-advising"],
    ["thesis advisor", "Thesis Advisor"],
    ["research advisor", "Research Advisor"],
  ];
  const roleOf = (s) =>
    String(s.role || "")
      .trim()
      .toLowerCase();
  /** "Fall 2025" → 20253 (Spring 1, Summer 2, Fall 3; a bare year sorts before its terms); missing → Infinity (present). */
  const termKey = (t) => {
    const m = String(t ?? "").match(/(spring|summer|fall)?\s*(\d{4})/i);
    return m ? +m[2] * 10 + ({ spring: 1, summer: 2, fall: 3 }[(m[1] || "").toLowerCase()] || 0) : Infinity;
  };
  for (const s of [...advisees, ...mentees])
    if (levelRank(s) < 0) console.warn(`student ${s.name}: unknown level "${s.level}"`);
  for (const s of advisees)
    if (!ROLES.some(([r]) => r === roleOf(s)))
      console.warn(
        `advisee ${s.name}: role should be one of ${ROLES.map(([r]) => r).join(" | ")} (got "${s.role ?? ""}")`,
      );
  const current = advisees.filter((s) => !s.end);
  const alums = advisees.filter((s) => s.end);
  // Sidebar, as on Polo's: current students by seniority (earliest start first), alumni most recently finished first.
  current.sort((a, b) => levelRank(a) - levelRank(b) || termKey(a.start) - termKey(b.start));
  alums.sort((a, b) => levelRank(a) - levelRank(b) || termKey(b.end) - termKey(a.end));
  const people = (list) =>
    `<ul class="side-list">${list.map((s) => `<li>${s.url ? `<a href="${esc(s.url)}">${esc(s.name)}</a>` : esc(s.name)}, <span class="muted">${esc(s.degree)}</span></li>`).join("")}</ul>`;
  const socials = `<div class="side-socials"><h3 class="side-h">Socials</h3><div class="plinks">${P.links.map((l) => `<a href="${esc(l.url)}" rel="me">${ic(l.icon)}<span>${esc(l.label)}</span></a>`).join("")}</div></div>`;
  const sideExtras = `<div class="side-extras">
<div class="side-sections"><h3 class="side-h">Sections</h3>${sectionLinks("plinks")}</div>
${advisees.length ? `<h3 class="side-h">Students</h3>${current.length ? people(current) : ""}${alums.length ? `<h4 class="side-subh">Alumni</h4>${people(alums)}` : ""}` : ""}
${taught.length ? `<h3 class="side-h">Teaching</h3><ul class="side-list">${taught.map((t) => `<li>${t.url ? `<a href="${esc(t.url)}">${md(t.title)}</a>` : md(t.title)}<br><span class="muted">${esc(t.date)}</span></li>`).join("")}</ul>` : ""}
${funders.size ? `<h3 class="side-h">Funding &amp; Support</h3><div class="side-list"><p>Our research made possible by support and funding from: ${esc(fundingLine)}.</p></div>` : ""}
</div>`;

  // --- CV (Polo layout: left = dates / subsection labels, right = content) ---
  const SECTION_ICONS = {
    Employment: "building",
    Education: "book",
    "Awards and Honors": "award",
    Publications: "pen-nib",
    "Invited Talks and Demos": "microphone",
    "Grants and Funding": "hand-holding-dollar",
    Teaching: "chalkboard-user",
    Advising: "user-graduate",
    "Student Mentoring": "handshake-angle",
    "Service and Associations": "handshake",
    "Programs and Outreach": "hands-holding-child",
    "Research Internships": "flask",
    "Industry Internships": "briefcase",
    Press: "newspaper",
  };
  const slug = (t) =>
    t
      .toLowerCase()
      .replace(/[^a-z]+/g, "-")
      .replace(/^-|-$/g, "");
  // Short labels for the CV jump-nav.
  const JUMP = {
    "Awards and Honors": "Awards",
    "Invited Talks and Demos": "Talks",
    "Grants and Funding": "Grants",
    "Student Mentoring": "Mentoring",
    "Service and Associations": "Service",
    "Programs and Outreach": "Outreach",
    "Research Internships": "Research",
    "Industry Internships": "Industry",
  };
  const h2 = (title) => `<h2 class="cv-h">${ic(SECTION_ICONS[title] || "scroll")}${esc(title)}</h2>`;
  // Advising (from `students.advising`), laid out like Polo Chau's CV: a heading row per level (Ph.D., Masters,
  // Undergraduate), role labels on the left (Advising, Co-advising, Thesis Advisor, Research Advisor), newest start first
  // within each role.
  // Student Mentoring (from `students.mentoring`) is its own section: level labels on the left, newest start first.
  const studentEntry = (s) => {
    const name = s.url ? `<a class="ink-link" href="${esc(s.url)}">${esc(s.name)}</a>` : esc(s.name);
    const when = !s.end
      ? `${s.start} - present`
      : String(s.start) === String(s.end)
        ? `${s.start}`
        : `${s.start} - ${s.end}`;
    return `<div class="right"><b>${name}</b>, ${esc(s.degree)}${s.school ? `, ${esc(s.school)}` : ""}.<br>${esc(when)}.${s.coadvisor ? ` Co-adv: ${esc(s.coadvisor)}.` : ""}${s.thesis ? `<br>Thesis: <i>${md(s.thesis)}</i>` : ""}${s.note ? `<div class="note">${md(s.note)}</div>` : ""}${(s.awards || []).map((a) => `<div class="award">${ic("award")}${md(a)}</div>`).join("")}${s.now ? `<div class="note">Now: ${md(s.now)}</div>` : ""}</div>`;
  };
  const byStart = (a, b) => termKey(b.start) - termKey(a.start);
  const labeled = (label, g) =>
    `<div class="left label" style="grid-row: span ${g.length}">${esc(label)}</div>${g.map(studentEntry).join("")}`;
  const mentoring = (sec) =>
    `<section class="cv-grid" id="${slug(sec.title)}">${h2(sec.title)}${LEVELS.map(([lv, , short]) => {
      const g = mentees.filter((s) => s.level === lv).sort(byStart);
      return g.length ? labeled(short, g) : "";
    }).join("")}</section>`;
  const advising = (sec) =>
    `<section class="cv-grid" id="${slug(sec.title)}">${h2(sec.title)}${LEVELS.map(([lv, label]) => {
      const list = advisees.filter((s) => s.level === lv);
      if (!list.length) return "";
      // the four roles in order, then any unrecognized value (warned about above) under its own label
      const extra = [...new Set(list.map(roleOf))]
        .filter((r) => !ROLES.some(([k]) => k === r))
        .map((r) => [r, r || "Advising"]);
      const roles = [...ROLES, ...extra].filter(([r]) => list.some((s) => roleOf(s) === r));
      return `<div class="left"></div><div class="right group-title"><b>${label}</b></div>${roles
        .map((r) => {
          return labeled(r[1], list.filter((s) => roleOf(s) === r[0]).sort(byStart));
        })
        .join("")}`;
    }).join("")}</section>`;
  const cvSection = (s) => {
    if (s.mentees) return mentoring(s);
    if (s.advisees) return advising(s);
    const titleHeadings = s.headings === "title"; // headings are titles shown in the right column (talks)
    const grouped = !titleHeadings && s.items.some((e) => e.heading);
    let inGroup = false;
    const rows = s.items.map((e, i) => {
      if (e.heading) {
        if (titleHeadings)
          return `<div class="left"></div><div class="right group-title"><b>${md(e.heading)}</b></div>`;
        const n = s.items.slice(i + 1).findIndex((x) => x.heading);
        const span = n < 0 ? s.items.length - i - 1 : n;
        inGroup = span > 0;
        return inGroup ? `<div class="left label" style="grid-row: span ${span}">${esc(e.heading)}</div>` : "";
      }
      const left = grouped ? (inGroup ? null : "") : e.date || "";
      const text = md(e.title);
      const title = e.url ? `<a class="ink-link" href="${esc(e.url)}">${text}</a>` : text;
      const date = grouped && e.date ? ` <span class="date-inline">${esc(e.date)}</span>` : "";
      return `${left === null ? "" : `<div class="left${titleHeadings ? " tight" : ""}">${esc(left)}</div>`}<div class="right${titleHeadings ? " sub-row" : ""}">${titleHeadings ? title : `<b>${title}</b>`}${date}${e.sub ? `<br><i>${md(e.sub)}</i>${e.where ? `, ${esc(e.where)}` : ""}` : e.where ? `<br>${esc(e.where)}` : ""}${(e.notes || []).map((n) => `<div class="note">${md(n)}</div>`).join("")}</div>`;
    });
    return `<section class="cv-grid" id="${slug(s.title)}">${h2(s.title)}${rows.join("")}</section>`;
  };
  const GROUPS = [
    ["conference", "Conference", "C"],
    ["journal", "Journal", "J"],
    ["workshop", "Workshop", "W"],
  ];
  // Numbered oldest-first within each type (J1 is the oldest journal paper), listed newest-first; the number is a
  // column of its own between the labels and the entries.
  const cvPubs = () =>
    `<section class="cv-grid cv-pubs" id="publications">${h2("Publications")}${GROUPS.map(([t, label, k]) => {
      const list = pubs.filter((p) => p.type === t);
      return list.length
        ? `<div class="left label" style="grid-row: span ${list.length}">${label}</div>` +
            list
              .map(
                (p, i) =>
                  `<div class="pub-num">${k}${list.length - i}</div><div class="right"><b>${esc(p.title)}</b>.<br>${p.authors.map(authorHtml).join(", ")}.<br><i>${esc(p.venueFull || p.venue)}</i>.${p.award ? `<div class="award">${ic("award")}${esc(p.award)}</div>` : ""}</div>`,
              )
              .join("")
        : "";
    }).join("")}</section>`;

  // --- pages ---
  const cutAt = d.cv.findIndex((s) => s.title === "Invited Talks and Demos");
  const sections = d.cv.map(cvSection);
  sections.splice(cutAt < 0 ? sections.length : cutAt, 0, cvPubs());
  write(
    "cv/index.html",
    page({
      path: "/cv/",
      title: `CV & Bio — ${P.name}`,
      desc: `CV and bio of ${P.name}, Assistant Professor at Stevens Institute of Technology: education, awards, publications, talks, grants, teaching, and service.`,
      body: `<section class="bio" id="bio"><h2 class="page-h">${ic("address-card")}Bio</h2>${d.bio.map((t) => `<p>${md(t)}</p>`).join("")}</section>
<section class="cv" id="cv"><div class="cv-title"><h2 class="page-h">${ic("scroll")}CV</h2><a class="btn" href="${CV_PDF}" target="_blank" rel="noopener">${ic("file-pdf")}PDF <span class="btn-note">(updated ${lastUpdated(CV_PDF.slice(1))})</span></a></div>
<div class="jump-bar"><button class="jump-btn prev" type="button" aria-label="Scroll section links left" tabindex="-1"></button><nav class="jump" aria-label="CV sections">${[...d.cv.slice(0, cutAt < 0 ? d.cv.length : cutAt).map((s) => s.title), "Publications", ...d.cv.slice(cutAt < 0 ? d.cv.length : cutAt).map((s) => s.title)].map((t) => `<a href="#${slug(t)}">${esc(JUMP[t] || t)}</a>`).join("")}</nav><button class="jump-btn next" type="button" aria-label="Scroll section links right" tabindex="-1"></button></div>
${sections.join("")}</section>
<script>
// jump-nav arrows: shown only on the side(s) with more links to scroll to
{const n=document.querySelector(".jump"),[l,r]=document.querySelectorAll(".jump-btn"),
s=()=>{l.classList.toggle("on",n.scrollLeft>2);r.classList.toggle("on",n.scrollLeft+n.clientWidth<n.scrollWidth-2)};
l.onclick=()=>n.scrollBy({left:-n.clientWidth*.6,behavior:"smooth"});r.onclick=()=>n.scrollBy({left:n.clientWidth*.6,behavior:"smooth"});
n.addEventListener("scroll",s,{passive:true});addEventListener("resize",s);document.fonts.ready.then(s);s()}
</script>`,
    }),
  );

  const years = [...new Set(pubs.map((p) => p.year))];
  write(
    "publications/index.html",
    page({
      path: "/publications/",
      title: `Publications — ${P.name}`,
      desc: `Publications by ${P.name} on visual analytics, human-AI collaboration, and interactive visualization, with links to papers, talks, code, and BibTeX.`,
      body: `<h1 class="visually-hidden">Publications</h1><nav class="year-jump" aria-label="Years">${years.map((y) => `<a href="#y${y}">${y}</a>`).join("")}</nav><div class="pubs">${years
        .map(
          (y) =>
            `<section class="year" id="y${y}"><h2 class="pub-year">${y}</h2><div class="year-list">${pubs
              .filter((p) => p.year === y)
              .map(pubEntry)
              .join("")}</div></section>`,
        )
        .join("")}</div>`.replace('loading="lazy"', 'fetchpriority="high"'),
    }),
  );

  write(
    "projects/index.html",
    page({
      path: "/projects/",
      title: `Projects — ${P.name}`,
      desc: `Course and internship projects by ${P.name}, from NASA JPL to Georgia Tech classes, with live demos, papers, and code. Research projects are on the lab site.`,
      body: `<h1 class="visually-hidden">Projects</h1><div class="projects"><div class="grid">${d.projects.map(projectCard).join("")}</div></div>`,
    }),
  );

  write(
    "404.html",
    page({
      path: "/404.html",
      title: `Page not found — ${P.name}`,
      desc: "Page not found.",
      noindex: true,
      body: `<h2 class="page-h">Page not found</h2><p>That page doesn't exist. Try the <a href="/">home page</a> or the <a href="${lab}/">Stevens Visualization Lab</a>.</p>`,
    }),
  );

  const urls = ["/", "/cv/", "/publications/", "/projects/", "/dissertation/", "/fun/"];
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${site.url}${u}</loc></url>`).join("\n")}\n</urlset>\n`,
  );

  // --- static files, then fill the hand-written templates ---
  for (const f of ROOT_FILES) if (existsSync(f)) cpSync(f, join(OUT, f));
  writeFileSync(join(OUT, "style.css"), minifyCss(readFileSync("style.css", "utf8")));
  for (const dir of STATIC) if (existsSync(dir)) cpSync(dir, join(OUT, dir), { recursive: true });
  buildInternal();
  const walk = (dir) =>
    readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));
  const htmlFiles = [
    join(OUT, "index.html"),
    ...["dissertation", "fun"].flatMap((dir) => walk(join(OUT, dir)).filter((f) => f.endsWith(".html"))),
  ];
  for (const f of htmlFiles) {
    const src = f === join(OUT, "index.html") ? "index.html" : f.slice(OUT.length + 1);
    let h = readFileSync(src, "utf8");
    if (!h.includes("<!--head-->")) continue;
    const path = "/" + src.replace(/\\/g, "/").replace(/index\.html$/, "");
    const title = ((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || P.name).replace(/&mdash;/g, "—").trim();
    const desc = (h.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1] || site.description;
    h = h
      .replace("<!--head-->", headTags({ title, desc, path, ld: path === "/" ? jsonld : "" }).replace(/&amp;/g, "&"))
      .replace("<!--nav-->", nav(path))
      .replace("<!--sections-->", sectionLinks("sections"))
      .replace("<!--socials-->", socials)
      .replace("<!--side-extras-->", sideExtras)
      .replace("<!--featured-publications-->", featuredPubs.map(featuredPub).join("\n"))
      .replace("<!--featured-projects-->", featuredProjects.map(projectCard).join("\n"))
      .replace("<!--footer-->", footer);
    writeFileSync(f, externalTargets(h));
  }
  const img = await optimizeImages();
  console.log(
    `built ${urls.length} pages, ${pubs.length} publications, ${img.count} responsive images (${img.files} WebP files)`,
  );
  if (missingImages.length) console.log(`missing images (placeholder shown): ${missingImages.join(", ")}`);
}

await build();

if (process.argv.includes("--serve")) {
  const MIME = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".pdf": "application/pdf",
    ".ico": "image/x-icon",
    ".xml": "application/xml",
  };
  let t;
  for (const f of ["data.yaml", "style.css", "index.html", "dissertation/index.html", "fun/index.html"])
    watch(f, () => {
      clearTimeout(t);
      t = setTimeout(() => build().catch((e) => console.error(e.message)), 100);
    });
  createServer((req, res) => {
    const p = decodeURIComponent(req.url.split("?")[0]);
    let f = join(OUT, p);
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
    if (!existsSync(f)) {
      res.writeHead(404, { "content-type": "text/html" });
      return res.end(readFileSync(join(OUT, "404.html")));
    }
    res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" });
    res.end(readFileSync(f));
  }).listen(8000, () => console.log("http://localhost:8000"));
}
