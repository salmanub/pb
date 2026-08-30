---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /colaborar-como-perito/
lang: es
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: ca
    permalink: /ca/collaborar-com-a-perit/
  - lang: en
    permalink: /en/collaborate-as-expert/
title: "Colaborar como Perito Firmante | Alta de Experto Académico"
description: "Alta de catedráticos, profesores titulares y profesionales con actividad docente como peritos firmantes. Sin carga comercial ni administrativa. Lea antes las condiciones y la disponibilidad real de encargos."
breadcrumb_parent:
  label: "Claustro de Expertos"
  url: "/claustro-de-expertos/"

# ── BORRADOR — pendiente de validación por Albert ────────────────────────────
# Todos los textos de esta página son un primer borrador redactado sobre el
# enfoque acordado (gestión honesta de expectativas + perfil mixto académico /
# autónomo). Revisar tono y condiciones antes de quitar `noindex: true`.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Colaborar como<br>perito firmante"

bridge_text: "¿Busca un perito para su asunto?"
bridge_url: "/claustro-de-expertos/"
bridge_link: "Ver el claustro de expertos →"

profiles:
  - "Catedráticos"
  - "Profesores titulares"
  - "Profesores asociados"
  - "Autónomos con docencia"

body_blocks:
  - h: "A quién nos dirigimos"
    p: "A catedráticos y profesores titulares de universidad, y también —de forma expresa— a quien compatibiliza la docencia con ejercicio profesional por cuenta propia: el profesor asociado o colaborador que da clase en la universidad y factura como autónomo. Ese perfil mixto es hoy el más habitual entre nuestros colaboradores y el copy de esta página está escrito contando con él, no solo con el académico a tiempo completo."
  - h: "Qué hacemos nosotros y qué hace usted"
    p: "Nosotros captamos el asunto, lo cualificamos técnicamente, negociamos honorarios y plazos con el letrado o la aseguradora, instruimos el expediente, gestionamos la facturación y asumimos la interlocución comercial. Usted recibe un encargo ya delimitado: alcance cerrado, documentación ordenada y una pregunta técnica concreta. Aporta el criterio, valida la metodología, firma el dictamen y lo ratifica en sala si el procedimiento lo requiere."
  - h: "Qué tipo de asuntos llegan"
    p: "Casos en los que la controversia se dirime en el modelo de cálculo, en la caracterización de un material o en la interpretación de una norma técnica: patología estructural con recálculo, interacción suelo-estructura, fallos de servicio en instalaciones, comportamiento de sistemas constructivos fuera de su norma de producto. Son expedientes técnicamente exigentes; ese es precisamente el motivo por el que se recurre a un perfil académico."
  - h: "Compatibilidad e independencia"
    p: "La actuación pericial es compatible con la actividad docente y con el ejercicio privado, pero la compatibilidad concreta depende del régimen de dedicación de cada universidad y, en el caso del personal funcionario, de la Ley 53/1984 de incompatibilidades. Es responsabilidad de cada colaborador verificar su situación. Por nuestra parte, el dictamen se rige por el deber de imparcialidad del perito (art. 335.2 LEC): se firma lo que resulta del análisis, favorezca o no a quien lo encarga."

split_label: "Reparto de roles"
split_headline: "Usted aporta criterio. Nosotros, todo lo demás."
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
split_note: "Usted: criterio técnico, firma y ratificación"

expectations_eyebrow: "Léalo antes de darse de alta"
expectations_title: "No podemos prometerle encargos inmediatos"
expectations_body:
  - "Conviene decirlo sin rodeos: darse de alta en este registro <strong>no significa que vaya a recibir un encargo pronto</strong>, ni que vaya a recibirlo en absoluto. Sería fácil escribir lo contrario y quedaría mejor en esta página, pero no sería cierto."
  - "La demanda de peritajes singulares y de alto perfil ha crecido, y con ella la exigencia de encaje: los asuntos que justifican recurrir a un experto académico son, por definición, poco frecuentes y muy específicos. Un catedrático en geotecnia no resuelve un litigio sobre instalaciones eléctricas, y llamarle para eso solo le haría perder el tiempo a usted y credibilidad a nosotros."
  - "Por eso el planteamiento es el contrario al de una bolsa de trabajo: <strong>déjenos sus datos ahora para que, cuando entre un caso que encaje al 100 % con su especialidad, podamos ir directos a usted</strong>. Puede pasar un mes o puede pasar un año. Lo que no va a pasar es que le llamemos para un encargo que no va con usted."
expectations_points:
  - "El alta no genera ningún compromiso por ninguna de las dos partes, ni exclusividad."
  - "No hay un volumen mínimo de encargos garantizado, ni una previsión que podamos darle por escrito."
  - "Cuando surja un caso compatible, le llamaremos con el alcance y los honorarios ya definidos, para que decida con datos."
  - "Si el asunto no encaja con su especialidad, no le escribiremos. Preferimos el silencio a la lista de correo."
  - "Puede solicitar la baja y la supresión de sus datos en cualquier momento escribiendo a la dirección de contacto."

