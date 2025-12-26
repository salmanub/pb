# 🔄 ACTUALIZACIÓN CHATBOT: PERFIL "PERITO/EXPERTO"

## ✅ Cambios Implementados

### 1️⃣ NUEVO SYSTEM PROMPT - Asistente Junior de Peritaje

**Antes:** Chatbot simple con tono "Ingeniero Senior", captura directa de contacto.

**Ahora:** Asistente Junior de Peritaje que investiga el caso en profundidad antes de pedir el teléfono.

**Características:**
- ✅ Tono técnico y profesional (sin empatía innecesaria)
- ✅ Flujo estructurado en 4 pasos
- ✅ Preguntas específicas según tipo de servicio
- ✅ Recopilación de información técnica concreta

---

### 2️⃣ NUEVO FLUJO CONVERSACIONAL (4 PASOS)

#### **PASO 1: Identificación del Problema**
- El usuario selecciona el tipo de caso desde el menú inicial
- Ejemplos: Vicios Ocultos, Daños Alquiler, Accidentes, Estructuras

#### **PASO 2: Determinar Rol del Cliente**
Pregunta adaptada según el tipo de caso:

| Tipo de Caso | Pregunta |
|-------------|----------|
| Daños Alquiler | "¿Eres el propietario que reclama o el inquilino?" |
| Vicios Ocultos | "¿Eres el comprador afectado o el vendedor?" |
| Accidentes | "¿Eres la parte afectada o el causante?" |
| Estructuras | "¿Eres el propietario del inmueble?" |

#### **PASO 3: Descripción Técnica (⭐ CRÍTICO)**
Solicitud de información técnica específica:

**Para Daños en Alquiler:**
- Elementos afectados (pavimento, instalaciones, paredes...)
- Metros cuadrados aproximados
- Daños estructurales visibles

**Para Vicios Ocultos:**
- Tipo de problema (grietas, humedad, defecto...)
- Desde cuándo se observa
- Superficie o zona afectada

**Para Accidentes:**
- Tipo de accidente (tráfico, laboral, atropello...)
- Elementos involucrados
- Víctimas o solo daños materiales

**Para Estructuras:**
- Tipo de daño (grietas, fisuras, deformaciones...)
- Localización en el edificio
- Si ha empeorado recientemente

#### **PASO 4: Captura de Contacto**
Solo después de obtener la descripción:
1. Cualificación jurídica (demanda vs reclamación)
2. Ubicación
3. Nombre
4. Teléfono

---

### 3️⃣ NUEVAS COLUMNAS EN GOOGLE SHEETS

Se añadieron 2 columnas en la hoja "Leads":

| Columna | Nombre | Contenido |
|---------|--------|-----------|
| **L** | `descripcion_caso` | Resumen técnico del problema proporcionado por el usuario |
| **M** | `rol_cliente` | Rol del cliente: propietario, inquilino, comprador, afectado, etc. |

**⚠️ Acción requerida:** Debes añadir manualmente estos encabezados en tu Google Sheet (ver `ACTUALIZACION-SHEETS-COLUMNAS.md`)

---

### 4️⃣ EMAIL MEJORADO

El email de notificación de lead ahora incluye:

```
ROL DEL CLIENTE:
- propietario

DESCRIPCIÓN DEL CASO:
Han arrancado toda la instalación eléctrica y el pavimento 
está roto, unos 200m²
```

Esto te permite:
- ✅ Preparar presupuesto más preciso ANTES de llamar
- ✅ Identificar si es un caso rentable
- ✅ Saber qué documentación solicitar

---

### 5️⃣ QUICK REPLIES MEJORADOS

**Problema resuelto:** Los botones (Adaptive Cards) ahora se muestran correctamente desde el primer mensaje.

**Mejoras visuales:**
- ✅ Diseño tipo "cards" más profesional
- ✅ Animación al hacer hover
- ✅ Sombras y efectos visuales mejorados
- ✅ Mejor usabilidad móvil

---

## 📋 EJEMPLO DE FLUJO COMPLETO

