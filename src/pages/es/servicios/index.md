---
layout: "layouts/service-pillar.njk"
title: "Servicios Periciales en Construcción | Perito Barcelona"
description: "Servicios periciales en construcción y obra civil: auditorías técnicas, peritaje judicial, inspecciones y asesoramiento en estabilidad y refuerzo estructural en Barcelona."
permalink: "/servicios-periciales/"
lang: es
translations:
  - lang: ca
    permalink: /ca/serveis/
  - lang: en
    permalink: /en/services/

eleventyNavigation:
  key: "Servicios"
  title: "Servicios"
  notshow: false
  order: 2
hero:
  title: "Servicios Periciales"
  strong: "en Construcción y Obra Civil"
  subtitle: "Auditorías, peritaje judicial, inspecciones y asesoramiento estructural"
  description: "Evaluación independiente, diagnósticos precisos y dictámenes técnicos defendibles para resolver disputas y tomar decisiones informadas."
  intro: "Como ingenieros técnicos y peritos colegiado, integramos metodología pericial y normativa para ofrecer informes sólidos, claros y accionables."
  image: "/assets/images/hero-servicios-periciales.avif"
serviceCluster:
  title: "Áreas Especializadas"
  intro: "Selecciona el ámbito de peritaje que necesitas"
  services:
    - title: "Peritajes de Construcción"
      description: "Patologías, defectos de ejecución y vicios ocultos en edificación y obra civil."
      url: "/peritajes-construccion/"
      icon: "home-repair"
      features:
        - "Grietas y deformaciones estructurales"
        - "Humedades y filtraciones"
        - "Defectos de ejecución"
    - title: "Peritaje Judicial y de Parte"
      description: "Informes periciales, ratificación y defensa técnica en litigios y mediaciones."
      url: "/peritaje-judicial-obra/"
      icon: "scale"
      features:
        - "Dictamen, conclusiones y evidencias"
        - "Audiencia y ratificación"
        - "Asistencia a mediación/arbitraje"
    - title: "Auditoría Técnica de Obras"
      description: "Control de calidad, cumplimiento normativo y detección temprana de deficiencias."
      url: "/auditoria-tecnica-obra/"
      icon: "clipboard-list"
      features:
        - "Revisión de partidas y mediciones"
        - "No conformidades y propuestas"
        - "Plan de acciones correctoras"
    - title: "Inspecciones Técnicas Especializadas"
      description: "Diagnóstico con instrumentación y ensayos no destructivos."
      url: "/inspecciones-tecnicas-especializadas/"
      icon: "search-check"
      features:
        - "Termografía / humedad"
        - "Relevés y fisuración"
        - "END según norma"
    - title: "Asesoramiento Pericial en Reparación y Refuerzo"
      description: "Evaluación de estabilidad y necesidad de intervención. (La ejecución/cálculo se realiza en otra empresa)."
      url: "/asesoramiento-estructural/"
      icon: "tool"
      features:
        - "Diagnóstico de seguridad estructural"
        - "Criterios de reparación y refuerzo"
        - "Memoria técnica de recomendaciones"
    - title: "Peritajes de Seguros (secundario)"
      description: "Valoraciones y contraperitajes cuando el caso lo requiere."
      url: "/peritajes-seguros/"
      icon: "shield"
      features:
        - "Daños por agua/incendio"
        - "Coberturas y discrepancias"
        - "Informes para reclamación"
sections:
  title: "¿Qué incluye un servicio pericial?"
  what_is:
    text: "<p>Aplicamos metodología pericial, normativa vigente y evidencia documental para emitir informes defensables, orientados a resolver disputas o prevenirlas.</p>"
    features:
      - "Inspección técnica in situ y análisis documental"
      - "Hipótesis, pruebas y conclusiones motivadas"
      - "Estimación de daños y cuantificación económica"
      - "Propuestas de actuación: reparación/prevención"
process:
  steps:
    - title: "Contacto y análisis preliminar"
      description: "Comprensión del caso y alcance pericial."
    - title: "Inspección y toma de datos"
      description: "Visita técnica, ensayos y evidencias."
    - title: "Informe pericial"
      description: "Conclusiones motivadas y anexos."
    - title: "Defensa"
      description: "Ratificación y apoyo técnico."
benefits:
  items:
    - icon: "check-shield"
      title: "Independencia y rigor"
      description: "Criterios técnicos objetivos."
    - icon: "law"
      title: "Defendible"
      description: "Estructura pensada para litigio."
    - icon: "target"
      title: "Accionable"
      description: "Recomendaciones claras."
cta:
  title: "¿Necesitas un informe pericial sólido?"
  description: "Cuéntanos tu caso y te proponemos el enfoque técnico adecuado."
  button:
    text: "Solicitar evaluación"
    url: "/contacto/"
---


<section class="prose prose-lg max-w-3xl mx-auto mt-12">
  <h1>{{ intro.title }}</h1>
  <p class="lead">{{ intro.description }}</p>

  <div class="grid md:grid-cols-2 gap-8 my-12">
    {% for service in featuredServices %}
    <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
      <h2 class="text-xl font-bold mb-4">{{ service.title }}</h2>
      <p>{{ service.description }}</p>
      <a href="{{ service.url }}" class="text-cyan-600 font-medium hover:underline">Saber más →</a>
    </div>
    {% endfor %}
  </div>

  <h2>{{ specializedServices.title }}</h2>
  <div class="grid md:grid-cols-3 gap-6">
    {% for service in specializedServices.services %}
    <div class="bg-slate-50 p-4 rounded-lg">
      <h3 class="font-bold mb-2">{{ service.title }}</h3>
      <p class="text-sm">{{ service.description }}</p>
      <a href="{{ service.url }}" class="text-cyan-600 text-sm font-medium hover:underline">Ver servicio →</a>
    </div>
    {% endfor %}
  </div>

  <div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-2xl my-12">
    <h2 class="text-2xl font-bold mb-6">{{ cta.title }}</h2>
    <p class="mb-6">{{ cta.description }}</p>
    <a href="{{ cta.url }}" class="inline-block bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">
      {{ cta.button }}
    </a>
  </div>
</section>

