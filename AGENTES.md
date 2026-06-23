# AGENTES.md — perito.barcelona
## Fuente única de verdad para agentes IA (Antigravity / Claude Code / Cursor)

> Cualquier agente DEBE leer este fichero completo antes de tocar nada.
> Si una instrucción de chat contradice este fichero, **gana este fichero**.
> Trabajo quirúrgico: un cambio = una verificación. Nada que no esté aquí o
> pedido explícitamente.

---

## 1. MISIÓN DE ESTA ITERACIÓN

Portar la **website React/JSX del Design System forense** (carpeta
`Design System/ui_kits/website/`, creada en Claude Design) a una web **Eleventy v3**
de producción, **reemplazando por completo** la implementación visual y de plantillas
actual, y **conservando la arquitectura de contenido/silo existente**.

Resultado esperado: proyecto web **terminado, construido sin errores, con microdata
anidada validada, multilingüe, zero-JS, listo para desplegar en Cloudflare Pages.**

Fuentes de verdad (rutas exactas):
- **Website a portar:** `Design System/ui_kits/website/`
  - `SiteData.jsx` → datos/copys → `_data` + frontmatter `.md`
  - `SitePages.jsx` → definición de páginas/rutas → silo de URLs
  - `SiteChrome.jsx` → cabecera/nav/footer → partials
  - `HomePage.jsx` y `HomeVanguard.jsx` → **dos variantes de home** (elegir canónica, ver §9)
  - `index.html` / `index-vanguard.html` → renders estáticos de referencia visual
  - `README.md` → handoff del propio sistema (leer primero)
- **Tokens y marca (nivel sistema):** `Design System/tokens/`, `Design System/brand/`,
  `Design System/guidelines/`, `Design System/components/`, `Design System/styles.css`,
  `Design System/_ds_manifest.json`, `Design System/_ds_bundle.js`, `Design System/SKILL.md`.
- **Contenido/arquitectura = proyecto existente** (`src/_data/`, `src/_pages/`, este AGENTES).

Reglas de la misión:
- **Visual = `Design System/`** (única fuente de verdad de estética).
- Se **eliminan** plantillas, CSS y artefactos legacy actuales y se regeneran limpios.
- No se inventan tokens ni colores: se **extraen** de los ficheros anteriores.

---

## 2. AGENTES Y RESPONSABILIDADES (Antigravity 1.0 — @menciones en chat único)

| Agente            | Responsabilidad                                                       |
|-------------------|-----------------------------------------------------------------------|
| **@Manager**      | Lee AGENTES + PORT-PLAN. Ordena fases. No escribe código de UI.        |
| **@DesignPorter** | Inventaría `Design System/`, extrae tokens y componentes, los porta a Tailwind + Nunjucks. |
| **@TemplateDev**  | Construye `base.njk`, layouts y partials con microdata anidada.         |
| **@ContentDev**   | Regenera `.md` por idioma desde la arquitectura de contenido existente. |
| **@I18n**         | hreflang recíproco, sitemap, robots, paridad de idiomas.               |
| **@BuildValidator** | **VETO DURO.** El build debe pasar. `bypass: false`.                 |
| **@QualityGate**  | **VETO DURO.** Microdata completa + cero texto hardcodeado + paridad idiomas + zero-JS. `bypass: false`. |

Los dos vetos no se saltan: si `@BuildValidator` o `@QualityGate` fallan, la fase
**no se da por terminada** aunque el resto crea que está bien.

---

## 3. STACK (obligatorio)

| Capa          | Tecnología                                              |
|---------------|--------------------------------------------------------|
| SSG           | Eleventy (11ty) v3 — config CommonJS (`require`)        |
| Templates     | Nunjucks (`.njk`)                                       |
| Contenido     | Markdown + frontmatter YAML                             |
| Estilos       | Tailwind CSS v3 (JIT) + PurgeCSS inline por página      |
| JS            | **Zero-JS** en cliente (menú CSS, form `:target`)       |
| Config global | `src/_data/metadata.json`                               |
| i18n UI       | `src/_data/{lang}.json`                                 |
| Schema        | **Microdata en HTML — NUNCA JSON-LD**                   |
| Form backend  | Cloudflare Pages Function → webhook Make.com → `/gracias/` |
| Deploy        | Cloudflare Pages — build `npm run build:css && npx @11ty/eleventy`, output `public/` |

---

## 4. ESTRUCTURA DE CARPETAS (destino)

