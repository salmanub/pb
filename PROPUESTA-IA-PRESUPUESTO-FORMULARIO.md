# Propuesta · IA en el formulario conversacional → presupuesto orientativo (perito.barcelona)

> Objetivo (Albert): que en el formulario conversacional la IA intervenga en vivo — p.ej.
> si piden presupuesto, que cualifique (¿comparecencia judicial?, tipo de informe…) y
> devuelva el rango de precios del informe pericial durante el proceso. Así, cuando el lead
> llegue al CRM (Peritia), solo haya que **verificar y aplicar precios**, y el sistema
> responda por email con el **PDF de presupuesto** que genera el Worker.
>
> Clave: NO reinventar. Casi todo existe; esto lo cablea.

## 1. Lo que YA está montado (reutilizar)
- **`src/assets/js/intake.js`** — formulario multi-paso (qué pasa → tipo inmueble → antigüedad → contacto) con Turnstile. Postea a la Function.
- **`functions/api/contacto.js`** — dual-write al CRM (Apps Script `CRM_WEBAPP_URL`) + Make (`MAKE_WEBHOOK_PARTICULAR/PROFESIONAL`).
- **`chatbot/worker.js`** — Worker con LLM + sesiones en KV (`PERITO_SESSIONS`) + servicios/árbol de decisión en Google Sheets. Hoy usa OpenAI.
- **`cloudflare-pdf/` (vilardell-pdf)** — Worker Puppeteer HTML→PDF, ruta `perito.barcelona/pdf/*`, auth `x-auth-token: RENDER_TOKEN`. Apps Script le manda HTML y recibe el PDF.
- **`src/honorarios/`** — posicionamiento: presupuesto cerrado tras revisar documentación; sin tarifa estándar; ratificación en sala incluida.

