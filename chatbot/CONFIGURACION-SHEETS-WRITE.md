# ✅ RESUMEN: Configuración de Escritura en Google Sheets

## 🎯 ¿Qué se ha configurado?

El chatbot ahora tiene **doble almacenamiento** de leads:

1. **📧 Email** (vía MailChannels) → Llega a `info@perito.barcelona`
2. **📊 Google Sheets** (vía Service Account) → Se guarda automáticamente en la hoja "Leads"

---

## 📦 Archivos Modificados

### 1. `.dev.vars` (Variables de Entorno)
- ✅ Añadidas variables `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY`
- ✅ Estructura actualizada con comentarios explicativos
- ✅ Formato correcto para Service Account JSON

### 2. `worker.js` (Cloudflare Worker)
- ✅ Nueva clase `SheetsWriteService` (líneas ~303-460)
  - Genera JWT tokens para autenticación con Google OAuth2
  - Convierte PEM a ArrayBuffer para firmar con Web Crypto API
  - Escribe leads en la hoja "Leads" usando Google Sheets API v4
- ✅ Constructor de `ChatbotHandler` actualizado para incluir `this.sheetsWrite`
- ✅ Método `handleCapturaTelefono` modificado para guardar leads en Sheets
- ✅ Variables de entorno actualizadas para incluir credenciales del Service Account

### 3. `sheets-schema.json` (Esquema de Datos)
- ✅ Nueva sección `"Leads"` con estructura de 11 columnas
- ✅ Datos de ejemplo para 2 leads
- ✅ Documentación de tipos y descripciones

### 4. `GUIA-GOOGLE-SERVICE-ACCOUNT.md` (Documentación)
- ✅ Guía completa paso a paso para crear Service Account
- ✅ Instrucciones para obtener credenciales JSON
- ✅ Configuración de permisos en Google Sheet
- ✅ Solución de problemas comunes
- ✅ Checklist de verificación

### 5. `README.md` (Documentación Principal)
- ✅ Sección "Paso 1" actualizada con nuevas variables de entorno
- ✅ Referencia a guía de Service Account
- ✅ Instrucciones para configurar variables en Cloudflare Workers
- ✅ Nueva sección "Paso 3b" con estructura de hoja "Leads"

---

## 🔧 Configuración Pendiente (Tu Parte)

Para que funcione la escritura en Sheets, necesitas completar estos pasos:

### 1️⃣ Crear Service Account en Google Cloud
👉 Sigue la guía: [GUIA-GOOGLE-SERVICE-ACCOUNT.md](GUIA-GOOGLE-SERVICE-ACCOUNT.md)

**Resultado esperado**:
- Email del robot: `factory-robot@TU-PROYECTO.iam.gserviceaccount.com`
- Private key: `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`

### 2️⃣ Rellenar `.dev.vars` con tus credenciales

```bash
# Editar chatbot/.dev.vars
SPREADSHEET_ID=1A2b3C4d5E6f7G8h9I0j1k2l3m4n5o6p
GOOGLE_SERVICE_ACCOUNT_EMAIL=factory-robot@TU-PROYECTO.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkQg...\n-----END PRIVATE KEY-----\n"
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINO=info@perito.barcelona
```

### 3️⃣ Crear hoja "Leads" en tu Google Sheet

Abre tu Google Sheet y crea una nueva pestaña llamada **"Leads"** con estas columnas:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Fecha | Nombre | Teléfono | Ubicación | Servicio | Categoría | Tipo Legal | Urgencia | Session ID | Estado | Notas |

**Fila 1** (encabezados) → Formatear en negrita
**Filas 2+** → Se rellenarán automáticamente cuando el chatbot capture leads

### 4️⃣ Compartir la Sheet con el Service Account

1. Click en "Compartir" (botón verde)
2. Pegar el email: `factory-robot@TU-PROYECTO.iam.gserviceaccount.com`
3. Rol: **Editor**
4. Desmarcar "Notificar a las personas"
5. Click en "Compartir"

### 5️⃣ Probar localmente

```bash
cd chatbot
wrangler dev
```

Abre el chatbot y completa una conversación hasta capturar un lead. Verifica:
- ✅ Email llega a `info@perito.barcelona`
- ✅ Nueva fila aparece en la hoja "Leads"

---

## 🚀 Flujo de Datos (Cómo Funciona)