```
perito26/
├── .eleventy.js
├── tailwind.config.js
├── package.json
├── functions/api/contacto.js        ← Pages Function (form → Make)
└── src/
    ├── _data/
    │   ├── metadata.json             ← dominio, contacto, geo, schema negocio, servicios
    │   ├── es.json ca.json en.json fr.json it.json   ← TODO el texto de UI
    │   └── design.json               ← tokens extraídos del Design System (color/tipo/espaciado)
    ├── _includes/
    │   ├── layouts/  (base · home · service · about · contact)
    │   └── partials/ (nav · footer · schema-business · breadcrumb · form · qual · chips)
    ├── assets/css/main.css           ← directivas Tailwind
    ├── assets/images/
    ├── es/ ca/ en/ fr/ it/           ← páginas .md por idioma
    ├── robots.txt
    └── sitemap.xml.njk
```

---

## 5. REGLAS ABSOLUTAS DE ARQUITECTURA

1. **Separación estricta contenido / plantilla.** Cero texto hardcodeado en `.njk`.
   Contenido → frontmatter del `.md`. Texto de UI → `src/_data/{lang}.json`.
2. **Una sola fuente de datos de negocio:** `metadata.json`. Nav, footer y schema leen
   de ahí; no se duplican literales.
3. **Silo de URLs por idioma**, limpio y plano. Cada interior con su `BreadcrumbList`.
4. **`e.currentTarget`** nunca `e.target` (si hubiera JS de build).
5. **CSS:** Tailwind → `built.css` → **inline purgado por página** vía transform en
   `.eleventy.js`. Cero `<link>` de CSS y cero CSS sobrante en producción.
6. **Zero-JS cliente:** menú con checkbox `:checked`, formulario multipaso con `:target`,
   validación HTML5 nativa. Objetivo Lighthouse 100.

---

## 6. MICRODATA — REQUISITO CENTRAL (no negociable)

Schema.org **en microdata** (`itemscope`/`itemtype`/`itemprop` en el HTML real),
**NUNCA** `<script type="application/ld+json">`. **Anidada** para que Google lea la jerarquía.
Nada marcable sin marcar (header, nav, main, footer, FAQ, breadcrumbs, colecciones).

Jerarquía objetivo:
```
html → WebPage
  header → WPHeader → SiteNavigationElement (cada uno con name + url + ReadAction)
  main:
    home    → WebSite + SearchAction · ItemList de servicios
    service → Service + Offer · HowTo + HowToStep · FAQPage + Question/Answer
    about   → Person (+ worksFor Organization) · ItemList
    contact → ContactPoint
    breadcrumb → BreadcrumbList (interiores)
  footer → WPFooter
    └ [LocalBusiness | ProfessionalService] anidado:
        PostalAddress · GeoCoordinates · OpeningHoursSpecification ·
        ContactPoint · Person→worksFor Organization ·
        OfferCatalog→varios Offer (cada Offer con name) ·
        areaServed (cada zona en SU PROPIO itemscope con <meta itemprop="name"> EXPLÍCITO) ·
        potentialAction → ReserveAction
```

Errores prohibidos (los más habituales — no cometerlos):
- `areaServed` sin `itemscope` propio y sin `<meta itemprop="name">` → Google: "sin nombre".
- Subentidades (`OfferCatalog`, `Service`, `Question`) sin `itemprop="name"` explícito.
- URLs relativas en microdata → deben ser **absolutas**.

El bloque de negocio del footer es un **partial reutilizable** (`schema-business.njk`)
alimentado por `metadata.json`, idéntico en todas las páginas. Al terminar, el sitio
pasa **Google Rich Results Test** sin errores ni "sin nombre".

---

## 7. ESTRATEGIA DE CONTENIDO Y TONO (conservar del proyecto existente)

- **H1 home (fijo, no cambiar):** «Peritaje para quien no puede permitirse un mal informe.»
- **Reposicionamiento B2B de alto ticket:** directores de siniestros de aseguradoras,
  socios de despachos y administraciones públicas (casos de 340 K€ a 2,8 M€).
- **Tres páginas a PROTEGER (ya primeras en SERP — no canibalizar, no romper URL):**
  `/construccion/`, `/informes-periciales/vicios-ocultos/`,
  `/informes-periciales/humedades-filtraciones/`.
- Las páginas de humedades y vicios ocultos donan enlace contextual a **humedades.barcelona**
  con los anchors exactos: «tratamiento de humedades en Barcelona» y
  «diagnóstico y tratamiento de humedades en Barcelona».
- **Tono pericial aséptico.** Prohibido lenguaje autopromocional («líderes», «excelencia»,
  «boutique», «soluciones integrales»). Credibilidad solo con datos verificables: referencias
  normativas (LEC 347, CTE DB-HS, CC art. 1484…), importes de caso, tasas de ratificación.
- **Estructura de silos:** respetar la arquitectura de URLs ya definida en el proyecto
  existente (`_pages/` + AGENTES previo). Si hay discrepancia, **@Manager** la lista y
  pregunta antes de regenerar; no se inventan URLs nuevas.

---

## 8. IDIOMAS

