---
layout: layouts/base.njk
title: "Request a Technical Quote & Case Consultation"
description: "Guided form to request an expert report quote. Free initial assessment. Technical assignment within 24h. Carrer Numància 95, Barcelona."
lang: en
eleventyNavigation:
  key: Contacto
  order: 7
translations:
  - lang: es
    permalink: /contacto/
  - lang: ca
    permalink: /ca/contacte/
permalink: "/en/contact/"
breadcrumb:
  - label: "Home"
    url: "/"
  - label: "Contact"
---
{% set ui = en %}
{% set heroTitle = "Request a<br>technical consultation" %}
{% include "partials/page-hero.njk" %}
<section style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: clamp(28px,4vw,56px); align-items: start;" class="site-two">
<div>
<h3 style="font-family: var(--font-serif); font-size: var(--fs-h3); font-weight: 500; color: var(--text-strong); margin: 0 0 20px;">Contact channels</h3>
<div style="display: flex; gap: 14px; margin-bottom: 14px;"><a href="tel:{{ metadata.contact.phoneNumber | replace(' ', '') }}" style="flex: 1; display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); text-decoration: none;"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(30,100,60,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div><div style="font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 3px;">Phone</div><div style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 600; color: var(--text-strong);">{{ metadata.contact.phoneNumber | replace('+34 ', '') }}</div></div></a><a href="mailto:{{ metadata.company.email }}" style="flex: 1; display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); text-decoration: none;"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(30,100,60,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><div style="font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 3px;">Email</div><div style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 600; color: var(--text-strong);">{{ metadata.company.email }}</div></div></a></div>
<h3 style="font-family: var(--font-serif); font-size: var(--fs-h3); font-weight: 500; color: var(--text-strong); margin: 20px 0 16px;">Offices</h3>
<div style="display: flex; gap: 14px; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); margin-bottom: 14px;"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(30,100,60,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div style="font-weight: 600; color: var(--text-strong); margin-bottom: 4px;">Barcelona <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); font-weight: 500;">HEAD OFFICE</span></div><div style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted);">Carrer de Numància, 95, Local 5 · 08029 Barcelona<br><span style="font-family: var(--font-mono); font-size: 0.75rem;">By appointment · Mon–Thu 9am–6pm · Fri 9am–2pm</span></div></div></div>
<div style="display: flex; gap: 14px; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); margin-bottom: 28px;"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(30,100,60,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div style="font-weight: 600; color: var(--text-strong); margin-bottom: 4px;">Granollers</div><div style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted);">Carrer Navarra, 14 · 08401 Granollers<br><span style="font-family: var(--font-mono); font-size: 0.75rem;">By appointment</span></div></div></div>
</div>
{% set qualLabel = "Guided consultation" %}
{% set qualItems = [
  { num: "01", text: "Type of matter" },
  { num: "02", text: "Brief description" },
  { num: "03", text: "Amount in dispute" },
  { num: "04", text: "Litigation status" },
  { num: "05", text: "Contact details" }
] %}
{% set qualCta = "Start guided consultation" %}
{% set qualNote = "Confidential · No obligation" %}
{% include "partials/qual.njk" %}
</div>
</section>
