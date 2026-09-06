# RUM de Core Web Vitals segmentado por tipo de entrega

Mide LCP, INP, CLS, FCP y TTFB de visitantes reales y **separa las páginas que
Chrome precarga desde la SERP como Signed Exchange de la navegación normal**.
Sin esa separación el p75 mezcla los dos caminos y no dice nada: es la pregunta
que justifica todo el montaje del SXG.

Sin cookies, sin identificador de usuario, sin IP almacenada. Datos técnicos
anónimos: no requiere consentimiento (RGPD art. 6.1.f).

---

## Piezas

| Fichero | Qué hace |
|---|---|
| `src/assets/js/vendor/web-vitals.js` | Librería oficial (build IIFE), vendorizada. Se refresca con `npm run vendor:web-vitals`. |
| `src/_includes/components/rum.njk` | El pegamento, ~1,7 KB en línea: dimensiones, acumulación y `sendBeacon`. |
| `src/_includes/layouts/base.njk` | Carga la librería con `defer` y URL absoluta; incluye el partial. |
| `functions/api/rum.js` | Endpoint. Valida, limita por IP y escribe en Analytics Engine. |
| `src/_headers` | CORP `cross-origin` para la librería (obligatorio con el COEP de los HTML). |
| `wrangler.toml` | Binding `RUM` → dataset `rum_pb`. **Leer su cabecera antes de subirlo.** |
| `.eleventy.js` | `addPassthroughCopy` de `src/assets/js/vendor` (el único JS que no se inlinea). |

### Por qué la librería va aparte y por URL absoluta

El transform `inline-js` de `.eleventy.js` incrusta en el HTML todo lo que
cuelgue de `/assets/js/`. Con web-vitals eso serían 9 KB en cada página de un
sitio cuya regla §5.6 es «zero-JS cliente». Referenciarla por URL absoluta
(`https://perito.barcelona/assets/js/vendor/web-vitals.js`) consigue dos cosas
a la vez: el transform no la toca —su regex sólo captura rutas relativas— y,
servida desde `webpkgcache.com`, apunta a nuestro origen y no al de la caché.

`defer` y no `async`: así se ejecuta antes de `DOMContentLoaded` y los
observers de INP se registran a tiempo. No bloquea el parseo ni entra en la
ruta crítica del LCP.

---

## Esquema del dataset `rum_pb`

**El orden importa**: las consultas van por `blobN`, no por nombre.

| Columna | Contenido |
|---|---|
| `blob1` | `metric` — LCP · INP · CLS · FCP · TTFB |
| `blob2` | `delivery` — `navigational-prefetch` · `cache` · `normal` |
| `blob3` | `path` — normalizado (sin el prefijo `/doc/-/s/…` de la caché) |
| `blob4` | `lang` — es · ca · en |
| `blob5` | `connection` — 4g · 3g · slow-2g · unknown |
| `blob6` | `fromGoogle` — `'1'` si el referrer es un dominio de Google |
| `blob7` | `isSXGCache` — `'1'` si la página corre en `*.webpkgcache.com` |
| `blob8` | `rating` — good · needs-improvement · poor (umbrales estándar) |
| `double1` | `value` — ms, salvo CLS que es adimensional |
| `double2` | `ua_mobile` — 1 · 0 |
| `index1` | `metric` — clave de muestreo |

`index1` es la clave de **muestreo** de Analytics Engine, así que tiene que ser
de cardinalidad baja. Con cinco valores el muestreo reparte bien; poner ahí
`path` haría que las rutas de cola larga desaparecieran del muestreo.

`delivery` sale de `PerformanceNavigationTiming.deliveryType`, que Chrome
expone desde la 121. En navegadores sin soporte queda `normal`, así que **el
cubo `normal` incluye tanto «llegó por red» como «el navegador no sabe
decirlo»**. Para aislar el SXG con certeza, cruza con `isSXGCache`.

---

## Consultas

