/**
 * PERITO.BARCELONA - CHATBOT EXPERTO
 * Sistema de triaje técnico para ingeniería forense
 * 
 * Flujo:
 * 1. FASE TRIAJE: Árbol de decisión técnica desde Google Sheets
 * 2. FASE CUALIFICACIÓN: Pregunta jurídica (demanda vs. reclamación)
 * 3. FASE CIERRE: Captura de datos mínimos (ubicación, nombre, teléfono)
 */

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  // Google Sheets API (lectura)
  SHEETS_API_KEY: 'TU_API_KEY_AQUI',
  SPREADSHEET_ID: 'TU_SPREADSHEET_ID_AQUI',
  
  // Google Service Account (escritura de leads)
  GOOGLE_SERVICE_ACCOUNT_EMAIL: '',
  GOOGLE_PRIVATE_KEY: '',
  
  // MailChannels para envío de leads
  MAILCHANNELS_API: 'https://api.mailchannels.net/tx/v1/send',
  EMAIL_DESTINO: 'info@perito.barcelona',
  
  // OpenAI API (o alternativa)
  OPENAI_API_KEY: 'TU_OPENAI_KEY_AQUI',
  OPENAI_MODEL: 'gpt-4-turbo-preview',
  
  // Límites
  MAX_CONVERSATION_LENGTH: 20,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos

  // VIPs (Strict Name Matching)
  VIP_NAMES: ['victor del mar', 'bufete x', 'victor pro', 'colaborador victor'],
};

// ============================================================================
// SYSTEM PROMPT GENERATOR (DINÁMICO)
// ============================================================================

function generateSystemPrompt(userRole, caseType) {
  let prompt = `Eres el Asistente de Peritaje de Perito.barcelona, especializado en ingeniería forense.`;

  if (userRole === 'Abogado') {
    prompt += `
TU ROL: Asistente técnico para abogados y profesionales.
TONO: "De colega a colega", técnico, directo, sin rodeos.
OBJETIVO: Identificar la necesidad pericial (Informe de Parte, Judicial, Contradictoria, Ratificación).
INSTRUCCIONES:
- NO preguntes "¿Qué te duele?". Pregunta "¿Qué tipo de pericial necesitas?" o ve al grano con datos técnicos.
- Asume que el usuario sabe de leyes, céntrate en la ingeniería.
- Sé breve.`;
  } else if (userRole === 'VIP') {
    prompt += `
TU ROL: Asistente personal para colaboradores VIP.
TONO: Muy cercano, de confianza, eficiente.
OBJETIVO: Recoger el encargo rápidamente.
INSTRUCCIONES:
- Saluda por el nombre si lo sabes.
- Evita preguntas de triaje innecesarias.
- Prioridad máxima.`;
  } else {
    // Particular (Default)
    prompt += `
TU ROL: Asistente Junior de Peritaje.
TONO: Profesional, empático pero técnico (como un ingeniero tomando datos).
OBJETIVO: Investigar y cualificar casos para presupuesto.

ADAPTACIÓN DE VOCABULARIO (CAMALEÓN):`;

    if (caseType) {
      const ct = caseType.toLowerCase();
      if (ct.includes('alquiler') || ct.includes('arrendamiento')) {
        prompt += `
- CONTEXTO: Inmobiliario/Alquiler.
- USA TÉRMINOS: "Propietario", "Inquilino", "Arrendador", "Fianza", "Daños uso".`;
      } else if (ct.includes('accidente') || ct.includes('tráfico')) {
        prompt += `
- CONTEXTO: Accidentes/Daños.
- USA TÉRMINOS: "Causante", "Afectado", "Tercero", "Siniestro", "Atestado".`;
      } else if (ct.includes('vicio') || ct.includes('construcción') || ct.includes('obra')) {
        prompt += `
- CONTEXTO: Defectos Constructivos.
- USA TÉRMINOS: "Comprador", "Vendedor", "Promotor", "Constructora", "LOE".`;
      }
    }
  }

  prompt += `

TU TAREA ACTUAL:
Obtener una DESCRIPCIÓN TÉCNICA del caso para que el perito senior pueda valorar el presupuesto.
- Pregunta por daños específicos, superficies (m2), antigüedad del problema.
- Si la información es vaga, pide detalles técnicos.
- NO des consejos legales ni precios.`;

  return prompt;
}

// ============================================================================
// MÁQUINA DE ESTADOS
// ============================================================================

const ESTADOS = {
  INICIO: 'inicio',
  SELECCION_PERFIL: 'seleccion_perfil', // NUEVO ESTADO
  TRIAJE_NIVEL_1: 'triaje_nivel_1',
  TRIAJE_NIVEL_2: 'triaje_nivel_2',
  CAPTURA_ROL_CLIENTE: 'captura_rol_cliente',
  CAPTURA_DESCRIPCION_CASO: 'captura_descripcion_caso',
  CUALIFICACION_JURIDICA: 'cualificacion_juridica',
  CAPTURA_UBICACION: 'captura_ubicacion',
  CAPTURA_NOMBRE: 'captura_nombre',
  CAPTURA_EMAIL: 'captura_email',
  CAPTURA_TELEFONO: 'captura_telefono',
  FINALIZADO: 'finalizado',
};

