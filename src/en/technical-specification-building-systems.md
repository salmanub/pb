---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /en/structural-consulting/technical-specification/
lang: en
audience: pro
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /asesoramiento-estructural/prescripcion-tecnica/
  - lang: ca
    permalink: /ca/assessorament-estructural/prescripcio-tecnica/
title: "Technical Specification of Building Systems"
description: "Independent specification of repair, waterproofing and structural strengthening systems, with attendance at meetings to defend it before the client or the design team. No ties to any manufacturer."
breadcrumb_parent:
  label: "Structural Consulting"
  url: "/en/structural-consulting/"

# ── DRAFT — pending Albert's approval ────────────────────────────────────────
# First-draft copy on the agreed approach: expert in these systems, but
# independent of any brand.
# NO specific project is cited as a reference case. Albert's decision
# (30/08/2026): the cultural-facility project is at tender stage, not awarded;
# naming it in future will be an explicit decision of his.
# ─────────────────────────────────────────────────────────────────────────────

svc_num: "PRESC·01"
svc_tag: "Independent specification — no manufacturer ties"

svc_lsi:
  - "EN 1504"
  - "Spanish Structural Code"
  - "CTE DB-HS 1"
  - "EN 13813"
  - "Concrete repair"
  - "Structural strengthening"

subsystems_eyebrow: "§ 2.7 Subsystems"
subsystems_title: "Three subsystems, one method"
subsystems_lede: "Each subsystem is specified by standardised performance and measurable acceptance criteria. The resulting document can be bid on by any manufacturer whose product meets them."
subsystems:
  - ref: "§ 2.7.1"
    icon: "impermeabilizacion"
    name: "Waterproofing"
    desc: "Roofs, basements, tanks and buried elements. The system is defined from the actual substrate and the service demands, with detailing resolved at the difficult points: junctions, joints, drains and service penetrations."
    norms:
      - "CTE DB-HS 1"
      - "EN 13967"
  - ref: "§ 2.7.2"
    icon: "pavimentos"
    name: "Technical flooring"
    desc: "Seamless industrial and public-building floors. Required mechanical and chemical performance, substrate preparation, joint treatment and acceptance criteria measurable on site rather than in a catalogue."
    norms:
      - "EN 13813"
      - "EN 1504-2"
  - ref: "§ 2.7.3"
    icon: "refuerzo"
    name: "Structural strengthening"
    desc: "Recovering or increasing load-bearing capacity: carbon fibre, concrete overlays, bonded steel plate or external post-tensioning. The specification starts from the reassessment, not from the product at hand."
    norms:
      - "EN 1504-4"
      - "Spanish Structural Code"

body_blocks:
  - h: "What an independent technical specification is"
    p: "It is the documented definition of the building system that resolves a specific pathology: which product family, to what standardised performance, on which substrate, with what surface preparation, at what thicknesses and under what site conditions. It is written from the diagnosis, not from a catalogue. The result is a document any manufacturer with a conforming product can bid on."
  - h: "Liability does not transfer with the catalogue"
    p: "Whoever signs a design or supervises the works answers for the solution adopted. The manufacturer answers for its product — that it performs as its CE marking and data sheet declare — not for that product being the right one for this substrate, this pathology and these service conditions. These are two different liabilities and they are not interchangeable. Accepting a brand's technical department proposal does not shift the liability for the choice onto that brand: it leaves it exactly where it was, with the design team, but now resting on reasoning that is not their own and that they cannot defend with their own documentation."
  - h: "Independent means we do not sell product"
    p: "We know the systems of the sector's main manufacturers and work with them on site every day, but we do not distribute, we do not install and we take no commission from any brand. The specification is written by performance and product standards — not by trade name — so the client keeps the ability to tender and compare offers without being tied to one supplier."
  - h: "Why specifications so often go wrong"
    p: "The technical solution usually comes from a manufacturer's technical department. They are competent, but they work under an obvious constraint: they can only propose their own range. When the right system is not in that catalogue, the one that is gets forced into place. The cost of that compromise does not show up in the budget: it shows up two years later, as a recurring pathology and an argument about who is liable for it."
  - h: "Attendance at meetings: defending the specification"
    p: "A correct specification that does not hold up in the meeting is worth nothing. We attend the meeting with the client, the design team or the contractor alongside the firm or company, to explain the reasoning, answer technical objections and have the execution constraints recorded in the minutes. This is the part of the job where it is decided whether the system is built as specified or degraded along the way."
  - h: "Continuity with expert witness work"
    p: "The specification rests on the same method as an expert report: diagnosis of cause, characterisation of the substrate, testing where the condition of the element requires it, and a documented trail behind every decision. If the matter ends in a claim, the file is already built to the standard that <a href='/en/expert-witness-reports/'>expert evidence</a> demands."

method_steps:
  - t: "Diagnosis of the pathology"
    d: "Inspection, characterisation of the substrate and determination of the cause. Without an established cause there is no possible specification: only symptomatic repair."
  - t: "Defining the system by performance"
    d: "Selection of the product family and the standardised performance required (EN 1504 and related standards), with measurable acceptance criteria."
  - t: "Execution specification"
    d: "Substrate preparation, thicknesses, ambient conditions, waiting times between coats, execution controls and acceptance criteria."
  - t: "Comparison of tenders"
    d: "Verification that the solutions offered by the different manufacturers meet the required performance. Analysis of genuine equivalence."
  - t: "Attendance at meetings"
    d: "Technical presence before the client, the design team or the contractor to defend the reasoning and record the constraints in the minutes."
  - t: "Monitoring of execution"
    d: "Control of critical points during the works and verification that what is built matches what was specified."

faq:
  - q: "Do you work with specific brands of building systems?"
    a: "We know and assess the systems of the sector's main manufacturers. What we do not do is specify by brand: the document defines performance and product standards, and any manufacturer whose system meets them can bid."
  - q: "Do you receive commission from any manufacturer?"
    a: "No. We do not distribute product, we do not install and we hold no specification agreements with any brand. Fees are paid entirely by the client, and that is the only reason the specification can be independent."
  - q: "Can you defend the specification before the design team?"
    a: "Yes. Attendance at meetings forms part of the engagement when contracted as such: we explain the technical reasoning, answer objections and have the execution constraints recorded in the minutes."
  - q: "Is the specification useful if the matter ends in litigation?"
    a: "The file is built with a documented trail from the diagnosis onwards, so it can stand as technical evidence. If litigation follows, the expert work starts from an already documented base."
  - q: "How does this differ from a manufacturer's advice?"
    a: "A manufacturer's technical department proposes solutions within its own range, which is all it can do. An independent specification starts from the pathology and arrives at the system that resolves it, whoever makes it."

qualLabel: "Technical specification · PRESC·01"
qualItems:
  - num: "01"
    text: "Diagnosis of the pathology and its cause"
  - num: "02"
    text: "System defined by performance, not by brand"
  - num: "03"
    text: "Execution specification and acceptance criteria"
  - num: "04"
    text: "Attendance at the technical defence meeting"
qualCta: "Discuss a specification"
qualNote: "No manufacturer ties"

band_eyebrow: "Technical specification"
band_title: "Need a specification that holds up in the meeting?"
band_lede: "Initial assessment of the case at no cost. Scope and fees agreed in writing before we start."
band_cta: "Set out the case"
---
{% set ui = en %}
{% include "layouts/service.njk" %}
