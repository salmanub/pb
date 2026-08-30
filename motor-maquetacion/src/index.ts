/**
 * Motor de maquetación · handler POST /motor/render
 *
 * Recibe { documento, salida }, valida con Zod y devuelve el documento
 * maquetado. No decide contenido, no calcula importes, no trae lógica de
 * negocio: valida, aplica estilos y omite lo que viene vacío.
 *
 * Autenticación: misma cabecera y mismo secreto que el Worker de PDF
 * existente (x-auth-token contra RENDER_TOKEN). Se acepta también
 * X-Motor-Key como alias.
 *
 * Respuestas:
 *   200 text/html         — salida "html" (por defecto)
 *   200 application/json  — salida "pdf-payload" ({html, headerHtml, footerHtml, margin})
 *   400                   — JSON malformado
 *   401                   — token ausente o incorrecto
 *   405                   — método distinto de POST/GET
 *   422 application/json  — { errores: [{campo, motivo}] }
 *   500                   — sólo fallo interno inesperado, nunca validación
 */
import { erroresLegibles, validarPeticion } from './schema';
import { renderHtml, renderPdfPayload } from './render/documento';

export interface Entorno {
  RENDER_TOKEN?: string;
  MOTOR_KEY?: string;
}

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

function json(cuerpo: unknown, status: number): Response {
  return new Response(JSON.stringify(cuerpo), { status, headers: JSON_HEADERS });
}

/** Comparación en tiempo constante, para no filtrar el secreto por timing. */
function tokenValido(recibido: string, esperado: string): boolean {
  if (recibido.length !== esperado.length) return false;
  let diff = 0;
  for (let i = 0; i < recibido.length; i++) diff |= recibido.charCodeAt(i) ^ esperado.charCodeAt(i);
  return diff === 0;
}

export async function manejarPeticion(request: Request, env: Entorno): Promise<Response> {
  if (request.method === 'GET') {
    return new Response('Motor de maquetación · OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, POST' } });
  }

  const esperado = env.RENDER_TOKEN || env.MOTOR_KEY || '';
  const recibido = request.headers.get('x-auth-token') || request.headers.get('x-motor-key') || '';
  if (!esperado || !recibido || !tokenValido(recibido, esperado)) {
    return new Response('Unauthorized', { status: 401 });
  }

  let bruto: unknown;
  try {
    bruto = await request.json();
  } catch {
    return json({ errores: [{ campo: '(cuerpo)', motivo: 'el cuerpo no es JSON válido' }] }, 400);
  }

  const analisis = validarPeticion(bruto);
  if (!analisis.success) {
    return json({ errores: erroresLegibles(analisis.error) }, 422);
  }

  const { documento, salida } = analisis.data;
  // Las fuentes se sirven desde el mismo despliegue que atiende la petición,
  // así un preview en *.pages.dev no depende de que producción ya las tenga.
  const origen = new URL(request.url).origin;

  try {
    if (salida === 'pdf-payload') {
      return json(renderPdfPayload(documento, origen), 200);
    }
    return new Response(renderHtml(documento, origen), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    const motivo = e instanceof Error ? e.message : String(e);
    console.error('motor/render fallo al maquetar: ' + motivo);
    return json({ errores: [{ campo: '(motor)', motivo: 'fallo al maquetar: ' + motivo }] }, 500);
  }
}

export { Documento, Peticion, erroresLegibles, validarDocumento, validarPeticion } from './schema';
export { renderHtml, renderPdfPayload } from './render/documento';
