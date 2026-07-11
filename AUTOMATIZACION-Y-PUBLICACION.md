# Publicación automática de contenidos — perito.barcelona

Guía operativa para publicar el calendario de contenidos **sin intervención humana**,
usando la infraestructura que **ya existe** en tu repo 11ty.

---

## TL;DR

1. El motor de publicación programada **ya está construido y funciona** (`lib/publish.js` + `src/blog/post.njk` + cron diario en `deploy-sxg.yml`). No hay que recodificar `.eleventy.js`.
2. Para publicar un artículo en una fecha, basta con **añadir su objeto a `src/_data/posts.json`** con `datePublished` en esa fecha (formato `YYYY-MM-DD`). El post se genera y aparece **solo** cuando llega el día.
3. Los **41 artículos del calendario ya están redactados y fusionados** en `src/_data/posts.json` (14 originales + 41 nuevos = 55), cada uno con su `datePublished` semanal (jul-2026 → abr-2027). La cola completa queda en `content-queue-2026.json` como referencia.
4. Mueve **`keepalive-workflow.yml`** (raíz del repo) a `.github/workflows/keepalive.yml` para que GitHub no desactive el cron tras 60 días de inactividad. Con esto, el sistema es **100 % manos libres**.

---

## 1. Cómo funciona el motor que ya tienes

Tu repo ya implementa "publicación programada" de forma limpia:

- **`lib/publish.js`** define `PUBLISH_CUTOFF = hoy (zona horaria de Madrid)` en el momento del build. Un post con `datePublished` futura queda **fuera** de:
  - las páginas individuales (no se generan),
  - los listados de blog, la home y los "artículos relacionados",
  - el `sitemap.xml`.
- **`src/blog/post.njk`** pagina sobre `postsPublished` (los posts ya publicados), no sobre `posts` en crudo. Es decir: **un post con fecha futura no crea página hasta su día**.
- **`.eleventy.js`** ya expone `postsPublished`, `posts_caPublished`, `posts_enPublished` como global data y los filtros `isPublished` / `published`.

> Como el "corte" se calcula **en tiempo de build**, hace falta un **rebuild diario** para que un post "aparezca" al llegar su fecha. Eso es exactamente lo que hace el cron.

### El cron de publicación (ya existe)

En `.github/workflows/deploy-sxg.yml`:

```yaml
on:
  push:
    branches: ["main"]
  schedule:
    - cron: '0 0 */6 * *'   # renovación de certificado cada 6 días
    - cron: '0 4 * * *'     # REBUILD DIARIO ~06:00 Madrid → publica posts programados
  workflow_dispatch:
```

El job hace `npm run build` (que corre `publish.js`) y despliega `dist` a Cloudflare Pages con `wrangler`. **Cada mañana reconstruye el sitio; si algún post cumple fecha ese día, se publica.**

---

## 2. La pieza que faltaba: `keepalive.yml`

GitHub **desactiva los workflows programados tras 60 días sin commits** en el repo. Si el repo queda inactivo (que es justo tu escenario: "aunque el repo no se actualice"), el cron diario se apaga y deja de publicar.

**Solución:** añade `keepalive.yml` (incluido en este paquete) a `.github/workflows/`. Se ejecuta cada lunes y, cuando el último commit se acerca al límite, hace un commit vacío que reinicia el contador. Con esto los crons **nunca** se desactivan.

Requiere el secret `GH_PAT` (ya lo usas en `deploy-sxg.yml`).

> Alternativa de un solo archivo: en lugar de `keepalive.yml`, puedes añadir el mismo paso `gautamkrishnar/keepalive-workflow@v2` como primer step dentro de `deploy-sxg.yml`. Cualquiera de las dos vías vale; `keepalive.yml` es la menos intrusiva porque no toca tu workflow de certificados.

---

## 3. Cómo añadir posts (flujo manos libres)

### Opción A — fusión manual puntual
Abre `src/_data/posts.json` (es un **array**) y pega los objetos de `content-queue-2026.json` **al principio** del array. Commit + push. Listo: cada uno se publicará en su `datePublished`.

### Opción B — script de fusión (recomendado para lotes)
Guarda este script como `src/scripts/merge-queue.mjs` y ejecútalo con `node src/scripts/merge-queue.mjs`:

```js
// Fusiona content-queue-2026.json dentro de src/_data/posts.json evitando duplicados por slug.
import { readFileSync, writeFileSync } from 'node:fs';
const POSTS = 'src/_data/posts.json';
const QUEUE = 'content-queue-2026.json';
const posts = JSON.parse(readFileSync(POSTS, 'utf8'));
const queue = JSON.parse(readFileSync(QUEUE, 'utf8'));
const slugs = new Set(posts.map(p => p.slug));
const nuevos = queue.filter(p => !slugs.has(p.slug));
const merged = [...nuevos, ...posts];            // nuevos primero
writeFileSync(POSTS, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log(`Añadidos ${nuevos.length} posts. Total: ${merged.length}.`);
```

Con esto, el "calendario automatizable" es literal: mantienes una cola de objetos con fechas futuras y el sistema los publica uno a uno, solo.

---

## 4. Esquema de un post (para redactar los "Planificado")

Cada entrada del array `posts.json` sigue este esquema (el mismo que usa `content-queue-2026.json`):

```json
{
  "title": "…",
  "slug": "kebab-case-unico",
  "translations": [{ "lang": "es", "permalink": "/blog/<slug>/" }],
  "description": "Meta description 150–160 car.",
  "excerpt": "Frase de entradilla.",
  "estado": "publicado",
  "datePublished": "2026-09-22",
  "dateModified": "2026-09-22",
  "author": "Albert Vilardell",
  "category": "Seguros | Naves Industriales | Obra Pública | Patologías Estructurales | Legal | ITE | Contrainforme | Perito/proceso",
  "tags": ["…", "…"],
  "image": { "url": "/assets/images/<img>.jpg", "alt": "…", "caption": "" },
  "relatedServices": [{ "title": "…", "url": "/<servicio>/" }],
  "content": "## Markdown del artículo…"
}
```

**Recomendaciones SEO por post** (para ganar rich results, según la auditoría):
- Incluye un bloque **FAQ** al final (2–3 preguntas). Cuando tu layout lo soporte, márcalo como `FAQPage` (microdata) para optar a resultados enriquecidos.
- Mantén el **tono pericial aséptico** (AGENTES §7): referencias normativas (LEC, CC, LOE, CTE, LCS, RSCIEI) e importes verificables; nada de "líderes", "excelencia" ni autopromoción.
- `datePublished` semanal (martes) según el calendario adjunto.

---

## 5. Anti-canibalización (regla de oro para el contenido)

Tienes tres webs. Para no competir contigo mismo, **cada intención vive en un sitio**:

| Intención | Sitio | Ejemplos de keyword |
|---|---|---|
| **Prueba / disputa / reclamación** | **perito.barcelona** | perito, informe pericial, dictamen, vicios ocultos, contrainforme, reclamar al seguro |
| **Ejecución: refuerzo CFRP** | **refuerzofibra.es** | refuerzo con fibra de carbono, refuerzo de forjados/vigas, aplicadores CFRP |
| **Ejecución: reparación / pavimentos** | **urbenis.com** | reparación de hormigón UNE-EN 1504, recalce, pavimento industrial (instalación) |
| **Ejecución: tratamiento de humedades** | **humedades.barcelona** | tratamiento de humedades, impermeabilización |

**Regla:** en perito.barcelona, cuando un artículo llega a la fase de "solución/reparación", **enlaza** al sitio hermano en vez de desarrollarla. Nunca crees en perito.barcelona páginas comerciales de "refuerzo fibra de carbono", "reparación de hormigón" o "instalación de pavimento": son de refuerzofibra.es / urbenis.com. Ver hoja **"Ruteo de sitios"** del calendario.

---

## 6. Checklist de verificación (una sola vez)

Antes de dar por cerrado el "manos libres", confirma en el repo:

- [ ] `keepalive.yml` añadido a `.github/workflows/` y `GH_PAT` vigente.
- [ ] El **sitemap** usa el filtro de publicados. Revisa `src/_generate/sitemap.njk`: debe iterar `postsPublished` (no `posts`), para no listar posts futuros. *(Detectado como pendiente de verificar en la auditoría.)*
- [ ] El **listado de blog legacy** `src/pages/es/blog/posts.njk` usa `pagination.data: posts` — es del árbol antiguo. El pipeline vivo es `src/blog/post.njk` (usa `postsPublished`, correcto). Si el árbol `pages/` sigue activo, alinéalo a `postsPublished` o elimínalo.
- [ ] Las **URLs de `relatedServices`** de cada post existen y responden 200 (la auditoría detectó que `/dictamenes/…` y `/asesoramiento/…` hacen soft-404; los servicios vivos son las rutas planas tipo `/vicios-ocultos/`, `/humedades-filtraciones/`, etc.).
- [ ] Prueba end-to-end: crea un post con `datePublished` = mañana, haz push, y verifica que **hoy no** aparece y **mañana** (tras el cron) **sí**.
