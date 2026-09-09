---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /en/specialist-collaboration/
lang: en
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /colaboracion-expertos/
  - lang: ca
    permalink: /ca/collaboracio-experts/
title: "Specialist Collaboration | Technical Study Without Signing the Report"
description: "Register of specialist consultants: they carry out the technical study in their field for inclusion in an expert report, without writing it, signing it or appearing before the court."
breadcrumb_parent:
  label: "Expert Panel"
  url: "/en/expert-panel/"

# ── NEW PAGE — 08/09/2026 ────────────────────────────────────────────────────
# English version of /colaboracion-expertos/. The underlying decisions are
# documented in src/claustro/colaborar-experto.md and in
# claude/pb-dos-figuras-colaborador-2026-09-07.md. `noindex: true` for now.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Specialist<br>collaboration"

bridge_text: "This page is addressed to specialists. To consult an expert by subject:"
bridge_url: "/en/expert-panel/"
bridge_link: "See the expert panel →"

bridge2_text: "Would you rather take on the full expert-witness engagement, with signature and court ratification?"
bridge2_url: "/en/expert-collaboration/"
bridge2_link: "Collaborate as a signing expert →"

expectations_eyebrow: "What this means, exactly"
expectations_title: "Bring your field. The court is the practice's job."
expectations_body:
  - "We are looking for specialists to carry out the technical study in their field for inclusion in an expert report. You do not write the report, you do not sign it and you do not testify before any court: that is the forensic lead's work and the forensic lead's responsibility."
  - "The instruction arrives already scoped: one specific technical question, the documentation in order and limits fixed in writing. You apply your own method and judgement and deliver a study. Your involvement ends there."
  - "The study is included in the report as an annex. Whether your name appears as its author is your decision: if you authorise it, the report gains your record; if you do not, the study is included all the same without identifying you."
expectations_points_label: "The division, in four lines"
expectations_points:
  - "<strong>You do</strong> the testing, the analysis, the modelling or the assessment in your field."
  - "<strong>The practice does</strong> the complete report, which includes your study as an annex. It signs it and is answerable for it."
  - "<strong>In court</strong> the forensic lead appears. You take on no procedural obligation arising from this instruction."
  - "<strong>Your name</strong> appears as author of the annexed study only if you authorise it."

caveat_title: "What cannot be guaranteed to you"
caveat_body:
  - "No expert can guarantee you with total certainty that you will never be called. The opposing party may ask for the author of a study included in a report to be summoned, and procedural law provides for it. It is infrequent and it is not within the practice's control."
  - "What is within the practice's control: that you know this before starting, that if it ever happens it is explained to you in good time, and that you are not left alone with it. You will not be sold a reassurance that cannot be signed."

protocols_eyebrow: "§ Routes"
protocols_title: "Two ways to take part without signing"
protocols_lede: "The route does not change the underlying fact: the report is written and signed by the forensic lead. It changes the volume of work commissioned and how it is paid."
protocols:
  - ref: "Route A — Subject study"
    title: "Testing, analysis or modelling"
    lede: "A bounded piece of technical work included in the report as an annex: a testing campaign, a reassessment, a model, an interpretation of results."
    items:
      - "Scope and fees fixed in writing before starting"
      - "Access to the case file and to the site visit where needed"
      - "Your own methodology and judgement: you will never be asked to adjust a conclusion"
      - "Authorship in the report's annex, if you authorise it"
      - "No drafting of the report, no signature and no court appearance"
    cta: "Register"
  - ref: "Route B — One-off consultation"
    title: "Judgement on a specific question"
    lede: "A single technical question: whether a construction procedure is standard in your field, whether a test result admits another reading, whether a product standard covers a given use."
    items:
      - "Short engagement, paid per consultation"
      - "No formal deliverable where the matter does not call for one"
      - "Your judgement is not attributed by name without your express authorisation"
      - "Compatible with any employment or academic position of your own"
      - "No drafting of the report, no signature and no court appearance"
    cta: "Register"

