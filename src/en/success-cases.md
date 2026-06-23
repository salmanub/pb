---
layout: layouts/base.njk
title: "Reference Cases and Reports Issued"
description: "Selection of expert case files in building and civil engineering. Claims resolved, amounts assessed, foundation failures and court rulings. Anonymised data."
audience: "pro"
lang: en
eleventyNavigation:
  key: Casos
  order: 3
translations:
  - lang: es
    permalink: /casos-exito/
  - lang: ca
    permalink: /ca/casos-exit/
permalink: "/en/success-cases/"
breadcrumb:
  - label: "Home"
    url: "/"
  - label: "Cases"
band_eyebrow: "No commitment"
band_title: "Have a similar case?"
band_lede: "Tell us about it and we'll let you know if it has expert potential."
band_cta: "Discuss your case"
---
{# success-cases — EN version #}
{# ── Microdata Article ── #}
<div itemscope itemtype="https://schema.org/Article" style="display: none;" aria-hidden="true"><meta itemprop="headline" content="{{ title }}"><meta itemprop="description" content="{{ description }}"><meta itemprop="url" content="{{ metadata.site.url }}{{ page.url }}"><div itemprop="author" itemscope itemtype="https://schema.org/Person"><meta itemprop="name" content="{{ metadata.author.name }}"></div><div itemprop="publisher" itemscope itemtype="https://schema.org/Organization"><meta itemprop="name" content="{{ metadata.company.name }}"></div></div>
{% set ui = en %}
{% set heroTitle = "High-value expert<br>reports resolved" %}

{# PageHero (breadcrumb inside container) #}
{% include "partials/page-hero.njk" %}

{# Cases Grid — uses shared casos.json data #}
<section itemscope itemtype="https://schema.org/CollectionPage" style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<meta itemprop="name" content="{{ title }}">
<meta itemprop="description" content="{{ description }}">
<meta itemprop="url" content="{{ metadata.site.url }}/en/success-cases/">
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;" class="three-col">
{% for caso in casos.items %}
<article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="border-radius: var(--radius-md); border: 1px solid {{ 'var(--ink-700)' if loop.index % 3 == 2 else 'var(--border-hairline)' }}; background: {{ 'var(--surface-ink)' if loop.index % 3 == 2 else 'var(--surface-card)' }}; padding: 24px;">
<div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;"><span style="font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: {{ 'var(--text-on-dark-muted)' if loop.index % 3 == 2 else 'var(--text-accent)' }}; font-weight: 600;">{{ caso.tag }}</span></div>
<div style="font-family: var(--font-mono); font-size: 2rem; color: {{ 'var(--bone-100)' if loop.index % 3 == 2 else 'var(--text-strong)' }}; margin: 16px 0 0; letter-spacing: -0.01em; font-variant-numeric: tabular-nums;">{{ caso.amount }}</div>
<div itemprop="name" style="margin-top: 10px; font-size: 0.95rem; font-weight: 600; color: {{ 'var(--bone-100)' if loop.index % 3 == 2 else 'var(--text-strong)' }};">{{ caso.t }}</div>
<p itemprop="description" style="margin: 7px 0 0; font-size: 0.85rem; line-height: 1.55; color: {{ 'rgba(241,241,234,0.72)' if loop.index % 3 == 2 else 'var(--text-muted)' }};">{{ caso.d }}</p>
{% if caso.pills %}
<div style="display: flex; gap: 7px; margin-top: 16px; flex-wrap: wrap;">
{%- for pill in caso.pills %}<span style="display: inline-flex; align-items: center; font-family: var(--font-mono); font-weight: var(--fw-medium); letter-spacing: var(--tracking-label); text-transform: uppercase; line-height: 1.2; border-radius: var(--radius-xs); font-size: var(--fs-mono-label); padding: 3px 8px; color: var(--text-muted); border: 1px solid var(--border-hairline); background: transparent;">{{ pill }}</span>{%- endfor %}
</div>
{% endif %}
</article>
{% endfor %}
</div>
</section>

{# BandCTA #}
<section style="background: var(--surface-tint); border-top: 1px solid var(--oxide-200);">
<div style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter); text-align: center;">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;"><span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span> {{ band_eyebrow }}</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 0;">{{ band_title }}</h2>
<p style="margin-top: 14px; font-size: var(--fs-lede); line-height: var(--lh-lede); color: var(--text-muted); max-width: 60ch; margin-left: auto; margin-right: auto;">{{ band_lede }}</p>
<div style="margin-top: 28px;"><a href="/en/contact/" style="display: inline-flex; align-items: center; justify-content: center; padding: 16px 28px; font-family: var(--font-sans); font-size: var(--fs-body); font-weight: var(--fw-semibold); line-height: 1; letter-spacing: 0.005em; border-radius: var(--radius-sm); border: 1.5px solid transparent; background: var(--accent); color: var(--accent-on); text-decoration: none;">{{ band_cta }}</a></div>
</div>
</section>