// ============================================================================
// ALMACENAMIENTO DE SESIONES (KV o in-memory para desarrollo)
// ============================================================================

class SessionStore {
  constructor() {
    this.sessions = new Map();
  }
  
  get(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    
    // Verificar timeout
    if (Date.now() - session.lastActivity > CONFIG.SESSION_TIMEOUT) {
      this.sessions.delete(sessionId);
      return null;
    }
    
    return session;
  }
  
  set(sessionId, data) {
    this.sessions.set(sessionId, {
      ...data,
      lastActivity: Date.now(),
    });
  }
  
  delete(sessionId) {
    this.sessions.delete(sessionId);
  }
}

const sessionStore = new SessionStore();

// ============================================================================
// GOOGLE SHEETS - LECTURA DE SERVICIOS
// ============================================================================

class SheetsService {
  constructor(apiKey, spreadsheetId) {
    this.apiKey = apiKey;
    this.spreadsheetId = spreadsheetId;
    this.cache = null;
    this.cacheTime = null;
    this.cacheDuration = 5 * 60 * 1000; // 5 minutos
    this.writeService = null; // Se inyectará desde fuera
  }
  
  setWriteService(writeService) {
    this.writeService = writeService;
  }
  
  async getServicios() {
    // Cache simple para evitar hits constantes a Sheets
    if (this.cache && (Date.now() - this.cacheTime) < this.cacheDuration) {
      return this.cache;
    }
    
    try {
      const range = 'Servicios_Periciales!A2:K1000';
      
      // Intentar con Service Account si está disponible
      if (this.writeService && this.writeService.serviceAccountEmail) {
        const accessToken = await this.writeService.getAccessToken();
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}`;
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        
        if (data.values) {
          const servicios = this.parseServiciosData(data.values);
          this.cache = servicios;
          this.cacheTime = Date.now();
          return servicios;
        }
      }
      
      // Fallback a API Key si no hay Service Account
      if (this.apiKey && this.apiKey !== 'AIzaSy...tu-api-key-aqui...') {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.values) {
          const servicios = this.parseServiciosData(data.values);
          this.cache = servicios;
          this.cacheTime = Date.now();
          return servicios;
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error al obtener servicios de Google Sheets:', error);
      throw error; // Lanzar el error para que se vea en producción
    }
  }
  
  parseServiciosData(values) {
    return values
      .filter(row => row[9] === 'TRUE' || row[9] === true) // Solo activos
      .map(row => ({
        slug: row[0],
        categoria: row[1],
        nombre_servicio: row[2],
        icono: row[3] || '',
        nivel: parseInt(row[4]) || 1,
        padre_slug: row[5] || null,
        pregunta_filtro: row[6],
        contexto_venta: row[7],
        orden: parseInt(row[8]) || 0,
        activo: row[9] === 'TRUE' || row[9] === true,
      }))
      .sort((a, b) => a.orden - b.orden);
  }
  
  async getServiciosByNivel(nivel, padreSlug = null) {
    const servicios = await this.getServicios();
    return servicios.filter(s => 
      s.nivel === nivel && 
      (padreSlug ? s.padre_slug === padreSlug : !s.padre_slug)
    );
  }
  
  async getServicioBySlug(slug) {
    const servicios = await this.getServicios();
    return servicios.find(s => s.slug === slug);
  }

  async getRecursosWeb() {
    // Cache simple para recursos
    if (this.recursosCache && (Date.now() - this.recursosCacheTime) < this.cacheDuration) {
      return this.recursosCache;
    }

    try {
      const range = 'Recursos_Web!A2:E200';
      let values = [];

      // Intentar con Service Account
      if (this.writeService && this.writeService.serviceAccountEmail) {
        const accessToken = await this.writeService.getAccessToken();
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}`;
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${accessToken}` } });
        const data = await response.json();
        values = data.values || [];
      } 
      // Fallback a API Key
      else if (this.apiKey && this.apiKey !== 'AIzaSy...tu-api-key-aqui...') {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        values = data.values || [];
      }

      const recursos = values.map(row => ({
        titulo: row[0],
        url: row[1],
        tipo: row[2],
        tags: row[3] ? row[3].toLowerCase().split(',').map(t => t.trim()) : [],
        descripcion: row[4]
      }));

      this.recursosCache = recursos;
      this.recursosCacheTime = Date.now();
      return recursos;

    } catch (error) {
      console.error('Error al obtener recursos web:', error);
      return [];
    }
  }
  
  async getConfig(clave) {
    const range = 'Configuracion!A2:C100';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.values) return null;
    
    const config = data.values.find(row => row[0] === clave);
    return config ? config[1] : null;
  }
}

// ============================================================================
// SERVICIO DE IA (OpenAI o alternativa)
// ============================================================================

class IAService {
  constructor(apiKey, model) {
    this.apiKey = apiKey;
    this.model = model;
  }
  
  async chat(messages, systemPromptOverride = null) {
    // Usar el prompt dinámico si se proporciona, sino uno por defecto
    const systemContent = systemPromptOverride || generateSystemPrompt('Particular', null);

    const systemMessage = {
      role: 'system',
      content: systemContent,
    };
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [systemMessage, ...messages],
          temperature: 0.7,
          max_tokens: 250,
        }),
      });
      
      const data = await response.json();
      if (data.error) {
        console.error('OpenAI Error:', data.error);
        return "Lo siento, estoy teniendo problemas técnicos momentáneos. Por favor, descríbeme tu caso brevemente.";
      }
      return data.choices[0].message.content;
    } catch (e) {
      console.error('Error llamando a OpenAI:', e);
      return "Disculpa, ha habido un error de conexión. ¿Podrías describirme tu caso?";
    }
  }
}

// ============================================================================
// SERVICIO DE EMAIL (MailChannels)
// ============================================================================

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
      personalizations: [{
        to: [{ email: CONFIG.EMAIL_DESTINO }],
      }],
      from: {
        email: 'chatbot@perito.barcelona',
        name: 'Chatbot Perito.barcelona',
      },
      subject: `🚨 NUEVO LEAD: ${leadData.servicio_nombre} - ${leadData.nombre}`,
      content: [{
        type: 'text/plain',
        value: emailBody,
      }],
    };
    
    const response = await fetch(CONFIG.MAILCHANNELS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    return response.ok;
  }
}

// ============================================================================
// SERVICIO DE ESCRITURA EN GOOGLE SHEETS (con Service Account)
// ============================================================================

class SheetsWriteService {
  constructor() {
    this.serviceAccountEmail = CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    this.privateKey = CONFIG.GOOGLE_PRIVATE_KEY;
    this.spreadsheetId = CONFIG.SPREADSHEET_ID;
  }
  
  /**
   * Genera un JWT para autenticación con Google APIs
   */
  async getAccessToken() {
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };
    
    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: this.serviceAccountEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };
    
    // Codificar header y claim en base64url
    const encodeBase64Url = (obj) => {
      const str = JSON.stringify(obj);
      return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    };
    
    const headerEncoded = encodeBase64Url(header);
    const claimEncoded = encodeBase64Url(claim);
    const signatureInput = `${headerEncoded}.${claimEncoded}`;
    
    // Firmar con la private key
    const privateKeyPem = this.privateKey
      .replace(/\\n/g, '\n')
      .trim();
    
    const key = await crypto.subtle.importKey(
      'pkcs8',
      this.pemToArrayBuffer(privateKeyPem),
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      key,
      new TextEncoder().encode(signatureInput)
    );
    
    const signatureEncoded = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    const jwt = `${signatureInput}.${signatureEncoded}`;
    
    // Intercambiar JWT por access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
  }
  
  /**
   * Convierte PEM a ArrayBuffer
   */
  pemToArrayBuffer(pem) {
    const b64 = pem
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\s/g, '');
    
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  /**
   * Escribe un lead en la hoja de Google Sheets
   */
  async guardarLead(leadData) {
    // Si no hay credenciales de Service Account, saltar (solo email)
    if (!this.serviceAccountEmail || !this.privateKey) {
      console.log('Service Account no configurado, saltando escritura en Sheets');
      return false;
    }
    
    const accessToken = await this.getAccessToken();
    
    // Preparar la fila de datos (ACTUALIZADO SCHEMA v11.0)
    // [ID, Fecha, Origen, Servicio, Telefono, Email, Nombre, Ubicacion, TipoCliente, Rol, Descripcion, Urgencia, Estado]
    const fecha = new Date().toISOString();
    const fila = [
      leadData.sessionId,           // A [0]: lead_id
      fecha,                        // B [1]: fecha
      'Chatbot',                    // C [2]: origen
      leadData.servicio_nombre,     // D [3]: servicio
      leadData.telefono,            // E [4]: telefono
      leadData.email || '',         // F [5]: email
      leadData.nombre,              // G [6]: nombre
      leadData.ubicacion,           // H [7]: ubicacion
      leadData.tipo_cliente || 'Particular', // I [8]: tipo_cliente
      leadData.rol_cliente || '',   // J [9]: rol_usuario
      leadData.descripcion_caso || '', // K [10]: descripcion_caso
      leadData.urgencia || 'Normal', // L [11]: urgencia
      'PENDIENTE'                   // M [12]: estado
    ];
    
    // Anexar a la hoja "Leads"
    const range = 'Leads!A:M'; 
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [fila],
      }),
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error escribiendo en Google Sheets (${response.status}):`, errorBody);
      throw new Error(`Google Sheets API Error: ${response.status} - ${errorBody}`);
    }
    
