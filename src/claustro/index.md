---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /cuadro-de-expertos/
lang: es
eleventyNavigation:
  notshow: true
translations:
  - lang: ca
    permalink: /ca/quadre-experts/
  - lang: en
    permalink: /en/expert-panel/
title: "Cuadro de Expertos | Peritos Colaboradores por Materia"
description: "Seis materias periciales cubiertas por peritos colaboradores: estructuras, geotecnia, edificación, instalaciones, materiales y obra pública. Aval académico, de obra, de laboratorio o de administración."
breadcrumb_parent:
  label: "El Despacho"
  url: "/el-despacho/"

# ── BORRADOR — pendiente de validación por Albert ────────────────────────────
# Las personas NO están aquí: viven en `src/_data/expertos.json`, cada ficha con
# `materia` (key de la materia), `familia` (procedencia del aval) y
# `publicado: true`. Mientras una materia no tenga persona publicada, su Card
# sale con el Tag «Plaza abierta».
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Cuadro<br>de expertos"

grid_eyebrow: "§ Materias"
grid_title: "Seis materias, un criterio de asignación"
grid_lede: "El expediente se asigna a la materia de la que depende la controversia. Cuando ninguna encaja con el asunto, el encargo no se acepta."
open_seat_tag: "Plaza abierta"
draft_tag: "Borrador"

familia_labels:
  academico: "Universidad"
  mixto: "Docencia y ejercicio"
  obra: "Obra"
  nicho: "Especialidad"
  industria: "Industria"
  colegio: "Colegio"

materias:
  - key: "estructuras"
    ref: "§ MAT. 01"
    icon: "estructuras"
    name: "Estructuras y cálculo"
    desc: "Modelo de cálculo, recálculo de capacidad portante y análisis por elementos finitos. Es la materia de los asuntos en los que lo discutido es el propio modelo, no su ejecución."
    field_label: "Recálculo · MEF · Código Estructural"
    pillar_url: "/asesoramiento-estructural/"
    pillar_label: "Asesoramiento estructural"
  - key: "geotecnia"
    ref: "§ MAT. 02"
    icon: "geotecnia"
    name: "Geotecnia y cimentación"
    desc: "Asientos diferenciales, excavaciones, afectación a medianeras e interacción suelo-estructura. La controversia se dirime en la caracterización del terreno."
    field_label: "Asientos · Recalces · CTE DB-SE-C"
    pillar_url: "/patologias-estructurales/"
    pillar_label: "Patología estructural"
  - key: "edificacion"
    ref: "§ MAT. 03"
    icon: "edificacion"
    name: "Edificación y habitabilidad"
    desc: "Vicios de proyecto y de dirección de obra, condiciones de uso y cumplimiento del CTE. Incluye la delimitación entre defecto aparente y defecto oculto."
    field_label: "CTE · Habitabilidad · CC art. 1484"
    pillar_url: "/vicios-ocultos/"
    pillar_label: "Vicios ocultos"
  - key: "instalaciones"
    ref: "§ MAT. 04"
    icon: "instalaciones"
    name: "Instalaciones y proceso industrial"
    desc: "Fallos de servicio en instalaciones, equipamiento y proceso. Determinación de causa raíz, seguridad de máquinas y lucro cesante por parada de producción."
    field_label: "Causa raíz · RIPCI · Lucro cesante"
    pillar_url: "/naves-industriales/"
    pillar_label: "Naves industriales"
  - key: "materiales"
    ref: "§ MAT. 05"
    icon: "materiales"
    name: "Materiales y ensayos"
    desc: "Caracterización de hormigón, morteros, aceros y sistemas de reparación. Campaña de ensayos y comportamiento de un material fuera de su norma de producto."
    field_label: "Ensayos ENAC · UNE-EN 1504 · Durabilidad"
    pillar_url: "/reclamacion-mala-ejecucion/"
    pillar_label: "Reclamación por mala ejecución"
  - key: "obra-publica"
    ref: "§ MAT. 06"
    icon: "obra-publica"
    name: "Obra pública y contrato"
    desc: "Viaductos, estructuras de paso y movimiento de tierras. Modificados de proyecto, liquidación de contrato y responsabilidad bajo la Ley de Contratos del Sector Público."
    field_label: "LCSP · Modificados · Liquidación"
    pillar_url: "/obras-publicas/"
    pillar_label: "Peritaje de obra pública"

