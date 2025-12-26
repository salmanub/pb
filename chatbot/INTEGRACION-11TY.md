# INTEGRACIÓN DEL CHATBOT EN 11TY

Guía completa para integrar el chatbot como componente Nunjucks en el sitio perito.barcelona.

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
src/
├── _data/
│   └── chatbot.json                    # Configuración del chatbot
├── _includes/
│   └── components/
│       └── chatbot.njk                 # Componente principal
├── assets/
│   ├── js/
│   │   └── chatbot.js                  # Lógica del cliente
│   └── styles/
│       └── chatbot.css                 # Estilos del widget

chatbot/
├── worker.js                           # Cloudflare Worker (backend)
├── wrangler.toml                       # Config Cloudflare
└── sheets-schema.json                  # Esquema Google Sheets
```

---

## 🚀 PASO 1: INTEGRAR EN EL LAYOUT BASE

Edita `src/_includes/layouts/base.njk` y añade el componente antes del cierre de `</body>`:

```njk
    {# ... contenido existente ... #}
    
    {# Chatbot - Mostrar solo si está habilitado #}
    {% if chatbot.enabled %}
      {% include "components/chatbot.njk" %}
    {% endif %}
    
  </body>
</html>
```

---

## 🎨 PASO 2: CONFIGURAR EN _data/chatbot.json

El archivo ya está creado en `src/_data/chatbot.json`. Ajusta la URL del API:

```json
{
  "chatbot": {
    "apiUrl": "https://TU-WORKER.workers.dev/api/chat",
    "autoOpen": false,
    "theme": "dark",
    "enabled": true
  }
}
```

**Parámetros**:
- `apiUrl`: URL del Cloudflare Worker deployado
- `autoOpen`: Si `true`, el chat se abre automáticamente después de 1 segundo
- `theme`: `"dark"` o `"light"` (puedes añadir más temas en CSS)
- `enabled`: Si `false`, el chatbot no se muestra

---

## 🔧 PASO 3: PERSONALIZAR POR PÁGINA (Opcional)

Puedes mostrar el chatbot solo en ciertas páginas o excluirlo de otras.

### Opción A: Habilitar/deshabilitar por página

En el front matter de cualquier página:

```njk
---
title: "Página sin chatbot"
chatbotEnabled: false
---
```

Luego en `base.njk`:

```njk
{% if (chatbot.enabled and page.chatbotEnabled !== false) %}
  {% include "components/chatbot.njk" %}
{% endif %}
```

### Opción B: Auto-abrir en páginas específicas

En `src/pages/es/servicios/index.njk`:

```njk
---
title: "Servicios"
chatbotAutoOpen: true
---
```

Actualiza `chatbot.njk`:

```njk
<script>
  window.PERITO_CHATBOT_CONFIG = {
    apiUrl: '{{ chatbot.apiUrl }}',
    autoOpen: {{ chatbotAutoOpen | default(chatbot.autoOpen) }},
    theme: '{{ chatbot.theme }}'
  };
</script>
```

---

## 🌍 PASO 4: SOPORTE MULTI-IDIOMA (Opcional)

Si tu sitio es multi-idioma, puedes personalizar textos del chatbot.

### Opción 1: Vía data cascade de 11ty

Crea archivos específicos por idioma:

```
src/_data/chatbot_es.json
src/_data/chatbot_ca.json
src/_data/chatbot_en.json
```

Actualiza `chatbot.njk`:

```njk
{% set chatbotLang = chatbot.strings[locale] or chatbot.strings.es %}

<div id="chat-header">
  <div>
    <h3>{{ chatbotLang.header_title }}</h3>
    <p>{{ chatbotLang.header_subtitle }}</p>
  </div>
  <button id="close-chat" aria-label="{{ chatbotLang.close_aria }}">&times;</button>
</div>
```

### Opción 2: Configuración en backend

El Worker puede detectar el idioma del navegador o recibir el locale en cada request:

```javascript
// En chatbot.js
body: JSON.stringify({
  sessionId: this.config.sessionId,
  mensaje: mensaje,
  locale: document.documentElement.lang || 'es',
}),
```

---

## 🎨 PASO 5: PERSONALIZAR ESTILOS

### Cambiar colores principales

Edita las variables CSS en `src/assets/styles/chatbot.css`:

```css
:root {
  --chatbot-primary: #1a2332;        /* Color principal */
  --chatbot-primary-light: #2c3e50;  /* Color hover */
  --chatbot-accent: #f9a825;         /* Color de acento */
}
```

### Añadir tema claro

Ya está preparado. Cambia en `chatbot.json`:

```json
"theme": "light"
```

Y actualiza `chatbot.njk`:

```njk
<div id="perito-chat-widget" data-chatbot-theme="{{ chatbot.theme }}">
```

### Integrar con Tailwind

Si usas Tailwind, puedes reemplazar `chatbot.css` con clases de Tailwind:

```njk
<div id="perito-chat-widget" class="fixed bottom-5 right-5 z-[9999]">
  <button id="chat-button" class="w-15 h-15 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 shadow-lg hover:scale-110 transition-transform">
    {# ... #}
  </button>
</div>
```

---

## 🔌 PASO 6: API JAVASCRIPT (Control programático)

El chatbot expone una API global para control desde otros scripts:

### Abrir el chat programáticamente

```javascript
// Desde cualquier script del sitio
window.peritoChatbot.open();
```

### Cerrar el chat

```javascript
window.peritoChatbot.close();
```

### Resetear conversación

```javascript
window.peritoChatbot.reset();
```

### Ejemplo: Botón CTA que abre el chat

```html
<button onclick="window.peritoChatbot.open()">
  Habla con nuestro asistente técnico
</button>
```

---

## 📊 PASO 7: ANALYTICS

El chatbot ya incluye soporte para Google Analytics y Plausible.

### Google Analytics 4

Si tienes GA4 instalado, los eventos se trackean automáticamente:

- `mensaje_recibido`: Usuario recibe respuesta del bot
- `boton_clickeado`: Usuario hace click en una opción
- `error_conexion`: Error de comunicación con el backend

Eventos visibles en GA4 bajo:
```
Events → event_category: "chatbot"
```

### Plausible Analytics

Si usas Plausible, también funciona automáticamente. Ejemplo de evento:

```javascript
plausible('boton_clickeado', {
  props: {
    valor: 'grietas-estructura',
    texto: '🏗️ Grietas/Estructura'
  }
});
```

### Añadir otros servicios de analytics

Edita `chatbot.js`, método `trackEvent()`:

```javascript
trackEvent(eventName, properties = {}) {
  // Matomo
  if (typeof _paq !== 'undefined') {
    _paq.push(['trackEvent', 'chatbot', eventName, JSON.stringify(properties)]);
  }
  
  // Mixpanel
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track(eventName, { category: 'chatbot', ...properties });
  }
}
```

---

## 🧪 PASO 8: TESTING LOCAL

### 1. Ejecutar 11ty en dev mode

```bash
npm start
# o
npx @11ty/eleventy --serve
```

### 2. Mock del backend (sin Worker deployado)

Crea `src/assets/js/chatbot-mock.js`:

```javascript
// Override del fetch para development
if (window.location.hostname === 'localhost') {
  window.PERITO_CHATBOT_CONFIG = {
    apiUrl: 'http://localhost:8787/api/chat', // Worker local
    autoOpen: true,
  };
}
```

Incluye antes de `chatbot.js`:

```njk
{% if site.env === 'development' %}
  <script src="/assets/js/chatbot-mock.js"></script>
{% endif %}
<script src="/assets/js/chatbot.js" defer></script>
```

### 3. Ejecutar Worker localmente

```bash
cd chatbot
wrangler dev
```

Ahora el sitio 11ty en `localhost:8080` se comunica con el Worker en `localhost:8787`.

---

## 📦 PASO 9: BUILD PARA PRODUCCIÓN

### Verificar que los assets se copian

En `eleventy.config.js`, asegúrate de que se copian los archivos:

```javascript
eleventyConfig.addPassthroughCopy("src/assets/js/chatbot.js");
eleventyConfig.addPassthroughCopy("src/assets/styles/chatbot.css");
```

### Build

```bash
npm run build
```

### Verificar output

```
_site/
├── assets/
│   ├── js/
│   │   └── chatbot.js
│   └── styles/
│       └── chatbot.css
└── index.html (con el componente incluido)
```

---

## 🚀 PASO 10: DEPLOY

### 1. Deploy del Worker

```bash
cd chatbot
wrangler deploy
```

Anota la URL del Worker (ej: `https://perito-chatbot.abc123.workers.dev`).

### 2. Actualizar configuración en producción

Edita `src/_data/chatbot.json`:

```json
{
  "chatbot": {
    "apiUrl": "https://perito-chatbot.abc123.workers.dev/api/chat",
    "enabled": true
  }
}
```

### 3. Deploy del sitio 11ty

```bash
npm run build
# Y luego subir _site/ a tu hosting (Netlify, Vercel, Cloudflare Pages, etc.)
```

---

## 🐛 TROUBLESHOOTING

### El chatbot no aparece

**Verifica**:
1. `chatbot.enabled: true` en `chatbot.json`
2. El componente está incluido en `base.njk`
3. Los archivos CSS y JS se copian en el build

**Debug**:
```javascript
// En consola del navegador
console.log(window.peritoChatbot); // Debe existir
console.log(document.getElementById('perito-chat-widget')); // Debe existir
```

### CORS blocked

**Causa**: Worker no permite el origen del sitio.

**Solución**: Edita `worker.js`, línea ~660:

```javascript
const allowedOrigins = [
  'https://perito.barcelona',
  'https://www.perito.barcelona',
  'http://localhost:8080', // Para dev
];
```

### El chat se abre pero no responde

**Verifica**:
1. URL del API es correcta en `chatbot.json`
2. Worker está deployado y funcionando: `https://TU-WORKER.workers.dev/api/health`
3. Variables de entorno configuradas en Cloudflare (API Keys, etc.)

**Debug**:
```javascript
// En consola
fetch('https://TU-WORKER.workers.dev/api/health')
  .then(r => r.json())
  .then(console.log);
```

### Estilos se ven mal

**Verifica**:
1. `chatbot.css` se carga: inspecciona en DevTools → Network
2. No hay conflictos con otros CSS (usa especificidad o scope)

**Fix**: Añade `!important` temporalmente o aumenta especificidad:

```css
#perito-chat-widget #chat-button {
  /* ... */
}
```

---

## 📱 RESPONSIVE

El chatbot ya es responsive. En móviles:
- El widget ocupa toda la pantalla
- Botón flotante permanece visible
- Adaptación automática con media queries

**Testeado en**:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Desktop (Chrome, Firefox, Safari, Edge)

---

## ♿ ACCESIBILIDAD

El chatbot incluye:
- ✅ Atributos ARIA (`aria-label`)
- ✅ Focus visible para navegación por teclado
- ✅ Soporte para `prefers-reduced-motion`
- ✅ Contraste WCAG AA compliant
- ✅ Navegación completa con Tab/Enter/Escape

**Teclas**:
- `Tab`: Navegar entre elementos
- `Enter`: Enviar mensaje / Seleccionar botón
- `Escape`: Cerrar chat (añadir si se desea)

---

## 🔒 SEGURIDAD

### Rate limiting

Añade rate limiting en el Worker:

```javascript
// En worker.js
const RATE_LIMIT = 20; // mensajes por minuto
const rateLimitMap = new Map();

function checkRateLimit(sessionId) {
  const now = Date.now();
  const windowStart = now - 60000;
  
  const requests = rateLimitMap.get(sessionId) || [];
  const recentRequests = requests.filter(t => t > windowStart);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(sessionId, recentRequests);
  return true;
}
```

### Sanitización de inputs

El Worker debe sanitizar todos los inputs del usuario antes de procesarlos o enviarlos por email.

### HTTPS only

Asegúrate de que el sitio usa HTTPS. El Worker ya lo requiere por defecto.

---

## 📈 PERFORMANCE

### Métricas objetivo

- **LCP**: < 2.5s (no afecta, el chatbot carga defer)
- **FID**: < 100ms (interacción instantánea)
- **CLS**: 0 (widget posicionado fixed, no causa layout shift)

### Optimizaciones aplicadas

1. **Lazy loading**: Script carga con `defer`
2. **CSS inline crítico**: Solo estilos del botón flotante
3. **Minificación**: Minificar en producción
4. **Cache**: Worker cachea servicios de Sheets por 5 min

### Añadir minificación

```bash
npm install -D clean-css-cli terser
```

En `package.json`:

```json
"scripts": {
  "build": "eleventy && npm run minify",
  "minify": "npm run minify:css && npm run minify:js",
  "minify:css": "cleancss -o _site/assets/styles/chatbot.min.css _site/assets/styles/chatbot.css",
  "minify:js": "terser _site/assets/js/chatbot.js -o _site/assets/js/chatbot.min.js"
}
```

Actualiza `chatbot.njk`:

```njk
<link rel="stylesheet" href="/assets/styles/chatbot.min.css">
<script src="/assets/js/chatbot.min.js" defer></script>
```

---

## ✅ CHECKLIST DE INTEGRACIÓN

- [ ] Componente `chatbot.njk` creado en `src/_includes/components/`
- [ ] Assets copiados: `chatbot.js` y `chatbot.css`
- [ ] Configuración `chatbot.json` con API URL correcta
- [ ] Componente incluido en `base.njk`
- [ ] Worker deployado y funcionando
- [ ] CORS configurado correctamente
- [ ] Test en local: chat abre y responde
- [ ] Test en producción: flujo completo funciona
- [ ] Responsive verificado en móvil
- [ ] Analytics configurado
- [ ] Estilos personalizados (si aplica)
- [ ] Multi-idioma configurado (si aplica)
- [ ] Rate limiting añadido (recomendado)
- [ ] Documentación del equipo actualizada

---

## 🆘 SOPORTE

**Documentación completa**: Ver `chatbot/README.md`

**Troubleshooting Worker**: Ver `chatbot/DIAGRAMAS.md`

**Esquema Google Sheets**: Ver `chatbot/sheets-schema.json`

---

**¡Chatbot integrado con éxito!** 🎉
