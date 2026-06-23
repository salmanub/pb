# PORT-PLAN.md — perito.barcelona React → Eleventy

> Generado por @Manager tras inventario de @DesignPorter y @ContentDev.
> Fuente de verdad visual: `Design System/`. Contenido/silo: proyecto existente.

---

## 1. DECISIÓN DE HOME

El sistema **solo dispone de una variante**: `HomePage.jsx`. No existe
`HomeVanguard.jsx` ni `index-vanguard.html` en la carpeta
`Design System/ui_kits/website/`. El README del website kit confirma:
«a home page and a service-detail page».

**→ Se porta `HomePage.jsx` como home canónica.**

---

## 2. INVENTARIO @DesignPorter — Design System

### 2.1 Ficheros del website kit (`ui_kits/website/`)

| Fichero | Existe | Rol |
|---------|--------|-----|
| `SiteData.jsx` | ✅ | Datos (SVCS, CASOS, TESTI, PROTO) + bloques sobrios (Breadcrumb, PageHero, Qual, ServiceRow, CaseCard, Testi, FaqList, BandCTA, SecHead) |
| `SitePages.jsx` | ✅ | Páginas: Construccion, Informes, Svc (genérico), Casos, Abogados, Honorarios, Despacho, Contacto |
| `SiteChrome.jsx` | ✅ | Icon (Lucide), Placeholder, Reveal, SiteHeader, SiteFooter, FooterCol |
| `HomePage.jsx` | ✅ | Home: hero, stats, audience split, services grid, method, cases (dark), about, FAQ, contact form |
| `HomeVanguard.jsx` | ❌ | No existe |
| `index.html` | ✅ | App shell + router de referencia visual |
| `index-vanguard.html` | ❌ | No existe |

### 2.2 Tokens detectados

**Paleta (extraída de `tokens/colors.css`):**

| Token | Hex | Rol |
|-------|-----|-----|
| `--ink-900` | `#18211C` | Texto fuerte, superficies dark |
| `--ink-800` | `#232E27` | Texto body |
| `--ink-700` | `#34403A` | Dark surface step |
| `--concrete-600` | `#5E665F` | Texto muted |
| `--concrete-500` | `#828A82` | Texto terciario |
| `--stone-400` | `#AEB4AE` | Texto faint / disabled |
| `--stone-300` | `#D5DAD5` | Hairline on light |
| `--stone-250` | `#DFE3DE` | Hairline subtle |
| `--stone-200` | `#E8EBE7` | Muted fills |
| `--bone-100` | `#F1F1EA` | Page ground (piedra fría) |
| `--paper-50` | `#FAFAF4` | Card surface |
| `--oxide-700` | `#11502F` | Accent darkest |
| `--oxide-600` | `#15633C` | Accent pressed |
| `--oxide-500` | `#1C7A4A` | **Accent** — verde inglés |
| `--oxide-400` | `#2A9760` | Accent hover |
| `--oxide-200` | `#A6D8BD` | Tint border |
| `--oxide-100` | `#DCEFE3` | Tint surface |
| `--moss-600` | `#4C6650` | Positive (ratificado) |
| `--ochre-600` | `#936E22` | Caution (pendiente) |
| `--slate-700` | `#324350` | Info |
| `--text-on-dark-muted` | `#A9A296` | Muted sobre dark |

**Tipografías (de `tokens/typography.css` + `tokens/fonts.css`):**

| Familia | Token | Stack | Rol |
|---------|-------|-------|-----|
| Spectral | `--font-serif` | Spectral, Georgia, serif | Autoridad: display, headlines, quotes |
| IBM Plex Sans | `--font-sans` | IBM Plex Sans, system-ui, sans-serif | Claridad: body, UI, nav |
| IBM Plex Mono | `--font-mono` | IBM Plex Mono, ui-monospace, monospace | Evidencia: ref codes, labels, datos |

