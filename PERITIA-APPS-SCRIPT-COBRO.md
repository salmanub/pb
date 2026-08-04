# Peritia · Apps Script — cobro (Stripe/Wise) + fotos del formulario

Código listo para pegar en el **Apps Script del CRM** (el web app `CRM_WEBAPP_URL`).
Empareja con las Cloudflare Functions ya creadas en perito:
`functions/api/create-payment.js` y `functions/api/stripe-webhook.js`.

## Flujo
1. Llega el lead del formulario → `doPost` guarda la fila **y las fotos** en Drive.
2. Un humano revisa y **aprueba el importe** → llamas a `crearEnlaceCobro(...)` (botón/menú)
   → obtienes `stripe_url` / `wise_url` → los metes en el email/PDF del presupuesto.
3. El cliente paga por Stripe → el webhook (`/api/stripe-webhook`) hace POST con
   `action:'pago'` → `doPost` lo detecta y **marca la fila como PAGADO**.

## Configuración (arriba del script)
```javascript
const API_BASE = 'https://perito.barcelona';
const PERITIA_API_TOKEN = 'PON_EL_MISMO_TOKEN_QUE_EN_CLOUDFLARE'; // == env.PERITIA_API_TOKEN
const DRIVE_FOLDER_ID = 'ID_DE_LA_CARPETA_DRIVE_PARA_FOTOS';
const HOJA_PRESUPUESTOS = 'Presupuestos'; // nombre de tu hoja
```

## 1) Generar el enlace de cobro al aprobar (llámalo desde tu botón/menú)
```javascript
function crearEnlaceCobro(presupuestoId, importeEur, concepto, email) {
  const res = UrlFetchApp.fetch(API_BASE + '/api/create-payment', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-auth-token': PERITIA_API_TOKEN },
    payload: JSON.stringify({
      presupuesto_id: presupuestoId,
      amount_eur: importeEur,     // p.ej. 850  (el importe cerrado que has aprobado)
      concepto: concepto,         // p.ej. 'Informe pericial vicios ocultos + ratificación'
      email: email
    }),
    muteHttpExceptions: true
  });
  const data = JSON.parse(res.getContentText() || '{}');
  // data.stripe_url  → botón "Pagar con tarjeta"
  // data.wise_url    → botón "Pagar por Wise"
  return data;
}
```

## 2) doPost: leads del formulario + avisos de pago del webhook
```javascript
function doPost(e) {
  const body = JSON.parse((e.postData && e.postData.contents) || '{}');

  // (a) Aviso de pago desde /api/stripe-webhook
  if (body.action === 'pago') {
    marcarPagado(body);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // (b) Lead normal del formulario
  const fila = guardarLead(body);                 // ← tu lógica actual de escritura en Sheets
  if (body.fotos && body.fotos.length) {
    const urls = guardarFotos(body);
    // opcional: escribe urls.join(', ') en la columna "Fotos" de esa fila
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3) Marcar presupuesto como PAGADO (busca por presupuesto_id)
```javascript
function marcarPagado(p) {
  const sh = SpreadsheetApp.getActive().getSheetByName(HOJA_PRESUPUESTOS);
  const vals = sh.getDataRange().getValues();
  const COL_ID = 0, COL_ESTADO = 5; // ⚙️ ajusta los índices a tu hoja
  for (let i = 1; i < vals.length; i++) {
    if (String(vals[i][COL_ID]) === String(p.presupuesto_id)) {
      sh.getRange(i + 1, COL_ESTADO + 1).setValue('PAGADO');
      // opcional: importe/fecha/sesión en otras columnas
      // sh.getRange(i + 1, 7).setValue(p.importe_eur);
      // sh.getRange(i + 1, 8).setValue(p.fecha);
      return;
    }
  }
}
```

## 4) Guardar fotos base64 del lead en Drive
```javascript
function guardarFotos(body) {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const urls = [];
  (body.fotos || []).forEach(function (im, i) {
    const m = /^data:(image\/\w+);base64,(.+)$/.exec(im.dataUrl || '');
    if (!m) return;
    const blob = Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], im.name || ('foto-' + (i + 1) + '.jpg'));
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    urls.push(file.getUrl());
  });
  return urls;
}
```

## Alta en Cloudflare y Stripe (recordatorio)
- **Cloudflare Pages → env vars**: `PERITIA_API_TOKEN`, `STRIPE_SECRET_KEY`,
  `STRIPE_WEBHOOK_SECRET`, `WISE_PAYMENT_URL`, `SITE_URL`, `CRM_WEBAPP_URL`,
  `ANTHROPIC_API_KEY`, `HAIKU_MODEL`.
- **Stripe → Webhooks**: añade `https://perito.barcelona/api/stripe-webhook` escuchando
  `checkout.session.completed`; copia el signing secret en `STRIPE_WEBHOOK_SECRET`.
- Vuelve a desplegar el Apps Script como **web app** tras editarlo (misma URL si mantienes
  la implementación; si creas una nueva, actualiza `CRM_WEBAPP_URL`).
```
