# Plausible · Embudo de formularios y fuga de leads

Instrumentación de `src/assets/js/vendor/pb-funnel.js` (+ el evento de
confirmación en `src/gracias.njk`). Mide el recorrido completo desde que un
formulario aparece en pantalla hasta que el lead se confirma, y — sobre todo —
**dónde se cae la gente por el camino**.

Complementa a `components/analytics.njk` (script de Plausible + propiedades
comunes) y a `docs/RUM-SXG.md` (Core Web Vitals). No duplica nada de los dos:
todos los eventos salen por `window.pbTrack()`, que ya mezcla las propiedades
comunes.

> **Migración desde GA4.** Este documento sustituye a `docs/GA4-FUNNEL.md`. Los
> nombres de evento y de propiedad se conservaron tal cual para no romper el
> histórico de nombres ni los partials, con **una excepción**: `generate_lead`
> desapareció (ver §2). Lo que cambió de raíz es la capa de configuración: ya no
> hay Consent Mode, ni banner de cookies, ni alta previa de dimensiones
> personalizadas.

---

## 0. Cómo está montado

Cargado desde `src/_includes/layouts/base.njk`, en el `<head>`:

```html
<script src="https://perito.barcelona/assets/js/vendor/pb-funnel.js" defer></script>
```

**Fichero externo y no partial en línea**, al contrario que `rum.njk`: la
instrumentación no usa ni una variable de plantilla, así que en línea eran
7,6 KB repetidos en cada una de las ~400 páginas del build. Como fichero suelto
es una petición diferida, cacheada un año (`_headers`, bloque
`/assets/js/vendor/*`) y compartida por todo el sitio.

**URL absoluta y `defer`**, por dos motivos que se refuerzan:

- absoluta, porque desde la caché de Google (`webpkgcache.com`) una ruta
  relativa apuntaría al host de la caché, no a nuestro origen; y porque el
  transform `inline-js` de `.eleventy.js` sólo captura rutas relativas, así que
  una absoluta se queda como petición externa, que es justo lo que se busca;
- `defer`, porque los scripts diferidos se ejecutan tras el parseo, o sea
  **después** de los scripts en línea del final del `<body>` — que es donde
  `analytics.njk` define `window.pbTrack`, del que esto depende. El orden queda
  garantizado sin acoplar nada.

El razonamiento largo de cada decisión de la instrumentación está en
`src/assets/js/vendor/pb-funnel.NOTAS.md`.

Coste: **8,5 KB** el fichero (una vez, cacheado), más 539 B en línea en
`/gracias/`.

### Proxy first-party

Ni el script de Plausible ni sus beacons salen a `plausible.io` desde el
navegador. Van por dos Pages Functions del propio dominio:

| Ruta | Function | Upstream |
|---|---|---|
| `/js/pb?id=<scriptId>` | `functions/js/pb.js` | `https://plausible.io/js/<scriptId>.js` |
| `/api/event` | `functions/api/event.js` | `https://plausible.io/api/event` |

Es el mismo patrón que tenían `/gtag/js` y `/g/collect` con GA4: esquiva a los
bloqueadores que filtran por hostname y deja todo same-origin. El endpoint se le
indica al script con `plausible.init({ endpoint: '/api/event' })`.

`functions/api/event.js` **tiene que** reenviar `X-Forwarded-For`
(← `CF-Connecting-IP`) y `User-Agent`: Plausible deriva el visitante de un hash
diario de sal + IP + UA. Sin esas dos cabeceras todo el tráfico colapsa en un
único visitante con la IP del centro de datos de Cloudflare.

### Sin consentimiento previo

Plausible no escribe cookies ni `localStorage`, no guarda identificador
persistente y no almacena la IP. Sin almacenamiento en el terminal no aplica el
art. 22.2 LSSI, así que no hay banner: `components/consent.njk` se eliminó junto
con GA4. **Consecuencia para leer el embudo:** el denominador ya no está sesgado
hacia quien aceptaba cookies. Las series anteriores y posteriores a la migración
no son comparables en volumen absoluto.

---

## 1. Propiedades comunes (las pone `pbTrack`, van en **todos** los eventos)

| Propiedad | Origen | Ejemplo |
|---|---|---|
| `brand` | fijo | `perito-barcelona` |
| `lang` | `<html lang>` | `es`, `ca`, `en` |
| `delivery` | `PerformanceNavigationTiming.deliveryType` | `navigational-prefetch` (SXG precargado), `cache`, `normal` |
| `is_sxg_cache` | hostname en `*.webpkgcache.com` | `true` / `false` (texto) |
| `hostname` | `location.hostname` | `perito.barcelona`, `perito-barcelona.webpkgcache.com` |
| `utm_source` `utm_medium` `utm_campaign` | query de entrada, persistidos en `sessionStorage.pb_utm` | `google` / `cpc` / `aluminosis-bcn` |

