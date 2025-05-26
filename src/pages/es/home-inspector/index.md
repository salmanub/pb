---
layout: "layouts/service-semi-pillar-v2.njk"
title: "Home Inspector Profesional en Barcelona: Proteja Su Inversión"
subtitle: "Inspecciones técnicas detalladas pre-compra y pre-venta para pisos y casas. Descubra el estado real de su futura vivienda ANTES de firmar."
metaDescription: "Servicio profesional de Home Inspector en Barcelona. Inspecciones técnicas detalladas pre-compra y pre-venta de viviendas. Evite sorpresas y proteja su inversión inmobiliaria."
permalink: "/home-inspector/"
lang: es
translations:
  - lang: ca
    permalink: /ca/home-inspector/
  - lang: en
    permalink: /en/home-inspector/
eleventyNavigation:
  key: "Home Inspector"
  title: "Home Inspector"
  parent: "Servicios"
  services: true
  notshow: false
  order: 2
# Hero Section
hero:
  image: "/assets/images/home-inspector-barcelona-hero.avif"
  imageAlt: "Home Inspector realizando una inspección detallada en Barcelona"
  socialProof: "Más de 500 inspecciones realizadas"
  rating: 5
  cta:
    primary: "Solicitar Inspección Ahora"
    primaryUrl: "/contacto/"
    secondary: "Ver Proceso de Inspección"
    secondaryUrl: "#proceso"

# Key Benefits Section
keyBenefits:
  title: "¿Por Qué una Inspección de Vivienda en Barcelona es Esencial?"
  benefits:
    - title: "Detecte Vicios Ocultos"
      description: "Identificamos defectos graves que podrían no ser evidentes"
      icon: "search"
    - title: "Negocie con Fundamento"
      description: "Base técnica sólida para negociar el precio"
      icon: "calculator"
    - title: "Evite Sobrecostes"
      description: "Prevenga gastos imprevistos de reparación"
      icon: "shield"
    - title: "Compre Tranquilo"
      description: "Tome decisiones informadas y seguras"
      icon: "check-circle"

# Inspection Details
inspectionDetails:
  title: "¿Qué Revisamos Detalladamente?"
  description: "Inspección exhaustiva de todos los elementos clave:"
  systems:
    - title: "Estructura y Cimentación"
      description: "Signos de asientos, grietas visibles en muros, forjados y elementos portantes."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>'
    - title: "Cubiertas y Tejados"
      description: "Estado de tejas/impermeabilización, canalones, posibles filtraciones desde cubierta."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7m14-4v10a1 1 0 01-1 1h-3"/></svg>' # Icono Tejado
    - title: "Fachadas y Revestimientos Exteriores"
      description: "Fisuras, humedades, desprendimientos, estado de juntas y carpinterías exteriores."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H3m4 0V7m4 14V7m4 14V7m4-14h2m-2 14h2"/></svg>' # Icono Fachada
    - title: "Instalaciones de Fontanería y Saneamiento"
      description: "Estado de tuberías visibles, grifería, sanitarios, posibles fugas, evacuación de aguas."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.966A10.72 10.72 0 013 8c0-3.866 3.582-7 8-7s8 3.134 8 7c0 1.763-.607 3.41-1.617 4.74L18 17.5V21h-2.121l-1.01-1.01-.001.002zM12 8v2m0 4h.01"/></svg>' # Icono Fontaneria
    - title: "Instalación Eléctrica"
      description: "Cuadro general, estado de cableado visible, interruptores, enchufes, seguridad."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' # Icono Electricidad
    - title: "Sistemas de Climatización (Calefacción/AACC)"
      description: "Funcionamiento básico, estado de conservación de equipos visibles, distribución."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M12 3v1m0 16v1m8-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/></svg>' # Icono Clima
    - title: "Detección de Humedades y Ventilación"
      description: "Búsqueda de manchas, moho, condensaciones, evaluación de la ventilación general."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a2 2 0 0 0 2-2c0-1.11-.89-2-2-2 -1.11 0-2 .89-2 2 0 1.11.89 2 2 2Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v2M12 14v2M16 12h-2M12 16v2M8 12h2"/></svg>' # Icono Humedad
    - title: "Acabados Interiores y Carpinterías"
      description: "Estado de suelos, paredes, techos, puertas, ventanas, posibles defectos."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.491 5.509a.999.999 0 011.414 0l.001.001a.999.999 0 010 1.414l-14 14a.999.999 0 01-1.414 0l-.001-.001a.999.999 0 010-1.414l14-14zm-14 0l14 14m-10-6a2 2 0 11-4 0 2 2 0 014 0z"/></svg>' # Icono Acabados
    - title: "Identificación de Posibles Vicios Ocultos"
      description: "Búsqueda de indicios de problemas no evidentes a primera vista."
      iconBgColor: "bg-indigo-500/10"
      iconTextColor: "text-indigo-600"
      iconSvg: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>' # Icono Busqueda
  outroText: |
    Si durante la inspección se detectan problemas que requieren un análisis más profundo, le asesoraremos sobre la necesidad de <a href="/construccion/" class="text-indigo-600 hover:underline font-medium">informes periciales de construcción</a> específicos.

