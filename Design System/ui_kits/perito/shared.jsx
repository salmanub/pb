/* global React */
/* ════════════════════════════════════════════════════════════════
   PERITO.BARCELONA — versión definitiva, mejorada sobre el sistema.
   shared.jsx — datos + piezas compartidas (Nav, Footer, Ticker,
   Band, Qual, PHero, Icon, filas de servicio).
   Re-skin teal/ámbar + Playfair/DM Sans/JetBrains aplicado por tokens
   en index.html; aquí se consumen los componentes del sistema.
   ════════════════════════════════════════════════════════════════ */
const PDS = window.VilardellPeritajeForenseDesignSystem_58f0b0;
const { Button: PB, Tag: PTag, Seal: PSeal, Stat: PStat, Accordion: PAcc } = PDS;

/* ── Icono (Lucide inline, recolor por currentColor) ── */
function PIcon({ name, size = 18, color = 'currentColor', strokeWidth = 1.7, style = {} }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const i = document.createElement('i'); i.setAttribute('data-lucide', name);
      ref.current.appendChild(i);
      window.lucide.createIcons({ attrs: { width: size, height: size, 'stroke-width': strokeWidth } });
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} style={{ display: 'inline-flex', color, ...style }} aria-hidden="true" />;
}

/* ── Imagen de stock con fallback fiable (picsum) — nunca rota ──
   Avanza al siguiente origen ante error O si no carga en ~2.6s
   (algunas URLs de stock quedan colgadas sin disparar onError). */
function Img({ srcs = [], seed = 'p', w = 1200, h = 900, alt = '', treat = true, style = {} }) {
  const list = [...srcs, `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`];
  const [i, setI] = React.useState(0);
  const loaded = React.useRef(false);
  const adv = () => { if (!loaded.current) setI((x) => Math.min(x + 1, list.length - 1)); };
  React.useEffect(() => {
    loaded.current = false;
    const t = setTimeout(adv, 2600);
    return () => clearTimeout(t);
  }, [i]);
  return (
    <img src={list[i]} alt={alt}
      onLoad={() => { loaded.current = true; }}
      onError={() => setI((x) => Math.min(x + 1, list.length - 1))}
      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', filter: treat ? 'grayscale(0.12) contrast(1.02)' : 'none', ...style }} />
  );
}

