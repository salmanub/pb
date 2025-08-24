# Script de optimización de imágenes

Este script automáticamente procesa todas las imágenes de tu proyecto, generándolas en múltiples formatos (AVIF, WebP y JPEG) y tamaños para optimizar la carga web.

## Características

- Genera imágenes responsivas en dimensiones predefinidas (320px hasta 2048px de ancho)
- Crea versiones en formatos modernos (AVIF, WebP) y de respaldo (JPEG)
- Procesa imágenes en lotes para evitar sobrecarga del sistema
- Genera un informe detallado del proceso

## Requisitos

- Node.js 14+
- Dependencias: @11ty/eleventy-img, glob

## Cómo usar

1. **Instalación de dependencias**:
   ```
   npm install glob
   ```

2. **Ejecución del script**:
   ```
   npm run optimize-images
   ```

## Configuración

El script está configurado para coincidir con los parámetros de tu shortcode de imagen en `eleventy.config.js`:

- **Dimensiones**: 320, 480, 640, 768, 1024, 1280, 1536, 1920, 2048 píxeles
- **Formatos**: AVIF, WebP, JPEG
- **Directorio de salida**: ./dist/assets/images/optimized/

## Cómo funciona con tu shortcode de imagen

El script genera exactamente las mismas versiones de imagen que tu shortcode `image` procesaría al generar el sitio. 
Esto significa que cuando uses tu shortcode en cualquier parte del sitio:

```nunjucks
{% image "src/assets/images/tu-imagen.jpg", "Descripción de la imagen" %}
```

El navegador recibirá automáticamente la versión más optimizada posible según sus capacidades.

## Recomendaciones

- Ejecuta este script cada vez que añadas nuevas imágenes al proyecto
- El informe generado (`image-optimization-report.json`) te mostrará detalles de todas las versiones creadas
- Para imágenes particularmente grandes, considera optimizarlas antes con herramientas como TinyPNG
