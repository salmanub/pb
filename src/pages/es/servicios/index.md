---
layout: layouts/base.njk
title: Servicios
permalink: /servicios/
lang: es
translations:
  - lang: ca
    permalink: /ca/serveis/
  - lang: en
    permalink: /en/services/
eleventyNavigation:
  key: Servicios
  title: Servicios
  order: 2
  hasChildren: true
  childrenType: services
  notshow: false
metaDescription: "Servicios profesionales de peritaje en Barcelona: construcción, inspecciones técnicas, peritajes judiciales y seguros. Informes técnicos detallados y certificados."
intro:
  title: "Servicios Profesionales de Peritaje en Barcelona"
  description: "Soluciones técnicas especializadas y certificadas para particulares, empresas y profesionales del sector legal."

featuredServices:
  - title: "Peritajes de Construcción"
    description: "Informes técnicos detallados sobre patologías, defectos constructivos y valoración de daños."
    url: "/construccion/"
    icon: "building"
    featured: true
  
  - title: "Home Inspector Barcelona"
    description: "Inspecciones exhaustivas pre-compra para proteger su inversión inmobiliaria."
    url: "/home-inspector/"
    icon: "search"
    highlight: true

  - title: "Peritajes de Seguros"
    description: "Valoración independiente de daños para siniestros y reclamaciones a aseguradoras."
    url: "/seguros/"
    icon: "shield"
    featured: true

  - title: "Peritajes Judiciales"
    description: "Informes periciales con validez legal para procedimientos judiciales."
    url: "/judicial/"
    icon: "gavel"
    featured: true

specializedServices:
  title: "Servicios Especializados"
  services:
    - title: "Naves Industriales"
      description: "Peritajes técnicos para espacios industriales y logísticos."
      url: "/construccion/peritajes-naves-industriales/"
      
    - title: "Obra Civil"
      description: "Informes técnicos especializados en infraestructuras y obra pública."
      url: "/construccion/informes-tecnicos-obra-civil/"
      
    - title: "Comunidades de Propietarios"
      description: "Soluciones para problemas técnicos en edificios residenciales."
      url: "/construccion/informes-comunidades-propietarios/"

guarantees:
  - title: "Independencia"
    description: "Informes imparciales y objetivos"
  - title: "Experiencia"
    description: "Más de 15 años en el sector"
  - title: "Calidad"
    description: "Metodología certificada"
  - title: "Confianza"
    description: "Más de 500 clientes satisfechos"

cta:
  title: "¿Necesita un Perito en Barcelona?"
  description: "Solicite presupuesto sin compromiso para su caso específico"
  button: "Contactar Ahora"
  url: "/contacto/"
---

<section class="prose prose-lg max-w-3xl mx-auto mt-12">
  <h1>{{ intro.title }}</h1>
  <p class="lead">{{ intro.description }}</p>

  <div class="grid md:grid-cols-2 gap-8 my-12">
    {% for service in featuredServices %}
    <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
      <h2 class="text-xl font-bold mb-4">{{ service.title }}</h2>
      <p>{{ service.description }}</p>
      <a href="{{ service.url }}" class="text-cyan-600 font-medium hover:underline">Saber más →</a>
    </div>
    {% endfor %}
  </div>

  <h2>{{ specializedServices.title }}</h2>
  <div class="grid md:grid-cols-3 gap-6">
    {% for service in specializedServices.services %}
    <div class="bg-slate-50 p-4 rounded-lg">
      <h3 class="font-bold mb-2">{{ service.title }}</h3>
      <p class="text-sm">{{ service.description }}</p>
      <a href="{{ service.url }}" class="text-cyan-600 text-sm font-medium hover:underline">Ver servicio →</a>
    </div>
    {% endfor %}
  </div>

  <div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-2xl my-12">
    <h2 class="text-2xl font-bold mb-6">{{ cta.title }}</h2>
    <p class="mb-6">{{ cta.description }}</p>
    <a href="{{ cta.url }}" class="inline-block bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">
      {{ cta.button }}
    </a>
  </div>
</section>

