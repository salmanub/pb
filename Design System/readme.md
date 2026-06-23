# Vilardell · Peritaje Forense — Design System

Brand and design system for **perito.barcelona**, the forensic-engineering
practice of **Albert Vilardell Serra** — civil engineer (ECCAT nº 16448),
court-appointed expert (perito judicial, registered with the Spanish Ministry
of Justice) and IRD insurance expert. The practice writes *dictámenes
periciales* on building and civil works used as evidence in trials,
negotiations and insurance claims. Based in Barcelona, operating across Spain.

> **This is an original brand proposal, not a recreation.** No prior palette,
> typography or visual direction existed. Every decision below is a deliberate
> response to the brief.

---

## THE BRAND IDEA — "La prueba"

The product Albert sells is **proof that holds up in court**. So the brand is
built to *look like evidence*, not like advertising. The whole system borrows
the language of the expert report and the technical drawing: reference codes,
hairline rules, a measured grid, and figures presented as verifiable data
rather than claims.

**Concept line:** *Dictámenes que se sostienen en sala.*
**Voice principle:** *La prueba no se afirma: se demuestra.*

### Serving two audiences at once
| Audience | Need | How the system answers it |
|---|---|---|
| **Professional** (insurers, law-firm partners, public administration; cases €300K–€3M) | Sobriety + rigour = reliability; "will it hold up in court?" | Editorial serif gravitas, ink/green restraintraint, cited data, the dossier structure, ratification language |
| **Homeowner** (Google search, distressed: damp, hidden defects, bad reno) | Reassurance, accessibility, "can someone help me?" | Calm stone ground, calm FAQ, plain-language service pages, a second hero door, free first consult |

The **deep-green accent** (verde inglés) is the hinge: clear and vital enough to
feel reassuring for the worried homeowner, grave and traditional enough (the
green of law libraries, despacho baize, longevity) to earn the professional's
trust. Evergreen = permanence; distinctly *not* corporate blue.
timeless, ownable choice for a civil engineer.

---

## CONTENT FUNDAMENTALS

**Language:** Spanish (Castilian), Spain. The audience is Spanish legal,
insurance and construction professionals plus Spanish homeowners.

