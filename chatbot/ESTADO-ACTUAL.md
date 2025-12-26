# ✅ RESUMEN DE CONFIGURACIÓN Y VERIFICACIÓN

## 📊 Estado Actual del Chatbot

### 1. Variables de Entorno (.dev.vars)
✅ **CONFIGURADAS CORRECTAMENTE**:

```bash
SPREADSHEET_ID=11zCQHDR4LNfn2rQx8J0bHtCpRn4u-Z9ct9eLnhwTBKM
GOOGLE_SERVICE_ACCOUNT_EMAIL=perito-robot@perito-barcelona-chatbot.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...-----END PRIVATE KEY-----\n"
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINO=info@perito.barcelona
```

⚠️ **OPCIONAL (No configurada, pero no crítica)**:
```bash
SHEETS_API_KEY=AIzaSy...tu-api-key-aqui...
```

---

### 2. Cloudflare Worker

**Estado**: ✅ CORRIENDO
**URL Local**: http://127.0.0.1:8787
**Endpoints Disponibles**:
- `GET /api/health` - Health check
- `POST /api/chat` - Endpoint principal del chatbot

**Variables de entorno cargadas** (confirmado por wrangler):
```
env.SPREADSHEET_ID
env.GOOGLE_SERVICE_ACCOUNT_EMAIL
env.GOOGLE_PRIVATE_KEY
env.SHEETS_API_KEY
env.OPENAI_API_KEY
env.EMAIL_DESTINO
```

---

### 3. Archivos del Chatbot

✅ **Backend (Cloudflare Worker)**:
- `chatbot/worker.js` - Lógica principal (827 líneas)
- `chatbot/wrangler.toml` - Configuración de Cloudflare
- `chatbot/.dev.vars` - Variables de entorno locales

✅ **Frontend (11ty)**:
- `src/_includes/components/chatbot.njk` - Componente Nunjucks
- `src/assets/js/chatbot.js` - JavaScript del cliente
- `src/_data/chatbot.json` - Configuración

✅ **Documentación**:
- `chatbot/README.md`
- `chatbot/GUIA-GOOGLE-SERVICE-ACCOUNT.md`
- `chatbot/CONFIGURACION-SHEETS-WRITE.md`
- `chatbot/sheets-schema.json`

---

### 4. Integración en Eleventy

**chatbot.json** configurado:
```json
{
  "apiUrl": "http://127.0.0.1:8787/api/chat",
  "enabled": true
}
```

**Passthrough configurado**: ✅
- `src/assets/js` (incluye chatbot.js)

**Componente incluido en layouts**: ✅
- `src/_includes/layouts/base.njk`

---

### 5. Google Sheets

**SPREADSHEET_ID**: `11zCQHDR4LNfn2rQx8J0bHtCpRn4u-Z9ct9eLnhwTBKM`

**Hojas requeridas**:
1. ✅ `Servicios_Periciales` (árbol de decisión técnica)
2. ✅ `Configuracion` (parámetros del sistema)
3. ⚠️ `Leads` (almacenamiento automático) - **CREAR MANUALMENTE**

**Service Account**:
- Email: `perito-robot@perito-barcelona-chatbot.iam.gserviceaccount.com`
- Private Key: ✅ Configurada
- Permisos: ⚠️ **VERIFICAR QUE LA SHEET ESTÉ COMPARTIDA CON EL SERVICE ACCOUNT (ROL: EDITOR)**

---

## 🚀 Próximos Pasos para Probar

### Paso 1: Verificar que el Worker responde

Abre en el navegador:
```
http://127.0.0.1:8787/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2025-12-26T..."
}
```

### Paso 2: Iniciar Eleventy

En otra terminal:
```powershell
npm run serve
```

### Paso 3: Abrir el sitio

```
http://localhost:8080
```

Deberías ver el chatbot en la esquina inferior derecha (botón cyan).

### Paso 4: Probar una conversación completa

1. Click en el botón del chatbot
2. Escribe un mensaje (ej: "Hola")
3. El chatbot debería responder con opciones de servicios
4. Navega por el árbol de decisión
5. Completa con ubicación, nombre y teléfono
6. Verifica que:
   - ✅ Llega un email a `info@perito.barcelona`
   - ✅ Se crea una nueva fila en la hoja "Leads" de Google Sheets

---

## 🐛 Posibles Problemas y Soluciones

### Problema 1: Worker no arranca
**Error**: `Missing entry-point to Worker script`
**Solución**: Asegúrate de estar en el directorio `chatbot/` al ejecutar `wrangler dev`

```powershell
cd chatbot
wrangler dev
```

### Problema 2: Chatbot no aparece en el sitio
**Causa**: `chatbot.enabled: false` o URL incorrecta
**Solución**: Verificar `src/_data/chatbot.json`:
```json
{
  "apiUrl": "http://127.0.0.1:8787/api/chat",
  "enabled": true
}
```

### Problema 3: Error al guardar leads en Sheets
**Error**: `Request had insufficient authentication scopes`
**Causa**: La Sheet no está compartida con el Service Account
**Solución**:
1. Abre la Google Sheet
2. Click en "Compartir"
3. Añade: `perito-robot@perito-barcelona-chatbot.iam.gserviceaccount.com`
4. Rol: **Editor**
5. Desmarca "Notificar"

### Problema 4: Error de OpenAI
**Error**: `Invalid API key` o `401 Unauthorized`
**Causa**: OPENAI_API_KEY incorrecta o expirada
**Solución**: Verificar la clave en https://platform.openai.com/api-keys

### Problema 5: Email no llega
**Causa**: MailChannels requiere configuración DNS
**Solución**: Ver documentación de MailChannels para configurar SPF y DKIM

---

## 📋 Checklist de Verificación

Marca cada punto cuando lo hayas verificado:

**Configuración Básica**:
- [x] ✅ `.dev.vars` rellenado con todas las variables
- [x] ✅ `wrangler dev` arranca sin errores
- [ ] ⚠️ Endpoint `/api/health` responde correctamente
- [x] ✅ `chatbot.json` configurado con `enabled: true`
- [x] ✅ Componente `chatbot.njk` incluido en `base.njk`

**Google Sheets**:
- [ ] ⚠️ Hoja "Servicios_Periciales" creada con datos
- [ ] ⚠️ Hoja "Configuracion" creada
- [ ] ⚠️ Hoja "Leads" creada con columnas correctas
- [ ] ⚠️ Sheet compartida con Service Account (rol Editor)
- [ ] ⚠️ Google Sheets API habilitada en Google Cloud

**Pruebas End-to-End**:
- [ ] ⚠️ Chatbot aparece en el sitio
- [ ] ⚠️ Conversación completa funciona
- [ ] ⚠️ Email llega a `info@perito.barcelona`
- [ ] ⚠️ Lead se guarda en Google Sheets "Leads"

---

## 🎯 Siguiente Acción Inmediata

1. **Verificar que el worker responde**: Abre http://127.0.0.1:8787/api/health en el navegador
2. **Iniciar Eleventy**: `npm run serve` en otra terminal
3. **Probar el chatbot**: Abre http://localhost:8080 y prueba una conversación

Si todo funciona localmente, el siguiente paso sería:
1. Desplegar a producción: `wrangler deploy`
2. Configurar variables en Cloudflare Dashboard
3. Actualizar `chatbot.json` con la URL de producción
4. Desplegar el sitio a Netlify/Vercel

---

**Última actualización**: 26 de diciembre de 2025, 19:24
**Estado**: Worker corriendo, pendiente verificación de Google Sheets