```
Usuario completa chatbot
         ↓
  [Captura nombre + teléfono + ubicación]
         ↓
    worker.js → handleCapturaTelefono()
         ↓
    ┌─────────────────┴──────────────────┐
    ↓                                     ↓
📧 EmailService                    📊 SheetsWriteService
    ↓                                     ↓
MailChannels API              Google Sheets API v4
    ↓                                     ↓
info@perito.barcelona          Hoja "Leads" (nueva fila)
```

---

## 🔍 Verificación de Funcionamiento

### ✅ Checklist de Prueba Local

1. [ ] `wrangler dev` arranca sin errores
2. [ ] Chatbot responde al mensaje inicial
3. [ ] Navegación por árbol de servicios funciona
4. [ ] Captura de ubicación/nombre/teléfono funciona
5. [ ] Email llega a `info@perito.barcelona`
6. [ ] Nueva fila aparece en Google Sheet "Leads"
7. [ ] Los datos en la fila son correctos (nombre, teléfono, servicio, etc.)

### 🐛 Si algo falla

**Email NO llega** → Problema con MailChannels (DNS, configuración)
**Sheet NO se actualiza** → Problema con Service Account:
  - Verificar que el email está compartido en la Sheet
  - Verificar que la `GOOGLE_PRIVATE_KEY` está correcta (con `\n`)
  - Revisar logs del worker: `wrangler tail` o Cloudflare Dashboard

**Ambos fallan** → Problema con el flujo del chatbot (revisar estados, conversación)

---

## 📊 Datos Almacenados en Cada Lead

Cuando un usuario completa el chatbot, se guarda automáticamente:

| Campo | Fuente | Ejemplo |
|-------|--------|---------|
| **Fecha** | `new Date().toISOString()` | `2025-12-26T14:30:00.000Z` |
| **Nombre** | Input del usuario | `Juan Pérez García` |
| **Teléfono** | Input del usuario | `+34 600 123 456` |
| **Ubicación** | Input del usuario | `Barcelona` |
| **Servicio** | Árbol de decisión técnica | `Grietas y Patología Estructural` |
| **Categoría** | Árbol de decisión técnica | `Estructural` |
| **Tipo Legal** | Pregunta jurídica | `Demanda judicial` |
| **Urgencia** | IA (análisis conversación) | `Alta` / `Normal` / `Baja` |
| **Session ID** | Generado automáticamente | `sess_abc123def456` |
| **Estado** | Por defecto | `PENDIENTE` |
| **Notas** | Vacío (para uso interno) | _(vacío)_ |

---

## 🎨 Siguiente Paso: Gestión Visual de Leads

Una vez que los leads empiecen a llegar, puedes mejorar la visualización:

### 1. **Formato Condicional** (colores según estado)
- `PENDIENTE` → 🟡 Amarillo
- `CONTACTADO` → 🔵 Azul
- `PRESUPUESTADO` → 🟠 Naranja
- `CERRADO` → 🟢 Verde

### 2. **Filtros y Ordenación**
- Filtrar por Categoría (Estructural, Seguros, etc.)
- Ordenar por Fecha (más recientes primero)
- Filtrar por Estado (solo pendientes)

### 3. **Integración con CRM** (opcional)
- Zapier: Google Sheets → HubSpot / Salesforce
- Make.com: Automatizar creación de tareas
- Google Apps Script: Envío de notificaciones por Slack/Telegram

---

## 📚 Recursos Creados

1. **[GUIA-GOOGLE-SERVICE-ACCOUNT.md](GUIA-GOOGLE-SERVICE-ACCOUNT.md)** - Guía paso a paso para obtener credenciales
2. **[sheets-schema.json](sheets-schema.json)** - Esquema completo de todas las hojas (incluida "Leads")
3. **[README.md](README.md)** - Documentación principal actualizada
4. **[worker.js](worker.js)** - Código del worker con `SheetsWriteService`

---

## ✨ Ventajas de Esta Implementación

✅ **Doble respaldo** - Email + Google Sheet (si falla uno, tienes el otro)
✅ **Base de datos en tiempo real** - Google Sheets es editable desde cualquier lugar
✅ **Sin servidor adicional** - Todo funciona en Cloudflare Workers (serverless)
✅ **Escalable** - Soporta miles de leads sin configuración adicional
✅ **Auditable** - Session ID permite rastrear cada conversación
✅ **Colaborativo** - Todo el equipo puede ver/editar leads en Sheets

---

**¿Listo para probar?** Sigue la [GUIA-GOOGLE-SERVICE-ACCOUNT.md](GUIA-GOOGLE-SERVICE-ACCOUNT.md) y tendrás el sistema funcionando en menos de 30 minutos. 🚀
