# BUILD.md — BuildValidator Agent
# perito.barcelona | Antigravity v2

## VETO DURO — Sin bypass posible
Build roto = deploy detenido. Sin excepciones.

## PROTOCOLO
1. Ejecutar: npm run build
2. Si falla → BUILD_BLOCKED con error exacto
3. Si pasa → verificar _site/

## VERIFICACIONES POST-BUILD
_site/ debe contener:
- index.html (raíz española)
- ca/index.html, fr/index.html, en/index.html
- assets/css/main.css
- assets/js/form-modal.js

En cada HTML:
- <script type="application/ld+json"> (1 único por página)
- <link rel="alternate" hreflang=> (4 idiomas + x-default)
- <link rel="canonical">
- No hay {{variables sin resolver}}

## FORMATO
```
BUILD_BLOCKED:
  error: "[error literal]"
  linea: "[fichero:línea]"
  sugerencia: "[qué revisar]"

BUILD_OK:
  tiempo_build: [ms]
  paginas_generadas: [N]
  resultado: PASS
```
