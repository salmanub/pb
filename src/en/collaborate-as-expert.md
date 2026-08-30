---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /en/collaborate-as-expert/
lang: en
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /colaborar-como-perito/
  - lang: ca
    permalink: /ca/collaborar-com-a-perit/
title: "Collaborate as a Signing Expert | Academic Expert Registration"
description: "Registration for university professors and academics in professional practice as signing expert witnesses. No commercial or administrative burden. Read the terms and the real availability of instructions first."
breadcrumb_parent:
  label: "Academic Panel"
  url: "/en/academic-panel/"

# ── DRAFT — pending Albert's approval ────────────────────────────────────────
# All copy on this page is a first draft written on the agreed approach
# (honest expectation management + mixed academic / self-employed profile).
# Review tone and terms before removing `noindex: true`.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Collaborate as<br>a signing expert"

bridge_text: "Looking for an expert for your case?"
bridge_url: "/en/academic-panel/"
bridge_link: "See the academic panel →"

profiles:
  - "Full professors"
  - "Tenured professors"
  - "Associate lecturers"
  - "Self-employed with teaching"

body_blocks:
  - h: "Who this is for"
    p: "For full and tenured university professors and — explicitly — for those who combine teaching with independent professional practice: the associate or adjunct lecturer who teaches at the university and invoices as a self-employed professional. That mixed profile is today the most common among our collaborators, and the copy on this page is written with them in mind, not only the full-time academic."
  - h: "What we do and what you do"
    p: "We bring in the matter, qualify it technically, negotiate fees and deadlines with counsel or the insurer, prepare the case file, handle invoicing and take on all commercial contact. You receive an instruction that is already scoped: defined limits, ordered documentation and a specific technical question. You bring the judgement, validate the methodology, sign the report and confirm it in court if the proceedings require it."
  - h: "The kind of matters that come in"
    p: "Cases where the dispute turns on the calculation model, on the characterisation of a material or on the interpretation of a technical standard: structural pathology requiring reassessment, soil-structure interaction, service failures in installations, building systems behaving outside their product standard. These are technically demanding files — which is precisely why an academic profile is called for."
  - h: "Compatibility and independence"
    p: "Acting as an expert witness is compatible with university teaching and with private practice, but the specific position depends on each university's terms of engagement and, for civil servants, on Spanish Act 53/1984 on incompatibilities. Verifying that is each collaborator's responsibility. On our side, the report is governed by the expert's duty of impartiality (art. 335.2 LEC): what the analysis shows is what gets signed, whether or not it favours the instructing party."

split_label: "Division of roles"
split_headline: "You bring the judgement. We handle everything else."
split_items:
  - num: "01"
    text: "Client acquisition and technical qualification of the matter"
  - num: "02"
    text: "Negotiation of fees, scope and deadlines"
  - num: "03"
    text: "Preparation of the case file and testing campaign"
  - num: "04"
    text: "Formal drafting, layout and procedural filing"
  - num: "05"
    text: "Invoicing, follow-up and dealings with counsel"
split_note: "You: technical judgement, signature and court confirmation"

expectations_eyebrow: "Read this before registering"
expectations_title: "We cannot promise you immediate instructions"
expectations_body:
  - "It is worth saying plainly: registering here <strong>does not mean you will receive an instruction soon</strong>, or at all. It would be easy to write the opposite and it would read better on this page, but it would not be true."
  - "Demand for singular, high-profile expert work has grown, and with it the requirement for a precise match: the matters that justify calling on an academic expert are, by definition, infrequent and highly specific. A geotechnics professor does not resolve a dispute over electrical installations, and calling them for that would only waste your time and cost us credibility."
  - "So the approach is the opposite of a job pool: <strong>leave us your details now so that, when a case comes in that matches your specialism exactly, we can go straight to you</strong>. It might be a month or it might be a year. What will not happen is a call about an instruction that is not right for you."
expectations_points:
  - "Registration creates no commitment on either side, and no exclusivity."
  - "There is no guaranteed minimum volume of instructions, and no forecast we could put in writing."
  - "When a compatible case arises, we will call you with the scope and fees already defined, so you can decide on facts."
  - "If a matter does not match your specialism, we will not write to you. We prefer silence to a mailing list."
  - "You can ask to be removed and have your data erased at any time by writing to our contact address."

form_section_eyebrow: "Expert registration"
form_section_title: "Leave us your technical profile"
form_section_lede: "Five steps. We do not ask for client names, case numbers or anything subject to confidentiality: only the subject matter you have reported on."

form_eyebrow: "Expert registration"
form_origen: "perito-alta-colaborador"
form_redirect: "/en/thank-you/"
form_redirect_error: "/en/contact/"

