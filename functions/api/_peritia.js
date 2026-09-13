/**
 * Copia del lead al CRM nuevo (Peritia Core · crm.peritia.app), para las pruebas.
 *
 * gestorCRM sigue recibiendo el lead exactamente igual que antes: esto es un
 * segundo envío, en paralelo. Nunca cambia la respuesta al visitante —se llama
 * con waitUntil— y cualquier fallo se queda en el log de la función.
 *
 * Va firmado: HMAC-SHA256 del cuerpo exacto con el secreto PERITIA_SECRETO, en la
 * cabecera x-peritia-firma. Sin ese secreto en el proyecto de Pages no hace nada,
 * así que desplegar esto antes de configurarlo no rompe ni envía nada.
 */
const URL_ENTRADA = 'https://crm.peritia.app/api/publico/entrada';

const texto = (valor, max) => {
  const s = valor == null ? '' : String(valor).trim();
  return s ? s.slice(0, max) : undefined;
};

export async function enviarAPeritia(env, identificador, lead) {
  const secreto = env && env.PERITIA_SECRETO;
  if (!secreto) return;

  const cuerpo = JSON.stringify({
    canal: 'formulario',
    identificador,
    nombre: texto(lead.nombre, 200),
    email: texto(lead.email, 200),
    telefono: texto(lead.telefono, 40),
    idioma: texto(lead.idioma, 10),
    asunto: texto(lead.asunto, 300),
    mensaje: texto(lead.mensaje, 8000),
    direccion: texto(lead.direccion, 300),
    poblacion: texto(lead.poblacion, 120),
    codigo_postal: texto(lead.codigo_postal, 10),
    campos: lead.campos,
    origen_url: texto(lead.origen_url, 500),
    referencia_externa: texto(lead.referencia_externa, 200),
  });

  try {
    const clave = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secreto),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const mac = await crypto.subtle.sign('HMAC', clave, new TextEncoder().encode(cuerpo));
    const firma = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
    const res = await fetch(env.PERITIA_ENTRADA_URL || URL_ENTRADA, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-peritia-firma': `sha256=${firma}` },
      body: cuerpo,
      // Una redirección aquí es la pantalla de login de Access: no es un éxito.
      redirect: 'manual',
    });
    if (res.status !== 201) {
      console.error('[peritia] el CRM respondió', res.status, (await res.text()).slice(0, 200));
    }
  } catch (e) {
    console.error('[peritia] envío fallido:', e && e.message);
  }
}
