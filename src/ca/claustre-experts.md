---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /ca/claustre-pericial/
lang: ca
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /claustro-pericial/
  - lang: en
    permalink: /en/expert-panel/
title: "Claustre Pericial | Catedràtics i Professors Col·laboradors"
description: "Cinc disciplines universitàries que signen dictamen quan la controvèrsia exigeix l'estat de l'art: camins, arquitectura, materials de construcció, enginyeria industrial i càlcul d'estructures."
breadcrumb_parent:
  label: "El Despatx"
  url: "/ca/el-despatx/"

# ── ESBORRANY — pendent de validació per l'Albert ────────────────────────────
# Textos d'un primer esborrany. Les persones NO són aquí: viuen a
# `src/_data/catedraticos.json`, cada fitxa amb `categoria` (la key de la
# disciplina) i `publicado: true`. Mentre una disciplina no tingui persona
# publicada, la seva Card surt amb el Tag «Plaça oberta».
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Claustre<br>pericial"

grid_eyebrow: "§ Disciplines"
grid_title: "Cinc disciplines, un dictamen"
grid_lede: "L'expedient s'assigna a la disciplina de la qual depèn la controvèrsia, no a qui estigui disponible. Quan cap encaixa, l'encàrrec no s'accepta."
open_seat_tag: "Plaça oberta"
draft_tag: "Esborrany"

categories:
  - key: "caminos"
    ref: "§ ESP. 01"
    icon: "caminos"
    name: "Enginyeria de Camins, Canals i Ports"
    desc: "Obra civil, infraestructura i contracte públic: viaductes, estructures de pas, moviment de terres i liquidacions. La controvèrsia sol ser al projecte i als modificats, no a l'execució."
    field_label: "Obra civil · Infraestructura · LCSP"
    pillar_url: "/ca/informes-pericials/obres-publiques/"
    pillar_label: "Peritatge d'obra pública"
  - key: "arquitectura"
    ref: "§ ESP. 02"
    icon: "arquitectura"
    name: "Arquitectura"
    desc: "Edificació, habitabilitat i compliment del CTE. Vicis de projecte i de direcció d'obra, condicions d'ús i la línia —sempre discutida— entre defecte aparent i defecte ocult."
    field_label: "Edificació · CTE · Habitabilitat"
    pillar_url: "/ca/vicis-ocults/"
    pillar_label: "Peritatge de vicis ocults"
  - key: "materiales"
    ref: "§ ESP. 03"
    icon: "materiales"
    name: "Enginyeria en Materials de Construcció"
    desc: "Caracterització de formigó, morters, acers i sistemes de reparació. Campanya d'assaigs, interpretació de resultats i comportament d'un material fora de la seva norma de producte."
    field_label: "Assaigs · Formigó · Durabilitat"
    pillar_url: "/ca/patologies-estructurals/"
    pillar_label: "Peritatge de patologia estructural"
  - key: "industrial"
    ref: "§ ESP. 04"
    icon: "industrial"
    name: "Enginyeria Industrial"
    desc: "Instal·lacions, procés i equipament. Determinació de causa arrel en fallades de servei, seguretat de màquines i valoració del lucre cessant associat a una aturada de producció."
    field_label: "Instal·lacions · Causa arrel · Procés"
    pillar_url: "/ca/naus-industrials/"
    pillar_label: "Peritatge de nau industrial"
  - key: "estructuras"
    ref: "§ ESP. 05"
    icon: "estructuras"
    name: "Enginyeria d'Estructures i Càlcul"
    desc: "Model de càlcul, recàlcul de capacitat portant, anàlisi per elements finits i interacció sòl-estructura. És la disciplina que decideix els assumptes on es discuteix el model mateix."
    field_label: "Càlcul · Recàlcul · MEF"
    pillar_url: "/ca/assessorament-estructural/"
    pillar_label: "Assessorament estructural"

body_blocks:
  - h: "Per què un dictamen signat des de la universitat"
    p: "Determinats assumptes no es resolen amb experiència d'obra: exigeixen l'estat de l'art d'una disciplina. Una fallada de vinclament en una estructura singular, la interacció sòl-estructura en un edifici amb assentaments diferencials o la caracterització d'un material que es comporta fora de la seva norma de producte requereixen qui investiga i publica sobre aquesta matèria, no només qui l'aplica."
  - h: "Com s'integra el claustre en un dictamen"
    p: "La direcció pericial manté la interlocució amb el lletrat, la instrucció de l'expedient i la responsabilitat processal. L'expert acadèmic intervé on el seu criteri és determinant: model de càlcul, campanya d'assaigs, interpretació de resultats i redacció de les conclusions tècniques del seu àmbit. Signa allò que subscriu i ho ratifica en sala conforme a l'article 347 LEC."
  - h: "Què aporta davant el tribunal"
    p: "Un perit amb trajectòria docent i investigadora contrastable ofereix al tribunal un element verificable: publicacions sotmeses a revisió per parells, participació en comitès de normalització i docència reglada en la matèria sobre la qual dictamina. Davant del contrainterrogatori, aquesta trajectòria és un fet documental, no una afirmació de part."

band_eyebrow: "Col·laboració acadèmica"
band_title: "És vostè catedràtic o professor universitari?"
band_lede: "Si la seva especialitat encaixa amb la matèria d'un dictamen, ens interessa tenir-lo localitzat. Conegui com treballem i en quines condicions abans de deixar-nos les seves dades."
band_cta: "Col·laborar com a perit signant"
band_url: "/ca/collaboracio-perits/"

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