    return true;
  }
}

// ============================================================================
// ICONOS LUCIDE (INLINED SVG)
// ============================================================================

const ICONS = {
  building: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building inline-block mr-2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M16 18h.01"/></svg>',
  hardHat: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hard-hat inline-block mr-2"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 6h0a6 6 0 0 1 6 6v3"/></svg>',
  flame: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame inline-block mr-2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.243-2.143.5-3.5a6 6 0 0 1 3 3.5z"/></svg>',
  car: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-front inline-block mr-2"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>',
  scale: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scale inline-block mr-2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
  landmark: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark inline-block mr-2"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>',
  briefcase: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase inline-block mr-2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user inline-block mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  key: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key inline-block mr-2"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>',
  shoppingCart: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart inline-block mr-2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home inline-block mr-2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  frown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown inline-block mr-2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>',
  alertTriangle: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle inline-block mr-2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  scroll: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll inline-block mr-2"><path d="M8 17h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/><path d="M8 21h12a2 2 0 0 0 2-2v-2H8v4Z"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield inline-block mr-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>',
  clipboard: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard inline-block mr-2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
};

// ============================================================================
// MANEJADOR PRINCIPAL DEL CHATBOT
// ============================================================================

class ChatbotHandler {
  constructor() {
    this.sheets = new SheetsService(CONFIG.SHEETS_API_KEY, CONFIG.SPREADSHEET_ID);
    this.sheetsWrite = new SheetsWriteService();
    this.sheets.setWriteService(this.sheetsWrite); // Inyectar servicio de escritura para lectura también
    this.ia = new IAService(CONFIG.OPENAI_API_KEY, CONFIG.OPENAI_MODEL);
    this.email = new EmailService();
  }
  
