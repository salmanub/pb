# UI Kit — perito.barcelona (sitio web)

High-fidelity recreation of the public website for Albert Vilardell Serra's
forensic-engineering practice. This is the brand system applied end-to-end:
a **home** page and a **service-detail** page, navigable interactively.

## Run it
Open `index.html`. Use the header nav and in-page buttons to move between the
home page and the *Humedades y filtraciones* service page. The contact form is
a working fake (submits to a confirmation state).

## Files
| File | Role |
|---|---|
| `index.html` | App shell + fake router (`go(page, hash)`), responsive breakpoints, loads everything |
| `SiteChrome.jsx` | `Icon` (Lucide), `Placeholder`, `Reveal`, `SiteHeader`, `SiteFooter` |
| `HomePage.jsx` | Home: hero, credential strip, audience split, services, method, cases, about, FAQ, contact |
| `ServicePage.jsx` | Service detail: hero + facts sidebar, situations, deliverables, case, FAQ, CTA |

## Composition
Built almost entirely from the design-system components — `Button`, `Tag`,
`Card`, `Stat`, `SectionHeader`, `Accordion`, `Wordmark`, `Seal`, `Field`,
`Input` — pulled from `window.VilardellPeritajeForenseDesignSystem_58f0b0`
(the compiled `_ds_bundle.js`). Only page-specific glue (Icon wrapper,
placeholder panels, scroll/reveal) lives in the kit.

## Lead-qualification logic (both audiences)
- The hero offers **two doors**: *Solicitar dictamen* (high-value professional)
  and *Tengo un problema en mi vivienda* (worried homeowner).
- **§ 01 Audience split** routes each visitor to the right framing — an ink card
  for insurers/lawyers/administration, a paper card for individuals/communities.
- **Verifiable data** (Stat) substantiates authority instead of slogans.
- The **FAQ** and the calm **contact form** are pitched at the homeowner, who needs
  reassurance before reaching out.

## Placeholders
No photography is invented. Neutral documentary `Placeholder` panels stand in for
the inspection imagery, the portrait of Albert, and the thermography shot. Replace
with real assets before production.
