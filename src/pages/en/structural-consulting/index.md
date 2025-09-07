---
layout: "layouts/service-pillar.njk"
title: "Structural Consulting in Barcelona | Buildings & Civil Works"
description: "Expert consulting for structural repair and reinforcement for buildings and infrastructures (bridges, walls). We diagnose pathologies and design technical solutions."
permalink: "/en/structural-consulting/"
lang: "en"

translations:
  - lang: es
    permalink: /asesoramiento-estructural/
    title: "Asesoramiento Estructural Barcelona | Edificación y Obra Civil"
    description: "Asesoramiento experto en reparación y refuerzo de estructuras para edificación e infraestructuras (puentes, muros). Diagnosticamos patologías y proyectamos soluciones técnicas."
  - lang: ca
    permalink: /ca/assessorament-estructural/
    title: "Assessorament Estructural a Barcelona | Edificació i Obra Civil"
    description: "Assessorament expert en reparació i reforç d'estructures per a edificació i infraestructures (ponts, murs). Diagnostiquem patologies i projectem solucions tècniques."
  - lang: fr
    permalink: /fr/conseil-structurel/
    title: "Conseil en Structure à Barcelone | Bâtiment et Génie Civil"
    description: "Conseil expert en réparation et renforcement de structures pour le bâtiment et les infrastructures (ponts, murs). Nous diagnostiquons les pathologies et concevons des solutions techniques."
  - lang: it
    permalink: /it/consulenza-strutturale/
    title: "Consulenza Strutturale Barcellona | Edilizia e Opere Civili"
    description: "Consulenza esperta per la riparazione e il rinforzo di strutture per edilizia e infrastrutture (ponti, muri). Diagnostichiamo patologie e progettiamo soluzioni tecniche."

eleventyNavigation:
  key: "Structural Consulting"
  title: "Structural Consulting"
  notshow: false
  order: 2

# Hero Section
hero:
  title: "Expert Structural Consulting"
  strong: "Buildings and Civil Engineering"
  subtitle: "Diagnosis, repair, and reinforcement of structures in buildings and infrastructures"
  description: "As expert civil engineers, we provide independent technical diagnosis for any type of structure, from residential floor slabs to bridges or retaining walls. We analyze the cause of the problem and design the safest, most durable, and efficient reinforcement solution."
  intro: "Our mission is to provide you with the technical certainty you need to make the best decision, optimizing costs while ensuring maximum quality in the intervention."
  image: "src/assets/images/asesoramiento-refuerzo-estructural-barcelona.jpg"

# Section "Why Independent Diagnosis?"
sections:
  title: "Why Choose Independent Structural Consulting?"
  what_is:
    text: >
      Hiring an independent structural consultant before a construction company ensures that the proposed solution responds to a real technical need rather than a commercial interest. This preliminary step is the best investment for your project.
    features:
      - "Guarantees the choice of the most efficient technical solution, not the most expensive"
      - "Provides real cost control by defining interventions beforehand"
      - "Avoids unnecessary or oversized repairs"
      - "Allows requesting quotes from contractors on a clear technical basis"
      - "Acts as expert supervision defending your interests"
      - "Ensures compliance with specific regulations (EHE-08, CTE, etc.)"

# Service Cluster: Now includes Building AND Civil Works services
serviceCluster:
  title: "Our Structural Consulting Services"
  intro: "We analyze and design solutions for the most complex structural problems in buildings and civil works:"
  services:
    - title: "Pathology Diagnosis (Concrete, Steel)"
      description: "Analysis of cracking, reinforcement corrosion, deformations, fatigue, and other damage to determine their cause, extent, and risk level."
      url: "/en/structural-consulting/pathology-diagnosis/"
      icon: "search-check"
      features:
        - "Corrosion and carbonation"
        - "Crack assessment"
        - "Fatigue analysis"
    - title: "Structural Safety Assessment (Post-Building Inspection)" # <-- UPDATED CONTENT
      description: "Technical analysis of serious defects found in building inspection reports to diagnose the root cause and plan for repairs."
      url: "/en/structural-consulting/structural-safety-assessment-building-inspection/"
      icon: "clipboard-check"
      features:
        - "Post-inspection diagnosis"
        - "Clear action plan"
        - "Community safety"
    - title: "Bridge and Footbridge Inspection and Pathology"
      description: "Principal and special inspections of bridges, viaducts, and footbridges to assess their condition, detect pathologies, and plan interventions."
      url: "/en/structural-consulting/bridge-inspection/"
      icon: "blueprint"
      features:
        - "Principal inspections"
        - "Deck and pier pathology"
        - "Maintenance plans"
    - title: "Carbon Fiber Reinforcement Projects"
      description: "Design and calculation of composite reinforcements (CFRP) for beams, columns, slabs, and civil works structures requiring increased capacity."
      url: "/en/structural-consulting/carbon-fiber-reinforcement/"
      icon: "tool"
      features:
        - "Bridge and beam applications"
        - "Calculation and sizing"
        - "SIKA® Systems"
    - title: "Retaining Walls and Slopes Analysis"
      description: "Evaluation of wall stability (sheet piling, riprap), ground thrust analysis, and anchoring or repair projects."
      url: "/en/structural-consulting/retaining-walls-slopes/"
      icon: "mountain"
      features:
        - "Wall stability"
        - "Thrust analysis"
        - "Anchoring solutions"
    - title: "Foundation Reinforcement and Underpinning"
      description: "Study of differential settlements and ground problems to design solutions such as micropiles, injections, or footing expansion."
      url: "/en/structural-consulting/foundation-reinforcement/"
      icon: "anchor"
      features:
        - "Settlement analysis"
        - "Micropile solutions"
        - "Ground stabilization"
    - title: "Concrete Repair Projects"
      description: "We define technical protocols for proper repair of damaged concrete according to regulations, both in buildings and civil works."
      url: "/en/structural-consulting/concrete-repair/"
      icon: "construction"
      features:
        - "Cleaning protocols"
        - "Mortar specification"
        - "Protection systems"

