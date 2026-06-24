/* global React */
// Bitácora (blog index), Post (article detail) and CasoDetalle (case-study detail)
// for the perito.barcelona site. Sober, lots of whitespace, dual-audience copy.
(function () {
const { wrap, PageHero, Breadcrumb, CaseCard, Qual, BandCTA, SecHead, CASOS, WB, WTag, WCard, WSH } = window;
const Icon = window.Icon, Placeholder = window.Placeholder, Reveal = window.Reveal;
const WSeal = window.WSeal;
const sec = { ...wrap, padding: 'var(--section-y) var(--gutter)' };

/* ── ARTICLE DATA ─────────────────────────────────────────── */
const ARTICLES = [
  { slug: 'humedades-sintoma-no-es-origen', cat: 'Humedades', read: '6 min', date: '12 May 2026',
    aud: 'Para particulares',
    t: 'Por qué el síntoma no es el origen: humedades que reaparecen',
    lede: 'Pintar sobre una mancha de humedad no resuelve nada. La mancha visible casi nunca coincide con el punto por donde entra el agua. Por qué tantas reparaciones fracasan y qué hace distinto un diagnóstico pericial.',
    norm: ['CTE DB-HS 1', 'Termografía infrarroja', 'Prueba de estanqueidad'],
    body: [
      ['p', 'Es una de las consultas más frecuentes que llegan al despacho: «He pintado, he picado, he sellado, y la humedad vuelve cada invierno.» El patrón se repite porque casi todas esas intervenciones tratan el <b>síntoma</b> —la mancha— sin haber identificado el <b>origen</b> del agua.'],
      ['h', 'El agua viaja antes de aflorar'],
      ['p', 'El agua penetra por un punto y recorre el interior del muro o del forjado siguiendo la pendiente y la porosidad de los materiales, hasta que aflora donde encuentra salida. Ese recorrido puede ser de centímetros o de varios metros. Por eso la mancha en el techo del salón puede tener su origen en una junta de la terraza del vecino.'],
      ['quote', 'Si ha pagado reparaciones que no han funcionado, lo más probable es que se haya tratado el síntoma sin localizar la causa.'],
      ['h', 'Qué hace un diagnóstico no destructivo'],
      ['p', 'La instrucción técnica localiza el origen <b>sin abrir obra</b>: termografía infrarroja para leer los gradientes de temperatura asociados a la evaporación, higrómetros de profundidad para distinguir humedad superficial de estructural, y pruebas de estanqueidad dirigidas para confirmar la hipótesis. Solo cuando el origen está acreditado tiene sentido proyectar la reparación —y reclamar a quien corresponda.'],
      ['h', 'Por qué importa para reclamar'],
      ['p', 'Determinar el origen no es solo una cuestión técnica: define <b>a quién se reclama</b>. Una filtración por cubierta comunitaria, un defecto de la constructora dentro del plazo de la LOE o un daño cubierto por la póliza del hogar tienen responsables distintos. El dictamen delimita esa frontera con base objetiva.'],
    ] },
  { slug: 'vicios-ocultos-plazo-seis-meses', cat: 'Vicios ocultos', read: '5 min', date: '28 Abr 2026',
    aud: 'Para particulares',
    t: 'Vicios ocultos: el plazo de 6 meses que casi nadie respeta',
    lede: 'Acaba de comprar una vivienda y aparece un defecto grave que no era visible. El Código Civil le da derecho a reclamar, pero el reloj corre desde la entrega. Qué es un vicio oculto y por qué el peritaje no puede esperar.',
    norm: ['CC art. 1484', 'CC art. 1490', 'Acción redhibitoria'],
    body: [
      ['p', 'Un <b>vicio oculto</b> es un defecto grave, no aparente en el momento de la compra, que impide el uso adecuado del inmueble o que, de haberse conocido, habría llevado a no comprar o a pagar menos. Lo regula el Código Civil en sus artículos 1484 y siguientes.'],
      ['h', 'Tres condiciones que deben cumplirse'],
      ['p', 'El defecto debe ser <b>grave</b> —no un desperfecto menor—, <b>anterior</b> a la venta y <b>desconocido</b> por el comprador en el momento de la firma. Acreditar la preexistencia es, técnicamente, el punto más delicado: se demuestra analizando el grado de desarrollo de la patología.'],
      ['quote', 'El CC art. 1490 fija 6 meses desde la entrega. El informe pericial debe obtenerse dentro de ese plazo.'],
      ['h', 'Por qué el tiempo corre en su contra'],
      ['p', 'Pasados los seis meses, la acción decae. El dictamen pericial debe redactarse dentro de ese plazo para acreditar existencia, gravedad y preexistencia del defecto. Una humedad con un patrón de evolución determinado, o una fisura con un grado de apertura concreto, permiten datar técnicamente el origen del problema antes de la compraventa.'],
      ['p', 'Si acaba de detectar el problema, lo prudente es no demorar la consulta: la prueba técnica es la base de cualquier reclamación, judicial o extrajudicial.'],
    ] },
  { slug: 'desmontar-dictamen-contrario', cat: 'Pericia judicial', read: '7 min', date: '14 Abr 2026',
    aud: 'Para profesionales',
    t: 'Cómo se desmonta un dictamen pericial contrario',
    lede: 'Un contrainforme no elabora un nuevo dictamen sobre la patología: demuestra que las conclusiones del informe contrario son incorrectas, incompletas o metodológicamente deficientes. Qué analiza un perito cuando le encargan refutar a otro.',
    norm: ['LEC art. 348', 'Sana crítica', 'Lex artis'],
    body: [
      ['p', 'En un litigio con prueba pericial contradictoria, el juez valora libremente la fuerza probatoria de cada dictamen conforme a las reglas de la <b>sana crítica</b> (LEC art. 348). El contrainforme trabaja sobre esa valoración: erosiona la credibilidad del dictamen contrario.'],
      ['h', 'Cuatro frentes de análisis'],
      ['p', '<b>Rigor metodológico:</b> ¿la inspección fue suficiente, o se concluyó sin ensayos? <b>Corrección normativa:</b> ¿las referencias al CTE, la EHE-08 o la LOE son las aplicables y están bien interpretadas? <b>Coherencia interna:</b> ¿las conclusiones se siguen de los datos aportados, o hay saltos lógicos? <b>Cuantificación:</b> ¿la valoración económica está justificada partida a partida?'],
      ['quote', 'Un juez que no puede fiarse del perito contrario da mayor crédito al dictamen que sí demuestra solidez.'],
      ['h', 'No es una opinión enfrentada: es auditoría técnica'],
      ['p', 'La fuerza del contrainforme no está en afirmar lo contrario, sino en <b>exhibir las carencias</b> del documento que se refuta con la norma en la mano. La ratificación oral, donde esas carencias se ponen ante el juez en interrogatorio cruzado, es a menudo el momento decisivo.'],
    ] },
  { slug: 'grietas-activas-vs-muertas', cat: 'Estructura', read: '6 min', date: '02 Abr 2026',
    aud: 'Mixto',
    t: 'Grietas activas o grietas muertas: cómo se leen',
    lede: 'No todas las grietas son estructurales y no todas son peligrosas. Distinguir una fisura térmica de una grieta activa por asiento es la diferencia entre tranquilizar y actuar de urgencia. Una guía de lectura para no técnicos.',
    norm: ['CTE DB-SE', 'EHE-08', 'Testigos de yeso'],
    body: [
      ['p', 'La pregunta que más angustia genera es simple: «¿esta grieta es peligrosa?» La respuesta técnica depende de tres variables —geometría, apertura y evolución— y casi nunca se resuelve a simple vista.'],
      ['h', 'Activa frente a muerta'],
      ['p', 'Una grieta <b>muerta</b> ha dejado de moverse: corresponde a un fenómeno que ya se estabilizó —una retracción, un asiento inicial—. Una grieta <b>activa</b> sigue abriéndose, y eso indica que la causa permanece. La diferencia se mide con testigos —de yeso o de precisión— observados en el tiempo.'],
      ['quote', 'Una grieta diagonal de más de un milímetro que sigue abriéndose merece inspección sin demora.'],
      ['h', 'Qué señales sí deben preocupar'],
      ['p', 'Disposición diagonal en esquinas de huecos, apertura superior a un milímetro, evolución perceptible entre estaciones y, sobre todo, afectación de elementos portantes —pilares, vigas, forjados—. Cuando concurren, el diagnóstico estructural conforme al CTE DB-SE deja de ser opcional.'],
    ] },
  { slug: 'informe-que-se-sostiene-en-sala', cat: 'Pericia judicial', read: '5 min', date: '19 Mar 2026',
    aud: 'Para profesionales',
    t: 'Qué hace que un informe «se sostenga en sala»',
    lede: 'La diferencia entre un dictamen que convence al juez y uno que se desmorona en el interrogatorio no está en la extensión, sino en la trazabilidad. Cinco atributos que distinguen un informe pericial sólido.',
    norm: ['LEC art. 335', 'LEC art. 347', 'Trazabilidad'],
    body: [
      ['p', 'Un dictamen extenso no es necesariamente un dictamen sólido. Lo que el juez valora —y lo que el letrado contrario intentará quebrar— es la <b>trazabilidad</b>: que cada conclusión pueda seguirse hasta un dato, y cada dato hasta una observación o un ensayo.'],
      ['h', 'Cinco atributos'],
      ['p', '<b>1 · Metodología explícita:</b> el lector sabe qué se hizo y por qué. <b>2 · Datos primarios:</b> mediciones, ensayos, fotografías fechadas. <b>3 · Norma correcta:</b> la referencia aplicable, bien citada. <b>4 · Conclusión proporcionada:</b> ni más ni menos de lo que los datos permiten afirmar. <b>5 · Defensa oral:</b> capacidad de sostener todo lo anterior ante interrogatorio.'],
      ['quote', 'La ratificación no es un trámite: es donde el informe se gana o se pierde.'],
      ['p', 'Por eso en este despacho la ratificación en sala se incluye en honorarios sin sobrecoste: un informe que no se puede defender verbalmente no cumple su función.'],
    ] },
  { slug: 'termografia-que-puede-ver', cat: 'Humedades', read: '4 min', date: '05 Mar 2026',
    aud: 'Mixto',
    t: 'Termografía infrarroja: qué puede ver y qué no',
    lede: 'La cámara térmica se ha convertido en sinónimo de diagnóstico de humedades, pero ni lo ve todo ni sustituye al criterio. Qué aporta realmente y dónde están sus límites.',
    norm: ['CTE DB-HS', 'Higrometría', 'Puentes térmicos'],
    body: [
      ['p', 'La termografía mide temperatura superficial, no humedad. Lo que detecta son <b>gradientes</b>: una zona húmeda se evapora y se enfría respecto a su entorno, y esa diferencia aparece en la imagen térmica. De ahí su utilidad —y su límite.'],
      ['h', 'Lo que aporta'],
      ['p', 'Permite rastrear la extensión de una zona afectada y localizar puentes térmicos, filtraciones activas y trayectorias de agua <b>sin abrir obra</b>. Es rápida, no destructiva y orienta dónde profundizar.'],
      ['quote', 'La cámara térmica orienta; el diagnóstico lo cierra el criterio técnico, no la imagen.'],
      ['h', 'Dónde están los límites'],
      ['p', 'No atraviesa muros ni «ve» dentro del material: lee superficie. Una humedad seca en el momento de la inspección puede no mostrar gradiente. Por eso se combina siempre con higrometría de profundidad y con la lectura del detalle constructivo. La imagen térmica sin interpretación es solo una imagen bonita.'],
    ] },
];

/* ── CASE-STUDY DETAIL DATA (keyed to CASOS by index) ─────── */
const CASE_DETAIL = [
  { slug: 'incendio-nave-logistica', resultado: 'Ratificado en juzgado',
    cliente: 'Aseguradora nacional', plazo: '90 días', jurisdiccion: 'Mercantil · Barcelona',
    encargo: 'Una aseguradora nacional necesitaba determinar causa, origen y extensión de un incendio que afectó a una nave logística de 8.000 m², con el fin de cuantificar la indemnización y fijar responsabilidades frente a un tercero.',
    instruccion: 'Inspección de la totalidad de la nave siniestrada, lectura del patrón de daños sobre la estructura metálica, reconstrucción del foco y la propagación, y verificación del cumplimiento del RSCIEI en el momento del siniestro. Modelado de la afectación a cubierta y pavimento.',
    dictamen: 'El dictamen estableció el foco de origen, descartó las hipótesis alternativas planteadas por la propiedad y cuantificó el daño estructural y de continente de forma partida a partida, con trazabilidad completa entre observación, ensayo y conclusión.',
    resultadoNarr: 'El informe fue aportado como prueba pericial y ratificado en sede judicial. La cuantificación resistió el interrogatorio de la parte contraria y fue asumida por el juzgado.',
    norm: ['RSCIEI (RD 2267/2004)', 'Causa y origen de incendio', 'Estructura metálica', 'LEC art. 335'] },
  { slug: 'asiento-puente-via-rapida', resultado: 'En procedimiento C-A',
    cliente: 'Administración pública', plazo: '120 días', jurisdiccion: 'Contencioso-administrativo',
    encargo: 'Una administración pública requería dictamen sobre patologías de asiento diferencial en un puente de hormigón pretensado de vía rápida, en el marco de un contencioso frente a la constructora.',
    instruccion: 'Campaña de inspección de tableros y apoyos, nivelación topográfica de control, modelado estructural conforme al Eurocódigo y análisis del proyecto y de la dirección de obra para deslindar responsabilidades (LOE art. 17).',
    dictamen: 'El dictamen acreditó el origen del asiento, lo distinguió de fenómenos térmicos y de retracción, y delimitó la responsabilidad entre proyecto y ejecución con base en la documentación contractual.',
    resultadoNarr: 'El informe sustenta la posición técnica de la administración en el procedimiento contencioso-administrativo, actualmente en curso.',
    norm: ['CTE DB-SE', 'Eurocódigo 2', 'Hormigón pretensado', 'LOE art. 17'] },
  { slug: 'envolvente-120-viviendas', resultado: 'Resolución favorable',
    cliente: 'Comunidad de propietarios', plazo: '75 días', jurisdiccion: 'Civil · Barcelona',
    encargo: 'Una comunidad de 120 viviendas detectó patologías generalizadas de envolvente —fachada ventilada, cubierta y carpinterías— y necesitaba dictamen para reclamar a la promotora dentro de los plazos de la LOE.',
    instruccion: 'Inspección por muestreo estadístico de viviendas y zonas comunes, ensayos de estanqueidad en carpinterías, termografía de fachada y cubierta, y contraste con la memoria de calidades del proyecto.',
    dictamen: 'El dictamen acreditó defectos sistemáticos de ejecución frente al proyecto y la lex artis, cuantificó la reparación íntegra y los situó dentro de los plazos de garantía de la LOE.',
    resultadoNarr: 'La reclamación se resolvió favorablemente para la comunidad, con asunción de la reparación por la promotora.',
    norm: ['LOE art. 17', 'CTE DB-HS', 'Fachada ventilada', 'Memoria de calidades'] },
  { slug: 'filtracion-cubierta-plurifamiliar', resultado: 'Acuerdo extrajudicial',
    cliente: 'Comunidad · Granollers', plazo: '40 días', jurisdiccion: 'Extrajudicial',
    encargo: 'Filtraciones recurrentes por cubierta en un edificio plurifamiliar, con reparaciones previas fallidas. Se requería localizar el origen y delimitar responsabilidad frente a la constructora.',
    instruccion: 'Termografía de cubierta, pruebas de estanqueidad dirigidas e higrometría de profundidad en las viviendas afectadas, conforme al CTE DB-HS 1.',
    dictamen: 'El dictamen localizó el origen en la ejecución defectuosa de un encuentro de cubierta y acreditó que las reparaciones previas no habían atacado la causa.',
    resultadoNarr: 'La constructora asumió la reparación íntegra en fase extrajudicial, sin necesidad de procedimiento judicial.',
    norm: ['CTE DB-HS 1', 'Termografía infrarroja', 'Prueba de estanqueidad'] },
  { slug: 'reforma-local-incumplimientos', resultado: 'Acuerdo en mediación',
    cliente: 'Despacho de abogados', plazo: '30 días', jurisdiccion: 'Mediación · BCN',
    encargo: 'Un despacho de abogados encargó dictamen sobre una reforma de local con partidas presupuestadas no ejecutadas y materiales inferiores a los pactados.',
    instruccion: 'Contraste partida a partida de lo ejecutado frente a contrato, presupuesto y memoria de calidades; cuantificación del importe de los incumplimientos conforme a la lex artis.',
    dictamen: 'El dictamen identificó las partidas no ejecutadas y las sustituciones de material por debajo de lo contratado, con valoración económica detallada.',
    resultadoNarr: 'El informe sirvió de base técnica al acuerdo alcanzado en mediación entre las partes.',
    norm: ['Lex artis', 'Memoria de calidades', 'Incumplimiento contractual'] },
  { slug: 'contrainforme-colapso-forjado', resultado: 'Ratificado en juicio oral',
    cliente: 'Parte en litigio', plazo: '20 días', jurisdiccion: 'Civil · Valencia',
    encargo: 'Refutación del dictamen presentado por la aseguradora en un procedimiento por colapso de forjado, con plazo procesal próximo.',
    instruccion: 'Auditoría metodológica del informe contrario: suficiencia de la inspección, corrección de las referencias normativas, coherencia entre datos y conclusiones y justificación de la cuantificación.',
    dictamen: 'El contrainforme expuso carencias metodológicas determinantes en el dictamen de la aseguradora y demostró la insuficiencia de su base probatoria.',
    resultadoNarr: 'El contrainforme fue ratificado en juicio oral; las carencias del dictamen contrario quedaron acreditadas en interrogatorio cruzado.',
    norm: ['LEC art. 348', 'Sana crítica', 'Refutación técnica'] },
];

function casoBySlug(slug) {
  const i = CASE_DETAIL.findIndex((d) => d.slug === slug);
  if (i < 0) return null;
  return { ...CASOS[i], ...CASE_DETAIL[i], idx: i };
}
function imgFor(cat) {
  const m = { 'Humedades': 'Termografía · humedades', 'Vicios ocultos': 'Inspección de vivienda', 'Estructura': 'Diagnóstico estructural', 'Pericia judicial': 'Dictamen pericial', 'Seguros': 'Peritaje de siniestro' };
  return m[cat] || 'Inspección técnica';
}

/* ── ARTICLE CARD ─────────────────────────────────────────── */
function ArtCard({ a, go }) {
  const [h, setH] = React.useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => go('post-' + a.slug)}
      style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', width: '100%' }}>
      <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        <div style={{ transform: h ? 'scale(1.03)' : 'none', transition: 'transform var(--dur-slow) var(--ease-out)' }}>
          <Placeholder label={imgFor(a.cat)} ratio="3 / 2" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '18px', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>{a.cat}</span>
        <span style={{ color: 'var(--text-faint)' }}>·</span>
        <span style={{ color: 'var(--text-faint)' }}>{a.read}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.32rem', fontWeight: 400, lineHeight: 1.2, color: h ? 'var(--text-accent)' : 'var(--text-strong)', margin: '10px 0 0', transition: 'color var(--dur-fast)' }}>{a.t}</h3>
      <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.lede}</p>
      <div style={{ marginTop: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{a.date}</div>
    </button>
  );
}

/* ── BITÁCORA (blog index) ────────────────────────────────── */
const CATS = ['Todos', 'Humedades', 'Vicios ocultos', 'Estructura', 'Pericia judicial'];
function Bitacora({ go, open }) {
  const [cat, setCat] = React.useState('Todos');
  const list = cat === 'Todos' ? ARTICLES : ARTICLES.filter((a) => a.cat === cat);
  const feat = list[0];
  const rest = list.slice(1);
  return (<>
    <PageHero go={go} trail={[{ label: 'Inicio', go: 'home' }, { label: 'Bitácora' }]}
      title="Criterio técnico,<br/>en abierto"
      lede="Notas periciales sobre patología de la edificación y obra civil. Para el particular que quiere entender su problema antes de actuar, y para el profesional que busca rigor metodológico." />

    <section style={{ ...wrap, paddingBottom: 'var(--space-10)' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-6)' }}>
        {CATS.map((c) => {
          const on = c === cat;
          return (
            <button key={c} onClick={() => setCat(c)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
                background: on ? 'var(--surface-ink)' : 'transparent', color: on ? 'var(--bone-100)' : 'var(--text-muted)',
                border: '1px solid ' + (on ? 'var(--surface-ink)' : 'var(--border-subtle)'), transition: 'all var(--dur-fast)' }}>{c}</button>
          );
        })}
      </div>
    </section>

    {feat && (
      <section style={{ ...wrap, paddingBottom: 'var(--space-16)' }}>
        <Reveal>
          <button onClick={() => go('post-' + feat.slug)} className="bit-feat"
            style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 'clamp(28px,4vw,56px)', alignItems: 'center', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}>
            <Placeholder label={imgFor(feat.cat)} ratio="4 / 3" seal />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>Destacado</span>
                <span style={{ color: 'var(--text-faint)' }}>·</span>
                <span style={{ color: 'var(--text-faint)' }}>{feat.cat}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.7rem,3vw,2.4rem)', fontWeight: 400, lineHeight: 1.12, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: '16px 0 0' }}>{feat.t}</h2>
              <p style={{ margin: '16px 0 0', fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '52ch' }}>{feat.lede}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                <span>{feat.date}</span><span>·</span><span>{feat.read} de lectura</span>
              </div>
              <div style={{ marginTop: '22px', display: 'inline-flex', alignItems: 'center', gap: '9px', color: 'var(--text-accent)', fontWeight: 500, fontSize: '0.95rem' }}>Leer el artículo <Icon name="arrow-right" size={16} /></div>
            </div>
          </button>
        </Reveal>
      </section>
    )}

    {rest.length > 0 && (
      <section style={{ ...sec, paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(28px,3vw,44px)' }} className="three-col">
          {rest.map((a, i) => <Reveal key={a.slug} delay={i * 60}><ArtCard a={a} go={go} /></Reveal>)}
        </div>
      </section>
    )}

    <BandCTA tone="tint" eyebrow="§ Consulta" title="¿Su caso se parece a alguno de estos?"
      lede="Una primera valoración técnica, sin coste y sin compromiso. Respondemos en 24 horas laborables."
      btn="Plantear mi caso" onClick={open} />
  </>);
}

/* ── ARTICLE BODY RENDERER ────────────────────────────────── */
function Prose({ blocks }) {
  return (
    <div>
      {blocks.map(([type, txt], i) => {
        if (type === 'h') return <h2 key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-strong)', margin: '38px 0 0', lineHeight: 1.2 }}>{txt}</h2>;
        if (type === 'quote') return (
          <blockquote key={i} style={{ margin: '34px 0', padding: '6px 0 6px 26px', borderLeft: '3px solid var(--accent)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.32rem', lineHeight: 1.4, color: 'var(--text-strong)' }}>{txt}</blockquote>
        );
        return <p key={i} style={{ margin: '18px 0 0', fontSize: '1.06rem', lineHeight: 1.72, color: 'var(--text-body)' }} dangerouslySetInnerHTML={{ __html: txt }} />;
      })}
    </div>
  );
}

