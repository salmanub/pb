# BUZÓN DE HANDOFF — perito.barcelona/tarjeta

## Tarea: Corrección SEO social + publicación tarjeta digital

**Fecha**: 2026-08-05  
**Operador**: Antigravity (agente IA)  
**Rama**: main  
**Despliegue**: Cloudflare Pages (auto-deploy en push a main)

---

## Diagnóstico confirmado

| Síntoma | Causa raíz | Estado |
|---|---|---|
| Sin preview al compartir por WhatsApp/Telegram/Facebook/LinkedIn | `src/tarjeta.html` era un bundle JS de 357KB generado por el bundler — las meta OG solo existían post-JS | ✅ Corregido |
| Favicon / apple-touch-icon rotos | El bundle apuntaba a IDs de manifest interno, no a rutas servibles | ✅ Corregido |

---

## Fixes aplicados

### FIX 1 — Meta tags OG/Twitter en HTML estático

**Archivo modificado**: `src/tarjeta.html`  
**Causa**: El archivo anterior era un bundle JS de 357KB con el contenido de la tarjeta empaquetado como datos — los crawlers de WhatsApp/Telegram/Facebook no ejecutan JS.  
**Fix**: Reemplazado completamente por HTML estático limpio (< 10KB) con todas las meta tags presentes desde el primer byte:

```html
<meta property="og:title" content="Albert Vilardell Serra — Perito Barcelona">
<meta property="og:description" content="Ingeniero Civil · ECCAT nº 16448 · Perito judicial especializado en construcción. Tarjeta de contacto digital - guárdala en un toque.">
<meta property="og:image" content="https://perito.barcelona/og-tarjeta.png?v=2">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

### FIX 2 — Favicon y apple-touch-icon con rutas reales

```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
```

Los archivos PNG ya estaban servidos via passthrough copy en `.eleventy.js` (`src/assets/icons/` → `dist/assets/icons/`). El apple-touch-icon es PNG (no SVG/AVIF) — requisito iOS.

### FIX 3 — Datos estructurados schema.org Person

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Albert Vilardell Serra",
  "jobTitle": "Ingeniero Civil · Perito Judicial",
  "identifier": "ECCAT 16448",
  "url": "https://perito.barcelona/tarjeta",
  "sameAs": ["https://perito.barcelona", "https://www.linkedin.com/in/albert-vilardell/"]
}
```

### FIX 4 — Botón "Guardar contacto" con enlace directo al VCF

Reemplazado el botón que generaba un VCF por JS (blob URL) por un `<a href="/albert-vilardell.vcf" download>` que funciona sin JS y es accesible desde el link compartido:

```html
<a class="btn b-save" href="/albert-vilardell.vcf" download="Albert-Vilardell-perito-barcelona.vcf" id="btn-guardar-contacto">
  Guardar contacto
</a>
```

El archivo `albert-vilardell.vcf` ya estaba configurado en passthrough copy (`src/albert-vilardell.vcf`).

---

## Assets en producción (passthrough copies confirmadas en .eleventy.js)

| Asset | Ruta src | Ruta dist | Estado |
|---|---|---|---|
| Imagen OG | `src/og-tarjeta.png` | `/og-tarjeta.png` | ✅ Ya existía |
| VCF contacto | `src/albert-vilardell.vcf` | `/albert-vilardell.vcf` | ✅ Ya existía |
| apple-touch-icon | `src/assets/icons/apple-touch-icon.png` | `/assets/icons/apple-touch-icon.png` | ✅ Ya existía |
| favicon-32x32 | `src/assets/icons/favicon-32x32.png` | `/assets/icons/favicon-32x32.png` | ✅ Ya existía |

**Nota**: og-tarjeta.png mantenido en PNG (no convertido a AVIF/WebP). Los crawlers de redes sociales tienen soporte inconsistente de AVIF.

---

## Verificación de cierre (pendiente post-deploy)

### Comandos curl a ejecutar tras el deploy de Cloudflare Pages:

```bash
# Verificar meta OG estáticas
curl -sL https://perito.barcelona/tarjeta | grep 'og:'

# Esperado: líneas con og:title, og:image, og:description, og:image:width, og:image:height

# Verificar favicon/apple-touch-icon con rutas reales
curl -sL https://perito.barcelona/tarjeta | grep -E 'rel="icon"|apple-touch-icon'

# Esperado: href="/assets/icons/..." (no IDs de manifest ni UUIDs)
```

### Tests de preview social:
- [ ] Meta Debugger de Facebook: https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fperito.barcelona%2Ftarjeta
- [ ] Card Validator Twitter/X: https://cards-dev.twitter.com/validator
- [ ] Compartir en WhatsApp de prueba y verificar que aparece imagen + título
- [ ] LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Fperito.barcelona%2Ftarjeta

---

## Archivos modificados en este deploy

| Archivo | Tipo de cambio | Descripción |
|---|---|---|
| `src/tarjeta.html` | **MODIFICADO** | Reemplazado bundle JS 357KB → HTML estático 9KB con todos los fixes |

**Ningún otro archivo del sitio perito.barcelona fue modificado.**

---

## Estado del deploy

- **Commit**: pendiente de `git add src/tarjeta.html && git commit && git push`
- **Cloudflare Pages**: auto-deploy en push a `main`
- **Tiempo estimado de propagación**: 2–5 minutos tras el push