body_blocks:
  - h: "The kind of studies commissioned"
    p: "Files where the dispute turns on the calculation model, on the characterisation of a material, on the root cause of a service failure or on the construction practice actually carried out. By definition these are the matters the forensic lead cannot resolve alone: if it could, there would be no instruction."
  - h: "Fees and independence"
    p: "Fees are fixed in writing before starting, per study, and <strong>do not depend on the outcome of the proceedings</strong>. That last point is not administrative housekeeping: a specialist paid according to the outcome would have an interest in it, and that interest would contaminate the report carrying the study. The technical work is paid for whatever it concludes."
  - h: "Compatibility with your own position"
    p: "Carrying out the technical study of a subject is not acting as an expert witness: there is no appointment, no oath and no procedural obligation. Even so, the specific compatibility with your university, company or laboratory depends on your terms of engagement and, for civil servants, on Spanish Act 53/1984 on incompatibilities. Verifying that is each collaborator's responsibility."
  - h: "You can change route"
    p: "Registering as a specialist consultant closes no doors. If you later want to take on the full engagement — drafting, signing and confirming in court — you move to the <a href=\"/en/expert-collaboration/\">collaborating experts register</a> without starting over. Many specialists prefer to begin by contributing the study and decide afterwards, with a real file in front of them."

split_label: "How an instruction works"
split_headline: "You supply the technical judgement; the practice, the report and the court."
split_items:
  - num: "01"
    text: "The matter and the technical question are described to you, without confidential data"
  - num: "02"
    text: "Scope, deadline and fees fixed in writing"
  - num: "03"
    text: "Access to the documentation and to the site visit if the study requires it"
  - num: "04"
    text: "Delivery of the study, with or without your signature"
  - num: "05"
    text: "Inclusion as an annex to the report, and payment"
split_note: "The consultant does not write, does not sign and does not testify"

form_section_eyebrow: "Specialist registration"
form_section_title: "Technical profile declaration"
form_section_lede: "Five steps. We do not ask for client names, case numbers or anything subject to confidentiality: only the subject you command."

form_eyebrow: "Specialist registration"
form_id: "experto-consultor"
form_origen: "perito-alta-experto-consultor"
form_redirect: "/en/thank-you/"
form_redirect_error: "/en/contact/"

form_labels:
  next: "Continue"
  back: "Back"
  step_hint: "Complete this step to continue"
  submit: "Submit registration"
  optional: "(optional)"
  progress: "/"
  required_note: "Required fields flagged by your browser"
  honeypot: "Do not fill in this field"
  sending: "Submitting your registration…"
  sent_title: "Registration received"
  sent_text: "Your details are now in the specialist consultants register. You will only be contacted when a matter compatible with your field comes in."
  error_title: "The registration could not be submitted"
  error_text: "Your details are still in the form, nothing has been lost. Use one of these routes or try again."
  error_email: "Send the registration by email"
  error_call: "Call the practice"
  retry: "Try again"

form_consent:
  text: "I have read and accept the"
  link_label: "privacy policy"
  url: "/en/privacy/"

form_steps:
  - key: "materia"
    eyebrow: "§ 01 · Subject"
    type: "choice"
    question: "Which subject can you carry out the technical study in?"
    helper: "This is the field matched against the disputed subject of each file. If your speciality fits none of them, say so in step 04."
    options:
      - "Structures and analysis"
      - "Geotechnics and foundations"
      - "Buildings and habitability"
      - "Installations and industrial process"
      - "Materials and testing"
      - "Public works and contract"
  - key: "acredita"
    eyebrow: "§ 02 · What evidences your judgement"
    type: "choice"
    question: "What evidences your technical judgement in that subject today?"
    helper: "This does not set priority. No option ranks above the others."
    options:
      - "Professorship, tenured post or university teaching"
      - "Site direction, site management or technical direction"
      - "Instrumental speciality (fire protection, acoustics, field geotechnics, thermography, metrology)"
      - "Testing laboratory with its own accreditation"
      - "Current or past technical responsibility at a manufacturer"
      - "Applied research or product development"
  - key: "formacion"
    eyebrow: "§ 03 · Qualifications and means"
    type: "fields"
    question: "What are your qualifications and what means do you have?"
    helper: "The means matter as much as the qualification: some studies depend on specific equipment."
    fields:
      - name: "titulacion"
        label: "Qualification and professional registration"
        placeholder: "Civil Engineer · Reg. 00000"
        required: true
      - name: "medios"
        label: "Instrumentation, laboratory or software available to you"
        multiline: true
        rows: 3
        placeholder: "e.g. rebound hammer and ultrasound; accredited laboratory for hardened concrete; finite element analysis licence."
        required: false
  - key: "autoria"
    eyebrow: "§ 04 · Authorship of the study"
    type: "choice"
    question: "Do you authorise your name to appear as author of the annexed study?"
    helper: "You may say no. The study is included all the same, without identifying you. This answer is not final: it is confirmed on each instruction."
    options:
      - "Yes, with name and qualification as author of the annexed study"
      - "Yes, but I would rather decide case by case"
      - "No, the study is included without identifying me"
  - key: "contacto"
    eyebrow: "§ 05 · Contact"
    type: "fields"
    question: "How do we reach you?"
    helper: "You will only be written to when there is a matter compatible with your field."
    fields:
      - name: "nombre"
        label: "Full name"
        placeholder: "First name and surname"
        autocomplete: "name"
        required: true
      - name: "email"
        label: "Email address"
        type: "email"
        placeholder: "name@domain.com"
        autocomplete: "email"
        required: true
      - name: "telefono"
        label: "Contact telephone"
        type: "tel"
        placeholder: "+34 ___ ___ ___"
        autocomplete: "tel"
        required: true
      - name: "institucion"
        label: "University, company, laboratory or own practice"
        placeholder: "The organisation you are attached to"
        required: false
      - name: "perfil"
        label: "Public profile, online CV or university staff page"
        placeholder: "https://linkedin.com/in/… · ORCID · Google Scholar · department page"
        required: false
        note: "A verifiable public profile is worth more than an attached CV: it stays current and the court can check it. There is no need to send a CV."
      - name: "mensaje"
        label: "Anything you want to add"
        multiline: true
        rows: 4
        placeholder: "e.g. your speciality fits none of the subjects listed; unusual instrumentation; availability; anything you were not asked about."
        required: false
        note: "Do not give client or party names, case numbers or anything subject to confidentiality."

