/**
 * PERITO.BARCELONA - WORKER v13.0 (ROBUST & FALLBACK)
 * Corrige bucles infinitos y problemas de memoria con VIPs
 */

// ============================================================================
// 1. CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  SHEETS_API_KEY: 'TU_API_KEY_AQUI', 
  SPREADSHEET_ID: 'TU_SPREADSHEET_ID_AQUI',
  
  GOOGLE_SERVICE_ACCOUNT_EMAIL: '',
  GOOGLE_PRIVATE_KEY: '',
  
  MAILCHANNELS_API: 'https://api.mailchannels.net/tx/v1/send',
  EMAIL_DESTINO: 'info@perito.barcelona',
  
  OPENAI_API_KEY: 'TU_OPENAI_KEY_AQUI',
  OPENAI_MODEL: 'gpt-4-turbo-preview',
  
  SESSION_TIMEOUT: 30 * 60 * 1000, 
  
  // VIPs: Escribe todo en minúsculas para asegurar la detección
  VIP_NAMES: ['victor del mar', 'bufete x', 'victor pro', 'colaborador victor'],
};

// ============================================================================
// 2. DATOS DE RESPALDO (FALLBACK)
// ============================================================================
// Esto evita que el bot se rompa si Google Sheets falla o no tiene API Key
const FALLBACK_SERVICIOS = [
    { slug: 'danos-alquiler', nombre_servicio: 'Daños en Alquiler', categoria: 'Alquiler', icono: '🏢', nivel: 1 },
    { slug: 'vicios-ocultos', nombre_servicio: 'Vicios Ocultos', categoria: 'Vicios', icono: '🏗️', nivel: 1 },
    { slug: 'siniestros-seguros', nombre_servicio: 'Siniestros', categoria: 'Seguros', icono: '🔥', nivel: 1 },
    { slug: 'accidentes', nombre_servicio: 'Accidentes', categoria: 'Accidentes', icono: '🚗', nivel: 1 },
    { slug: 'valoracion-economica', nombre_servicio: 'Valoraciones', categoria: 'Economico', icono: '⚖️', nivel: 1 },
    { slug: 'patologia-estructural', nombre_servicio: 'Estructuras', categoria: 'Estructuras', icono: '🏛️', nivel: 1 }
];

// ============================================================================
// 3. SYSTEM PROMPT
// ============================================================================

function generateSystemPrompt(userRole, caseType, lang = 'es') {
  let prompt = `Eres el Asistente de Perito.barcelona. IDIOMA: ${lang.toUpperCase()}.`;

  if (userRole === 'Abogado') {
    prompt += ` ROL: Técnico para letrados. TONO: Colega profesional. OBJETIVO: Fase procesal y tipo informe.`;
  } else if (userRole === 'VIP') {
    prompt += ` ROL: Asistente personal VIP. TONO: Eficiente y cercano. OBJETIVO: Recoger encargo rápido.`;
  } else {
    prompt += ` ROL: Asistente Junior. OBJETIVO: Cualificar caso.`;
    if (caseType) {
        const ct = caseType.toLowerCase();
        if (ct.includes('alquiler')) prompt += ` CONTEXTO: Alquiler (Propietario/Inquilino).`;
        else if (ct.includes('accidente')) prompt += ` CONTEXTO: Accidentes (Causante/Afectado).`;
    }
  }
  prompt += `\nTAREA: Obtén DESCRIPCIÓN TÉCNICA del problema. No des precios.`;
  return prompt;
}

// ============================================================================
// 4. CLASES DE SERVICIO
// ============================================================================

const ICONS = { building: '🏢', hardHat: '🏗️', flame: '🔥', car: '🚗', scale: '⚖️', landmark: '🏛️', briefcase: '💼', user: '👤', key: '🔑', shoppingCart: '🛒', home: '🏠', frown: '😟', alertTriangle: '⚠️', scroll: '📜', shield: '🛡️', clipboard: '📋' };

const ESTADOS = { 
  INICIO: 'inicio', 
  TRIAJE_NIVEL_1: 'triaje_1', 
  TRIAJE_NIVEL_2: 'triaje_2', 
  CAPTURA_ROL: 'captura_rol', 
  CAPTURA_DESCRIPCION: 'captura_desc', 
  CUALIFICACION: 'cualificacion', 
  CAPTURA_UBICACION: 'captura_ubicacion',
  CAPTURA_NOMBRE: 'captura_nombre',
  CAPTURA_EMAIL: 'captura_email',
  CAPTURA_TELEFONO: 'captura_telefono',
  FINALIZADO: 'finalizado' 
};

