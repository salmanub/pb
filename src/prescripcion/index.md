---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /asesoramiento-estructural/prescripcion-tecnica/
lang: es
audience: pro
eleventyNavigation:
  notshow: true
translations:
  - lang: ca
    permalink: /ca/assessorament-estructural/prescripcio-tecnica/
  - lang: en
    permalink: /en/structural-consulting/technical-specification/
title: "Prescripción Técnica de Sistemas Constructivos"
description: "Prescripción independiente de sistemas de impermeabilización, pavimentos y refuerzo estructural, por prestaciones y no por marca, con asistencia en reunión para defenderla ante la dirección facultativa."
breadcrumb_parent:
  label: "Asesoramiento Estructural"
  url: "/asesoramiento-estructural/"

# ── BORRADOR — pendiente de validación por Albert ────────────────────────────
# Textos de un primer borrador sobre el enfoque acordado: expertos en los
# sistemas, pero independientes de la marca.
# NO se cita ninguna obra concreta como caso de referencia. Decisión de Albert
# (30/08/2026): la obra de equipamiento cultural está en fase de oferta, no
# adjudicada; nombrarla en el futuro será una decisión explícita suya.
# ─────────────────────────────────────────────────────────────────────────────

svc_num: "PRESC·01"
svc_tag: "Prescripción independiente — sin vinculación con fabricante"

svc_lsi:
  - "UNE-EN 1504"
  - "CTE DB-HS 1"
  - "UNE-EN 13813"
  - "Código Estructural"
  - "Pliego de prescripciones"
  - "Dirección facultativa"

subsystems_eyebrow: "§ 2.7 Subsistemas"
subsystems_title: "Tres subsistemas, un mismo método"
subsystems_lede: "Cada subsistema se prescribe por prestaciones normalizadas y criterios de aceptación medibles. El documento resultante lo puede ofertar cualquier fabricante cuyo producto los cumpla."
subsystems:
  - ref: "§ 2.7.1"
    icon: "impermeabilizacion"
    name: "Impermeabilización"
    desc: "Cubiertas, sótanos, depósitos y elementos enterrados. Definición del sistema según el soporte real y las solicitaciones de servicio, con puntos singulares resueltos en detalle: encuentros, juntas, sumideros y pasos de instalación."
    norms:
      - "CTE DB-HS 1"
      - "UNE-EN 13967"
  - ref: "§ 2.7.2"
    icon: "pavimentos"
    name: "Pavimentos técnicos"
    desc: "Pavimentos continuos industriales y de equipamiento público. Prestación mecánica y química exigible, preparación del soporte, tratamiento de juntas y criterios de recepción medibles en obra, no en catálogo."
    norms:
      - "UNE-EN 13813"
      - "UNE-EN 1504-2"
  - ref: "§ 2.7.3"
    icon: "refuerzo"
    name: "Refuerzo estructural"
    desc: "Recuperación o incremento de capacidad portante: fibra de carbono, recrecidos, chapa encolada o postesado exterior. La prescripción parte del recálculo, no del producto disponible."
    norms:
      - "UNE-EN 1504-4"
      - "Código Estructural"
    url: "/asesoramiento-estructural/refuerzo-fibra-carbono/"
    url_label: "Dictamen de necesidad de refuerzo"

body_blocks:
  - h: "Qué es una prescripción técnica independiente"
    p: "Es la definición documentada del sistema constructivo que resuelve una patología concreta: qué familia de productos, con qué prestaciones normalizadas, sobre qué soporte, con qué preparación previa, en qué espesores y bajo qué condiciones de puesta en obra. Se redacta a partir del diagnóstico, no del catálogo. El resultado es un documento que cualquier fabricante con producto conforme puede ofertar."
  - h: "La responsabilidad no se transfiere con el catálogo"
    p: "Quien firma un proyecto o dirige una obra responde de la solución adoptada. El fabricante responde de su producto —de que cumpla lo que declara su marcado CE y su ficha técnica—, no de que ese producto sea el adecuado para este soporte, esta patología y estas condiciones de servicio. Son dos responsabilidades distintas y no son intercambiables. Aceptar la propuesta del departamento técnico de una marca no traslada a esa marca la responsabilidad de la elección: la deja donde estaba, en la dirección facultativa, pero ahora sostenida por un criterio que no es propio y que no se puede defender con documentación propia."
  - h: "Por qué se prescribe mal con frecuencia"
    p: "La solución técnica suele llegar del departamento técnico de un fabricante. Es competente, pero parte de una restricción evidente: solo puede proponer su propia gama. Cuando el sistema adecuado no está en ese catálogo, se fuerza el que sí está. El coste de ese ajuste no aparece en el presupuesto: aparece dos o tres años después, en forma de patología recurrente y de una discusión sobre quién responde de ella —discusión que, sin un criterio documentado, la dirección facultativa pierde."
  - h: "Independiente significa que no vendemos producto"
    p: "Conocemos los sistemas de los principales fabricantes del sector y trabajamos con ellos a diario en obra, pero no distribuimos, no aplicamos y no percibimos comisión de ninguna marca. La prescripción se redacta por prestaciones y normas de producto —no por nombre comercial—, de modo que la propiedad conserva la capacidad de licitar y comparar ofertas sin quedar cautiva de un proveedor. Los honorarios los paga íntegramente el cliente, y esa es la única razón por la que la prescripción puede ser independiente."
  - h: "Asistencia en reunión: defender la prescripción"
    p: "Una prescripción correcta que no se sostiene en la reunión no sirve de nada. Acompañamos al despacho o a la empresa a la reunión con la propiedad, la dirección facultativa o el contratista para explicar el criterio, responder a las objeciones técnicas y dejar constancia en acta de los condicionantes de ejecución. Es la parte del trabajo donde se decide si el sistema se ejecuta como está prescrito o se degrada por el camino."
  - h: "Continuidad con la actuación pericial"
    p: "La prescripción se apoya en el mismo método que un dictamen: diagnóstico de causa, caracterización del soporte, ensayos cuando el estado del elemento lo exige y trazabilidad documental de cada decisión. Una afirmación técnica sin ensayo detrás es una opinión; con ensayo y norma detrás es prueba. Si el asunto acaba en reclamación, el expediente ya está construido con el rigor que exige la <a href='/informes-periciales/'>prueba pericial</a>."

