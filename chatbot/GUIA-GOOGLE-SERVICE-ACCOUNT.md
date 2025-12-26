# 🔐 GUÍA: Configuración de Google Service Account para el Chatbot

Esta guía te ayudará a configurar las credenciales necesarias para que el chatbot pueda **escribir leads automáticamente** en tu Google Sheet.

---

## 📋 ¿Qué es un Service Account?

Un **Service Account** es como un "robot" que actúa en nombre de tu proyecto para acceder a Google APIs sin intervención humana. Es necesario porque:

1. ✅ **Permite escritura automática** en Google Sheets (la API Key solo permite lectura)
2. ✅ **No requiere autenticación OAuth** cada vez
3. ✅ **Es seguro** - cada Service Account tiene permisos específicos
4. ✅ **Funciona 24/7** - Cloudflare Workers puede escribir leads sin límites

---

## 🛠️ PASO 1: Crear un Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto:
   - Click en el selector de proyectos (arriba izquierda)
   - Click en "Nuevo Proyecto"
   - Nombre: `perito-barcelona-chatbot`
   - Click en "Crear"
3. Espera a que se cree (30 segundos aprox.)
4. Selecciona el proyecto recién creado

---

## 🔑 PASO 2: Crear el Service Account

1. En el menú lateral, ve a: **IAM y administración > Cuentas de servicio**
2. Click en **"+ CREAR CUENTA DE SERVICIO"**
3. Rellena los datos:
   - **Nombre de la cuenta**: `factory-robot`
   - **ID de cuenta**: `factory-robot` (se autorellenará)
   - **Descripción**: `Robot para escribir leads del chatbot en Google Sheets`
4. Click en **"CREAR Y CONTINUAR"**
5. En "Rol", selecciona: **Editor** (o puedes dejarlo vacío, daremos permisos directamente en la Sheet)
6. Click en **"CONTINUAR"** y luego **"LISTO"**

---

## 📥 PASO 3: Descargar las Credenciales (JSON)

1. En la lista de cuentas de servicio, click en el email del Service Account que acabas de crear:
   - Será algo como: `factory-robot@perito-barcelona-chatbot.iam.gserviceaccount.com`
2. Ve a la pestaña **"CLAVES"**
3. Click en **"AGREGAR CLAVE" > "Crear clave nueva"**
4. Selecciona el tipo: **JSON**
5. Click en **"CREAR"**
6. Se descargará un archivo JSON con este formato:

```json
{
  "type": "service_account",
  "project_id": "perito-barcelona-chatbot",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkQg...\n-----END PRIVATE KEY-----\n",
  "client_email": "factory-robot@perito-barcelona-chatbot.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

⚠️ **IMPORTANTE**: Guarda este archivo en un lugar SEGURO. Nunca lo subas a Git.

---

## 📊 PASO 4: Habilitar Google Sheets API

1. En Google Cloud Console, ve al menú: **APIs y servicios > Biblioteca**
2. Busca: `Google Sheets API`
3. Click en **"Google Sheets API"**
4. Click en **"HABILITAR"**
5. Espera 1 minuto a que se active

---

## 🔗 PASO 5: Dar Permisos al Service Account en tu Google Sheet

1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/TU_SPREADSHEET_ID/
2. Click en **"Compartir"** (botón verde arriba derecha)
3. En "Añadir personas o grupos", pega el **email del Service Account**:
   - Ejemplo: `factory-robot@perito-barcelona-chatbot.iam.gserviceaccount.com`
4. Selecciona el rol: **Editor**
5. **Desmarca** la casilla "Notificar a las personas"
6. Click en **"Compartir"**

✅ Ahora el robot puede escribir en tu hoja.

---

## 🔧 PASO 6: Configurar las Variables de Entorno

Del archivo JSON que descargaste, necesitas estos 2 valores:

### 1. `GOOGLE_SERVICE_ACCOUNT_EMAIL`
Copia el valor de `client_email`:
```
factory-robot@perito-barcelona-chatbot.iam.gserviceaccount.com
```

### 2. `GOOGLE_PRIVATE_KEY`
Copia el valor de `private_key` **COMPLETO** (incluyendo `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`):
```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkQg...
...
...
-----END PRIVATE KEY-----
```

⚠️ **IMPORTANTE**: La clave debe tener `\n` para los saltos de línea. Si copias desde el JSON, mantén las comillas y el formato.

---

## 📝 PASO 7: Rellenar el archivo `.dev.vars`

Edita el archivo `chatbot/.dev.vars`:

```bash
# --- GOOGLE SHEETS (BASE DE DATOS) ---
SPREADSHEET_ID=1A2b3C4d5E6f7G8h9I0j1k2l3m4n5o6p

