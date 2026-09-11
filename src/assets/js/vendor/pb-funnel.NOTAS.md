# pb-funnel.js — notas de diseño

Este texto era el comentario Nunjucks del partial `components/ga-funnel.njk`,
que se convirtió en fichero externo para no repetir 7,6 KB en cada página.
Con la migración de GA4 a Plausible el fichero pasó de `ga-funnel.js` a
`pb-funnel.js`; el nombre del partial original se conserva aquí sólo para que
los commits antiguos sigan siendo rastreables.

pb-funnel.js — Instrumentación del embudo de formularios y de la fuga de leads.

TODO EL RAZONAMIENTO VA EN ESTE BLOQUE, nunca dentro del <script>. `minifyJS: false`
en el transform html-minify de .eleventy.js: cada carácter escrito dentro del script
viaja a las ~400 páginas del build. Aquí abajo es gratis.
Documentación de eventos, informes y propiedades: docs/PLAUSIBLE-FUNNEL.md

DÓNDE SE INCLUYE
Se carga con URL absoluta y `defer` desde layouts/base.njk, por delante del include
de components/analytics.njk. El orden funciona igual: `defer` retrasa la ejecución
hasta después del parseo, o sea después de los scripts en línea del final del body,
que es donde analytics.njk define window.pbTrack.

CONTRATO CON analytics.njk (no se redefine nada de allí)
 · window.pbTrack(nombre, params) — mezcla brand, lang, delivery, is_sxg_cache,
   hostname y los utm_* persistidos, y llama a plausible(nombre, {props}). Es seguro
   llamarlo antes de que el script de Plausible haya cargado —el stub encola en
   plausible.q— y no lanza. TODO evento del funnel sale por aquí.
 · window.pbDims() — no se usa: pbTrack ya las mezcla. Recalcularlas sería duplicar.
 · page_path ya no es una propiedad: es la `url` del pageview, y Plausible indexa
   por URL.

POR QUÉ UN SELECTOR Y NO UNA LISTA DE FORMULARIOS
Los formularios del sitio son cinco partials distintos, tres de ellos generaciones
sucesivas del mismo asistente, y sólo uno está incluido hoy en un layout. Una lista
codificada a mano quedaría desfasada en el primer refactor. El selector es
'form,[data-form-id]' — no sólo 'form' — porque dos de los cinco NO son un <form>:

 · partials/formulario-contacto.njk y partials/contact-form.njk son asistentes tipo
   typeform construidos con <div> y botones type="button"; envían por fetch.
 · partials/form-colaborador.njk pinta sus pasos desde intake-colaborador.js dentro
   de un contenedor vacío: en el momento de inicializar aún no hay ni un input.

Con 'form,[data-form-id]' esos tres contenedores entran en el embudo poniéndoles el
atributo, que es exactamente el único cambio que se ha hecho en los partials.

POR QUÉ DELEGACIÓN EN document Y NO N LISTENERS POR CAMPO
Además del coste (un listener frente a decenas por página), es lo que hace que el
formulario del colaborador funcione: sus campos se inyectan después de que esto
arranque. Con delegación no hace falta MutationObserver ni volver a enganchar nada;
el campo se resuelve hacia arriba con closest(SEL) en el momento del evento.
Se escucha focusin/focusout y no focus/blur: estos últimos no burbujean.

POR QUÉ checkValidity() EN EL focusout
Un solo camino para los dos casos que pide la especificación. Si el campo sale
válido, form_field_complete; si sale inválido, checkValidity() dispara el evento
nativo 'invalid', que ya estamos escuchando en captura (no burbujea), y de ahí sale
form_error. No hay rama duplicada de "blur inválido".
Deliberadamente NO se valida el campo vacío al salir: tabular por encima de un campo
requerido sin escribir es comportamiento normal y llenaría el informe de
error_type=required falsos. Ese caso se sigue capturando de verdad al intentar
enviar, porque el navegador dispara 'invalid' en todos los campos que bloquean el
submit. La señal de "se fue sin rellenarlo" es form_abandon con last_field, que es
justo el dato de fuga.