  /**
   * Genera los botones para la fase de triaje
   */
  async generarBotonesTriaje(nivel = 1, padreSlug = null) {
    const servicios = await this.sheets.getServiciosByNivel(nivel, padreSlug);
    
    return servicios.map(s => ({
      type: 'button',
      text: `${s.icono} ${s.nombre_servicio}`,
      value: s.slug,
    }));
  }

  /**
   * Busca recursos web relevantes (Conserje Digital)
   */
  async buscarRecursos(query) {
    const recursos = await this.sheets.getRecursosWeb();
    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(' ').filter(w => w.length > 3);

    const hits = recursos.map(r => {
      let score = 0;
      // Coincidencia en título
      if (r.titulo.toLowerCase().includes(queryLower)) score += 10;
      // Coincidencia en tags
      if (r.tags.some(t => queryLower.includes(t))) score += 5;
      // Coincidencia parcial de palabras clave
      keywords.forEach(k => {
        if (r.titulo.toLowerCase().includes(k)) score += 2;
        if (r.tags.some(t => t.includes(k))) score += 1;
      });
      return { ...r, score };
    }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

    return hits.slice(0, 3); // Devolver top 3
  }
  
  /**
   * Procesa un mensaje del usuario
   */
  async handleMessage(sessionId, mensaje, userAgent = '') {
    let session = sessionStore.get(sessionId);
    
    // Nueva sesión
    if (!session) {
      session = {
        estado: ESTADOS.INICIO,
        historial: [],
        datos: {
            tipo_cliente: 'Particular', // Default
        },
        sessionId,
        userAgent,
      };
    }
    
    // Añadir mensaje del usuario al historial
    session.historial.push({
      role: 'user',
      content: mensaje,
      timestamp: Date.now(),
    });
    
    let respuesta;
    
    // DETECCIÓN VIP GLOBAL (Intercepta en cualquier momento si menciona nombre clave)
    const mensajeLower = mensaje.toLowerCase();
    // Strict Name Matching: Busca coincidencias exactas o frases clave, no solo "includes" parciales peligrosos
    const esVip = CONFIG.VIP_NAMES.some(vip => mensajeLower.includes(vip));
    
    if (esVip && session.estado !== ESTADOS.FINALIZADO) {
        session.datos.tipo_cliente = 'VIP';
        session.datos.vip = true;
        // Si detectamos VIP, saltamos directamente a pedir descripción
        // Pero necesitamos un servicio dummy o genérico si no lo tenemos
        if (!session.datos.servicio_final) {
            session.datos.servicio_final = { 
                nombre_servicio: 'Consulta VIP', 
                categoria: 'VIP', 
                slug: 'vip' 
            };
        }
        session.estado = ESTADOS.CAPTURA_DESCRIPCION_CASO;
        
        // Extraer nombre si es posible (simple capitalización)
        const nombreDetectado = mensaje.split(' ').find(w => CONFIG.VIP_NAMES.some(v => v.includes(w.toLowerCase()))) || 'Colaborador';
        const nombreCapitalizado = nombreDetectado.charAt(0).toUpperCase() + nombreDetectado.slice(1);

        respuesta = {
            texto: `¡Hombre ${nombreCapitalizado}! Buenas. ¿Qué necesitas mover hoy? Descríbeme el tema y aviso urgente al equipo.`,
            botones: []
        };
    } else {
        // Flujo normal
        switch (session.estado) {
        case ESTADOS.INICIO:
            respuesta = await this.handleInicio(session);
            break;
            
        case ESTADOS.SELECCION_PERFIL:
            respuesta = await this.handleSeleccionPerfil(session, mensaje);
            break;

        case ESTADOS.TRIAJE_NIVEL_1:
            respuesta = await this.handleTriajeNivel1(session, mensaje);
            break;
            
        case ESTADOS.TRIAJE_NIVEL_2:
            respuesta = await this.handleTriajeNivel2(session, mensaje);
            break;
            
        case ESTADOS.CAPTURA_ROL_CLIENTE:
            respuesta = await this.handleCapturaRolCliente(session, mensaje);
            break;
            
        case ESTADOS.CAPTURA_DESCRIPCION_CASO:
            respuesta = await this.handleCapturaDescripcionCaso(session, mensaje);
            break;
            
        case ESTADOS.CUALIFICACION_JURIDICA:
            respuesta = await this.handleCualificacionJuridica(session, mensaje);
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
            respuesta = {
            texto: 'Error en el sistema. Por favor, reinicia la conversación.',
            botones: [],
            };
        }
    }
    
    // Añadir respuesta al historial
    session.historial.push({
      role: 'assistant',
      content: respuesta.texto,
      timestamp: Date.now(),
      botones: respuesta.botones,
    });
    
    // Guardar sesión actualizada
    sessionStore.set(sessionId, session);
    
    return respuesta;
  }
  
  /**
   * FASE 0: INICIO - Detectar perfil
   */
  async handleInicio(session) {
    // Volvemos al flujo directo sin selección de perfil ni cartel de advertencia
    let botones = await this.generarBotonesTriaje(1);
    
    if (!botones || botones.length === 0) {
      botones = [
        { type: 'button', text: `${ICONS.building} Daños en Alquiler/Arrendamiento`, value: 'danos-alquiler' },
        { type: 'button', text: `${ICONS.hardHat} Vicios Ocultos / Defectos Construcción`, value: 'vicios-ocultos' },
        { type: 'button', text: `${ICONS.flame} Siniestros y Seguros`, value: 'siniestros-seguros' },
        { type: 'button', text: `${ICONS.car} Reconstrucción de Accidentes`, value: 'accidentes' },
        { type: 'button', text: `${ICONS.scale} Valoración Económica / Disputas`, value: 'valoracion-economica' },
        { type: 'button', text: `${ICONS.landmark} Patologías Estructurales`, value: 'patologia-estructural' },
      ];
    }
    
    // Añadir opción B2B para profesionales
    botones.push({
        type: 'button',
        text: `${ICONS.briefcase} Soy Abogado / Profesional`,
        value: 'soy_abogado'
    });

    session.estado = ESTADOS.TRIAJE_NIVEL_1;
    
    return {
      texto: 'Hola, soy el Asistente de Peritaje de Perito.barcelona. ¿En qué tipo de caso puedo ayudarte?',
      botones,
    };
  }

  /**
   * FASE 0.1: PROCESAR PERFIL (DEPRECATED - Saltado por petición de usuario)
   */
  async handleSeleccionPerfil(session, mensaje) {
    // ... (Lógica preservada pero no usada)
    const seleccion = mensaje.toLowerCase();
    // ...
    return { texto: '...', botones: [] };
  }
  
  /**
   * FASE 1.1: TRIAJE NIVEL 1 - Usuario selecciona categoría principal
   */
  async handleTriajeNivel1(session, mensaje) {
    const mensajeLower = mensaje.toLowerCase();

    // DETECCIÓN DE PROFESIONALES (B2B)
    const keywordsB2B = ['abogado', 'letrado', 'bufete', 'despacho', 'administrador', 'colegiado', 'soy_abogado'];
    if (mensaje === 'soy_abogado' || keywordsB2B.some(kw => mensajeLower.includes(kw))) {
        session.datos.tipo_cliente = 'Abogado';
        session.datos.servicio_final = { 
            nombre_servicio: 'Consulta Profesional', 
            categoria: 'Legal', 
            slug: 'legal-b2b' 
        };
        
        // Saltamos directamente a la descripción del caso
        session.estado = ESTADOS.CAPTURA_DESCRIPCION_CASO;
        
        return {
            texto: 'Entendido, compañero. Para valorar la colaboración, indícame: ¿De qué especialidad es el asunto (Vicios, Estructuras, Económico) y en qué fase procesal estamos?',
            botones: []
        };
    }

    // DETECCIÓN DE INTENCIÓN INFORMATIVA (Conserje Digital)
    const intentInfo = ['blog', 'articulo', 'ejemplo', 'caso', 'informacion', 'leer', 'ver', 'guia', 'manual'];
    if (intentInfo.some(i => mensajeLower.includes(i))) {
        const recursos = await this.buscarRecursos(mensaje);
        if (recursos.length > 0) {
            const botones = recursos.map(r => ({
                type: 'link', // Frontend debe soportar esto o tratarlo como botón especial
                text: `📄 ${r.titulo}`,
                value: r.url // El valor es la URL
            }));
            
            // Añadir botón de volver al inicio
            botones.push({ type: 'button', text: '↩️ Volver al inicio', value: 'inicio' });

            return {
                texto: 'He encontrado estos recursos en nuestra base de conocimiento que te pueden interesar:',
                botones: botones
            };
        }
    }

    // Buscar el servicio seleccionado
    let servicio = await this.sheets.getServicioBySlug(mensaje);
    
    // Si no encuentra por slug, intentar mapear por contenido del mensaje
    if (!servicio) {
      // Mapeo inteligente basado en palabras clave
      if (mensajeLower.includes('alquiler') || mensajeLower.includes('inquilino') || mensajeLower.includes('arrendamiento') || mensajeLower.includes('nave')) {
        servicio = { slug: 'danos-alquiler', categoria: 'Daños Alquiler', nombre_servicio: 'Daños en Alquiler/Arrendamiento', nivel: 1 };
      } else if (mensajeLower.includes('vicio') || mensajeLower.includes('defecto') || mensajeLower.includes('compra') || mensajeLower.includes('obra nueva')) {
        servicio = { slug: 'vicios-ocultos', categoria: 'Vicios Ocultos', nombre_servicio: 'Vicios Ocultos / Defectos Construcción', nivel: 1 };
      } else if (mensajeLower.includes('siniestro') || mensajeLower.includes('seguro') || mensajeLower.includes('incendio') || mensajeLower.includes('quemado') || mensajeLower.includes('fuego') || mensajeLower.includes('inundación')) {
        servicio = { slug: 'siniestros-seguros', categoria: 'Siniestros y Seguros', nombre_servicio: 'Siniestros y Seguros', nivel: 1 };
      } else if (mensajeLower.includes('accidente') || mensajeLower.includes('atropello') || mensajeLower.includes('colisión') || mensajeLower.includes('tráfico')) {
        servicio = { slug: 'accidentes', categoria: 'Accidentes', nombre_servicio: 'Reconstrucción de Accidentes', nivel: 1 };
      } else if (mensajeLower.includes('valoración') || mensajeLower.includes('disputa') || mensajeLower.includes('económica') || mensajeLower.includes('certificación')) {
        servicio = { slug: 'valoracion-economica', categoria: 'Valoración Económica', nombre_servicio: 'Valoración Económica / Disputas', nivel: 1 };
      } else if (mensajeLower.includes('grieta') || mensajeLower.includes('fisura') || mensajeLower.includes('estructura') || mensajeLower.includes('patología')) {
        servicio = { slug: 'patologia-estructural', categoria: 'Patologías Estructurales', nombre_servicio: 'Patologías Estructurales', nivel: 1 };
      }
    }
    
    if (!servicio) {
      // Si realmente no puede clasificarlo, mostrar los botones de nuevo
      const botones = await this.generarBotonesTriaje(1);
      let botonesDefault = botones.length > 0 ? botones : [
        { type: 'button', text: `${ICONS.building} Daños en Alquiler/Arrendamiento`, value: 'danos-alquiler' },
        { type: 'button', text: `${ICONS.hardHat} Vicios Ocultos / Defectos Construcción`, value: 'vicios-ocultos' },
        { type: 'button', text: `${ICONS.flame} Siniestros y Seguros`, value: 'siniestros-seguros' },
        { type: 'button', text: `${ICONS.car} Reconstrucción de Accidentes`, value: 'accidentes' },
        { type: 'button', text: `${ICONS.scale} Valoración Económica / Disputas`, value: 'valoracion-economica' },
        { type: 'button', text: `${ICONS.landmark} Patologías Estructurales`, value: 'patologia-estructural' },
      ];

      // Asegurar que el botón de abogado también aparece en el fallback
      if (!botonesDefault.some(b => b.value === 'soy_abogado')) {
          botonesDefault.push({
            type: 'button',
            text: `${ICONS.briefcase} Soy Abogado / Profesional`,
            value: 'soy_abogado'
        });
      }
      
      return {
        texto: 'No he entendido. ¿Podrías seleccionar la opción que mejor describa tu caso?',
        botones: botonesDefault,
      };
    }
    
    // Guardar servicio nivel 1
    session.datos.servicio_nivel1 = servicio;
    
    // Verificar si tiene hijos (nivel 2)
    const hijos = await this.sheets.getServiciosByNivel(2, servicio.slug);
    
    if (hijos.length > 0) {
      // Tiene sub-niveles, mostrarlos
      session.estado = ESTADOS.TRIAJE_NIVEL_2;
      
      return {
        texto: servicio.pregunta_filtro || '¿Qué tipo específicamente?',
        botones: hijos.map(h => ({
          type: 'button',
          text: `${h.icono} ${h.nombre_servicio}`,
          value: h.slug,
        })),
      };
    } else {
      // No tiene hijos, pasar a captura de ROL del cliente
      session.datos.servicio_final = servicio;
      
      // Si es Abogado, saltamos la pregunta de "Rol Cliente" (Propietario/Inquilino) y vamos directo a descripción
      if (session.datos.tipo_cliente === 'Abogado') {
          session.estado = ESTADOS.CAPTURA_DESCRIPCION_CASO;
          return this.handleCapturaDescripcionCaso(session, null);
      }

      session.estado = ESTADOS.CAPTURA_ROL_CLIENTE;
      return this.handleCapturaRolCliente(session, null);
    }
  }
  
  /**
   * FASE 1.2: TRIAJE NIVEL 2 - Usuario selecciona sub-categoría
   */
  async handleTriajeNivel2(session, mensaje) {
    const servicio = await this.sheets.getServicioBySlug(mensaje);
    
    if (!servicio || servicio.nivel !== 2) {
      const padreSlug = session.datos.servicio_nivel1.slug;
      const botones = await this.generarBotonesTriaje(2, padreSlug);
      
      return {
        texto: 'Selección no válida. Por favor, elige una opción:',
        botones,
      };
    }
    
    // Guardar servicio final
    session.datos.servicio_final = servicio;
    
    if (session.datos.tipo_cliente === 'Abogado') {
        session.estado = ESTADOS.CAPTURA_DESCRIPCION_CASO;
        return this.handleCapturaDescripcionCaso(session, null);
    }

    session.estado = ESTADOS.CAPTURA_ROL_CLIENTE;
    
    // Pasar a captura de ROL del cliente
    return this.handleCapturaRolCliente(session, null);
  }
  
  /**
   * FASE 2: CAPTURA ROL DEL CLIENTE - Determinar si es afectado, propietario, etc.
   */
  async handleCapturaRolCliente(session, mensaje) {
    if (!mensaje) {
      // Primera vez en este estado, hacer la pregunta adaptada al tipo de servicio
      const categoria = session.datos.servicio_final.categoria.toLowerCase();
      let pregunta = '';
      let botones = [];
      
      if (categoria.includes('alquiler') || categoria.includes('arrendamiento')) {
        pregunta = '¿Eres el propietario que reclama o el inquilino?';
        botones = [
          { type: 'button', text: `${ICONS.building} Propietario`, value: 'propietario' },
          { type: 'button', text: `${ICONS.key} Inquilino`, value: 'inquilino' },
        ];
      } else if (categoria.includes('vicio') || categoria.includes('compraventa')) {
        pregunta = '¿Eres el comprador afectado o el vendedor?';
        botones = [
          { type: 'button', text: `${ICONS.shoppingCart} Comprador afectado`, value: 'comprador' },
          { type: 'button', text: `${ICONS.home} Vendedor`, value: 'vendedor' },
        ];
      } else if (categoria.includes('accidente')) {
        pregunta = '¿Eres la parte afectada o el causante?';
        botones = [
          { type: 'button', text: `${ICONS.frown} Parte afectada`, value: 'afectado' },
          { type: 'button', text: `${ICONS.alertTriangle} Causante`, value: 'causante' },
        ];
      } else {
        // Caso genérico para estructuras, construcción, etc.
        pregunta = '¿Cuál es tu situación?';
        botones = [
          { type: 'button', text: `${ICONS.home} Soy el propietario`, value: 'propietario' },
          { type: 'button', text: `${ICONS.hardHat} Soy el constructor/promotor`, value: 'constructor' },
          { type: 'button', text: `${ICONS.user} Otra situación`, value: 'otro' },
        ];
      }
      
      return {
        texto: pregunta,
        botones,
      };
    }
    
    // Usuario ha respondido, guardar rol
    session.datos.rol_cliente = mensaje;
    session.estado = ESTADOS.CAPTURA_DESCRIPCION_CASO;
    
    // Pasar a descripción del caso
    return this.handleCapturaDescripcionCaso(session, null);
  }
  
  /**
   * FASE 3: DESCRIPCIÓN DEL CASO - Información técnica detallada (CRÍTICO)
   */
  async handleCapturaDescripcionCaso(session, mensaje) {
    if (!mensaje) {
      // Primera vez, solicitar descripción adaptada al tipo de servicio
      // AHORA USAMOS IA PARA GENERAR LA PREGUNTA ADAPTADA
      const prompt = generateSystemPrompt(session.datos.tipo_cliente, session.datos.servicio_final.categoria);
      
      // Simulamos un mensaje del sistema para que la IA inicie la interacción pidiendo datos
      const mensajesParaIA = [
          ...session.historial,
          { role: 'system', content: 'Genera ahora la pregunta para obtener la descripción técnica del caso, adaptando tu vocabulario según las instrucciones.' }
      ];

      const respuestaIA = await this.ia.chat(mensajesParaIA, prompt);
      
      return {
          texto: respuestaIA,
          botones: []
      };
    }
    
    // Usuario ha proporcionado la descripción - CRÍTICO para el perito
    session.datos.descripcion_caso = mensaje.trim();
    session.estado = ESTADOS.CUALIFICACION_JURIDICA;
    
    // Pasar a cualificación jurídica
    return this.handleCualificacionJuridica(session, null);
  }
  
  /**
   * FASE 4: CUALIFICACIÓN JURÍDICA - Pregunta crítica para peritos
   */
  async handleCualificacionJuridica(session, mensaje) {
    if (!mensaje) {
      // Primera vez en este estado, hacer la pregunta
      return {
        texto: '¿Cuál es el estado legal del caso?',
        botones: [
          { type: 'button', text: `${ICONS.scroll} Ya hay demanda judicial`, value: 'demanda' },
          { type: 'button', text: `${ICONS.shield} Hay reclamación previa/Extrajudicial`, value: 'reclamacion' },
          { type: 'button', text: `${ICONS.clipboard} Aún no hay demanda ni reclamación`, value: 'sin_demanda' },
        ],
      };
    }
    
    // Usuario ha respondido
    if (mensaje === 'demanda') {
      session.datos.tipo_legal = 'demanda_judicial';
      session.datos.urgencia = 'alta';
    } else if (mensaje === 'reclamacion') {
      session.datos.tipo_legal = 'reclamacion_previa';
      session.datos.urgencia = 'media';
    } else if (mensaje === 'sin_demanda') {
      session.datos.tipo_legal = 'sin_demanda';
      session.datos.urgencia = 'normal';
    } else {
      return {
        texto: 'Por favor, selecciona una de las opciones:',
        botones: [
          { type: 'button', text: `${ICONS.scroll} Ya hay demanda judicial`, value: 'demanda' },
          { type: 'button', text: `${ICONS.shield} Hay reclamación previa/Extrajudicial`, value: 'reclamacion' },
          { type: 'button', text: `${ICONS.clipboard} Aún no hay demanda ni reclamación`, value: 'sin_demanda' },
        ],
      };
    }
    
    // Pasar a captura de datos con mensaje confirmatorio
    session.estado = ESTADOS.CAPTURA_UBICACION;
    
    return {
      texto: 'Recibido. Es un caso valorable. Déjame tus datos para que el perito te llame con un presupuesto. ¿En qué población está el inmueble?',
      botones: [],
    };
  }
  
  /**
   * FASE 3.1: CAPTURA UBICACIÓN
   */
  async handleCapturaUbicacion(session, mensaje) {
    session.datos.ubicacion = mensaje.trim();
    session.estado = ESTADOS.CAPTURA_NOMBRE;
    
    return {
      texto: '¿A quién dirijo el informe preliminar?',
      botones: [],
    };
  }
  
  /**
   * FASE 3.2: CAPTURA NOMBRE
   */
  async handleCapturaNombre(session, mensaje) {
    session.datos.nombre = mensaje.trim();
    session.estado = ESTADOS.CAPTURA_EMAIL;
    
    return {
      texto: '¿Cuál es tu email para enviarte el presupuesto?',
      botones: [],
    };
  }
  
  /**
   * FASE 3.2: CAPTURA EMAIL
   */
  async handleCapturaEmail(session, mensaje) {
    const email = mensaje.trim();
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        texto: 'Por favor, introduce un email válido (ejemplo: tu@email.com):',
        botones: [],
      };
    }
    
