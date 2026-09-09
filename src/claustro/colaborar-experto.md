---
layout: layouts/base.njk
templateEngineOverride: njk
permalink: /colaboracion-expertos/
lang: es
noindex: true
eleventyNavigation:
  notshow: true
translations:
  - lang: ca
    permalink: /ca/collaboracio-experts/
  - lang: en
    permalink: /en/specialist-collaboration/
title: "Colaboración de Expertos | Estudio Técnico sin Firmar el Dictamen"
description: "Registro de expertos consultores: hacen el estudio técnico de su materia para incorporarlo a un dictamen pericial, sin redactarlo, sin firmarlo y sin comparecer ante el tribunal."
breadcrumb_parent:
  label: "Cuadro de Expertos"
  url: "/cuadro-de-expertos/"

# ── PÁGINA NUEVA — 08/09/2026 ────────────────────────────────────────────────
# La segunda figura de colaborador: el experto que hace el estudio de su materia
# y nada más. Nace de una objeción real y repetida: hay especialistas que no
# colaboran por el miedo a tener que personarse ante un juez.
#
# DECISIONES QUE NO SE VEN EN EL COPY:
#
# · `noindex: true` de momento, igual que /colaboracion-peritos/. La
#   recomendación de la spec es indexarla —nadie está posicionando «colaborar en
#   informes periciales sin ir a juicio»— pero esa es una decisión de Albert
#   (§10.1 de claude/pb-dos-figuras-colaborador-2026-09-07.md). Para indexarla:
#   borrar esta línea, quitar el rel="nofollow" del enlace de la home y añadirla
#   al footer.
#
# · El bloque `caveat_*` NO se suaviza. No se puede prometer «nunca irás a un
#   juzgado» en términos absolutos: la parte contraria puede pedir que se cite a
#   quien hizo un estudio incorporado a un dictamen, y la LEC contempla el
#   testigo-perito (art. 370.4). Decir el límite por delante capta más que una
#   promesa redonda que un catedrático desmonta en treinta segundos.
#   ⚠️ PENDIENTE: revisión por abogado del alcance procesal antes de indexar.
#
# · El paso 04 del formulario —la autorización del nombre— es la palanca
#   principal. Que la casilla exista y se pueda dejar sin marcar comunica, sin
#   decirlo, que el control es del experto.
#
# · NO se marca como schema.org/JobPosting, mismo criterio que la página de
#   peritos: no hay vacante ni encargo garantizado.
# ─────────────────────────────────────────────────────────────────────────────

heroTitle: "Colaboración<br>de expertos"

bridge_text: "Página dirigida a especialistas. Para consultar un perito por materia:"
bridge_url: "/cuadro-de-expertos/"
bridge_link: "Ver el cuadro de expertos →"

bridge2_text: "¿Quiere asumir el encargo pericial completo, con firma y ratificación?"
bridge2_url: "/colaboracion-peritos/"
bridge2_link: "Colaborar como perito firmante →"

expectations_eyebrow: "Qué significa exactamente"
expectations_title: "Aporte su especialidad. Del juzgado se ocupa el despacho."
expectations_body:
  - "Se buscan especialistas que hagan el estudio técnico de su materia para incorporarlo a un dictamen pericial. No redacta el informe, no lo firma y no declara ante ningún tribunal: eso es trabajo y responsabilidad de la dirección pericial."
  - "El encargo llega delimitado: una pregunta técnica concreta, la documentación ordenada y un alcance cerrado por escrito. Usted aplica su método y su criterio, y entrega un estudio. Ahí termina su intervención."
  - "El estudio se incorpora al dictamen como anexo. Que figure su nombre como autor es decisión suya: si lo autoriza, el dictamen gana su trayectoria; si no lo autoriza, el estudio se incorpora igualmente sin identificarle."
expectations_points_label: "El reparto, en cuatro líneas"
expectations_points:
  - "<strong>Usted hace</strong> el ensayo, el cálculo, la modelización o el análisis de su materia."
  - "<strong>El despacho hace</strong> el dictamen completo, que incorpora su estudio como anexo. Lo firma y responde de él."
  - "<strong>En el juzgado</strong> comparece la dirección pericial. Usted no asume obligación procesal alguna derivada de este encargo."
  - "<strong>Su nombre</strong> aparece como autor del estudio anexo sólo si usted lo autoriza."

