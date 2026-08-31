---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /ca/quadre-experts/
lang: ca
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /cuadro-de-expertos/
  - lang: en
    permalink: /en/expert-panel/
title: "Quadre d'Experts | Perits Col·laboradors per Matèria"
description: "Sis matèries pericials cobertes per perits col·laboradors: estructures, geotècnia, edificació, instal·lacions, materials i obra pública. Aval acadèmic, d'obra, de laboratori o d'administració."
breadcrumb_parent:
  label: "El Despatx"
  url: "/ca/el-despatx/"

# ── ESBORRANY — pendent de validació per l'Albert ────────────────────────────
# Les persones NO són aquí: viuen a `src/_data/expertos.json`, cada fitxa amb
# `materia`, `familia` i `publicado: true`. Mentre una matèria no tingui persona
# publicada, la seva Card surt amb el Tag «Plaça oberta».
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Quadre<br>d'experts"

grid_eyebrow: "§ Matèries"
grid_title: "Sis matèries, un criteri d'assignació"
grid_lede: "L'expedient s'assigna a la matèria de la qual depèn la controvèrsia. Quan cap encaixa amb l'assumpte, l'encàrrec no s'accepta."
open_seat_tag: "Plaça oberta"
draft_tag: "Esborrany"

familia_labels:
  academico: "Universitat"
  mixto: "Docència i exercici"
  obra: "Obra"
  nicho: "Especialitat"
  industria: "Indústria"
  colegio: "Col·legi"

materias:
  - key: "estructuras"
    ref: "§ MAT. 01"
    icon: "estructuras"
    name: "Estructures i càlcul"
    desc: "Model de càlcul, recàlcul de capacitat portant i anàlisi per elements finits. És la matèria dels assumptes en què allò discutit és el model mateix, no la seva execució."
    field_label: "Recàlcul · MEF · Codi Estructural"
    pillar_url: "/ca/assessorament-estructural/"
    pillar_label: "Assessorament estructural"
  - key: "geotecnia"
    ref: "§ MAT. 02"
    icon: "geotecnia"
    name: "Geotècnia i fonamentació"
    desc: "Assentaments diferencials, excavacions, afectació a mitgeres i interacció sòl-estructura. La controvèrsia es dirimeix en la caracterització del terreny."
    field_label: "Assentaments · Recalçaments · CTE DB-SE-C"
    pillar_url: "/ca/patologies-estructurals/"
    pillar_label: "Patologia estructural"
  - key: "edificacion"
    ref: "§ MAT. 03"
    icon: "edificacion"
    name: "Edificació i habitabilitat"
    desc: "Vicis de projecte i de direcció d'obra, condicions d'ús i compliment del CTE. Inclou la delimitació entre defecte aparent i defecte ocult."
    field_label: "CTE · Habitabilitat · CC art. 1484"
    pillar_url: "/ca/vicis-ocults/"
    pillar_label: "Vicis ocults"
  - key: "instalaciones"
    ref: "§ MAT. 04"
    icon: "instalaciones"
    name: "Instal·lacions i procés industrial"
    desc: "Fallades de servei en instal·lacions, equipament i procés. Determinació de causa arrel, seguretat de màquines i lucre cessant per aturada de producció."
    field_label: "Causa arrel · RIPCI · Lucre cessant"
    pillar_url: "/ca/naus-industrials/"
    pillar_label: "Naus industrials"
  - key: "materiales"
    ref: "§ MAT. 05"
    icon: "materiales"
    name: "Materials i assaigs"
    desc: "Caracterització de formigó, morters, acers i sistemes de reparació. Campanya d'assaigs i comportament d'un material fora de la seva norma de producte."
    field_label: "Assaigs ENAC · UNE-EN 1504 · Durabilitat"
    pillar_url: "/ca/reclamacio-mala-execucio/"
    pillar_label: "Reclamació per mala execució"
  - key: "obra-publica"
    ref: "§ MAT. 06"
    icon: "obra-publica"
    name: "Obra pública i contracte"
    desc: "Viaductes, estructures de pas i moviment de terres. Modificats de projecte, liquidació de contracte i responsabilitat sota la Llei de Contractes del Sector Públic."
    field_label: "LCSP · Modificats · Liquidació"
    pillar_url: "/ca/informes-pericials/obres-publiques/"
    pillar_label: "Peritatge d'obra pública"

