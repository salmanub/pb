---
layout: layouts/base.njk
templateEngineOverride: njk
title: "Peritatge d'Humitats i Filtracions"
image: "deteccion-humedades-termografia.jpg"
image_alt: "Detecció d'humitats amb termografia infraroja"
description: "Diagnòstic de l'origen hídric mitjançant termografia infraroja i proves d'estanquitat. Dictamen per reclamar a constructora, comunitat o asseguradora. CTE DB-HS."
audience: "particular"
lang: ca
eleventyNavigation:
  key: Humedades y filtraciones
  parent: Dictamenes
  order: 3
translations:
  - lang: es
    permalink: /humedades-filtraciones/
  - lang: en
    permalink: /en/moisture-water-leakage/
permalink: "/ca/humitats-filtracions/"
svc_num: "EXP·04"
svc_tag: "Patologia hídrica"
svc_lsi:
  [
    "CTE DB-HS",
    "Termografia infraroja",
    "Estanquitat",
    "Humitat per capil·laritat",
    "Condensació intersticial",
  ]
body_blocks:
  - h: "Origen de les humitats"
    p: "No totes les humitats tenen el mateix origen ni la mateixa solució. Poden ser per filtració, per capil·laritat, per condensació o per avaria d'instal·lacions. L'informe pericial identifica la causa amb proves objectives com termografia infraroja, proves d'estanquitat, higròmetre i determina les responsabilitats conforme al CTE DB-HS."
  - h: "Quan cal un dictamen?"
    p: "Quan la humitat reapareix després de reparacions, quan l'origen és discutit entre comunitat i propietari, quan cal reclamar a la constructora dins del termini de garantia (LOE art. 17) o quan l'asseguradora rebutja el sinistre."
faq:
  - q: "Quant costa un peritatge d'humitats?"
    a: "Depèn de la complexitat. Consulta inicial sense cost: avaluem el cas i emetem pressupost tancat per escrit."
  - q: "Poden detectar l'origen amb termografia?"
    a: "La termografia infraroja detecta diferències de temperatura que indiquen presència d'humitat oculta. Complementada amb higròmetre i proves d'estanquitat, permet localitzar l'origen amb fiabilitat."
band_title: "Necessites aquest dictamen?"
band_lede: "Consulta inicial sense cost. Termini de lliurament per contracte."
breadcrumb:
  - label: "Inici"
    url: "/"
  - label: "Dictàmens"
    url: "/informes-pericials/"
  - label: "EXP·04"
---

{% set ui = ca %}
{% include "layouts/service.njk" %}