familias_eyebrow: "§ Procedencia del aval"
familias_title: "Seis procedencias del aval, ninguna subsidiaria de las demás"
familias_lede: "Un dictamen se sostiene sobre lo que su firmante puede acreditar ante el tribunal. Esa acreditación tiene seis orígenes distintos, y ninguno sustituye a los demás."
familias:
  - k: "Universidad"
    v: "Catedráticos y profesores titulares. Publicaciones sometidas a revisión por pares y participación en comités de normalización: trayectoria verificable en el contrainterrogatorio."
  - k: "Docencia y ejercicio"
    v: "Profesorado asociado que compatibiliza la universidad con ejercicio profesional propio. Suma criterio académico y práctica de encargo real."
  - k: "Obra"
    v: "Jefatura de obra, dirección técnica y de producción con dos o tres décadas de ejercicio. La experiencia de campo acredita por sí sola: no se exige credencial académica ni docencia. Aporta el comportamiento real de la solución construida, que no se deduce del modelo."
  - k: "Especialidad"
    v: "Protección contra incendios, acústica, geotecnia de campo, termografía y metrología. Materias que aparecen poco y exigen instrumentación propia."
  - k: "Industria"
    v: "Antiguos responsables técnicos de fabricante o de laboratorio, ya desvinculados. Conocen el sistema por dentro sin representar a la marca."
  - k: "Colegio"
    v: "Peritos inscritos en listas de otros colegios y territorios, para asuntos cuya jurisdicción queda fuera de Cataluña."

body_blocks:
  - h: "Cuándo se incorpora un perito del cuadro"
    p: "Cuando la materia controvertida exige un conocimiento que la dirección pericial no puede acreditar por sí misma: el estado del arte de una disciplina, una campaña de ensayos con instrumentación específica o la práctica de un procedimiento constructivo concreto. La incorporación se decide por la materia del asunto, no por la disponibilidad del colaborador."
  - h: "Cómo se integra en el dictamen"
    p: "La dirección pericial mantiene la interlocución con el letrado, la instrucción del expediente y la responsabilidad procesal. El perito colaborador interviene donde su criterio es determinante —modelo de cálculo, campaña de ensayos, interpretación de resultados— y redacta las conclusiones técnicas de su ámbito. Firma lo que suscribe y lo ratifica en sala conforme al artículo 347 LEC."
  - h: "Qué aporta ante el tribunal"
    p: "Un firmante cuya trayectoria es documental —publicaciones, colegiación, años de dirección de obra acreditados, acreditación ENAC del laboratorio— ofrece al tribunal un elemento verificable. Frente al contrainterrogatorio, esa trayectoria es un hecho, no una afirmación de parte."

band_eyebrow: "Colaboración"
band_title: "Alta en el registro de peritos colaboradores"
band_lede: "El registro admite perfil académico y perfil profesional en igualdad de condiciones. Las condiciones de colaboración y la disponibilidad real de encargos constan en la página de alta."
band_cta: "Colaborar como perito firmante"
band_url: "/colaboracion-peritos/"

qualLabel: "Asignación de expediente"
qualItems:
  - num: "01"
    text: "Materia controvertida y disciplina implicada"
  - num: "02"
    text: "Coincidencia con la especialidad del perito"
  - num: "03"
    text: "Alcance del dictamen y campaña de ensayos"
  - num: "04"
    text: "Ratificación en sala — LEC art. 347"
qualCta: "Consultar un caso"
qualNote: "Confidencial · Sin compromiso"
---
{% include "layouts/claustro.njk" %}
