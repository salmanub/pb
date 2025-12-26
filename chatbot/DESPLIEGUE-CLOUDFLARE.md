# ✅ WORKER DESPLEGADO EN CLOUDFLARE

## 🚀 Información del Despliegue

**Worker Name:** `perito-barcelona-chatbot`  
**URL Producción:** `https://perito-barcelona-chatbot.prueba2.workers.dev`  
**Estado:** ✅ Activo y funcionando

**Última actualización:** 26 de diciembre de 2025, 20:08 UTC  
**Version ID:** `dd626e46-99af-425e-b9e9-7184f7cc3167`

---

## 📡 Endpoints Disponibles

### 1. Health Check
```
GET https://perito-barcelona-chatbot.prueba2.workers.dev/api/health
```

**Respuesta:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-26T20:09:12.000Z"
}
```

### 2. Chat API
```
POST https://perito-barcelona-chatbot.prueba2.workers.dev/api/chat
```

**Request Body:**
```json
{
  "sessionId": "session_1234567890_abc123",
  "mensaje": "inicio"
}
```

**Response:**
```json
{
  "texto": "Hola, soy el Asistente de Peritaje...",
  "botones": [
    {
      "type": "button",
      "text": "🏢 Daños Alquiler",
      "value": "danos-alquiler"
    }
  ]
}
```

---

## 🔧 Configuración Actualizada

### Widget HTML

El archivo `widget.html` ha sido actualizado con la URL del worker:

```javascript
const CONFIG = {
  API_URL: 'https://perito-barcelona-chatbot.prueba2.workers.dev/api/chat',
  SESSION_ID: generateSessionId(),
};
```

### CORS Configurado

El worker acepta peticiones desde:
- `https://perito.barcelona`
- `https://www.perito.barcelona`
- `http://localhost:8080` (desarrollo 11ty)
- `http://localhost:8082` (desarrollo 11ty - puerto alternativo)
- `http://localhost:3000` (desarrollo)

---

## 🧪 Archivo de Prueba

Se ha creado `test-widget.html` para probar el chatbot de forma independiente.

**Para usar:**
1. Abre `c:\Users\avila\perito11ty\chatbot\test-widget.html` en tu navegador
2. Haz clic en el botón flotante (esquina inferior derecha)
3. Prueba el flujo completo del chatbot

---

## ⚙️ Variables de Entorno Requeridas

**⚠️ IMPORTANTE:** Para que el worker funcione completamente, debes configurar estas variables de entorno en Cloudflare Dashboard:

### Cómo configurar variables de entorno:

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → perito-barcelona-chatbot
3. Settings → Variables and Secrets
4. Añade las siguientes variables:

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|-----------------|
| `SPREADSHEET_ID` | ID de tu Google Sheet | URL de la hoja: `https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email de Service Account | Ver `GUIA-GOOGLE-SERVICE-ACCOUNT.md` |
| `GOOGLE_PRIVATE_KEY` | Private Key del Service Account | Ver `GUIA-GOOGLE-SERVICE-ACCOUNT.md` |
| `SHEETS_API_KEY` | API Key de Google Sheets | Google Cloud Console → APIs & Services → Credentials |
| `OPENAI_API_KEY` | API Key de OpenAI | https://platform.openai.com/api-keys |
| `EMAIL_DESTINO` | Email donde recibir leads | Ej: `info@perito.barcelona` |

### Configurar con CLI (alternativa):

```powershell
# Navegar a la carpeta del chatbot
cd c:\Users\avila\perito11ty\chatbot

