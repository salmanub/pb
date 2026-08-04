// POST /api/form-assist — cualificación IA del intake de perito.barcelona.
// La clasificación (tipo de informe) y el RANGO son DETERMINISTAS (tabla server-side);
// Claude Haiku solo redacta un resumen para el CRM. Fail-open: si no hay ANTHROPIC_API_KEY
// o el modelo falla, se devuelve igualmente la clasificación y el rango (resumen = null).

// problema (opción del form) -> [clave_tipo, etiqueta legible]
const TIPO_POR_PROBLEMA = {
  'Humedades o filtraciones':        ['humedades',            'humedades y filtraciones'],
  'Grietas, fisuras o movimientos':  ['grietas_estructural',  'grietas o daños estructurales'],
  'Vicios ocultos tras comprar':     ['vicios_ocultos',       'vicios ocultos'],
  'Reforma u obra mal ejecutada':    ['mala_ejecucion',       'mala ejecución de obra'],
  'Otro problema constructivo':      ['otro',                 'patología constructiva'],
};

// ⚙️ RELLENA con tus cifras reales (o carga desde tu Google Sheet).
// min:0/max:0 = sin precio configurado → el form solo clasifica, no muestra importe.
const RANGOS = {
  'humedades::con':           { min: 0, max: 0, incluye: 'Inspección, termografía, dictamen y ratificación en sala' },
  'humedades::sin':           { min: 0, max: 0, incluye: 'Inspección, termografía y dictamen' },
  'grietas_estructural::con': { min: 0, max: 0, incluye: 'Inspección, análisis estructural, dictamen y ratificación' },
  'grietas_estructural::sin': { min: 0, max: 0, incluye: 'Inspección, análisis estructural y dictamen' },
  'vicios_ocultos::con':      { min: 0, max: 0, incluye: 'Inspección, dictamen y ratificación en sala' },
  'vicios_ocultos::sin':      { min: 0, max: 0, incluye: 'Inspección y dictamen' },
  'mala_ejecucion::con':      { min: 0, max: 0, incluye: 'Valoración/contrainforme, dictamen y ratificación' },
  'mala_ejecucion::sin':      { min: 0, max: 0, incluye: 'Valoración/contrainforme y dictamen' },
  'otro::con':                { min: 0, max: 0, incluye: 'Dictamen pericial y ratificación en sala' },
  'otro::sin':                { min: 0, max: 0, incluye: 'Dictamen pericial' },
};
const DISCLAIMER = 'Rango orientativo. El presupuesto cerrado se emite tras revisar su documentación; la ratificación en sala se incluye cuando el caso va a juicio. No incluye catas ni ensayos de laboratorio: en su caso se presupuestan aparte.';

const CORS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
const json = (s, b) => new Response(JSON.stringify(b), { status: s, headers: CORS });

function comparecenciaFlag(v) {
  v = (v || '').trim().toLowerCase();
  if (v.indexOf('sí') === 0 || v.indexOf('si,') === 0 || v.indexOf('si ') === 0) return true;
  if (v.indexOf('no') === 0) return false;
  return null; // "Todavía no lo sé"
}

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json(400, { error: 'bad_json' }); }

  const pair = TIPO_POR_PROBLEMA[d.problema] || ['otro', 'patología constructiva'];
  const tipo = pair[0], tipoLabel = pair[1];
  const comp = comparecenciaFlag(d.comparecencia);      // true | false | null
  const suf = comp === false ? 'sin' : 'con';           // null → 'con' (incluye ratificación)
  const clave = tipo + '::' + suf;
  const base = RANGOS[clave] || null;
  const rango = base
    ? { min: base.min, max: base.max, incluye: base.incluye, disclaimer: DISCLAIMER, configurado: base.max > 0 }
    : null;

  // Resumen para el CRM con Claude Haiku (opcional, fail-open)
  let resumen = null;
  if (env && env.ANTHROPIC_API_KEY) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Ajusta HAIKU_MODEL al id de Haiku vigente en console.anthropic.com
          model: env.HAIKU_MODEL || 'claude-3-5-haiku-latest',
          max_tokens: 160,
          system: 'Eres el asistente de admisión de perito.barcelona (peritajes judiciales de edificación en España). Resume el caso del cliente en 1-2 frases claras y neutras para que el perito lo verifique de un vistazo. No inventes datos ni des precios.',
          messages: [{
            role: 'user',
            content:
              'Problema: ' + (d.problema || '') +
              '\nInmueble: ' + (d.inmueble || '') +
              '\nAntigüedad: ' + (d.antiguedad || '') +
              '\nComparecencia judicial: ' + (d.comparecencia || '') +
              '\nDetalle del cliente: ' + (d.detalle || '(sin detalle)'),
          }],
        }),
      });
      if (r.ok) {
        const j = await r.json();
        resumen = (j.content && j.content[0] && j.content[0].text) ? j.content[0].text.trim() : null;
      }
    } catch (_) { resumen = null; }
  }

  return json(200, {
    tipo_informe: tipo,
    tipo_label: tipoLabel,
    comparecencia_judicial: comp,
    clave_rango: clave,
    rango,
    resumen_ia: resumen,
  });
}

export const onRequestOptions = () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
