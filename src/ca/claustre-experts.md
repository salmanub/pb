---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /ca/claustre-experts/
lang: ca
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /claustro-de-expertos/
  - lang: en
    permalink: /en/academic-panel/
title: "Claustre d'Experts | Catedràtics i Professors Titulars Col·laboradors"
description: "Dictàmens signats per catedràtics i professors titulars d'universitat en càlcul d'estructures, geotècnia, enginyeria industrial i arquitectura. Autoritat acadèmica aplicada al litigi tècnic."
breadcrumb_parent:
  label: "El Despatx"
  url: "/ca/el-despatx/"

# ── ESBORRANY — pendent de validació per l'Albert ────────────────────────────
# Els textos d'aquesta pàgina són un esborrany. Els perfils del claustre NO són
# aquí: viuen a `src/_data/catedraticos.json` (una fitxa per persona, comuna als
# tres idiomes). Mentre aquest fitxer no tingui cap perfil publicat, la secció
# d'experts no es renderitza — ni el títol ni l'entradeta.
# Revisar textos i afegir com a mínim un perfil real abans de treure `noindex`.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Claustre<br>d'experts"

disciplines:
  - "Càlcul d'estructures"
  - "Geotècnia"
  - "Enginyeria de camins"
  - "Enginyeria industrial"
  - "Arquitectura"
  - "Ciència de materials"

body_blocks:
  - h: "Per què un dictamen signat des de la universitat"
    p: "Determinats assumptes no es resolen amb l'experiència d'obra: exigeixen l'estat de l'art d'una disciplina. Una fallada de vinclament en una estructura singular, la interacció sòl-estructura en un edifici amb assentaments diferencials o la caracterització d'un material que es comporta fora de la seva norma de producte requereixen qui investiga i publica sobre aquesta matèria, no només qui l'aplica."
  - h: "Com s'integra el claustre en un dictamen"
    p: "La direcció pericial manté la interlocució amb el lletrat, la instrucció de l'expedient i la responsabilitat processal. L'expert acadèmic intervé on el seu criteri és determinant: model de càlcul, campanya d'assaigs, interpretació de resultats i redacció de les conclusions tècniques del seu àmbit. Signa allò que subscriu i ho ratifica en sala conforme a l'article 347 LEC."
  - h: "Què aporta davant el tribunal"
    p: "Un perit amb trajectòria docent i investigadora contrastable ofereix al tribunal un element verificable: publicacions sotmeses a revisió per parells, participació en comitès de normalització i docència reglada en la matèria sobre la qual dictamina. Davant del contrainterrogatori, aquesta trajectòria és un fet documental, no una afirmació de part."

faculty_eyebrow: "Perfils col·laboradors"
faculty_title: "Experts acadèmics del claustre"
faculty_lede: "Cada assumpte s'assigna al perfil l'especialitat del qual coincideix amb la matèria controvertida. No s'obre expedient sense que existeixi aquesta coincidència."
faculty_specialties_label: "Matèries de dictamen"
faculty_publications_label: "Producció científica"
faculty_placeholder_badge: "Esborrany"
faculty_ref_prefix: "PERFIL"

band_eyebrow: "Col·laboració acadèmica"
band_title: "És vostè catedràtic o professor titular?"
band_lede: "Si la seva especialitat encaixa amb la matèria d'un dictamen, ens interessa tenir-lo localitzat. Conegui com treballem i en quines condicions abans de deixar-nos les seves dades."
band_cta: "Col·laborar com a perit signant"
band_url: "/ca/collaborar-com-a-perit/"

qualLabel: "Assignació d'expedient"
qualItems:
  - num: "01"
    text: "Matèria controvertida i disciplina implicada"
  - num: "02"
    text: "Coincidència amb l'especialitat de l'expert"
  - num: "03"
    text: "Abast del dictamen i campanya d'assaigs"
  - num: "04"
    text: "Ratificació en sala — LEC art. 347"
qualCta: "Consultar un cas"
qualNote: "Confidencial · Sense compromís"
---
{% set ui = ca %}
{% include "layouts/claustro.njk" %}
