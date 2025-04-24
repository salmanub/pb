---
layout: 'layouts/service-pillar.njk'
title: 'Informes Periciales de Construcción en Barcelona: Solución a Defectos y Patologías'
description: 'Perito especializado en construcción. Análisis de patologías, defectos constructivos y vicios ocultos. Informes técnicos detallados en Barcelona.'
permalink: /construccion/
lang: es
translations:
  - lang: ca
    permalink: /ca/construccio/
  - lang: en
    permalink: /en/construction/

# Hero Section
hero:
  image: /assets/images/patologia-estructural-puente-barcelona-768.avif
  title: "Peritajes de Construcción en Barcelona"
  subtitle: "Soluciones Técnicas para Problemas Constructivos"
  description: "¿Problemas con humedades, grietas o defectos en tu vivienda? Nuestros informes periciales te ayudan a obtener la solución que necesitas."

# Sections Content
sections:
  title: "¿Qué es un Informe Pericial de Construcción y Por Qué lo Necesitas?"
  intro: |
    <div class="max-w-3xl mx-auto">
      <p class="mb-6">¿Has detectado grietas que te preocupan? ¿Sufres problemas persistentes de humedades? ¿Te enfrentas a defectos constructivos tras una obra o reforma? Entendemos lo frustrante que puede ser esta situación.</p>
      
      <p>Como Ingeniero Técnico de Obras Públicas y Perito especializado en construcción, con más de 15 años analizando patologías constructivas en Barcelona, proporcionamos los informes técnicos que necesitas para identificar causas, evaluar daños y fundamentar tus reclamaciones.</p>
    </div>
  what_is:
    text: "Un informe pericial de construcción es un documento técnico especializado que analiza y documenta en detalle los problemas constructivos de tu edificio o vivienda. Realizado por un experto independiente, sirve para:"
    features:
      - "Identificar con precisión el origen de patologías y defectos"
      - "Evaluar la gravedad de los daños y su evolución"
      - "Determinar responsabilidades técnicas y legales"
      - "Valorar económicamente las reparaciones necesarias"
      - "Fundamentar reclamaciones judiciales o extrajudiciales"

# Service Cluster
serviceCluster:
  intro: "Soluciones técnicas especializadas para cada patología constructiva:"
  services:
    - title: "Grietas y Problemas Estructurales"
      description: "Evaluación experta de fisuras en paredes, grietas en forjados y problemas de estabilidad que requieren refuerzo estructural. Determinamos la gravedad y proponemos soluciones efectivas."
      url: "/construccion/grietas-estructurales/"
      icon: "building"
      features:
        - "Análisis de estabilidad estructural"
        - "Monitorización de movimientos"
        - "Propuestas de refuerzo"
    
    - title: "Humedades y Filtraciones"
      description: "Detección y análisis de manchas de humedad, goteras o filtraciones que dañan tu vivienda y afectan a la salubridad. Identificamos el origen y planteamos soluciones definitivas."
      url: "/construccion/humedades-filtraciones/"
      icon: "water"
      features:
        - "Detección de origen"
        - "Evaluación de daños"
        - "Soluciones técnicas"
    
    - title: "Problemas de Aislamiento"
      description: "Análisis de ruidos molestos, pérdidas energéticas y deficiencias en el aislamiento térmico-acústico. Verificación del cumplimiento normativo y propuestas de mejora."
      url: "/construccion/aislamiento/"
      icon: "shield"
      features:
        - "Mediciones acústicas"
        - "Análisis termográfico"
        - "Mejoras de eficiencia"
    
    - title: "Patologías en Obra Civil"
      description: "Inspección especializada de problemas en infraestructuras, puentes, túneles o edificios singulares. Análisis técnico avanzado y soluciones de ingeniería."
      url: "/construccion/obra-civil/"
      icon: "blueprint"
      features:
        - "Análisis estructural"
        - "Estudios geotécnicos"
        - "Soluciones técnicas"
    
    - title: "Vicios Ocultos y Defectos"
      description: "Detección y documentación de defectos constructivos ocultos. Informes técnicos detallados para fundamentar reclamaciones por vicios de construcción."
      url: "/construccion/vicios-ocultos/"
      icon: "search"
      features:
        - "Inspección especializada"
        - "Pruebas técnicas"
        - "Documentación exhaustiva"
    
    - title: "Certificación Técnica"
      description: "Verificación de calidad y conformidad en obras. Documentación técnica especializada para validar ejecución y materiales."
      url: "/construccion/certificacion-tecnica/"
      icon: "document"
      features:
        - "Control de calidad"
        - "Medición de obra"
        - "Informes normativos"

# Ventajas Section
benefits:
  title: "¿Por Qué Elegirnos?"
  items:
    - title: "Experiencia Técnica"
      description: "15+ años analizando patologías"
      icon: "building"
    - title: "Formación Especializada"
      description: "Ingeniero Técnico + Perito"
      icon: "document"
    - title: "Metodología Rigurosa"
      description: "Análisis exhaustivo y documentado"
      icon: "search"
    - title: "Informes Detallados"
      description: "Claridad técnica y legal"
      icon: "scale"

# Process Section
process:
  title: "Nuestro Proceso"
  steps:
    - title: "Inspección Inicial"
      description: "Visita técnica y evaluación"
    - title: "Análisis Técnico"
      description: "Estudio de causas"
    - title: "Documentación"
      description: "Informe detallado"
    - title: "Seguimiento"
      description: "Apoyo continuo"

# Testimonials Section
testimonials:
  title: "Lo que Dicen Nuestros Clientes"
  items:
    - quote: "La claridad técnica del informe fue decisiva para demostrar los defectos estructurales. Excelente trabajo documentando cada detalle."
      author: "Comunidad de Propietarios Barcelona"
      role: "Caso: Grietas estructurales"
    
    - quote: "Gran profesionalidad identificando el origen de las humedades. Las soluciones propuestas resolvieron definitivamente el problema."
      author: "Juan García"
      role: "Caso: Filtraciones"

# Call to Action
cta:
  title: "¿Necesitas un Informe Pericial?"
  description: "Contacta ahora para una evaluación gratuita de tu caso"
  button:
    text: "Solicitar Presupuesto"
    url: "/contacto/"
---

{{ sections.intro | markdown }}
