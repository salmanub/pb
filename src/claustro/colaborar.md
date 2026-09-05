---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /colaboracion-peritos/
lang: es
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: ca
    permalink: /ca/collaboracio-perits/
  - lang: en
    permalink: /en/expert-collaboration/
title: "Colaboración de Peritos | Registro de Peritos Firmantes"
description: "Registro de peritos colaboradores firmantes: perfiles académicos, sénior de obra, especialistas de nicho y laboratorio. Condiciones de colaboración y disponibilidad real de encargos."
breadcrumb_parent:
  label: "Cuadro de Expertos"
  url: "/cuadro-de-expertos/"

# ── BORRADOR — pendiente de validación por Albert ────────────────────────────
# Primer borrador sobre el enfoque acordado: registro abierto a perfil académico
# y profesional, con gestión honesta de expectativas. Revisar antes de quitar
# `noindex: true`.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Colaboración<br>de peritos"

bridge_text: "Página dirigida a peritos. Para consultar un perito por materia:"
bridge_url: "/cuadro-de-expertos/"
bridge_link: "Ver el cuadro de expertos →"

expectations_eyebrow: "Condiciones del registro"
expectations_title: "Disponibilidad real de encargos"
expectations_body:
  - "El alta en el registro no comporta asignación de encargos. La frecuencia depende de que entre un asunto cuya materia coincida con la especialidad declarada, y esa coincidencia es infrecuente por definición: los expedientes que justifican incorporar a un perito externo son, precisamente, los que la dirección pericial no puede resolver por sí sola."
  - "El criterio de asignación es la coincidencia de materia, no la disponibilidad. Un especialista en geotecnia no recibe un asunto de instalaciones eléctricas. Esa restricción es deliberada: un dictamen firmado fuera de la especialidad acreditada del firmante no resiste el contrainterrogatorio."
  - "El registro funciona como directorio de consulta, no como bolsa de trabajo. Los datos se conservan para localizar al perito el día que la materia coincide, sin plazo previsible: puede ser cuestión de semanas o no llegar a producirse."
expectations_points_label: "Términos"
expectations_points:
  - "El alta no genera obligación ni exclusividad para ninguna de las dos partes."
  - "No se garantiza un volumen mínimo de encargos ni se emite previsión por escrito."
  - "El contacto se produce con el alcance y los honorarios ya definidos, para decidir con datos."
  - "No se remiten comunicaciones fuera de un encargo compatible con la especialidad declarada."
  - "Baja y supresión de datos a solicitud, en cualquier momento — Reglamento UE 2016/679."

protocols_eyebrow: "§ Protocolos"
protocols_title: "Dos vías de acreditación"
protocols_lede: "El protocolo no cambia el trabajo técnico ni los honorarios: cambia qué acredita al firmante ante el tribunal. Ninguna de las dos vías es subsidiaria de la otra."
protocols:
  - ref: "Protocolo A — Aval académico"
    title: "Universidad y docencia"
    lede: "Catedráticos, profesores titulares y profesorado asociado que compatibiliza la docencia con ejercicio profesional propio."
    items:
      - "Publicaciones y comités de normalización como trayectoria documental"
      - "Intervención por dictamen, sin volumen comprometido ni exclusividad"
      - "Compatibilidad sujeta a la Ley 53/1984 para el personal funcionario"
      - "Facturación como profesional independiente o según convenio de la universidad"
      - "Ratificación en sala pactada y retribuida desde el inicio — LEC art. 347"
    cta: "Darme de alta"
  - ref: "Protocolo B — Aval profesional"
    title: "Obra, especialidad, industria y colegio"
    lede: "Sénior de obra, especialistas de nicho, antiguos técnicos de fabricante o laboratorio y peritos inscritos en otros colegios. La experiencia de ejercicio acredita por sí sola: no se exige trayectoria docente."
    items:
      - "Años de dirección de obra, colegiación o acreditación ENAC como aval"
      - "Compatible con cartera de clientes propia, sin exclusividad"
      - "Cobertura territorial fuera de Cataluña a través de listas de otros colegios"
      - "Desvinculación acreditada del fabricante, cuando el perfil procede de la industria"
      - "Posibilidad de intervenir como asesor técnico sin firmar el dictamen"
    cta: "Darme de alta"

