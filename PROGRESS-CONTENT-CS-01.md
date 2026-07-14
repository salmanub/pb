# PROGRESS · CONTENT-CS-01 — Dos case studies high-ticket trilingües

Rama: `content/case-studies-01` · Salida del build: `dist/` (el repo NO usa `_site/`).
NO merge ni deploy sin aprobación de Albert.

## Ficheros creados

| Fichero | URL | Estado |
|---|---|---|
| `src/_includes/layouts/caso-estudio.njk` | (layout compartido) | — |
| `src/casos/index.njk` | `/casos/` | índice ES |
| `src/ca/casos/index.njk` | `/ca/casos/` | índice CA |
| `src/en/case-studies/index.njk` | `/en/case-studies/` | índice EN |
| `src/casos/preexistencias-nave-industrial.njk` | `/casos/preexistencias-nave-industrial/` | **Caso 1 · publicable** |
| `src/ca/casos/preexistencies-nau-industrial.njk` | `/ca/casos/preexistencies-nau-industrial/` | Caso 1 CA |
| `src/en/case-studies/pre-lease-condition-survey-industrial-unit.njk` | `/en/case-studies/pre-lease-condition-survey-industrial-unit/` | Caso 1 EN |
| `src/casos/hundimiento-vial-diagnosis-pericial.njk` | `/casos/hundimiento-vial-diagnosis-pericial/` | **Caso 2 · BORRADOR** |
| `src/ca/casos/enfonsament-vial-diagnosi-pericial.njk` | `/ca/casos/enfonsament-vial-diagnosi-pericial/` | Caso 2 CA (borrador) |
| `src/en/case-studies/sinkhole-road-forensic-investigation.njk` | `/en/case-studies/sinkhole-road-forensic-investigation/` | Caso 2 EN (borrador) |

Modificado: `src/_includes/layouts/base.njk` (1 línea) — `draft` ahora activa `noindex`.

## Mecanismo de BORRADOR reversible con UN SOLO campo (`draft: true`)
- **Sitemap:** `src/_generate/sitemap.njk` ya excluye `page.data.draft`.
- **noindex:** `base.njk:20` → `{% if noindex or seo == "noindex" or draft %}` emite `robots noindex, nofollow`.
- **Fuera del índice `/casos/`:** los índices iteran `collections.casoEstudio` filtrando `not item.data.draft`.
- **Sin inbound + nofollow:** `nofollow` neutraliza cualquier enlace saliente del caso 2.

Para publicar el caso 2: quitar `draft: true` (o ponerlo a `false`) en los 3 ficheros del caso 2 → entra en
sitemap, se indexa, y aparece en el índice `/casos/` automáticamente.

---

