# Adam Coscia's personal site

Live at <https://adamcoscia.com>. Last updated: October 2026.

## How to update

Everything is built from a few files into `_site/` by `build.js`.

- **Home page prose** (intro, research themes) **and the profile text** (name, title, lab, address): edit `index.html` directly.
- **Everything else** (socials, students, teaching, funding, CV sections, publications, projects): edit `data.yaml`.
- **Students, teaching, funding:** these live in their CV sections in `data.yaml`, and the home page's profile column summarizes them.
  - **Students:** `advisees` (under Advising) appear on the home page (current, then Alumni once they have an `end`) and on the CV, ordered like Polo Chau's CV (Ph.D., then Masters, then Undergraduate; within each, by `role`, newest `start` first). `mentees` (under Student Mentoring) appear only on the CV, by level, newest first. The field list is in the comment above Advising.
  - **Teaching:** give each entry `role: Instructor` or `role: TA`. Instructor entries also appear on the home page.
  - **Funding:** give a grant a `funder` to list it on the home page ("Our research made possible by support and funding from: …"); each funder is named once. Add `award` (an award number) and it appears in parentheses after the funder, e.g. `NSF (2401234, 2405678)`.
- **Images:** found by name, no field needed. Save a paper's teaser as `images/<slug>.webp` (papers without a slug use their `id`; about 250px wide or larger) and a project's card image as `images/<id>.webp`. `.png`, `.jpg`, `.jpeg` and `.gif` also work. Papers show a grey box until the file exists, and the build lists the missing ones.
  - **Optimized automatically:** the build makes WebP copies of every page image at its display size (1×, 2×, 3×, plus any size named in its `sizes` hint) and sets its width and height, so you can drop in a full-size PNG or JPG. Copies are cached in `.cache/` (git-ignored).
- **Share cards:** `images/share-card.jpg` (every page) and `dissertation/share-card.jpg` are the 1200×630 previews shown when a link is shared. They are plain images: replace either with any 1200×630 JPG.
- **Add a paper:** paste its front matter from the lab site (`src/content/papers/*.md`) into `publications` in `data.yaml` and save its teaser as `images/<slug>.webp`. Set `slug` only if the paper has a lab page; papers without one get `status: preprint` or `under review` and show a label. Featured papers are listed by slug in `featured.publications`.
- **Add a project:** add an entry under `projects` (and a folder under `projects/` if it has files or a demo). Featured projects are listed by `id` in `featured.projects`.
- **Dissertation and Fun pages:** `dissertation/index.html` and `fun/` are hand-written. Drop new games or demos into `fun/` and link them from `fun/index.html`.
- **Preview:** `npm install`, then `npm run dev` and open <http://localhost:8000>. `npm run build` writes the site to `_site/`. The dev server rebuilds when `data.yaml`, `style.css`, or the hand-written pages change; restart it after editing `build.js`.
- **Deploy:** push to `master`. The GitHub Action in `.github/workflows/deploy.yml` builds and publishes (repo Settings > Pages > Source must be "GitHub Actions").
- **Private demos:** put them in `internal/`. Every HTML page there is encrypted with the password in the `INTERNAL_PASSWORD` repo secret (Settings > Secrets and variables > Actions). Visitors get a password form, and one unlock covers every internal page for that browser tab. Pages are `noindex`, left out of the sitemap, and not linked from anywhere. Without the secret, `internal/` is not published at all. Only HTML is encrypted: a demo's scripts and data files are unlinked, but anyone with the exact URL can still fetch them. To preview locally, run `INTERNAL_PASSWORD=... npm run dev`.

## File structure

```text
data.yaml        site data: profile, CV sections, publications, projects, featured lists
index.html       home page (hand-written prose; build.js fills in the profile and featured items)
build.js         builds _site/ from data.yaml and the pages above (and optimizes images, minifies CSS)
style.css        the only stylesheet
images/          site images, icon sprite (icons.svg), background
fonts/           Lato (woff2)
files/           PDFs (CV, talks)
dissertation/    dissertation page and its images
projects/        course and internship projects (each folder is standalone)
fun/             games and demos (vendor/ holds their libraries)
internal/        password-protected, unlisted demos (optional)
CNAME            custom domain
```

Paper pages, news, and research projects live on the [Stevens Visualization Lab](https://stevensvislab.github.io/) site.

## Acknowledgements

- Visual style adapted from the [HTML5 UP](https://html5up.net) "Identity" template by AJ (CC BY 3.0).
- Layout inspired by the pages of [Dominik Moritz](https://www.domoritz.de/), [Jeffrey Heer](https://homes.cs.washington.edu/~jheer/), and [Polo Chau](https://poloclub.github.io/polochau/).
- Icons from [Font Awesome Free](https://fontawesome.com) (CC BY 4.0). Typeface: [Lato](https://fonts.google.com/specimen/Lato) (SIL OFL).

## License

The HTML5 UP-derived design is licensed under [CC BY 3.0](LICENSE.txt). Site content and papers are copyright Adam Coscia and co-authors.