**Voice:** Sober, precise, factual. Authoritative without arrogance. Confident
without coldness. We never self-proclaim ("líderes", "los mejores", "expertos
número uno") — credibility is built from **verifiable facts**: importes
peritados, casos ratificados, números de expediente, normativa citada.

**Person:** "Nosotros / el despacho" for the practice; direct **"tú"** to the
homeowner ("Cuéntanos tu caso", "Tengo un problema en mi vivienda") for warmth;
the professional copy stays impersonal and technical ("Dictámenes defendibles
frente a la pericial contraria"). The named expert speaks in first person only
in the signature quote.

**Casing:** Sentence case for headlines and body. **UPPERCASE only in mono
labels** (eyebrows, reference codes, tags) — and there it is always tracked
(`letter-spacing: 0.14em`).

**Numbers & data:** Always tabular mono. Euros with the Spanish format
(`€2,84 M`, `€640 K`, `€2.847.000`). Pair every headline figure with a
**source note** (`EXP. 22-074`, `2009 – 2025`) so it reads as evidence.

**Reference codes:** Sections are numbered `§ 01`, `§ 02`… and services
`§ 2.3`, mimicking a report's index. Cases carry `EXP. NN-NNN · Ciudad`.

**Emoji:** **Never.** Tone is legal-grave. Iconography is line icons only.

**Examples**
- Hero: *"Dictámenes que se sostienen en sala."*
- Stat: *"€2,8 M — Mayor importe peritado en un único dictamen · EXP. 22-074"*
- Homeowner CTA: *"Tengo un problema en mi vivienda"*
- Quote: *"Mi trabajo no es tener razón: es dejar la causa tan documentada que el juez pueda comprobarla por sí mismo."*

---

## VISUAL FOUNDATIONS

**Type** — three voices, three jobs:
- **Spectral** (serif) — authority. Display, headlines, pull quotes. Regular
  weight, tight tracking on large sizes; italics for quotations.
- **IBM Plex Sans** — clarity. Body, UI, navigation. Engineered and neutral.
- **IBM Plex Mono** — evidence. Reference codes, eyebrows, tags, figures. The
  monospace IS the documentary signal; use it for anything that should read as
  "from the file".

**Colour** — a cool-neutral system with a vivid green accent, *deliberately not
corporate blue*:
- Spine: `--ink-900` (#18211C green-black) → `--concrete-600` → `--stone-300`
  (hairlines) → `--bone-100` (#F1F1EA cool stone) → `--paper-50` (cards).
- **One accent only: verde inglés** (`--oxide-500 #1C7A4A` — token keeps the
  `--oxide-*` name for compatibility, now carries green). Used with restraint —
  links, the seal, key CTAs, one figure per cluster. Tints (`--oxide-100/200`)
  for quiet emphasis. Hover `--oxide-400`, press `--oxide-600`.
- Earthy semantics (moss/ochre/slate) for status, never neon.
- No pure-white page; neutrals are cool gray-green, the accent is the only
  saturated colour.

**Backgrounds:** Flat colour only. Two grounds — bone (default) and ink (for
gravity / section breaks). **No gradients, no photographic hero washes.** The
only texture is a faint 1px diagonal hatch on placeholder panels (evokes a
drawing sheet). Section rhythm alternates bone → paper → ink → tint.

**Space:** 4px grid. Generous — `--section-y` runs to 144px. Air signals
confidence and gravity. Editorial reading measure capped (`--container-text 720px`).

**Layout rules:** Sticky header that gains a blurred bone background + hairline
on scroll. A recurring structural device: a 2px ink rule with mono section
numbers (the "drawing sheet" header). Left-aligned editorial blocks; centred
only for method and final CTAs.

**Corners:** Small. `--radius-md` is 5px; most rules are square. Documents are
not rounded. `--radius-lg` (8px) only for images.

**Cards:** Hairline border (`--border-hairline`), near-square, **no shadow by
default**. Optional mono `refCode` header rule. Hover (interactive only):
border → oxide, a 2px lift, a faint card shadow. The dark `tone="ink"` card is
for emphasis blocks.

**Borders & rules:** Hairlines do the structural work, not shadows. The 2px
ink rule is a signature.

**Shadows:** Reserved for true overlays (`--shadow-overlay`) and the small
floating "badge" callouts. Never on flat content cards at rest.

**Hover states:** Links shift to oxide; nav items shift colour; cards lift 2px
+ accent border. **No scale-up bounce.**

**Press states:** Buttons **darken** (oxide-500 → oxide-600), never shrink —
precise, not playful.

**Focus:** 3px oxide ring (`--shadow-focus`) + ink border on inputs.

**Motion:** Restrained. Fade + 16px upward settle on scroll (`Reveal`),
`--dur-slow 320ms`, `--ease-out`. No infinite loops, no bounce. Honours
`prefers-reduced-motion` implicitly (reveal end-state is the base style).

**Imagery (when added):** Documentary, cool-neutral, fact-over-beauty — an
inspection in progress, a thermography frame, a structural detail. No stock
smiling-handshake photography. Until real assets exist, neutral `Placeholder`
panels with a mono caption stand in.

---

## ICONOGRAPHY

No icon set pre-existed (this is a new brand). **Chosen substitution: Lucide**
(`lucide@0.460.0`, loaded from unpkg CDN). Rationale: thin, even, open stroke
geometry that matches the precise, engineered character of IBM Plex and reads
as technical instrumentation rather than decoration.

- **Default:** `1.6` stroke weight, drawn in `currentColor` so they inherit ink
  or oxide from context. Sizes 14–26px.
- **Usage:** sparingly and functionally — service category markers, list checks,
  phone/contact affordances, directional arrows. Never as decorative filler.
- **Rendering:** the `Icon` wrapper in `SiteChrome.jsx` injects inline Lucide SVG
  (recolourable). In production, install `lucide-react` and keep the same names.
- **Emoji / unicode icons:** never used.
- **The Seal** (`components/brand/Seal.jsx`) is the one bespoke "icon" — a
  typographic registration stamp, not an illustration. Use it as a credibility
  mark / favicon / watermark.

> ⚠ **Flag:** Lucide is a substitution, not a pre-existing brand asset. If you
> prefer a different line set (e.g. a custom engineering glyph set), swap it
> centrally in `SiteChrome.jsx`.

---

## INDEX — what's in this system

**Root**
- `styles.css` — the single entry point consumers link (`@import` list only).
- `readme.md` — this guide. `SKILL.md` — Agent-Skill wrapper.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
`elevation.css`, `motion.css`, `base.css`. CSS custom properties + base reset.

**`components/`** — reusable React primitives (namespace
`window.VilardellPeritajeForenseDesignSystem_58f0b0`):
- `core/` — **Button**, **Tag** (mono evidence label), **Card**
- `data/` — **Stat** (cited figure)
- `forms/` — **Field**, **Input**, **StepForm** (guided multi-step intake for the homeowner door — conversational structure, documentary form; pairs with, never replaces, the short professional form)
- `layout/` — **SectionHeader** (eyebrow + serif title + lede)
- `disclosure/` — **Accordion** (FAQ)
- `brand/` — **Wordmark** (logo lockups), **Seal** (registration stamp)

**`guidelines/`** — foundation specimen cards for the Design System tab
(Colors, Type, Spacing, Brand).

**`ui_kits/website/`** — full interactive recreation: home + service page.
See its `README.md`.

---

## FONTS — self-hosting note

Spectral, IBM Plex Sans and IBM Plex Mono load via the Google Fonts CDN
(`tokens/fonts.css`). These ARE the intended typefaces (all open-source, SIL/OFL).
For offline/production use, self-host the WOFF2 files and replace the `@import`
with local `@font-face` rules. **Flag:** no font binaries are bundled in this
project yet — ask the user if self-hosted files are required.