Endpoint: `POST https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/analytics_engine/sql`
con `Authorization: Bearer <TOKEN>` y el SQL en el cuerpo, en texto plano.

El token necesita el permiso **Account · Account Analytics · Read**
(Dashboard → My Profile → API Tokens → Create Token → Custom).

`quantileExactWeighted(0.75)(double1, _sample_interval)` es el p75 corregido por
muestreo. **Usa siempre la variante ponderada**: Analytics Engine muestrea
cuando hay volumen, y un `quantile` a secas daría un p75 sesgado hacia el
tráfico de las horas punta.

### 1. La pregunta de fondo — p75 de LCP y TTFB por tipo de entrega (7 días)

```sql
SELECT
    blob1 AS metric,
    blob2 AS delivery,
    blob7 AS is_sxg_cache,
    quantileExactWeighted(0.75)(double1, _sample_interval) AS p75,
    sum(_sample_interval)                                  AS muestras
FROM rum_pb
WHERE timestamp > NOW() - INTERVAL '7' DAY
  AND blob1 IN ('LCP', 'TTFB')
GROUP BY metric, delivery, is_sxg_cache
HAVING muestras > 30
ORDER BY metric, p75
```

`HAVING muestras > 30` no es cosmético: sin él, un cubo con cuatro visitas
enseña un p75 que parece un hallazgo y es ruido.

### 2. ¿Convierte el prefetch de la SERP? — sólo tráfico de Google (28 días)

```sql
SELECT
    blob2 AS delivery,
    blob1 AS metric,
    quantileExactWeighted(0.50)(double1, _sample_interval) AS p50,
    quantileExactWeighted(0.75)(double1, _sample_interval) AS p75,
    quantileExactWeighted(0.95)(double1, _sample_interval) AS p95,
    sum(_sample_interval)                                  AS muestras
FROM rum_pb
WHERE timestamp > NOW() - INTERVAL '28' DAY
  AND blob6 = '1'
GROUP BY delivery, metric
ORDER BY metric, delivery
```

### 3. Qué páginas van peor, y si el SXG las salva (7 días, sólo móvil)

```sql
SELECT
    blob3 AS path,
    blob2 AS delivery,
    quantileExactWeighted(0.75)(double1, _sample_interval) AS p75_lcp,
    sum(_sample_interval)                                  AS muestras
FROM rum_pb
WHERE timestamp > NOW() - INTERVAL '7' DAY
  AND blob1 = 'LCP'
  AND double2 = 1
GROUP BY path, delivery
HAVING muestras > 20
ORDER BY p75_lcp DESC
LIMIT 40
```

### 4. Reparto good / needs-improvement / poor por entrega (28 días)

Es lo que mira Search Console, así que es lo que conviene vigilar.

```sql
SELECT
    blob1 AS metric,
    blob2 AS delivery,
    blob8 AS rating,
    sum(_sample_interval) AS muestras
FROM rum_pb
WHERE timestamp > NOW() - INTERVAL '28' DAY
GROUP BY metric, delivery, rating
ORDER BY metric, delivery, rating
```

### curl

```bash
ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CF_ANALYTICS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/analytics_engine/sql" \
  -H "Authorization: Bearer $CF_ANALYTICS_TOKEN" \
  --data "SELECT blob1 AS metric, blob2 AS delivery,
                 quantileExactWeighted(0.75)(double1, _sample_interval) AS p75,
                 sum(_sample_interval) AS muestras
          FROM rum_pb
          WHERE timestamp > NOW() - INTERVAL '7' DAY AND blob1 IN ('LCP','TTFB')
          GROUP BY metric, delivery
          HAVING muestras > 30
          ORDER BY metric, p75" | jq .
```

En PowerShell, `--data` con saltos de línea da problemas: mete el SQL en una
sola línea o usa `--data-binary "@consulta.sql"`.

---

## Despliegue

