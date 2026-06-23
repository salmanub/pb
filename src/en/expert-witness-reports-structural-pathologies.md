---
layout: layouts/base.njk
templateEngineOverride: njk
title: "Structural Pathology Assessment Report"
image: "analisis-grietas-estructurales.jpg"
image_alt: "Technical measurement of cracks and structural pathologies in concrete column"
description: "Active cracks, slab fissures, differential settlement and critical deformations. Structural analysis, FEM modelling and in-situ testing. CTE DB-SE · EHE-08."
audience: "mix"
lang: en
eleventyNavigation:
  key: Patologías estructurales
  parent: Dictamenes
  order: 1
translations:
  - lang: es
    permalink: /patologias-estructurales/
  - lang: ca
    permalink: /ca/patologies-estructurals/
permalink: "/en/structural-pathologies/"
svc_num: "EXP·03"
svc_tag: "Structural diagnosis · CTE DB-SE · EHE-08"
svc_lsi: ["CTE DB-SE", "EHE-08", "Active cracks", "Differential settlement", "Structural analysis", "FEM modelling"]
body_blocks:
  - h: "Structural pathology diagnosis"
    p: "A structural pathology is any alteration of load-bearing elements that affects the resistant capacity or stability. An accurate diagnosis is the starting point for any technical intervention or legal claim."
  - h: "Methodology"
    p: "Visual inspection and crack mapping · plaster witnesses and non-destructive testing · structural modelling in accordance with Eurocode 2 and CTE DB-SE · diagnosis including origin, severity and quantification. The report differentiates responsibilities: design, site supervision or construction (LOE art. 17)."
faq:
  - q: "Are all cracks structural?"
    a: "No. They may be thermal, shrinkage, settlement or fatigue cracks. Determining the origin requires analysis of geometry, aperture, pattern and evolution."
  - q: "When is it urgent to act?"
    a: "When the crack is active, affects load-bearing elements, exceeds 1 mm with a diagonal pattern, or there is perceptible deformation."
band_title: "Do you need this report?"
band_lede: "Free initial consultation. Contractual delivery deadlines."
---
{% set ui = en %}
{% include "layouts/service.njk" %}