# Credenciales del Robot (OBLIGATORIO PARA ESCRIBIR LEADS)
GOOGLE_SERVICE_ACCOUNT_EMAIL=factory-robot@perito-barcelona-chatbot.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkQg...\n-----END PRIVATE KEY-----\n"

# API Key (Opcional, solo para lectura rápida)
SHEETS_API_KEY=AIzaSy...

# --- INTELIGENCIA ARTIFICIAL ---
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx

# --- NEGOCIO ---
EMAIL_DESTINO=info@perito.barcelona
```

---

## 🚀 PASO 8: Configurar en Cloudflare Workers (Producción)

Cuando despliegues con `wrangler deploy`, configura las variables de entorno:

```bash
# Opción 1: Configurar desde Wrangler CLI
wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
wrangler secret put GOOGLE_PRIVATE_KEY
wrangler secret put SPREADSHEET_ID
wrangler secret put OPENAI_API_KEY
wrangler secret put EMAIL_DESTINO

# Opción 2: Configurar desde el Dashboard de Cloudflare
# 1. Ve a Workers & Pages > Tu worker > Settings > Variables
# 2. Click en "Add variable"
# 3. Añade cada variable como "Secret" (encrypted)
```

---

## ✅ PASO 9: Verificar que Funciona

### 1. **Prueba Local** (con `wrangler dev`)

```bash
cd chatbot
wrangler dev
```

Abre tu chatbot y completa una conversación. Verifica que:
- ✅ Se envía el email a `info@perito.barcelona`
- ✅ Se crea una nueva fila en la hoja "Leads" de tu Google Sheet

### 2. **Revisar Logs**

En la consola de Wrangler verás:
```
✓ Lead guardado en Sheets
✓ Email enviado
```

Si hay un error, verás:
```
✗ Error guardando lead en Sheets: [descripción del error]
```

---

## 🐛 Solución de Problemas

### Error: "Request had insufficient authentication scopes"
**Causa**: El Service Account no tiene permisos en la Sheet.
**Solución**: Revisa el PASO 5 - Asegúrate de compartir la hoja con el email del Service Account.

### Error: "Invalid JWT Signature"
**Causa**: La `GOOGLE_PRIVATE_KEY` no está correctamente formateada.
**Solución**: 
- Asegúrate de copiar la clave COMPLETA con `-----BEGIN` y `-----END`
- Mantén los `\n` (saltos de línea escapados)
- Encierra la clave entre comillas dobles en `.dev.vars`

### Error: "The caller does not have permission"
**Causa**: La API de Google Sheets no está habilitada.
**Solución**: Revisa el PASO 4 - Habilita la API en Google Cloud Console.

### Los leads NO aparecen en Sheets (pero sí llega el email)
**Causa**: El Service Account no está configurado (pero el resto funciona).
**Solución**: 
- Verifica que `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY` están configuradas
- Revisa los logs del worker

---

## 🎯 Checklist Final

Antes de marcar como completo, verifica:

- [ ] ✅ Proyecto creado en Google Cloud Console
- [ ] ✅ Service Account creado con nombre `factory-robot`
- [ ] ✅ Archivo JSON de credenciales descargado y guardado de forma segura
- [ ] ✅ Google Sheets API habilitada en el proyecto
- [ ] ✅ Google Sheet compartida con el email del Service Account (rol Editor)
- [ ] ✅ Variables `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY` configuradas en `.dev.vars`
- [ ] ✅ Hoja "Leads" creada en Google Sheet con las columnas correctas (ver `sheets-schema.json`)
- [ ] ✅ Prueba local exitosa (`wrangler dev`)
- [ ] ✅ Variables de entorno configuradas en Cloudflare Workers (producción)

---

## 📚 Recursos Adicionales

- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [Google Sheets API Reference](https://developers.google.com/sheets/api/reference/rest)
- [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)

---

**¿Necesitas ayuda?** Revisa los logs del worker o contacta con el equipo técnico.