`page_path` **ya no es una propiedad**. Plausible indexa por URL y el pageview se
dispara a mano con la `url` ya normalizada (ver §7), así que la ruta se consulta
en la sección de páginas del panel, no como propiedad. Mantenerla habría gastado
un hueco de los 30 sin añadir nada.

`delivery` mezcla en `normal` dos cosas distintas: «vino por red» y «el navegador
no sabe decirlo» (Chrome expone `deliveryType` desde la 121). Tenerlo en cuenta al
leer el informe (c).

Límites de Plausible que afectan a esto: **30 propiedades por evento** (aquí van
5 + hasta 3 `utm_*`, sobra margen) y valores de cadena, número o booleano. Cada
combinación nombre=valor es una fila en el panel, de ahí que los valores se
recorten en origen.

---

## 2. Eventos

### Embudo de formulario

Todos llevan `form_id`. Ver el inventario en §3.

| Evento | Cuándo | Propiedades propias | Frecuencia |
|---|---|---|---|
| `form_view` | el formulario entra en viewport (`IntersectionObserver`, umbral 0,2) | `form_id` | 1 × página × formulario |
| `form_start` | primer `focusin` o `input` en cualquier campo | `form_id` | 1 × página × formulario |
| `form_field_complete` | `focusout` con valor no vacío y `checkValidity()` correcto | `form_id`, `field_name` | 1 × campo (no se repite al reeditar) |
| `form_error` | evento nativo `invalid` (captura) | `form_id`, `field_name`, `error_type` | sin límite |
| `form_abandon` | hubo `form_start` y no hubo envío, al ocultarse la pestaña | `form_id`, **`last_field`** | 1 × página × formulario |
| `form_submit` | envío (evento nativo `submit`, o `pbFormSubmit()` en los asistentes) | `form_id` | 1 × página × formulario |
| `lead_confirmed` | `/gracias/`, o respuesta OK sin redirección | `form_id` | 1 × página |

> **`generate_lead` ya no existe.** Se emitía junto a `form_submit`, con el mismo
> payload, porque en GA4 era un evento *recomendado* y eso le daba trato de
> conversión sin depender de un nombre propio. Plausible no tiene esa noción: la
> conversión es un objetivo que se define en el panel sobre cualquier nombre de
> evento, así que el duplicado sólo inflaba el recuento. **El objetivo se monta
> sobre `form_submit`** (§4).

`error_type` se deriva de `field.validity`:

| `validity` | `error_type` |
|---|---|
| `valueMissing` | `required` |
| `typeMismatch` | `type` |
| `patternMismatch` | `pattern` |
| `tooShort` / `tooLong` | `length` |
| resto | `invalid` |

`field_name` es `name` → `id` → `type`, recortado a 60 caracteres.
`last_field` es el último campo tocado (focus, input o blur); si no hubiera
ninguno, `(sin campo)`.

**Decisión deliberada:** al salir de un campo **vacío** no se emite nada. Tabular
por encima de un campo requerido sin escribir es comportamiento normal y llenaría
el informe de `error_type=required` falsos. Ese caso se captura de verdad al
intentar enviar (el navegador dispara `invalid` en todos los campos que bloquean
el submit) y, sobre todo, en `form_abandon` + `last_field`, que es la señal real de
fuga.

### Intención fuera del formulario

Un único listener delegado en `document`, pasivo.

| Evento | Disparador | Propiedades propias |
|---|---|---|
| `click_tel` | `a[href^="tel:"]` | `position` |
| `click_whatsapp` | enlace a `wa.me` o `api.whatsapp.com` | `position` |
| `click_email` | `a[href^="mailto:"]` | `position` |
| `cta_click` | clic dentro de `[data-cta-id]` | `cta_id`, `position` |
| `scroll_deep` | 75 % de scroll, **sólo en páginas de servicio** | `percent_scrolled` (siempre `75`) |

`position` sale del ancestro más cercano que encaje en
`[data-position], header, footer, nav, [role=banner], [role=contentinfo], [data-hero], .hero, .mobile-bottom-bar`:

| Valor | De dónde |
|---|---|
| `header` | `<header>`, `<nav>` o `role="banner"` |
| `hero` | `[data-hero]`, `.hero`, o `data-position="hero"` explícito |
| `footer` | `<footer>` o `role="contentinfo"` |
| `sticky-bar` | `.mobile-bottom-bar` (la barra fija «Llamar / Enviar email» de `base.njk`) |
| `body` | ningún ancestro reconocido |

`sticky-bar` es un quinto valor añadido a propósito: en móvil esa barra es la
fuente principal de `click_tel`, y meterla en el mismo cubo que el pie haría el
informe ilegible. Si en algún momento se prefiere consolidar, basta con agrupar
`sticky-bar` + `footer` al leer la tabla de propiedades.

`nav.njk` y `footer.njk` **no usan los landmarks** `<header>` / `<footer>`, sino
`<div>`. Se cubren con `nav` y con los roles ARIA, pero la forma limpia de afinar
esto —sin tocar `pb-funnel.js`— es añadir `data-position="header"` /
`data-position="footer"` a los contenedores de esos dos partials cuando el agente
que los posee los toque.

Criterio de «página de servicio» para `scroll_deep`: primero
`document.body.dataset.pageType === 'servicio'` (la marca correcta, hoy inexistente:
convendría añadirla en `base.njk`); si no está, la presencia de
`[itemtype$="/Service"]`, que **sólo** emite `layouts/service.njk` en su bloque de
microdatos. El sufijo importa: `ProfessionalService` del footer no termina en
`/Service`, así que no hay falsos positivos. No se usa una lista de rutas.

---

## 3. Inventario de `form_id`

| Partial | `form_id` | Marcado | Envío |
|---|---|---|---|
| `partials/form.njk` | `contacto-express` | `<form data-form-id>` | POST nativo → redirige a `/gracias/` |
| `partials/heroWithForm.njk` | `express-hero` | `<form id="express-form" data-form-id>` | `fetch`, panel de éxito en la misma página |
| `partials/formulario-contacto.njk` | `contactFormId` → `contactFormOrigin` → `contacto-wizard` | `div#typeform-wrapper[data-form-id]` | `fetch`, panel de éxito |
| `partials/contact-form.njk` | `contactFormId` → `contactFormOrigin` → `contacto-wizard-v2` | `div#typeform-wrapper[data-form-id]` | `fetch`, panel de éxito |
| `partials/form-colaborador.njk` | `colaborador` | `div[data-form-id]` (los campos los inyecta `intake-colaborador.js`) | `fetch` → redirige a `/gracias/` |

Los dos asistentes reutilizan `contactFormOrigin` cuando la página lo define, para
que el `form_id` de la analítica y el `origen` que llega al CRM sean **la misma
cadena** y se puedan cruzar sin tabla de equivalencias.

Cualquier `<form>` futuro sin `data-form-id` entra igualmente en el embudo con
`form.id` o, en último caso, `form-<índice>`. Poner el atributo es lo que hace que
el identificador sea estable entre despliegues.

### Ganchos para los asistentes sin `<form>`

`pb-funnel.js` expone dos globales, invocadas con una línea guardada dentro de la
rama que ya existía en cada partial:

```js
window.pbFormSubmit('mi-form');     // form_submit, idempotente
window.pbLeadConfirmed('mi-form');  // lead_confirmed, 1 vez por página
```

**Pendiente:** `src/assets/js/intake-colaborador.js` no dispara ningún `submit`
nativo. Hasta que se le añada
`window.pbFormSubmit && window.pbFormSubmit('colaborador')` en su rama de envío, el
formulario del colaborador aporta `form_view`, `form_start`,
`form_field_complete`, `form_error` y `form_abandon`, pero su `form_submit` no
existe; el lead sí se cuenta en `/gracias/`, adonde redirige.

---

## 4. Objetivos (goals) — **paso obligatorio**

Éste es el equivalente de los *key events* de GA4, y en Plausible **no es
opcional**: un evento personalizado que no tenga objetivo definido no aparece en
el panel. Los hits se reciben, pero no se muestran. Es el error clásico de la
migración.

`Site settings` → `Goals` → `+ Add goal` → `Custom event` → nombre exacto del
evento → `Add goal`.

El nombre tiene que coincidir **carácter por carácter**, mayúsculas incluidas.
Alta recomendada, en este orden de prioridad:

| Objetivo | Para qué |
|---|---|
| `form_submit` | La conversión principal. Es el que sustituye a `generate_lead`. |
| `lead_confirmed` | Conversión confirmada: mide la pérdida entre el envío y la página de gracias. |
| `form_view` | Primer escalón del embudo (a). |
| `form_start` | Segundo escalón del embudo (a). |
| `form_abandon` | El informe de la fuga (b). |
| `click_tel` | Conversión secundaria. |
| `form_error` | Diagnóstico de validación. |
| `form_field_complete` | Opcional: sólo si se quiere el embudo campo a campo. |
| `click_whatsapp`, `click_email`, `cta_click`, `scroll_deep` | Según interese. |

