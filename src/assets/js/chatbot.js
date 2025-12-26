/**
 * CHATBOT PERITO.BARCELONA - Cliente JavaScript
 * 
 * Sistema de triaje técnico para captura de leads cualificados
 * Integrado en el sitio 11ty como componente modular
 */

class PeritoChatbot {
  constructor(config = {}) {
    // Configuración
    this.config = {
      apiUrl: config.apiUrl || window.PERITO_CHATBOT_CONFIG?.apiUrl || 'https://perito-chatbot.workers.dev/api/chat',
      autoOpen: config.autoOpen || window.PERITO_CHATBOT_CONFIG?.autoOpen || false,
      theme: config.theme || window.PERITO_CHATBOT_CONFIG?.theme || 'dark',
      sessionId: this.generateSessionId(),
    };

    // Estado
    this.isOpen = false;
    this.isWaitingResponse = false;
    this.conversationStarted = false;

    // Elementos DOM
    this.elements = {};
    
    // Inicializar
    this.init();
  }

  /**
   * Inicialización del chatbot
   */
  init() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Setup de elementos y eventos
   */
  setup() {
    // Obtener referencias a elementos DOM
    this.elements = {
      widget: document.getElementById('perito-chat-widget'),
      button: document.getElementById('chat-button'),
      window: document.getElementById('chat-window'),
      closeButton: document.getElementById('close-chat'),
      messages: document.getElementById('chat-messages'),
      input: document.getElementById('chat-input'),
      sendButton: document.getElementById('send-button'),
    };

    // Verificar que existen los elementos
    if (!this.elements.widget) {
      console.error('[Chatbot] Widget no encontrado en el DOM');
      return;
    }

    // Event listeners
    this.elements.button.addEventListener('click', () => this.toggleChat());
    this.elements.closeButton.addEventListener('click', () => this.toggleChat());
    this.elements.sendButton.addEventListener('click', () => this.sendMessage());
    
    this.elements.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.isWaitingResponse) {
        this.sendMessage();
      }
    });

    // Auto-abrir si está configurado
    if (this.config.autoOpen) {
      setTimeout(() => this.toggleChat(true), 1000);
    }

    console.log('[Chatbot] Inicializado correctamente');
  }

  /**
   * Genera un ID de sesión único
   */
  generateSessionId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    return `session_${timestamp}_${random}`;
  }

  /**
   * Toggle del chat (abrir/cerrar)
   */
  toggleChat(forceOpen = null) {
    this.isOpen = forceOpen !== null ? forceOpen : !this.isOpen;
    
    this.elements.window.classList.toggle('open', this.isOpen);
    
    if (this.isOpen) {
      this.elements.input.focus();
      
      // Iniciar conversación si es la primera vez
      if (!this.conversationStarted) {
        this.conversationStarted = true;
        this.initChat();
      }
    }
  }

  /**
   * Inicializa el chat con el primer mensaje del bot
   */
  async initChat() {
    await this.sendToBot('inicio');
  }

  /**
   * Envía un mensaje del usuario
   */
  async sendMessage() {
    const mensaje = this.elements.input.value.trim();
    
    if (!mensaje || this.isWaitingResponse) {
      return;
    }

    // Mostrar mensaje del usuario
    this.addMessage(mensaje, 'user');
    this.elements.input.value = '';

    // Enviar al bot
    await this.sendToBot(mensaje);
  }

  /**
   * Envía un mensaje al backend
   */
  async sendToBot(mensaje) {
    this.isWaitingResponse = true;
    this.updateInputState();

    // Mostrar indicador de escritura
    const typingId = this.showTypingIndicator();

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.config.sessionId,
          mensaje: mensaje,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Quitar indicador de escritura
      this.removeTypingIndicator(typingId);

      // Mostrar respuesta del bot
      this.addMessage(data.texto, 'bot', data.botones);

      // Analytics (opcional)
      this.trackEvent('mensaje_recibido', {
        tiene_botones: data.botones && data.botones.length > 0,
      });

    } catch (error) {
      console.error('[Chatbot] Error:', error);
      this.removeTypingIndicator(typingId);
      
      // Obtener el teléfono de metadata si está disponible
      const telefono = window.PERITO_METADATA?.contact?.phoneNumber || '+34 614 194 985';
      
      this.addMessage(
        `Error de conexión. Por favor, intenta de nuevo o contacta directamente al ${telefono}.`,
        'bot'
      );

      // Analytics error
      this.trackEvent('error_conexion', {
        error: error.message,
      });
    } finally {
      this.isWaitingResponse = false;
      this.updateInputState();
    }
  }

  /**
   * Añade un mensaje al chat
   */
  addMessage(texto, tipo, botones = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message mb-4 ${tipo === 'user' ? 'text-right' : 'text-left'}`;

    // Burbuja de mensaje
    const bubble = document.createElement('div');
    if (tipo === 'bot') {
      bubble.className = 'inline-block py-3 px-4 rounded-2xl rounded-bl-sm max-w-[85%] bg-white text-slate-900 border border-gray-200 text-left text-sm leading-relaxed';
    } else {
      bubble.className = 'inline-block py-3 px-4 rounded-2xl rounded-br-sm max-w-[85%] bg-cyan-600 text-white text-sm leading-relaxed';
    }
    bubble.textContent = texto;
    messageDiv.appendChild(bubble);

    // Botones (si los hay)
    if (botones && botones.length > 0) {
      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'mt-2 flex flex-col gap-2 text-left';

      botones.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.dataset.value = btn.value;
        button.className = 'bg-white border-2 border-cyan-600 text-cyan-700 py-3 px-4 rounded-lg cursor-pointer text-sm font-medium transition-all duration-300 ease-out text-left flex items-center gap-2 hover:bg-cyan-600 hover:text-white hover:translate-x-1 hover:shadow-md active:translate-x-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0';
        button.addEventListener('click', (e) => this.handleButtonClick(e, btn.value, btn.text));
        buttonsDiv.appendChild(button);
      });

      messageDiv.appendChild(buttonsDiv);
    }

    this.elements.messages.appendChild(messageDiv);
    this.scrollToBottom();
  }

  /**
   * Maneja el click en un botón de opción
   */
  async handleButtonClick(event, value, displayText) {
    if (this.isWaitingResponse) {
      return;
    }

    // Deshabilitar todos los botones de este grupo
    const buttonsContainer = event.target.closest('.message-buttons');
    if (buttonsContainer) {
      const buttons = buttonsContainer.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
      });
      
      // Resaltar el botón seleccionado
      event.target.classList.add('bg-cyan-600', 'text-white', 'border-cyan-600');
    }

    // Mostrar como mensaje del usuario
    this.addMessage(displayText, 'user');

    // Enviar al bot el valor (no el texto del botón)
    await this.sendToBot(value);

    // Analytics
    this.trackEvent('boton_clickeado', {
      valor: value,
      texto: displayText,
    });
  }

  /**
   * Muestra el indicador de escritura
   */
  showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message mb-4 text-left';
    const id = `typing-${Date.now()}`;
    typingDiv.id = id;

    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator inline-flex items-center gap-1 py-3 px-4 bg-white rounded-2xl rounded-bl-sm border border-gray-200';
    indicator.innerHTML = '<span class="inline-block w-2 h-2 rounded-full bg-gray-500"></span><span class="inline-block w-2 h-2 rounded-full bg-gray-500"></span><span class="inline-block w-2 h-2 rounded-full bg-gray-500"></span>';

    typingDiv.appendChild(indicator);
    this.elements.messages.appendChild(typingDiv);
    this.scrollToBottom();

    return id;
  }

  /**
   * Quita el indicador de escritura
   */
  removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  }

  /**
   * Actualiza el estado del input y botón de envío
   */
  updateInputState() {
    this.elements.input.disabled = this.isWaitingResponse;
    this.elements.sendButton.disabled = this.isWaitingResponse;
    
    if (this.isWaitingResponse) {
      this.elements.sendButton.classList.add('loading');
    } else {
      this.elements.sendButton.classList.remove('loading');
    }
  }

  /**
   * Scroll al final del chat
   */
  scrollToBottom() {
    this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
  }

  /**
   * Track de eventos (Google Analytics, Plausible, etc.)
   */
  trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'chatbot',
        ...properties,
      });
    }

    // Plausible Analytics
    if (typeof plausible !== 'undefined') {
      plausible(eventName, { props: properties });
    }

    // Console log para debug
    console.log('[Chatbot Analytics]', eventName, properties);
  }

  /**
   * API pública: Abrir chat programáticamente
   */
  open() {
    this.toggleChat(true);
  }

  /**
   * API pública: Cerrar chat programáticamente
   */
  close() {
    this.toggleChat(false);
  }

  /**
   * API pública: Resetear conversación
   */
  reset() {
    this.config.sessionId = this.generateSessionId();
    this.conversationStarted = false;
    this.elements.messages.innerHTML = '';
    this.elements.input.value = '';
  }
}

// Inicializar chatbot automáticamente cuando se carga el script
let peritoChatbotInstance = null;

function initPeritoChatbot(config = {}) {
  if (peritoChatbotInstance) {
    console.warn('[Chatbot] Ya está inicializado');
    return peritoChatbotInstance;
  }

  peritoChatbotInstance = new PeritoChatbot(config);
  
  // Exponer en window para acceso global
  window.peritoChatbot = peritoChatbotInstance;
  
  return peritoChatbotInstance;
}

// Auto-inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPeritoChatbot());
} else {
  initPeritoChatbot();
}

// Exportar para módulos ES6 (si se usa)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PeritoChatbot;
}
