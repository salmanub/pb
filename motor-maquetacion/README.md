# Motor de maquetación

Servicio único que convierte un JSON de contenido en el documento HTML
maquetado (presupuesto, factura, informe) con el design system **Jornada**.

El contenido lo genera otro (el CRM en Apps Script, o un chat). El motor
**no decide contenido, no calcula importes y no trae lógica de negocio**:
valida el JSON, aplica estilos y omite lo que viene vacío.

```
JSON ──► POST /motor/render ──► HTML ──► perito.barcelona/pdf ──► PDF
         (este servicio)                 (Worker existente, intacto)
```

## Dónde vive

| Qué | Dónde |
|---|---|
| Esquema Zod (fuente de verdad) | `src/schema.ts` |
| Plantillas | `src/render/` |
| Handler HTTP | `src/index.ts` |
| Punto de entrada desplegado | `../functions/motor/render.ts` (Pages Function) |
| Tests y fixtures | `tests/` |

Se despliega con el resto del sitio: `git push` a `main` dispara el build de
Cloudflare Pages. No hay proyecto de Cloudflare aparte.

## Endpoint

`POST /motor/render`

Cabecera de autenticación: `x-auth-token` (alias: `x-motor-key`) con el mismo
secreto que ya usa el Worker de PDF, expuesto a Pages como variable de entorno
`RENDER_TOKEN`.

Cuerpo:

```json
{ "documento": { … }, "salida": "html" }
```

| `salida` | Respuesta |
|---|---|
| `"html"` (por defecto) | `text/html` — documento completo, autónomo, sin nada de JavaScript |
| `"pdf-payload"` | `application/json` con `{ html, headerHtml, footerHtml, margin }`, el payload exacto que espera `perito.barcelona/pdf/render` |

`pdf-payload` existe porque la numeración de páginas («Pág. 2 de 5») sólo la
puede hacer Puppeteer con sus plantillas de cabecera y pie. La salida `html`
resuelve la repetición con `position:fixed`, que Chrome sí repite al imprimir,
pero no sabe numerar. Apps Script usa `pdf-payload`; `html` es la que sirve
para inspeccionar el documento en el navegador.

Códigos de respuesta:

| Código | Cuándo |
|---|---|
| 200 | Documento maquetado |
| 400 | El cuerpo no es JSON |
| 401 | Token ausente o incorrecto |
| 405 | Método distinto de GET/POST |
| 422 | El JSON no valida — `{ "errores": [{ "campo", "motivo" }] }` |
| 500 | Sólo un fallo interno inesperado. La validación **nunca** produce un 500 |

## Esquema

Ver `src/schema.ts`, que es la única fuente de verdad: de ahí salen los tipos
TypeScript (`z.infer`) y los mensajes de error.

```
tipo        "presupuesto" | "factura" | "informe"
meta        { numero, fecha, expediente?, idioma, vigencia? }
emisor      { nombre, rol?, firma?, nif?, direccion?, telefono?, email?, web? }
cliente     { nombre, nif?, direccion?, telefono?, email? }
secciones   [ { id, titulo?, variante, bloques: [...] } ]
totales?    { moneda, lineas: [{ etiqueta, importe, total?, resaltada? }] }
pieResumen?
```

Bloques: `parrafo`, `lista`, `tabla`, `imagen`, `campos`, `firma`.

**Regla de oro**: sección ausente o vacía = no se renderiza. Un bloque sin
contenido (tabla sin filas, lista sin ítems, campos todos vacíos) desaparece, y
si con eso la sección se queda sin nada, desaparece también — título incluido.
Nunca hay placeholders ni huecos.

El espejo manual de este esquema en Apps Script está en
`gestorCRM/apps-script/20_MotorMaquetacion.gs` (`_docJson`). Si cambias algo
aquí, actualízalo allí.

## Design system Jornada

Lora (texto) · Archivo (títulos) · JetBrains Mono (datos).
Papel `#F2EFE9` · tinta `#26241F` · teal `#0E6A64` · ámbar `#8A5A00`.
Sin `border-radius` en ningún elemento. CSS de impresión A4 con márgenes y
cabecera/pie repetidos.

Las tres familias **no** están autoalojadas en perito.barcelona (allí sólo hay
Spectral e IBM Plex), así que se cargan de Google Fonts con pila de respaldo
local. Autoalojarlas es la mejora pendiente.

## Comandos

```bash
npm run test:motor        # vitest, sin red
npm run test:motor:watch
npm run typecheck:motor
```

Los tests cubren: documento válido, rechazo con error legible, sección vacía
que no aparece en el HTML, escapado de caracteres peligrosos (se comprueba
sobre las etiquetas realmente emitidas, no sobre subcadenas) y snapshots de un
presupuesto y una factura de ejemplo.