function AuthorBio() {
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: 'var(--space-12)', padding: 'var(--space-6)', background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ width: '74px', height: '74px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-subtle)' }}>
        <Placeholder label="Albert Vilardell" ratio="1 / 1" style={{ borderRadius: 0, border: 'none', height: '100%' }} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-accent)', marginBottom: '5px' }}>El autor</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', color: 'var(--text-strong)' }}>Albert Vilardell Serra</div>
        <p style={{ margin: '5px 0 0', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, maxWidth: '54ch' }}>Ingeniero Civil colegiado (ECCAT nº 16448), perito judicial especializado en construcción y perito de seguros IRD. Diecisiete años redactando dictámenes que se sostienen ante el juez.</p>
      </div>
    </div>
  );
}

/* ── POST (article detail) ────────────────────────────────── */
function Post({ article, go, open }) {
  const a = article;
  const related = ARTICLES.filter((x) => x.slug !== a.slug && x.cat === a.cat).slice(0, 2);
  const more = related.length < 2 ? ARTICLES.filter((x) => x.slug !== a.slug && !related.includes(x)).slice(0, 2 - related.length) : [];
  const rel = [...related, ...more];
  return (<>
    <article>
      <section style={{ maxWidth: '820px', margin: '0 auto', padding: 'clamp(36px,6vw,72px) var(--gutter) 0' }}>
        <Breadcrumb go={go} trail={[{ label: 'Inicio', go: 'home' }, { label: 'Bitácora', go: 'bitacora' }, { label: a.cat }]} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'var(--space-8)', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>{a.cat}</span>
          <span style={{ color: 'var(--text-faint)' }}>·</span>
          <span style={{ color: 'var(--text-faint)' }}>{a.aud}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: '16px 0 0' }}>{a.t}</h1>
        <p style={{ margin: '20px 0 0', fontSize: 'var(--fs-lede)', lineHeight: 'var(--lh-lede)', color: 'var(--text-muted)' }}>{a.lede}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-hairline)' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-subtle)' }}>
            <Placeholder label="Albert Vilardell" ratio="1 / 1" style={{ borderRadius: 0, border: 'none', height: '100%' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-strong)' }}>Albert Vilardell Serra</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: '2px' }}>{a.date} · {a.read} de lectura</div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1040px', margin: '0 auto', padding: 'var(--space-10) var(--gutter) 0' }}>
        <Placeholder label={imgFor(a.cat)} ratio="21 / 9" />
      </section>

      <section style={{ maxWidth: '1040px', margin: '0 auto', padding: 'var(--space-12) var(--gutter) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }} className="post-grid">
          <div style={{ maxWidth: '680px' }}>
            <Prose blocks={a.body} />
            <AuthorBio />
          </div>
          <aside className="post-aside">
            <div style={{ position: 'sticky', top: '92px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '22px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '14px' }}>Referencias</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {a.norm.map((n) => (
                    <div key={n} style={{ display: 'flex', gap: '9px', alignItems: 'baseline', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-body)' }}>
                      <span style={{ color: 'var(--text-accent)' }}>§</span>{n}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '22px', borderRadius: 'var(--radius-md)', background: 'var(--surface-ink)', color: 'var(--bone-100)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--bone-100)' }}>¿Le afecta a usted?</div>
                <p style={{ margin: '10px 0 16px', fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--text-on-dark-muted)' }}>Una primera valoración técnica sin coste. Respondemos en 24 h laborables.</p>
                <WB variant="primary" fullWidth onClick={open} iconRight={<Icon name="arrow-right" size={15} />}>Plantear mi caso</WB>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </article>

    {rel.length > 0 && (
      <section style={{ ...sec, marginTop: 'var(--space-12)', borderTop: '1px solid var(--border-hairline)' }}>
        <SecHead eyebrow="§ Seguir leyendo" title="Notas relacionadas" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(28px,4vw,56px)', marginTop: 'var(--space-8)' }} className="two-col">
          {rel.map((x) => <ArtCard key={x.slug} a={x} go={go} />)}
        </div>
      </section>
    )}
  </>);
}

/* ── CASO DETALLE (case-study detail) ─────────────────────── */
function FactCell({ k, v }) {
  return (
    <div className="method-cell" style={{ padding: '0 24px', borderRight: '1px solid var(--border-hairline)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '8px' }}>{k}</div>
      <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.3 }}>{v}</div>
    </div>
  );
}
function Phase({ n, title, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '54px 1fr', gap: '20px', paddingTop: 'var(--space-8)' }} className="phase-row">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-accent)', fontWeight: 600, paddingTop: '4px' }}>{n}</div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text-strong)', margin: 0 }}>{title}</h3>
        <p style={{ margin: '12px 0 0', fontSize: '1.04rem', lineHeight: 1.7, color: 'var(--text-body)', maxWidth: '62ch' }}>{children}</p>
      </div>
    </div>
  );
}
function CasoDetalle({ caso, go, open }) {
  const c = caso;
  const rel = CASE_DETAIL.map((d, i) => ({ ...CASOS[i], ...d, idx: i })).filter((x) => x.idx !== c.idx).slice(0, 3);
  return (<>
    <section style={{ ...wrap, paddingTop: 'clamp(36px,6vw,84px)', paddingBottom: 'var(--space-10)' }}>
      <Breadcrumb go={go} trail={[{ label: 'Inicio', go: 'home' }, { label: 'Casos', go: 'casos' }, { label: c.tag }]} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(24px,4vw,56px)', alignItems: 'end', marginTop: 'var(--space-8)' }} className="pagehero-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <WTag variant="solid" size="sm">{c.tag}</WTag>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-accent)', fontWeight: 600 }}>
              <Icon name="badge-check" size={15} color="var(--accent)" />{c.resultado}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3.1rem)', fontWeight: 400, lineHeight: 1.08, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: 0 }}>{c.t}</h1>
          <p style={{ margin: '20px 0 0', fontSize: 'var(--fs-lede)', lineHeight: 'var(--lh-lede)', color: 'var(--text-muted)', maxWidth: '58ch' }}>{c.encargo}</p>
        </div>
        <div style={{ textAlign: 'right' }} className="caso-imp">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '6px' }}>Importe peritado</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.6rem,5vw,3.6rem)', color: 'var(--text-strong)', lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{c.imp}</div>
        </div>
      </div>
    </section>

    {/* facts strip */}
    <section style={wrap}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', padding: 'var(--space-6) 0', borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)' }} className="method-grid">
        <FactCell k="Cliente" v={c.cliente} />
        <FactCell k="Plazo de entrega" v={c.plazo} />
        <FactCell k="Jurisdicción" v={c.jurisdiccion} />
        <FactCell k="Resultado" v={c.resultado} />
      </div>
    </section>

    <section style={{ maxWidth: '1040px', margin: '0 auto', padding: 'var(--space-10) var(--gutter) 0' }}>
      <Placeholder label={imgFor(c.tag)} ratio="21 / 9" seal />
    </section>

    {/* narrative */}
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-12) var(--gutter) 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-accent)', fontWeight: 600 }}>§ El caso, paso a paso</div>
      <div style={{ marginTop: 'var(--space-4)' }}>
        <Phase n="01" title="El encargo">{c.encargo}</Phase>
        <Phase n="02" title="La instrucción técnica">{c.instruccion}</Phase>
        <Phase n="03" title="El dictamen">{c.dictamen}</Phase>
        <Phase n="04" title="El resultado">{c.resultadoNarr}</Phase>
      </div>

      {/* normativa aplicada */}
      <div style={{ marginTop: 'var(--space-12)', padding: 'var(--space-6)', background: 'var(--surface-tint)', borderRadius: 'var(--radius-md)', border: '1px solid var(--oxide-200)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-accent)', marginBottom: '14px' }}>Normativa y técnica aplicada</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {c.norm.map((n) => <WTag key={n} variant="outline" size="sm">{n}</WTag>)}
        </div>
      </div>
    </section>

    {/* related cases */}
    <section style={{ ...sec, marginTop: 'var(--space-12)' }}>
      <SecHead eyebrow="§ Otros casos" title="Casos relacionados"
        right={<WB variant="ghost" onClick={() => go('casos')} iconRight={<Icon name="arrow-right" size={16} />}>Ver todos los casos</WB>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(20px,2.5vw,32px)', marginTop: 'var(--space-8)' }} className="three-col">
        {rel.map((x) => (
          <button key={x.slug} onClick={() => go('caso-' + x.slug)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
            <CaseCard c={x} />
          </button>
        ))}
      </div>
    </section>

    <BandCTA tone="ink" eyebrow="§ Su caso" title="¿Tiene un caso de cuantía relevante?"
      lede="Briefing técnico con letrado o director de siniestros. Análisis previo de viabilidad sin coste, honorarios fijos por escrito."
      btn="Plantear el caso" onClick={open} />
  </>);
}

Object.assign(window, { ARTICLES, CASE_DETAIL, casoBySlug, Bitacora, Post, CasoDetalle });
})();