## ⚠️ Desviación de spec a revisar — Sistema de diseño real ≠ el descrito en la tarea
La tarea pide "Playfair Display 900 / DM Sans / teal #0F766E / JetBrains Mono". **El repo NO usa eso**: el
sistema canónico (y el único self-hosted) es **Spectral (serif) / IBM Plex Sans (cuerpo) / IBM Plex Mono
(eyebrow) / acento oxide-green `--accent` (#1C7A4A)**. He construido con el DS REAL para que las páginas
sean coherentes con las fichas de caso existentes (`caso.njk`) y no queden con fuentes no cargadas y un
color fuera de marca. Los "chips en negro" = los chips `--surface-ink` existentes. Si Albert quiere de
verdad un restyle Playfair/teal, es un cambio global del DS, no de estas 6 páginas.

---

## GATE 1 — Build limpio
```
$ npx @11ty/eleventy
… Copied 684 Wrote 150 files in ~16s (v3.0.0)
# filtrando error|warn|problem (excl. Wrote/Copied): BUILD LIMPIO
```
9 páginas nuevas generadas (6 casos + 3 índices), sin errores ni warnings.

## GATE 2 — Anonimización (grep sobre `dist/`, cero resultados)

**Lista de cadenas prohibidas construida y verificada** (rule 1–4):
1. **Municipios concretos** de las dos comarcas (localización permitida solo a nivel de comarca):
   Baix Llobregat — Cornellà, Sant Boi, El Prat, Gavà, Viladecans, Esplugues, Sant Feliu, Molins de Rei,
   Sant Joan Despí, Sant Just, Castelldefels, Sant Vicenç, Martorell, Esparreguera, Olesa, Abrera, Pallejà,
   Corbera, Begues, Cervelló, Vallirana; Vallès Occidental — Sabadell, Terrassa, Rubí, Cerdanyola, Montcada,
   Barberà, Ripollet, Castellar, Sant Cugat, Badia, Palau-solità, Sentmenat, Polinyà, Matadepera,
   Ullastrell, Viladecavalls, Rellinars.
2. **Direcciones:** `Carrer`, `Calle`, `C/`, `Avinguda/Avenida`, `Plaça/Plaza`, `Passeig`, `nº N`, `núm. N`.
3. **Identificadores:** patrones NIF/CIF (`[A-Z]\d{7,8}[0-9A-J]`, `\d{8}[A-Z]`) y referencia catastral (20 car.).
4. **Fechas con día:** `N de <mes>`, `DD/MM/2026`, `AAAA-MM-DD`.
5. **Terceros:** nombres de gabinetes/profesionales que intervinieron (el estudio geotécnico se narra como
   "un gabinete geológico especializado", sin nombrarlo).

**Resultado del grep sobre las 9 páginas generadas:**
```
MUNICIPIOS concretos ............ 0
DIRECCIONES (caso) .............. 0   (único hit: "Carrer Numància" ×9 = dirección de la
                                       PROPIA oficina del despacho en el schema LocalBusiness
                                       del footer, presente site-wide; NO es material de los
                                       expedientes → permitido)
NIF/CIF/CATASTRO ............... 0
FECHAS con día ................. 0
```
→ **Cero fugas de identificadores de los expedientes.** Fechas: solo mes/año (`01/2026`) o año (`2026`,
caso 2, porque el material no aporta mes — se documenta como decisión, no se inventa el mes).

## GATE 3 — Verificación de estado

**Sitemap** (`dist/sitemap.xml`):
- Caso 1 presente en los 3 idiomas: `preexistencias-nave-industrial`, `preexistencies-nau-industrial`,
  `pre-lease-condition-survey-industrial-unit`.
- Caso 2 (borrador) **ausente**: 0 ocurrencias de `hundimiento-vial` / `enfonsament-vial` / `sinkhole-road`.
- Índices `/casos/`, `/ca/casos/`, `/en/case-studies/` presentes.

**Los 6 `<title>` renderizados:**
```
Informe de preexistencias en nave industrial antes del arrendamiento — Perito Barcelona
Informe de preexistències en nau industrial abans de l'arrendament — Perito Barcelona
Pre-lease condition survey of an industrial unit — Perito Barcelona
Diagnosis pericial de un hundimiento en vial urbano — Perito Barcelona
Diagnosi pericial d'un enfonsament en vial urbà — Perito Barcelona
Forensic investigation of a road sinkhole — Perito Barcelona
```

**Robots del caso 2 (los 3 idiomas)** — línea idéntica en cada uno:
```
<meta name="robots" content="noindex, nofollow">
```
El caso 1 (3 idiomas) NO lleva `robots` (indexable). ✔

**Aislamiento del caso 2:** 0 enlaces ENTRANTES desde cualquier página de `dist/` (el índice `/casos/`
solo lista el caso 1). Los enlaces SALIENTES del caso 2 son exclusivamente chrome del sitio
(nav, footer, breadcrumb, sidebar de cualificación y CTA a `/contacto/`), inevitables en cualquier página;
además el `nofollow` del propio caso 2 neutraliza su transmisión de señal. Su cuerpo editorial no contiene
enlaces temáticos. La regla dura (rule 5: fuera de sitemap + noindex + sin inbound) se cumple íntegra.

---

## Notas de integración
- Caso 1 enlaza a `/construccion/` (cuerpo) y a `/contacto/profesional/` (CTA + sidebar). ✔
- Puente futuro a NaveFit mencionado de forma natural ("certificación periódica del estado de una nave"),
  **sin enlace**. ✔
- Rol pericial en caso 2: narrado siempre como **coordinación y diagnosis**; el estudio geotécnico se
  atribuye a "un gabinete geológico especializado bajo coordinación pericial". ✔
- hreflang/i18n: cada página declara `translations` (base.njk compone hreflang recíproco + x-default).
  No se tocó `i18n.json` para evitar duplicar `<loc>` en el sitemap (las 3 lenguas ya son páginas reales).

## Pendiente (requiere Albert)
- Aprobar diff y decidir merge de la rama `content/case-studies-01`.
- Confirmar cierre del expediente del **caso 2** para quitar `draft` y publicarlo.
- Decidir sobre la desviación de DS (Playfair/teal) — recomiendo mantener el DS real del repo.