/* ── DATOS (contenido del cliente, conservado) ──────────── */
const SVCS = [
  { slug: 'informe-de-parte', num: 'EXP·01', tag: 'Litigación civil', t: 'Informe Pericial de Parte', norm: 'LEC art. 335', audience: 'pro',
    desc: 'Dictamen encargado por una de las partes para fundamentar su postura en negociación, mediación o demanda. Plena validez probatoria.',
    lsi: ['LEC art. 335', 'Dictamen técnico', 'Ratificación de parte', 'Procedimiento civil', 'Prueba pericial'],
    body: [['Su argumento técnico en una disputa', 'En cualquier litigio, la parte que presenta los argumentos técnicos más sólidos tiene ventaja decisiva. Un <b>informe pericial de parte</b> es un dictamen encargado por usted para investigar la realidad técnica de los hechos y defender su postura con objetividad y rigor.'], ['Cuándo es esencial', '<b>Antes de una demanda</b> — para evaluar la solidez técnica de la reclamación. <b>Durante una negociación</b> — un informe contundente fuerza acuerdos favorables sin juicio. <b>Como prueba</b> conforme a la LEC. <b>Para refutar</b> el dictamen de la parte contraria mediante un contrainforme.']],
    faqs: [['¿Tiene validez en un juicio?', 'Sí. Es un medio de prueba reconocido por la LEC (arts. 335 y ss.) y puede defenderse como prueba pericial ante el juez.'], ['¿Diferencia con el dictamen judicial?', 'El de parte lo encarga usted o su letrado; el judicial lo designa el juzgado. La metodología es idéntica.']] },
  { slug: 'perito-judicial', num: 'EXP·02', tag: 'Designación judicial', t: 'Actuación como Perito Judicial', norm: 'LEC art. 347', audience: 'pro',
    desc: 'Por designación del juzgado o de parte. Imparcialidad acreditada y defensa oral solvente ante interrogatorio cruzado.',
    lsi: ['Designación judicial', 'Lista de peritos', 'LEC art. 347', 'Tacha de peritos', 'Ratificación en sala'],
    body: [['Actuación en sede judicial', 'La figura del perito judicial exige tres condiciones: conocimiento técnico acreditado, inscripción en la lista oficial del Ministerio de Justicia y capacidad de defender el dictamen verbalmente ante el juez y los letrados de ambas partes.'], ['Ratificación e interrogatorio cruzado', 'La ratificación oral es parte integrante del servicio. La solidez de esa defensa es determinante para el peso que el juez otorga al dictamen. <b>Honorarios de ratificación incluidos sin sobrecoste.</b>']],
    faqs: [['¿Cómo se designa al perito judicial?', 'Por sorteo entre los inscritos en la lista oficial del Ministerio de Justicia, o por acuerdo de las partes (LEC art. 339).'], ['¿Puede impugnarse el dictamen?', 'Las partes pueden tachar al perito o impugnar el dictamen (LEC art. 343). La solvencia del informe es la mejor defensa.']] },
  { slug: 'patologias-estructurales', num: 'EXP·03', tag: 'Diagnóstico estructural', t: 'Patologías Estructurales', norm: 'CTE DB-SE · EHE-08', audience: 'mix',
    desc: 'Grietas activas, fisuras en forjados, asientos diferenciales y deformaciones críticas. Modelado FEM y ensayos in situ.',
    lsi: ['CTE DB-SE', 'EHE-08', 'Grietas activas', 'Asiento diferencial', 'Cálculo estructural', 'Modelado FEM'],
    body: [['Diagnóstico de patologías estructurales', 'Una patología estructural es cualquier alteración de los elementos portantes que afecte a la capacidad resistente o a la estabilidad. El diagnóstico correcto es el punto de partida de cualquier intervención técnica o reclamación jurídica.'], ['Metodología', 'Inspección visual y cartografía de fisuras · testigos de yeso y ensayos no destructivos · modelado estructural conforme al Eurocódigo 2 y CTE DB-SE · diagnóstico con origen, gravedad y cuantificación. El dictamen diferencia responsabilidades: proyecto, dirección de obra o ejecución (LOE art. 17).']],
    faqs: [['¿Todas las grietas son estructurales?', 'No. Pueden ser térmicas, de retracción, de asiento o de fatiga. La determinación del origen requiere análisis de geometría, apertura, disposición y evolución.'], ['¿Cuándo es urgente actuar?', 'Cuando la grieta es activa, afecta a elementos portantes, supera 1 mm con disposición diagonal o hay deformación perceptible.']] },
  { slug: 'humedades-filtraciones', num: 'EXP·04', tag: 'Patología hídrica', t: 'Humedades y Filtraciones', norm: 'CTE DB-HS', audience: 'particular',
    desc: 'Detección no destructiva del origen mediante termografía infrarroja y pruebas de estanqueidad. Dictamen para reclamar a constructora, comunidad o aseguradora.',
    lsi: ['Termografía infrarroja', 'CTE DB-HS', 'Capilaridad ascendente', 'Condensación', 'Prueba de estanqueidad', 'Perito humedades Barcelona'],
    body: [['El síntoma no es el origen', 'La mancha visible rara vez indica el origen exacto del agua. El diagnóstico con metodología no destructiva — termografía infrarroja, higrómetros de profundidad, pruebas de estanqueidad — localiza el origen sin abrir obra. <b>Si ha pagado reparaciones que no han funcionado</b>, lo más probable es que se haya tratado el síntoma sin haber identificado la causa.'], ['Tipos de humedad', 'Capilaridad ascendente desde el terreno · filtración por cubierta o terraza (CTE DB-HS 1) · filtración por fachada o carpinterías · condensación superficial o intersticial · daños por instalaciones. El dictamen establece el origen, cuantifica los daños y delimita responsabilidades: constructora, comunidad de propietarios o cobertura de la póliza.']],
    faqs: [['¿La termografía basta para localizar el origen?', 'Es la herramienta de detección no destructiva principal, complementada con higrómetros de profundidad y análisis del detalle constructivo.'], ['¿Sirve para reclamar al seguro?', 'Sí. El dictamen delimita si el origen corresponde a la constructora, a la comunidad o está cubierto por la póliza.']] },
  { slug: 'vicios-ocultos', num: 'EXP·05', tag: 'Compraventa inmobiliaria', t: 'Vicios Ocultos', norm: 'CC art. 1484', audience: 'particular',
    desc: 'Defectos graves no aparentes en la compraventa. Acreditación de preexistencia dentro del plazo de saneamiento de 6 meses.',
    lsi: ['Código Civil art. 1484', 'Defectos no aparentes', 'Plazo de saneamiento', 'Preexistencia', 'Acción redhibitoria'],
    body: [['Qué son los vicios ocultos', 'Defectos graves no aparentes en la compraventa que impiden el uso adecuado del bien. Regulados en el CC arts. 1484 y ss.: derecho a rescindir (acción redhibitoria) o reducir el precio (acción estimatoria). Deben ser graves, anteriores a la venta y desconocidos por el comprador.'], ['El plazo de 6 meses', 'El CC art. 1490 establece 6 meses desde la entrega para ejercitar las acciones. El informe pericial debe obtenerse dentro de ese plazo para acreditar técnicamente existencia, gravedad y preexistencia del defecto. <b>Si acaba de detectar el problema, el tiempo corre en su contra: contacte cuanto antes.</b>']],
    faqs: [['¿Qué plazo tengo para reclamar?', '6 meses desde la entrega del inmueble (CC art. 1490). Es imprescindible actuar dentro de ese plazo.'], ['¿Cómo se demuestra que el defecto es anterior a la compra?', 'Mediante el análisis técnico del grado de desarrollo de la patología: la antigüedad de una humedad o la evolución de una fisura permiten acreditar la preexistencia.']] },
  { slug: 'reclamacion-mala-ejecucion', num: 'EXP·06', tag: 'Incumplimiento contractual', t: 'Mala Ejecución de Obra', norm: 'LOE art. 17', audience: 'mix',
    desc: 'Contraste objetivo de la obra frente a contrato, memoria de calidades y lex artis. Cuantificación de incumplimientos.',
    lsi: ['LOE art. 17', 'Memoria de calidades', 'Lex artis', 'Partidas no ejecutadas', 'Subsanación'],
    body: [['Cuando el resultado no es el pactado', 'Acabados deficientes, materiales inferiores a los acordados, partidas cobradas y no ejecutadas. El peritaje contrasta lo ejecutado con el contrato, el presupuesto, la memoria de calidades y la buena práctica constructiva (<b>lex artis</b>).'], ['El proceso de reclamación', '<b>1 · Reclamación amistosa:</b> un dictamen profesional suele bastar para que la constructora subsane. <b>2 · Mediación</b> con base técnica. <b>3 · Vía judicial:</b> el informe es la prueba pericial clave. Ratificación incluida.']],
    faqs: [['¿Qué plazos establece la LOE?', '1 año para defectos de acabado, 3 años para habitabilidad, 10 años para defectos estructurales, desde la recepción de la obra (LOE art. 17).'], ['¿Necesito informe para reclamar?', 'No es obligatorio en fase extrajudicial, pero es la herramienta más efectiva para que la empresa acepte subsanar sin juicio.']] },
  { slug: 'contrainforme-pericial', num: 'EXP·07', tag: 'Análisis crítico', t: 'Contrainforme Pericial', norm: 'LEC art. 348', audience: 'pro',
    desc: 'Detección de carencias metodológicas y refutación técnica de dictámenes presentados por la parte contraria.',
    lsi: ['Refutación técnica', 'Carencias metodológicas', 'Pericial contraria', 'Sana crítica', 'Juicio oral'],
    body: [['Desmontar el argumento contrario', 'El contrainforme no elabora un nuevo dictamen sobre la patología: demuestra que las conclusiones del dictamen contrario son <b>incorrectas, incompletas o metodológicamente deficientes</b>.'], ['Qué se analiza', 'Rigor metodológico de la inspección · corrección de las referencias normativas (CTE, EHE-08, LOE) · coherencia entre datos y conclusiones · corrección de la cuantificación económica. Un juez que no puede fiarse del perito contrario da mayor crédito al dictamen que sí demuestra solidez.']],
    faqs: [['¿Puede el juez rechazar un informe pericial?', 'Valora libremente su fuerza probatoria conforme a la sana crítica (LEC art. 348). Un contrainforme sólido merma el peso del dictamen contrario.'], ['¿Cuánto se tarda?', 'Entre 10 y 20 días hábiles desde la recepción del informe a refutar. Acelerable con plazo procesal próximo.']] },
  { slug: 'naves-industriales', num: 'EXP·08', tag: 'Industrial · B2B', t: 'Naves Industriales', norm: 'RSCIEI · TR-34', audience: 'pro',
    desc: 'Pavimentos logísticos, estructuras metálicas, daños post-alquiler y cumplimiento RSCIEI. Para aseguradoras y operadores.',
    lsi: ['RSCIEI', 'Pavimentos logísticos', 'Daños post-alquiler', 'Estructura metálica', 'TR-34', 'Siniestro industrial'],
    body: [['Peritaje especializado industrial', 'Las naves logísticas tienen normativa propia. Principales disputas: <b>daños post-alquiler, siniestros de incendio, fallos en pavimentos y cumplimiento RSCIEI</b>.'], ['Pavimentos logísticos e incendios', 'Fisuras por retracción o asiento de solera · planitud insuficiente para equipos VNA · juntas mal ejecutadas. Tolerancias conforme a la norma TR-34. En incendios: causa y origen, daño a estructura metálica y verificación del cumplimiento RSCIEI en el momento del siniestro.']],
    faqs: [['¿Qué es el RSCIEI?', 'El Reglamento de Seguridad Contra Incendios en Establecimientos Industriales (RD 2267/2004). Su incumplimiento es causa frecuente de conflicto.'], ['¿Qué es un dictamen post-alquiler?', 'Determina qué daños son uso normal (arrendador) y cuáles imputables al arrendatario por uso indebido o modificaciones no autorizadas.']] },
];