# Sección Proceso y El Informe
process:
  title: "Nuestro Proceso de Inspección Transparente"
  steps:
    - title: "Contacto Inicial y Presupuesto"
      description: "Nos cuenta sus necesidades y le proporcionamos un presupuesto detallado."
    - title: "Coordinación de la Visita"
      description: "Agendamos la inspección en el momento más conveniente."
    - title: "Inspección Exhaustiva"
      description: "Realizamos una revisión visual minuciosa de todos los elementos acordados, tomando notas y fotografías. Utilizamos herramientas como medidores de humedad y cámaras térmicas cuando es necesario."
    - title: "Análisis de la Información"
      description: "Procesamos todos los datos recopilados."
    - title: "Redacción del Informe Técnico"
      description: "Elaboramos un informe claro, detallado y fácil de entender."
    - title: "Entrega y Aclaraciones"
      description: "Le entregamos el informe y resolvemos cualquier duda que pueda tener."
  secondaryContentTitle: "Contenido del Informe de Home Inspector"
  secondaryContent: |
    <div class="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl shadow-sm">
      <h3 class="text-xl font-semibold text-slate-800 mb-4">Su informe de inspección incluirá:</h3>
      <ul class="space-y-3">
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-slate-700">Evaluación de estructura y cimentación</span>
        </li>
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-slate-700">Análisis de instalaciones (fontanería, electricidad, clima)</span>
        </li>
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-slate-700">Detección de humedades y problemas de ventilación</span>
        </li>
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-slate-700">Reportaje fotográfico completo</span>
        </li>
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-slate-700">Identificación de vicios ocultos</span>
        </li>
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-slate-700">Recomendaciones y presupuesto estimado</span>
        </li>
      </ul>
    </div>

# Sección Por Qué Elegirnos
whyChooseUs:
  title: "Ventajas de Elegirme como su Home Inspector en Barcelona"
  benefits:
    - title: "Experiencia como Ingeniero"
      description: "Mi formación y experiencia en ingeniería de obras públicas aportan una visión técnica profunda para detectar problemas estructurales y constructivos."
      iconBgColor: "bg-white/20"
      iconTextColor: "text-white"
      iconSvg: '<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>' # Icono Ingeniero/Construcción
    - title: "Objetividad e Independencia"
      description: "No estamos vinculados a agencias inmobiliarias ni empresas de reformas. Nuestro único interés es proporcionarle información veraz."
      iconBgColor: "bg-white/20"
      iconTextColor: "text-white"
      iconSvg: '<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m0-4l2 2m-2-2l-2 2m-2-2l2 2m7-2l2 2M5 12h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>' # Icono Balanza/Objetividad
    - title: "Informes Claros y Detallados"
      description: "Le entregamos un informe fácil de entender, con fotografías y explicaciones precisas, para que tome la mejor decisión."
      iconBgColor: "bg-white/20"
      iconTextColor: "text-white"
      iconSvg: '<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>' # Icono Documento/Informe

# Sección CTA Final
finalCTA:
  title: "¿Listo para Conocer el Estado Real de su Futura Vivienda?"
  description: "Proteja su inversión con una inspección profesional"
  button: "Solicitar Inspección"
  buttonUrl: "/contacto/?servicio=home-inspector"

# FAQ Section
faq:
  title: "Preguntas Frecuentes sobre Home Inspection"
  questions:
    - question: "¿Cuánto dura una inspección?"
      answer: "Una inspección típica dura entre 2-3 horas, dependiendo del tamaño y características de la vivienda."
    - question: "¿Puedo asistir a la inspección?"
      answer: "Sí, de hecho lo recomendamos. Podrá ver de primera mano el estado de la vivienda y hacer preguntas."
    - question: "¿Qué diferencia hay con una tasación?"
      answer: "Una tasación determina el valor económico, mientras que nuestra inspección evalúa el estado técnico y detecta problemas potenciales."

# Testimonials
testimonials:
  - quote: "La inspección nos ahorró más de 15.000€ en reparaciones que habríamos tenido que asumir."
    author: "María García"
    role: "Compradora en L'Eixample"
  - quote: "Informe detallado y muy profesional. Nos dio la tranquilidad que necesitábamos para comprar."
    author: "Juan Martínez"
    role: "Comprador en Gràcia"

# What Is Section
whatIs:
  title: "¿Qué es un Home Inspector en Barcelona?"
  content: |
    Un <strong>Home Inspector en Barcelona</strong> es un profesional especializado que realiza una <strong>evaluación técnica exhaustiva</strong> del estado de conservación de una vivienda. A través de una inspección visual no invasiva, nuestro objetivo es identificar <strong>defectos existentes, problemas potenciales y vicios ocultos</strong> que podrían suponer costes inesperados o afectar a su seguridad y confort durante la compra o venta de su propiedad.
    
    La contratación de un <strong>servicio de Home Inspector en Barcelona</strong> antes de una transacción inmobiliaria es crucial para:
  benefits:
    - "Conocer el estado real de la propiedad antes de comprar"
    - "Identificar reparaciones necesarias y estimar costes con precisión"
    - "Obtener argumentos técnicos sólidos para negociar el precio"
    - "Prevenir sorpresas desagradables y sobrecostes tras la firma"
    - "Tomar decisiones informadas y seguras en su inversión inmobiliaria"
  image:
    src: "/assets/images/home-inspector-barcelona-640.avif"
    alt: "Home Inspector profesional realizando una inspección técnica de vivienda en Barcelona"
    title: "Inspección técnica profesional de vivienda en Barcelona"
    width: 800
    height: 600
    caption: "Nuestro Home Inspector realizando una evaluación técnica detallada en Barcelona"

---