caveat_title: "Lo que no se le puede garantizar"
caveat_body:
  - "Ningún perito puede garantizarle al cien por cien que nunca le citen. La parte contraria puede pedir que se cite a quien hizo un estudio incorporado a un dictamen, y la ley procesal lo contempla. Es infrecuente y no depende del despacho."
  - "Lo que sí depende del despacho: que lo sepa antes de empezar, que si alguna vez ocurre se le explique con tiempo y que se le acompañe. No se le va a vender una tranquilidad que no se puede firmar."

protocols_eyebrow: "§ Modalidades"
protocols_title: "Dos formas de intervenir sin firmar"
protocols_lede: "La modalidad no cambia el hecho de fondo: el dictamen lo redacta y lo firma la dirección pericial. Cambia el volumen del trabajo que se le encarga y cómo se retribuye."
protocols:
  - ref: "Modalidad A — Estudio de materia"
    title: "Ensayo, cálculo o análisis"
    lede: "Un trabajo técnico acotado que se incorpora al dictamen como anexo: una campaña de ensayos, un recálculo, una modelización, una interpretación de resultados."
    items:
      - "Alcance y honorarios cerrados por escrito antes de empezar"
      - "Acceso a la documentación del expediente y a la visita cuando sea necesaria"
      - "Metodología y criterio propios: no se pide ajustar una conclusión"
      - "Autoría en el anexo del dictamen, si usted la autoriza"
      - "Sin redacción del informe, sin firma y sin comparecencia"
    cta: "Darme de alta"
  - ref: "Modalidad B — Consulta puntual"
    title: "Criterio sobre una cuestión concreta"
    lede: "Una sola pregunta técnica: si un procedimiento constructivo es el habitual en su especialidad, si un resultado de ensayo admite otra lectura, si una norma de producto cubre un uso."
    items:
      - "Intervención breve, retribuida por consulta"
      - "Sin entregable formal cuando el asunto no lo requiere"
      - "Su criterio no se cita nominalmente salvo autorización expresa"
      - "Compatible con cualquier vinculación laboral o académica propia"
      - "Sin redacción del informe, sin firma y sin comparecencia"
    cta: "Darme de alta"

body_blocks:
  - h: "Qué tipo de estudios se encargan"
    p: "Expedientes en los que la controversia se dirime en el modelo de cálculo, en la caracterización de un material, en la causa raíz de un fallo de servicio o en la práctica constructiva efectivamente ejecutada. Son, por definición, los asuntos que la dirección pericial no puede resolver por sí sola: si pudiera, no habría encargo."
  - h: "Honorarios e independencia"
    p: "Los honorarios se cierran por escrito antes de empezar, por estudio, y <strong>no dependen del resultado del procedimiento</strong>. Esto último no es un detalle administrativo: un experto que cobrara en función del desenlace tendría interés en él, y ese interés contaminaría el dictamen que incorpora su estudio. Se paga el trabajo técnico, diga lo que diga."
  - h: "Compatibilidad con su actividad"
    p: "Hacer el estudio técnico de una materia no es actuar como perito: no comporta designación, ni juramento, ni obligación procesal. Aun así, la compatibilidad concreta con su universidad, su empresa o su laboratorio depende de su régimen de dedicación y, para el personal funcionario, de la Ley 53/1984 de incompatibilidades. Su verificación corresponde a cada colaborador."
  - h: "Se puede cambiar de modalidad"
    p: "El alta como experto consultor no cierra ninguna puerta. Si más adelante quiere asumir el encargo completo —redactar, firmar y ratificar— se pasa al <a href=\"/colaboracion-peritos/\">registro de peritos colaboradores</a> sin volver a empezar. Muchos especialistas prefieren empezar aportando el estudio y decidir después, con un expediente real delante."