const CASOS = [
  { tag: 'Siniestro de incendio', imp: '1,2 M€', t: 'Incendio estructural en nave logística', d: 'Causa, origen y extensión en 8.000 m². Cuantificación para aseguradora nacional. Ratificado en juzgado.', pills: ['Aseguradora', '90 días', 'Ratificado'] },
  { tag: 'Obra civil', imp: '2,8 M€', t: 'Asiento diferencial en puente de vía rápida', d: 'Patologías en hormigón pretensado. Contencioso-administrativo contra constructora.', pills: ['AAPP', 'Litigio C-A', 'Barcelona'] },
  { tag: 'Vicios ocultos', imp: '680 K€', t: 'Patologías de envolvente en 120 viviendas', d: 'Fachada ventilada, cubierta y carpinterías. Comunidad contra promotora. Resolución favorable.', pills: ['Comunidad', '2024', 'Barcelona'] },
  { tag: 'Humedades', imp: '340 K€', t: 'Filtración por cubierta en plurifamiliar', d: 'Termografía. CTE DB-HS. Reparación íntegra a cargo de la constructora.', pills: ['Extrajudicial', 'Granollers'] },
  { tag: 'Mala ejecución', imp: '430 K€', t: 'Incumplimientos en reforma de local', d: 'Partidas no ejecutadas y materiales inferiores a memoria de calidades.', pills: ['Despacho', 'Mediación', 'BCN'] },
  { tag: 'Contrainforme', imp: '920 K€', t: 'Refutación en colapso de forjado', d: 'Carencias metodológicas en el informe de la aseguradora. Ratificación en juicio oral.', pills: ['Juicio oral', 'Valencia'] },
];
const TESTI = [
  { q: 'Su dictamen fue la base de toda nuestra estrategia de negociación. Tan claro y contundente que logramos acuerdo sin ir a juicio.', a: 'Socio de Área', r: 'Despacho de construcción · Madrid' },
  { q: 'Valoro la disponibilidad para ratificar en sala sin demoras y el rigor metodológico del informe.', a: 'Directora de Siniestros', r: 'Aseguradora multinacional · Barcelona' },
  { q: 'El informe de due diligence identificó contingencias que no habíamos previsto. Se amortizó muchas veces.', a: 'Director de Inversiones', r: 'Family Office · Barcelona' },
];
const FAQS_HOME = [
  ['¿En qué territorios operan?', 'Sede en Barcelona con operativa en toda España. Desplazamiento a cualquier punto en 24–48h.'],
  ['¿Importe mínimo de encargo?', 'No existe mínimo, pero el encargo es óptimo a partir de 50.000 € en disputa.'],
  ['¿La ratificación en sala está incluida?', 'Sí. Ratificación e interrogatorio cruzado incluidos en honorarios sin sobrecoste.'],
  ['¿Plazo de entrega del dictamen?', 'Entre 20 y 45 días hábiles desde la inspección. Plazo por escrito, garantizado contractualmente.'],
  ['¿Perito de parte y perito judicial?', 'Ambos, nunca en el mismo caso.'],
];
const PROTO = [
  { n: 'FASE 01', t: 'Briefing técnico', d: 'Reunión de instrucción con letrado o director de siniestros. Análisis previo de viabilidad sin coste.' },
  { n: 'FASE 02', t: 'Propuesta cerrada', d: 'Alcance definido, honorarios fijos y fecha de entrega comprometida por escrito. Sin variables.' },
  { n: 'FASE 03', t: 'Instrucción y dictamen', d: 'Inspección, análisis, redacción y revisión interna. Formato técnico-jurídico listo para aportación.' },
  { n: 'FASE 04', t: 'Ratificación incluida', d: 'Ratificación en sala e interrogatorio cruzado incluidos en honorarios. Sin sobrecoste.' },
];
const TICK = ['Informe de Parte', 'Perito Judicial', 'Patologías Estructurales', 'Humedades', 'Vicios Ocultos', 'Mala Ejecución', 'Contrainforme', 'Naves Industriales', 'CTE DB-SE', 'CTE DB-HS', 'LOE art. 17', 'LEC art. 347', 'RSCIEI', 'ECCAT nº 16448', 'Toda España'];