// Store usando Cloudflare KV
class SessionStore {
  constructor(env) { this.env = env; }
  
  async get(id) { 
    if (!this.env.PERITO_SESSIONS) return null; // Fallback si no hay KV configurado
    return await this.env.PERITO_SESSIONS.get(id, { type: 'json' });
  }
  
  async set(id, data) { 
    if (!this.env.PERITO_SESSIONS) return;
    // TTL de 30 minutos (1800 segundos)
    await this.env.PERITO_SESSIONS.put(id, JSON.stringify(data), { expirationTtl: 1800 }); 
  }
  
  async delete(id) { 
    if (!this.env.PERITO_SESSIONS) return;
    await this.env.PERITO_SESSIONS.delete(id); 
  }
}

class SheetsService {
  constructor(apiKey, sheetId) {
    this.apiKey = apiKey;
    this.sheetId = sheetId;
    this.cacheServicios = null;
  }
  
  setWriteService(ws) { this.writeService = ws; }

  async getServicios() {
    if (this.cacheServicios) return this.cacheServicios;
    try {
      // Intentar leer de Google Sheets
      let url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Servicios_Periciales!A2:L100?key=${this.apiKey}`;
      
      // Si tenemos Service Account, usarla (mejor)
      if (this.writeService && this.writeService.serviceAccountEmail) {
          const token = await this.writeService.getAccessToken();
          url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Servicios_Periciales!A2:L100`;
          const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
          const data = await res.json();
          if (data.values) return this.parseServicios(data.values);
      } else if (this.apiKey !== 'TU_API_KEY_AQUI') {
          // Si tenemos API Key
          const res = await fetch(url);
          const data = await res.json();
          if (data.values) return this.parseServicios(data.values);
      }
    } catch (e) { console.error('Error Sheets, usando Fallback:', e); }

    // SI FALLA TODO, USAR DATOS DE RESPALDO (Esto arregla el bucle)
    console.log("Usando servicios de respaldo (Fallback)");
    return FALLBACK_SERVICIOS;
  }
  
  parseServicios(rows) {
      this.cacheServicios = rows.filter(r => r[9] === 'TRUE').map(r => ({
          slug: r[0], categoria: r[1], nombre_servicio: r[2], icono: r[3],
          nivel: parseInt(r[4]) || 1, padre_slug: r[5], pregunta: r[6],
          url_landing: r[11] || null
      }));
      return this.cacheServicios;
  }

  async getServiciosByNivel(nivel, padreSlug = null) {
    const servicios = await this.getServicios();
    return servicios.filter(s => 
      s.nivel === nivel && 
      (padreSlug ? s.padre_slug === padreSlug : !s.padre_slug)
    );
  }

  async getRecursosWeb() {
      // Simplificado: si falla API, devuelve vacío para no romper
      try {
          const range = 'Recursos_Web!A2:E200';
          let values = [];
          
          if (this.writeService && this.writeService.serviceAccountEmail) {
            const token = await this.writeService.getAccessToken();
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${range}`;
            const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
            const data = await res.json();
            values = data.values || [];
          } else if (this.apiKey !== 'TU_API_KEY_AQUI') {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${range}?key=${this.apiKey}`;
            const res = await fetch(url);
            const data = await res.json();
            values = data.values || [];
          }
          
          return values.map(row => ({
            titulo: row[0],
            url: row[1],
            tipo: row[2],
            tags: row[3] ? row[3].toLowerCase().split(',').map(t => t.trim()) : [],
            descripcion: row[4],
            lang: row[5] || 'es'
          }));
      } catch (e) { return []; }
  }

  async getServicioBySlug(slug) {
    const s = await this.getServicios();
    return s.find(x => x.slug === slug);
  }
}

class SheetsWriteService {
  constructor() {
    this.serviceAccountEmail = CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    this.privateKey = CONFIG.GOOGLE_PRIVATE_KEY;
    this.spreadsheetId = CONFIG.SPREADSHEET_ID;
  }

