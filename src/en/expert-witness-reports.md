---
layout: layouts/base.njk
title: "Expert Witness Reports for Building and Civil Engineering"
image: "informe-pericial-patologias-barcelona.jpg"
image_alt: "Expert report on building pathologies in Barcelona"
description: "Party-appointed, court-appointed and counter-expert reports. Documentary evidence in accordance with the LEC, drafted by a registered expert witness. Court ratification included."
audience: "pro"
lang: en
eleventyNavigation:
  key: Dictamenes
  order: 2
translations:
  - lang: es
    permalink: /informes-periciales/
  - lang: ca
    permalink: /ca/informes-pericials/
permalink: "/en/expert-witness-reports/"
---
{% set ui = en %}
{% set langPrefix = "/en" %}
{% set heroTitle = "Expert witness reports for<br>building and civil engineering" %}
{% set description = "Eight technical-legal specialities for resolving complex disputes. Scientific and independent methodology, prepared for oral ratification under the LEC." %}

{% include "partials/page-hero.njk" %}

<section itemscope itemtype="https://schema.org/CollectionPage" style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<meta itemprop="name" content="{{ title }}">
<meta itemprop="url" content="{{ metadata.site.url }}/en/expert-witness-reports/">

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px 40px;" class="two-col">

<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Expert Reports
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Informes periciales" %}
    {% set svcName = svc["name_en"] if svc["name_en"] else svc.name %}
    {% set svcDesc = svc["description_en"] if svc["description_en"] else svc.description %}
    {% set svcSlug = svc["path_en"] if svc["path_en"] else svc.path %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ langPrefix + '/expert-witness-reports/' + svcSlug + '/' }}" style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center; border-top: 1px solid var(--border-hairline); padding: 16px 12px; text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem; font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svcName }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">{{ svcDesc }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Pathologies
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Patologías" %}
    {% set svcName = svc["name_en"] if svc["name_en"] else svc.name %}
    {% set svcDesc = svc["description_en"] if svc["description_en"] else svc.description %}
    {% set svcSlug = svc["path_en"] if svc["path_en"] else svc.path %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ langPrefix + '/expert-witness-reports/' + svcSlug + '/' }}" style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center; border-top: 1px solid var(--border-hairline); padding: 16px 12px; text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem; font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svcName }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">{{ svcDesc }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Specialities
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Especialidades" %}
    {% set svcName = svc["name_en"] if svc["name_en"] else svc.name %}
    {% set svcDesc = svc["description_en"] if svc["description_en"] else svc.description %}
    {% set svcSlug = svc["path_en"] if svc["path_en"] else svc.path %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ svc.href if svc.href else (langPrefix + '/expert-witness-reports/' + svcSlug + '/') }}" style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center; border-top: 1px solid var(--border-hairline); padding: 16px 12px; text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem; font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svcName }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">{{ svcDesc }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Engineering
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Ingeniería" %}
    {% set svcName = svc["name_en"] if svc["name_en"] else svc.name %}
    {% set svcDesc = svc["description_en"] if svc["description_en"] else svc.description %}
    {% set svcSlug = svc["path_en"] if svc["path_en"] else svc.path %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ svc.href if svc.href else (langPrefix + '/expert-witness-reports/' + svcSlug + '/') }}" style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center; border-top: 1px solid var(--border-hairline); padding: 16px 12px; text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem; font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svcName }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">{{ svcDesc }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

</div>
</section>

<section style="background: var(--surface-tint); border-top: 1px solid var(--oxide-200);">
<div style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter); text-align: center;">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;">Free consultation</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); color: var(--text-strong); margin: 0;">Can't find your case in the index?</h2>
<p style="margin: 14px auto 0; font-size: var(--fs-lede); line-height: var(--lh-lede); color: var(--text-muted); max-width: 50ch;">Describe it to us and we'll advise you with no obligation.</p>
<div style="margin-top: 28px;"><a href="/en/contact/" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; font-family: var(--font-sans); font-size: var(--fs-body); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid transparent; background: var(--accent); color: var(--accent-on); text-decoration: none;">Enquire about your case</a></div>
</div>
</section>
