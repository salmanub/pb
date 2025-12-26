# ACTUALIZACIÓN DE GOOGLE SHEETS - NUEVAS COLUMNAS

## 📋 Cambios Necesarios en la Hoja "Leads"

Para que el chatbot guarde correctamente los nuevos datos, debes añadir **2 columnas nuevas** en tu hoja de Google Sheets llamada **"Leads"**.

### Estructura Actualizada de Columnas

| Columna | Nombre | Tipo | Descripción |
|---------|--------|------|-------------|
| A | Fecha | Fecha/Hora | Fecha y hora del lead |
| B | Nombre | Texto | Nombre del contacto |
| C | Teléfono | Texto | Teléfono del contacto |
| D | Ubicación | Texto | Población donde está el inmueble |
| E | Servicio | Texto | Nombre del servicio pericial |
| F | Categoría | Texto | Categoría del servicio |
| G | Tipo Legal | Texto | "demanda_judicial" o "reclamacion_previa" |
| H | Urgencia | Texto | "alta", "media" o "normal" |
| I | Session ID | Texto | ID de sesión del chatbot |
| J | Estado | Texto | "PENDIENTE", "CONTACTADO", etc. |
| K | Notas | Texto | Notas internas del perito |
| **L** | **Descripción Caso** | **Texto** | **🆕 NUEVA: Descripción técnica del caso** |
| **M** | **Rol Cliente** | **Texto** | **🆕 NUEVA: Rol del cliente (propietario, inquilino, etc.)** |

---

## 🔧 Pasos para Actualizar

### Opción 1: Añadir Encabezados Manualmente

1. Abre tu hoja de Google Sheets
2. Ve a la pestaña **"Leads"**
3. En la celda **L1** escribe: `Descripción Caso`
4. En la celda **M1** escribe: `Rol Cliente`

### Opción 2: Usar Script de Apps Script

Si ya tienes datos y quieres evitar errores, puedes usar este script:

```javascript
function actualizarEncabezadosLeads() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  
  // Añadir nuevos encabezados
  sheet.getRange('L1').setValue('Descripción Caso');
  sheet.getRange('M1').setValue('Rol Cliente');
  
  Logger.log('✅ Encabezados actualizados correctamente');
}
```

**Ejecución:**
1. En Google Sheets: **Extensiones** → **Apps Script**
2. Pega el código anterior
3. Haz clic en **Ejecutar** (⏵)

---

## 📊 Ejemplo de Datos en las Nuevas Columnas

### Columna L: Descripción Caso
Ejemplos de lo que se guardará:

```
"Han arrancado toda la instalación eléctrica y el pavimento está roto, unos 200m²"

"Grietas verticales en fachada principal desde hace 6 meses, afectan 2 plantas"

"Accidente de tráfico en rotonda, atropello a peatón, vehículo Seat León"

"Humedad en sótano continua, afecta todo el perímetro, unos 150m²"
```

### Columna M: Rol Cliente
Valores posibles:

- `propietario`
- `inquilino`
- `comprador`
- `vendedor`
- `afectado`
- `causante`
- `constructor`
- `otro`

---

## ✅ Verificación

Después de actualizar, la primera fila (encabezados) de tu hoja "Leads" debería verse así:

```
A          B       C          D          E           F          G           H         I           J         K       L                   M
Fecha      Nombre  Teléfono   Ubicación  Servicio    Categoría  Tipo Legal  Urgencia  Session ID  Estado    Notas   Descripción Caso    Rol Cliente
```

---

## 🚨 IMPORTANTE

- **NO cambies el orden** de las columnas A-K (las existentes)
- Las nuevas columnas **L y M** pueden estar vacías en leads antiguos
- El chatbot empezará a llenar estas columnas automáticamente en los nuevos leads

---

## 🧪 Prueba

Para verificar que todo funciona:

1. Abre el widget del chatbot
2. Completa una conversación de prueba:
   - Selecciona un tipo de problema
   - Responde el rol (ej: "Propietario")
   - Describe el caso (ej: "Grietas en la fachada de 3 metros")
   - Completa ubicación, nombre y teléfono
3. Revisa la hoja "Leads" → la última fila debería tener datos en las columnas L y M

---

## 📧 Notificación por Email

El email que recibas también incluirá ahora estas secciones:

```
ROL DEL CLIENTE:
- propietario

DESCRIPCIÓN DEL CASO:
Han arrancado toda la instalación eléctrica y el pavimento está roto, unos 200m²
```

Esto te permitirá preparar un presupuesto más preciso **ANTES** de llamar al cliente.
