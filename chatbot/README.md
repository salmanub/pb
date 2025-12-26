# SISTEMA CHATBOT PERITO.BARCELONA

Sistema de triaje técnico y captura de leads para despacho de ingeniería forense.

## 📋 RESUMEN DEL SISTEMA

**Arquitectura**: Cloudflare Workers + Google Sheets + MailChannels + OpenAI

**Objetivo**: Filtrar curiosos de clientes reales mediante árbol de decisión técnico, capturando solo leads cualificados con datos mínimos pero críticos.

**Flujo**:
1. **FASE TRIAJE**: Usuario navega árbol de decisión técnica (desde Google Sheets)
2. **FASE CUALIFICACIÓN**: Pregunta jurídica crítica (demanda vs. reclamación)
3. **FASE CIERRE**: Captura de ubicación, nombre, teléfono
4. **ENVÍO**: Lead por email vía MailChannels

---

## 🗂️ ESTRUCTURA DE ARCHIVOS

```
chatbot/
├── worker.js              # Cloudflare Worker principal
├── wrangler.toml          # Configuración de Cloudflare
├── sheets-schema.json     # Esquema de Google Sheets
├── widget.html            # Widget de chat para el sitio
├── README.md              # Este archivo
└── .dev.vars              # Variables de entorno (NO SUBIR A GIT)
```

---

## 📊 CONFIGURACIÓN GOOGLE SHEETS

### Paso 1: Crear Google Sheet

1. Crear nuevo Google Sheet
2. Nombre sugerido: "Perito.barcelona - Chatbot Data"
3. Crear 3 pestañas:
   - `Servicios_Periciales` (árbol de decisión técnica)
   - `Configuracion` (parámetros del sistema)
   - `Leads` (almacenamiento automático de leads capturados)

### Paso 2: Estructura de "Servicios_Periciales"

**Columnas** (A-J):

| Columna | Nombre | Tipo | Descripción | Ejemplo |
|---------|--------|------|-------------|---------|
| A | `slug` | Texto | ID único | `grietas-elementos-carga` |
| B | `categoria` | Texto | Grupo | `Estructural` |
| C | `nombre_servicio` | Texto | Nombre visible | `Grietas en elementos de carga` |
| D | `icono` | Texto | Emoji | `⚠️` |
| E | `nivel` | Número | Nivel en árbol (1 o 2) | `2` |
| F | `padre_slug` | Texto | Slug del padre (vacío si nivel 1) | `grietas-estructura` |
| G | `pregunta_filtro` | Texto | Pregunta técnica | `¿Las grietas son verticales o diagonales?` |
| H | `contexto_venta` | Texto | Prompt para IA | `Vende el análisis estructural...` |
| I | `orden` | Número | Orden de aparición | `1` |
| J | `activo` | Booleano | TRUE/FALSE | `TRUE` |

**Datos de ejemplo**: Ver archivo `sheets-schema.json` para datos completos.

### Paso 3: Estructura de "Configuracion"

**Columnas** (A-C):

| Columna | Nombre | Ejemplo |
|---------|--------|---------|
| A | `clave` | `email_destino` |
| B | `valor` | `info@perito.barcelona` |
| C | `descripcion` | `Email donde se envían los leads` |

**Configuraciones recomendadas**:
- `email_destino`: Email para recibir leads
- `zona_cobertura`: `Barcelona,Girona,Tarragona,Lleida`
- `system_prompt`: (Opcional) Override del system prompt

### Paso 3b: Estructura de "Leads" (Almacenamiento Automático)

**Columnas** (A-K):

