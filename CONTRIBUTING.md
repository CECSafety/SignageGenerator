# Contributing to CEC Safety Studio

## Getting set up

Only requirement: Python 3.8 or newer.

```bash
git clone <this-repo>
cd cec-safety-studio
python3 scripts/build.py
```

Open `dist/cec_safety_studio.html` directly, or run the local dev
server:

```bash
python3 scripts/dev.py
# → http://localhost:8080/
```

Every request to the root URL rebuilds from `src/`, so refresh the
browser after saving a source file.

---

## Where to make changes

### Adding a new sign template

Edit **`src/data.js`**, `TEMPLATES` array. Copy an existing template as
a starting point. Every template needs the ANSI Z535.4 body triad
(`hazard` / `consequence` / `avoidance`) and at least one OSHA / NFPA
citation.

Verify OSHA / NFPA citation accuracy before merging. When in doubt,
cross-reference `https://www.osha.gov/laws-regs`.

### Adding a new pictogram

Edit **`src/data.js`**, `PICTOGRAMS` object. Add a new key with an SVG
string. Use `stroke="currentColor"` and `fill="currentColor"` so the
pictogram inherits the sign header's foreground color automatically.
100×100 viewBox is standard.

For GHS pictograms, add to `GHS_PICTOGRAMS` and keep the red diamond
border on white per HazCom 2012.

### Adding a new analyzer topic

Edit **`src/data.js`**, `SAFETY_TOPICS` array. Fields:

- `id`, `name`, `osha` — display metadata
- `keywords` — words the analyzer looks for in either document to
  determine if the topic is addressed
- `valuePattern` — optional regex with one capture group to extract a
  numeric threshold (fall height, dBA, etc.)
- `unit` — display unit
- `stringentDirection` — `'lower'` (smaller number = stricter),
  `'mention'` (more detailed = stricter), `'permit'` (permit-required
  = stricter)
- `stringentReason` — one-sentence explanation shown in the verdict
- `templates` — array of template IDs to recommend when this topic is
  triggered

### Editing styles

Edit **`src/styles.css`**. The design system uses CSS custom
properties in `:root` — change `--navy`, `--gold`, `--paper`, etc. to
reflow the whole palette. Fonts are variables too: `--display`,
`--body`, `--mono` for the chrome; `--sign-display`, `--sign-body`,
`--sign-editorial` for signs.

Sign rendering uses CSS container queries. Every dimension inside
`.sign` is in `cqw` (percentage of the sign's own width) so signs
scale automatically at any container size.

### Editing markup

Edit **`src/body.html`**. It's plain HTML. The tabs and views are
static; content is rendered into `#masonry`, `#editor`,
`#preview-stage`, `#info-canvas`, `#brand-grid`, and
`#analysis-results` at runtime by `src/app.js`.

### Editing behavior

Edit **`src/app.js`**. State is global (`state` object at the top),
DOM helpers `$` and `$$` are shorthand for `querySelector` and
`querySelectorAll`. Rendering functions each rebuild their target
container's innerHTML — no diffing, no reactivity, no framework.

---

## Testing

There's no test framework in the repo. Use `jsdom` for smoke tests:

```bash
npm install jsdom            # only needed for tests
node scripts/smoke_test.js   # if you write one
```

Manual verification checklist for any change:

1. Every browse tab renders 41 pins.
2. Every filter chip filters to a non-zero set.
3. Selecting a template loads it in the editor and preview redraws.
4. Analyzer runs on the sample docs without errors and produces at
   least the 8 documented topic verdicts.
5. Brand picker changes the header logo across all preview surfaces.
6. Infographic builder loads all 5 topics; hero photo gallery shows
   thumbnails; typing a custom URL swaps in the photo.

---

## Style conventions

- 2-space indent everywhere (CSS, JS, HTML).
- Single quotes for JS strings unless the string contains `'`.
- Kebab-case for CSS classes.
- Snake-case for JS constants (`FIELD_DEFINITIONS`, `SAFETY_TOPICS`).
- CamelCase for JS functions and variables (`renderSign`, `state`).
- Comment blocks separated by `/* ============================ */`
  borders.

---

## Regulatory content standards

Any sign, infographic, or analyzer topic that references OSHA / NFPA /
ANSI / ASME / NIOSH must cite the specific section number, not just
the standard family. Example: `29 CFR 1926.652(a)(1)`, not `OSHA
Excavation Standard`.

Every ANSI Z535.4 body must follow the hazard / consequence /
avoidance structure. This is regulatory, not stylistic.

Every DANGER-level sign should describe an immediate hazard likely to
result in death or serious injury if not avoided. WARNING is for
hazards that could result in death or serious injury. CAUTION is for
hazards that could result in minor or moderate injury. NOTICE is for
non-hazard operational information. Don't inflate signal level for
emphasis; that undermines the regulatory framework.