- Idiomas: **es (default) · ca · en · fr · it**.
- `hreflang` recíproco entre todas las versiones + `x-default`.
- Paridad total: cada página existe en los 5 idiomas o se documenta la excepción.
- `sitemap.xml` con todas las URLs y sus `hreflang`.

---

## 9. PORT DEL DESIGN SYSTEM (qué hace @DesignPorter)

**Orden de lectura obligatorio (handoff):**
1. `Design System/README.md`, `Design System/SKILL.md`, `Design System/ui_kits/website/README.md`
2. `Design System/_ds_manifest.json` y `_ds_bundle.js` (manifiesto legible por máquina del sistema)
3. `Design System/tokens/`, `brand/`, `guidelines/`, `components/`, `styles.css`
4. `Design System/ui_kits/website/`: `SiteData.jsx`, `SitePages.jsx`, `SiteChrome.jsx`,
   `HomePage.jsx`, `HomeVanguard.jsx`, `index.html`, `index-vanguard.html`

**Punto de decisión (home):** existen dos variantes, `HomePage.jsx` y `HomeVanguard.jsx`.
Si el manifiesto/README declara cuál es la canónica, usar esa. Si no lo declara,
**@Manager pregunta a Albert cuál portar antes de codificar la home.** No portar las dos.

**Pasos del port:**
1. **Inventario completo** de los ficheros anteriores (no asumir contenido: leerlos).
2. **Extracción de tokens** desde `tokens/` + `_ds_manifest.json` (no de memoria) →
   `src/_data/design.json` y `tailwind.config.js`: paleta (token + hex), escala tipográfica
   y fuentes, espaciado, radios, sombras, breakpoints.
3. **Mapeo de componentes** React → Nunjucks (1:1 visual), tomando `components/` y
   `SiteChrome.jsx` como referencia: cabecera, nav, hero, tarjetas de servicio/caso,
   tabla de datos, fila de FAQ, footer, botones y estados, y los mecanismos forenses si
   están en el sistema (barra `qual`, chips normativos, metadatos de expediente EXP·/FASE·/DAT·).
   **Replicar el sistema tal cual está en la carpeta, no recrearlo de memoria.**
4. **Tailwind:** trasladar tokens a `theme.extend` para que las clases reflejen el sistema.
5. **Datos y páginas:** derivar de `SiteData.jsx` los copys/datos hacia `_data` + frontmatter,
   y de `SitePages.jsx` la relación de páginas, **cruzándola con el silo del proyecto existente**
   (§7); si difieren, @Manager lista la discrepancia y pregunta, no inventa URLs.
6. **Verificación visual:** comparar cada componente y la home portada contra `index.html`
   (render estático de referencia) y confirmar paridad antes de pasar a contenido.

---

## 10. LIMPIEZA (qué eliminar)

- Plantillas, layouts y CSS **legacy** actuales que no procedan del Design System portado.
- Artefactos sueltos en raíz que sean restos: `perito-barcelona-2026.jsx` (legacy),
  `temp.html`, y los scripts `fix-*.js` / `generate-content.js` **una vez** que su función
  esté cubierta por el build limpio (no borrar nada sin que su equivalente nuevo exista y
  el build pase). La carpeta `Design System/` **no se borra**: es la fuente de verdad visual.
- `_site/` y `public/` se regeneran; no se versionan.

---

## 11. CRITERIOS DE «DONE» (checklist de aceptación — @QualityGate)

- [ ] `npm run build:css && npx @11ty/eleventy` termina **sin errores ni warnings**.
- [ ] **Cero** texto hardcodeado en `.njk` (auditar con `grep`).
- [ ] Microdata anidada completa en TODAS las páginas; **Rich Results Test sin errores**;
      ningún `areaServed`/`Offer`/`Service`/`Question` «sin nombre».
- [ ] Los 5 idiomas presentes con `hreflang` recíproco + `x-default`; `sitemap.xml` correcto.
- [ ] Las 3 URLs protegidas existen con su ruta exacta y sus anchors a humedades.barcelona.
- [ ] H1 home literal correcto; tono aséptico sin frases prohibidas (auditar).
- [ ] **Zero-JS** verificado (la web funciona con JS desactivado); Lighthouse ≥ 95/100/100/100.
- [ ] Cada página: `<title>` y meta description únicos, OG/Twitter, CSS inline purgado.
- [ ] `functions/api/contacto.js` montado y apuntando al webhook Make; redirección a `/gracias/`.
- [ ] Paridad visual con el Design System confirmada por @DesignPorter.
- [ ] Proyecto listo para `git push` → Cloudflare Pages (build cmd + output `public`).

---

## 12. COMANDOS

```bash
npm install
npm run build:css     # compila Tailwind a built.css
npx @11ty/eleventy    # build → public/
npm run start         # dev server :3000
node --check <fichero.js>   # validar sintaxis de cada JS/config tras editarlo
```