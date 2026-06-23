---
layout: layouts/base.njk
templateEngineOverride: njk
title: "Peritatge per Mala Execució d'Obres"
image: "reclamacion-mala-ejecucion.jpg"
image_alt: "Reclamació per mala execució d'obres"
description: "Contrast objectiu de l'obra front a contracte, memòria de qualitats i lex artis. Quantificació d'incompliments i defectes d'acabats. LOE art. 17."
audience: "mix"
lang: ca
eleventyNavigation:
  key: Mala ejecución
  parent: Dictamenes
  order: 4
translations:
  - lang: es
    permalink: /reclamacion-mala-ejecucion/
  - lang: en
    permalink: /en/poor-execution-claim/
permalink: "/ca/reclamacio-mala-execucio/"
svc_num: "EXP·06"
svc_tag: "Incompliment contractual · LOE art. 17"
svc_lsi: ["LOE art. 17", "Memòria de qualitats", "Lex artis", "Defectes d'acabats", "Incompliment contractual"]
body_blocks:
  - h: "Contrast objectiu de l'obra"
    p: "El dictamen compara l'obra executada amb el que es va contractar: projecte, memòria de qualitats, pressupost detallat i normativa aplicable. Cada desviació es documenta fotogràficament i es quantifica econòmicament."
  - h: "Responsabilitats conforme a la LOE"
    p: "La Llei d'Ordenació de l'Edificació (LOE art. 17) estableix terminis de responsabilitat de 1, 3 i 10 anys segons la gravetat: acabats, habitabilitat o seguretat estructural. El dictamen classifica cada defecte per la seva categoria legal."
faq:
  - q: "Quin termini tinc per reclamar?"
    a: "Depèn del tipus de defecte: 1 any per acabats, 3 per habitabilitat i 10 per estructura (LOE art. 17). L'acció prescriu 2 anys des de la manifestació."
  - q: "Puc reclamar si no tinc contracte escrit?"
    a: "Sí. El pressupost, els correus electrònics, les transferències i qualsevol acord documentat serveixen com a base de comparació."
band_title: "Necessites aquest dictamen?"
band_lede: "Consulta inicial sense cost. Termini de lliurament per contracte."
---
{% set ui = ca %}
{% include "layouts/service.njk" %}
