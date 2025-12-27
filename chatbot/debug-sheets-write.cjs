const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Cargar variables de entorno desde .dev.vars
function loadEnvVars() {
  const envPath = path.join(__dirname, '.dev.vars');
  if (!fs.existsSync(envPath)) {
    console.error('❌ Archivo .dev.vars no encontrado');
    process.exit(1);
  }
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      let value = valueParts.join('=').trim();
      // Eliminar comillas si existen
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      env[key.trim()] = value;
    }
  });
  return env;
}

const env = loadEnvVars();

// Configuración
const CONFIG = {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY: env.GOOGLE_PRIVATE_KEY,
  SPREADSHEET_ID: env.SPREADSHEET_ID,
};

// Clase simplificada de escritura (copiada de worker.js)
class SheetsWriteService {
  constructor() {
    this.serviceAccountEmail = CONFIG.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    this.privateKey = CONFIG.GOOGLE_PRIVATE_KEY;
    this.spreadsheetId = CONFIG.SPREADSHEET_ID;
  }

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

  async getAccessToken() {
    console.log('🔑 Generando Token JWT...');
    const header = { alg: 'RS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: this.serviceAccountEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const encodeBase64Url = (obj) => {
      const str = JSON.stringify(obj);
      return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };

    const headerEncoded = encodeBase64Url(header);
    const claimEncoded = encodeBase64Url(claim);
    const signatureInput = `${headerEncoded}.${claimEncoded}`;

    // Manejo de saltos de línea en la clave privada
    const privateKeyPem = this.privateKey.replace(/\\n/g, '\n').trim();

    try {
      const key = await crypto.webcrypto.subtle.importKey(
        'pkcs8',
        this.pemToArrayBuffer(privateKeyPem),
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
      );

      const signature = await crypto.webcrypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        key,
        new TextEncoder().encode(signatureInput)
      );

      const signatureEncoded = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const jwt = `${signatureInput}.${signatureEncoded}`;

      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt,
        }),
      });

      const tokenData = await tokenResponse.json();
      if (tokenData.error) {
        throw new Error(`Error obteniendo token: ${tokenData.error_description || tokenData.error}`);
      }
      console.log('✅ Token generado correctamente');
      return tokenData.access_token;
    } catch (error) {
      console.error('❌ Error CRÍTICO generando token:', error);
      throw error;
    }
  }

  async guardarLeadPrueba() {
    try {
      console.log(`📧 Email Service Account: ${this.serviceAccountEmail}`);
      console.log(`📄 Spreadsheet ID: ${this.spreadsheetId}`);
      
      const accessToken = await this.getAccessToken();
      
      const fecha = new Date().toISOString();
      const fila = [
        fecha, 'TEST USER', '000000000', 'TEST LOCATION', 'TEST SERVICE',
        'TEST CATEGORY', 'TEST LEGAL', 'TEST URGENCY', 'TEST-SESSION-ID',
        'PENDIENTE', '', 'Esto es una prueba de escritura', 'Particular', 'test@email.com', 'TEST-CLIENT-TYPE'
      ];

      const range = 'Leads!A:O';
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

      console.log(`📝 Intentando escribir en: ${range}`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [fila] }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Error escribiendo en Sheets:');
        console.error(JSON.stringify(data, null, 2));
        
        if (data.error && data.error.code === 403) {
            console.log('\n🚨 CAUSA PROBABLE: PERMISOS INSUFICIENTES');
            console.log(`Asegúrate de compartir la hoja con: ${this.serviceAccountEmail}`);
            console.log('Dale permisos de "Editor".');
        } else if (data.error && data.error.code === 400) {
            console.log('\n🚨 CAUSA PROBABLE: PESTAÑA NO ENCONTRADA O RANGO INVÁLIDO');
            console.log('Verifica que existe una pestaña llamada exactamente "Leads".');
        }
      } else {
        console.log('✅ ¡ÉXITO! Fila escrita correctamente.');
        console.log(data);
      }

    } catch (error) {
      console.error('❌ Error general:', error);
    }
  }
}

// Ejecutar prueba
(async () => {
  console.log('🚀 Iniciando diagnóstico de escritura en Sheets...');
  const service = new SheetsWriteService();
  await service.guardarLeadPrueba();
})();
