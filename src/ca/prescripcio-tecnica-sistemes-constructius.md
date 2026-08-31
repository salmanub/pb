---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /ca/assessorament-estructural/prescripcio-tecnica/
lang: ca
audience: pro
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /asesoramiento-estructural/prescripcion-tecnica/
  - lang: en
    permalink: /en/structural-consulting/technical-specification/
title: "Prescripció Tècnica de Sistemes Constructius"
description: "Prescripció independent de sistemes de reparació, impermeabilització i reforç estructural, amb assistència a la reunió per defensar-la davant la propietat o la direcció facultativa. Sense vinculació amb cap fabricant."
breadcrumb_parent:
  label: "Assessorament Estructural"
  url: "/ca/assessorament-estructural/"

# ── ESBORRANY — pendent de validació per l'Albert ────────────────────────────
# Textos d'un primer esborrany sobre l'enfocament acordat: experts en els
# sistemes, però independents de la marca.
# NO se cita cap obra concreta com a cas de referència. Decisió de l'Albert
# (30/08/2026): l'obra d'equipament cultural és en fase d'oferta, no
# adjudicada; anomenar-la en el futur serà una decisió explícita seva.
# ─────────────────────────────────────────────────────────────────────────────

svc_num: "PRESC·01"
svc_tag: "Prescripció independent — sense vinculació amb fabricant"

svc_lsi:
  - "UNE-EN 1504"
  - "Codi Estructural"
  - "CTE DB-HS 1"
  - "UNE-EN 13813"
  - "Reparació de formigó"
  - "Reforç estructural"

subsystems_eyebrow: "§ 2.7 Subsistemes"
subsystems_title: "Tres subsistemes, un mateix mètode"
subsystems_lede: "Cada subsistema es prescriu per prestacions normalitzades i criteris d'acceptació mesurables. El document resultant el pot ofertar qualsevol fabricant el producte del qual els compleixi."
subsystems:
  - ref: "§ 2.7.1"
    icon: "impermeabilizacion"
    name: "Impermeabilització"
    desc: "Cobertes, soterranis, dipòsits i elements enterrats. Definició del sistema segons el suport real i les sol·licitacions de servei, amb punts singulars resolts en detall: trobades, juntes, embornals i passos d'instal·lació."
    norms:
      - "CTE DB-HS 1"
      - "UNE-EN 13967"
  - ref: "§ 2.7.2"
    icon: "pavimentos"
    name: "Paviments tècnics"
    desc: "Paviments continus industrials i d'equipament públic. Prestació mecànica i química exigible, preparació del suport, tractament de juntes i criteris de recepció mesurables a l'obra, no al catàleg."
    norms:
      - "UNE-EN 13813"
      - "UNE-EN 1504-2"
  - ref: "§ 2.7.3"
    icon: "refuerzo"
    name: "Reforç estructural"
    desc: "Recuperació o increment de capacitat portant: fibra de carboni, recrescuts, xapa encolada o postesat exterior. La prescripció parteix del recàlcul, no del producte disponible."
    norms:
      - "UNE-EN 1504-4"
      - "Codi Estructural"

body_blocks:
  - h: "Què és una prescripció tècnica independent"
    p: "És la definició documentada del sistema constructiu que resol una patologia concreta: quina família de productes, amb quines prestacions normalitzades, sobre quin suport, amb quina preparació prèvia, en quins gruixos i sota quines condicions de posada en obra. Es redacta a partir del diagnòstic, no del catàleg. El resultat és un document que qualsevol fabricant amb producte conforme pot ofertar."
  - h: "La responsabilitat no es transfereix amb el catàleg"
    p: "Qui signa un projecte o dirigeix una obra respon de la solució adoptada. El fabricant respon del seu producte —que compleixi allò que declara el seu marcatge CE i la seva fitxa tècnica—, no que aquest producte sigui l'adequat per a aquest suport, aquesta patologia i aquestes condicions de servei. Són dues responsabilitats diferents i no són intercanviables. Acceptar la proposta del departament tècnic d'una marca no trasllada a aquesta marca la responsabilitat de l'elecció: la deixa on era, a la direcció facultativa, però ara sostinguda per un criteri que no és propi i que no es pot defensar amb documentació pròpia."
  - h: "Independent significa que no venem producte"
    p: "Coneixem els sistemes dels principals fabricants del sector i hi treballem cada dia a l'obra, però no distribuïm, no apliquem i no percebem comissió de cap marca. La prescripció es redacta per prestacions i normes de producte —no per nom comercial—, de manera que la propietat conserva la capacitat de licitar i comparar ofertes sense quedar captiva d'un proveïdor."
  - h: "Per què es prescriu malament sovint"
    p: "La solució tècnica sol arribar del departament tècnic d'un fabricant. És competent, però parteix d'una restricció evident: només pot proposar la seva pròpia gamma. Quan el sistema adequat no és en aquest catàleg, es força el que sí que hi és. El cost d'aquest ajust no apareix al pressupost: apareix dos anys després, en forma de patologia recurrent i d'una discussió sobre qui en respon."
  - h: "Assistència a la reunió: defensar la prescripció"
    p: "Una prescripció correcta que no se sosté a la reunió no serveix de res. Acompanyem el despatx o l'empresa a la reunió amb la propietat, la direcció facultativa o el contractista per explicar el criteri, respondre a les objeccions tècniques i deixar constància en acta dels condicionants d'execució. És la part de la feina on es decideix si el sistema s'executa tal com està prescrit o es degrada pel camí."
  - h: "Continuïtat amb l'actuació pericial"
    p: "La prescripció es basa en el mateix mètode que un dictamen: diagnòstic de causa, caracterització del suport, assaigs quan l'estat de l'element ho exigeix i traçabilitat documental de cada decisió. Si l'assumpte acaba en reclamació, l'expedient ja està construït amb el rigor que exigeix la <a href='/ca/informes-pericials/'>prova pericial</a>."