const INTAKE = [
  { key: 'tipo', eyebrow: 'Consulta · 01 / 05', type: 'choice', question: '¿Qué tipo de asunto desea consultar?', helper: 'Seleccione la categoría de su caso.',
    options: ['Informe pericial de parte', 'Actuación como perito judicial', 'Patologías o daños estructurales', 'Humedades y filtraciones', 'Vicios ocultos en compraventa', 'Mala ejecución de obra', 'Contrainforme pericial', 'Nave industrial o logística', 'Obra pública', 'Otro'] },
  { key: 'desc', eyebrow: 'Consulta · 02 / 05', type: 'fields', question: 'Describa brevemente el caso', helper: 'Tipo de inmueble, patología, fase del procedimiento.',
    fields: [{ name: 'desc', label: 'El caso', multiline: true, rows: 4, placeholder: 'Ej. edificio residencial con fisuras en forjado, fase previa a demanda…' }] },
  { key: 'imp', eyebrow: 'Consulta · 03 / 05', type: 'choice', question: '¿Importe estimado en disputa?', helper: 'Orientativo — para asignar el equipo adecuado.',
    options: ['Menos de 50.000 €', '50.000 – 200.000 €', '200.000 – 1.000.000 €', 'Más de 1.000.000 €', 'No determinado'] },
  { key: 'legal', eyebrow: 'Consulta · 04 / 05', type: 'choice', question: '¿Existe representación legal o procedimiento?',
    options: ['Sí, hay letrado / despacho', 'Sí, procedimiento judicial abierto', 'No aún — fase previa', 'No aplicable'] },
  { key: 'con', eyebrow: 'Consulta · 05 / 05', type: 'fields', question: '¿Con quién contactamos?', helper: 'Respuesta en menos de 24 horas laborables.',
    fields: [
      { name: 'nombre', label: 'Nombre y apellidos', placeholder: 'Nombre y apellidos' },
      { name: 'empresa', label: 'Empresa / Despacho', optional: true, placeholder: 'Empresa o despacho' },
      { name: 'email', label: 'Email profesional', type: 'email', placeholder: 'nombre@empresa.com' },
      { name: 'tel', label: 'Teléfono', type: 'tel', optional: true, placeholder: '+34 ___ ___ ___' },
    ] },
];