```
Bot: Hola, soy el Asistente de Peritaje de Perito.barcelona. 
     ¿En qué tipo de caso puedo ayudarte?
     
     [🏢 Daños Alquiler]
     [🏗️ Vicios Ocultos]
     [🚗 Accidentes]
     [🏛️ Estructuras]

Usuario: [Click en Daños Alquiler]

Bot: ¿Eres el propietario que reclama o el inquilino?

     [🏢 Propietario]
     [🔑 Inquilino]

Usuario: [Click en Propietario]

Bot: Para valorar el coste del informe pericial, necesito que 
     me describas brevemente los daños principales:
     
     • ¿Qué elementos están afectados?
     • ¿Aproximadamente cuántos metros cuadrados?
     • ¿Hay daños estructurales visibles?

Usuario: "Han arrancado toda la instalación eléctrica 
         y el pavimento está roto, unos 200m²"

Bot: Recibido. Es un caso valorable. Déjame tus datos 
     para que el perito te llame con un presupuesto.
     ¿En qué población está el inmueble?

Usuario: "Barcelona"

Bot: ¿A quién dirijo el informe preliminar?

Usuario: "Juan Pérez"

Bot: Teléfono para comentar el caso:

Usuario: "666555444"

Bot: Gracias, Juan Pérez. Hemos recibido tu caso. 
     Un perito te contactará en menos de 24h para 
     valorar el expediente y enviarte un presupuesto detallado.
```

---

## 🎯 BENEFICIOS

### Para el Perito:
- ✅ **Información técnica previa** para calcular presupuesto
- ✅ **Cualificación de leads** antes de invertir tiempo en llamadas
- ✅ **Contexto completo** del caso antes del primer contacto
- ✅ **Identificación del rol** para adaptar el discurso comercial

### Para el Cliente:
- ✅ **Conversación guiada** sin confusión
- ✅ **Sensación de profesionalidad** (bot "experto")
- ✅ **Presupuesto más preciso** en la primera llamada
- ✅ **Menor fricción** con flujo natural de preguntas

---

## 📂 Archivos Modificados

1. **[worker.js](chatbot/worker.js)** - Lógica completa del chatbot
   - Nuevo SYSTEM_PROMPT
   - Nuevos estados: CAPTURA_ROL_CLIENTE, CAPTURA_DESCRIPCION_CASO
   - Métodos `handleCapturaRolCliente()` y `handleCapturaDescripcionCaso()`
   - Actualización de `guardarLead()` para columnas L y M
   - Email mejorado con nuevos campos

2. **[widget.html](chatbot/widget.html)** - Interfaz del chatbot
   - CSS mejorado para botones tipo "Adaptive Cards"
   - Corrección de renderizado de Quick Replies

3. **[ACTUALIZACION-SHEETS-COLUMNAS.md](chatbot/ACTUALIZACION-SHEETS-COLUMNAS.md)** ⭐ NUEVO
   - Guía para añadir las columnas L y M en Google Sheets

---

## ⚠️ PRÓXIMOS PASOS

1. **Actualizar Google Sheets:**
   - Añadir columnas L (Descripción Caso) y M (Rol Cliente)
   - Ver guía: `ACTUALIZACION-SHEETS-COLUMNAS.md`

2. **Desplegar el Worker actualizado:**
   ```bash
   npx wrangler deploy
   ```

3. **Probar el flujo completo:**
   - Abrir el widget
   - Completar una conversación de prueba
   - Verificar que las columnas L y M se llenan en Google Sheets
   - Revisar el email recibido

4. **Configurar el Widget en el sitio:**
   - Actualizar la URL del API en `widget.html` (línea ~290)
   - Desplegar en el sitio web

---

## 🐛 Solución de Problemas

### Los botones no se muestran al inicio
- **Solución:** Verifica que el Worker esté desplegado correctamente
- Revisa la consola del navegador (F12) para errores

### Google Sheets no guarda las columnas L y M
- **Solución:** Verifica que hayas añadido los encabezados en L1 y M1
- Comprueba que el Service Account tenga permisos de escritura

### El email no muestra la descripción del caso
- **Solución:** Asegúrate de que el Worker esté actualizado (`npx wrangler deploy`)

---

## 📞 Soporte

Para cualquier duda sobre la implementación, revisa:
- `ESTADO-ACTUAL.md` - Estado del proyecto
- `CONFIGURACION-SHEETS-WRITE.md` - Configuración de Google Sheets
- `RESUMEN-EJECUTIVO.md` - Visión general del chatbot