body_blocks:
  - h: "Qué hace el despacho y qué hace el perito colaborador"
    p: "El despacho capta el asunto, lo cualifica técnicamente, negocia honorarios y plazos con el letrado o la aseguradora, instruye el expediente, gestiona la facturación y asume la interlocución comercial. El colaborador recibe un encargo delimitado: alcance cerrado, documentación ordenada y una pregunta técnica concreta. Aporta el criterio, valida la metodología, firma el dictamen y lo ratifica en sala cuando el procedimiento lo requiere."
  - h: "Qué tipo de asuntos llegan"
    p: "Expedientes en los que la controversia se dirime en el modelo de cálculo, en la caracterización de un material, en la causa raíz de un fallo de servicio o en la práctica constructiva efectivamente ejecutada. Esta última categoría es la que reclama perfil de obra: cómo se ejecutó realmente el detalle, qué tolerancia se admitió y qué consecuencia tuvo. Es un dato que no se deduce del proyecto ni del modelo."
  - h: "Compatibilidad e independencia"
    p: "La actuación pericial es compatible con la actividad docente y con el ejercicio privado, pero la compatibilidad concreta depende del régimen de dedicación de cada universidad y, para el personal funcionario, de la Ley 53/1984 de incompatibilidades. Su verificación corresponde a cada colaborador. El dictamen se rige por el deber de imparcialidad del perito (art. 335.2 LEC): se firma lo que resulta del análisis, favorezca o no a quien lo encarga. No se aceptan encargos condicionados a un resultado."

split_label: "Reparto de roles"
split_headline: "El colaborador aporta el criterio técnico; el despacho, el resto del expediente."
split_items:
  - num: "01"
    text: "Captación del cliente y cualificación técnica del asunto"
  - num: "02"
    text: "Negociación de honorarios, alcance y plazos"
  - num: "03"
    text: "Instrucción del expediente y campaña de ensayos"
  - num: "04"
    text: "Redacción formal, maquetación y presentación procesal"
  - num: "05"
    text: "Facturación, seguimiento y trato con el letrado"
split_note: "Colaborador: criterio técnico, firma y ratificación"

form_section_eyebrow: "Alta de colaborador"
form_section_title: "Declaración de perfil técnico"
form_section_lede: "Cinco pasos. No se piden nombres de clientes, números de expediente ni ningún dato sujeto a confidencialidad: solo la materia sobre la que ha peritado."

form_eyebrow: "Alta de colaborador"
form_origen: "perito-alta-colaborador"
form_redirect: "/gracias/"
form_redirect_error: "/contacto/"

form_labels:
  next: "Continuar"
  back: "Atrás"
  step_hint: "Complete este paso para continuar"
  submit: "Enviar alta"
  optional: "(opcional)"
  progress: "/"
  required_note: "Campos obligatorios marcados por el navegador"
  honeypot: "No rellene este campo"

form_consent:
  text: "He leído y acepto la"
  link_label: "política de privacidad"
  url: "/privacidad/"

