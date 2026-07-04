# vilardell-pdf · Cloudflare Worker (HTML → PDF)

Renderiza HTML pixel-perfect a PDF con Browser Rendering (Puppeteer) para **facturas y presupuestos** de Perito Barcelona. El Apps Script (`crm_ws.gs` → `_cfRenderPdf`) envía el HTML por POST y recibe el PDF.

> Vive **dentro del repo** en `perito11ty/cloudflare-pdf/`, al lado de `functions/`, pero es un **despliegue separado**: su propio Worker (`vilardell-pdf`), no una Page Function. Eleventy no lo procesa (input = `src/`) y Cloudflare Pages no lo publica (solo publica `dist/`). **No lo muevas dentro de `functions/`**: Pages trataría sus archivos como rutas y fallaría al importar puppeteer.

## Requisitos
- Node 18+ y `npx`.
- Cuenta Cloudflare con **Browser Rendering** habilitado (Workers Paid).

## Instalar y desplegar
```bash
cd cloudflare-pdf
npm install
npx wrangler login
# Si npm install se queja de versión, fuerza la última:
#   npm install @cloudflare/puppeteer@latest
npx wrangler deploy
```

Guarda el token secreto (el mismo que pones en Apps Script → menú ☁️ Cloudflare PDF):
```bash
npx wrangler secret put RENDER_TOKEN
# pega un token largo aleatorio cuando lo pida
```

Tras el deploy obtienes la URL: `https://vilardell-pdf.<tu-cuenta>.workers.dev`.
Pégala en el CRM: menú **⚙️ Configuración → ☁️ Cloudflare PDF (pixel-perfect)**, junto con el mismo `RENDER_TOKEN`.

## Contrato (lo que espera el `.gs`)
- **POST** JSON `{ html, filename?, format?="A4", margin? }`
- Cabecera **`x-auth-token: <RENDER_TOKEN>`**
- Respuesta **200** con `Content-Type: application/pdf` (bytes del PDF)
- **GET** → health-check (`200 OK`)

Si el Worker falla o no está configurado, el `.gs` cae automáticamente al conversor HTML→PDF interno (respaldo), así que la facturación nunca se bloquea.

## Probar
```bash
# Health-check
curl https://vilardell-pdf.<tu-cuenta>.workers.dev
# Render (guarda out.pdf)
curl -X POST https://vilardell-pdf.<tu-cuenta>.workers.dev \
  -H "x-auth-token: TU_TOKEN" -H "Content-Type: application/json" \
  --data '{"html":"<h1>Hola</h1>","filename":"prueba"}' --output out.pdf
```

## Logs
```bash
npx wrangler tail
```
