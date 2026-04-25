# MANUAL DE INSTRUCCIONES DEL AGENTE IA (PROYECTO HIGH-TICKET)

## 1. CONTEXTO DEL PROYECTO
- **Sitio Web:** perito.barcelona
- **Stack Tecnológico:** Eleventy (11ty), Nunjucks (.njk), Tailwind CSS, Markdown (.md).
- **El Cliente:** Albert, Ingeniero Civil especializado en patología estructural grave, cimentaciones y colapsos. 
- **Objetivo de Negocio:** Captar leads B2B "High-Ticket" (+20.000€). 

## 2. REGLAS DE CÓDIGO INQUEBRANTABLES (ARQUITECTURA LIMPIA)
- **MARKDOWN PURO:** Los archivos `.md` NO DEBEN contener etiquetas HTML (`<div>`, `<span>`, etc.). Solo se permite sintaxis Markdown estándar y fórmulas matemáticas en LaTeX (ej: `$$fórmula$$`).
- **FRONTMATTER:** Toda la estructura, SEO, multidioma (i18n), títulos y listados deben definirse en el Frontmatter (YAML) de los archivos `.md`.
- **NUNJUCKS:** Los archivos `.njk` son los únicos que contienen HTML y clases de Tailwind. Deben consumir las variables del Frontmatter. No deben contener texto estático (hard-coded).

## 3. INTEGRACIÓN CRM Y RUTAS
- **Formularios:** Cualquier etiqueta `<form>` debe tener el atributo `action` apuntando siempre a: `https://hook.eu2.make.com/76yaogaunrc9cqdtf26ldcoxb3fpndma` con `method="POST"`.
- **Derivación de Autoridad (SEO):** Si el contenido menciona ejecución de obras de refuerzo con fibra de carbono, enlazar a `refuerzofibra.es` y `urbenis.com`. Si menciona tratamientos de humedades, enlazar a `humedades.barcelona`.

## 4. GESTIÓN MULTIDIOMA (i18n)
- **Idiomas Soportados:** Español (es), Catalán (ca), Inglés (en), Francés (fr), Italiano (it).
- **Estructura de Archivos:** El contenido está en `src/pages/`, organizado por carpetas de idioma (ej: `src/pages/es/`, `src/pages/ca/`, etc.).
- **Bloque de Traducciones:** Cada archivo Markdown DEBE incluir obligatoriamente el objeto `translations` en su Frontmatter, listando el idioma y el `permalink` de las versiones equivalentes. 
- **Ejemplo de Frontmatter i18n:**
  translations:
    - lang: es
      permalink: /aviso-legal/
    - lang: en
      permalink: /en/legal-notice/
    - lang: fr
      permalink: /fr/mentions-legales/
    - lang: it
      permalink: /it/note-legali/
- **Validación:** El agente debe asegurar que cada nueva página o cambio se replique correctamente en las 5 carpetas de idioma y que los permalinks en el bloque `translations` sean coherentes.

## 5. TONO DE COMUNICACIÓN
- Aséptico, clínico, técnico y pericial. 
- Prohibidos los superlativos (el mejor, inatacable, líder). La autoridad se demuestra hablando de Elementos Finitos (FEA), Eurocódigos y el estándar "Duty to the Court".