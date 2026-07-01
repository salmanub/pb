---
layout: layouts/base.njk
title: "Servicio Técnico para Despachos de Abogados y Aseguradoras"
description: "Protocolo B2B de colaboración pericial para despachos y aseguradoras: informe de viabilidad, interrogatorio cruzado (LEC art. 347) y grandes riesgos IRD."
image: "reclamacion-seguros-construccion.jpg"
image_alt: "Colaboración técnica con abogados y aseguradoras"
audience: "pro"
lang: es
eleventyNavigation:
  key: Abogados
  order: 4
translations:
  - lang: ca
    permalink: /ca/collaboracio-advocats/
  - lang: en
    permalink: /en/lawyer-collaboration/
permalink: "/colaboracion-abogados/"
---
{# colaboracion-abogados — Port 1:1 de SitePages.jsx —— Abogados() #}
{# —?—? Microdata Article —?—? #}
<div itemscope itemtype="https://schema.org/Article" style="display: none;" aria-hidden="true"><meta itemprop="headline" content="{{ title }}"><meta itemprop="description" content="{{ description }}"><meta itemprop="url" content="{{ metadata.site.url }}{{ page.url }}"><div itemprop="author" itemscope itemtype="https://schema.org/Person"><meta itemprop="name" content="{{ metadata.author.name }}"></div><div itemprop="publisher" itemscope itemtype="https://schema.org/Organization"><meta itemprop="name" content="{{ metadata.company.name }}"></div></div>
{% set ui = es %}
{% set langPrefix = "" if not lang or lang == "es" else ("/" + lang) %}
{% set heroTitle = "Servicio técnico para<br>despachos y aseguradoras" %}

{# PageHero (breadcrumb inside container) #}
{% include "partials/page-hero.njk" %}

{# ===== PROTOCOL CARDS (2 columns) — DS L107-120 ===== #}
<section itemscope itemtype="https://schema.org/CollectionPage" style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<meta itemprop="name" content="Protocolos de colaboración B2B">
<meta itemprop="url" content="{{ metadata.site.url }}/colaboracion-abogados/">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="site-two">
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 30px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-accent);">Protocolo A — Despachos</div>
<h3 itemprop="name" style="font-family: var(--font-serif); font-size: var(--fs-h2); font-weight: 400; color: var(--text-strong); margin: 10px 0 0;">Para despachos de abogados</h3>
<ul style="list-style: none; margin: 20px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px;">
{% for item in ["Informe preliminar de viabilidad técnica en 48 horas","Honorarios fijos pactados por escrito","Ratificación garantizada (LEC art. 347) incluida","Múltiples procedimientos simultáneos","Informe de avance periódico al letrado"] %}
<li style="display: flex; gap: 11px; align-items: flex-start; font-size: 0.95rem; color: var(--text-body); line-height: 1.5;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 2px; flex-shrink: 0; display: inline-block;" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>{{ item }}</li>
{% endfor %}
</ul>
<div style="margin-top: 24px;"><a href="/contacto/profesional/" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; font-family: var(--font-sans); font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid var(--ink-900); background: transparent; color: var(--ink-900); text-decoration: none;">Iniciar colaboración <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>
</article>
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 30px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-accent);">Protocolo B — Aseguradoras</div>
<h3 itemprop="name" style="font-family: var(--font-serif); font-size: var(--fs-h2); font-weight: 400; color: var(--text-strong); margin: 10px 0 0;">Para aseguradoras y reaseguradoras</h3>
<ul style="list-style: none; margin: 20px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px;">
{% for item in ["Valoración de causa, alcance y cuantía del siniestro","Contrapericia frente al perito del asegurado","Colaboración en siniestros concurrentes","Certificación IRD — INESE","Interlocución directa con dirección de siniestros"] %}
<li style="display: flex; gap: 11px; align-items: flex-start; font-size: 0.95rem; color: var(--text-body); line-height: 1.5;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 2px; flex-shrink: 0; display: inline-block;" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>{{ item }}</li>
{% endfor %}
</ul>
<div style="margin-top: 24px;"><a href="/contacto/profesional/" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; font-family: var(--font-sans); font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid var(--ink-900); background: transparent; color: var(--ink-900); text-decoration: none;">Iniciar colaboración <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>
</article>
</div>
</section>

{# ===== TESTIMONIALS B2B — DS L121-124 ===== #}
<section style="max-width: var(--container-wide); margin: 0 auto; padding: 0 var(--gutter) var(--section-y);">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;"><span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span> § Declaraciones</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 0 0 var(--space-10);">Referencias B2B</h2>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;" class="site-three">
{% for t in [
  { q: "Su dictamen fue la base de toda nuestra estrategia de negociación. Tan claro y bien fundamentado que logramos acuerdo sin ir a juicio.", a: "Socio de Área", r: "Despacho de construcción · Madrid" },
  { q: "Valoro la disponibilidad para ratificar en sala sin demoras y el rigor metodológico del informe.", a: "Directora de Siniestros", r: "Aseguradora multinacional · Barcelona" },
  { q: "El informe de due diligence identificó contingencias que no habíamos previsto. Se amortizó muchas veces.", a: "Director de Inversiones", r: "Family Office · Barcelona" }
] %}
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 26px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<p itemprop="description" style="font-family: var(--font-serif); font-style: italic; font-size: 1.05rem; line-height: 1.55; color: var(--text-strong); margin: 0;">«{{ t.q }}»</p>
<div itemprop="name" style="margin-top: 18px; font-size: 0.85rem; font-weight: 600; color: var(--text-strong);">{{ t.a }}</div>
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-accent); margin-top: 4px;">{{ t.r }}</div>
</article>
{% endfor %}
</div>
</section>

{# ===== BAND CTA — DS L125 ===== #}
<section style="background: var(--surface-tint); border-top: 1px solid var(--oxide-200);">
<div style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter); text-align: center;">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;">Sin compromiso</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); color: var(--text-strong); margin: 0;">¿Tu despacho necesita un perito de parte acreditado?</h2>
<p style="margin: 14px auto 0; font-size: var(--fs-lede); line-height: var(--lh-lede); color: var(--text-muted); max-width: 50ch;">Informe de viabilidad en 48 horas.</p>
<div style="margin-top: 28px;"><a href="/contacto/profesional/" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; font-family: var(--font-sans); font-size: var(--fs-body); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid transparent; background: var(--accent); color: var(--accent-on); text-decoration: none;">Iniciar colaboración</a></div>
</div>
</section>
