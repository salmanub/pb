# GA4 · Embudo de formularios y fuga de leads

Instrumentación de `src/assets/js/vendor/ga-funnel.js` (+ el evento de
confirmación en `src/gracias.njk`). Mide el recorrido completo desde que un
formulario aparece en pantalla hasta que el lead se confirma, y — sobre todo —
**dónde se cae la gente por el camino**.

Complementa a `components/analytics.njk` (GA4 + Consent Mode v2 + dimensiones
comunes) y a `docs/RUM-SXG.md` (Core Web Vitals). No duplica nada de los dos:
todos los eventos salen por `window.pbTrack()`, que ya mezcla las dimensiones
comunes.

---

## 0. Cómo está montado

Cargado desde `src/_includes/layouts/base.njk`, en el `<head>`:

```html
<script src="https://perito.barcelona/assets/js/vendor/ga-funnel.js" defer></script>
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
`src/assets/js/vendor/ga-funnel.NOTAS.md`.

Coste: **8,5 KB** el fichero (una vez, cacheado), más 539 B en línea en
`/gracias/`.

---

## 1. Dimensiones comunes (las pone `pbTrack`, van en **todos** los eventos)

| Parámetro | Origen | Ejemplo |
|---|---|---|
| `brand` | fijo | `perito-barcelona` |
| `page_path` | pathname normalizado (quita el prefijo `/doc/-/s/perito.barcelona` de la caché SXG) | `/servicios/grietas-estructurales/` |
| `lang` | `<html lang>` | `es`, `ca`, `en` |
| `delivery` | `PerformanceNavigationTiming.deliveryType` | `navigational-prefetch` (SXG precargado), `cache`, `normal` |
| `is_sxg_cache` | hostname en `*.webpkgcache.com` | `true` / `false` |
| `hostname` | `location.hostname` | `perito.barcelona`, `perito-barcelona.webpkgcache.com` |
| `utm_source` `utm_medium` `utm_campaign` | query de entrada, persistidos en `sessionStorage.pb_utm` | `google` / `cpc` / `aluminosis-bcn` |

`delivery` mezcla en `normal` dos cosas distintas: «vino por red» y «el navegador
no sabe decirlo» (Chrome expone `deliveryType` desde la 121). Tenerlo en cuenta al
leer el informe (c).

---

## 2. Eventos

### Embudo de formulario

Todos llevan `form_id`. Ver el inventario en §3.

| Evento | Cuándo | Parámetros propios | Frecuencia |
|---|---|---|---|
| `form_view` | el formulario entra en viewport (`IntersectionObserver`, umbral 0,2) | `form_id` | 1 × página × formulario |
| `form_start` | primer `focusin` o `input` en cualquier campo | `form_id` | 1 × página × formulario |
| `form_field_complete` | `focusout` con valor no vacío y `checkValidity()` correcto | `form_id`, `field_name` | 1 × campo (no se repite al reeditar) |
| `form_error` | evento nativo `invalid` (captura) | `form_id`, `field_name`, `error_type` | sin límite |
| `form_abandon` | hubo `form_start` y no hubo envío, al ocultarse la pestaña | `form_id`, **`last_field`** | 1 × página × formulario |
| `form_submit` | envío (evento nativo `submit`, o `pbFormSubmit()` en los asistentes) | `form_id` | 1 × página × formulario |
| `generate_lead` | junto a `form_submit` (evento recomendado de GA4) | `form_id` | idem |
| `lead_confirmed` | `/gracias/`, o respuesta OK sin redirección | `form_id` | 1 × página |

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

| Evento | Disparador | Parámetros propios |
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
`sticky-bar` + `footer` en la exploración.

`nav.njk` y `footer.njk` **no usan los landmarks** `<header>` / `<footer>`, sino
`<div>`. Se cubren con `nav` y con los roles ARIA, pero la forma limpia de afinar
esto —sin tocar `ga-funnel.js`— es añadir `data-position="header"` /
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
que el `form_id` de GA4 y el `origen` que llega al CRM sean **la misma cadena** y se
puedan cruzar sin tabla de equivalencias.

Cualquier `<form>` futuro sin `data-form-id` entra igualmente en el embudo con
`form.id` o, en último caso, `form-<índice>`. Poner el atributo es lo que hace que
el identificador sea estable entre despliegues.

### Ganchos para los asistentes sin `<form>`

`ga-funnel.js` expone dos globales, invocadas con una línea guardada dentro de la
rama que ya existía en cada partial:

```js
window.pbFormSubmit('mi-form');     // form_submit + generate_lead, idempotente
window.pbLeadConfirmed('mi-form');  // lead_confirmed, 1 vez por página
```

**Pendiente:** `src/assets/js/intake-colaborador.js` (fuera del alcance de este
cambio) no dispara ningún `submit` nativo. Hasta que se le añada
`window.pbFormSubmit && window.pbFormSubmit('colaborador')` en su rama de envío, el
formulario del colaborador aporta `form_view`, `form_start`,
`form_field_complete`, `form_error` y `form_abandon`, pero su `form_submit` /
`generate_lead` no existen; el lead sí se cuenta en `/gracias/`, adonde redirige.

---

## 4. Key events (antes «conversiones»)

Marcar **`form_submit`** y **`click_tel`**.

`Admin` → `Visualización de datos` → `Eventos` → localizar el evento en la tabla →
activar el interruptor **`Marcar como evento clave`** de la última columna.

Un evento personalizado sólo aparece en esa lista **después** de haberse recibido
(hasta 24 h). Para no esperar: `Admin` → `Eventos clave` → `Nuevo evento clave` →
escribir el nombre exacto (`form_submit`, `click_tel`) y guardar. Al llegar el
primer evento con ese nombre queda enlazado.

`generate_lead` es un evento **recomendado** de GA4 y se envía junto a
`form_submit` precisamente para que quede disponible como conversión en Google Ads
sin depender del nombre propio. No hace falta marcarlo también como key event
salvo que se quiera duplicar la métrica.

Con `click_tel` como key event, ojo al leer la tasa de conversión de la sesión:
una llamada y un formulario no valen lo mismo. Se recomienda dejarlas separadas en
los informes en vez de sumarlas.

---

## 5. Dimensiones personalizadas (Admin → Definiciones personalizadas)

**Sin dar de alta estos parámetros no aparecen en ninguna exploración.** Es el
error clásico: los eventos llegan, los datos están en el hit, pero los informes no
los ofrecen. GA4 sólo empieza a recogerlos **a partir del alta**; no hay efecto
retroactivo, así que conviene hacerlo antes de desplegar.

`Admin` → `Definiciones personalizadas` → `Dimensiones personalizadas` →
`Crear dimensiones personalizadas`, y para cada fila:
*Nombre de la dimensión* (libre) · *Ámbito* = **Evento** · *Parámetro del evento* =
el nombre exacto de la columna.

| Parámetro del evento | Nombre sugerido | Ámbito | Para qué |
|---|---|---|---|
| `form_id` | Formulario | Evento | Desglose de todo el embudo |
| `field_name` | Campo | Evento | `form_field_complete` y `form_error` |
| `error_type` | Tipo de error | Evento | `form_error` |
| `last_field` | Último campo | Evento | **Informe (b): la fuga** |
| `cta_id` | CTA | Evento | `cta_click` |
| `position` | Posición | Evento | `click_tel`, `click_whatsapp`, `click_email`, `cta_click` |
| `delivery` | Tipo de entrega | Evento | **Informe (c): SXG vs normal** |
| `is_sxg_cache` | Caché SXG | Evento | Filtrar/aislar `webpkgcache.com` (llega como texto `true` / `false`) |
| `page_path` | Ruta normalizada | Evento | Sustituye a la ruta nativa (ver §7) |
| `lang` | Idioma | Evento | `es` / `ca` / `en` |
| `brand` | Marca | Evento | Preparado para consolidar varios dominios en una propiedad |
| `hostname` | Hostname del evento | Evento | Diagnóstico SXG |
| `utm_source` | UTM source | Evento | Atribución persistida en la sesión |
| `utm_medium` | UTM medium | Evento | idem |
| `utm_campaign` | UTM campaign | Evento | idem |

Son 15 de las 50 dimensiones de ámbito de evento del plan estándar: hay margen.

`percent_scrolled` **no hay que darlo de alta**: GA4 ya trae la dimensión
predefinida *Porcentaje desplazado* asociada a ese parámetro.

`brand`, `lang`, `utm_*` y `hostname` son opcionales si sólo se va a mirar este
dominio; el resto son imprescindibles para los tres informes de §6.

### Aviso importante: desactivar «Interacciones con formularios»

La medición mejorada de GA4 recoge **por su cuenta** eventos llamados `form_start`
y `form_submit`, con sus propios parámetros (`form_id` = atributo `id` del HTML,
`form_name`, `form_destination`, `form_submit_text`). Si se deja activa, cada envío
se cuenta **dos veces** y el parámetro `form_id` mezcla dos esquemas distintos —los
`id` del DOM con nuestros identificadores— y el embudo queda inservible.

`Admin` → `Flujos de datos` → el flujo web → `Medición mejorada` (rueda dentada) →
desmarcar **`Interacciones con formularios`**. El resto (scroll al 90 %, clics
salientes, búsqueda interna) puede quedarse: no colisiona con `scroll_deep`, que es
un nombre propio al 75 %.

---

## 6. Los tres informes

Todos en `Explorar` → `Crear una exploración`. Poner un rango de fechas amplio: el
volumen de un sitio de servicios profesionales es bajo y con 7 días no se ve nada.

### (a) Embudo `form_view → form_start → form_submit` por `form_id`

Es el informe que responde «¿qué formulario pierde gente, y en qué escalón?».

1. `Explorar` → plantilla **`Exploración de embudo`**.
2. `Pasos` → icono del lápiz → borrar los pasos de ejemplo y crear cuatro:
   - Paso 1 · *Ve el formulario* → `Evento` `form_view`
   - Paso 2 · *Empieza* → `Evento` `form_start`
   - Paso 3 · *Envía* → `Evento` `form_submit`
   - Paso 4 · *Lead confirmado* → `Evento` `lead_confirmed` (opcional, mide la
     pérdida entre el envío y la página de gracias: errores de red, Turnstile,
     rebotes de la Function)
3. En cada paso, `Es indirectamente seguido por` (embudo abierto). Con
   `directamente seguido por` cualquier evento intermedio —un `form_error`, un
   `click_tel`— rompería el paso y el informe mentiría.
4. `Mostrar embudo abierto` → **desactivado** (sólo cuentan quienes empezaron por
   el paso 1).
5. `Desglose` → arrastrar la dimensión **`Formulario`** (`form_id`).
   `Filas de desglose` = 10.
6. `Tipo de embudo` = *Estándar*. Activar `Mostrar tiempo transcurrido` para ver
   cuánto tardan en rellenarlo.

Lectura: la caída `form_view → form_start` es un problema de propuesta o de
diseño (el formulario no invita); la caída `form_start → form_submit` es fricción
dentro del formulario, y ahí se pasa al informe (b).

### (b) `form_abandon` por `last_field`

El informe de la fuga: qué campo es el que hace que la gente se vaya.

1. `Explorar` → plantilla **`Formato libre`**.
2. `Segmentos`/`Filtros`: en la pestaña de configuración, `Filtros` →
   `Nombre del evento` `exactamente` `form_abandon`.
3. `Filas` → **`Último campo`** (`last_field`); segunda fila → **`Formulario`**
   (`form_id`).
4. `Valores` → `Recuento de eventos`.
5. `Tipo de visualización` = tabla; ordenar por recuento descendente.
6. Añadir una segunda pestaña con `Filas` = **`Campo`** (`field_name`) y
   **`Tipo de error`** (`error_type`), filtrando por `form_error`: cruzar las dos
   tablas dice si el campo que provoca el abandono es el mismo que estaba dando
   error de validación.

Lectura típica: si `last_field` = `telefono` domina, el teléfono obligatorio está
costando leads; si domina `privacidad`, el problema es el checkbox legal o su
posición; si domina el primer campo, el formulario no se entiende antes de
empezarlo.

### (c) Conversión por `delivery` (¿convierte mejor el tráfico SXG?)

1. `Explorar` → **`Formato libre`**.
2. `Filas` → **`Tipo de entrega`** (`delivery`).
3. `Columnas` → `Nombre del evento`.
4. `Valores` → `Recuento de eventos`.
5. `Filtros` → `Nombre del evento` `coincide con la expresión regular`
   `^(form_view|form_start|form_submit|lead_confirmed|click_tel)$`.
6. Segunda pestaña, para la tasa por sesión: `Filas` = `Tipo de entrega`,
   `Valores` = `Sesiones` + `Sesiones con interacción` + `Recuento de eventos` de
   `form_submit`; la tasa se calcula fuera, GA4 no hace columnas derivadas en las
   exploraciones.
7. Comparativa alternativa, más limpia: en `Segmentos` crear dos segmentos de
   sesión, `delivery = navigational-prefetch` y `delivery = normal`, y arrastrarlos
   a `Comparaciones`.

Advertencias al interpretar:
- `navigational-prefetch` sólo aparece en Chrome ≥ 121 y sólo en visitas que
  vienen de la SERP con el SXG ya precargado: **es una submuestra sesgada hacia
  Google orgánico**. Comparar contra `normal` mezcla fuentes; conviene filtrar
  además por `utm_medium`/`Fuente de la sesión` = orgánico.
- `normal` incluye «vino por red» y «el navegador no lo sabe decir».
- Cruzar este informe con `docs/RUM-SXG.md`: si el SXG mejora LCP pero no la
  conversión, el cuello de botella no es la velocidad.

---

## 7. La caché SXG y el `hostname`

Cuando Chrome sirve la página desde el Signed Exchange precargado, el documento
vive en `perito-barcelona.webpkgcache.com`, **no** en `perito.barcelona`. Eso
afecta a tres cosas:

1. **`hostname`** llega como `…webpkgcache.com`, y la dimensión predefinida
   *Nombre de host* de GA4 también.
2. **La ruta nativa** de GA4 (*Ruta de página + clase de pantalla*, derivada de
   `page_location`) llega como `/doc/-/s/perito.barcelona/servicios/x/`. La misma
   página aparecería partida en dos filas.
3. El origen es distinto, así que tiene su propio `localStorage` /
   `sessionStorage`: la persistencia de UTM y la clave `pb_form` **no cruzan**
   entre `webpkgcache.com` y `perito.barcelona`. Un lead que empieza en la caché y
   acaba en `/gracias/` del dominio real llega con `form_id = desconocido`. Es una
   limitación del transporte, no un fallo del código.

Cómo se resuelve, por orden de preferencia:

- **Unificar: usar siempre `page_path`, nunca la ruta nativa.** `analytics.njk` ya
  normaliza el pathname quitando el prefijo `/doc/-/s/<dominio>`. En todas las
  exploraciones de este documento, la dimensión de página debe ser la
  personalizada **`Ruta normalizada`** (`page_path`), no *Ruta de página*. Con eso
  las dos entregas se suman en la misma fila.
- **Aislar cuando interese:** filtro `Caché SXG` (`is_sxg_cache`) `exactamente`
  `true` o `false`. Llega como texto, no como booleano.
- **Excluir del todo** (no recomendado, se pierde tráfico real): filtro
  `is_sxg_cache = false`, o `Nombre de host` `no contiene` `webpkgcache.com`.
- **No** usar un filtro de datos de exclusión interna a nivel de propiedad para
  esto: eliminaría los eventos de forma irreversible.

`analytics.njk` ya declara `linker: { domains: ['perito.barcelona',
'webpkgcache.com'] }`, de modo que la sesión no se rompe al pasar de la caché al
dominio real y `webpkgcache.com` no aparece como *referral* propio. Si en el
informe de adquisición apareciera igualmente, añadirlo en
`Admin` → `Flujos de datos` → el flujo → `Configurar los ajustes de la etiqueta` →
`Lista de referencias no deseadas`.

---

## 8. Comprobación tras el despliegue

1. `Admin` → `DebugView`, con la extensión *Google Analytics Debugger* o
   `?debug_mode=1` en la URL.
2. Aceptar el banner de cookies (con consentimiento denegado los eventos llegan
   igual, como pings sin `client_id`, pero cuesta más seguirlos en DebugView).
3. Recorrer: cargar una página con formulario (`form_view`), tocar un campo
   (`form_start`), rellenar uno bien (`form_field_complete`), dejar otro mal
   (`form_error`), cambiar de pestaña sin enviar (`form_abandon` con `last_field`),
   volver, enviar (`form_submit` + `generate_lead`) y llegar a `/gracias/`
   (`lead_confirmed` con el `form_id` correcto).
4. Bajar al 75 % de una página de servicio (`scroll_deep`) y pulsar el teléfono de
   la barra móvil (`click_tel` con `position = sticky-bar`).
5. Verificar en cada evento que `form_id`, `page_path` y `delivery` traen valor.
   Si `page_path` viene vacío, `pbTrack` no está definido: falta el include de §0.
