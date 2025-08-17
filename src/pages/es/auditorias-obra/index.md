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

## ¿Qué es una Auditoría Técnica de Obra y Cuándo Debería Considerarla?

Una auditoría técnica de obra es un examen exhaustivo e independiente de un proyecto de construcción en curso o recién finalizado. Piense en ello como una "ITV" de alta precisión para su inversión. No se basa en opiniones, sino en la **verificación objetiva** de tres pilares fundamentales: que la **calidad** se corresponda con la pactada, que los **costes** se ajusten a la realidad de la obra ejecutada y que todo el proceso cumpla con la **normativa** vigente.

Debería considerar una auditoría si se encuentra en alguna de estas situaciones:
* **Durante la ejecución:** Si tiene dudas sobre la calidad de los materiales, la correcta ejecución de una partida o la validez de las certificaciones que está pagando.
* **Antes de la recepción de la obra:** Es el momento crítico para identificar y documentar todos los repasos y defectos pendientes antes de dar la conformidad final y liberar las retenciones.
* **Cuando surgen conflictos:** Si existe una disputa con la constructora sobre mediciones, pagos o calidades, un informe de auditoría es la prueba técnica que puede resolver el conflicto sin llegar a un litigio.

## Nuestra Visión: La Auditoría como Herramienta de Prevención y Solución

En nuestro despacho, no vemos la auditoría como un mero informe de "problemas", sino como una herramienta estratégica.

* **Como prevención:** Una auditoría a tiempo permite detectar y corregir desviaciones antes de que se conviertan en problemas graves y costosos. Es la forma más eficaz de garantizar la calidad final y evitar sobrecostes inesperados.
* **Como solución:** Ante un conflicto, nuestro informe pericial de auditoría se convierte en una hoja de ruta clara y objetiva. Documenta cada hallazgo, lo fundamenta en el contrato o la normativa, y propone acciones correctoras, sirviendo como una base sólida para la negociación o, si fuera necesario, para una reclamación judicial.

## Ámbitos Clave de Nuestra Auditoría

Aunque podemos adaptar el alcance a sus necesidades, nuestras auditorías suelen centrarse en las áreas más críticas de un proyecto:

* **Control de Costes (Certificaciones y Mediciones):** Verificamos que cada euro que paga se corresponde con una obra real y correctamente ejecutada. Contrastamos las mediciones de las certificaciones con la realidad de la obra, revisamos los precios contradictorios y detectamos posibles duplicidades o errores que impactan directamente en su presupuesto.
* **Control de Calidad (Ejecución y Materiales):** Inspeccionamos in situ la ejecución de las partidas más importantes (estructura, impermeabilización, instalaciones, acabados) para asegurar que se ajustan a lo especificado en el proyecto y cumplen con la *lex artis* de la construcción. Documentamos cualquier no conformidad para su subsanación.
* **Control de Riesgos (Recepción de Obra):** La fase final es la más delicada. Realizamos una inspección exhaustiva para elaborar una "snag list" (lista de repasos) técnica y completa, asegurando que el proyecto se entrega en las condiciones pactadas y sin vicios ocultos que puedan aparecer en el futuro.

## ¿Para Quién es Esencial Nuestro Servicio de Auditoría?

Trabajamos principalmente con:
* **Promotores e Inversores:** Que necesitan una visión externa e independiente para asegurar la rentabilidad y la calidad de su inversión.
* **Comunidades de Propietarios:** Ante la recepción de obras de rehabilitación o en elementos comunes, para garantizar que la ejecución es correcta.
* **Empresas Constructoras:** Que desean una auditoría de calidad externa para validar sus procesos o para mediar en conflictos con subcontratas.
* **Administraciones Públicas:** Para el control y supervisión de obras licitadas.

