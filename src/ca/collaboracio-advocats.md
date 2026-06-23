---
layout: layouts/base.njk
title: "Servei Tècnic per a Despatxos d'Advocats i Asseguradores"
description: "Protocol B2B de col·laboració pericial per a despatxos de construcció i companyies asseguradores. Informe preliminar de viabilitat, interrogatori creuat (LEC art. 347) i grans riscos IRD."
image: "reclamacion-seguros-construccion.jpg"
image_alt: "Col·laboració tècnica amb advocats"
audience: "pro"
lang: ca
eleventyNavigation:
  key: Abogados
  order: 4
translations:
  - lang: es
    permalink: /colaboracion-abogados/
  - lang: en
    permalink: /en/lawyer-collaboration/
permalink: "/ca/collaboracio-advocats/"
---
{# collaboracio-advocats — Port 1:1 de SitePages.jsx —— Abogados() #}
{# —?—? Microdata Article —?—? #}
<div itemscope itemtype="https://schema.org/Article" style="display: none;" aria-hidden="true"><meta itemprop="headline" content="{{ title }}"><meta itemprop="description" content="{{ description }}"><meta itemprop="url" content="{{ metadata.site.url }}{{ page.url }}"><div itemprop="author" itemscope itemtype="https://schema.org/Person"><meta itemprop="name" content="{{ metadata.author.name }}"></div><div itemprop="publisher" itemscope itemtype="https://schema.org/Organization"><meta itemprop="name" content="{{ metadata.company.name }}"></div></div>
{% set ui = ca %}
{% set langPrefix = "/ca" %}
{% set heroTitle = "Servei tècnic per a<br>despatxos i asseguradores" %}

{# PageHero (breadcrumb inside container) #}
{% include "partials/page-hero.njk" %}

{# ===== PROTOCOL CARDS (2 columns) — DS L107-120 ===== #}
<section itemscope itemtype="https://schema.org/CollectionPage" style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<meta itemprop="name" content="Protocols de col·laboració B2B">
<meta itemprop="url" content="{{ metadata.site.url }}/ca/collaboracio-advocats/">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="site-two">
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 30px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-accent);">Protocol A — Despatxos</div>
<h3 itemprop="name" style="font-family: var(--font-serif); font-size: var(--fs-h2); font-weight: 400; color: var(--text-strong); margin: 10px 0 0;">Per a despatxos d'advocats</h3>
<ul style="list-style: none; margin: 20px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px;">
{% for item in ["Informe preliminar de viabilitat tècnica en 48 hores","Honoraris fixos pactats per escrit","Ratificació garantida (LEC art. 347) inclosa","Múltiples procediments simultanis","Informe d'avanç periòdic al lletrat"] %}
<li style="display: flex; gap: 11px; align-items: flex-start; font-size: 0.95rem; color: var(--text-body); line-height: 1.5;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 2px; flex-shrink: 0; display: inline-block;" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>{{ item }}</li>
{% endfor %}
</ul>
<div style="margin-top: 24px;"><a href="/ca/contacte/" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; font-family: var(--font-sans); font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid var(--ink-900); background: transparent; color: var(--ink-900); text-decoration: none;">Iniciar col·laboració <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>
</article>
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 30px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-accent);">Protocol B — Asseguradores</div>
<h3 itemprop="name" style="font-family: var(--font-serif); font-size: var(--fs-h2); font-weight: 400; color: var(--text-strong); margin: 10px 0 0;">Per a asseguradores i reasseguradores</h3>
<ul style="list-style: none; margin: 20px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px;">
{% for item in ["Valoració de causa, abast i quantia del sinistre","Contraperitatge davant el pèrit de l'assegurat","Col·laboració en sinistres concurrents","Certificació IRD — INESE","Interlocució directa amb direcció de sinistres"] %}
<li style="display: flex; gap: 11px; align-items: flex-start; font-size: 0.95rem; color: var(--text-body); line-height: 1.5;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 2px; flex-shrink: 0; display: inline-block;" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>{{ item }}</li>
{% endfor %}
</ul>
<div style="margin-top: 24px;"><a href="/ca/contacte/" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; font-family: var(--font-sans); font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid var(--ink-900); background: transparent; color: var(--ink-900); text-decoration: none;">Iniciar col·laboració <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>
</article>
</div>
</section>

{# ===== TESTIMONIALS B2B ===== #}
<section style="max-width: var(--container-wide); margin: 0 auto; padding: 0 var(--gutter) var(--section-y);">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;"><span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span> § Declaracions</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 0 0 var(--space-10);">Referències B2B</h2>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;" class="site-three">
{% for t in [
  { q: "El seu dictamen va ser la base de tota la nostra estratègia de negociació. Tan clar i ben fonamentat que vam aconseguir acord sense anar a judici.", a: "Soci d'—?rea", r: "Despatx de construcció · Madrid" },
  { q: "Valoro la disponibilitat per ratificar en sala sense demores i el rigor metodològic de l'informe.", a: "Directora de Sinistres", r: "Asseguradora multinacional · Barcelona" },
  { q: "L'informe de due diligence va identificar contingències que no havíem previst. Es va amortitzar moltes vegades.", a: "Director d'Inversions", r: "Family Office · Barcelona" }
] %}
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 26px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<p itemprop="description" style="font-family: var(--font-serif); font-style: italic; font-size: 1.05rem; line-height: 1.55; color: var(--text-strong); margin: 0;">«{{ t.q }}»</p>
<div itemprop="name" style="margin-top: 18px; font-size: 0.85rem; font-weight: 600; color: var(--text-strong);">{{ t.a }}</div>
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-accent); margin-top: 4px;">{{ t.r }}</div>
</article>
{% endfor %}
</div>
</section>

{# ===== BAND CTA ===== #}
<section style="background: var(--surface-tint); border-top: 1px solid var(--oxide-200);">
<div style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter); text-align: center;">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;">Sense compromís</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); color: var(--text-strong); margin: 0;">El teu despatx necessita un pèrit de part acreditat?</h2>
<p style="margin: 14px auto 0; font-size: var(--fs-lede); line-height: var(--lh-lede); color: var(--text-muted); max-width: 50ch;">Informe de viabilitat en 48 hores.</p>
<div style="margin-top: 28px;"><a href="/ca/contacte/" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; font-family: var(--font-sans); font-size: var(--fs-body); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid transparent; background: var(--accent); color: var(--accent-on); text-decoration: none;">Iniciar col·laboració</a></div>
</div>
</section>