# Bridge to Urbenis.com
urbenisBridge:
  title: "From Diagnosis to Execution: Collaboration with Urbenis"
  text: >
    Our work at **perito.barcelona** is to provide you with an impartial diagnosis and the best technical project for your peace of mind and safety.
    For **specialized execution** with maximum guarantees, we work closely with **urbenis.com**, experts in the application of advanced structural reinforcement and repair systems.
  cta:
    text: "Learn About Urbenis Execution Services"
    url: "https://urbenis.com"
    icon: "arrow-right"

# Work Process
process:
  title: "Our Consulting Methodology"
  steps:
    - title: "Initial Contact and Preliminary Analysis"
      description: "We study your problem and existing documentation to understand the situation."
    - title: "Technical Inspection and Diagnosis"
      description: "We visit the structure to inspect the damage and gather necessary data."
    - title: "Technical Solution Proposal"
      description: "We prepare a report or project with the diagnosis and the most suitable repair or reinforcement solution."
    - title: "Supervision (Optional)"
      description: "If desired, we can supervise the proper execution of works by the contractor."

# Testimonials (including one from Civil Works)
testimonials:
  title: "What Our Clients Say"
  items:
    - quote: "Their independent consulting saved us a lot of money. Another company had proposed a much more expensive and invasive solution that wasn't necessary."
      author: "Property Manager, Barcelona"
      role: "Case: Floor slab reinforcement in residential building"
    - quote: "The carbon fiber reinforcement project for the underpass was impeccable. Very detailed and clear, it gave us the technical confidence we needed before the Administration."
      author: "Site Manager, Infrastructure Construction Company"
      role: "Case: Beam reinforcement in civil works"

# Final CTA
cta:
  title: "Concerned About the Safety of a Structure?"
  description: "Don't wait for the problem to worsen. Contact our team and get a professional technical diagnosis, whether for buildings or civil works."
  button:
    text: "Request Structural Diagnosis"
    url: "/en/contact/"
---

## The Most Important Decision: An Independent Structural Diagnosis

When a structure shows concerning symptoms—a growing crack, a deforming beam, advancing corrosion—the first decision is the most critical: who should diagnose the problem? Going directly to a repair and execution company can lead to oversized solutions or ones that don't address the real cause of the problem.

Our **structural consulting** service is based on a fundamental principle: **first, expert and impartial diagnosis; then, the solution.** As independent civil engineers, our only commitment is to safety, durability, and economic efficiency. We analyze your structure, determine the exact origin of the pathology, and design the optimal technical solution for your specific case.

## Our Field of Action: From Buildings to Major Infrastructure

Our experience as Civil Engineers allows us to address a wide spectrum of structures, applying the same principles of technical rigor to each:

* **In Buildings:** We analyze and design solutions for all types of properties: residential buildings, industrial warehouses, parking structures, single-family homes, etc. We focus on common problems such as floor slab reinforcement, beam and column repair, or foundation underpinning.
* **In Civil Works:** We offer expert consulting for infrastructure. We perform bridge and footbridge inspections, analyze retaining wall and slope stability, and design repairs for large-scale concrete structures subject to demanding conditions.

## Advanced Solutions: Beyond Traditional Repair

Structural engineering is constantly advancing. We don't limit ourselves to conventional solutions; we specialize in calculating and designing advanced techniques that offer better performance with less intervention. We particularly excel in designing **reinforcements with composites like carbon fiber (CFRP)**, using systems from leading companies like SIKA®, to effectively and durably increase the load-bearing capacity of beams and columns.

## The Bridge to Execution: The Role of Urbenis.com

We believe in specialization. Our excellence lies in diagnosis and engineering: the "what" and "how" it should be done. For the execution phase, the "who" does it, it's essential to have expert applicators.

Therefore, once the repair or reinforcement project is defined by **perito.barcelona**, we facilitate contact with **urbenis.com**, our partner company specialized in executing these works. This synergy guarantees a seamless process: the best engineering project, executed by the best specialists.

## When Do You Need Urgent Structural Consulting?

Don't ignore the signs your building or structure is giving you. Contact us if you observe:

* Appearance or growth of cracks in walls, beams, or slabs.
* Concrete spalling exposing rusted reinforcement.
* Visible deformations or "deflections" in beams or balconies.
* An unfavorable Technical Building Inspection (ITE) report regarding the structure.
* The need to increase the load capacity of a floor slab for a new use.