| Columna | Nombre | Tipo | Ejemplo |
|---------|--------|------|---------|
| A | `Fecha` | Fecha/Hora | `2025-12-26 14:30:00` |
| B | `Nombre` | Texto | `Juan Pérez García` |
| C | `Teléfono` | Texto | `+34 600 123 456` |
| D | `Ubicación` | Texto | `Barcelona` |
| E | `Servicio` | Texto | `Grietas y Patología Estructural` |
| F | `Categoría` | Texto | `Estructural` |
| G | `Tipo Legal` | Texto | `Demanda judicial` |
| H | `Urgencia` | Texto | `Alta` |
| I | `Session ID` | Texto | `sess_abc123def456` |
| J | `Estado` | Texto | `PENDIENTE` |
| K | `Notas` | Texto | _(vacío inicialmente)_ |

**Estados disponibles**: `PENDIENTE`, `CONTACTADO`, `PRESUPUESTADO`, `CERRADO`

⚠️ **IMPORTANTE**: Esta hoja se rellena AUTOMÁTICAMENTE cuando el chatbot captura un lead. NO escribir manualmente aquí.

💡 **Tip**: Añade filtros y formato condicional para gestionar los leads visualmente (colorea estados, ordena por fecha, etc.)

### Paso 4: Habilitar Google Sheets API

1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear nuevo proyecto o usar existente
3. Habilitar "Google Sheets API"
4. Crear credenciales → API Key
5. Copiar la API Key (necesaria para `SHEETS_API_KEY`)
6. En el Sheet: Compartir → "Cualquiera con el enlace puede VER"
7. Copiar el ID del spreadsheet desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

---

## ⚙️ DEPLOYMENT EN CLOUDFLARE WORKERS

### Prerequisitos

```bash
npm install -g wrangler
wrangler login
```

### Paso 1: Configurar Variables de Entorno

Crear archivo `.dev.vars` (local, NO subir a Git):

```env
# --- GOOGLE SHEETS (BASE DE DATOS) ---
SPREADSHEET_ID=1A2b3C4d5E6f7G8h9I0j1k2l3m4n5o6p

# Credenciales del Robot (OBLIGATORIO PARA ESCRIBIR LEADS)
GOOGLE_SERVICE_ACCOUNT_EMAIL=factory-robot@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkQg...\n-----END PRIVATE KEY-----\n"

# API Key (Opcional, solo para lectura rápida)
SHEETS_API_KEY=AIzaSy...

# --- INTELIGENCIA ARTIFICIAL ---
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx

# --- NEGOCIO ---
EMAIL_DESTINO=info@perito.barcelona
```

📚 **IMPORTANTE**: Para obtener las credenciales del Service Account, sigue la guía completa:
👉 **[GUIA-GOOGLE-SERVICE-ACCOUNT.md](GUIA-GOOGLE-SERVICE-ACCOUNT.md)**

### Paso 2: Deploy

```bash
cd chatbot
wrangler deploy
```

### Paso 3: Configurar Variables en Producción

En Cloudflare Dashboard:
1. Workers & Pages → tu worker → Settings → Variables
2. Añadir las siguientes variables como "Secret" (encrypted):
   - `SPREADSHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` ⚠️ IMPORTANTE: Copiar con los `\n` incluidos
   - `OPENAI_API_KEY`
   - `EMAIL_DESTINO`
   - `SHEETS_API_KEY` (opcional, solo si quieres lectura vía API Key también)
3. Save

**Alternativa con Wrangler CLI**:
```bash
wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
wrangler secret put GOOGLE_PRIVATE_KEY
wrangler secret put SPREADSHEET_ID
wrangler secret put OPENAI_API_KEY
wrangler secret put EMAIL_DESTINO
```

### Paso 4: Configurar Custom Domain (Opcional)

En Cloudflare Dashboard:
1. Workers & Pages → tu worker → Triggers → Add Custom Domain
2. Dominio: `chat.perito.barcelona` (o similar)
3. Actualizar `API_URL` en `widget.html` con el nuevo dominio

**URL final**: `https://chat.perito.barcelona/api/chat`

---

## 🔌 INTEGRACIÓN EN EL SITIO WEB

### Opción 1: Widget Standalone (Recomendado)

Añadir al final del `<body>` de todas las páginas:

```html
<!-- Chatbot Perito.barcelona -->
<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://TU-WORKER.workers.dev/widget.js';
    script.async = true;
    document.body.appendChild(script);
  })();
</script>
```

### Opción 2: Iframe Embebido

```html
<iframe 
  src="https://TU-WORKER.workers.dev/widget.html" 
  width="380" 
  height="600"
  style="border: none; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
</iframe>
```

### Opción 3: Integración en 11ty (Este proyecto)

Crear partial en `src/_includes/partials/chatbot-widget.njk`:

```html
<!-- Copiar el contenido de widget.html aquí -->
```

Incluir en `src/_includes/layouts/base.njk`:

```njk
{% include "partials/chatbot-widget.njk" %}
```

---

## 🎨 PERSONALIZACIÓN

### Cambiar Colores del Widget

Editar en `widget.html`:

```css
/* Color primario (actualmente #1a2332) */
background: linear-gradient(135deg, #TU-COLOR-1 0%, #TU-COLOR-2 100%);
```

### Cambiar Tono del Bot

Editar `SYSTEM_PROMPT` en `worker.js` (líneas 40-75).

**Ejemplos de ajuste**:

- **Más formal**: Añadir "Usa usted en lugar de tú"
- **Más directo**: Añadir "Máximo 1 línea por respuesta"
- **Agregar urgencia**: Añadir "Menciona siempre plazos legales cuando sea relevante"

### Añadir Servicios

En Google Sheets `Servicios_Periciales`, añadir fila nueva:

```
slug: certificacion-energetica
categoria: Servicios Técnicos
nombre_servicio: Certificación Energética
icono: ⚡
nivel: 2
padre_slug: servicios-tecnicos
pregunta_filtro: ¿El inmueble es residencial o terciario?
contexto_venta: Vende el certificado energético para cumplir con normativa...
orden: 3
activo: TRUE
```

**Cache**: El worker cachea los servicios durante 5 minutos. Espera o reinicia el worker.

---

## 📧 CONFIGURACIÓN DE EMAIL (MailChannels)

### Paso 1: Verificar Dominio

MailChannels requiere verificación DNS:

1. Añadir registro SPF en tu DNS:
   ```
   TXT @ v=spf1 include:_spf.mx.cloudflare.net ~all
   ```

2. Añadir registro DKIM (proporciona MailChannels):
   ```
   TXT mailchannels._domainkey [clave proporcionada]
   ```

### Paso 2: Personalizar Email de Lead

Editar método `enviarLead()` en `worker.js` (líneas 470-500).

**Ejemplo de mejora**: Añadir logo HTML:

```javascript
content: [{
  type: 'text/html',
  value: `
    <img src="https://perito.barcelona/logo.png" width="200">
    <h2>Nuevo Lead Cualificado</h2>
    <p><strong>Servicio:</strong> ${leadData.servicio_nombre}</p>
    ...
  `,
}],
```

---

## 🧪 TESTING

### Test Local

1. Ejecutar en local:
   ```bash
   cd chatbot
   wrangler dev
   ```

2. Abrir `http://localhost:8787/widget.html`

3. Probar el flujo completo

### Test en Producción

```bash
curl -X POST https://TU-WORKER.workers.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-123",
    "mensaje": "inicio"
  }'
```

**Respuesta esperada**:
```json
{
  "texto": "Bienvenido a Perito.barcelona...",
  "botones": [
    {"type": "button", "text": "🏗️ Grietas/Estructura", "value": "grietas-estructura"},
    ...
  ]
}
```

### Debuggear Sesiones

Añadir endpoint de debug en `worker.js`:

```javascript
if (url.pathname === '/api/debug-session') {
  const { sessionId } = await request.json();
  const session = sessionStore.get(sessionId);
  return new Response(JSON.stringify(session, null, 2), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

---

## 🚀 MEJORAS FUTURAS

### Fase 2: Persistencia con KV

Reemplazar `SessionStore` in-memory por Cloudflare KV:

```javascript
// En wrangler.toml
[[kv_namespaces]]
binding = "SESSIONS"
id = "tu-kv-id"