form_labels:
  next: "Continue"
  submit: "Submit registration"
  optional: "(optional)"
  progress: "/"
  required_note: "Required fields flagged by your browser"
  honeypot: "Do not fill in this field"

form_consent:
  text: "I have read and accept the"
  link_label: "privacy policy"
  url: "/en/privacy/"

form_steps:
  - key: "perfil_academico"
    eyebrow: "§ 01 · Profile"
    type: "choice"
    question: "What is your current academic position?"
    helper: "If you combine teaching with independent practice, choose the option that best reflects it."
    options:
      - "Full professor"
      - "Tenured university lecturer"
      - "Associate or adjunct lecturer with independent professional practice"
      - "Teaching and research staff (contract doctor, assistant professor)"
      - "Other teaching or research profile"
  - key: "formacion"
    eyebrow: "§ 02 · Qualifications and specialism"
    type: "fields"
    question: "What are your qualifications and your field of expertise?"
    helper: "The specialism is the field we use to match your profile against the subject of each matter."
    fields:
      - name: "titulacion"
        label: "Qualification"
        placeholder: "PhD, Civil Engineering"
        required: true
      - name: "especialidad"
        label: "Specialism or field of expertise"
        placeholder: "Reinforced concrete design · Geotechnics · Building services…"
        required: true
  - key: "experiencia"
    eyebrow: "§ 03 · Expert witness experience"
    type: "choice"
    question: "Have you acted as an expert witness before?"
    options:
      - "Yes, regularly"
      - "Yes, occasionally"
      - "No, but I have acted as a technical adviser"
      - "No, this would be my first appointment"
  - key: "experiencia_detalle"
    eyebrow: "§ 04 · Subject matter covered"
    type: "fields"
    question: "What subjects have you reported on?"
    helper: "Only the technical nature of the work. Do not give client or party names, case numbers or anything subject to confidentiality."
    fields:
      - name: "materias"
        label: "Nature and subject matter of your expert work"
        multiline: true
        rows: 4
        placeholder: "E.g.: structural pathology in residential buildings; foundation failure from differential settlement; party-appointed reports in civil proceedings."
        required: false
        note: "If you indicated no prior expert work, leave this blank or describe equivalent technical experience."
  - key: "contacto"
    eyebrow: "§ 05 · Contact"
    type: "fields"
    question: "How do we reach you?"
    helper: "We will only write to you when there is a matter compatible with your specialism."
    fields:
      - name: "nombre"
        label: "Full name"
        placeholder: "First name and surname"
        autocomplete: "name"
        required: true
      - name: "email"
        label: "Email address"
        type: "email"
        placeholder: "name@university.edu"
        autocomplete: "email"
        required: true
      - name: "telefono"
        label: "Contact telephone"
        type: "tel"
        placeholder: "+34 ___ ___ ___"
        autocomplete: "tel"
        required: true
      - name: "institucion"
        label: "University or institution"
        placeholder: "University, department or own practice"
        required: false

faq_title: "Before you register"
faq:
  - q: "How long before I receive an instruction?"
    a: "We cannot give you a timeframe. It depends entirely on a matter coming in whose subject matches your specialism. It could be weeks, or it could never happen. This page exists precisely so as not to create an expectation we cannot support."
  - q: "How are fees set?"
    a: "They are agreed case by case before the instruction is accepted, based on scope, technical complexity and whether court confirmation is expected. You receive a firm written proposal and decide then: registering commits you to nothing."
  - q: "Is this compatible with my university post?"
    a: "That depends on your terms of engagement and, for civil servants, on Spanish Act 53/1984 on incompatibilities. It is a check each collaborator must make with their own university. We cannot make it for you."
  - q: "Do I have to find clients or negotiate?"
    a: "No. Client acquisition, fee negotiation, file preparation and invoicing are ours. Your involvement begins once the instruction is defined and accepted."
  - q: "Must I sign the report and confirm it in court?"
    a: "Yes. The signature is the core of the collaboration: whoever endorses the report is the one who defends it. If the proceedings require confirmation in court, it is agreed from the outset and paid as part of the instruction (art. 347 LEC)."
  - q: "What if the report harms the instructing party?"
    a: "It is issued all the same. The expert must act objectively and state so under oath or promise (art. 335.2 LEC). We do not accept instructions conditioned on an outcome, and we will never ask you to adjust a conclusion."

privacy_title: "How we handle your data"
privacy_note: "Your details are added to an internal register of collaborating experts for the sole purpose of contacting you about an instruction compatible with your specialism. They are not passed to third parties. You may exercise your rights of access, rectification and erasure by writing to the firm's contact address, in accordance with EU Regulation 2016/679."
---
{% set ui = en %}
{% include "layouts/colaborador.njk" %}
