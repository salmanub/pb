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
};

// ============================================================================
// SYSTEM PROMPT - ASISTENTE JUNIOR DE PERITAJE
// ============================================================================

const SYSTEM_PROMPT = `Eres el Asistente Junior de Peritaje de Perito.barcelona, especializado en ingeniería forense y patología de la edificación.

TU MISIÓN: Investigar y cualificar casos técnicos para que el perito senior pueda preparar un presupuesto preciso ANTES de la llamada.

FLUJO DE INVESTIGACIÓN (4 PASOS):

PASO 1 - IDENTIFICACIÓN DEL PROBLEMA:
Ya se muestra al usuario un menú con categorías principales (Vicios Ocultos, Daños Alquiler, Accidentes, etc.)
Tu trabajo es confirmar la selección y pasar al Paso 2.

PASO 2 - DETERMINAR ROL DEL CLIENTE:
Pregunta sutilmente según el tipo de caso:
- Daños en alquiler: "¿Eres el propietario que reclama o el inquilino?"
- Vicios ocultos: "¿Eres el comprador afectado o el vendedor?"
- Accidentes: "¿Eres la parte afectada o el causante del daño?"
- Estructuras/construcción: "¿Eres el propietario del inmueble?"

PASO 3 - DESCRIPCIÓN TÉCNICA DEL CASO (CRÍTICO):
Esta es la fase MÁS IMPORTANTE. Debes obtener información técnica concreta para calcular presupuesto:

Para DAÑOS EN ALQUILER:
"Para valorar el coste del informe pericial, necesito que me describas brevemente los daños principales:
- ¿Qué elementos están afectados? (pavimento, instalaciones, paredes, techos...)
- ¿Aproximadamente cuántos metros cuadrados?
- ¿Hay daños estructurales visibles?"

Para VICIOS OCULTOS:
"Descríbeme el defecto detectado:
- ¿Qué tipo de problema es? (grietas, humedad, defecto construcción...)
- ¿Desde cuándo lo observas?
- ¿Qué superficie o zona afecta?"

Para ACCIDENTES:
"Para preparar la reconstrucción, necesito saber:
- ¿Tipo de accidente? (tráfico, laboral, otro)
- ¿Qué elementos están involucrados?
- ¿Hay víctimas o solo daños materiales?"

Para ESTRUCTURAS:
"Describe el problema estructural:
- ¿Tipo de daño? (grietas, fisuras, deformaciones...)
- ¿Localización en el edificio?
- ¿Ha empeorado recientemente?"

PASO 4 - CAPTURA DE CONTACTO:
Solo después de tener descripción del caso: "Recibido. Es un caso valorable. ¿En qué población está el inmueble?"

TONO Y ESTILO:
- Directo, técnico, profesional (como un ingeniero tomando datos)
- NUNCA uses: "¡Genial!", "¡Perfecto!", "Lamento tu problema"
- SÍ usa: "Entendido", "Recibido", "Necesito saber", "Para valorar el caso..."
- Respuestas breves (máximo 3-4 líneas)
- NO des consejos legales ni promesas de solución

RESTRICCIONES:
- NO avances al siguiente paso sin la información del paso actual
- NO uses emojis en tus respuestas (solo en botones predefinidos)
- NO especules sobre costes o resultados
- Si el usuario da información vaga, haz preguntas específicas: "¿Cuántos metros cuadrados aproximadamente?", "¿Qué tipo de grieta? (vertical, horizontal, diagonal)"

EJEMPLO DE FLUJO CORRECTO:
Usuario: [Selecciona "Daños Alquiler"]
Bot: "¿Eres el propietario que reclama o el inquilino?"
Usuario: "Soy propietario, me han destrozado la nave"
Bot: "Entendido. Para valorar el informe, descríbeme los daños: ¿Qué elementos están afectados y aproximadamente cuántos m²?"
Usuario: "Han arrancado toda la instalación eléctrica y el pavimento está roto, unos 200m²"
Bot: "Recibido. Es un caso reclamable con daños cuantificables. ¿En qué población está la nave?"

Tu objetivo es recopilar un RESUMEN TÉCNICO completo antes de pedir el teléfono.`;

// ============================================================================
// MÁQUINA DE ESTADOS
// ============================================================================