/* ── PIEZAS COMPARTIDAS ─────────────────────────────────── */
const Ticker = () => (
  <div className="ticker" aria-hidden="true"><div className="ti tick">{[...TICK, ...TICK].map((t, i) => <div key={i} className="tit"><span className="dot" />{t}</div>)}</div></div>
);

const Band = ({ h, em, s, btn, open, amber }) => (
  <div className={'cta-band' + (amber ? ' amber' : '')}>
    <h2 className="cta-h">{h}{em && <><br /><em>{em}</em></>}</h2>
    {s && <div className="cta-s">{s}</div>}
    <PB variant="on-dark" size="lg" onClick={open} style={{ background: '#fff', color: amber ? 'var(--amber-600)' : 'var(--accent-press)' }}>{btn || 'Consultar caso'}</PB>
  </div>
);

const Faq = ({ items }) => <PAcc defaultOpen={-1} items={items.map(([q, a]) => ({ q, a: <span dangerouslySetInnerHTML={{ __html: a }} /> }))} />;

/* Caja de cualificación sticky — mecanismo de captación */
const Qual = ({ label, open, cta, note, items }) => (
  <aside className="qual">
    <div className="q-h">{label || 'Cualificación del caso'}</div>
    <div className="q-v">Consulta sin coste</div>
    {(items || PROTO.map((p, i) => [String(i + 1).padStart(2, '0'), p.t, p.d])).map(([n, t, d], i) => (
      <div key={i} className="q-li"><b>{n}</b><span>{t && d ? <><span className="q-st">{t}</span>{d}</> : t}</span></div>
    ))}
    <PB variant="primary" fullWidth onClick={open} style={{ marginTop: '20px' }} iconRight={<PIcon name="arrow-right" size={15} />}>{cta || 'Consultar caso'}</PB>
    <div className="q-note">{note || 'Ratificación incluida · Toda España'}</div>
  </aside>
);

