# CEC Safety Studio

A single-page web application that generates ANSI Z535-compliant safety
signage and editorial-grade safety infographics for CEC field operations.

Everything ships as a single self-contained `.html` file — no server, no
build tools required to use it. Open in any modern browser.

![License](https://img.shields.io/badge/license-Proprietary-blue)
![Build](https://img.shields.io/badge/build-Python%203.8%2B-yellow)
![Status](https://img.shields.io/badge/status-Beta-orange)

---

## What it does

Five tabs, each targeting a different safety-team workflow:

**01 · Browse Catalog** — 41 pre-built sign templates covering LOTO,
electrical, arc flash, energized work, excavation & trenching, confined
space, fall protection, PPE, cranes & rigging, scaffolding, hot work,
silica, heat illness, forklifts, machine guarding, emergency equipment,
and hazard communication. Each template carries the OSHA / NFPA citation
that makes it defensible in an inspection. Filter by category or search
by keyword.

**02 · Compose Sign** — live editor with a right-side preview that
redraws as you type. Edit the signal level, message lines, ANSI Z535.4
hazard/consequence/avoidance body, personnel & contacts, do-not list,
citations, fill-in fields, and pictogram (choose from 20 ANSI-style
icons or the 9 GHS hazard pictograms per HazCom 2012). Three preview
modes: Paper, Print Proof, In Field. One-click print to PDF.

**03 · Infographic Builder** — editorial-style infographics for
pre-job briefings, training rooms, and toolbox talks. 5 topic
templates (arc flash, LOTO, approach boundary, confined space,
excavation) with big-stat highlights, callouts, editorial sections, pull
quote, and CTA. Each has a hero photo gallery (8 free-license Unsplash
photos per topic), a custom URL field for user photos, and a
per-topic SVG illustration that renders as a fallback if the photo
doesn't load.

**04 · Policy Analyzer** — paste a site-specific safety plan on the
left, the corporate policy on the right, click Analyze. The engine
walks 17 safety topics, extracts numeric thresholds where present (fall
height, dBA, trench depth, arc-flash cal/cm², voltage, silica µg/m³,
heat-index °F), picks the more stringent value per OSHA convention, and
produces a Field Posting Manifest of recommended signs.

**05 · Brand & Voice** — pick which CEC mark appears in the header of
generated artifacts; edit the default footer approval line and
tagline. Sign footers always carry the safety-department shield
regardless of picker choice, since it's the regulatory mark for signs.

---

## Quick start

```bash
git clone <this-repo> cec-safety-studio
cd cec-safety-studio
python3 scripts/build.py
open dist/cec_safety_studio.html
```

The build script bundles all sources into a single `dist/cec_safety_studio.html`
that includes the fonts (loaded from Google Fonts CDN), the stylesheet, the
sign templates, the analyzer, and the CEC logos embedded as base64 data
URIs. The output is ~640 KB.

No package.json, no npm, no server. Python 3.8+ is the only dev
dependency, and it's only needed to rebuild.

### Iterate

```bash
python3 scripts/build.py && open dist/cec_safety_studio.html
```

You can also skip the build and edit the merged HTML directly if you
just need a one-off tweak — but changes made there are lost the next
time you rebuild from source.

---

## Project structure

```
cec-safety-studio/
├── README.md
├── LICENSE
├── .gitignore
├── scripts/
│   └── build.py              # Composes dist/ from src/
├── src/
│   ├── head.html             # <head> content (fonts, meta)
│   ├── styles.css            # Full stylesheet (~1600 lines)
│   ├── body.html             # Page body markup
│   ├── data.js               # 41 templates, 17 analyzer topics,
│   │                         # 5 infographics, photo library, GHS pictograms
│   ├── app.js                # State, rendering, event wiring
│   └── assets/
│       ├── cec_mark.jpg      # Butterfly mark (200x200)
│       ├── cec_full.png      # Full company wordmark (transparent)
│       ├── cec_safety.png    # Safety department shield (transparent)
│       └── cec_corp.png      # CEC corporate lockup (transparent)
├── samples/
│   ├── site_plan.txt         # Example site safety plan for the analyzer
│   └── company_policy.txt    # Example CEC corporate policy for the analyzer
└── dist/
    └── cec_safety_studio.html   # Built output — the deliverable
```

---

## Architecture

**Single-file browser app.** Everything lives in one HTML file. No
server, no fetch calls, no CORS. The build step exists only to keep
the source manageable during development — the artifact you distribute
is `dist/cec_safety_studio.html`.

**Data-driven templates.** The 41 sign templates in `data.js` are
plain JS objects. Each has an id, category, ANSI signal level, title,
description, message lines, ANSI Z535.4 body (hazard / consequence /
avoidance), do-not list, citation list, fill-in fields, and
pictogram key. Adding a new sign is one object literal.

**CSS container queries** power the sign rendering. Every sign is a
`container-type: inline-size` element with typography sized in `cqw`
units — so the same sign renders correctly at 200px wide in a browse
pin and at 850px wide in the compose preview, without breakpoints.

**Grid-based header layout** (as of the latest iteration) prevents
signal-word and CEC-mark overlap: pictogram in column 1 (`auto`
width), signal word left-aligned in column 2 (`minmax(0, 1fr)`),
CEC mark right-anchored in column 3 (`16cqw`).

**Policy Analyzer engine** in `app.js` (`analyzePolicies`,
`extractValuesInContext`, `pickByDirection`, `countKeywordMatches`)
walks each topic in `SAFETY_TOPICS`, runs keyword matches to
determine which topics are addressed, extracts numeric thresholds via
per-topic regex patterns, picks the more stringent value per OSHA
convention, and returns a per-topic result with a recommended
template list.

**No frameworks.** Vanilla JS, native DOM, CSS grid. Total JS is
under 900 lines of app code; data.js is ~1750 lines but is mostly
template copy and citation strings.

---

## Adding a new sign template

1. Open `src/data.js`.
2. Find the `TEMPLATES` array.
3. Copy an existing template object as a starting point.
4. Assign the next sequential `id` (currently 1–41).
5. Set `cat` (LOTO, ELECTRICAL, ARC_FLASH, ENERGIZED, EXCAVATION,
   CONFINED_SPACE, FALL, PPE, CRANE, SCAFFOLDING, HOT_WORK, SILICA,
   HEAT, FORKLIFT, MACHINE, EMERGENCY, HAZCOM — or add a new
   category and update `body.html`'s filter chips).
6. Fill in `level` (DANGER, WARNING, CAUTION, NOTICE, or ENERGIZED),
   `title`, `desc`, `primary`, `secondary`, `accent`, `hazard`,
   `consequence`, `avoidance`, `donot` array, `citations` array,
   `fields` array, and `pictogram` key.
7. Update the browse header count in `src/body.html` from "41
   Templates" to the new total.
8. Run `python3 scripts/build.py`.

---

## Adding a new analyzer topic

1. Open `src/data.js`.
2. Find the `SAFETY_TOPICS` array.
3. Add a new topic with `id`, `name`, `keywords`, `stringentDirection`
   ('lower', 'mention', or 'permit'), `stringentReason`, `templates`
   (array of template IDs to recommend), and `osha` citation.
4. If the topic has a numeric threshold, add `valuePattern` (a regex
   with one capture group) and `unit`.
5. Rebuild.

---

## License

Proprietary. © 2026 CEC Companies. All rights reserved.

Fonts loaded from Google Fonts are subject to the SIL Open Font
License. Icons are original SVG in this repo. Photo library URLs
point at Unsplash CDN; all photos referenced are under the Unsplash
License (free for commercial use, no attribution required — but
credited in the app as a courtesy).

---

## Credits

Built by CEC Safety with Claude. Safety content derived from
29 CFR 1910, 29 CFR 1926, NFPA 70E, ANSI Z535, ASME, and NIOSH
publications.
