---
layout: 'layouts/contact.njk'
title: 'Contacte | Pèrit a Barcelona'
description: "Contacta amb el teu pèrit de confiança a Barcelona. Resposta garantida en menys de 24 hores per a casos de construcció, assegurances i peritatges judicials."
permalink: /ca/contacte/
lang: ca
translations:
  - lang: es
    permalink: /contacto/
  - lang: en
    permalink: /en/contact/
eleventyNavigation:
  key: "Contacte"
  title: "Contacte"
  notshow: false
  order: 6
  icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>

contact:
    title: "PARLEM<strong class='block text-cyan-400 mt-4'>DEL TEU CAS</strong>"
    intro: "Si tens un problema relacionat amb defectes de construcció o una disputa amb la teva assegurança, som aquí per ajudar-te. Explica'ns el teu cas i t'oferirem una primera valoració sense compromís en menys de 24 hores."
    
    direct_contact:
        title: "Contacte Directe"
        phone: "+34 93 XXX XX XX"
        phone_hours: "Dilluns a Divendres: 9:00 - 19:00"
        email: "info@perito.barcelona"
        email_response: "Responem en < 24h laborables"
        location: "Barcelona i Àrea Metropolitana"
    
    form:
        title: "Formulari de Contacte"
        fields:
            - label: "Nom complet"
              type: "text"
              required: true
              placeholder: "El teu nom i cognoms"
              
            - label: "Correu electrònic"
              type: "email"
              required: true
              placeholder: "el-teu@correu.com"
              
            - label: "Telèfon"
              type: "tel"
              required: false
              placeholder: "El teu número de telèfon (opcional)"
              
            - label: "Tipus de servei"
              type: "select"
              required: false
              options:
                - "Defectes Construcció"
                - "Humitats i Esquerdes"
                - "Problema amb Assegurança"
                - "Contraperitatge"
                - "Consulta General"
                - "Altre"
                
            - label: "Missatge"
              type: "textarea"
              required: true
              placeholder: "Explica'ns breument el teu cas"
        
        submit_text: "Enviar Consulta"
        privacy_text: "He llegit i accepto la Política de Privacitat"
        success_message: "Gràcies! Hem rebut el teu missatge. Ens posarem en contacte amb tu en menys de 24 hores laborables."
    
    cta:
        text: "Prefereixes parlar directament?"
        phone_label: "Truca'ns ara al"

    map:
        show: true
        coordinates:
            lat: 41.3851
            lng: 2.1734
        zoom: 12
---
