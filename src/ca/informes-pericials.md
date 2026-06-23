---
layout: layouts/base.njk
title: "Informes Pericials d'Edificació i Obra Civil"
image: "informe-pericial-patologias-barcelona.jpg"
image_alt: "Informe pericial de patologies a Barcelona"
description: "Dictàmens pericials de part, judicials i contrainformes. Prova documental conforme a la LEC, redactada per perit de part col·legiat. Ratificació en sala inclosa."
audience: "pro"
lang: ca
eleventyNavigation:
  key: Dictamenes
  order: 2
translations:
  - lang: es
    permalink: /informes-periciales/
  - lang: en
    permalink: /en/expert-witness-reports/
permalink: "/ca/informes-pericials/"
breadcrumb:
  - label: "Inici"
    url: "/"
  - label: "Dictàmens"
---
{% set ui = ca %}
{% set langPrefix = "/ca" %}
{% set heroTitle = "Informes pericials d'<br>edificació i obra civil" %}
{% set description = "Vuit especialitats tècnic-legals per a la resolució de disputes complexes. Metodologia científica i independent, preparada per a ratificació oral conforme a la LEC." %}

{% include "partials/page-hero.njk" %}

<section itemscope itemtype="https://schema.org/CollectionPage" style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<meta itemprop="name" content="{{ title }}">
<meta itemprop="description" content="Onze especialitats tècnic-legals per a la resolució de disputes complexes.">
<meta itemprop="url" content="{{ metadata.site.url }}/ca/informes-pericials/">

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px 40px;" class="two-col">

<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Informes pericials
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Informes periciales" %}
    {% set svcName = svc["name_ca"] if svc["name_ca"] else svc.name %}
    {% set svcDesc = svc["description_ca"] if svc["description_ca"] else svc.description %}
    {% set svcSlug = svc["path_ca"] if svc["path_ca"] else svc.path %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ langPrefix + '/informes-pericials/' + svcSlug + '/' }}" style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center; border-top: 1px solid var(--border-hairline); padding: 16px 12px; text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem; font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svcName }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">{{ svcDesc }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    <meta itemprop="description" content="{{ svcDesc }}">
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Patologies
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Patologías" %}
    {% set svcName = svc["name_ca"] if svc["name_ca"] else svc.name %}
    {% set svcDesc = svc["description_ca"] if svc["description_ca"] else svc.description %}
    {% set svcSlug = svc["path_ca"] if svc["path_ca"] else svc.path %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ langPrefix + '/informes-pericials/' + svcSlug + '/' }}" style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center; border-top: 1px solid var(--border-hairline); padding: 16px 12px; text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem; font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svcName }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">{{ svcDesc }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    <meta itemprop="description" content="{{ svcDesc }}">
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Especialitats
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Especialidades" %}
    {% set svcName = svc["name_ca"] if svc["name_ca"] else svc.name %}
    {% set svcDesc = svc["description_ca"] if svc["description_ca"] else svc.description %}
    {% set svcSlug = svc["path_ca"] if svc["path_ca"] else svc.path %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ svc.href if svc.href else (langPrefix + '/informes-pericials/' + svcSlug + '/' ) }}" style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center; border-top: 1px solid var(--border-hairline); padding: 16px 12px; text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem; font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svcName }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">{{ svcDesc }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    <meta itemprop="description" content="{{ svcDesc }}">
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Enginyeria
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Ingeniería" %}
    {% set svcName = svc["name_ca"] if svc["name_ca"] else svc.name %}
    {% set svcDesc = svc["description_ca"] if svc["description_ca"] else svc.description %}
    {% set svcSlug = svc["path_ca"] if svc["path_ca"] else svc.path %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ svc.href if svc.href else (langPrefix + '/informes-pericials/' + svcSlug + '/') }}" style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center; border-top: 1px solid var(--border-hairline); padding: 16px 12px; text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem; font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svcName }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">{{ svcDesc }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    <meta itemprop="description" content="{{ svcDesc }}">
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

</div>
</section>

<section style="background: var(--surface-tint); border-top: 1px solid var(--oxide-200);">
<div style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter); text-align: center;">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;">Sense cost</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); color: var(--text-strong); margin: 0;">No identifiques el teu cas a l'índex?</h2>
<p style="margin: 14px auto 0; font-size: var(--fs-lede); line-height: var(--lh-lede); color: var(--text-muted); max-width: 50ch;">Descriu-nos-el i t'orientem sense compromís.</p>
<div style="margin-top: 28px;"><a href="/ca/contacte/" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; font-family: var(--font-sans); font-size: var(--fs-body); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid transparent; background: var(--accent); color: var(--accent-on); text-decoration: none;">Consultar cas</a></div>
</div>
</section>