form_section_eyebrow: "Alta de colaborador"
form_section_title: "Déjenos su perfil técnico"
form_section_lede: "Cinco pasos. No pedimos nombres de clientes, números de expediente ni ningún dato sujeto a confidencialidad: solo la materia sobre la que ha peritado."

form_eyebrow: "Alta de colaborador"
form_origen: "perito-alta-colaborador"
form_redirect: "/gracias/"
form_redirect_error: "/contacto/"

form_labels:
  next: "Continuar"
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
  - key: "perfil_academico"
    eyebrow: "§ 01 · Perfil"
    type: "choice"
    question: "¿Cuál es su situación académica actual?"
    helper: "Si compatibiliza docencia y ejercicio por cuenta propia, seleccione la opción que mejor lo refleje."
    options:
      - "Catedrático/a de universidad"
      - "Profesor/a titular de universidad"
      - "Profesor/a asociado/a o colaborador/a con ejercicio profesional propio"
      - "Personal docente e investigador (contratado doctor, ayudante doctor)"
      - "Otro perfil docente o investigador"
  - key: "formacion"
    eyebrow: "§ 02 · Formación y especialidad"
    type: "fields"
    question: "¿Cuál es su titulación y su materia de expertise?"
    helper: "La especialidad es el campo que usamos para cruzar su perfil con la materia de cada asunto."
    fields:
      - name: "titulacion"
        label: "Titulación"
        placeholder: "Dr. Ingeniero de Caminos, Canales y Puertos"
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
    question: "¿Sobre qué materias ha peritado?"
    helper: "Solo la naturaleza técnica del peritaje. No indique nombres de clientes, partes, números de procedimiento ni ningún dato sujeto a confidencialidad."
    fields:
      - name: "materias"
        label: "Naturaleza y materia de los peritajes"
        multiline: true
        rows: 4
        placeholder: "Ej.: patología estructural en edificación residencial; fallos de cimentación por asientos diferenciales; dictámenes de parte en jurisdicción civil."
        required: false
        note: "Si ha marcado que no ha peritado antes, puede dejarlo en blanco o describir su experiencia técnica equivalente."
  - key: "contacto"
    eyebrow: "§ 05 · Contacto"
    type: "fields"
    question: "¿Cómo le localizamos?"
    helper: "Le escribiremos únicamente cuando haya un asunto compatible con su especialidad."
    fields:
      - name: "nombre"
        label: "Nombre completo"
        placeholder: "Nombre y apellidos"
        autocomplete: "name"
        required: true
      - name: "email"
        label: "Correo electrónico"
        type: "email"
        placeholder: "nombre@universidad.edu"
        autocomplete: "email"
        required: true
      - name: "telefono"
        label: "Teléfono de contacto"
        type: "tel"
        placeholder: "+34 ___ ___ ___"
        autocomplete: "tel"
        required: true
      - name: "institucion"
        label: "Universidad o institución"
        placeholder: "Nombre de la universidad, departamento o despacho propio"
        required: false

faq_title: "Antes de darse de alta"
faq:
  - q: "¿Cuánto tardaré en recibir un encargo?"
    a: "No podemos darle un plazo. Depende por completo de que entre un asunto cuya materia coincida con su especialidad. Puede ser en semanas o puede no llegar a producirse. Esta página existe precisamente para no generarle una expectativa que no podemos sostener."
  - q: "¿Cómo se fijan los honorarios?"
    a: "Se pactan caso por caso antes de aceptar el encargo, en función del alcance, la complejidad técnica y si se prevé ratificación en sala. Recibirá la propuesta cerrada por escrito y decide entonces: no hay compromiso previo por darse de alta."
  - q: "¿Es compatible con mi dedicación en la universidad?"
    a: "Depende de su régimen de dedicación y, en el caso del personal funcionario, de la Ley 53/1984 de incompatibilidades. Es una verificación que corresponde a cada colaborador con su universidad. Nosotros no podemos hacerla por usted."
  - q: "¿Tengo que buscar clientes o negociar?"
    a: "No. La captación, la negociación de honorarios, la instrucción del expediente y la facturación son nuestras. Su intervención empieza cuando el encargo ya está definido y aceptado."
  - q: "¿Debo firmar el dictamen y ratificarlo en sala?"
    a: "Sí. La firma es el núcleo de la colaboración: quien suscribe el dictamen es quien lo defiende. Si el procedimiento requiere ratificación, se acuerda desde el inicio y se retribuye como parte del encargo (art. 347 LEC)."
  - q: "¿Qué pasa si el dictamen perjudica a quien lo encarga?"
    a: "Se emite igualmente. El perito debe actuar con objetividad y manifestarlo así bajo juramento o promesa (art. 335.2 LEC). No aceptamos encargos condicionados a un resultado, y no le pediremos nunca que ajuste una conclusión."

privacy_title: "Tratamiento de sus datos"
privacy_note: "Sus datos se incorporan a un registro interno de peritos colaboradores con la única finalidad de contactarle ante un encargo compatible con su especialidad. No se ceden a terceros. Puede ejercer los derechos de acceso, rectificación y supresión escribiendo a la dirección de contacto del despacho, conforme al Reglamento UE 2016/679."
---
{% include "layouts/colaborador.njk" %}