familias_eyebrow: "§ Procedència de l'aval"
familias_title: "L'autoritat tècnica no ve d'un sol lloc"
familias_lede: "Un dictamen se sosté sobre allò que el seu signant pot acreditar davant el tribunal. Aquesta acreditació té sis orígens diferents, i cap substitueix els altres."
familias:
  - k: "Universitat"
    v: "Catedràtics i professors titulars. Publicacions sotmeses a revisió per parells i participació en comitès de normalització: trajectòria verificable en el contrainterrogatori."
  - k: "Docència i exercici"
    v: "Professorat associat que compatibilitza la universitat amb exercici professional propi. Suma criteri acadèmic i pràctica d'encàrrec real."
  - k: "Obra"
    v: "Direcció i cap d'obra i direcció tècnica amb dues o tres dècades d'exercici. Aporta el comportament real de la solució construïda, que no es dedueix del model."
  - k: "Especialitat"
    v: "Protecció contra incendis, acústica, geotècnia de camp, termografia i metrologia. Matèries que apareixen poc i exigeixen instrumentació pròpia."
  - k: "Indústria"
    v: "Antics responsables tècnics de fabricant o de laboratori, ja desvinculats. Coneixen el sistema per dins sense representar la marca."
  - k: "Col·legi"
    v: "Perits inscrits en llistes d'altres col·legis i territoris, per a assumptes amb jurisdicció fora de Catalunya."

body_blocks:
  - h: "Quan s'incorpora un perit del quadre"
    p: "Quan la matèria controvertida exigeix un coneixement que la direcció pericial no pot acreditar per si mateixa: l'estat de l'art d'una disciplina, una campanya d'assaigs amb instrumentació específica o la pràctica d'un procediment constructiu concret. La incorporació es decideix per la matèria de l'assumpte, no per la disponibilitat del col·laborador."
  - h: "Com s'integra en el dictamen"
    p: "La direcció pericial manté la interlocució amb el lletrat, la instrucció de l'expedient i la responsabilitat processal. El perit col·laborador intervé on el seu criteri és determinant —model de càlcul, campanya d'assaigs, interpretació de resultats— i redacta les conclusions tècniques del seu àmbit. Signa allò que subscriu i ho ratifica en sala conforme a l'article 347 LEC."
  - h: "Què aporta davant el tribunal"
    p: "Un signant amb trajectòria documental —publicacions, col·legiació, anys de direcció d'obra acreditats, acreditació ENAC del laboratori— ofereix al tribunal un element verificable. Davant del contrainterrogatori, aquesta trajectòria és un fet, no una afirmació de part."

band_eyebrow: "Col·laboració"
band_title: "La seva especialitat encaixa amb alguna d'aquestes matèries?"
band_lede: "El registre és obert a perfils acadèmics i professionals. Abans de deixar-nos les seves dades, llegeixi les condicions i la disponibilitat real d'encàrrecs."
band_cta: "Col·laborar com a perit signant"
band_url: "/ca/collaboracio-perits/"

qualLabel: "Assignació d'expedient"
qualItems:
  - num: "01"
    text: "Matèria controvertida i disciplina implicada"
  - num: "02"
    text: "Coincidència amb l'especialitat del perit"
  - num: "03"
    text: "Abast del dictamen i campanya d'assaigs"
  - num: "04"
    text: "Ratificació en sala — LEC art. 347"
qualCta: "Consultar un cas"
qualNote: "Confidencial · Sense compromís"
---
{% set ui = ca %}
{% include "layouts/claustro.njk" %}
