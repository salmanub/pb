#!/usr/bin/env node

/**
 * Script de utilidad para configurar y testear el chatbot
 * 
 * Uso:
 *   node setup.js check          # Verificar configuración
 *   node setup.js test-sheets    # Probar conexión a Google Sheets
 *   node setup.js test-openai    # Probar conexión a OpenAI
 *   node setup.js generate-data  # Generar datos de ejemplo para Sheets
 */

const fs = require('fs');
const path = require('path');

// Cargar variables de entorno desde .dev.vars
function loadEnvVars() {
  const envPath = path.join(__dirname, '.dev.vars');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ Archivo .dev.vars no encontrado');
    console.log('💡 Copia .dev.vars.example a .dev.vars y rellena los valores');
    process.exit(1);
  }
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      env[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  return env;
}

// Verificar configuración
async function checkConfig() {
  console.log('🔍 Verificando configuración...\n');
  
  const env = loadEnvVars();
  const required = ['SHEETS_API_KEY', 'SPREADSHEET_ID', 'OPENAI_API_KEY', 'EMAIL_DESTINO'];
  
  let allOk = true;
  
  required.forEach(key => {
    if (env[key]) {
      console.log(`✅ ${key}: ${env[key].substring(0, 20)}...`);
    } else {
      console.log(`❌ ${key}: NO CONFIGURADO`);
      allOk = false;
    }
  });
  
  if (allOk) {
    console.log('\n✅ Todas las variables configuradas correctamente');
  } else {
    console.log('\n❌ Faltan variables por configurar');
  }
}

// Probar conexión a Google Sheets
async function testSheets() {
  console.log('🔍 Probando conexión a Google Sheets...\n');
  
  const env = loadEnvVars();
  const range = 'Servicios_Periciales!A2:J10';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.SPREADSHEET_ID}/values/${range}?key=${env.SHEETS_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Error al leer Google Sheets:');
      console.error(data.error.message);
      
      if (data.error.code === 403) {
        console.log('\n💡 Posibles soluciones:');
        console.log('  1. Verifica que Google Sheets API está habilitada en Cloud Console');
        console.log('  2. Comparte el Sheet públicamente (Compartir → Cualquiera con el enlace puede VER)');
        console.log('  3. Verifica que el SPREADSHEET_ID es correcto');
      }
    } else {
      console.log('✅ Conexión exitosa a Google Sheets');
      console.log(`📊 Filas encontradas: ${data.values ? data.values.length : 0}`);
      
      if (data.values && data.values.length > 0) {
        console.log('\n📋 Primera fila de ejemplo:');
        console.log('Slug:', data.values[0][0]);
        console.log('Categoría:', data.values[0][1]);
        console.log('Nombre:', data.values[0][2]);
      }
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

// Probar conexión a OpenAI
async function testOpenAI() {
  console.log('🔍 Probando conexión a OpenAI...\n');
  
  const env = loadEnvVars();
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'Eres un asistente técnico.' },
          { role: 'user', content: 'Di "Conexión OK" si me recibes.' },
        ],
        max_tokens: 50,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Error al conectar con OpenAI:');
      console.error(data.error.message);
      
      if (data.error.code === 'invalid_api_key') {
        console.log('\n💡 La API Key de OpenAI no es válida');
      }
    } else {
      console.log('✅ Conexión exitosa a OpenAI');
      console.log('🤖 Respuesta:', data.choices[0].message.content);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

// Generar datos de ejemplo en formato CSV para Google Sheets
function generateExampleData() {
  console.log('📝 Generando datos de ejemplo para Google Sheets...\n');
  
  const schemaPath = path.join(__dirname, 'sheets-schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  
  // Convertir example_data a CSV
  const servicios = schema.sheets.Servicios_Periciales.example_data;
  
  // Headers
  const headers = [
    'slug', 'categoria', 'nombre_servicio', 'icono', 'nivel',
    'padre_slug', 'pregunta_filtro', 'contexto_venta', 'orden', 'activo'
  ];
  
  let csv = headers.join('\t') + '\n';
  
  servicios.forEach(servicio => {
    const row = headers.map(h => {
      const value = servicio[h] || '';
      // Escapar comillas y tabs
      return String(value).replace(/\t/g, ' ').replace(/\n/g, ' ');
    });
    csv += row.join('\t') + '\n';
  });
  
  const outputPath = path.join(__dirname, 'servicios-ejemplo.tsv');
  fs.writeFileSync(outputPath, csv, 'utf-8');
  
  console.log(`✅ Archivo generado: ${outputPath}`);
  console.log('\n📋 Cómo importar:');
  console.log('  1. Abre Google Sheets');
  console.log('  2. Crea pestaña "Servicios_Periciales"');
  console.log('  3. Archivo → Importar → Subir → servicios-ejemplo.tsv');
  console.log('  4. Separador: Tab');
  console.log('  5. Importar');
}

// Main
const command = process.argv[2];

(async () => {
  switch (command) {
    case 'check':
      await checkConfig();
      break;
    case 'test-sheets':
      await testSheets();
      break;
    case 'test-openai':
      await testOpenAI();
      break;
    case 'generate-data':
      generateExampleData();
      break;
    default:
      console.log('Uso:');
      console.log('  node setup.js check          # Verificar configuración');
      console.log('  node setup.js test-sheets    # Probar Google Sheets');
      console.log('  node setup.js test-openai    # Probar OpenAI');
      console.log('  node setup.js generate-data  # Generar datos de ejemplo');
  }
})();
