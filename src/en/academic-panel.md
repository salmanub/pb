---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /en/expert-panel/
lang: en
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /claustro-pericial/
  - lang: ca
    permalink: /ca/claustre-pericial/
title: "Expert Panel | Collaborating University Professors"
description: "Five university disciplines that sign expert reports when the dispute demands the state of the art: civil engineering, architecture, construction materials, industrial engineering and structural analysis."
breadcrumb_parent:
  label: "The Firm"
  url: "/en/the-firm/"

# ── DRAFT — pending Albert's approval ────────────────────────────────────────
# First-draft copy. The people are NOT here: they live in
# `src/_data/catedraticos.json`, each record with `categoria` (the discipline
# key) and `publicado: true`. While a discipline has no published person, its
# Card shows the «Open seat» tag.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Expert<br>panel"

grid_eyebrow: "§ Disciplines"
grid_title: "Five disciplines, one report"
grid_lede: "A matter is assigned to the discipline the dispute actually turns on, not to whoever is available. When none of them fits, the instruction is declined."
open_seat_tag: "Open seat"
draft_tag: "Draft"

categories:
  - key: "caminos"
    ref: "§ ESP. 01"
    icon: "caminos"
    name: "Civil Engineering — Roads, Canals and Ports"
    desc: "Civil works, infrastructure and public procurement: viaducts, bridge structures, earthworks and contract settlement. The dispute usually sits in the design and its variations, not in the workmanship."
    field_label: "Civil works · Infrastructure · Procurement"
    pillar_url: "/en/expert-witness-reports/public-works/"
    pillar_label: "Public works reports"
  - key: "arquitectura"
    ref: "§ ESP. 02"
    icon: "arquitectura"
    name: "Architecture"
    desc: "Buildings, habitability and compliance with the Spanish Building Code. Design and site-supervision defects, conditions of use, and the always-contested line between apparent and hidden defects."
    field_label: "Buildings · Building Code · Habitability"
    pillar_url: "/en/hidden-defects/"
    pillar_label: "Hidden defects reports"
  - key: "materiales"
    ref: "§ ESP. 03"
    icon: "materiales"
    name: "Construction Materials Engineering"
    desc: "Characterisation of concrete, mortars, steels and repair systems. Testing campaigns, interpretation of results, and the behaviour of a material operating outside its product standard."
    field_label: "Testing · Concrete · Durability"
    pillar_url: "/en/structural-pathologies/"
    pillar_label: "Structural pathology reports"
  - key: "industrial"
    ref: "§ ESP. 04"
    icon: "industrial"
    name: "Industrial Engineering"
    desc: "Installations, process and equipment. Root cause determination in service failures, machinery safety, and the assessment of loss of profit from production downtime."
    field_label: "Installations · Root cause · Process"
    pillar_url: "/en/industrial-warehouses/"
    pillar_label: "Industrial building reports"
  - key: "estructuras"
    ref: "§ ESP. 05"
    icon: "estructuras"
    name: "Structural Engineering and Analysis"
    desc: "Calculation model, reassessment of load-bearing capacity, finite element analysis and soil-structure interaction. This is the discipline that settles matters where the model itself is in dispute."
    field_label: "Analysis · Reassessment · FEA"
    pillar_url: "/en/structural-consulting/"
    pillar_label: "Structural consulting"

body_blocks:
  - h: "Why an expert report signed from within the university"
    p: "Some matters cannot be settled with site experience alone: they demand the state of the art of a discipline. A buckling failure in a singular structure, soil-structure interaction in a building with differential settlement, or the characterisation of a material behaving outside its product standard call for someone who researches and publishes on that subject, not only someone who applies it."
  - h: "How the panel fits into an expert report"
    p: "The forensic lead keeps the relationship with counsel, the preparation of the case file and the procedural responsibility. The academic expert intervenes where their judgement is decisive: the calculation model, the testing campaign, the interpretation of results and the drafting of the technical conclusions within their field. They sign what they endorse and confirm it in court under article 347 of the Spanish Civil Procedure Act."
  - h: "What it brings before the court"
    p: "An expert with a verifiable teaching and research record offers the court something it can check: peer-reviewed publications, participation in standardisation committees and formal teaching in the subject on which they are reporting. Under cross-examination, that record is documentary fact rather than a party's assertion."

band_eyebrow: "Academic collaboration"
band_title: "Are you a university professor?"
band_lede: "If your specialism matches the subject of an expert report, we want to know how to reach you. Read how we work and on what terms before leaving us your details."
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