const PHero = ({ bc, go, h1, sub, seal }) => (
  <div className="ph">
    <div className="bc"><span onClick={() => go('home')}>Inicio</span> / {bc}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px' }}>
      <h1 className="ph-h1" dangerouslySetInnerHTML={{ __html: h1 }} />
      {seal && <div className="ph-seal"><PSeal size={104} tone="ink" /></div>}
    </div>
    <p className="ph-sub">{sub}</p>
  </div>
);

const ServiceRow = ({ s, go, compact }) => (
  <button className="srow" onClick={() => go('svc-' + s.slug)} style={compact ? { gridTemplateColumns: '1fr 150px 32px' } : {}}>
    {!compact && <span className="snum">{s.num}</span>}
    <div>{!compact && <div className="stag">{s.tag}</div>}<div className="st2">{s.t}</div>{!compact && <div className="sd">{s.desc}</div>}</div>
    <span className="snorm">{s.norm}</span>
    <span className="sarr"><PIcon name="arrow-right" size={18} color="currentColor" /></span>
  </button>
);

/* ── NAV ────────────────────────────────────────────────── */
function Nav({ page, go, open }) {
  const [m, setM] = React.useState(false);
  return (
    <nav>
      <div className="ni">
        <button className="logo" onClick={() => go('home')}>perito<span>.barcelona</span></button>
        <div className="nlinks">
          <button className={'nl' + (page === 'construccion' ? ' on' : '')} onClick={() => go('construccion')}>Perito Construcción</button>
          <div className="dd">
            <button className={'nl' + (page.startsWith('svc') || page === 'informes' ? ' on' : '')} onClick={() => go('informes')}>Dictámenes <PIcon name="chevron-down" size={13} /></button>
            <div className="ddm">{SVCS.map((s) => (
              <button key={s.slug} className="ddi" onClick={() => go('svc-' + s.slug)}>
                <span className="ddi-n">{s.num}</span><span className="ddi-t">{s.t}</span>
              </button>))}
            </div>
          </div>
          <button className={'nl' + (page === 'casos' ? ' on' : '')} onClick={() => go('casos')}>Casos</button>
          <button className={'nl' + (page === 'abogados' ? ' on' : '')} onClick={() => go('abogados')}>Abogados·Seguros</button>
          <button className={'nl' + (page === 'honorarios' ? ' on' : '')} onClick={() => go('honorarios')}>Honorarios</button>
          <button className={'nl' + (page === 'despacho' ? ' on' : '')} onClick={() => go('despacho')}>Despacho</button>
          <PB variant="primary" size="sm" onClick={open}>Consultar caso</PB>
        </div>
        <button className="nav-burger" onClick={() => setM(!m)} aria-label="Menú"><PIcon name={m ? 'x' : 'menu'} size={22} /></button>
      </div>
      {m && (
        <div className="nav-mobile">
          {[['Perito Construcción', 'construccion'], ['Dictámenes', 'informes'], ['Casos', 'casos'], ['Abogados·Seguros', 'abogados'], ['Honorarios', 'honorarios'], ['Despacho', 'despacho']].map(([l, p]) => (
            <button key={p} className="nm-link" onClick={() => { setM(false); go(p); }}>{l}</button>
          ))}
          <PB variant="primary" fullWidth onClick={() => { setM(false); open(); }} style={{ marginTop: '8px' }}>Consultar caso</PB>
        </div>
      )}
    </nav>
  );
}

