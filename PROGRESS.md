# PROGRESS — SEO-CTR-01 · Titles, meta descriptions y enlaces internos (ES)

**Fecha:** 2026-07-14
**Alcance:** SOLO versiones ES. No se toca /ca/, /en/, /fr/, /it/.
**Mecanismo de metadatos confirmado:** `src/_includes/layouts/base.njk` línea 18:
`<title>{{ title }} — {{ metadata.site.title }}</title>` → el sufijo de marca
`— Perito Barcelona` (19 car.) se añade **automáticamente**. Por tanto los titles
se escriben SIN sufijo (Parte A) y el layout lo compone. La `<meta description>`
sale directa de `description` (línea 19).
Blog: los posts se generan por paginación desde `src/_data/posts.json`
(`src/blog/post.njk` mapea `post.title`→title y `post.description`→description).

---

## Parte A — Metadatos (5 páginas ES)

| # | URL | Fichero editado |
|---|-----|-----------------|
| A1 | `/` | `src/index.njk` |
| A2 | `/construccion/` | `src/construccion/index.md` |
| A3 | `/blog/identificar-grietas-estructurales-vivienda/` | `src/_data/posts.json` (entrada `identificar-grietas-estructurales-vivienda`) |
| A4 | `/honorarios-perito-judicial-barcelona/` | `src/honorarios/index.md` |
| A5 | `/asesoramiento-estructural/` | `src/asesoramiento/index.md` |

> Nota: un intento previo (cambios ya presentes en el working tree al empezar)
> había (a) corrompido el YAML de `src/index.njk` (`eleventyNavigation` y
> `translations` desindentados) y (b) recortado en silencio los titles de A2 y A5
> (faltaban `· Dictámenes de Obra` y `· Barcelona`). Ambos corregidos para que
> coincidan **carácter a carácter** con la especificación.

---

## GATE 1 — Build limpio

`npx @11ty/eleventy` → **OK, sin errores ni warnings nuevos.**

```
[11ty] Copied 684 Wrote 141 files in 13.86 seconds (v3.0.0)
```

---

## GATE 2 — Verificación renderizada (extraído de `dist/`)

**`<title>` renderizado = título Parte A + ` — Perito Barcelona` (sufijo del layout).**
**`<meta name="description">` = coincide carácter a carácter con la especificación.**

### A1 · `/` → `dist/index.html`
```
<title>Perito Judicial en Barcelona · Ingeniería Civil y Edificación — Perito Barcelona</title>
<meta name="description" content="Despacho de ingeniería forense: 340+ dictámenes en edificación y obra civil, ratificación en sala incluida. Colegiado ECCAT · Min. Justicia. Primera consulta sin coste.">
```

### A2 · `/construccion/` → `dist/construccion/index.html`
```
<title>Perito de Construcción en Barcelona · Dictámenes de Obra — Perito Barcelona</title>
<meta name="description" content="Informes periciales de construcción: mala ejecución, defectos de obra y control de calidad. 340+ dictámenes ratificados sin impugnación. Presupuesto cerrado en 24 h.">
```

### A3 · `/blog/identificar-grietas-estructurales-vivienda/`
```
<title>Grietas Estructurales: Cómo Identificarlas Paso a Paso (Guía del Perito) — Perito Barcelona</title>
<meta name="description" content="Distinga una fisura superficial de una grieta estructural peligrosa: formas, orientación, anchura y cuándo actuar. Explicado por un perito con casos reales.">
```

### A4 · `/honorarios-perito-judicial-barcelona/`
```
<title>¿Cuánto Cuesta un Informe Pericial? Honorarios y Ejemplos — Perito Barcelona</title>
<meta name="description" content="Presupuesto cerrado por escrito antes de empezar, sin costes variables. Ratificación en sala incluida. Le orientamos sobre el coste de su caso en una consulta sin compromiso.">
```

### A5 · `/asesoramiento-estructural/`
```
<title>Asesoramiento Técnico y Pericial de Estructuras · Barcelona — Perito Barcelona</title>
<meta name="description" content="Diagnosis estructural, recalce de cimentaciones y segunda opinión técnica previa a compra u obra. Ingeniero civil colegiado, con respaldo pericial si el caso llega a juicio.">
```

### ⚠️ AVISO DE LONGITUD (requiere decisión de Albert — NO se recorta por cuenta propia)
Con el sufijo `— Perito Barcelona` añadido por el layout, **los 5 titles renderizados
superan el objetivo de ~60 caracteres** (rango ~74–90 car.):

| Página | Título core (sin sufijo) | Renderizado (con sufijo) |
|--------|--------------------------|--------------------------|
| A1 | ~61 | ~80 |
| A2 | ~55 | ~74 |
| A3 | ~71 | ~90 |
| A4 | ~57 | ~76 |
| A5 | ~58 | ~77 |

Opciones para Albert: (a) aceptar tal cual; (b) autorizar recorte de los titles;
(c) suprimir el sufijo de marca en estas páginas (requiere tocar `base.njk`, fuera
del alcance actual). **A la espera de decisión.**

---

## Parte B / GATE 3 — Enlaces internos a URLs redirigidas

