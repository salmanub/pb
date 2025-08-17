---
layout: 'layouts/contact.njk'
title: 'Contacto | Peritos Ingenieros en Barcelona'
description: "Contacte con nuestro despacho de peritos ingenieros en Barcelona para una evaluación de su caso. Ofrecemos una primera valoración sin compromiso para informes, auditorías y asesoramiento."
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
  order: 5 # Recomiendo ponerlo antes de Blog si lo tienes.
  icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>

# Contact Page Content
contact:
    title: "CONTACTE CON<strong class='block text-cyan-400 mt-4'>NUESTRO EQUIPO</strong>"
    intro: "Si necesita un análisis técnico para su caso, ya sea un informe pericial, una auditoría de obra o asesoramiento estructural, estamos aquí para ayudarle. Explíquenos su situación y le ofreceremos una primera valoración sin compromiso."
    
    # Información de contacto directo
    direct_contact:
        title: "Contacto Directo"
        phone: "+34 614 194 985"
        phone_hours: "Lunes a Viernes: 9:00 - 19:00"
        email: "info@perito.barcelona"
        email_response: "Respondemos en < 24h laborables"
        location: "Servicio en Barcelona y Área Metropolitana"
    
    # Formulario de contacto
    form:
        title: "Formulario de Contacto"
        fields:
            - label: "Nombre completo"
              type: "text"
              required: true
              placeholder: "Su nombre y apellidos"
              
            - label: "Email"
              type: "email"
              required: true
              placeholder: "su@email.com"
              
            - label: "Teléfono"
              type: "tel"
              required: false
              placeholder: "Su número de teléfono (opcional)"
              
            - label: "Área de Interés"
              type: "select"
              required: true
              # OPCIONES ACTUALIZADAS A LOS PILARES DE SERVICIO
              options:
                - "Seleccione un servicio..."
                - "Informes Periciales (grietas, vicios ocultos, etc.)"
                - "Asesoramiento Estructural (reparación, refuerzo)"
                - "Auditorías de Obra (certificaciones, calidad)"
                - "Otra consulta"
              
            - label: "Mensaje"
              type: "textarea"
              required: true
              placeholder: "Describa brevemente su caso o consulta"
        
        submit_text: "Enviar Consulta"
        privacy_text: "He leído y acepto la Política de Privacidad"
        success_message: "¡Gracias! Hemos recibido su mensaje. Nos pondremos en contacto con usted en menos de 24 horas laborables."

---

## ¿Por Qué Contactar con Nosotros?

Al enviarnos su consulta, no solo está rellenando un formulario; está dando el primer paso para obtener claridad y seguridad técnica. Nuestro compromiso es ofrecerle:

* **Una Valoración Profesional y Honesta:** Analizaremos su caso de forma preliminar y le diremos con total transparencia si podemos ayudarle y cómo.
* **Confidencialidad Absoluta:** Toda la información que comparta con nosotros será tratada con la máxima discreción profesional.
* **Respuesta Rápida:** Entendemos que su problema puede ser urgente. Nos comprometemos a darle una primera respuesta en menos de 24 horas laborables.

Un informe pericial, una auditoría o un asesoramiento a tiempo pueden ahorrarle miles de euros y numerosos problemas. No dude en contactar; estamos para proteger sus intereses con el rigor técnico de la ingeniería.