function Footer({ go }) {
  return (
    <footer><div className="fi2">
      <div className="fg">
        <div>
          <div className="flogo">perito<span>.barcelona</span></div>
          <div className="ftext">Ingeniería forense en dictámenes periciales para litigios de alta cuantía en edificación y obra civil. Toda España.</div>
          <div className="fcred">Albert Vilardell Serra · Ingeniero Civil<br />ECCAT nº 16448 · Perito Judicial (M. Justicia)<br />Perito de Seguros IRD · INESE</div>
        </div>
        <div><div className="fctit">Dictámenes</div>{SVCS.map((s) => <button key={s.slug} className="flink" onClick={() => go('svc-' + s.slug)}>{s.t}</button>)}</div>
        <div><div className="fctit">Despacho</div>
          {[['Perito Construcción', 'construccion'], ['Casos de Referencia', 'casos'], ['Abogados y Seguros', 'abogados'], ['Honorarios', 'honorarios'], ['El Despacho', 'despacho'], ['Contacto', 'contacto']].map(([l, p]) => <button key={p} className="flink" onClick={() => go(p)}>{l}</button>)}
        </div>
        <div><div className="fctit">Sedes</div>
          <div className="fnap">Carrer de Numància, 95, Local 5<br />08029 Barcelona<br /><br />Carrer Navarra, 14<br />08401 Granollers<br /><br />+34 614 194 985<br />info@perito.barcelona</div>
        </div>
      </div>
      <div className="fbot">
        <span className="fcp">© 2026 perito.barcelona · Aviso legal · Privacidad · Cookies</span>
        <span className="fsc">Ingeniería Forense · Toda España</span>
      </div>
    </div></footer>
  );
}

Object.assign(window, { PIcon, Img, PB, PTag, PSeal, PStat, SVCS, CASOS, TESTI, FAQS_HOME, PROTO, INTAKE, Ticker, Band, Faq, Qual, PHero, ServiceRow, Nav, Footer });