method_steps:
  - t: "Diagnóstico de la patología"
    d: "Inspección, caracterización del soporte y determinación de la causa. Sin causa establecida no hay prescripción posible: solo reparación sintomática."
  - t: "Definición del sistema por prestaciones"
    d: "Selección de la familia de productos y de las prestaciones normalizadas exigibles (UNE-EN 1504 y concordantes), con criterios de aceptación medibles."
  - t: "Pliego de condiciones de ejecución"
    d: "Preparación de soporte, espesores, condiciones ambientales, tiempos de espera entre capas, controles de ejecución y criterios de recepción."
  - t: "Comparativa de ofertas"
    d: "Verificación de que las soluciones ofertadas por los distintos fabricantes cumplen las prestaciones exigidas. Análisis de equivalencias reales."
  - t: "Asistencia en reunión"
    d: "Presencia técnica ante la propiedad, la dirección facultativa o el contratista para defender el criterio y fijar los condicionantes en acta."
  - t: "Seguimiento de ejecución"
    d: "Control de puntos críticos durante la puesta en obra y verificación de que lo ejecutado corresponde a lo prescrito."

faq:
  - q: "¿Trabajan con marcas concretas de sistemas constructivos?"
    a: "Conocemos y evaluamos los sistemas de los principales fabricantes del sector. Lo que no hacemos es prescribir por marca: el documento define prestaciones y normas de producto, y cualquier fabricante cuyo sistema las cumpla puede ofertar."
  - q: "¿Reciben comisión de algún fabricante?"
    a: "No. No distribuimos producto, no aplicamos y no tenemos acuerdos de prescripción con ninguna marca. Los honorarios los paga íntegramente el cliente."
  - q: "¿Puede la dirección facultativa apoyarse en la propuesta del fabricante?"
    a: "Puede tomarla como información de partida, pero la responsabilidad de la elección sigue siendo suya. El fabricante responde de que su producto cumpla lo declarado; no de que sea el adecuado para ese soporte y esas condiciones de servicio."
  - q: "¿Pueden defender la prescripción ante la dirección facultativa?"
    a: "Sí. La asistencia en reunión forma parte del encargo cuando así se contrata: explicamos el criterio técnico, respondemos a las objeciones y dejamos los condicionantes de ejecución reflejados en acta."
  - q: "¿Sirve la prescripción si el asunto termina en litigio?"
    a: "El expediente se construye con trazabilidad documental desde el diagnóstico, de modo que puede sostenerse como prueba técnica. Si el litigio se plantea, la actuación pericial parte de un trabajo ya documentado."
  - q: "¿Qué diferencia hay con el asesoramiento de un fabricante?"
    a: "El departamento técnico de un fabricante propone soluciones dentro de su propia gama, que es lo que puede hacer. Una prescripción independiente parte de la patología y llega al sistema que la resuelve, con independencia de quién lo fabrique."

qualLabel: "Prescripción técnica · PRESC·01"
qualItems:
  - num: "01"
    text: "Diagnóstico de la patología y su causa"
  - num: "02"
    text: "Sistema definido por prestaciones, no por marca"
  - num: "03"
    text: "Pliego de ejecución y criterios de recepción"
  - num: "04"
    text: "Asistencia en reunión de defensa técnica"
qualCta: "Consultar una prescripción"
qualNote: "Sin vinculación con fabricante"

band_eyebrow: "Prescripción técnica"
band_title: "¿Necesita una prescripción que se sostenga en la reunión?"
band_lede: "Evaluación inicial del caso sin coste. Alcance y honorarios cerrados por escrito antes de empezar."
band_cta: "Plantear el caso"
---
{% include "layouts/service.njk" %}
