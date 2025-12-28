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
    console.log('[Chatbot] v2 loaded - SVG support enabled');
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
   * Añade listeners para click y touch de forma segura
   */
  addSafeClick(element, callback) {
    if (!element) return;
    
    let isScrolling = false;
    element.addEventListener('touchstart', () => { isScrolling = false; }, { passive: true });
    element.addEventListener('touchmove', () => { isScrolling = true; }, { passive: true });
    
    element.addEventListener('touchend', (e) => {
      if (!isScrolling) {
        e.preventDefault();
        e.stopPropagation();
        callback(e);
      }
    });
    
    element.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      callback(e);
    });
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
      downloadButton: document.getElementById('download-chat'),
      restartButton: document.getElementById('restart-chat'),
      messages: document.getElementById('chat-messages'),
      input: document.getElementById('chat-input'),
      sendButton: document.getElementById('send-button'),
      resizeHandle: document.getElementById('chat-resize-handle'),
      // Modal elements
      restartModal: document.getElementById('restart-confirm-modal'),
      cancelRestart: document.getElementById('cancel-restart'),
      confirmRestart: document.getElementById('confirm-restart'),
      downloadModal: document.getElementById('download-confirm-modal'),
      cancelDownload: document.getElementById('cancel-download'),
      confirmDownload: document.getElementById('confirm-download'),
    };

    // Verificar que existen los elementos
    if (!this.elements.widget) {
      console.error('[Chatbot] Widget no encontrado en el DOM');
      return;
    }

    // Event listeners principales (usando click estándar para mayor compatibilidad)
    if (this.elements.button) {
      this.addSafeClick(this.elements.button, () => {
        this.toggleChat();
      });
    }
    
    if (this.elements.closeButton) {
      this.addSafeClick(this.elements.closeButton, () => {
        this.toggleChat();
      });
    }
    
    if (this.elements.downloadButton) {
      this.addSafeClick(this.elements.downloadButton, () => {
        console.log('[Chatbot] Click en descargar');
        this.showDownloadModal();
      });
    } else {
      console.warn('[Chatbot] Botón de descarga no encontrado en el DOM');
    }

    if (this.elements.restartButton) {
      this.addSafeClick(this.elements.restartButton, () => {
        console.log('[Chatbot] Click en reiniciar');
        this.showRestartModal();
      });
    }

    // Modal listeners
    if (this.elements.cancelRestart) {
      this.elements.cancelRestart.addEventListener('click', (e) => {
        e.preventDefault();
        this.hideRestartModal();
      });
    }
    if (this.elements.confirmRestart) {
      this.elements.confirmRestart.addEventListener('click', (e) => {
        e.preventDefault();
        this.restartChat();
        this.hideRestartModal();
      });
    }
    if (this.elements.cancelDownload) {
      this.elements.cancelDownload.addEventListener('click', (e) => {
        e.preventDefault();
        this.hideDownloadModal();
      });
    }
    if (this.elements.confirmDownload) {
      this.elements.confirmDownload.addEventListener('click', (e) => {
        e.preventDefault();
        this.downloadHistory();
        this.hideDownloadModal();
      });
    }

    if (this.elements.sendButton) {
      this.elements.sendButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.sendMessage();
      });
    }
    
    if (this.elements.input) {
      this.elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !this.isWaitingResponse) {
          this.sendMessage();
        }
      });
    }

    // Inicializar resize móvil
    if (this.elements.resizeHandle) {
      this.initMobileResize();
    }

    // Auto-abrir si está configurado
    if (this.config.autoOpen) {
      setTimeout(() => this.toggleChat(true), 1000);
    }

    console.log('[Chatbot] Inicializado correctamente');
  }

  /**
   * Inicializa la lógica de redimensionado para móvil
   */
  initMobileResize() {
    let startY, startHeight;
    const windowEl = this.elements.window;

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startHeight = windowEl.offsetHeight;
      windowEl.classList.add('resizing');
    };

    const onTouchMove = (e) => {
      if (!startY) return;
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY; // Arrastrar hacia arriba aumenta la altura
      const newHeight = startHeight + deltaY;
      
      // Límites (20vh a 95vh)
      const vh = window.innerHeight;
      if (newHeight > vh * 0.2 && newHeight < vh * 0.95) {
        windowEl.style.height = `${newHeight}px`;
      }
      
      // Prevenir scroll de la página mientras se redimensiona
      e.preventDefault();
    };

    const onTouchEnd = () => {
      startY = null;
      windowEl.classList.remove('resizing');
    };

    this.elements.resizeHandle.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', (e) => {
      if (windowEl.classList.contains('resizing')) {
        onTouchMove(e);
      }
    }, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  }

  /**
   * Genera un UUID simple
   */
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Obtiene o crea el ID de sesión persistente
   */
  generateSessionId() {
    let sessionId = localStorage.getItem('chat_session_id');
    if (!sessionId) {
      sessionId = this.generateUUID();
      localStorage.setItem('chat_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Muestra el modal de confirmación de reinicio
   */
  showRestartModal() {
    if (this.elements.restartModal) {
      this.elements.restartModal.classList.remove('hidden');
      this.elements.restartModal.style.display = 'flex'; // For widget.html compatibility
      // Forzar reflow
      void this.elements.restartModal.offsetWidth;
      this.elements.restartModal.style.opacity = '1';
    }
  }

  /**
   * Oculta el modal de confirmación de reinicio
   */
  hideRestartModal() {
    if (this.elements.restartModal) {
      this.elements.restartModal.style.opacity = '0';
      setTimeout(() => {
        this.elements.restartModal.classList.add('hidden');
        this.elements.restartModal.style.display = 'none'; // For widget.html compatibility
      }, 200);
    }
  }

  /**
   * Muestra el modal de confirmación de descarga
   */
  showDownloadModal() {
    if (this.elements.downloadModal) {
      this.elements.downloadModal.classList.remove('hidden');
      this.elements.downloadModal.style.display = 'flex'; // For widget.html compatibility
      // Forzar reflow
      void this.elements.downloadModal.offsetWidth;
      this.elements.downloadModal.style.opacity = '1';
    }
  }

  /**
   * Oculta el modal de confirmación de descarga
   */
  hideDownloadModal() {
    if (this.elements.downloadModal) {
      this.elements.downloadModal.style.opacity = '0';
      setTimeout(() => {
        this.elements.downloadModal.classList.add('hidden');
        this.elements.downloadModal.style.display = 'none'; // For widget.html compatibility
      }, 200);
    }
  }

  /**
   * Toggle del chat (abrir/cerrar)
   */
  toggleChat(forceOpen = null) {
    this.isOpen = forceOpen !== null ? forceOpen : !this.isOpen;
    
    this.elements.window.classList.toggle('open', this.isOpen);
    document.body.classList.toggle('chat-open', this.isOpen);
    
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
    // Comprobar si hay sesión previa para recuperar historial
    const existingSession = localStorage.getItem('chat_session_id');
    if (existingSession) {
      try {
        const response = await fetch(this.config.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: this.config.sessionId,
            action: 'recover_history'
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.historial && data.historial.length > 0) {
            // Renderizar historial
            data.historial.forEach(msg => {
              // Mapear 'assistant' a 'bot' para el frontend
              const tipo = msg.role === 'assistant' ? 'bot' : 'user';
              this.addMessage(msg.content, tipo, msg.botones);
            });
            return; // Salir, ya hemos cargado el estado
          }
        }
      } catch (e) {
        console.warn('[Chatbot] No se pudo recuperar historial:', e);
      }
    }

    // Si no hay historial o falló, iniciar normal
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
    this.elements.input.focus(); // Mantener foco después de enviar

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

    // Detectar idioma
    const currentLang = document.documentElement.lang || 'es';

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.config.sessionId,
          mensaje: mensaje,
          userLang: currentLang
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
      // Recuperar foco al terminar de recibir respuesta
      if (this.isOpen && !('ontouchstart' in window)) { // Solo en desktop para evitar teclado virtual en móvil
        this.elements.input.focus();
      }
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
    bubble.innerHTML = texto;
    messageDiv.appendChild(bubble);

    // Botones (si los hay)
    if (botones && botones.length > 0) {
      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'mt-2 flex flex-col gap-2 text-left';

      botones.forEach(btn => {
        // Detectar si es link explícitamente o si el valor parece una URL
        const isLink = btn.type === 'link' || (typeof btn.value === 'string' && btn.value.startsWith('http'));

        if (isLink) {
          const link = document.createElement('a');
          link.href = btn.value;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.innerHTML = btn.text;
          link.className = 'bg-white border-2 border-cyan-600 text-cyan-700 py-3 px-4 rounded-lg cursor-pointer text-sm font-medium transition-all duration-300 ease-out text-left flex items-center gap-2 hover:bg-cyan-600 hover:text-white hover:translate-x-1 hover:shadow-md active:translate-x-0.5 no-underline block w-full';
          
          // Fix para clicks en móvil
          let isScrolling = false;
          link.addEventListener('touchstart', () => { isScrolling = false; }, { passive: true });
          link.addEventListener('touchmove', () => { isScrolling = true; }, { passive: true });
          link.addEventListener('touchend', (e) => {
            if (!isScrolling) {
              e.preventDefault();
              window.open(link.href, '_blank');
            }
          });

          buttonsDiv.appendChild(link);
        } else {
          const button = document.createElement('button');
          button.innerHTML = btn.text;
          button.dataset.value = btn.value;
          button.className = 'bg-white border-2 border-cyan-600 text-cyan-700 py-3 px-4 rounded-lg cursor-pointer text-sm font-medium transition-all duration-300 ease-out text-left flex items-center gap-2 hover:bg-cyan-600 hover:text-white hover:translate-x-1 hover:shadow-md active:translate-x-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0';
          button.addEventListener('click', (e) => this.handleButtonClick(e, btn.value, btn.text));
          buttonsDiv.appendChild(button);
        }
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

  /**
   * Reinicia la conversación completamente
   */
  restartChat() {
    // 1. Limpiar UI
    this.elements.messages.innerHTML = '';
    this.elements.input.value = '';
    
    // 2. Limpiar estado local
    localStorage.removeItem('chat_session_id');
    this.config.sessionId = this.generateUUID(); // Generar nuevo ID forzado
    localStorage.setItem('chat_session_id', this.config.sessionId);
    
    this.conversationStarted = false;
    this.isWaitingResponse = false;
    
    // 3. Iniciar nueva conversación
    this.initChat();
  }

  /**
   * Descarga el historial de chat
   */
  downloadHistory() {
    console.log('[Chatbot] Iniciando descarga de historial...');
    const messages = Array.from(this.elements.messages.children);
    
    if (messages.length === 0) {
        console.warn('[Chatbot] No hay mensajes para descargar');
        alert("No hay mensajes para descargar.");
        return;
    }

    let text = "HISTORIAL DE CHAT - PERITO.BARCELONA\n";
    text += "====================================\n\n";
    text += `Fecha: ${new Date().toLocaleString()}\n`;
    text += `ID Sesión: ${this.config.sessionId}\n\n`;
    
    let count = 0;
    messages.forEach(msg => {
      // Ignorar indicadores de escritura
      if (msg.classList.contains('typing-indicator') || msg.id.startsWith('typing-')) return;
      
      // Detectar rol basado en la clase de alineación
      const isUser = msg.classList.contains('text-right');
      
      // Buscar la burbuja de texto (primer div hijo)
      const bubble = msg.querySelector('div'); 
      
      if (bubble) {
        // Clonar para limpiar HTML tags y obtener solo texto
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = bubble.innerHTML;
        
        // Limpiar botones si los hubiera (están en otro div hermano, pero por si acaso)
        const buttons = tempDiv.querySelectorAll('button, a');
        buttons.forEach(b => b.remove());

        const content = (tempDiv.innerText || tempDiv.textContent).trim();
        
        if (content) {
            const role = isUser ? "Usuario" : "Asistente";
            text += `[${role}]: ${content}\n\n`;
            count++;
        }
      }
    });

    console.log(`[Chatbot] Procesados ${count} mensajes`);
    
    try {
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `perito-barcelona-chat-${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            console.log('[Chatbot] Descarga completada');
        }, 100);
    } catch (e) {
        console.error('[Chatbot] Error generando descarga:', e);
        alert('Error al generar el archivo de descarga.');
    }
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