Los enlaces internos ES apuntaban a las rutas antiguas `/informes-periciales/{slug}/`
(que ahora redirigen 301 a `/{slug}/`). Fuentes corregidas (solo rama ES; CA/EN
intactos, verificado byte a byte en `dist/ca` y `dist/en`):

| Fichero | Cambio |
|---------|--------|
| `src/_includes/partials/nav.njk` | `svcBasePath` ES: `/informes-periciales/` → `/` |
| `src/_includes/partials/footer.njk` | Separado `fSvcHub` (catálogo→hub) de `fSvcBase` (ítems ES→`/`) |
| `src/_includes/layouts/service.njk` | "Servicios relacionados" ES: `/informes-periciales/`+slug → `/`+slug |
| `src/dictamenes/index.md` | 4 loops de tarjetas ES: `/informes-periciales/`+path → `/`+path |
| `src/_data/posts.json` | `relatedServices` del post vicios-ocultos: `/informes-periciales/judicial/` → `/perito-judicial/` |

**Grep sobre `dist/` tras el build (todas las ocurrencias de `informes-periciales` en `href`):**
```
    223 href="/informes-periciales/"                                  ← HUB real (página viva, correcto)
      7 href="https://perito.barcelona/informes-periciales/"          ← HUB real absoluto (correcto)
      2 href="https://perito.barcelona/informes-periciales/obras-publicas/"  ← página viva (no movida)
      2 href="/informes-periciales/obras-publicas/"                   ← página viva (no movida)
      1 href="/ca/informes-periciales/patologies-estructurals/"       ← contenido blog CA (fuera de alcance)
      1 href="/ca/informes-periciales/naus-industrials/"              ← contenido blog CA (fuera de alcance)
      1 href="/ca/informes-periciales/judicial/"                      ← contenido blog CA (fuera de alcance)
      1 href="/ca/informes-periciales/humitats-filtracions/"          ← contenido blog CA (fuera de alcance)
```
**Resultado:** en páginas ES **quedan 0 enlaces a subrutas redirigidas**. Los `href`
restantes con `informes-periciales` apuntan a páginas VIVAS reales:
- `/informes-periciales/` — el hub/índice de dictámenes (página real, NO redirige).
- `/informes-periciales/obras-publicas/` — obra pública (no se movió a raíz).

> El gate literal "cero resultados de `informes-periciales`" no es alcanzable sin
> romper el enlace legítimo al hub; se interpreta como "cero enlaces a subrutas
> redirigidas", cumplido.

### Datos estructurados — CORREGIDO (aprobado por Albert 2026-07-14)
`schema-business.njk` emitía `itemprop=url` con `/informes-periciales/{path}/` para
todos los servicios (metadato, no `href`; no bloqueaba el gate, pero apuntaba a URLs
redirigidas). **Arreglado solo para ES**: ahora usa `svc.href` si existe, si no
`/{slug}/` en raíz — replicando la lógica de `nav.njk` para ES. **CA/EN se dejan
byte a byte intactos** (siguen emitiendo `{langPrefix}/informes-periciales/{path}/`).
Verificado en `dist/`: las 11 URLs de servicio ES apuntan a permalinks reales vivos
(0 subrutas redirigidas); `dist/ca` y `dist/en` sin cambios.

### Pendientes fuera de alcance (para follow-up, NO tocados aquí)
1. **CA tiene el mismo patrón que ES**: nav/footer CA enlazan a
   `/ca/informes-pericials/{slug}/` (redirige a `/ca/{slug}/`). Mismo fix trivial
   cuando se autorice tocar CA.
2. **4 enlaces rotos en contenido de blog CA** (`posts_ca.json`): usan la grafía ES
   `/ca/informes-periciales/...` (doble error: prefijo ES en CA + subruta antigua).

### Decisiones de Albert (2026-07-14)
- Incidencia commit/deploy → **dejarlo como está** (no se reescribe historia).
- Longitud de titles (>60 con sufijo) → **dejar tal cual** (textos de la spec, sin recortar).
- `schema-business.njk` → **arreglar** (hecho, ver arriba).

---

## ⚠️ INCIDENCIA DE COMMIT/DEPLOY (requiere atención de Albert)

La automatización del repo (auto-commit tipo "make git") **capturó y PUSHEÓ** todos
los cambios mientras se trabajaba, en el commit `426dda5c` con mensaje
`fix(casos-exito): rellena contenido EN y CA ...`. Esto **incumple** dos requisitos:

- **NO** es un único commit con el mensaje `seo(ctr): batch titles/descs + fix internal links [2026-07-14]`.
  El commit mezcla SEO-CTR-01 con trabajo previo no relacionado (casosExito, base.njk
  hreflang, ficheros de datos, caso.njk, built.css, *.11tydata.js).
- **Se pusheó a `origin/main`** (`github.com/salmanub/pb.git`) → probable deploy a
  producción en Cloudflare Pages, contra la instrucción "no desplegar hasta aprobar".

Yo (Claude) **no ejecuté `git commit` ni `git push`**; lo hizo la automatización.
No he reescrito historia ni forzado push (acción destructiva sobre rama compartida
de producción) — esa decisión es de Albert. Opciones: dejarlo, o rehacer/renombrar
el commit (requiere `reset` + re-commit + force-push, con cuidado de no perder el
trabajo de casos-exito). **A la espera de decisión.**
