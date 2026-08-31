---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /claustro-pericial/
lang: es
eleventyNavigation:
  notshow: true
translations:
  - lang: ca
    permalink: /ca/claustre-pericial/
  - lang: en
    permalink: /en/expert-panel/
title: "Claustro Pericial | Catedráticos y Profesores Colaboradores"
description: "Cinco disciplinas universitarias que firman dictamen cuando la controversia exige el estado del arte: caminos, arquitectura, materiales de construcción, ingeniería industrial y cálculo de estructuras."
breadcrumb_parent:
  label: "El Despacho"
  url: "/el-despacho/"

# ── VALIDADO por Albert (31/08/2026) — publicado ─────────────────────────────
# Las personas NO están aquí: viven en `src/_data/catedraticos.json`, cada
# ficha con `categoria` (la key de la disciplina) y `publicado: true`. Mientras
# una disciplina no tenga persona publicada, su Card sale con el Tag «Plaza
# abierta».
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Claustro<br>pericial"

grid_eyebrow: "§ Disciplinas"
grid_title: "Cinco disciplinas, un dictamen"
grid_lede: "El expediente se asigna a la disciplina de la que depende la controversia, no a quien esté disponible. Cuando ninguna encaja, el encargo no se acepta."
open_seat_tag: "Plaza abierta"
draft_tag: "Borrador"

categories:
  - key: "caminos"
    ref: "§ ESP. 01"
    icon: "caminos"
    name: "Ingeniería de Caminos, Canales y Puertos"
    desc: "Obra civil, infraestructura y contrato público: viaductos, estructuras de paso, movimiento de tierras y liquidaciones. La controversia suele estar en el proyecto y en los modificados, no en la ejecución."
    field_label: "Obra civil · Infraestructura · LCSP"
    pillar_url: "/obras-publicas/"
    pillar_label: "Peritaje de obra pública"
  - key: "arquitectura"
    ref: "§ ESP. 02"
    icon: "arquitectura"
    name: "Arquitectura"
    desc: "Edificación, habitabilidad y cumplimiento del CTE. Vicios de proyecto y de dirección de obra, condiciones de uso y la línea —siempre discutida— entre defecto aparente y defecto oculto."
    field_label: "Edificación · CTE · Habitabilidad"
    pillar_url: "/vicios-ocultos/"
    pillar_label: "Peritaje de vicios ocultos"
  - key: "materiales"
    ref: "§ ESP. 03"
    icon: "materiales"
    name: "Ingeniería en Materiales de Construcción"
    desc: "Caracterización de hormigón, morteros, aceros y sistemas de reparación. Campaña de ensayos, interpretación de resultados y comportamiento de un material fuera de su norma de producto."
    field_label: "Ensayos · Hormigón · Durabilidad"
    pillar_url: "/patologias-estructurales/"
    pillar_label: "Peritaje de patología estructural"
  - key: "industrial"
    ref: "§ ESP. 04"
    icon: "industrial"
    name: "Ingeniería Industrial"
    desc: "Instalaciones, proceso y equipamiento. Determinación de causa raíz en fallos de servicio, seguridad de máquinas y valoración del lucro cesante asociado a una parada de producción."
    field_label: "Instalaciones · Causa raíz · Proceso"
    pillar_url: "/naves-industriales/"
    pillar_label: "Peritaje de nave industrial"
  - key: "estructuras"
    ref: "§ ESP. 05"
    icon: "estructuras"
    name: "Ingeniería de Estructuras y Cálculo"
    desc: "Modelo de cálculo, recálculo de capacidad portante, análisis por elementos finitos e interacción suelo-estructura. Es la disciplina que decide los asuntos donde se discute el propio modelo."
    field_label: "Cálculo · Recálculo · MEF"
    pillar_url: "/asesoramiento-estructural/"
    pillar_label: "Asesoramiento estructural"

body_blocks:
  - h: "Por qué un dictamen firmado desde la universidad"
    p: "Determinados asuntos no se resuelven con experiencia de obra: exigen el estado del arte de una disciplina. Un fallo de pandeo en una estructura singular, la interacción suelo-estructura en un edificio con asientos diferenciales o la caracterización de un material que se comporta fuera de su norma de producto requieren a quien investiga y publica sobre esa materia, no solo a quien la aplica."
  - h: "Cómo se integra el claustro en un dictamen"
    p: "La dirección pericial mantiene la interlocución con el letrado, la instrucción del expediente y la responsabilidad procesal. El experto académico interviene donde su criterio es determinante: modelo de cálculo, campaña de ensayos, interpretación de resultados y redacción de las conclusiones técnicas de su ámbito. Firma lo que suscribe y lo ratifica en sala conforme al artículo 347 LEC."
  - h: "Qué aporta ante el tribunal"
    p: "Un perito con trayectoria docente e investigadora contrastable ofrece al tribunal un elemento verificable: publicaciones sometidas a revisión por pares, participación en comités de normalización y docencia reglada en la materia sobre la que dictamina. Frente al contrainterrogatorio, esa trayectoria es un hecho documental, no una afirmación de parte."

band_eyebrow: "Colaboración académica"
band_title: "¿Es usted catedrático o profesor universitario?"
band_lede: "Si su especialidad encaja con la materia de un dictamen, nos interesa tenerle localizado. Conozca cómo trabajamos y en qué condiciones antes de dejarnos sus datos."
band_cta: "Colaborar como perito firmante"
band_url: "/colaboracion-peritos/"

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
