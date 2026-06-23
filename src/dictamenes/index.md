---
layout: layouts/base.njk
title: "Informes Periciales de Edificación y Obra Civil"
image: "informe-pericial-patologias-barcelona.jpg"
image_alt: "Informe pericial de patologías en Barcelona"
description: "Dictámenes periciales de parte, judiciales y contrainformes. Prueba documental conforme a la LEC, redactada por perito de parte colegiado. Ratificación en sala incluida."
audience: "pro"
lang: es
eleventyNavigation:
  key: Dictamenes
  order: 2
translations:
  - lang: ca
    permalink: /ca/informes-pericials/
  - lang: en
    permalink: /en/expert-witness-reports/
permalink: "/informes-periciales/"
---
{# informes-periciales/index — Port 1:1 de SitePages.jsx → Informes() L48-57 #}
{# Microdata: CollectionPage + each service = Article #}
{% set ui = es %}
{% set langPrefix = "" if not lang or lang == "es" else ("/" + lang) %}
{% set heroTitle = "Informes periciales de<br>edificación y obra civil" %}
{% set description = "Ocho especialidades técnico-legales para la resolución de disputas complejas. Metodología científica e independiente, preparada para ratificación oral conforme a la LEC." %}

{# PageHero #}
{% include "partials/page-hero.njk" %}

{# ===== SERVICE LIST — Card grid layout ===== #}
<section itemscope itemtype="https://schema.org/CollectionPage" style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter);">
<meta itemprop="name" content="{{ title }}">
<meta itemprop="description" content="Once especialidades técnico-legales para la resolución de disputas complejas.">
<meta itemprop="url" content="{{ metadata.site.url }}/informes-periciales/">

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px 40px;" class="two-col">

{# ── Group: Informes periciales ── #}
<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono);
              font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label);
              text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Informes periciales
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Informes periciales" %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ svc.href if svc.href else (langPrefix + '/informes-periciales/' + svc.path + '/') }}"
       style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center;
              border-top: 1px solid var(--border-hairline); padding: 16px 12px;
              text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem;
              font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svc.name }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted);
              line-height: 1.35;">{{ svc.description }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)"
           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
    <meta itemprop="description" content="{{ svc.description }}">
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

{# ── Group: Patologías ── #}
<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono);
              font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label);
              text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Patologías
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Patologías" %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ svc.href if svc.href else (langPrefix + '/informes-periciales/' + svc.path + '/') }}"
       style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center;
              border-top: 1px solid var(--border-hairline); padding: 16px 12px;
              text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem;
              font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svc.name }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted);
              line-height: 1.35;">{{ svc.description }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)"
           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
    <meta itemprop="description" content="{{ svc.description }}">
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

{# ── Group: Especialidades ── #}
<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono);
              font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label);
              text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Especialidades
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Especialidades" %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ svc.href if svc.href else (langPrefix + '/informes-periciales/' + svc.path + '/') }}"
       style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center;
              border-top: 1px solid var(--border-hairline); padding: 16px 12px;
              text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem;
              font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svc.name }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted);
              line-height: 1.35;">{{ svc.description }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)"
           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
    <meta itemprop="description" content="{{ svc.description }}">
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

{# ── Group: Ingeniería ── #}
<div>
  <div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono);
              font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label);
              text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 16px;">
    <span style="width: 24px; height: 1.5px; background: var(--accent); display: inline-block;"></span>
    Ingeniería
  </div>
  <div style="display: flex; flex-direction: column; gap: 0;">
    {% for svc in metadata.services %}{% if svc.cat == "Ingeniería" %}
    <article itemprop="hasPart" itemscope itemtype="https://schema.org/Article" style="display: contents;">
    <a itemprop="url" href="{{ svc.href if svc.href else (langPrefix + '/informes-periciales/' + svc.path + '/') }}"
       style="display: grid; grid-template-columns: 1fr 24px; gap: 14px; align-items: center;
              border-top: 1px solid var(--border-hairline); padding: 16px 12px;
              text-decoration: none; color: inherit;" class="svc-row">
      <div>
        <span itemprop="name" style="display: block; font-family: var(--font-serif); font-size: 1.05rem;
              font-weight: 400; color: var(--text-strong); line-height: 1.2;">{{ svc.name }}</span>
        <span style="display: block; margin-top: 3px; font-size: 0.78rem; color: var(--text-muted);
              line-height: 1.35;">{{ svc.description }}</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)"
           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
    <meta itemprop="description" content="{{ svc.description }}">
    </article>
    {% endif %}{% endfor %}
  </div>
</div>

</div>
</section>

{# ===== BAND CTA — DS L55 ===== #}
<section style="background: var(--surface-tint); border-top: 1px solid var(--oxide-200);">
<div style="max-width: var(--container-wide); margin: 0 auto; padding: var(--section-y) var(--gutter); text-align: center;">
<div style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: var(--fs-mono-label); letter-spacing: var(--tracking-label); text-transform: uppercase; font-weight: var(--fw-medium); color: var(--text-accent); margin-bottom: 18px;">Sin coste</div>
<h2 style="font-family: var(--font-serif); font-size: var(--fs-h1); font-weight: 400; line-height: var(--lh-display); color: var(--text-strong); margin: 0;">¿No identificas tu caso en el índice?</h2>
<p style="margin: 14px auto 0; font-size: var(--fs-lede); line-height: var(--lh-lede); color: var(--text-muted); max-width: 50ch;">Descríbenoslo y te orientamos sin compromiso.</p>
<div style="margin-top: 28px;"><a href="/contacto/profesional/" style="display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; font-family: var(--font-sans); font-size: var(--fs-body); font-weight: var(--fw-semibold); line-height: 1; border-radius: var(--radius-sm); border: 1.5px solid transparent; background: var(--accent); color: var(--accent-on); text-decoration: none;">Consultar caso</a></div>
</div>
</section>
