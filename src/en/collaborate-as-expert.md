---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /en/expert-collaboration/
lang: en
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: es
    permalink: /colaboracion-peritos/
  - lang: ca
    permalink: /ca/collaboracio-perits/
title: "Expert Collaboration | Register of Signing Experts"
description: "Register of collaborating signing experts: academic profiles, senior site professionals, niche specialists and laboratories. Terms of collaboration and the real availability of instructions."
breadcrumb_parent:
  label: "Expert Panel"
  url: "/en/expert-panel/"

# ── DRAFT — pending Albert's approval ────────────────────────────────────────
# All copy on this page is a first draft written on the agreed approach
# (honest expectation management + mixed academic / self-employed profile).
# Review tone and terms before removing `noindex: true`.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Expert<br>collaboration"

bridge_text: "This page is addressed to experts. To consult an expert by subject:"
bridge_url: "/en/expert-panel/"
bridge_link: "See the expert panel →"


protocols_eyebrow: "§ Protocols"
protocols_title: "Two routes to standing"
protocols_lede: "The route changes neither the technical work nor the fees: it changes what evidences the signatory before the court. Neither route is subordinate to the other."
protocols:
  - ref: "Route A — Academic standing"
    title: "University and teaching"
    lede: "Full professors, tenured lecturers and associate lecturers who combine teaching with their own professional practice."
    items:
      - "Publications and standardisation committees as a documentary record"
      - "Engagement report by report, with no committed volume and no exclusivity"
      - "Compatibility governed by Spanish Act 53/1984 for civil servants"
      - "Invoiced independently or under the university's own arrangement"
      - "Court confirmation agreed and paid from the outset — art. 347 LEC"
    cta: "Register"
  - ref: "Route B — Professional standing"
    title: "Site, specialism, industry and professional bodies"
    lede: "Senior site professionals, niche specialists, former manufacturer or laboratory technical staff, and experts on other professional rosters. Practice evidences standing on its own: no teaching record is required."
    items:
      - "Years of site direction, professional registration or laboratory accreditation as standing"
      - "Compatible with your own client base, with no exclusivity"
      - "Territorial coverage outside Catalonia through other professional rosters"
      - "Evidenced separation from the manufacturer, where the profile comes from industry"
      - "Option to act as a technical adviser without signing the report"
    cta: "Register"
body_blocks:
  - h: "What we do and what you do"
    p: "We bring in the matter, qualify it technically, negotiate fees and deadlines with counsel or the insurer, prepare the case file, handle invoicing and take on all commercial contact. You receive an instruction that is already scoped: defined limits, ordered documentation and a specific technical question. You bring the judgement, validate the methodology, sign the report and confirm it in court if the proceedings require it."
  - h: "The kind of matters that come in"
    p: "Cases where the dispute turns on the calculation model, on the characterisation of a material or on the interpretation of a technical standard: structural pathology requiring reassessment, soil-structure interaction, service failures in installations, building systems behaving outside their product standard. These are technically demanding files — which is precisely why an academic profile is called for."
  - h: "Compatibility and independence"
    p: "Acting as an expert witness is compatible with university teaching and with private practice, but the specific position depends on each university's terms of engagement and, for civil servants, on Spanish Act 53/1984 on incompatibilities. Verifying that is each collaborator's responsibility. On our side, the report is governed by the expert's duty of impartiality (art. 335.2 LEC): what the analysis shows is what gets signed, whether or not it favours the instructing party."

split_label: "Division of roles"
split_headline: "The collaborator supplies the technical judgement; the practice, the rest of the file."
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
split_note: "Collaborator: technical judgement, signature and court confirmation"

expectations_eyebrow: "Terms of the register"
expectations_title: "Real availability of instructions"
expectations_body:
  - "Joining the register does not carry any allocation of instructions. Frequency depends on a matter coming in whose subject matches the declared specialism, and that match is infrequent by definition: the files that justify bringing in an external expert are precisely those the forensic lead cannot resolve alone."
  - "Assignment follows subject match, not availability. A geotechnics specialist does not receive a dispute about electrical installations. The restriction is deliberate: a report signed outside the signatory's evidenced specialism does not survive cross-examination."
  - "The register works as a reference directory, not a job pool. Details are held so the expert can be reached on the day the subject matches, with no foreseeable timeframe: it may be a matter of weeks, or it may never happen."
expectations_points_label: "Terms"
expectations_points:
  - "Registration creates no obligation and no exclusivity for either party."
  - "No minimum volume of instructions is guaranteed and no forecast is issued in writing."
  - "Contact is made with scope and fees already defined, so the decision rests on facts."
  - "No communications are sent outside an instruction compatible with the declared specialism."
  - "Removal and erasure of data on request, at any time — EU Regulation 2016/679."
form_section_eyebrow: "Expert registration"
form_section_title: "Technical profile declaration"
form_section_lede: "Five steps. We do not ask for client names, case numbers or anything subject to confidentiality: only the subject matter you have reported on."

form_eyebrow: "Expert registration"
form_origen: "perito-alta-colaborador"
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
  sent_text: "Your details are now on the register of collaborating experts. You will only be contacted when an instruction compatible with your specialism comes in."
  error_title: "The registration could not be recorded"
  error_text: "Your details are still in the form, nothing has been lost. Use one of these routes or try again."
  error_email: "Send the registration by email"
  error_call: "Call the firm"
  retry: "Try again"

form_consent:
  text: "I have read and accept the"
  link_label: "privacy policy"
  url: "/en/privacy/"

form_steps:
  - key: "perfil"
    eyebrow: "§ 01 · Profile"
    type: "choice"
    question: "What evidences your technical judgement today?"
    helper: "This sets the route to standing, not the priority. No option ranks above the others."
    options:
      - "Full professorship or tenured university post"
      - "University teaching combined with own professional practice"
      - "Site direction, site management or technical direction"
      - "Instrumental specialism (fire protection, acoustics, field geotechnics, thermography, metrology)"
      - "Testing laboratory or former technical role at a manufacturer"
      - "Listed on the expert roster of a professional body"
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
  - q: "Do I have to be a university lecturer?"
    a: "No. The register is open to site profiles, instrumental specialists, accredited laboratories and experts listed with other professional bodies. What is evidenced before the court is the signatory's record in the specific subject, and twenty-five years of site direction is a documentary record just as a publication is."
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
