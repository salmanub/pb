---
layout: 'layouts/contact.njk'
title: 'Contact | Perito Barcelona'
description: "Contact your trusted expert in Barcelona. Guaranteed response in less than 24 hours for construction, insurance and judicial expertise cases that need technical expert reports."
permalink: /en/contact/
lang: en
translations:
  - lang: es
    permalink: /contacto/
  - lang: ca
    permalink: /ca/contacte/
eleventyNavigation:
  key: "Contact"
  title: "Contact"
  notshow: false
  order: 6
  icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>

contact:
    title: "LET'S TALK ABOUT<strong class='block text-cyan-400 mt-4'>YOUR CASE</strong>"
    intro: "If you have a problem related to construction defects or a dispute with your insurance, we are here to help. Tell us about your case and we'll offer you a first assessment without commitment in less than 24 hours."
    
    direct_contact:
        title: "Direct Contact"
        phone: "+34 93 XXX XX XX"
        phone_hours: "Monday to Friday: 9:00 - 19:00"
        email: "info@perito.barcelona"
        email_response: "We respond in < 24 business hours"
        location: "Barcelona and Metropolitan Area"
    
    form:
        title: "Contact Form"
        fields:
            - label: "Full name"
              type: "text"
              required: true
              placeholder: "Your name and surname"
              
            - label: "Email"
              type: "email"
              required: true
              placeholder: "your@email.com"
              
            - label: "Phone"
              type: "tel"
              required: false
              placeholder: "Your phone number (optional)"
              
            - label: "Type of service"
              type: "select"
              required: false
              options:
                - "Construction Defects"
                - "Dampness and Cracks"
                - "Insurance Issue"
                - "Counter-expertise"
                - "General Enquiry"
                - "Other"
                
            - label: "Message"
              type: "textarea"
              required: true
              placeholder: "Briefly explain your case"
        
        submit_text: "Send Enquiry"
        privacy_text: "I have read and accept the Privacy Policy"
        success_message: "Thank you! We have received your message. We will contact you within 24 business hours."
    
    cta:
        text: "Prefer to speak directly?"
        phone_label: "Call us now on"

    map:
        show: true
        coordinates:
            lat: 41.3851
            lng: 2.1734
        zoom: 12
---