## 2. Principio de diseño (importante, legal y comercial)
La IA **cualifica y orienta; no fija precio vinculante**. Coherente con `honorarios`:
- La IA da un **rango orientativo** ("un informe pericial de vicios ocultos con ratificación
  en sala suele situarse entre X-Y €") y siempre remata con *"presupuesto cerrado tras revisar
  su documentación"*.
- **El número sale de una TABLA determinista** (server-side), no del modelo. La IA solo:
  (a) clasifica el caso, (b) hace la pregunta que falta, (c) elige la CLAVE de la tabla,
  (d) redacta la respuesta en lenguaje natural. Así nunca alucina cifras.
- Haiku es ideal aquí: barato, rápido, suficiente para clasificar + preguntar + extraer JSON.

## 3. Flujo objetivo
```
Usuario en el form conversacional (intake.js)
   │  paso "¿qué está pasando?" + texto libre opcional
   ▼
POST /api/form-assist   (nueva Function, Claude Haiku)
   │  la IA: clasifica {tipo_informe, ámbito, urgencia}, detecta si falta el dato
   │  de COMPARECENCIA JUDICIAL y lo pregunta; elige clave de la tabla de rangos.
   ▼
Respuesta al form: siguiente pregunta ("¿Necesita que el perito comparezca y ratifique
   en el juicio?") + cuando ya hay datos, RANGO ORIENTATIVO (de la tabla) + copy de cierre.
   ▼
Usuario completa contacto → POST /api/contacto  (ya existe)
   │  payload enriquecido con lo que estructuró la IA (tipo, comparecencia, rango, resumen)
   ▼
CRM (Apps Script + Sheets) + Make   ← Peritia VERIFICA y aplica el precio cerrado
   ▼
Apps Script arma el HTML del presupuesto → POST al Worker vilardell-pdf (/pdf) → PDF
   ▼
Email al cliente con el PDF de presupuesto  (Peritia lo aprueba con 1 clic, o auto)
```

## 4. La intervención IA — nueva Function `functions/api/form-assist.js`
- Entrada: estado parcial del form (`{ historia, tipo_inmueble, antiguedad, texto_libre, comparecencia? }`).
- Llama a **Claude Haiku** (Anthropic Messages API, `ANTHROPIC_API_KEY` en env) forzando
  **salida estructurada** (tool/JSON) con este esquema:
  ```json
  {
    "tipo_informe": "vicios_ocultos | humedades | grietas_estructural | mala_ejecucion | otro",
    "ambito": "particular | comunidad | local_nave | obra_publica",
    "comparecencia_judicial": true | false | null,
    "urgencia": "alta | media | baja",
    "falta_dato": "comparecencia_judicial | null",
    "pregunta_siguiente": "texto de la pregunta a mostrar (o null si ya no falta nada)",
    "clave_rango": "vicios_ocultos::con_comparecencia (o null)",
    "resumen_para_crm": "1-2 frases para que Peritia lo lea de un vistazo"
  }
  ```
- La Function toma `clave_rango`, busca en la **tabla de rangos** (abajo) y devuelve al form:
  `{ pregunta_siguiente, rango: {min, max, incluye}, disclaimer }`.
- Precio SIEMPRE desde la tabla; el modelo nunca inventa cifras.

### Tabla de rangos (rellenar con tus cifras reales — placeholders)
> Vive en Google Sheets (ya lees Sheets en el chatbot) o en un JSON server-side. Peritia la
> edita sin tocar código. La ratificación en sala va incluida en el rango "con comparecencia".

| clave_rango | min € | max € | incluye |
|---|---|---|---|
| vicios_ocultos::sin_comparecencia | ⚙️ | ⚙️ | Inspección + dictamen |
| vicios_ocultos::con_comparecencia | ⚙️ | ⚙️ | + ratificación en sala |
| humedades::sin_comparecencia | ⚙️ | ⚙️ | Inspección + termografía + dictamen |
| humedades::con_comparecencia | ⚙️ | ⚙️ | + ratificación |
| grietas_estructural::sin_comparecencia | ⚙️ | ⚙️ | Inspección + cálculo + dictamen |
| grietas_estructural::con_comparecencia | ⚙️ | ⚙️ | + ratificación |
| mala_ejecucion::sin_comparecencia | ⚙️ | ⚙️ | Contrainforme/valoración |
| mala_ejecucion::con_comparecencia | ⚙️ | ⚙️ | + ratificación |

(Modificadores opcionales: obra_pública +%, urgencia +%, desplazamiento fuera de Cataluña.)

## 5. Contrato de datos al CRM (ampliar el payload de `contacto.js`)
Añadir al payload que ya se envía a Apps Script + Make:
```
tipo_informe, ambito, comparecencia_judicial, urgencia,
rango_orientativo_min, rango_orientativo_max, clave_rango,
resumen_ia, transcripcion_form
```
Así Peritia abre el lead ya clasificado: solo verifica, fija el precio cerrado y aprueba.

## 6. Respuesta automática con PDF (reutiliza vilardell-pdf)
Ya existe la mitad: Apps Script → HTML → Worker PDF → PDF. Añadir:
1. Plantilla HTML de **presupuesto** (branding perito, datos del lead, alcance, precio cerrado,
   validez, "ratificación incluida", nº colegiado ECCAT en microdata/pie).
2. Apps Script: al marcar el lead como verificado, arma ese HTML, hace POST a
   `perito.barcelona/pdf/` con `x-auth-token`, recibe el PDF y lo adjunta a un email
   (Gmail API / Resend) al cliente. Botón "Aprobar y enviar" en el CRM (o auto si el
   rango < umbral).

## 7. Variables de entorno / secretos (Cloudflare Pages/Workers)
- `ANTHROPIC_API_KEY` (nueva) — para `/api/form-assist`.
- `HAIKU_MODEL` (nueva, opcional) — id del Haiku vigente (ajústalo en console.anthropic.com).
- Ya existentes: `CRM_WEBAPP_URL`, `MAKE_WEBHOOK_*`, `RENDER_TOKEN` (PDF), Turnstile.

## 8. Scaffold listo — `functions/api/form-assist.js`
```js
// POST /api/form-assist — cualificación IA en vivo del formulario (Claude Haiku).
// El modelo clasifica y elige clave; el PRECIO sale SIEMPRE de RANGOS (determinista).
const RANGOS = {
  "vicios_ocultos::sin_comparecencia": { min: 0, max: 0, incluye: "Inspección + dictamen" },
  "vicios_ocultos::con_comparecencia": { min: 0, max: 0, incluye: "Inspección + dictamen + ratificación en sala" },
  // … resto de claves (rellenar con cifras reales, o cargar desde Sheets)
};
const DISCLAIMER = "Rango orientativo. El presupuesto cerrado se emite tras revisar su documentación; la ratificación en sala está incluida.";

const json = (s, b) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

export async function onRequestPost({ request, env }) {
  let state; try { state = await request.json(); } catch { return json(400, { error: "bad_json" }); }

  const system = `Eres el asistente de cualificación de perito.barcelona (peritaciones judiciales de edificación en España).
Tu trabajo: a partir del estado del formulario, clasificar el caso y detectar si falta saber si el cliente necesita COMPARECENCIA JUDICIAL (que el perito ratifique el informe en el juicio). NO inventes precios. Devuelve SOLO el JSON del esquema.`;

  const body = {
    model: env.HAIKU_MODEL || "claude-haiku-4-5",
    max_tokens: 400,
    system,
    messages: [{ role: "user", content: "Estado del formulario:\n" + JSON.stringify(state) +
      "\n\nDevuelve el JSON con: tipo_informe, ambito, comparecencia_judicial (true/false/null), urgencia, falta_dato, pregunta_siguiente, clave_rango, resumen_para_crm." }]
  };

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!r.ok) return json(502, { error: "llm_upstream", status: r.status });

  const data = await r.json();
  let out; try { out = JSON.parse(data.content[0].text); } catch { return json(502, { error: "llm_parse" }); }

  const rango = out.clave_rango && RANGOS[out.clave_rango] ? RANGOS[out.clave_rango] : null;
  return json(200, {
    pregunta_siguiente: out.pregunta_siguiente || null,
    comparecencia_judicial: out.comparecencia_judicial,
    tipo_informe: out.tipo_informe,
    ambito: out.ambito,
    urgencia: out.urgencia,
    resumen_ia: out.resumen_para_crm,
    rango: rango ? { ...rango, disclaimer: DISCLAIMER } : null
  });
}
```
(Producción: forzar JSON con la API de *tool use* en vez de parsear texto; cargar `RANGOS`
desde tu Sheet; cachear; y añadir rate-limit básico por IP.)

## 9. Fases sugeridas
1. **F1 — Cualificación (sin precio).** `/api/form-assist` + un paso extra en `intake.js`:
   "¿Necesita comparecencia/ratificación judicial?". Enriquecer el payload del CRM. (Bajo riesgo,
   valor inmediato: Peritia recibe leads clasificados.)
2. **F2 — Rango orientativo en vivo.** Activar la tabla de rangos y mostrar el rango en el form.
3. **F3 — PDF + email automáticos.** Plantilla de presupuesto → vilardell-pdf → email desde el
   CRM con botón "Aprobar y enviar".

## 10. Coste y riesgos
- **Coste**: Haiku por lead ≈ céntimos (una llamada corta por envío). Despreciable.
- **Riesgo cifras**: mitigado — precios de tabla, nunca del modelo.
- **Riesgo legal/comercial**: mitigado — rango orientativo + "presupuesto cerrado tras revisar".
- **Privacidad**: el texto libre del form va a Anthropic; añadir aviso en el form y no pedir
  datos sensibles innecesarios (minimización).

## Lo que necesito de ti para ejecutar F1
- Confirmar el enfoque (rango orientativo, no precio firme).
- Una `ANTHROPIC_API_KEY` en los env de Cloudflare.
- Las cifras reales de la tabla de rangos (o el Sheet donde vivirán).