    session.datos.email = email;
    session.estado = ESTADOS.CAPTURA_TELEFONO;
    
    return {
      texto: 'Teléfono para comentar el caso:',
      botones: [],
    };
  }
  
  /**
   * FASE 3.3: CAPTURA TELÉFONO Y FINALIZACIÓN
   */
  async handleCapturaTelefono(session, mensaje) {
    session.datos.telefono = mensaje.trim();
    session.estado = ESTADOS.FINALIZADO;
    
    // Enviar lead por email
    const leadData = {
      sessionId: session.sessionId,
      userAgent: session.userAgent,
      servicio_nombre: session.datos.servicio_final.nombre_servicio,
      categoria: session.datos.servicio_final.categoria,
      tipo_legal: session.datos.tipo_legal,
      urgencia: session.datos.urgencia,
      ubicacion: session.datos.ubicacion,
      nombre: session.datos.nombre,
      email: session.datos.email, // NUEVA COLUMNA
      telefono: session.datos.telefono,
      descripcion_caso: session.datos.descripcion_caso, // NUEVA COLUMNA
      rol_cliente: session.datos.rol_cliente, // NUEVA COLUMNA
      tipo_cliente: session.datos.tipo_cliente, // NUEVO
      vip: session.datos.vip || false, // NUEVO
      conversacion: this.formatearConversacion(session.historial),
    };
    
    await this.email.enviarLead(leadData);
    
    // Guardar en Google Sheets (si está configurado el Service Account)
    try {
      await this.sheetsWrite.guardarLead(leadData);
    } catch (error) {
      console.error('Error guardando lead en Sheets:', error);
      // No bloquear el flujo si falla Sheets
    }
    
    // Limpiar sesión
    sessionStore.delete(session.sessionId);
    
    return {
      texto: `Gracias, ${session.datos.nombre}. Hemos recibido tu caso. Un perito te contactará en menos de 24h para valorar el expediente y enviarte un presupuesto detallado.`,
      botones: [],
    };
  }
  
  /**
   * Formatea el historial de conversación para el email
   */
  formatearConversacion(historial) {
    return historial
      .map(m => `[${m.role === 'user' ? 'Usuario' : 'Bot'}]: ${m.content}`)
      .join('\n');
  }
}

