---
layout: layouts/base.njk
title: "Solicitud de Presupuesto Técnico y Consulta de Casos"
description: "Formulario guiado para solicitar presupuesto pericial. Primera valoración sin coste. Asignación técnica en 24 h. Carrer Numància 95, Barcelona."
lang: es
eleventyNavigation:
  key: Contacto
  order: 7
translations:
  - lang: ca
    permalink: /ca/contacte/
  - lang: en
    permalink: /en/contact/
permalink: "/contacto/"
breadcrumb:
  - label: "Inicio"
    url: "/"
  - label: "Contacto"
---
{# contacto #}
<div itemscope itemtype="https://schema.org/Article" style="display: none;" aria-hidden="true"><meta itemprop="headline" content="{{ title }}"><meta itemprop="description" content="{{ description }}"><meta itemprop="url" content="{{ metadata.site.url }}{{ page.url }}"><div itemprop="author" itemscope itemtype="https://schema.org/Person"><meta itemprop="name" content="{{ metadata.author.name }}"></div><div itemprop="publisher" itemscope itemtype="https://schema.org/Organization"><meta itemprop="name" content="{{ metadata.company.name }}"></div></div>
{% set ui = es %}
{% set heroTitle = "Solicitar<br>consulta técnica" %}
{% include "partials/page-hero.njk" %}
<section style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: clamp(28px,4vw,56px); align-items: start;" class="site-two">
<div>
<h3 style="font-family: var(--font-serif); font-size: var(--fs-h3); font-weight: 500; color: var(--text-strong); margin: 0 0 20px;">Canales de contacto</h3>
<div style="display: flex; gap: 14px; margin-bottom: 14px;"><a href="tel:{{ metadata.contact.phoneNumber | replace(' ', '') }}" style="flex: 1; display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); text-decoration: none; transition: border-color 0.3s, box-shadow 0.3s;" onmouseenter="this.style.borderColor='var(--accent)';this.style.boxShadow='0 2px 12px rgba(30,100,60,0.08)'" onmouseleave="this.style.borderColor='var(--border-hairline)';this.style.boxShadow='none'"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(30,100,60,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div><div style="font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 3px;">Teléfono</div><div style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 600; color: var(--text-strong);">{{ metadata.contact.phoneNumber | replace('+34 ', '') }}</div></div></a><a href="mailto:{{ metadata.company.email }}" style="flex: 1; display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); text-decoration: none; transition: border-color 0.3s, box-shadow 0.3s;" onmouseenter="this.style.borderColor='var(--accent)';this.style.boxShadow='0 2px 12px rgba(30,100,60,0.08)'" onmouseleave="this.style.borderColor='var(--border-hairline)';this.style.boxShadow='none'"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(30,100,60,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><div style="font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 3px;">Email</div><div style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 600; color: var(--text-strong);">{{ metadata.company.email }}</div></div></a></div>
<h3 style="font-family: var(--font-serif); font-size: var(--fs-h3); font-weight: 500; color: var(--text-strong); margin: 20px 0 16px;">Sedes</h3>
<div style="display: flex; gap: 14px; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); margin-bottom: 14px;"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(30,100,60,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div style="font-family: var(--font-sans); font-weight: 600; color: var(--text-strong); margin-bottom: 4px;">Barcelona <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); font-weight: 500; letter-spacing: 0.05em; margin-left: 6px;">PRINCIPAL</span></div><div style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted);">Carrer de Numància, 95, Local 5 · 08029 Barcelona<br><span style="font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.02em;">Con cita previa · L–J 9 h–18 h · V 9 h–14 h</span></div></div></div>
<div style="display: flex; gap: 14px; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); margin-bottom: 28px;"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(30,100,60,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div style="font-family: var(--font-sans); font-weight: 600; color: var(--text-strong); margin-bottom: 4px;">Granollers</div><div style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted);">Carrer Navarra, 14 · 08401 Granollers<br><span style="font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.02em;">Con cita previa</span></div></div></div>
<div style="display: flex; gap: 12px; padding: 16px 20px; border-radius: var(--radius-md); background: rgba(30,100,60,0.04); border: 1px solid rgba(30,100,60,0.1);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><div><div style="font-family: var(--font-sans); font-weight: 600; font-size: 0.85rem; color: var(--text-strong); margin-bottom: 3px;">Confidencialidad RGPD</div><div style="font-size: 0.82rem; line-height: 1.55; color: var(--text-muted);">Toda la información se trata con estricta confidencialidad conforme al Reglamento UE 2016/679, exclusivamente para la gestión de la consulta.</div></div></div>
</div>
{% set qualLabel = "Consulta guiada" %}
{% set qualItems = [
  { num: "01", text: "Tipo de asunto" },
  { num: "02", text: "Descripción breve" },
  { num: "03", text: "Importe en disputa" },
  { num: "04", text: "Situación procesal" },
  { num: "05", text: "Datos de contacto" }
] %}
{% set qualCta = "Iniciar consulta guiada" %}
{% set qualNote = "Confidencial · Sin compromiso" %}
{% include "partials/qual.njk" %}
</div>
</section>
<section style="position: relative; width: 100%; height: 380px; overflow: hidden;">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.7!2d2.131!3d41.3808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a498f2d58e4e9f%3A0x0!2sCarrer%20de%20Num%C3%A0ncia%2C%2095%2C%2008029%20Barcelona!5e0!3m2!1ses!2ses!4v1" style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0; filter: grayscale(0.3) sepia(0.15) saturate(0.9) brightness(1.02);" loading="lazy" allowfullscreen="" title="Ubicación oficina Barcelona — Carrer Numància 95" referrerpolicy="no-referrer"></iframe>
<div style="position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); background: rgba(241,241,234,0.95); backdrop-filter: blur(8px); border: 1px solid var(--border-hairline); border-radius: var(--radius-sm); padding: 10px 18px; display: flex; align-items: center; gap: 10px; z-index: 2; box-shadow: 0 2px 12px rgba(0,0,0,0.1);"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span style="font-family: var(--font-mono); font-size: 0.78rem; font-weight: 500; color: var(--text-strong); letter-spacing: 0.02em;">C/ Numància 95, 08029 Barcelona</span></div>
</section>