const ESTADOS = {
  INICIO: 'inicio',
  TRIAJE_NIVEL_1: 'triaje_nivel_1',
  TRIAJE_NIVEL_2: 'triaje_nivel_2',
  CAPTURA_ROL_CLIENTE: 'captura_rol_cliente',
  CAPTURA_DESCRIPCION_CASO: 'captura_descripcion_caso',
  CUALIFICACION_JURIDICA: 'cualificacion_juridica',
  CAPTURA_UBICACION: 'captura_ubicacion',
  CAPTURA_NOMBRE: 'captura_nombre',
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
  
  async chat(messages, contextoVenta = null) {
    const systemMessage = {
      role: 'system',
      content: SYSTEM_PROMPT + (contextoVenta ? `\n\nCONTEXTO DE VENTA ACTUAL:\n${contextoVenta}` : ''),
    };
    
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
        max_tokens: 200, // Respuestas breves
      }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
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
    
    // Preparar la fila de datos (ACTUALIZADO con nuevas columnas)
    const fecha = new Date().toISOString();
    const fila = [
      fecha, // A: Fecha
      leadData.nombre, // B: Nombre
      leadData.telefono, // C: Teléfono
      leadData.ubicacion, // D: Ubicación
      leadData.servicio_nombre, // E: Servicio
      leadData.categoria, // F: Categoría
      leadData.tipo_legal, // G: Tipo Legal
      leadData.urgencia || 'Normal', // H: Urgencia
      leadData.sessionId, // I: Session ID
      'PENDIENTE', // J: Estado
      '', // K: Notas (vacío inicialmente)
      leadData.descripcion_caso || '', // L: Descripción del Caso (NUEVA COLUMNA)
      leadData.rol_cliente || '', // M: Rol del Cliente (NUEVA COLUMNA)
    ];
    
    // Anexar a la hoja "Leads"
    const range = 'Leads!A:M'; // ACTUALIZADO: ahora incluye columnas L y M
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
    
    return response.ok;
  }
}

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
   * Procesa un mensaje del usuario
   */
  async handleMessage(sessionId, mensaje, userAgent = '') {
    let session = sessionStore.get(sessionId);
    
    // Nueva sesión
    if (!session) {
      session = {
        estado: ESTADOS.INICIO,
        historial: [],
        datos: {},
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
    
    // Procesar según el estado actual
    let respuesta;
    
    switch (session.estado) {
      case ESTADOS.INICIO:
        respuesta = await this.handleInicio(session);
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
        
      case ESTADOS.CAPTURA_TELEFONO:
        respuesta = await this.handleCapturaTelefono(session, mensaje);
        break;
        
      default:
        respuesta = {
          texto: 'Error en el sistema. Por favor, reinicia la conversación.',
          botones: [],
        };
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
   * FASE 1: INICIO - Saludo y botones nivel 1
   */
  async handleInicio(session) {
    const botones = await this.generarBotonesTriaje(1);
    
    session.estado = ESTADOS.TRIAJE_NIVEL_1;
    
    return {
      texto: 'Hola, soy el Asistente de Peritaje de Perito.barcelona. ¿En qué tipo de caso puedo ayudarte?',
      botones,
    };
  }
  
  /**
   * FASE 1.1: TRIAJE NIVEL 1 - Usuario selecciona categoría principal
   */
  async handleTriajeNivel1(session, mensaje) {
    // Buscar el servicio seleccionado
    const servicio = await this.sheets.getServicioBySlug(mensaje);
    
    if (!servicio) {
      return {
        texto: 'No he entendido la selección. Por favor, elige una de las opciones:',
        botones: await this.generarBotonesTriaje(1),
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
        texto: servicio.pregunta_filtro,
        botones: hijos.map(h => ({
          type: 'button',
          text: `${h.icono} ${h.nombre_servicio}`,
          value: h.slug,
        })),
      };
    } else {
      // No tiene hijos, pasar a captura de ROL del cliente
      session.datos.servicio_final = servicio;
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
          { type: 'button', text: '🏢 Propietario', value: 'propietario' },
          { type: 'button', text: '🔑 Inquilino', value: 'inquilino' },
        ];
      } else if (categoria.includes('vicio') || categoria.includes('compraventa')) {
        pregunta = '¿Eres el comprador afectado o el vendedor?';
        botones = [
          { type: 'button', text: '🛒 Comprador afectado', value: 'comprador' },
          { type: 'button', text: '🏠 Vendedor', value: 'vendedor' },
        ];
      } else if (categoria.includes('accidente')) {
        pregunta = '¿Eres la parte afectada o el causante?';
        botones = [
          { type: 'button', text: '😟 Parte afectada', value: 'afectado' },
          { type: 'button', text: '⚠️ Causante', value: 'causante' },
        ];
      } else {
        // Caso genérico para estructuras, construcción, etc.
        pregunta = '¿Cuál es tu situación?';
        botones = [
          { type: 'button', text: '🏠 Soy el propietario', value: 'propietario' },
          { type: 'button', text: '👷 Soy el constructor/promotor', value: 'constructor' },
          { type: 'button', text: '👤 Otra situación', value: 'otro' },
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
      const categoria = session.datos.servicio_final.categoria.toLowerCase();
      const nombre = session.datos.servicio_final.nombre_servicio;
      let pregunta = '';
      
      if (categoria.includes('alquiler')) {
        pregunta = `Para valorar el coste del informe pericial de ${nombre}, necesito que me describas brevemente los daños principales:
        
• ¿Qué elementos están afectados? (pavimento, instalaciones, paredes, techos...)
• ¿Aproximadamente cuántos metros cuadrados?
• ¿Hay daños estructurales visibles?`;
      } else if (categoria.includes('vicio') || categoria.includes('grieta') || categoria.includes('humedad')) {
        pregunta = `Descríbeme el defecto detectado en ${nombre}:
        
• ¿Qué tipo de problema es? (grietas, humedad, defecto construcción...)
• ¿Desde cuándo lo observas?
• ¿Qué superficie o zona afecta?`;
      } else if (categoria.includes('accidente')) {
        pregunta = `Para preparar la reconstrucción del accidente, necesito saber:
        
• ¿Tipo de accidente? (tráfico, laboral, atropello, otro)
• ¿Qué elementos están involucrados?
• ¿Hay víctimas o solo daños materiales?`;
      } else if (categoria.includes('estructura') || categoria.includes('construcción')) {
        pregunta = `Describe el problema estructural de ${nombre}:
        
• ¿Tipo de daño? (grietas, fisuras, deformaciones...)
• ¿Localización en el edificio?
• ¿Ha empeorado recientemente?`;
      } else {
        // Pregunta genérica
        pregunta = `Para valorar el caso de ${nombre}, descríbeme brevemente:
        
• ¿Cuál es el problema principal?
• ¿Qué superficie o elementos afecta?
• ¿Desde cuándo se observa?`;
      }
      
      return {
        texto: pregunta,
        botones: [],
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
        texto: '¿Existe ya una demanda judicial en curso o es una reclamación previa?',
        botones: [
          { type: 'button', text: '📜 Ya hay demanda judicial', value: 'demanda' },
          { type: 'button', text: '🛡️ Reclamación previa/Extrajudicial', value: 'reclamacion' },
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
    } else {
      return {
        texto: 'Por favor, selecciona una de las opciones:',
        botones: [
          { type: 'button', text: '📜 Ya hay demanda judicial', value: 'demanda' },
          { type: 'button', text: '🛡️ Reclamación previa/Extrajudicial', value: 'reclamacion' },
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
      telefono: session.datos.telefono,
      descripcion_caso: session.datos.descripcion_caso, // NUEVA COLUMNA
      rol_cliente: session.datos.rol_cliente, // NUEVA COLUMNA
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

const chatbot = new ChatbotHandler();

export default {
  async fetch(request, env, ctx) {
    // Aplicar configuración desde env
    if (env.SHEETS_API_KEY) CONFIG.SHEETS_API_KEY = env.SHEETS_API_KEY;
    if (env.SPREADSHEET_ID) CONFIG.SPREADSHEET_ID = env.SPREADSHEET_ID;
    if (env.GOOGLE_SERVICE_ACCOUNT_EMAIL) CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    if (env.GOOGLE_PRIVATE_KEY) CONFIG.GOOGLE_PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY;
    if (env.OPENAI_API_KEY) CONFIG.OPENAI_API_KEY = env.OPENAI_API_KEY;
    if (env.EMAIL_DESTINO) CONFIG.EMAIL_DESTINO = env.EMAIL_DESTINO;
    
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
