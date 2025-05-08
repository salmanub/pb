---
layout: 'layouts/contact.njk'
title: 'Contacto | Perito en Barcelona'
description: "Contacta con tu perito de confianza en Barcelona. Respuesta garantizada en menos de 24 horas para casos de construcción, seguros y peritajes judiciales."
permalink: /contacto/
lang: es
translations:
  - lang: ca
    permalink: /ca/contacte/
  - lang: en
    permalink: /en/contact/
eleventyNavigation:
  key: "Contacto"
  title: "Contacto"
  notshow: false
  order: 1
  icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>

# Contact Page Content
contact:
    title: "Hablemos de tu caso"
    intro: "Si tienes un problema relacionado con defectos de construcción o una disputa con tu seguro, estamos aquí para ayudarte. Cuéntanos tu caso y te ofreceremos una primera valoración sin compromiso en menos de 24 horas."
    
    # Información de contacto directo
    direct_contact:
        phone: "+34 93 XXX XX XX"
        phone_hours: "Lunes a Viernes: 9:00 - 19:00"
        email: "info@perito.barcelona"
        email_response: "Respondemos en < 24h laborables"
        location: "Barcelona y Área Metropolitana"
    
    # Formulario de contacto
    form:
        title: "Formulario de Contacto"
        fields:
            - label: "Nombre completo"
              type: "text"
              required: true
              placeholder: "Tu nombre y apellidos"
              
            - label: "Email"
              type: "email"
              required: true
              placeholder: "tu@email.com"
              
            - label: "Teléfono"
              type: "tel"
              required: false
              placeholder: "Tu número de teléfono (opcional)"
              
            - label: "Tipo de servicio"
              type: "select"
              required: false
              options:
                - "Defectos Construcción"
                - "Humedades y Grietas"
                - "Problema con Seguro"
                - "Contraperitaje"
                - "Consulta General"
                - "Otro"
                
            - label: "Mensaje"
              type: "textarea"
              required: true
              placeholder: "Cuéntanos brevemente tu caso"
        
        submit_text: "Enviar Consulta"
        privacy_text: "He leído y acepto la Política de Privacidad"
        success_message: "¡Gracias! Hemos recibido tu mensaje. Nos pondremos en contacto contigo en menos de 24 horas laborables."
    
    # Sección adicional
    cta:
        text: "¿Prefieres hablar directamente?"
        phone_label: "Llámanos ahora al"

    # Mapa (opcional)
    map:
        show: true
        coordinates:
            lat: 41.3851
            lng: 2.1734
        zoom: 12
---