split_label: "Cómo funciona un encargo"
split_headline: "Usted aporta el criterio técnico; el despacho, el dictamen y el juzgado."
split_items:
  - num: "01"
    text: "Se le describe el asunto y la pregunta técnica, sin datos confidenciales"
  - num: "02"
    text: "Alcance, plazo y honorarios cerrados por escrito"
  - num: "03"
    text: "Acceso a la documentación y a la visita si el estudio la requiere"
  - num: "04"
    text: "Entrega del estudio, con su firma o sin ella"
  - num: "05"
    text: "Incorporación como anexo del dictamen y pago"
split_note: "El experto no redacta, no firma y no declara"

form_section_eyebrow: "Alta de experto consultor"
form_section_title: "Declaración de perfil técnico"
form_section_lede: "Cinco pasos. No se piden nombres de clientes, números de expediente ni ningún dato sujeto a confidencialidad: solo la materia que domina."

form_eyebrow: "Alta de experto consultor"
form_id: "experto-consultor"
form_origen: "perito-alta-experto-consultor"
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
  sending: "Enviando el alta…"
  sent_title: "Alta recibida"
  sent_text: "Sus datos ya constan en el registro de expertos consultores. Se le escribirá únicamente cuando entre un asunto compatible con su materia."
  error_title: "No se ha podido registrar el alta"
  error_text: "Sus datos siguen en el formulario, no se han perdido. Use una de estas vías o vuelva a intentarlo."
  error_email: "Enviar el alta por correo"
  error_call: "Llamar al despacho"
  retry: "Reintentar"

form_consent:
  text: "He leído y acepto la"
  link_label: "política de privacidad"
  url: "/privacidad/"

form_steps:
  - key: "materia"
    eyebrow: "§ 01 · Materia"
    type: "choice"
    question: "¿Sobre qué materia puede hacer el estudio técnico?"
    helper: "Es el campo que se cruza con la materia controvertida de cada expediente. Si su especialidad no encaja en ninguna, indíquelo en el paso 04."
    options:
      - "Estructuras y cálculo"
      - "Geotecnia y cimentación"
      - "Edificación y habitabilidad"
      - "Instalaciones y proceso industrial"
      - "Materiales y ensayos"
      - "Obra pública y contrato"
  - key: "acredita"
    eyebrow: "§ 02 · Qué acredita su criterio"
    type: "choice"
    question: "¿Qué acredita hoy su criterio técnico en esa materia?"
    helper: "No determina prioridad. Ninguna opción tiene preferencia sobre las demás."
    options:
      - "Cátedra, titularidad o docencia universitaria"
      - "Dirección de obra, jefatura de obra o dirección técnica"
      - "Especialidad instrumental (PCI, acústica, geotecnia de campo, termografía, metrología)"
      - "Laboratorio de ensayos con acreditación propia"
      - "Responsabilidad técnica actual o pasada en fabricante"
      - "Investigación aplicada o desarrollo de producto"
  - key: "formacion"
    eyebrow: "§ 03 · Formación y medios"
    type: "fields"
    question: "¿Cuál es su titulación y con qué medios cuenta?"
    helper: "Los medios importan tanto como la titulación: hay estudios que dependen de un equipo concreto."
    fields:
      - name: "titulacion"
        label: "Titulación y colegiación"
        placeholder: "Ingeniero de Caminos · Col. 00000"
        required: true
      - name: "medios"
        label: "Instrumentación, laboratorio o software del que dispone"
        multiline: true
        rows: 3
        placeholder: "Ej.: esclerómetro y ultrasonidos; laboratorio acreditado para hormigón endurecido; licencia de cálculo por elementos finitos."
        required: false
  - key: "autoria"
    eyebrow: "§ 04 · Autoría del estudio"
    type: "choice"
    question: "¿Autoriza que su nombre figure como autor del estudio anexo?"
    helper: "Puede decir que no. El estudio se incorpora igualmente, sin identificarle. Esta respuesta no es definitiva: se confirma en cada encargo."
    options:
      - "Sí, con nombre y titulación como autor del estudio anexo"
      - "Sí, pero prefiero decidirlo caso por caso"
      - "No, el estudio se incorpora sin identificarme"
  - key: "contacto"
    eyebrow: "§ 05 · Contacto"
    type: "fields"
    question: "¿Cómo le localizamos?"
    helper: "Solo se le escribirá cuando haya un asunto compatible con su materia."
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
      - name: "perfil"
        label: "Perfil público, CV en línea o ficha en su universidad"
        placeholder: "https://linkedin.com/in/… · ORCID · Dialnet · web del departamento"
        required: false
        note: "Un perfil público verificable vale más que un currículum adjunto: está actualizado y el tribunal puede contrastarlo. No hace falta enviar el CV."
      - name: "mensaje"
        label: "Lo que quiera añadir"
        multiline: true
        rows: 4
        placeholder: "Ej.: su especialidad no encaja en ninguna de las materias del listado; instrumentación poco habitual; disponibilidad; cualquier cosa que no se le haya preguntado."
        required: false
        note: "No indique nombres de clientes, partes, números de procedimiento ni ningún dato sujeto a confidencialidad."