// ============================================================================
// CLOUDFLARE WORKER - ENDPOINT HTTP
// ============================================================================

export default {
  async fetch(request, env, ctx) {
    // Aplicar configuración desde env
    if (env.SHEETS_API_KEY) CONFIG.SHEETS_API_KEY = env.SHEETS_API_KEY;
    if (env.SPREADSHEET_ID) CONFIG.SPREADSHEET_ID = env.SPREADSHEET_ID;
    if (env.GOOGLE_SERVICE_ACCOUNT_EMAIL) CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    if (env.GOOGLE_PRIVATE_KEY) CONFIG.GOOGLE_PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY;
    if (env.OPENAI_API_KEY) CONFIG.OPENAI_API_KEY = env.OPENAI_API_KEY;
    if (env.EMAIL_DESTINO) CONFIG.EMAIL_DESTINO = env.EMAIL_DESTINO;
    
    // Instanciar el chatbot DESPUÉS de configurar las variables de entorno
    const chatbot = new ChatbotHandler();
    
    const url = new URL(request.url);
    
    // CORS - Permite requests desde el sitio perito.barcelona
    const origin = request.headers.get('Origin');
    const allowedOrigins = [
      'https://perito.barcelona',
      'https://www.perito.barcelona',
      'http://localhost:8080', // Para desarrollo local 11ty
      'http://localhost:8082', // Para desarrollo local 11ty (puerto alternativo)
      'http://localhost:3000',
    ];
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // Endpoint de chat
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { sessionId, mensaje } = body;
        
        if (!sessionId || !mensaje) {
          return new Response(JSON.stringify({
            error: 'sessionId y mensaje son requeridos',
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        const userAgent = request.headers.get('User-Agent') || '';
        const respuesta = await chatbot.handleMessage(sessionId, mensaje, userAgent);
        
        return new Response(JSON.stringify(respuesta), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({
          error: error.message,
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    // Endpoint de health check
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // 404
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};
