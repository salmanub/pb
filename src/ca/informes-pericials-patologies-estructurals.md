---
layout: layouts/base.njk
templateEngineOverride: njk
title: "Dictamen de Patologies Estructurals"
image_alt: "Mesurament tècnic d'esquerdes i patologies estructurals en pilar de formigó"
description: "Esquerdes actives, fissures en forjats, assentament diferencial i deformacions crítiques. Càlcul estructural, modelat FEM i assajos in situ. CTE DB-SE · EHE-08."
audience: "mix"
lang: ca
eleventyNavigation:
  key: Patologías estructurales
  parent: Dictamenes
  order: 1
translations:
  - lang: es
    permalink: /patologias-estructurales/
  - lang: en
    permalink: /en/structural-pathologies/
permalink: "/ca/patologies-estructurals/"
svc_num: "EXP·03"
svc_tag: "Diagnòstic estructural · CTE DB-SE · EHE-08"
svc_lsi: ["CTE DB-SE", "EHE-08", "Esquerdes actives", "Assentament diferencial", "Càlcul estructural", "Modelat FEM"]
body_blocks:
  - h: "Diagnòstic de patologies estructurals"
    p: "Una patologia estructural és qualsevol alteració dels elements portants que afecti la capacitat resistent o l'estabilitat. El diagnòstic correcte és el punt de partida de qualsevol intervenció tècnica o reclamació jurídica."
  - h: "Metodologia"
    p: "Inspecció visual i cartografia de fissures · testimonis de guix i assajos no destructius · modelat estructural conforme a l'Eurocodi 2 i CTE DB-SE · diagnòstic amb origen, gravetat i quantificació. El dictamen diferencia responsabilitats: projecte, direcció d'obra o execució (LOE art. 17)."
  - h: "Matèries que es resolen amb expert extern"
    p: "Quan l’objecte del dictamen excedeix la competència acreditada del perit signant, l’apartat corresponent el redacta un expert de la matèria, i la seva autoria consta a l’informe. El <a href=\"/ca/quadre-experts/\">quadre d’experts</a> relaciona les sis matèries en què es produeix aquesta incorporació i la procedència de l’aval exigida en cada cas."
faq:
  - q: "Totes les esquerdes són estructurals?"
    a: "No. Poden ser tèrmiques, de retracció, d'assentament o de fatiga. La determinació de l'origen requereix anàlisi de geometria, obertura, disposició i evolució."
  - q: "Quan és urgent actuar?"
    a: "Quan l'esquerda és activa, afecta elements portants, supera 1 mm amb disposició diagonal o hi ha deformació perceptible."
  - q: "L'aluminosi pot afectar el meu edifici?"
    a: 'Laluminosi afecta forjats amb ciment aluminós dels anys 50-70 i només es confirma amb assaig químic. Ho expliquem a <a href="/ca/blog/aluminosi-barcelona-deteccio-peritatge/">la nostra guia sobre aluminosi a Barcelona</a>.'
band_title: "Necessites aquest dictamen?"
band_lede: "Consulta inicial sense cost. Termini de lliurament per contracte."
---
{% set ui = ca %}
{% include "layouts/service.njk" %}
