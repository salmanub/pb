---
layout: layouts/base.njk
templateEngineOverride: njk
title: "Cost i Honoraris d'Informes Pericials"
description: "Pressupost tancat per escrit abans de l'inici. Honoraris fixos sense costos variables. Ratificació en sala inclosa. Full d'encàrrec detallat."
image: "elaboracion-informe-pericial.jpg"
image_alt: "Pressupost d'informe pericial"
audience: "pro"
lang: ca
eleventyNavigation:
  key: Honorarios
  order: 5
translations:
  - lang: es
    permalink: /honorarios-perito-judicial-barcelona/
  - lang: en
    permalink: /en/fees/
permalink: "/ca/honoraris/"
body_blocks:
  - h: "Pressupost tancat abans de l'inici"
    p: "No s'utilitza una tarifa estàndard perquè cada cas és tècnicament diferent. El cost depèn de la complexitat, el nombre de visites, els assajos requerits i l'abast de l'anàlisi. Després d'analitzar la documentació inicial, s'emet un full d'encàrrec amb honoraris fixos tancats per escrit."
  - h: "Què inclou el pressupost"
    p: "<b>Inspecció</b> de l'immoble o infraestructura · <b>anàlisi</b> de la documentació tècnica · <b>redacció</b> i maquetació del dictamen · <b>revisió interna</b> i control de qualitat · <b>ratificació en seu judicial</b> i interrogatori creuat · <b>desplaçaments</b> a tota Espanya. No hi ha costos addicionals posteriors al pressupost acordat. Els honoraris pericials són deduïbles fiscalment com a despesa necessària per a l'obtenció de la prova."
qualLabel: "Factors de cost"
qualItems:
  - { num: "01", text: "Tipus de dictamen — part, judicial o contrainforme" }
  - { num: "02", text: "Complexitat tècnica del cas" }
  - { num: "03", text: "Nombre de visites d'inspecció" }
  - { num: "04", text: "Assajos — termografia, testimonis, FEM" }
  - { num: "05", text: "Abast geogràfic" }
  - { num: "06", text: "Urgència del termini" }
qualCta: "Sol·licitar pressupost"
qualNote: "Primera consulta sense cost"
band_eyebrow: "Sense cost"
band_title: "Vols saber quant costaria el teu informe?"
band_lede: "Primera consulta sense cost i pressupost tancat per escrit."
band_cta: "Sol·licitar pressupost"
breadcrumb:
  - label: "Inici"
    url: "/"
  - label: "Honoraris"
---
{% set ui = ca %}
{% include "layouts/service.njk" %}
