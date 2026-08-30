---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /claustro-de-expertos/
lang: es
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: ca
    permalink: /ca/claustre-experts/
  - lang: en
    permalink: /en/academic-panel/
title: "Claustro de Expertos | Catedráticos y Profesores Titulares Colaboradores"
description: "Dictámenes firmados por catedráticos y profesores titulares de universidad en cálculo de estructuras, geotecnia, ingeniería industrial y arquitectura. Autoridad académica aplicada al litigio técnico."
breadcrumb_parent:
  label: "El Despacho"
  url: "/el-despacho/"

# ── BORRADOR — pendiente de validación por Albert ────────────────────────────
# Los textos de esta página son un borrador. Los perfiles del claustro NO están
# aquí: viven en `src/_data/catedraticos.json` (una ficha por persona, común a
# los tres idiomas). Mientras ese fichero no tenga ningún perfil publicado, la
# sección de expertos no se renderiza — ni su título ni su entradilla.
# Revisar textos y añadir al menos un perfil real antes de quitar `noindex`.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Claustro<br>de expertos"

disciplines:
  - "Cálculo de estructuras"
  - "Geotecnia"
  - "Ingeniería de caminos"
  - "Ingeniería industrial"
  - "Arquitectura"
  - "Ciencia de materiales"

body_blocks:
  - h: "Por qué un dictamen firmado desde la universidad"
    p: "Determinados asuntos no se resuelven con la experiencia de obra: exigen el estado del arte de una disciplina. Un fallo de pandeo en una estructura singular, la interacción suelo-estructura en un edificio con asientos diferenciales o la caracterización de un material que se comporta fuera de su norma de producto requieren a quien investiga y publica sobre esa materia, no solo a quien la aplica."
  - h: "Cómo se integra el claustro en un dictamen"
    p: "La dirección pericial mantiene la interlocución con el letrado, la instrucción del expediente y la responsabilidad procesal. El experto académico interviene donde su criterio es determinante: modelo de cálculo, campaña de ensayos, interpretación de resultados y redacción de las conclusiones técnicas de su ámbito. Firma lo que suscribe y lo ratifica en sala conforme al artículo 347 LEC."
  - h: "Qué aporta ante el tribunal"
    p: "Un perito con trayectoria docente e investigadora contrastable ofrece al tribunal un elemento verificable: publicaciones sometidas a revisión por pares, participación en comités de normalización y docencia reglada en la materia sobre la que dictamina. Frente al contrainterrogatorio, esa trayectoria es un hecho documental, no una afirmación de parte."

faculty_eyebrow: "Perfiles colaboradores"
faculty_title: "Expertos académicos del claustro"
faculty_lede: "Cada asunto se asigna al perfil cuya especialidad coincide con la materia controvertida. No se abre expediente sin que exista esa coincidencia."
faculty_specialties_label: "Materias de dictamen"
faculty_publications_label: "Producción científica"
faculty_placeholder_badge: "Borrador"
faculty_ref_prefix: "PERFIL"

band_eyebrow: "Colaboración académica"
band_title: "¿Es usted catedrático o profesor titular?"
band_lede: "Si su especialidad encaja con la materia de un dictamen, nos interesa tenerle localizado. Conozca cómo trabajamos y en qué condiciones antes de dejarnos sus datos."
band_cta: "Colaborar como perito firmante"
band_url: "/colaborar-como-perito/"

qualLabel: "Asignación de expediente"
qualItems:
  - num: "01"
    text: "Materia controvertida y disciplina implicada"
  - num: "02"
    text: "Coincidencia con la especialidad del experto"
  - num: "03"
    text: "Alcance del dictamen y campaña de ensayos"
  - num: "04"
    text: "Ratificación en sala — LEC art. 347"
qualCta: "Consultar un caso"
qualNote: "Confidencial · Sin compromiso"
---
{% include "layouts/claustro.njk" %}
