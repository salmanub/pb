---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /en/expert-panel/
lang: en
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /cuadro-de-expertos/
  - lang: ca
    permalink: /ca/quadre-experts/
title: "Expert Panel | Collaborating Experts by Subject"
description: "Six forensic subjects covered by collaborating experts: structures, geotechnics, buildings, installations, materials and public works. Standing from academia, site practice, laboratory or public administration."
breadcrumb_parent:
  label: "The Firm"
  url: "/en/the-firm/"

# ── DRAFT — pending Albert's approval ────────────────────────────────────────
# The people are NOT here: they live in `src/_data/expertos.json`, each record
# with `materia`, `familia` and `publicado: true`. While a subject has no
# published person, its Card shows the «Open seat» tag.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Expert<br>panel"

grid_eyebrow: "§ Subjects"
grid_title: "Six subjects, one assignment rule"
grid_lede: "A matter is assigned to the subject the dispute actually turns on. When none of them fits, the instruction is declined."
open_seat_tag: "Open seat"
draft_tag: "Draft"

familia_labels:
  academico: "University"
  mixto: "Teaching and practice"
  obra: "Site"
  nicho: "Specialism"
  industria: "Industry"
  colegio: "Professional body"

materias:
  - key: "estructuras"
    ref: "§ MAT. 01"
    icon: "estructuras"
    name: "Structures and analysis"
    desc: "Calculation model, reassessment of load-bearing capacity and finite element analysis. The subject of matters where what is disputed is the model itself, not how it was built."
    field_label: "Reassessment · FEA · Structural Code"
    pillar_url: "/en/structural-consulting/"
    pillar_label: "Structural consulting"
  - key: "geotecnia"
    ref: "§ MAT. 02"
    icon: "geotecnia"
    name: "Geotechnics and foundations"
    desc: "Differential settlement, excavations, damage to party walls and soil-structure interaction. The dispute turns on how the ground was characterised."
    field_label: "Settlement · Underpinning · CTE DB-SE-C"
    pillar_url: "/en/structural-pathologies/"
    pillar_label: "Structural pathology"
  - key: "edificacion"
    ref: "§ MAT. 03"
    icon: "edificacion"
    name: "Buildings and habitability"
    desc: "Design and site-supervision defects, conditions of use and compliance with the Spanish Building Code. Includes the line between apparent and hidden defects."
    field_label: "Building Code · Habitability · CC art. 1484"
    pillar_url: "/en/hidden-defects/"
    pillar_label: "Hidden defects"
  - key: "instalaciones"
    ref: "§ MAT. 04"
    icon: "instalaciones"
    name: "Installations and industrial process"
    desc: "Service failures in installations, equipment and process. Root cause determination, machinery safety and loss of profit from production downtime."
    field_label: "Root cause · Fire safety · Loss of profit"
    pillar_url: "/en/industrial-warehouses/"
    pillar_label: "Industrial buildings"
  - key: "materiales"
    ref: "§ MAT. 05"
    icon: "materiales"
    name: "Materials and testing"
    desc: "Characterisation of concrete, mortars, steels and repair systems. Testing campaigns and the behaviour of a material operating outside its product standard."
    field_label: "Accredited testing · EN 1504 · Durability"
    pillar_url: "/en/poor-execution-claim/"
    pillar_label: "Poor execution claims"
  - key: "obra-publica"
    ref: "§ MAT. 06"
    icon: "obra-publica"
    name: "Public works and contract"
    desc: "Viaducts, bridge structures and earthworks. Design variations, contract settlement and liability under Spanish public procurement law."
    field_label: "Procurement · Variations · Settlement"
    pillar_url: "/en/expert-witness-reports/public-works/"
    pillar_label: "Public works reports"

familias_eyebrow: "§ Where the standing comes from"
familias_title: "Technical authority has more than one source"
familias_lede: "A report stands on what its signatory can evidence before the court. That evidence has six different origins, and none of them substitutes for the others."
familias:
  - k: "University"
    v: "Full and tenured professors. Peer-reviewed publications and participation in standardisation committees: a record that holds up under cross-examination."
  - k: "Teaching and practice"
    v: "Associate lecturers who combine the university with their own professional practice. Academic judgement plus real instructions."
  - k: "Site"
    v: "Site management, technical and production direction with two or three decades of practice. Brings how the built solution actually behaves, which the model does not tell you."
  - k: "Specialism"
    v: "Fire protection, acoustics, field geotechnics, thermography and metrology. Subjects that come up rarely and require their own instrumentation."
  - k: "Industry"
    v: "Former technical managers at manufacturers or laboratories, now unaffiliated. They know the system from the inside without representing the brand."
  - k: "Professional body"
    v: "Experts on the rosters of other professional bodies and regions, for matters whose jurisdiction lies outside Catalonia."

body_blocks:
  - h: "When a panel expert is brought in"
    p: "When the disputed subject requires knowledge the forensic lead cannot evidence on their own: the state of the art of a discipline, a testing campaign with specific instrumentation, or hands-on practice of a particular construction procedure. The decision follows the subject of the matter, not the availability of the collaborator."
  - h: "How they fit into the report"
    p: "The forensic lead keeps the relationship with counsel, the preparation of the case file and the procedural responsibility. The collaborating expert intervenes where their judgement is decisive — the calculation model, the testing campaign, the interpretation of results — and drafts the technical conclusions within their field. They sign what they endorse and confirm it in court under article 347 of the Spanish Civil Procedure Act."
  - h: "What it brings before the court"
    p: "A signatory whose record is documentary — publications, professional registration, evidenced years of site direction, laboratory accreditation — gives the court something it can verify. Under cross-examination, that record is fact rather than a party's assertion."

band_eyebrow: "Collaboration"
band_title: "Does your specialism match any of these subjects?"
band_lede: "The register is open to academic and professional profiles alike. Before leaving your details, read the terms and the real availability of instructions."
band_cta: "Collaborate as a signing expert"
band_url: "/en/expert-collaboration/"

qualLabel: "Case assignment"
qualItems:
  - num: "01"
    text: "Disputed subject and discipline involved"
  - num: "02"
    text: "Match with the expert's specialism"
  - num: "03"
    text: "Scope of the report and testing campaign"
  - num: "04"
    text: "Confirmation in court — art. 347 LEC"
qualCta: "Discuss a case"
qualNote: "Confidential · No obligation"
---
{% set ui = en %}
{% include "layouts/claustro.njk" %}