// En worker.js
await env.SESSIONS.put(sessionId, JSON.stringify(session), {
  expirationTtl: 1800 // 30 minutos
});
```

### Fase 3: Analytics

Trackear:
- Tasa de conversión por servicio
- Tiempo medio hasta lead
- Puntos de abandono

Usar Cloudflare Analytics o enviar a Google Analytics.

### Fase 4: Integración CRM

Enviar lead a CRM en lugar de email:

```javascript
// Ejemplo con Pipedrive
async enviarLeadCRM(leadData) {
  await fetch('https://api.pipedrive.com/v1/persons', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PIPEDRIVE_TOKEN}`,
    },
    body: JSON.stringify({
      name: leadData.nombre,
      phone: leadData.telefono,
      // ...
    }),
  });
}
```

### Fase 5: A/B Testing

Probar variantes del system prompt o flujo:

```javascript
const SYSTEM_PROMPT_VARIANT_A = "...";
const SYSTEM_PROMPT_VARIANT_B = "...";

const variant = Math.random() > 0.5 ? 'A' : 'B';
session.datos.ab_variant = variant;
```

---

## 🛠️ TROUBLESHOOTING

### Error: "No se puede leer de Google Sheets"

**Causa**: API Key incorrecta o Sheet no público

**Solución**:
1. Verificar que `SHEETS_API_KEY` es correcta
2. En Google Sheet: Compartir → "Cualquiera con el enlace puede VER"
3. Verificar que Google Sheets API está habilitada en Cloud Console

### Error: "CORS blocked"

**Causa**: Dominio del sitio no permitido

**Solución**: Cambiar en `worker.js`:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://perito.barcelona', // Específico
  // o '*' para desarrollo
};
```

### Sesiones se pierden

**Causa**: Worker reinicia y pierde memoria

**Solución**: Migrar a Cloudflare KV (ver "Mejoras Futuras")

### Bot no responde bien

**Causa**: System prompt no adecuado

**Solución**:
1. Revisar `SYSTEM_PROMPT` en `worker.js`
2. Añadir más ejemplos de correcto/incorrecto
3. Reducir `max_tokens` si respuestas muy largas
4. Aumentar `temperature` si respuestas muy rígidas

### Emails no llegan

**Causa**: MailChannels no configurado o spam

**Solución**:
1. Verificar registros DNS (SPF, DKIM)
2. Revisar carpeta de spam
3. Comprobar logs de Cloudflare Worker
4. Alternativa: Usar SendGrid, Postmark, etc.

---

## 📞 SOPORTE

**Documentación Cloudflare Workers**: https://developers.cloudflare.com/workers/

**Documentación Google Sheets API**: https://developers.google.com/sheets/api

**Documentación OpenAI API**: https://platform.openai.com/docs

---

## 📝 LICENCIA

Código propietario de Perito.barcelona. Todos los derechos reservados.

---

## ✅ CHECKLIST DE DEPLOYMENT

- [ ] Google Sheet creado con estructura correcta
- [ ] Google Sheets API habilitada y API Key generada
- [ ] Sheet compartido públicamente (ver)
- [ ] Variables de entorno configuradas en `.dev.vars`
- [ ] Worker deployado: `wrangler deploy`
- [ ] Variables de entorno configuradas en Cloudflare Dashboard
- [ ] Test endpoint: `/api/health` retorna OK
- [ ] Test chat: Flujo completo funcionando
- [ ] Widget integrado en el sitio web
- [ ] URL del worker actualizada en `widget.html`
- [ ] MailChannels DNS configurado (SPF, DKIM)
- [ ] Email de prueba recibido correctamente
- [ ] Analytics configurado (opcional)
- [ ] Documentación revisada por el equipo

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Autor**: Arquitecto de Software - Perito.barcelona