**Escala tipográfica:** display-1 (`clamp 2.75–4.5rem`), display-2, h1, h2, h3 (`1.3rem`), h4 (`1.1rem`), lede, body, body-sm, small, caption, mono-label, data-xl.

**Espaciado (de `tokens/spacing.css`):** Grid 4px. `--section-y: clamp(64px, 9vw, 144px)`. `--gutter: clamp(20px, 5vw, 64px)`. Containers: max 1200px, text 720px, wide 1320px.

**Elevación (de `tokens/elevation.css`):** Radii: xs 2px, sm 3px, md 5px, lg 8px. Sombras: card (sutil), overlay (dropdowns), focus (3px oxide ring). Bordes: hair 1px, strong 1.5px, rule 2px.

**Motion (de `tokens/motion.css`):** dur-fast 140ms, dur-base 200ms, dur-slow 320ms. ease-out `cubic-bezier(0.22, 0.61, 0.36, 1)`. lift `translateY(-2px)`.

### 2.3 Componentes del Design System

| Categoría | Componente | Fuente | Props clave |
|-----------|-----------|--------|-------------|
| brand | **Seal** | `components/brand/Seal.jsx` | size, tone (ink/light/oxide) |
| brand | **Wordmark** | `components/brand/Wordmark.jsx` | variant (lockup/stacked), tone (dark/light), size |
| core | **Button** | `components/core/Button.jsx` | variant (primary/secondary/ghost/on-dark), size (sm/md/lg), fullWidth, iconLeft/Right |
| core | **Card** | `components/core/Card.jsx` | tone (paper/raised/ink/tint), interactive, refCode |
| core | **Tag** | `components/core/Tag.jsx` | variant (default/outline/accent/ink/positive/caution), size (sm/md), dot |
| data | **Stat** | `components/data/Stat.jsx` | value, label, source, accent, onDark |
| disclosure | **Accordion** | `components/disclosure/Accordion.jsx` | items [{q,a}], defaultOpen |
| forms | **Field** | `components/forms/Field.jsx` | label, htmlFor, hint |
| forms | **Input** | `components/forms/Input.jsx` | id, type, multiline, rows, placeholder |
| forms | **StepForm** | `components/forms/StepForm.jsx` | steps, multi-paso para homeowner |
| layout | **SectionHeader** | `components/layout/SectionHeader.jsx` | eyebrow, title, lede, align, size (sm/md/lg), onDark |

---

## 3. INVENTARIO @ContentDev — Proyecto existente

### 3.1 Idiomas declarados

`es` (default), `ca`, `en`, `fr`, `it` — 5 idiomas, conforme a AGENTES §8.

### 3.2 URLs actuales del proyecto (silo ES)

**Raíz:**
- `/` — home (index.md)
- `/contacto/`
- `/el-despacho/`
- `/honorarios/`
- `/colaboracion-abogados/`
- `/aviso-legal/`
- `/privacidad/`
- `/404`
- `/no-disponible/`

**Silo Construcción:**
- `/construccion/` — pillar (index.md)

**Silo Informes Periciales:**
- `/informes-periciales/` — hub (index.md)
- `/informes-periciales/informe-de-parte/`
- `/informes-periciales/patologias-estructurales/`
- `/informes-periciales/humedades-filtraciones/` ← **PROTEGIDA**
- `/informes-periciales/vicios-ocultos/` ← **PROTEGIDA**
- `/informes-periciales/reclamacion-mala-ejecucion/`
- `/informes-periciales/contrainforme-pericial/`
- `/informes-periciales/naves-industriales/`
- `/informes-periciales/obras-publicas/`
- `/informes-periciales/comunidades-propietarios/`

**Silo Asesoramiento Estructural:**
- `/asesoramiento-estructural/` — hub
- `/asesoramiento-estructural/diagnostico-patologias/`
- `/asesoramiento-estructural/reparacion-hormigon/`
- `/asesoramiento-estructural/refuerzo-fibra-carbono/`
- `/asesoramiento-estructural/evaluacion-seguridad-estructural-ite-iee/`

