/* global React */
// Full content + sober shared blocks for the definitive perito.barcelona site.
(function () {
const WNS = window.VilardellPeritajeForenseDesignSystem_58f0b0;
const { Button: WB, Tag: WTag, Card: WCard, Stat: WStat, SectionHeader: WSH, Accordion: WAcc, Seal: WSeal } = WNS;
const wrap = { maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '0 var(--gutter)' };

const SVCS = [
  { slug: 'informe-de-parte', num: 'EXP·01', tag: 'Litigación civil', t: 'Informe Pericial de Parte', norm: 'LEC art. 335', audience: 'pro',
    desc: 'Dictamen encargado por una de las partes para fundamentar su postura en negociación, mediación o demanda. Plena validez probatoria.',
    lsi: ['LEC art. 335', 'Dictamen técnico', 'Ratificación de parte', 'Procedimiento civil', 'Prueba pericial'],
    body: [['Su argumento técnico en una disputa', 'En cualquier litigio, la parte que presenta los argumentos técnicos más sólidos tiene ventaja decisiva. Un <b>informe pericial de parte</b> es un dictamen encargado por usted para investigar la realidad técnica de los hechos y defender su postura con objetividad y rigor.'], ['Cuándo es esencial', '<b>Antes de una demanda</b> — para evaluar la solidez técnica de la reclamación. <b>Durante una negociación</b> — un informe contundente fuerza acuerdos favorables sin juicio. <b>Como prueba</b> conforme a la LEC. <b>Para refutar</b> el dictamen de la parte contraria mediante un contrainforme.']],
    faqs: [['¿Tiene validez en un juicio?', 'Sí. Es un medio de prueba reconocido por la LEC (arts. 335 y ss.) y puede defenderse como prueba pericial ante el juez.'], ['¿Diferencia con el dictamen judicial?', 'El de parte lo encarga usted o su letrado; el judicial lo designa el juzgado. La metodología es idéntica.']] },
  { slug: 'perito-judicial', num: 'EXP·02', tag: 'Designación judicial', t: 'Actuación como Perito Judicial', norm: 'LEC art. 347', audience: 'pro',
    desc: 'Por designación del juzgado o de parte. Imparcialidad acreditada y defensa oral solvente ante interrogatorio cruzado.',
    lsi: ['Designación judicial', 'Lista de peritos', 'LEC art. 347', 'Tacha de peritos', 'Ratificación en sala'],
    body: [['Actuación en sede judicial', 'La figura del perito judicial exige tres condiciones: conocimiento técnico acreditado, especialización en la materia objeto de litigio y capacidad de defender el dictamen verbalmente ante el juez y los letrados de ambas partes.'], ['Ratificación e interrogatorio cruzado', 'La ratificación oral es parte integrante del servicio. La solidez de esa defensa es determinante para el peso que el juez otorga al dictamen. <b>Honorarios de ratificación incluidos sin sobrecoste.</b>']],
    faqs: [['¿Cómo se designa al perito judicial?', 'Por sorteo entre los peritos disponibles, o por acuerdo de las partes (LEC art. 339).'], ['¿Puede impugnarse el dictamen?', 'Las partes pueden tachar al perito o impugnar el dictamen (LEC art. 343). La solvencia del informe es la mejor defensa.']] },
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
  { tag: 'Siniestro de incendio', imp: '€1,2 M', t: 'Incendio estructural en nave logística', d: 'Causa, origen y extensión en 8.000 m². Cuantificación para aseguradora nacional. Ratificado en juzgado.', pills: ['Aseguradora', '90 días', 'Ratificado'] },
  { tag: 'Obra civil', imp: '€2,8 M', t: 'Asiento diferencial en puente de vía rápida', d: 'Patologías en hormigón pretensado. Contencioso-administrativo contra constructora.', pills: ['AAPP', 'Litigio C-A', 'Barcelona'] },
  { tag: 'Vicios ocultos', imp: '€680 K', t: 'Patologías de envolvente en 120 viviendas', d: 'Fachada ventilada, cubierta y carpinterías. Comunidad contra promotora. Resolución favorable.', pills: ['Comunidad', '2024', 'Barcelona'] },
  { tag: 'Humedades', imp: '€340 K', t: 'Filtración por cubierta en plurifamiliar', d: 'Termografía. CTE DB-HS. Reparación íntegra a cargo de la constructora.', pills: ['Extrajudicial', 'Granollers'] },
  { tag: 'Mala ejecución', imp: '€430 K', t: 'Incumplimientos en reforma de local', d: 'Partidas no ejecutadas y materiales inferiores a memoria de calidades.', pills: ['Despacho', 'Mediación', 'BCN'] },
  { tag: 'Contrainforme', imp: '€920 K', t: 'Refutación en colapso de forjado', d: 'Carencias metodológicas en el informe de la aseguradora. Ratificación en juicio oral.', pills: ['Juicio oral', 'Valencia'] },
];
const TESTI = [
  { q: 'Su dictamen fue la base de toda nuestra estrategia de negociación. Tan claro y contundente que logramos acuerdo sin ir a juicio.', a: 'Socio de Área', r: 'Despacho de construcción · Madrid' },
  { q: 'Valoro la disponibilidad para ratificar en sala sin demoras y el rigor metodológico del informe.', a: 'Directora de Siniestros', r: 'Aseguradora multinacional · Barcelona' },
  { q: 'El informe de due diligence identificó contingencias que no habíamos previsto. Se amortizó muchas veces.', a: 'Director de Inversiones', r: 'Family Office · Barcelona' },
];
const PROTO = [
  ['Briefing técnico', 'Reunión de instrucción con letrado o director de siniestros. Análisis previo de viabilidad sin coste.'],
  ['Propuesta cerrada', 'Alcance definido, honorarios fijos y fecha de entrega comprometida por escrito. Sin variables.'],
  ['Instrucción y dictamen', 'Inspección, análisis, redacción y revisión interna. Formato técnico-jurídico listo para aportación.'],
  ['Ratificación incluida', 'Ratificación en sala e interrogatorio cruzado incluidos en honorarios. Sin sobrecoste.'],
];

/* ── BLOQUES SOBRIOS ────────────────────────────────────── */
function Breadcrumb({ trail = [], go }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
      {trail.map((seg, i) => (
        <React.Fragment key={i}>
          {i > 0 && <window.Icon name="chevron-right" size={13} color="var(--text-faint)" />}
          {seg.go ? <a href="#" onClick={(e) => { e.preventDefault(); go(seg.go); }} style={{ color: 'var(--text-muted)' }}>{seg.label}</a>
            : <span style={{ color: 'var(--text-accent)' }}>{seg.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function PageHero({ trail, go, title, lede, seal }) {
  return (
    <section style={{ ...wrap, paddingTop: 'clamp(36px,6vw,84px)', paddingBottom: 'var(--space-12)' }}>
      <Breadcrumb trail={trail} go={go} />
      <div style={{ display: 'grid', gridTemplateColumns: seal ? '1fr auto' : '1fr', gap: 'clamp(24px,4vw,56px)', alignItems: 'center', marginTop: 'var(--space-8)' }} className="pagehero-grid">
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-display-1)', lineHeight: 'var(--lh-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: 0, fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: title }} />
          <p style={{ marginTop: '22px', fontSize: 'var(--fs-lede)', lineHeight: 'var(--lh-lede)', color: 'var(--text-muted)', maxWidth: '60ch' }}>{lede}</p>
        </div>
        {seal && <div className="pagehero-seal"><WSeal size={104} tone="ink" /></div>}
      </div>
    </section>
  );
}

function Qual({ label = 'Cualificación del caso', items, cta = 'Consultar caso', note = 'Ratificación incluida · Toda España', onIntake }) {
  const list = items || PROTO.map((p, i) => [String(i + 1).padStart(2, '0'), p[0]]);
  return (
    <WCard refCode={label} style={{ position: 'sticky', top: '92px' }}>
      <div style={{ padding: '22px 22px 24px' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.6rem', color: 'var(--text-accent)', marginBottom: '4px' }}>Consulta sin coste</div>
        <div style={{ marginTop: '14px' }}>
          {list.map(([n, t], i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '11px 0', borderTop: '1px solid var(--border-subtle)', fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-accent)', fontWeight: 600, flexShrink: 0, paddingTop: '2px' }}>{n}</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
        <WB variant="primary" fullWidth onClick={onIntake} style={{ marginTop: '18px' }} iconRight={<window.Icon name="arrow-right" size={15} />}>{cta}</WB>
        <div style={{ marginTop: '12px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{note}</div>
      </div>
    </WCard>
  );
}

function ServiceRow({ s, go, compact }) {
  const [h, setH] = React.useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => go('svc-' + s.slug)}
      style={{ display: 'grid', gridTemplateColumns: compact ? '1fr 150px 28px' : '92px 1fr 200px 28px', gap: 'clamp(14px,3vw,40px)', alignItems: 'center', width: '100%', textAlign: 'left', background: h ? 'var(--surface-card)' : 'transparent', border: 'none', borderTop: '1px solid var(--border-hairline)', cursor: 'pointer', padding: '22px 14px', font: 'inherit', transition: 'background var(--dur-fast) var(--ease-out)' }} className="svc-row">
      {!compact && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-accent)', letterSpacing: '0.08em', fontWeight: 500 }}>{s.num}</span>}
      <span>
        {!compact && <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '6px' }}>{s.tag}</span>}
        <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: compact ? '1.1rem' : '1.3rem', fontWeight: 400, color: h ? 'var(--text-accent)' : 'var(--text-strong)', transition: 'color var(--dur-fast)', lineHeight: 1.15 }}>{s.t}</span>
        {!compact && <span style={{ display: 'block', marginTop: '7px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: '60ch' }}>{s.desc}</span>}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)', textAlign: 'right', lineHeight: 1.5 }} className="svc-norm">{s.norm}</span>
      <span style={{ display: 'flex', justifyContent: 'flex-end', color: h ? 'var(--text-accent)' : 'var(--text-faint)', transform: h ? 'translateX(4px)' : 'none', transition: 'transform var(--dur-fast), color var(--dur-fast)' }}><window.Icon name="arrow-right" size={20} color="currentColor" /></span>
    </button>
  );
}

function CaseCard({ c, dark }) {
  return (
    <WCard tone={dark ? 'ink' : 'paper'} style={dark ? { borderColor: 'var(--ink-700)' } : {}}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-accent)', fontWeight: 600 }}>{c.tag}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: dark ? 'var(--bone-100)' : 'var(--text-strong)', margin: '16px 0 0', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{c.imp}</div>
        <div style={{ marginTop: '10px', fontSize: '0.95rem', fontWeight: 600, color: dark ? 'var(--bone-100)' : 'var(--text-strong)' }}>{c.t}</div>
        <p style={{ margin: '7px 0 0', fontSize: '0.85rem', color: dark ? 'rgba(241,241,234,0.72)' : 'var(--text-muted)', lineHeight: 1.55 }}>{c.d}</p>
        {c.pills && <div style={{ display: 'flex', gap: '7px', marginTop: '16px', flexWrap: 'wrap' }}>{c.pills.map((p) => <WTag key={p} variant="outline" size="sm" style={dark ? { color: 'var(--text-on-dark-muted)', borderColor: 'var(--ink-700)' } : {}}>{p}</WTag>)}</div>}
      </div>
    </WCard>
  );
}

function Testi({ t }) {
  return (
    <WCard style={{ padding: '26px', borderTop: '3px solid var(--accent)' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-strong)', margin: 0 }}>«{t.q}»</p>
      <div style={{ marginTop: '18px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-strong)' }}>{t.a}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-accent)', marginTop: '4px' }}>{t.r}</div>
    </WCard>
  );
}

function FaqList({ items }) {
  return <WAcc defaultOpen={-1} items={items.map(([q, a]) => ({ q, a: <span dangerouslySetInnerHTML={{ __html: a }} /> }))} />;
}

function BandCTA({ eyebrow, title, lede, btn, onClick, tone = 'tint' }) {
  const ink = tone === 'ink';
  return (
    <section style={{ background: ink ? 'var(--surface-ink)' : 'var(--surface-tint)', borderTop: ink ? 'none' : '1px solid var(--oxide-200)' }}>
      <div style={{ ...wrap, padding: 'var(--section-y) var(--gutter)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}><WSeal size={64} tone={ink ? 'light' : 'oxide'} /></div>
        <WSH align="center" onDark={ink} eyebrow={eyebrow} title={title} lede={lede} />
        <div style={{ marginTop: '28px' }}><WB variant="primary" size="lg" onClick={onClick}>{btn}</WB></div>
      </div>
    </section>
  );
}

const SecHead = ({ eyebrow, title, lede, align, right }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
    <WSH eyebrow={eyebrow} title={title} lede={lede} align={align} />
    {right}
  </div>
);

Object.assign(window, { wrap, SVCS, CASOS, TESTI, PROTO, Breadcrumb, PageHero, Qual, ServiceRow, CaseCard, Testi, FaqList, BandCTA, SecHead, WB, WTag, WCard, WStat, WSH, WAcc, WSeal });
})();