POR QUÉ form_abandon SE REGISTRA FUERA DEL requestIdleCallback
Es la única parte que no puede esperar: si la pestaña se oculta antes de que llegue
el hueco de idle, el listener no existiría y el abandono —el dato más valioso de
todo esto— se perdería en silencio. El resto (observers, delegación, scroll)
arranca en idle con setTimeout de reserva, para no tocar el hilo principal antes
del LCP. El handler de abandono recorre un objeto con cinco claves como mucho.
Se oye visibilitychange Y pagehide porque en Safari e iOS el primero no siempre
llega; abandono() es idempotente, oír los dos no duplica.

POR QUÉ scroll_deep USA scroll + requestAnimationFrame Y NO UN CENTINELA
El centinela es la opción elegante, pero necesita un elemento posicionado al 75 %
de la altura del documento, y para eso body tendría que tener position distinto de
static: un porcentaje en `top` se resuelve contra el bloque contenedor, que con body
estático es el viewport, no el documento. Añadir position a body desde un script de
medición es tocar el layout de todo el sitio, y eso no se hace por analítica.
La alternativa es un listener passive que en cada scroll sólo comprueba un booleano
y encola un rAF; el trabajo real (una lectura de scrollHeight) ocurre como mucho una
vez por frame y el listener se desengancha en cuanto dispara. Coste equivalente al
centinela sin efectos secundarios.

CÓMO SE DETECTA "PÁGINA DE SERVICIO"
Primero document.body.dataset.pageType === 'servicio', que es la marca correcta y
la que habría que añadir en base.njk. Hoy no existe ese atributo en ninguna página,
así que hay un segundo criterio, que no es una lista de rutas: layouts/service.njk
—y sólo él— emite un bloque de microdatos <div itemtype="https://schema.org/Service">.
Se busca con [itemtype$="/Service"]. El sufijo importa: "ProfessionalService" del
footer NO termina en "/Service", así que no genera falsos positivos.

POSICIÓN DE LOS CLICS DE INTENCIÓN
nav.njk y footer.njk no usan los landmarks <header>/<footer>, sino <div>, de modo
que el closest() de la especificación no acertaría en este sitio. Se amplía el
selector a nav, los roles ARIA y .mobile-bottom-bar, y se admite un data-position
explícito para cuando alguien quiera afinarlo sin tocar este fichero.
.mobile-bottom-bar (la barra fija de "Llamar / Enviar email" de base.njk) devuelve
'sticky-bar' y no 'footer': en móvil es la fuente principal de click_tel y meterla
en el mismo cubo que el pie haría ilegible el informe. Documentado en
PLAUSIBLE-FUNNEL.md.

QUÉ NO SE PUEDE MEDIR SOLO CON DELEGACIÓN, Y LOS DOS GANCHOS QUE LO ARREGLAN
form_submit se apoya en el evento nativo 'submit'. Los formularios de verdad
(form.njk, heroWithForm.njk) lo disparan, incluso el que hace preventDefault, porque
el evento existe antes de cancelarse. Los tres asistentes tipo typeform NO: su botón
es type="button" y el envío sale de un manejador de clic, así que sin ayuda no habría
form_submit para ellos, que son precisamente los formularios largos donde el embudo
importa. De ahí dos globales, invocadas con una línea guardada dentro de la rama que
ya existía en cada partial:

 · window.pbFormSubmit(formId)   — form_submit, idempotente. Se llama al empezar el
   envío (validación ya superada), que es el equivalente exacto al evento nativo.
   Marca el formulario como enviado, así no cuenta como abandono.
 · window.pbLeadConfirmed(formId) — lead_confirmed, una vez por página. Para las
   respuestas OK que NO redirigen (el hero y los dos asistentes muestran un panel de
   éxito en la misma página). Si se llama sin formId, lo recupera de sessionStorage.

Los que sí redirigen (form.njk por POST nativo, el colaborador desde su motor JS)
disparan lead_confirmed en src/gracias.njk, que lee ese mismo sessionStorage para
saber de qué formulario venía el lead.

EL EVENTO generate_lead YA NO EXISTE
pbFormSubmit emitía además 'generate_lead' con el mismo payload que 'form_submit',
porque en GA4 era uno de los eventos recomendados y eso le daba trato de conversión.
Plausible no tiene esa noción —la conversión se define como objetivo en el panel,
sobre cualquier nombre de evento—, así que el duplicado sólo inflaba el recuento.
El objetivo se monta sobre 'form_submit'.