**Silo Ingeniería Forense:**
- `/ingenieria-forense-construccion/` — hub

**Silo Especialidades Forenses:**
- `/especialidades-forenses/` — hub

**Otros:**
- `/casos-exito/` — hub + individual
- `/blog/` — hub + posts

### 3.3 Tres páginas protegidas (AGENTES §7)

1. **`/construccion/`** ← ya primera en SERP
2. **`/informes-periciales/vicios-ocultos/`** ← ya primera en SERP
3. **`/informes-periciales/humedades-filtraciones/`** ← ya primera en SERP

Las páginas de humedades y vicios ocultos donan enlace a `humedades.barcelona`
con anchors exactos: «tratamiento de humedades en Barcelona» y «diagnóstico y
tratamiento de humedades en Barcelona».

---

## 4. CRUCE DE SILOS — @Manager

### SitePages.jsx define estas páginas:

| Función | Ruta equivalente DS |
|---------|-------------------|
| `HomePage` | `/` |
| `Construccion` | `/construccion/` |
| `Informes` | `/informes-periciales/` |
| `Svc` (×8, por slug) | `/informes-periciales/{slug}/` |
| `Casos` | `/casos-exito/` |
| `Abogados` | `/colaboracion-abogados/` |
| `Honorarios` | `/honorarios/` |
| `Despacho` | `/el-despacho/` |
| `Contacto` | `/contacto/` |

### Discrepancias detectadas — RESUELTAS

| # | Situación | Resolución (confirmada por usuario) |
|---|-----------|-------------------------------------|
| **D1** | DS tiene 8 servicios; proyecto tiene 10 (+obras-públicas, +comunidades) | **Solo 8 del DS.** Eliminar obras-públicas y comunidades. Redirect 301 → `/informes-periciales/` |
| **D2** | Proyecto tiene silos extra: asesoramiento-estructural (5 págs), ingeniería-forense (1), especialidades-forenses (1) | **Eliminar.** Redirect 301 → `/` o servicio más cercano |
| **D3** | DS tiene `perito-judicial` (EXP·02) sin equivalente en proyecto | **Crear** `/informes-periciales/perito-judicial/` con contenido de SiteData.jsx |
| **D4** | Proyecto tiene `/blog/`; DS no lo contempla | **Eliminar.** Redirect 301 → `/` |
| **D5** | Proyecto tiene legal/privacidad/no-disponible | **Mantener** aviso-legal y privacidad (RGPD). Eliminar no-disponible |

**Redirects 301 (a incluir en `_redirects`):**
```
/asesoramiento-estructural/*  /  301
/ingenieria-forense-construccion/*  /  301
/especialidades-forenses/*  /  301
/informes-periciales/obras-publicas/  /informes-periciales/  301
/informes-periciales/comunidades-propietarios/  /informes-periciales/  301
/blog/*  /  301
/no-disponible/  /  301
```
Replicar para los 5 idiomas.

---

## 5. MAPA COMPONENTE REACT → PARTIAL/LAYOUT NUNJUCKS

### 5.1 Layouts (en `src/_includes/layouts/`)

| Layout Nunjucks | Fuente React | Páginas que lo usan |
|-----------------|-------------|---------------------|
| `base.njk` | SiteChrome (header+footer wrapper) | Todas |
| `home.njk` | `HomePage.jsx` | `/` |
| `service-pillar.njk` | `Construccion` en SitePages.jsx | `/construccion/` |
| `service-hub.njk` | `Informes` en SitePages.jsx | `/informes-periciales/` |
| `service.njk` | `Svc` en SitePages.jsx | `/informes-periciales/{slug}/` |
| `cases.njk` | `Casos` en SitePages.jsx | `/casos-exito/` |
| `collaboration.njk` | `Abogados` en SitePages.jsx | `/colaboracion-abogados/` |
| `about.njk` | `Despacho` en SitePages.jsx | `/el-despacho/` |
| `honorarios.njk` | `Honorarios` en SitePages.jsx | `/honorarios/` |
| `contact.njk` | `Contacto` en SitePages.jsx | `/contacto/` |
| `legal.njk` | (no en DS) | `/aviso-legal/`, `/privacidad/` |
| `blog-list.njk` | (no en DS) | `/blog/` |
| `blog-post.njk` | (no en DS) | `/blog/{post}/` |
| `404.njk` | (no en DS) | `/404` |