  async getAccessToken() {
    // Lógica JWT estándar para Google Auth
    const header = { alg: 'RS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const claim = { iss: this.serviceAccountEmail, scope: 'https://www.googleapis.com/auth/spreadsheets', aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now };
    const encode = (o) => btoa(JSON.stringify(o)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const str = `${encode(header)}.${encode(claim)}`;
    const key = await crypto.subtle.importKey('pkcs8', this.pemToBuf(this.privateKey), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(str));
    const jwt = `${str}.${btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')}`;
    const res = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}` });
    const json = await res.json();
    return json.access_token;
  }

  pemToBuf(pem) {
    const b64 = pem.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\s/g, '');
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i=0; i<bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  }

  async guardarLead(lead) {
    if (!this.serviceAccountEmail) return;
    try {
        const token = await this.getAccessToken();
        const fila = [
            lead.sessionId, new Date().toISOString(), 'Chatbot', lead.servicio_nombre,
            lead.telefono, lead.email || '', lead.nombre || '', lead.ubicacion || '',
            lead.tipo_cliente, lead.rol_cliente || '', lead.descripcion_caso || '',
            lead.urgencia || 'Normal', 'PENDIENTE', lead.lang || 'es'
        ];
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Leads!A:N:append?valueInputOption=USER_ENTERED`;
        await fetch(url, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ values: [fila] }) });
    } catch (e) { console.error('Error Lead:', e); }
  }
}