faq_title: "Before you register"
faq:
  - q: "Do I need to send a CV?"
    a: "No. Your qualification, your field and a verifiable public profile — LinkedIn, ORCID, Google Scholar, your department page or your laboratory's accreditation — are enough to assess the fit. If a specific matter calls for more, you will be asked then, by email. This register is not a selection process."
  - q: "Do I have to go to court?"
    a: "No. The report is signed by the forensic lead, who appears and is answerable for it. Your involvement ends with the delivery of the study. That said, read «What cannot be guaranteed to you»: the opposing party may ask for the author of a study included in a report to be summoned. It is infrequent, it is not within the practice's control, and that is why it is written on this page rather than in the small print."
  - q: "Do I have to sign the study?"
    a: "No. It is your decision, and it is confirmed on each instruction. If you sign it, the report carries your record as author of the annex. If you do not, the study is included all the same and your name appears nowhere."
  - q: "Do I take on expert-witness liability?"
    a: "No. Liability for the report — technical and procedural — lies with whoever signs it, and that is the forensic lead. You are answerable for your study on the same terms as for any commissioned technical work, no more and no less."
  - q: "How long before I receive an instruction?"
    a: "We cannot give you a timeframe. It depends on a matter coming in whose subject matches your speciality, and that match is infrequent by definition. It could be weeks, or it could never happen. This page exists precisely so as not to create an expectation we cannot support."
  - q: "How are fees set?"
    a: "They are agreed case by case before the instruction is accepted, based on the scope of the study and the means it requires. You receive a firm written proposal, and it does not depend on the outcome of the proceedings. Registering commits you to nothing."
  - q: "Is this compatible with my university or company post?"
    a: "Carrying out a technical study is not acting as an expert witness: there is no appointment and no procedural obligation. Even so, compatibility depends on your terms of engagement and, for civil servants, on Spanish Act 53/1984 on incompatibilities. It is a check each collaborator must make."
  - q: "Can I move to signing as an expert witness later?"
    a: "Yes, whenever you want. Registering as a specialist consultant neither closes that door nor commits you to anything. Many specialists prefer to begin by contributing the study and decide afterwards, with a real file in front of them."
  - q: "What if my study harms the party instructing the report?"
    a: "It is included all the same. The report is governed by the expert's duty of impartiality (art. 335.2 LEC) and we do not accept instructions conditioned on an outcome. You will never be asked to adjust a conclusion."

privacy_title: "How we handle your data"
privacy_note: "Your details are added to an internal register of specialist consultants for the sole purpose of contacting you about an instruction compatible with your field. They are not passed to third parties. You may exercise your rights of access, rectification and erasure by writing to the practice's contact address, in accordance with EU Regulation 2016/679."
---
{% set ui = en %}
{% include "layouts/colaborador.njk" %}