Con `click_tel` como objetivo, ojo al leer la tasa de conversión: una llamada y un
formulario no valen lo mismo. Conviene dejarlas separadas en vez de sumarlas.

### Lo que YA NO hay que hacer (y ahorra tiempo)

- **Nada de dar de alta dimensiones personalizadas.** GA4 exigía registrar las 15
  propiedades en `Definiciones personalizadas` antes de desplegar, sin efecto
  retroactivo. Plausible las ingiere sin alta previa: se consultan desglosando la
  conversión del objetivo en la sección de propiedades del panel.
- **Nada de Consent Mode ni de DebugView con banner aceptado.**

### Aviso: no activar la autocaptura de formularios

`plausible.init()` acepta `formSubmissions: true`, que captura los envíos **por su
cuenta**. Si se activa, cada envío se cuenta **dos veces** (el suyo y nuestro
`form_submit`) y el embudo queda inservible. Lo mismo con `outboundLinks: true`,
que solaparía con `click_tel` / `click_email` / `click_whatsapp`.
`autoCapturePageviews` **sí** está desactivado a propósito (§7): el pageview lo
dispara `analytics.njk` con la URL normalizada.

Si algún día se activa alguna autocaptura, esos eventos **no** pasarán por
`pbTrack` y por tanto no llevarán las propiedades comunes: habría que pasar a
configurar `customProperties` en `plausible.init()` (ver la nota en
`components/analytics.njk`).

---

## 5. Los tres informes

El volumen de un sitio de servicios profesionales es bajo: poner siempre un rango
de fechas amplio, con 7 días no se ve nada.

### (a) Embudo `form_view → form_start → form_submit`

Es el informe que responde «¿en qué escalón se pierde la gente?».

**Requiere plan Business** (el análisis de embudos no está en el plan Growth). Si
no se tiene, el sustituto razonable es comparar los recuentos de los cuatro
objetivos en la sección de conversiones y calcular los ratios a mano.

1. `Site settings` → `Funnels` → `Add funnel`.
2. Cuatro pasos (mínimo 2, máximo 8), en este orden:
   - Paso 1 · `form_view`
   - Paso 2 · `form_start`
   - Paso 3 · `form_submit`
   - Paso 4 · `lead_confirmed` (mide la pérdida entre el envío y la página de
     gracias: errores de red, Turnstile, rebotes de la Function)
3. Dejar **activada** `Allow other activity in between funnel steps`, que es el
   modo secuencial por defecto. Con el modo estricto, cualquier evento
   intermedio —un `form_error`, un `click_tel`— rompería el paso y el informe
   mentiría.
4. Guardar. El embudo aparece en el panel.

**Desglose por formulario.** Plausible no tiene el «desglose» de GA4 dentro del
embudo. Para ver un formulario concreto hay dos caminos:
- filtrar el panel por la propiedad `form_id` y volver a abrir el embudo; o
- crear un embudo por formulario usando objetivos filtrados por propiedad
  (`form_submit` con `form_id = contacto-express`), que es lo que Plausible llama
  *property-filtered goals*.

Lectura: la caída `form_view → form_start` es un problema de propuesta o de
diseño (el formulario no invita); la caída `form_start → form_submit` es fricción
dentro del formulario, y ahí se pasa al informe (b).

### (b) `form_abandon` por `last_field`

El informe de la fuga: qué campo es el que hace que la gente se vaya. No necesita
plan Business.

1. En el panel, sección de conversiones (`Goal conversions`), pulsar
   **`form_abandon`**.
2. Se abre el desglose de propiedades de ese objetivo: elegir **`last_field`**.
   Ordenado por recuento descendente, ésa es la tabla de la fuga.
3. Cambiar la propiedad a **`form_id`** para saber en qué formulario pasa.
4. Para cruzarlo con la validación: volver atrás, abrir **`form_error`** y mirar
   `field_name` y `error_type`. Si el campo que provoca el abandono es el mismo
   que estaba dando error, el problema es la validación, no el campo.

Lectura típica: si `last_field` = `telefono` domina, el teléfono obligatorio está
costando leads; si domina `privacidad`, el problema es el checkbox legal o su
posición; si domina el primer campo, el formulario no se entiende antes de
empezarlo.

### (c) Conversión por `delivery` (¿convierte mejor el tráfico SXG?)