method_steps:
  - t: "Diagnòstic de la patologia"
    d: "Inspecció, caracterització del suport i determinació de la causa. Sense causa establerta no hi ha prescripció possible: només reparació simptomàtica."
  - t: "Definició del sistema per prestacions"
    d: "Selecció de la família de productes i de les prestacions normalitzades exigibles (UNE-EN 1504 i concordants), amb criteris d'acceptació mesurables."
  - t: "Plec de condicions d'execució"
    d: "Preparació de suport, gruixos, condicions ambientals, temps d'espera entre capes, controls d'execució i criteris de recepció."
  - t: "Comparativa d'ofertes"
    d: "Verificació que les solucions ofertades pels diferents fabricants compleixen les prestacions exigides. Anàlisi d'equivalències reals."
  - t: "Assistència a la reunió"
    d: "Presència tècnica davant la propietat, la direcció facultativa o el contractista per defensar el criteri i fixar els condicionants en acta."
  - t: "Seguiment d'execució"
    d: "Control de punts crítics durant la posada en obra i verificació que allò executat correspon a allò prescrit."

faq:
  - q: "Treballen amb marques concretes de sistemes constructius?"
    a: "Coneixem i avaluem els sistemes dels principals fabricants del sector. El que no fem és prescriure per marca: el document defineix prestacions i normes de producte, i qualsevol fabricant el sistema del qual les compleixi pot ofertar."
  - q: "Reben comissió d'algun fabricant?"
    a: "No. No distribuïm producte, no apliquem i no tenim acords de prescripció amb cap marca. Els honoraris els paga íntegrament el client, i aquesta és l'única raó per la qual la prescripció pot ser independent."
  - q: "Poden defensar la prescripció davant la direcció facultativa?"
    a: "Sí. L'assistència a la reunió forma part de l'encàrrec quan així es contracta: expliquem el criteri tècnic, responem a les objeccions i deixem els condicionants d'execució reflectits en acta."
  - q: "Serveix la prescripció si l'assumpte acaba en litigi?"
    a: "L'expedient es construeix amb traçabilitat documental des del diagnòstic, de manera que pot sostenir-se com a prova tècnica. Si el litigi es planteja, l'actuació pericial parteix d'una feina ja documentada."
  - q: "Quina diferència hi ha amb l'assessorament d'un fabricant?"
    a: "El departament tècnic d'un fabricant proposa solucions dins de la seva pròpia gamma, que és el que pot fer. Una prescripció independent parteix de la patologia i arriba al sistema que la resol, amb independència de qui el fabriqui."

qualLabel: "Prescripció tècnica · PRESC·01"
qualItems:
  - num: "01"
    text: "Diagnòstic de la patologia i causa"
  - num: "02"
    text: "Sistema definit per prestacions, no per marca"
  - num: "03"
    text: "Plec d'execució i criteris de recepció"
  - num: "04"
    text: "Assistència a reunió de defensa tècnica"
qualCta: "Consultar una prescripció"
qualNote: "Sense vinculació amb fabricant"

band_eyebrow: "Prescripció tècnica"
band_title: "Necessita una prescripció que se sostingui a la reunió?"
band_lede: "Avaluació inicial del cas sense cost. Abast i honoraris tancats per escrit abans de començar."
band_cta: "Plantejar el cas"
---
{% set ui = ca %}
{% include "layouts/service.njk" %}
