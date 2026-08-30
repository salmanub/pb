---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /en/academic-panel/
lang: en
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /claustro-de-expertos/
  - lang: ca
    permalink: /ca/claustre-experts/
title: "Academic Panel | Collaborating University Professors"
description: "Expert reports signed by full and tenured university professors in structural analysis, geotechnics, industrial engineering and architecture. Academic authority applied to technical litigation."
breadcrumb_parent:
  label: "The Firm"
  url: "/en/the-firm/"

# ── DRAFT — pending Albert's approval ────────────────────────────────────────
# The copy on this page is a draft. The panel profiles do NOT live here: they
# are in `src/_data/catedraticos.json` (one record per person, shared across the
# three languages). While that file has no published profile, the experts
# section is not rendered at all — no heading, no lede.
# Review the copy and add at least one real profile before removing `noindex`.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Academic<br>panel"

disciplines:
  - "Structural analysis"
  - "Geotechnics"
  - "Civil engineering"
  - "Industrial engineering"
  - "Architecture"
  - "Materials science"

body_blocks:
  - h: "Why an expert report signed from within the university"
    p: "Some matters cannot be settled with site experience alone: they demand the state of the art of a discipline. A buckling failure in a singular structure, soil-structure interaction in a building with differential settlement, or the characterisation of a material behaving outside its product standard call for someone who researches and publishes on that subject, not only someone who applies it."
  - h: "How the panel fits into an expert report"
    p: "The forensic lead keeps the relationship with counsel, the preparation of the case file and the procedural responsibility. The academic expert intervenes where their judgement is decisive: the calculation model, the testing campaign, the interpretation of results and the drafting of the technical conclusions within their field. They sign what they endorse and confirm it in court under article 347 of the Spanish Civil Procedure Act."
  - h: "What it brings before the court"
    p: "An expert with a verifiable teaching and research record offers the court something it can check: peer-reviewed publications, participation in standardisation committees and formal teaching in the subject on which they are reporting. Under cross-examination, that record is documentary fact rather than a party's assertion."

faculty_eyebrow: "Collaborating profiles"
faculty_title: "Academic experts on the panel"
faculty_lede: "Each matter is assigned to the profile whose specialism matches the disputed subject. No file is opened without that match."
faculty_specialties_label: "Fields of expertise"
faculty_publications_label: "Published research"
faculty_placeholder_badge: "Draft"
faculty_ref_prefix: "PROFILE"

band_eyebrow: "Academic collaboration"
band_title: "Are you a university professor?"
band_lede: "If your specialism matches the subject of an expert report, we want to know how to reach you. Read how we work and on what terms before leaving us your details."
band_cta: "Collaborate as a signing expert"
band_url: "/en/collaborate-as-expert/"

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