1. Filtrar el panel por propiedad: `delivery = navigational-prefetch`. Anotar
   visitantes y las conversiones de `form_submit` y `click_tel`.
2. Repetir con `delivery = normal`.
3. La tasa se calcula fuera: Plausible no hace columnas derivadas.

Advertencias al interpretar:

- `navigational-prefetch` sólo aparece en Chrome ≥ 121 y sólo en visitas que
  vienen de la SERP con el SXG ya precargado: **es una submuestra sesgada hacia
  Google orgánico**. Comparar contra `normal` mezcla fuentes; conviene añadir al
  filtro la fuente = `Google` o `utm_medium` orgánico.
- `normal` incluye «vino por red» y «el navegador no lo sabe decir».
- Cruzar este informe con `docs/RUM-SXG.md`: si el SXG mejora LCP pero no la
  conversión, el cuello de botella no es la velocidad.

---

## 6. La caché SXG y el `hostname`

Cuando Chrome sirve la página desde el Signed Exchange precargado, el documento
vive en `perito-barcelona.webpkgcache.com`, **no** en `perito.barcelona`. Con
Plausible eso afecta a menos cosas que con GA4, porque no hay cookie de sesión
que romper:

1. **La sesión sí sobrevive.** Plausible identifica al visitante por un hash de
   sal diaria + IP + User-Agent, y las tres cosas son idénticas en los dos
   orígenes. No hay auto-referral ni sesión partida, así que no hace falta nada
   parecido al `linker: { domains: [...] }` que necesitaba GA4 (esa opción
   desapareció con la migración, y con ella la lista de referencias no deseadas).
2. **La URL sí se partiría en dos filas**, porque desde la caché el pathname es
   `/doc/-/s/perito.barcelona/servicios/x/`. Por eso `analytics.njk` desactiva
   `autoCapturePageviews` y dispara el pageview a mano con la `url` normalizada.
   **Si alguien reactiva la captura automática, las páginas se duplican en el
   panel.**
3. **`hostname` llega como `…webpkgcache.com`.** Es una propiedad precisamente
   para poder aislar ese tráfico: filtro por `is_sxg_cache = true` / `false`
   (llega como texto) o por `hostname`.
4. **El almacenamiento del navegador NO cruza.** El origen es distinto, así que
   tiene su propio `sessionStorage`: la persistencia de UTM y la clave `pb_form`
   no pasan de `webpkgcache.com` a `perito.barcelona`. Un lead que empieza en la
   caché y acaba en `/gracias/` del dominio real llega con
   `form_id = desconocido`. Es una limitación del transporte, no un fallo del
   código.

---

## 7. Comprobación tras el despliegue

No hay DebugView. La comprobación se hace con la consola, la pestaña de red y el
panel en tiempo real:

1. **Que el script carga:** pestaña de red → `/js/pb?id=pa-…` debe devolver
   **200** y `content-type: application/javascript`. Un **400** significa que el
   `id` no encaja con el formato que valida `functions/js/pb.js`; comprobar
   `site.plausibleScriptId` en `src/_data/metadata.json`.
2. **Que los eventos salen:** filtrar la red por `event`. Cada evento es un POST
   a `/api/event` con respuesta **202**. Si aparecen peticiones a
   `plausible.io`, el `endpoint` de `plausible.init()` no se está aplicando.
3. **Trazas en consola:** añadir temporalmente `logging: true` a la llamada de
   `plausible.init()` en `components/analytics.njk`. En `localhost` hace falta
   además `captureOnLocalhost: true`, o el script no manda nada (y lo dice por
   consola).
4. **Recorrido funcional:** cargar una página con formulario (`form_view`), tocar
   un campo (`form_start`), rellenar uno bien (`form_field_complete`), dejar otro
   mal (`form_error`), cambiar de pestaña sin enviar (`form_abandon` con
   `last_field`), volver, enviar (`form_submit`) y llegar a `/gracias/`
   (`lead_confirmed` con el `form_id` correcto).
5. Bajar al 75 % de una página de servicio (`scroll_deep`) y pulsar el teléfono de
   la barra móvil (`click_tel` con `position = sticky-bar`).
6. **En el cuerpo de cada POST**, verificar que `props` trae `form_id`, `lang` y
   `delivery`. Si `props` viene vacío o sin las comunes, `pbTrack` no está
   definido: falta el include de §0.
7. **En el panel**, los eventos sólo se ven si tienen objetivo dado de alta (§4).
   Si el POST devuelve 202 pero el panel no muestra nada, es eso, casi siempre.