form_steps:
  - key: "perfil"
    eyebrow: "§ 01 · Perfil"
    type: "choice"
    question: "¿Qué acredita hoy su criterio técnico?"
    helper: "Determina la vía de acreditación, no la prioridad. Ninguna opción tiene preferencia sobre las demás."
    options:
      - "Cátedra o titularidad de universidad"
      - "Docencia universitaria compatibilizada con ejercicio profesional propio"
      - "Dirección de obra, jefatura de obra o dirección técnica"
      - "Especialidad instrumental (PCI, acústica, geotecnia de campo, termografía, metrología)"
      - "Laboratorio de ensayos o antigua responsabilidad técnica en fabricante"
      - "Inscripción en lista de peritos de un colegio profesional"
  - key: "formacion"
    eyebrow: "§ 02 · Formación y especialidad"
    type: "fields"
    question: "¿Cuál es su titulación y su materia de expertise?"
    helper: "La especialidad es el campo que se cruza con la materia de cada asunto."
    fields:
      - name: "titulacion"
        label: "Titulación y colegiación"
        placeholder: "Ingeniero de Caminos · Col. 00000"
        required: true
      - name: "especialidad"
        label: "Especialidad o materia de expertise"
        placeholder: "Cálculo de estructuras de hormigón · Geotecnia · Instalaciones…"
        required: true
  - key: "experiencia"
    eyebrow: "§ 03 · Experiencia pericial"
    type: "choice"
    question: "¿Ha realizado peritajes con anterioridad?"
    options:
      - "Sí, con regularidad"
      - "Sí, de forma puntual"
      - "No he peritado, pero sí he actuado como asesor técnico"
      - "No, sería mi primera actuación pericial"
  - key: "experiencia_detalle"
    eyebrow: "§ 04 · Materias periciadas"
    type: "fields"
    question: "¿Sobre qué materias ha peritado o dictaminado?"
    helper: "Solo la naturaleza técnica del trabajo. No indique nombres de clientes, partes, números de procedimiento ni ningún dato sujeto a confidencialidad."
    fields:
      - name: "materias"
        label: "Naturaleza y materia de los trabajos"
        multiline: true
        rows: 4
        placeholder: "Ej.: patología estructural en edificación residencial; fallos de cimentación por asientos diferenciales; dirección de ejecución de refuerzos con CFRP."
        required: false
        note: "Sin experiencia pericial previa, describa la experiencia técnica equivalente: obras dirigidas, ensayos firmados o instalaciones puestas en servicio."
  - key: "contacto"
    eyebrow: "§ 05 · Contacto"
    type: "fields"
    question: "¿Cómo le localizamos?"
    helper: "Solo se le escribirá cuando haya un asunto compatible con su especialidad."
    fields:
      - name: "nombre"
        label: "Nombre completo"
        placeholder: "Nombre y apellidos"
        autocomplete: "name"
        required: true
      - name: "email"
        label: "Correo electrónico"
        type: "email"
        placeholder: "nombre@dominio.com"
        autocomplete: "email"
        required: true
      - name: "telefono"
        label: "Teléfono de contacto"
        type: "tel"
        placeholder: "+34 ___ ___ ___"
        autocomplete: "tel"
        required: true
      - name: "institucion"
        label: "Universidad, empresa, laboratorio o despacho propio"
        placeholder: "Entidad a la que está vinculado"
        required: false

faq_title: "Antes de darse de alta"
faq:
  - q: "¿Hay que ser profesor de universidad?"
    a: "No. El registro está abierto a perfiles de obra, especialistas instrumentales, laboratorios acreditados y peritos inscritos en listas de otros colegios. Lo que se acredita ante el tribunal es la trayectoria del firmante en la materia concreta, y una dirección de obra de veinticinco años es trayectoria documental igual que una publicación."
  - q: "¿Cuánto se tarda en recibir un encargo?"
    a: "No se puede dar un plazo. Depende de que entre un asunto cuya materia coincida con la especialidad declarada. Esta página existe para no generar una expectativa que no se puede sostener."
  - q: "¿Cómo se fijan los honorarios?"
    a: "Se pactan caso por caso antes de aceptar el encargo, según alcance, complejidad técnica y previsión de ratificación en sala. La propuesta se recibe cerrada y por escrito: darse de alta no comporta compromiso previo."
  - q: "¿Es compatible con mi dedicación en la universidad?"
    a: "Depende del régimen de dedicación y, para el personal funcionario, de la Ley 53/1984 de incompatibilidades. La verificación corresponde a cada colaborador con su universidad."
  - q: "Vengo de un fabricante. ¿Es un problema para la independencia?"
    a: "Lo es si la vinculación sigue viva. Con la desvinculación acreditada, el conocimiento interno del sistema es un activo: permite evaluar prestaciones declaradas y equivalencias reales entre productos sin representar a ninguna marca."
  - q: "¿Qué pasa si el dictamen perjudica a quien lo encarga?"
    a: "Se emite igualmente. El perito debe actuar con objetividad y manifestarlo así bajo juramento o promesa (art. 335.2 LEC). No se aceptan encargos condicionados a un resultado ni se pide ajustar una conclusión."

privacy_title: "Tratamiento de sus datos"
privacy_note: "Sus datos se incorporan a un registro interno de peritos colaboradores con la única finalidad de contactarle ante un encargo compatible con su especialidad. No se ceden a terceros. Puede ejercer los derechos de acceso, rectificación y supresión escribiendo a la dirección de contacto del despacho, conforme al Reglamento UE 2016/679."
---
{% include "layouts/colaborador.njk" %}
