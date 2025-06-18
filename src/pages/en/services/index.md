---
layout: "layouts/services-overview.njk"
title: "Expert Technical Services in Barcelona | Professional Technical Reports"
metaDescription: "Expert technical services in Barcelona: construction inspections, Home Inspector, insurance claims and expert witness reports. Detailed technical reports and certifications."
permalink: /en/services/

lang: en
translations:
  - lang: es
    permalink: /servicios/
  - lang: ca
    permalink: /ca/serveis/

eleventyNavigation:
  key: "Services"
  title: "Services"
  notshow: false
  order: 2

hero:
  title: "Our Technical Expertise Areas"
  description: "From detailed inspection of your future home to resolving complex construction disputes or defending your rights against insurance companies, we provide technical rigor and experience."
  cta:
    text: "Discuss Your Case"
    url: "/en/contact/"

servicesSection:
  title: "Main Services"
  description: "Specialized technical solutions for every need"
  services:
    - title: "Construction & Technical Inspection"
      description: "Comprehensive analysis of <strong>building pathologies, construction defects, structural problems and hidden defects</strong> in all types of buildings."
      icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>'
      iconBgColor: "bg-cyan-500/10"
      iconTextColor: "text-cyan-600"
      url: "/en/construction/"
      ctaText: "Explore Construction Reports →"
      ctaBgColor: "bg-cyan-500"
      ctaHoverBgColor: "hover:bg-cyan-600"

    - title: "Home Inspector Services"
      description: "Detailed technical reports for <strong>pre-purchase and pre-sale property inspections in Barcelona</strong>."
      icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      url: "/en/home-inspector/"
      ctaText: "Home Inspector Services →"
      ctaBgColor: "bg-indigo-500"
      ctaHoverBgColor: "hover:bg-indigo-600"

    - title: "Insurance Claims Expert"
      description: "Defense of policyholder rights. <strong>Counter-assessments, damage valuations</strong> and claims."
      icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
      iconBgColor: "bg-emerald-500/10"
      iconTextColor: "text-emerald-600"
      url: "/en/insurance/"
      ctaText: "Insurance Expert Services →"
      ctaBgColor: "bg-emerald-500"
      ctaHoverBgColor: "hover:bg-emerald-600"

    - title: "Expert Witness Services"
      description: "Preparation of expert reports and court testimony for <strong>legal proceedings</strong>."
      icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      iconBgColor: "bg-amber-500/10"
      iconTextColor: "text-amber-600"
      url: "/en/expert-witness/"
      ctaText: "Expert Witness Services →"
      ctaBgColor: "bg-amber-500"
      ctaHoverBgColor: "hover:bg-amber-600"

processSection:
  title: "Our Process"
  description: "Clear and transparent methodology for each service"
  steps:
    - title: "Initial Consultation"
      description: "We evaluate your case and specific needs."
      icon: "📞"
    - title: "Custom Proposal"
      description: "We develop a detailed action plan and quote."
      icon: "📝"
    - title: "Service Execution"
      description: "We perform the inspection or assessment to the highest standards."
      icon: "🔍"
    - title: "Report Delivery"
      description: "We present a detailed and clear technical report."
      icon: "📊"
    - title: "Follow-up Support"
      description: "We provide post-service guidance and support."
      icon: "📞"

finalCta:
  title: "Need an Expert Technical Inspector in Barcelona?"
  description: "Contact us to discuss your specific case"
  buttonText: "Request Quote"
  url: "/en/contact/"
---

<section class="prose prose-lg max-w-3xl mx-auto mt-12">
  <h1>{{ intro.title }}</h1>
  <p class="lead">{{ intro.description }}</p>

  <div class="grid md:grid-cols-2 gap-8 my-12">
    {% for service in featuredServices %}
    <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
      <h2 class="text-xl font-bold mb-4">{{ service.title }}</h2>
      <p>{{ service.description }}</p>
      <a href="{{ service.url }}" class="text-cyan-600 font-medium hover:underline">Learn more →</a>
    </div>
    {% endfor %}
  </div>

  <h2>{{ specializedServices.title }}</h2>
  <div class="grid md:grid-cols-3 gap-6">
    {% for service in specializedServices.services %}
    <div class="bg-slate-50 p-4 rounded-lg">
      <h3 class="font-bold mb-2">{{ service.title }}</h3>
      <p class="text-sm">{{ service.description }}</p>
      <a href="{{ service.url }}" class="text-cyan-600 text-sm font-medium hover:underline">View service →</a>
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