1. **Binding.** Una de las dos vías:
   - `wrangler.toml` (ya incluido) — **lee su cabecera primero**: crear ese
     fichero hace que Pages ignore la configuración del panel.
   - O bien a mano, sin `wrangler.toml`:
     Pages → perito-barcelona → Settings → Functions → Analytics Engine
     bindings → *Variable name* `RUM`, *Dataset* `rum_pb`.
2. **Despliega** como siempre. El dataset se crea solo con el primer
   `writeDataPoint`; no hay que darlo de alta.
3. **Comprueba** con la consulta 1. Los datos tardan unos segundos en ser
   consultables.

No hace falta tocar el pipeline de SXG ni el GitHub Action de firma: la
librería es un asset estático más y el endpoint es una Function, que el
`_middleware.js` ya deja pasar (sólo intercepta HTML).

---

## Probar en local

```bash
npm run build
npx wrangler pages dev dist --binding RUM_FAKE=1
```

`wrangler pages dev` **no emula Analytics Engine**: `env.RUM` no existe y el
endpoint descarta los beacons en silencio (por diseño: un preview sin dataset
no debe devolver errores). Para ver que el beacon llega y valida, añade
temporalmente al final de `functions/api/rum.js`, antes del `return`:

```js
console.log('[rum]', dim.delivery, dim.path, metricas.map((m) => m.nombre + '=' + m.valor));
```

y míralo en la consola de `wrangler pages dev`.

Con binding real:

```bash
npx wrangler pages dev dist --ae-dataset RUM=rum_pb   # requiere sesión iniciada
```

### Verificación en producción

**Criterio de aceptación**: desde una SERP de Google en Chrome Android, el
evento tiene que llegar con `delivery = 'navigational-prefetch'` o
`isSXGCache = '1'`; en navegación directa, con `delivery = 'normal'`.

1. **Navegación normal.** Abre perito.barcelona, cambia de pestaña (eso dispara
   el envío) y comprueba en DevTools → Network que hay un POST a `/api/rum` con
   204. En el cuerpo, `"delivery":"normal"`.
2. **Desde la SERP.** En Chrome Android, busca algo que posicione y pulsa el
   resultado. Si Google sirvió el SXG, la barra de direcciones muestra
   perito.barcelona pero el documento viene de la caché. Consulta:

   ```sql
   SELECT blob2 AS delivery, blob7 AS is_sxg_cache, blob3 AS path,
          sum(_sample_interval) AS muestras
   FROM rum_pb
   WHERE timestamp > NOW() - INTERVAL '1' HOUR
   GROUP BY delivery, is_sxg_cache, path
   ```

   Para forzarlo sin esperar a posicionar, abre
   `https://webpkgcache.com/doc/-/s/perito.barcelona/` en Chrome: llegará con
   `isSXGCache = '1'`.

3. **Que no penaliza.** Lighthouse móvil antes y después: el LCP no debe
   moverse. La librería va con `defer` fuera de la ruta crítica y el pegamento
   no toca el DOM ni registra listeners costosos —sólo `visibilitychange` y
   `pagehide`, ambos en captura y sin trabajo dentro hasta que la página se
   oculta—.

---

## Límites conocidos

- **`deliveryType` es de Chromium.** Safari y Firefox caen a `normal`. Como el
  SXG sólo lo consume Chrome, para la pregunta que importa da igual, pero no
  interpretes `normal` como «vino por red».
- **Analytics Engine muestrea** con volumen. De ahí `_sample_interval` en todas
  las agregaciones.
- **Retención de 90 días.** Para series más largas hay que exportar.
- **Un beacon por vida de página.** Si el navegador mata la pestaña sin disparar
  `visibilitychange` ni `pagehide` (cierre forzado, OOM en Android), esa visita
  se pierde. Es la limitación estándar de cualquier RUM.
- **El rate limiting es por isolate**, no global: el techo real son 60 beacons
  por IP y minuto *por isolate*. Contiene bucles, no ataques; para eso está
  Cloudflare delante.
