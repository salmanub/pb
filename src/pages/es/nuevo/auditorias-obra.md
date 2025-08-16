---
layout: "layouts/service-pillar.njk"
# SEO: Título más directo y enfocado en el beneficio principal (control de costes, calidad).
title: "Auditoría de Obras en Barcelona | Control de Costes, Calidad y Certificaciones"
# SEO: Meta Description activa que aborda los problemas clave del cliente.
description: "Realizamos auditorías de obra para resolver disputas en certificaciones, controlar sobrecostes y asegurar la calidad. Obtenga un informe pericial para proteger su inversión en Barcelona."
permalink: "/auditorias-de-obra/" # URL: Más limpia y directa.
lang: "es"

translations:
  - lang: ca
    permalink: /ca/auditories-d-obra/
    title: "Auditoria d’Obres a Barcelona | Control de Costos i Qualitat"
    description: "Realitzem auditories d'obra per resoldre disputes en certificacions, controlar sobrecostos i assegurar la qualitat. Obtingui un informe pericial per protegir la seva inversió."
  - lang: en
    permalink: /en/construction-audits/
    title: "Construction Audits in Barcelona | Cost & Quality Control"
    description: "We perform construction audits to resolve certification disputes, control cost overruns, and ensure quality. Get an expert report to protect your investment."

eleventyNavigation:
  key: "Auditorías de Obra"
  # ESTRUCTURA: Eliminado "parent" para que sea un elemento principal del menú.
  title: "Auditorías de Obra"
  notshow: false
  order: 3 # Orden 3 para que aparezca después de Peritajes y Asesoramiento.

# Hero Section
hero:
  title: "Auditorías Técnicas de Obra"
  strong: "Proteja su Inversión y Evite Conflictos"
  subtitle: "Control experto de calidad, costes y plazos en proyectos de construcción"
  # MENSAJE: Más directo, enfocado en el valor que se aporta.
  description: "Como peritos ingenieros independientes, nuestro servicio de auditoría de obra le proporciona una visión técnica y objetiva del estado real de su proyecto. Detectamos desviaciones, verificamos certificaciones y documentamos la calidad para que tome decisiones informadas y evite litigios costosos."
  intro: "Aplicamos una metodología rigurosa para contrastar la ejecución en obra con la documentación del proyecto, los contratos y la normativa vigente, entregando informes periciales claros y defendibles."
  image: "/assets/images/auditoria-tecnica-obra-hero.avif"

# Grid de ámbitos que sí se auditan
serviceCluster:
  title: "Nuestros Ámbitos de Auditoría"
  intro: "Ofrecemos soluciones de auditoría adaptadas a cada fase y necesidad de su proyecto:"
  services:
    - title: "Disputas de Certificaciones y Mediciones"
      description: "Revisión imparcial de partidas, mediciones y precios para resolver conflictos de pago y detectar sobrecostes."
      url: "/auditorias-obra/disputas-certificaciones-pago/"
      icon: "clipboard-list"
      features:
        - "Análisis de disputas de pago"
        - "Verificación de mediciones"
        - "Detección de sobrecostes"
    - title: "Auditoría de Ejecución y Control de Calidad"
      description: "Verificación en obra de que los materiales, soluciones constructivas y acabados cumplen con el proyecto y la normativa."
      url: "/auditorias-obra/control-calidad-ejecucion/"
      icon: "check-square"
      features:
        - "Conformidad de materiales"
        - "Supervisión de ejecución"
        - "Documentación de defectos"
    - title: "Auditoría de Pre-entrega y Recepción de Obra"
      description: "Inspección final exhaustiva para elaborar una lista de repasos ('snag list') y asegurar una entrega sin sorpresas."
      url: "/auditorias-obra/auditoria-preentrega-recepcion/"
      icon: "file-check"
      features:
        - "Listas de repasos técnicos"
        - "Pruebas de servicio finales"
        - "Asesoramiento en actas"
    - title: "Revisión Documental y de Cumplimiento Normativo"
      description: "Comprobamos que el proyecto y su ejecución se ajustan al CTE, los pliegos y la normativa urbanística aplicable."
      url: "/auditorias-obra/revision-documental-normativa/"
      icon: "file-text"
      features:
        - "Cumplimiento del CTE"
        - "Contraste con pliegos"
        - "Trazabilidad de cambios"
    - title: "Inspecciones Técnicas con Instrumentación"
      description: "Apoyamos nuestras auditorías con ensayos y equipos de medición para obtener datos objetivos sobre el estado de la obra."
      url: "/auditorias-obra/inspecciones-tecnicas-especializadas/"
      icon: "search-check"
      features:
        - "Termografía y humedades"
        - "Fisurómetros y esclerómetro"
        - "Ensayos no destructivos"
    # ESTRUCTURA: Eliminado "Asesoramiento Estructural". No pertenece a esta página.