# Configurar cada variable
npx wrangler secret put SPREADSHEET_ID
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
npx wrangler secret put GOOGLE_PRIVATE_KEY
npx wrangler secret put SHEETS_API_KEY
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put EMAIL_DESTINO
```

---

## 🔄 Comandos Útiles

### Redesplegar el Worker

```powershell
cd c:\Users\avila\perito11ty\chatbot
npx wrangler deploy
```

### Ver Logs en Tiempo Real

```powershell
npx wrangler tail
```

### Ver Despliegues Anteriores

```powershell
npx wrangler deployments list
```

### Rollback a Versión Anterior

```powershell
npx wrangler rollback
```

---

## 📊 Pruebas de Funcionamiento

### Test 1: Health Check ✅
```powershell
Invoke-RestMethod -Uri "https://perito-barcelona-chatbot.prueba2.workers.dev/api/health"
```

**Resultado esperado:**
```
status timestamp
------ ---------
ok     26/12/2025 20:09:12
```

### Test 2: Chat API ✅
```powershell
$body = @{
    sessionId = "test_session_123"
    mensaje = "inicio"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://perito-barcelona-chatbot.prueba2.workers.dev/api/chat" -Method Post -Body $body -ContentType "application/json"
```

**Resultado esperado:**
```json
{
  "texto": "Hola, soy el Asistente de Peritaje de Perito.barcelona...",
  "botones": [ ... ]
}
```

---

## 🌐 Integración en el Sitio Web

### Opción 1: Script Inline (Recomendado)

En tu `_includes/layouts/base.njk` o similar, antes de `</body>`:

```html
<!-- Chatbot Widget -->
<script src="/chatbot/widget.html"></script>
```

### Opción 2: iframe

```html
<iframe 
  src="/chatbot/test-widget.html" 
  style="position: fixed; bottom: 0; right: 0; width: 400px; height: 700px; border: none; z-index: 9999;"
></iframe>
```

### Opción 3: Copiar Código del Widget

Copia todo el código de `widget.html` y pégalo antes de `</body>` en tu layout base.

---

## 📈 Próximos Pasos

### 1. Configurar Variables de Entorno
- [ ] Añadir `SPREADSHEET_ID` en Cloudflare Dashboard
- [ ] Añadir `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- [ ] Añadir `GOOGLE_PRIVATE_KEY`
- [ ] Añadir `SHEETS_API_KEY`
- [ ] Añadir `OPENAI_API_KEY`
- [ ] Añadir `EMAIL_DESTINO`

### 2. Actualizar Google Sheets
- [ ] Añadir columna L: `Descripción Caso`
- [ ] Añadir columna M: `Rol Cliente`
- Ver: `ACTUALIZACION-SHEETS-COLUMNAS.md`

### 3. Probar Flujo Completo
- [ ] Abrir `test-widget.html` en el navegador
- [ ] Completar una conversación de prueba
- [ ] Verificar que llegue el email
- [ ] Verificar que se guarde en Google Sheets

### 4. Integrar en el Sitio
- [ ] Copiar código del widget al layout base
- [ ] Desplegar el sitio con `npm run build`
- [ ] Probar en producción

---

## 🆘 Solución de Problemas

### Error: "Host desconocido"
- **Causa:** El worker no está desplegado o la URL es incorrecta
- **Solución:** Verifica que `npx wrangler deploy` se ejecutó correctamente

### Error 500 en /api/chat
- **Causa:** Faltan variables de entorno (OpenAI API Key, etc.)
- **Solución:** Configura las variables de entorno en Cloudflare Dashboard

### Los botones no aparecen
- **Causa:** Error en el JavaScript o CORS
- **Solución:** Abre la consola del navegador (F12) y verifica errores

### Google Sheets no guarda datos
- **Causa:** Service Account no configurado o sin permisos
- **Solución:** Revisa `GUIA-GOOGLE-SERVICE-ACCOUNT.md` y verifica permisos

---

## 📞 Información de Contacto

**Worker desplegado por:** albert.vilardell@gmail.com  
**Account ID:** b227e16eb1a9e10957ad72bda5375191  
**Fecha despliegue:** 26 de diciembre de 2025

---

## 📚 Documentación Relacionada

- [ACTUALIZACION-PERITO-EXPERTO.md](ACTUALIZACION-PERITO-EXPERTO.md) - Cambios implementados
- [ACTUALIZACION-SHEETS-COLUMNAS.md](ACTUALIZACION-SHEETS-COLUMNAS.md) - Actualizar Google Sheets
- [GUIA-GOOGLE-SERVICE-ACCOUNT.md](GUIA-GOOGLE-SERVICE-ACCOUNT.md) - Configurar autenticación
- [ESTADO-ACTUAL.md](ESTADO-ACTUAL.md) - Estado del proyecto