### 5.2 Partials (en `src/_includes/partials/`)

| Partial Nunjucks | Fuente React | Notas |
|------------------|-------------|-------|
| `nav.njk` | `SiteHeader` en SiteChrome.jsx | Sticky, dropdown CSS-only, burger checkbox (zero-JS) |
| `footer.njk` | `SiteFooter` + `FooterCol` en SiteChrome.jsx | Grid 4 cols, ink background |
| `schema-business.njk` | (nuevo) | Microdata LocalBusiness anidada desde metadata.json |
| `breadcrumb.njk` | `Breadcrumb` en SiteData.jsx | Mono, microdata BreadcrumbList |
| `page-hero.njk` | `PageHero` en SiteData.jsx | Breadcrumb + title + lede + optional Seal |
| `section-header.njk` | `SectionHeader` componente DS | Eyebrow + serif title + lede |
| `stat.njk` | `Stat` componente DS | Mono value + label + source |
| `service-row.njk` | `ServiceRow` en SiteData.jsx | Fila servicio con hover CSS |
| `case-card.njk` | `CaseCard` en SiteData.jsx | Card dark/light con tag + importe |
| `testimonial.njk` | `Testi` en SiteData.jsx | Blockquote + atribución |
| `faq.njk` | `Accordion` componente DS | `<details>/<summary>` (zero-JS) |
| `qual.njk` | `Qual` en SiteData.jsx | Sidebar sticky con CTA |
| `band-cta.njk` | `BandCTA` en SiteData.jsx | CTA centrada con Seal |
| `contact-form.njk` | `ContactCTA` en HomePage.jsx | Form HTML5 → Pages Function |

---

## 6. MAPA SiteData → _data / frontmatter

| Dato en SiteData.jsx | Destino Eleventy | Notas |
|---------------------|-----------------|-------|
| `SVCS` (8 servicios) | frontmatter de cada `.md` en `/informes-periciales/` | slug, num, tag, norm, desc, lsi, body, faqs |
| `CASOS` (6 casos) | `_data/casos.json` (nuevo) o frontmatter de casos-exito | tag, imp, title, desc, pills |
| `TESTI` (3 testimonios) | `_data/testimonios.json` (nuevo) | quote, author, role |
| `PROTO` (4 pasos método) | `_data/metodo.json` (nuevo) o frontmatter home | name, description |
| `SERVICES` (6 cards home) | frontmatter `index.md` home | code, slug, icon, title, description |
| `METHOD` (4 pasos) | frontmatter `index.md` home | n, title, description |
| `CASES` (3 casos home) | frontmatter `index.md` home | exp, loc, title, amount, tag |
| Textos UI (CTAs, labels) | `_data/{lang}.json` | Cero texto hardcodeado en .njk |
| Datos de negocio | `_data/metadata.json` (existente) | Teléfono, email, sedes, horarios, schema |

---

## 7. PÁGINAS × 5 IDIOMAS

Cada página debe existir en `es`, `ca`, `en`, `fr`, `it` con `hreflang` recíproco + `x-default`.