faq_title: "Antes de darse de alta"
faq:
  - q: "¿Hace falta enviar el currículum?"
    a: "No. Con la titulación, la especialidad y un perfil público verificable —LinkedIn, ORCID, Dialnet, la ficha de su departamento o la acreditación del laboratorio— hay suficiente para valorar el encaje. Si un asunto concreto lo requiere, se le pedirá entonces y por correo. Este registro no es un proceso de selección."
  - q: "¿Tengo que ir al juzgado?"
    a: "No. El dictamen lo firma la dirección pericial y es quien comparece y responde de él. Su intervención termina con la entrega del estudio. Dicho eso, lea «Lo que no se le puede garantizar»: la parte contraria puede pedir que se cite a quien hizo un estudio incorporado a un dictamen. Es infrecuente, no depende del despacho, y por eso está escrito en esta página y no en la letra pequeña."
  - q: "¿Tengo que firmar el estudio?"
    a: "No. Es decisión suya, y se confirma en cada encargo. Si lo firma, el dictamen incorpora su trayectoria como autor del anexo. Si no lo firma, el estudio se incorpora igualmente y su nombre no aparece en ninguna parte."
  - q: "¿Asumo responsabilidad pericial?"
    a: "No. La responsabilidad del dictamen —técnica y procesal— es de quien lo firma, que es la dirección pericial. Usted responde de su estudio en los mismos términos en que respondería de cualquier trabajo técnico encargado, ni más ni menos."
  - q: "¿Cuánto se tarda en recibir un encargo?"
    a: "No se puede dar un plazo. Depende de que entre un asunto cuya materia coincida con su especialidad, y esa coincidencia es infrecuente por definición. Puede ser cuestión de semanas o no llegar a producirse. Esta página existe para no generar una expectativa que no se puede sostener."
  - q: "¿Cómo se fijan los honorarios?"
    a: "Se pactan caso por caso antes de aceptar el encargo, según el alcance del estudio y los medios que requiera. La propuesta se recibe cerrada y por escrito, y no depende del resultado del procedimiento. Darse de alta no comporta compromiso previo."
  - q: "¿Es compatible con mi puesto en la universidad o en una empresa?"
    a: "Hacer un estudio técnico no es actuar como perito: no hay designación ni obligación procesal. Aun así, la compatibilidad depende de su régimen de dedicación y, para el personal funcionario, de la Ley 53/1984 de incompatibilidades. La verificación corresponde a cada colaborador."
  - q: "¿Puedo pasar a firmar como perito más adelante?"
    a: "Sí, cuando quiera. El alta como experto consultor no cierra esa puerta ni obliga a nada. Muchos especialistas prefieren empezar aportando el estudio y decidir después, con un expediente real delante."
  - q: "¿Qué pasa si mi estudio perjudica a quien encarga el dictamen?"
    a: "Se incorpora igualmente. El dictamen se rige por el deber de imparcialidad del perito (art. 335.2 LEC) y no se aceptan encargos condicionados a un resultado. Nunca se le pedirá que ajuste una conclusión."

privacy_title: "Tratamiento de sus datos"
privacy_note: "Sus datos se incorporan a un registro interno de expertos consultores con la única finalidad de contactarle ante un encargo compatible con su materia. No se ceden a terceros. Puede ejercer los derechos de acceso, rectificación y supresión escribiendo a la dirección de contacto del despacho, conforme al Reglamento UE 2016/679."
---
{% include "layouts/colaborador.njk" %}