class IAService {
  constructor(key, model) { this.key = key; this.model = model; }
  async chat(msgs, prompt) {
    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.key}` },
            body: JSON.stringify({ model: this.model, messages: [{role:'system', content: prompt}, ...msgs], temperature: 0.7 })
        });
        const json = await res.json();
        return json.choices[0].message.content;
    } catch (e) { return "Error técnico. Por favor, descríbeme tu caso."; }
  }
}

class EmailService {
    async enviarLead(leadData) {
        const emailBody = `
NUEVO LEAD - PERITO.BARCELONA
================================
DATOS DEL CASO:
- Servicio: ${leadData.servicio_nombre}
- Categoría: ${leadData.categoria}
- Tipo Legal: ${leadData.tipo_legal}
- Urgencia: ${leadData.urgencia || 'Normal'}

ROL DEL CLIENTE:
- ${leadData.rol_cliente || 'No especificado'}

DESCRIPCIÓN DEL CASO:
${leadData.descripcion_caso || 'No proporcionada'}

DATOS DE CONTACTO:
- Nombre: ${leadData.nombre}
- Teléfono: ${leadData.telefono}
- Ubicación: ${leadData.ubicacion}

CONVERSACIÓN COMPLETA:
${leadData.conversacion}

METADATOS:
- Fecha: ${new Date().toISOString()}
- Session ID: ${leadData.sessionId}
- User Agent: ${leadData.userAgent}
        `.trim();
        
        const payload = {
          personalizations: [{ to: [{ email: CONFIG.EMAIL_DESTINO }] }],
          from: { email: 'chatbot@perito.barcelona', name: 'Chatbot Perito.barcelona' },
          subject: `🚨 NUEVO LEAD: ${leadData.servicio_nombre} - ${leadData.nombre}`,
          content: [{ type: 'text/plain', value: emailBody }],
        };
        
        const response = await fetch(CONFIG.MAILCHANNELS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        
        return response.ok;
    }
}

// ============================================================================
// 5. MANEJADOR DEL CHAT
// ============================================================================

class ChatbotHandler {
  constructor(env) {
    this.sheets = new SheetsService(CONFIG.SHEETS_API_KEY, CONFIG.SPREADSHEET_ID);
    this.writer = new SheetsWriteService();
    this.sheets.setWriteService(this.writer);
    this.ia = new IAService(CONFIG.OPENAI_API_KEY, CONFIG.OPENAI_MODEL);
    this.email = new EmailService();
    this.sessionStore = new SessionStore(env);
  }

  async handleMessage(sessionId, mensaje, userAgent, userLang = 'es') {
    let session = await this.sessionStore.get(sessionId);
    if (!session) {
      session = { estado: ESTADOS.INICIO, historial: [], datos: { tipo_cliente: 'Particular', lang: userLang }, sessionId, userAgent };
    }

    // Añadir mensaje de usuario al historial
    session.historial.push({ role: 'user', content: mensaje, timestamp: Date.now() });

    // ------------------------------------------------------------------------
    // A. INTERCEPCIÓN VIP (Prioridad ABSOLUTA)
    // ------------------------------------------------------------------------
    const mensajeLower = mensaje ? mensaje.toLowerCase() : '';
    const esVip = CONFIG.VIP_NAMES.some(vip => mensajeLower.includes(vip));
    
    // Si se detecta VIP, ignoramos el estado actual y saltamos a modo VIP
    if (esVip) {
        session.datos.tipo_cliente = 'VIP';
        session.datos.vip = true;
        session.datos.servicio_final = { nombre_servicio: 'Consulta VIP', categoria: 'VIP' };
        session.estado = ESTADOS.CAPTURA_DESCRIPCION;
        
        const nombreDetectado = mensaje.split(' ').find(w => CONFIG.VIP_NAMES.some(v => v.includes(w.toLowerCase()))) || 'Victor';
        const nombreCapitalizado = nombreDetectado.charAt(0).toUpperCase() + nombreDetectado.slice(1);

        const resp = { texto: `¡Hombre ${nombreCapitalizado}! Buenas. ¿Qué necesitas mover hoy? Descríbeme el tema y aviso urgente al equipo.`, botones: [] };
        return this.guardarYResponder(sessionId, session, resp);
    }

    // ------------------------------------------------------------------------
    // B. MANEJO DE ESTADOS
    // ------------------------------------------------------------------------
    
    // HOTFIX: Si la sesión se reinició (Cloudflare cold start) pero el usuario envió una opción válida (slug)
    // Forzamos el salto a Triaje 1 para evitar que le vuelva a preguntar "¿En qué te ayudo?"
    if (session.estado === ESTADOS.INICIO && mensaje && mensaje !== 'inicio') {
         // Comprobamos si el mensaje es un slug de servicio conocido o la keyword de abogado
         const servicios = await this.sheets.getServicios();
         const esServicio = servicios.some(s => s.slug === mensaje);
         const esAbogado = mensaje === 'soy_abogado';
         
         if (esServicio || esAbogado) {
             console.log("Sesión recuperada/acelerada para:", mensaje);
             session.estado = ESTADOS.TRIAJE_NIVEL_1; 
             // Dejamos que el switch de abajo lo procese
         }
    }

    let respuesta;
    switch (session.estado) {
        case ESTADOS.INICIO:
            respuesta = await this.handleInicio(session);
            break;
        case ESTADOS.TRIAJE_NIVEL_1:
            respuesta = await this.handleTriaje1(session, mensaje);
            break;
        case ESTADOS.TRIAJE_NIVEL_2:
            respuesta = await this.handleTriaje2(session, mensaje);
            break;
        case ESTADOS.CAPTURA_ROL:
            respuesta = await this.handleCapturaRol(session, mensaje);
            break;
        case ESTADOS.CAPTURA_DESCRIPCION:
            respuesta = await this.handleDescripcion(session, mensaje);
            break;
        case ESTADOS.CUALIFICACION:
            respuesta = await this.handleCualificacion(session, mensaje);
            break;
        case ESTADOS.CAPTURA_UBICACION:
            respuesta = await this.handleCapturaUbicacion(session, mensaje);
            break;
        case ESTADOS.CAPTURA_NOMBRE:
            respuesta = await this.handleCapturaNombre(session, mensaje);
            break;
        case ESTADOS.CAPTURA_EMAIL:
            respuesta = await this.handleCapturaEmail(session, mensaje);
            break;
        case ESTADOS.CAPTURA_TELEFONO:
            respuesta = await this.handleCapturaTelefono(session, mensaje);
            break;
        default:
            respuesta = { texto: "Error de estado. Reiniciando.", botones: [] };
            session.estado = ESTADOS.INICIO;
    }

    return this.guardarYResponder(sessionId, session, respuesta);
  }

  async guardarYResponder(id, session, resp) {
      session.historial.push({ role: 'assistant', content: resp.texto, botones: resp.botones });
      await this.sessionStore.set(id, session);
      return resp;
  }

  // --- FASES ---

  async handleInicio(session) {
      const servicios = await this.sheets.getServicios();
      let botones = servicios.filter(s => s.nivel === 1).map(s => ({
          type: 'button', text: `${s.icono || '🔧'} ${s.nombre_servicio}`, value: s.slug
      }));
      botones.push({ type: 'button', text: `${ICONS.briefcase} Soy Abogado / Profesional`, value: 'soy_abogado' });
      
      session.estado = ESTADOS.TRIAJE_NIVEL_1;
      return { texto: 'Hola, soy el Asistente de Peritaje de Perito.barcelona. ¿En qué puedo ayudarte hoy?', botones };
  }

  async handleTriaje1(session, mensaje) {
      const msgLower = mensaje.toLowerCase();
      
      // B2B
      if (mensaje === 'soy_abogado' || ['abogado', 'letrado', 'bufete'].some(k => msgLower.includes(k))) {
          session.datos.tipo_cliente = 'Abogado';
          session.datos.servicio_final = { nombre_servicio: 'Consulta Profesional', categoria: 'Legal' };
          session.estado = ESTADOS.CAPTURA_DESCRIPCION;
          return { texto: 'Entendido, compañero. Indícame: ¿Especialidad del asunto y fase procesal?', botones: [] };
      }

      // Buscar servicio
      let servicio = await this.sheets.getServicioBySlug(mensaje);
      
      // Fallback de búsqueda por texto
      if (!servicio) {
          const servicios = await this.sheets.getServicios();
          // Simple keyword matching
          if (msgLower.includes('alquiler')) servicio = servicios.find(s => s.slug === 'danos-alquiler');
          else if (msgLower.includes('vicio')) servicio = servicios.find(s => s.slug === 'vicios-ocultos');
          else if (msgLower.includes('siniestro')) servicio = servicios.find(s => s.slug === 'siniestros-seguros');
          else if (msgLower.includes('accidente')) servicio = servicios.find(s => s.slug === 'accidentes');
      }

      if (!servicio) {
          return this.handleInicio(session); // Re-mostrar opciones
      }

      session.datos.servicio_nivel1 = servicio;
      
      // Check hijos
      const hijos = await this.sheets.getServiciosByNivel(2, servicio.slug);
      if (hijos.length > 0) {
          session.estado = ESTADOS.TRIAJE_NIVEL_2;
          return {
              texto: servicio.pregunta || '¿Qué tipo específicamente?',
              botones: hijos.map(h => ({ type: 'button', text: `${h.icono} ${h.nombre_servicio}`, value: h.slug }))
          };
      }

      session.datos.servicio_final = servicio;
      session.estado = ESTADOS.CAPTURA_ROL;
      return this.handleCapturaRol(session, null);
  }

  async handleTriaje2(session, mensaje) {
      const servicio = await this.sheets.getServicioBySlug(mensaje);
      if (!servicio) return { texto: 'Opción no válida.', botones: [] };
      
      session.datos.servicio_final = servicio;
      session.estado = ESTADOS.CAPTURA_ROL;
      return this.handleCapturaRol(session, null);
  }

  async handleCapturaRol(session, mensaje) {
      if (!mensaje) {
          const cat = session.datos.servicio_final.categoria.toLowerCase();
          let botones = [];
          let texto = '¿Cuál es tu situación?';
          
          if (cat.includes('alquiler')) {
              texto = '¿Eres propietario o inquilino?';
              botones = [{type:'button', text:'Propietario', value:'propietario'}, {type:'button', text:'Inquilino', value:'inquilino'}];
          } else if (cat.includes('vicio')) {
              texto = '¿Comprador o Vendedor?';
              botones = [{type:'button', text:'Comprador', value:'comprador'}, {type:'button', text:'Vendedor', value:'vendedor'}];
          } else {
              botones = [{type:'button', text:'Propietario/Afectado', value:'propietario'}, {type:'button', text:'Otro', value:'otro'}];
          }
          return { texto, botones };
      }
      
      session.datos.rol_cliente = mensaje;
      session.estado = ESTADOS.CAPTURA_DESCRIPCION;
      return this.handleDescripcion(session, null);
  }

  async handleDescripcion(session, mensaje) {
      if (!mensaje) {
          const prompt = generateSystemPrompt(session.datos.tipo_cliente, session.datos.servicio_final.categoria, session.datos.lang);
          const iaMsg = await this.ia.chat([...session.historial, {role:'system', content:'Genera pregunta corta para pedir descripción técnica.'}], prompt);
          return { texto: iaMsg, botones: [] };
      }
      
      session.datos.descripcion_caso = mensaje;
      session.estado = ESTADOS.CUALIFICACION;
      return this.handleCualificacion(session, null);
  }

  async handleCualificacion(session, mensaje) {
      if (!mensaje) {
          return {
              texto: '¿Estado legal del caso?',
              botones: [
                  {type:'button', text:`${ICONS.scroll} Ya hay demanda`, value:'demanda'},
                  {type:'button', text:`${ICONS.shield} Reclamación previa`, value:'reclamacion'},
                  {type:'button', text:`${ICONS.clipboard} Nada aún`, value:'sin_demanda'}
              ]
          };
      }
      
      session.datos.tipo_legal = mensaje === 'demanda' ? 'demanda_judicial' : (mensaje === 'reclamacion' ? 'reclamacion_previa' : 'sin_demanda');
      session.datos.urgencia = mensaje === 'demanda' ? 'alta' : 'normal';
      
      session.estado = ESTADOS.CAPTURA_UBICACION;
      return { texto: 'Perfecto. Para el presupuesto, ¿en qué población está el inmueble?', botones: [] };
  }

  async handleCapturaUbicacion(session, mensaje) {
      session.datos.ubicacion = mensaje;
      session.estado = ESTADOS.CAPTURA_NOMBRE;
      return { texto: '¿A nombre de quién pongo el presupuesto?', botones: [] };
  }

  async handleCapturaNombre(session, mensaje) {
      session.datos.nombre = mensaje;
      session.estado = ESTADOS.CAPTURA_EMAIL;
      return { texto: '¿Tu email para enviártelo?', botones: [] };
  }

  async handleCapturaEmail(session, mensaje) {
      if (!mensaje.includes('@')) return { texto: 'Email no válido. Intenta de nuevo:', botones: [] };
      session.datos.email = mensaje;
      session.estado = ESTADOS.CAPTURA_TELEFONO;
      return { texto: 'Por último, un teléfono de contacto:', botones: [] };
  }

  async handleCapturaTelefono(session, mensaje) {
      session.datos.telefono = mensaje;
      session.estado = ESTADOS.FINALIZADO;
      
      // Enviar
      const leadData = {
          sessionId: session.sessionId,
          userAgent: session.userAgent,
          servicio_nombre: session.datos.servicio_final.nombre_servicio,
          categoria: session.datos.servicio_final.categoria,
          tipo_legal: session.datos.tipo_legal,
          urgencia: session.datos.urgencia,
          ubicacion: session.datos.ubicacion,
          nombre: session.datos.nombre,
          email: session.datos.email,
          telefono: session.datos.telefono,
          descripcion_caso: session.datos.descripcion_caso,
          rol_cliente: session.datos.rol_cliente,
          tipo_cliente: session.datos.tipo_cliente,
          vip: session.datos.vip || false,
          lang: session.datos.lang || 'es',
          conversacion: this.formatearConversacion(session.historial)
      };
      
      await this.email.enviarLead(leadData);
      await this.writer.guardarLead(leadData);
      await this.sessionStore.delete(session.sessionId);
      
      return { texto: `Gracias ${session.datos.nombre}. Un perito revisará tu caso y te contactará en breve.`, botones: [] };
  }

  formatearConversacion(hist) {
      return hist.map(m => `[${m.role}]: ${m.content}`).join('\n');
  }
}

// ============================================================================
// 6. WORKER ENTRY POINT
// ============================================================================

export default {
  async fetch(request, env, ctx) {
    if (env.SHEETS_API_KEY) CONFIG.SHEETS_API_KEY = env.SHEETS_API_KEY;
    if (env.SPREADSHEET_ID) CONFIG.SPREADSHEET_ID = env.SPREADSHEET_ID;
    if (env.GOOGLE_SERVICE_ACCOUNT_EMAIL) CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    if (env.GOOGLE_PRIVATE_KEY) CONFIG.GOOGLE_PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY;
    if (env.OPENAI_API_KEY) CONFIG.OPENAI_API_KEY = env.OPENAI_API_KEY;
    if (env.EMAIL_DESTINO) CONFIG.EMAIL_DESTINO = env.EMAIL_DESTINO;
    
    const chatbot = new ChatbotHandler(env);
    const url = new URL(request.url);
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { sessionId, mensaje, userLang } = body;
        const userAgent = request.headers.get('User-Agent') || '';
        const respuesta = await chatbot.handleMessage(sessionId, mensaje, userAgent, userLang);
        return new Response(JSON.stringify(respuesta), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }
    
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};
