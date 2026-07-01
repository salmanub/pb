---
layout: layouts/base.njk
title: "Technical Services for Law Firms and Insurers"
description: "B2B expert collaboration protocol for construction law firms and insurers: feasibility report, cross-examination (LEC art. 347) and major-risk IRD claims."
audience: "pro"
lang: en
eleventyNavigation:
  key: Abogados
  order: 4
translations:
  - lang: es
    permalink: /colaboracion-abogados/
  - lang: ca
    permalink: /ca/collaboracio-advocats/
permalink: "/en/lawyer-collaboration/"
---
{# lawyer-collaboration — Port 1:1 de SitePages.jsx → Abogados() #}
{# ── Microdata Article ── #}
<div itemscope itemtype="https://schema.org/Article" style="display: none;" aria-hidden="true"><meta itemprop="headline" content="{{ title }}"><meta itemprop="description" content="{{ description }}"><meta itemprop="url" content="{{ metadata.site.url }}{{ page.url }}"><div itemprop="author" itemscope itemtype="https://schema.org/Person"><meta itemprop="name" content="{{ metadata.author.name }}"></div><div itemprop="publisher" itemscope itemtype="https://schema.org/Organization"><meta itemprop="name" content="{{ metadata.company.name }}"></div></div>
{% set ui = en %}
{% set langPrefix = "/en" %}
{% set heroTitle = "Technical services for<br>law firms and insurers" %}

{# PageHero (breadcrumb inside container) #}
{% include "partials/page-hero.njk" %}

{# ===== PROTOCOL CARDS (2 columns) ===== #}
<section itemscope itemtype="https://schema.org/CollectionPage" style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<meta itemprop="name" content="B2B collaboration protocols">
<meta itemprop="url" content="{{ metadata.site.url }}/en/lawyer-collaboration/">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="site-two">
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 30px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-accent);">Protocol A — Law Firms</div>
<h3 itemprop="name" style="font-family: var(--font-serif); font-size: var(--fs-h2); font-weight: 400; color: var(--text-strong); margin: 10px 0 0;">For construction law firms</h3>
<ul style="list-style: none; margin: 20px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px;">
{% for item in ["Preliminary technical feasibility report within 48 hours","Fixed fees agreed in writing","Guaranteed courtroom ratification (LEC art. 347) included","Multiple simultaneous proceedings","Periodic progress report to counsel"] %}
<li style="display: flex; gap: 11px; align-items: flex-start; font-size: 0.95rem; color: var(--text-body); line-height: 1.5;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 2px; flex-shrink: 0; display: inline-block;" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>{{ item }}</li>
{% endfor %}
</ul>
<div style="margin-top: 24px;"><a href="/en/contact/" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; font-family: var(--font-sans); font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid var(--ink-900); background: transparent; color: var(--ink-900); text-decoration: none;">Start collaboration <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>
</article>
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 30px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-accent);">Protocol B — Insurers</div>
<h3 itemprop="name" style="font-family: var(--font-serif); font-size: var(--fs-h2); font-weight: 400; color: var(--text-strong); margin: 10px 0 0;">For insurers and reinsurers</h3>
<ul style="list-style: none; margin: 20px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px;">
{% for item in ["Assessment of cause, scope and claim amount","Counter-expertise against the insured's expert","Collaboration on concurrent claims","IRD — INESE certification","Direct liaison with claims management"] %}
<li style="display: flex; gap: 11px; align-items: flex-start; font-size: 0.95rem; color: var(--text-body); line-height: 1.5;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 2px; flex-shrink: 0; display: inline-block;" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>{{ item }}</li>
{% endfor %}
</ul>
<div style="margin-top: 24px;"><a href="/en/contact/" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; font-family: var(--font-sans); font-size: var(--fs-body-sm); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid var(--ink-900); background: transparent; color: var(--ink-900); text-decoration: none;">Start collaboration <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>
</article>
</div>
</section>

{# ===== TESTIMONIALS B2B ===== #}
<section style="max-width: var(--container-wide); margin: 0 auto; padding: 0 var(--gutter) var(--section-y);">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;"><span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span> § Testimonials</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 0 0 var(--space-10);">B2B References</h2>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;" class="site-three">
{% for t in [
  { q: "Their expert report was the foundation of our entire negotiation strategy. So clear and well-founded that we reached settlement without going to trial.", a: "Area Partner", r: "Construction law firm · Madrid" },
  { q: "I value the availability to testify in court without delays and the methodological rigour of the report.", a: "Claims Director", r: "Multinational insurer · Barcelona" },
  { q: "The due diligence report identified contingencies we hadn't foreseen. It paid for itself many times over.", a: "Investment Director", r: "Family Office · Barcelona" }
] %}
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="padding: 26px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); background: var(--surface-card); border-top: 3px solid var(--accent);">
<p itemprop="description" style="font-family: var(--font-serif); font-style: italic; font-size: 1.05rem; line-height: 1.55; color: var(--text-strong); margin: 0;">"{{ t.q }}"</p>
<div itemprop="name" style="margin-top: 18px; font-size: 0.85rem; font-weight: 600; color: var(--text-strong);">{{ t.a }}</div>
<div style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-accent); margin-top: 4px;">{{ t.r }}</div>
</article>
{% endfor %}
</div>
</section>

{# ===== BAND CTA ===== #}
<section style="background: var(--surface-tint); border-top: 1px solid var(--oxide-200);">
<div style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter); text-align: center;">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;">No commitment</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); color: var(--text-strong); margin: 0;">Does your firm need an accredited expert witness?</h2>
<p style="margin: 14px auto 0; font-size: var(--fs-lede); line-height: var(--lh-lede); color: var(--text-muted); max-width: 50ch;">Feasibility report within 48 hours.</p>
<div style="margin-top: 28px;"><a href="/en/contact/" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; font-family: var(--font-sans); font-size: var(--fs-body); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid transparent; background: var(--accent); color: var(--accent-on); text-decoration: none;">Start collaboration</a></div>
</div>
</section>