| Página ES | CA | EN | FR | IT |
|-----------|----|----|----|----|
| `/` | `/ca/` | `/en/` | `/fr/` | `/it/` |
| `/construccion/` | `/ca/construccio/` | `/en/construction-expert/` | `/fr/expert-construction/` | `/it/perito-edile/` |
| `/informes-periciales/` | `/ca/informes-pericials/` | `/en/expert-witness-reports/` | `/fr/rapports-expertise/` | `/it/perizie-tecniche/` |
| `/informes-periciales/{slug}/` | `/ca/informes-pericials/{slug}/` | `/en/expert-witness-reports/{slug}/` | etc. | etc. |
| `/casos-exito/` | `/ca/casos-d-exit/` | `/en/success-cases/` | `/fr/cas-reussis/` | `/it/casi-successo/` |
| `/colaboracion-abogados/` | `/ca/collaboracio-advocats/` | `/en/lawyer-collaboration/` | `/fr/collaboration-avocats/` | `/it/collaborazione-avvocati/` |
| `/honorarios/` | `/ca/honoraris/` | `/en/expert-witness-fees/` | `/fr/honoraires/` | `/it/onorari/` |
| `/el-despacho/` | `/ca/el-despatx/` | `/en/the-firm/` | `/fr/le-cabinet/` | `/it/lo-studio/` |
| `/contacto/` | `/ca/contacto/` | `/en/contacto/` | `/fr/contact/` | `/it/contatti/` |
| `/aviso-legal/` | `/ca/avis-legal/` | `/en/legal-notice/` | `/fr/mentions-legales/` | `/it/note-legali/` |
| `/privacidad/` | `/ca/privacitat/` | `/en/privacy/` | `/fr/confidentialite/` | `/it/privacy/` |
| `/blog/` | `/ca/blog/` | `/en/blog/` | `/fr/blog/` | `/it/blog/` |
| `/asesoramiento-estructural/` | `/ca/assessorament-estructural/` | `/en/structural-consulting/` | `/fr/conseil-structurel/` | `/it/consulenza-strutturale/` |
| `/ingenieria-forense-construccion/` | `/ca/enginyeria-forense-construccio/` | `/en/civil-forensic-engineering/` | `/fr/audits-de-chantier/` | `/it/audit-di-cantiere/` |
| `/especialidades-forenses/` | `/ca/especialitats-forenses/` | `/en/forensic-specialties/` | `/fr/specialites-judiciaires/` | `/it/specialita-forensi/` |

---

## 8. CHECKLIST «DONE» (AGENTES §11)

- [ ] `npm run build:css && npx @11ty/eleventy` sin errores ni warnings
- [ ] **Cero** texto hardcodeado en `.njk` (auditar con `grep`)
- [ ] Microdata anidada completa en TODAS las páginas; Rich Results Test sin errores; ningún `areaServed`/`Offer`/`Service`/`Question` «sin nombre»
- [ ] 5 idiomas presentes con `hreflang` recíproco + `x-default`; `sitemap.xml` correcto
- [ ] Las 3 URLs protegidas existen con ruta exacta y anchors a humedades.barcelona
- [ ] H1 home literal correcto: «Dictámenes que se sostienen en sala.»
- [ ] **Zero-JS** verificado (web funciona con JS desactivado); Lighthouse ≥ 95/100/100/100
- [ ] Cada página: `<title>` y meta description únicos, OG/Twitter, CSS inline purgado
- [ ] `functions/api/contacto.js` montado → webhook Make → `/gracias/`
- [ ] Paridad visual con el Design System confirmada
- [ ] Proyecto listo para `git push` → Cloudflare Pages (build cmd + output `public`)

---

## 9. NOTAS @Manager

### H1 de la home

**DECIDIDO:** H1 = «Dictámenes que se sostienen en sala.» (de `HomePage.jsx`).
AGENTES §7 decía otro, pero el usuario confirma usar el del Design System.

### Output directory

AGENTES dice `public/`, el proyecto actual usa `dist/`.
Cambiaré a `public/` durante la limpieza (Fase 6).

### Tailwind v4 vs v3

El proyecto usa Tailwind v4 + ESM. AGENTES dice v3 + CJS.
Se mantiene v4 + ESM (ya aprobado en intercambio anterior).