# Sección “Qué es”
sections:
  title: "¿Qué es una Auditoría Técnica de Obra?"
  what_is:
    text: >
      Es una revisión independiente, técnica y documental de una obra para verificar la calidad de ejecución, el ajuste al proyecto y la corrección de las mediciones y certificaciones. El resultado es un informe pericial con hallazgos objetivos, evidencias trazables y recomendaciones claras para la toma de decisiones.
    features:
      - "Inspección 'in situ' y contraste documental"
      - "Revisión de calidad, seguridad y normativa"
      - "Verificación de certificaciones y partidas económicas"
      - "Detección de no conformidades y sobrecostes"
      - "Conclusiones técnicas y plan de acciones correctoras"

# Proceso
process:
  steps:
    - title: "Análisis Preliminar"
      description: "Definimos el alcance, la documentación necesaria y los objetivos de la auditoría."
    - title: "Inspección y Toma de Datos"
      description: "Realizamos la visita técnica, recopilando evidencias fotográficas y mediciones."
    - title: "Contraste y Evaluación"
      description: "Analizamos los datos frente al proyecto, normativa, certificaciones y contratos."
    - title: "Informe Pericial de Auditoría"
      description: "Entregamos el dictamen con hallazgos, conclusiones y recomendaciones defendibles."

# Beneficios
benefits:
  items:
    - icon: "check-shield"
      title: "Independencia y Objetividad"
      description: "Nuestro criterio es puramente técnico y basado en evidencias."
    - icon: "law"
      title: "Informes Defendibles"
      description: "Con validez probatoria para mediaciones, arbitrajes o procedimientos judiciales."
    - icon: "target"
      title: "Acciones Claras"
      description: "Proponemos soluciones viables y priorizadas para corregir las desviaciones."
    - icon: "trending-down"
      title: "Control de Riesgos y Costes"
      description: "Detectamos desviaciones a tiempo, evitando sobrecostes y futuros litigios."

# Testimonios
testimonials:
  title: "Casos de Éxito en Auditorías"
  items:
    - quote: "La auditoría detectó desviaciones en mediciones y calidades. Gracias al informe, ajustamos las certificaciones y evitamos un sobrecoste muy relevante."
      author: "Constructora Residencial – Barcelona"
      role: "Dirección de Proyectos"
    - quote: "El informe pericial nos dio la base objetiva que necesitábamos para negociar las correcciones con la promotora antes de la recepción de la obra."
      author: "Comunidad de Propietarios"
      role: "Administración de Fincas"

# CTA final
cta:
  title: "¿Necesita una visión técnica e independiente de su obra?"
  description: "Contacte con nuestro equipo. Analizaremos su caso para proponerle el enfoque de auditoría que mejor proteja sus intereses."
  button:
    text: "Solicitar Evaluación del Caso"
    url: "/contacto/"
---

# Auditoría Técnica de Obras en Barcelona

En **perito.barcelona** ofrecemos un servicio especializado de **auditoría técnica de obras**, orientado a promotores, comunidades de propietarios y empresas constructoras que necesitan un control independiente sobre la ejecución, los costes y la calidad de sus proyectos.

## ¿Qué es una auditoría técnica de obra?

La auditoría técnica es una **revisión independiente** de la obra para comprobar:
- La **calidad de ejecución** de materiales y acabados.  
- El **cumplimiento del proyecto y normativa vigente (CTE, ordenanzas locales, pliegos)**.  
- La **validez de certificaciones y mediciones económicas**.  
- La detección temprana de **desviaciones y no conformidades**.  

El resultado es un **informe pericial claro, imparcial y defendible**, con hallazgos trazables y propuestas de corrección.

## Cuándo conviene solicitarla

- Antes de la **recepción de obra**, para evitar reclamaciones futuras.  
- Si hay **discrepancias en certificaciones o mediciones**.  
- Cuando aparecen **patologías durante la ejecución**.  
- En proyectos con **varios contratistas o subcontratas**.  

## Nuestro proceso de trabajo

1. **Análisis preliminar** – recopilamos documentación, planos y objetivos de la auditoría.  
2. **Inspección técnica in situ** – relevé fotográfico, toma de datos, ensayos no destructivos si procede.  
3. **Contraste y evaluación** – verificamos proyecto, normativa, certificaciones y costes.  
4. **Informe pericial** – dictamen con conclusiones, evidencias y plan de acciones correctoras.  

## Beneficios para el cliente

- **Independencia técnica**: visión objetiva y contrastada.  
- **Prevención de riesgos**: detectamos desviaciones a tiempo.  
- **Acciones claras**: entregamos un plan de corrección priorizado.  
- **Informe defendible**: válido para negociación, mediación o juicio.  

