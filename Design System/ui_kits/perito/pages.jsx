/* global React */
/* pages.jsx — todas las páginas del sitio perito.barcelona (mejorado). */
const { PIcon, Img, PB, PTag, PSeal, PStat, SVCS, CASOS, TESTI, FAQS_HOME, PROTO, Ticker, Band, Faq, Qual, PHero, ServiceRow } = window;

const SH = ({ eyebrow, title, em, right }) => (
  <div className="sh"><div>
    <div className="eyebrow">{eyebrow}</div>
    <h2 className="st" dangerouslySetInnerHTML={{ __html: title }} />
  </div>{right}</div>
);

/* ── HOME ───────────────────────────────────────────────── */
function Home({ go, open }) {
  return (<>
    <div className="hero hero-grid">
      <div>
        <div className="eyebrow">Ingeniería Forense — Toda España</div>
        <h1 className="h1">Peritaje para quien<br />no puede permitirse<br /><em>un mal informe.</em></h1>
        <p className="hsub">Dictámenes periciales en edificación y obra civil. Para aseguradoras, despachos de abogados y administraciones que necesitan un informe que se sostenga en sala.</p>
        <div className="hctas">
          <PB variant="primary" size="lg" onClick={open}>Consultar caso</PB>
          <PB variant="secondary" size="lg" onClick={() => go('casos')}>Casos de referencia</PB>
          <span className="htel"><PIcon name="phone" size={14} color="var(--accent)" /> +34 614 194 985</span>
        </div>
        <button className="hero-particular" onClick={() => go('construccion')}>
          <PIcon name="house" size={17} color="var(--amber-500)" />
          <span>¿Es un particular con un problema en su vivienda? <b>Empiece aquí →</b></span>
        </button>
      </div>
      <div className="hero-img">
        <Img seed="perito-edificio" w={900} h={1100} alt="Estructura de edificación en Barcelona"
          srcs={['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=70']} />
        <div className="hero-img-tag fm">EXP · INSPECCIÓN ESTRUCTURAL</div>
      </div>
    </div>
    <Ticker />
    <div className="fullband">
      <Img seed="perito-obra" w={1800} h={700} treat={false} alt="Trabajo de campo en obra civil"
        srcs={['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=70']} />
      <div className="fullband-cap">
        <span className="eyebrow" style={{ color: '#fff', marginBottom: '.6rem' }}>Trabajo de campo</span>
        <div className="fullband-h">Inspección documentada · obra civil y edificación</div>
      </div>
    </div>
    <div className="stats">
      {[['DAT·01', '>120', 'M€', 'Importe total peritado', 'Acumulado en dictámenes'],
        ['DAT·02', '+400', '', 'Dictámenes emitidos', 'Edificación y obra civil'],
        ['DAT·03', '97', '%', 'Ratificados en sede judicial', 'Sin impugnación de fondo'],
        ['DAT·04', '24', '–48h', 'Desplazamiento nacional', 'Sede Barcelona · toda España']].map(([n, v, u, l, s]) => (
        <div key={n} className="sc"><span className="sc-n">{n}</span>
          <div className="sn">{v}<span>{u}</span></div><div className="sl">{l}</div><div className="ss">{s}</div>
        </div>
      ))}
    </div>

    <section className="sec">
      <SH eyebrow="Clientes de referencia" title="Trabajamos con profesionales<br/><em>que no admiten margen de error</em>" />
      <div className="tgrid">
        {[['Dossier A — Sector jurídico', 'Despachos de Abogados Especializados', 'Perito de parte o consultor técnico en procedimientos y arbitrajes. Honorarios fijos, plazos garantizados, ratificación conforme a la LEC art. 347.', ['Dº Construcción', 'Resp. Civil', 'LEC art. 347'], 'abogados'],
          ['Dossier B — Sector asegurador', 'Aseguradoras y Reaseguradoras', 'Valoración independiente de siniestros complejos: causa, alcance y cuantificación. Contrapericia. Colaboración en siniestros concurrentes.', ['Grandes Riesgos', 'Multirriesgo', 'IRD'], 'abogados'],
          ['Dossier C — Promotor · AAPP', 'Promotoras, Constructoras y AAPP', 'Auditoría pre-litigio, due diligence en compraventa de activos y dictámenes para contencioso-administrativo. Interlocución técnica directa.', ['Due Diligence', 'C-A', 'LCSP'], null]].map(([n, t, d, tags, dest], i) => (
          <div key={i} className="tc">
            <div className="tc-n">{n}</div><div className="tc-t">{t}</div><div className="tc-d">{d}</div>
            <div className="tc-tags">{tags.map((x) => <span key={x} className="tc-tag">{x}</span>)}</div>
            <button className="tc-cta" onClick={() => dest ? go(dest) : open()}>{dest ? 'Ver protocolo B2B →' : 'Consultar caso →'}</button>
          </div>
        ))}
      </div>
    </section>

    <section className="sec" style={{ paddingTop: 0 }}>
      <SH eyebrow="Índice de dictámenes" title="Dictámenes técnicos<br/><em>de alta especialización</em>" right={<PB variant="secondary" onClick={() => go('informes')}>Ver catálogo</PB>} />
      <div>
        <button className="srow" onClick={() => go('construccion')}>
          <span className="snum">SILO·1</span>
          <div><div className="stag">Particulares · vivienda</div><div className="st2">Perito de Construcción en Barcelona</div>
            <div className="sd">Vicios ocultos, mala ejecución, patologías y humedades. Para particulares, comunidades y empresas.</div></div>
          <span className="snorm">CTE · LOE · CC 1484</span><span className="sarr"><PIcon name="arrow-right" size={18} color="currentColor" /></span>
        </button>
        {SVCS.slice(0, 6).map((s) => <ServiceRow key={s.slug} s={s} go={go} />)}
      </div>
    </section>

    <div className="proto"><div className="proto-in">
      <div className="eyebrow proto-eb">Protocolo de encargo</div>
      <h2 className="st proto-h">Cómo trabajamos</h2>
      <div className="pgrid">{PROTO.map((p) => (
        <div key={p.n} className="ps"><div className="psn">{p.n}</div><div className="pst">{p.t}</div><div className="psd">{p.d}</div></div>
      ))}</div>
    </div></div>

    <section className="sec">
      <SH eyebrow="Casos de referencia" title="Dictámenes de<br/><em>alta cuantía resueltos</em>" right={<PB variant="secondary" onClick={() => go('casos')}>Ver todos</PB>} />
      <div className="cgrid">{CASOS.map((c, i) => <CaseCard key={i} c={c} />)}</div>
    </section>

    <div className="band-soft">
      <section className="sec">
        <SH eyebrow="Clientes" title="Lo que dicen quienes<br/><em>trabajan con nosotros</em>" />
        <div className="tgr">{TESTI.map((t, i) => <Testi key={i} t={t} />)}</div>
      </section>
    </div>

    <section className="sec">
      <SH eyebrow="Preguntas frecuentes" title="Dudas habituales" />
      <div style={{ maxWidth: 820 }}><Faq items={FAQS_HOME} /></div>
    </section>

    <Band h="¿Necesita un dictamen" em="que se sostenga en sala?" s="Respuesta técnica en menos de 24 horas laborables" btn="Solicitar consulta técnica" open={open} />
  </>);
}

const CaseCard = ({ c }) => (
  <div className="cc">
    <div className="ctag">{c.tag}</div><div className="cimp">{c.imp}</div>
    <div className="ctit">{c.t}</div><div className="cdesc">{c.d}</div>
    {c.pills && <div className="cpills">{c.pills.map((p) => <span key={p} className="cp">{p}</span>)}</div>}
  </div>
);
const Testi = ({ t }) => (
  <div className="tcard"><div className="tq">«{t.q}»</div><div className="ta">{t.a}</div><div className="tr">{t.r}</div></div>
);

/* ── CONSTRUCCIÓN (particulares) ────────────────────────── */
function Construccion({ go, open }) {
  return (<>
    <div className="ph ph-particular">
      <div className="bc"><span onClick={() => go('home')}>Inicio</span> / <b>Construcción</b></div>
      <div className="eyebrow eyebrow-amber">Para particulares y comunidades</div>
      <h1 className="ph-h1">Perito de Construcción<br /><em className="em-amber">en Barcelona</em></h1>
      <p className="ph-sub">¿Humedades que no se resuelven? ¿Vicios ocultos tras comprar? ¿Una reforma mal ejecutada? Le explicamos qué pasa y qué opciones tiene, con un informe que sirve ante su aseguradora o el juzgado.</p>
      <PB variant="primary" size="lg" onClick={open} style={{ background: 'var(--amber-500)' }}>Cuéntenos su caso</PB>
    </div>
    <Ticker />
    <section className="sec">
      <div className="sgrid">
        <div>
          <div className="lead-img">
            <Img seed="perito-constr" w={1100} h={560} alt="Patologías constructivas en vivienda"
              srcs={['https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1100&q=70']} />
          </div>
          <h3 className="body-h3">El técnico que diferencia el defecto del argumento</h3>
          <p className="body-p">Un perito de construcción no solo describe lo que ve en una inspección. Analiza el fallo desde la raíz — proyecto, dirección facultativa o ejecución — y lo traduce en un dictamen con estructura jurídica capaz de ser ratificado ante un tribunal.</p>
          <p className="body-p">La diferencia entre ganar o perder un procedimiento civil por defectos constructivos suele reducirse a la solidez del informe pericial aportado como prueba, conforme a la Ley de Enjuiciamiento Civil, art. 335.</p>
          <p className="body-p">Atendemos tanto a <b>particulares</b> con disputas en su vivienda — vicios ocultos tras la compra, reformas mal ejecutadas, humedades sin resolver — como a <b>empresas, comunidades de propietarios y despachos</b>. La titulación de Ingeniero Civil (ECCAT nº 16448) permite analizar estructura y cimentación con una profundidad diferente a la de otros técnicos.</p>
          <h3 className="body-h3">Ámbito de actuación</h3>
          <div>{SVCS.filter((s) => ['vicios-ocultos', 'reclamacion-mala-ejecucion', 'patologias-estructurales', 'humedades-filtraciones', 'contrainforme-pericial', 'naves-industriales'].includes(s.slug)).map((s) => <ServiceRow key={s.slug} s={s} go={go} compact />)}</div>
        </div>
        <Qual label="Su consulta, paso a paso" open={open} cta="Cuéntenos su caso"
          items={[['✓', 'Análisis previo de viabilidad técnica'], ['✓', 'Presupuesto cerrado antes del encargo'], ['✓', 'Ratificación en sala incluida'], ['✓', 'Desplazamiento a toda España 24–48h']]}
          note="+34 614 194 985 · Respuesta 24h" />
      </div>
    </section>
    <section className="sec" style={{ paddingTop: 0 }}>
      <SH eyebrow="Casos en construcción" title="Referencias" />
      <div className="cgrid">{CASOS.slice(2, 5).map((c, i) => <CaseCard key={i} c={c} />)}</div>
    </section>
    <Band amber h="¿Tiene un problema constructivo" em="que necesita documentar?" s="Consulta inicial sin coste" btn="Cuéntenos su caso" open={open} />
  </>);
}

/* ── INFORMES (hub) ─────────────────────────────────────── */
function Informes({ go, open }) {
  return (<>
    <PHero go={go} seal bc={<b>Informes Periciales</b>} h1='Informes Periciales de<br/><em>Edificación y Obra Civil</em>'
      sub="Ocho especialidades técnico-legales para la resolución de disputas complejas. Metodología científica e independiente, preparada para ratificación oral conforme a la LEC." />
    <Ticker />
    <section className="sec"><div>{SVCS.map((s) => <ServiceRow key={s.slug} s={s} go={go} />)}</div></section>
    <Band h="¿No identifica su caso en el índice?" s="Descríbanoslo — le orientamos sin coste" open={open} />
  </>);
}

/* ── SERVICIO (genérico para los 8) ─────────────────────── */
function Svc({ svc, go, open }) {
  const amber = svc.audience === 'particular';
  return (<>
    <PHero go={go} bc={<><span onClick={() => go('informes')}>Informes</span> / <b>{svc.num}</b></>}
      h1={`${svc.t}<em style="display:block;font-size:.5em;margin-top:.4em;${amber ? 'color:var(--amber-500)' : ''}">${svc.tag}</em>`} sub={svc.desc} />
    <section className="sec" style={{ paddingTop: '1.5rem' }}>
      <div className="sgrid">
        <div>
          <div className="lead-img">
            <Img seed={'svc-' + svc.slug} w={1100} h={620} alt={svc.t}
              srcs={['https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1100&q=70']} />
          </div>
          <div className="nchips">{svc.lsi.map((l) => <span key={l} className="nchip">{l}</span>)}</div>
          {svc.body.map(([h, p], i) => (
            <div key={i}><h3 className="body-h3">{h}</h3><p className="body-p" dangerouslySetInnerHTML={{ __html: p }} /></div>
          ))}
          <h3 className="body-h3">Preguntas frecuentes</h3>
          <Faq items={svc.faqs} />
        </div>
        <Qual label={`Expediente · ${svc.num}`} open={open} cta="Consultar este dictamen" />
      </div>
    </section>
    <section className="sec" style={{ paddingTop: 0 }}>
      <SH eyebrow="Otros dictámenes" title="Relacionados" />
      <div>{SVCS.filter((x) => x.slug !== svc.slug).slice(0, 4).map((s) => <ServiceRow key={s.slug} s={s} go={go} compact />)}</div>
    </section>
    <Band amber={amber} h="¿Necesita este dictamen?" s="Consulta inicial sin coste · Plazo por contrato" open={open} />
  </>);
}

/* ── CASOS ──────────────────────────────────────────────── */
function Casos({ go, open }) {
  return (<>
    <PHero go={go} bc={<b>Casos</b>} h1='Dictámenes de<br/><em>alta cuantía resueltos</em>'
      sub="Selección de casos resueltos en edificación, obra civil y siniestros industriales. Importes y detalles anonimizados para preservar la confidencialidad de las partes." />
    <section className="sec"><div className="cgrid">{CASOS.map((c, i) => <CaseCard key={i} c={c} />)}</div></section>
    <Band h="¿Tiene un caso similar?" s="Consulta sin compromiso" open={open} />
  </>);
}

/* ── ABOGADOS / B2B ─────────────────────────────────────── */
function Abogados({ go, open }) {
  return (<>
    <PHero go={go} seal bc={<b>B2B</b>} h1='Servicio técnico para<br/><em>despachos y aseguradoras</em>'
      sub="Protocolo de colaboración B2B para despachos especializados en construcción y compañías aseguradoras que necesitan un perito de parte independiente." />
    <Ticker />
    <section className="sec">
      <div className="sgrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {[['Protocolo A — Despachos', 'Para Despachos de Abogados', ['Informe preliminar de viabilidad técnica en 48 horas', 'Honorarios fijos pactados por escrito', 'Ratificación garantizada (LEC art. 347) incluida', 'Múltiples procedimientos simultáneos', 'Informe de avance periódico al letrado']],
          ['Protocolo B — Aseguradoras', 'Para Aseguradoras y Reaseguradoras', ['Valoración de causa, alcance y cuantía del siniestro', 'Contrapericia frente al perito del asegurado', 'Colaboración en siniestros concurrentes', 'Certificación IRD — INESE Insurance School', 'Interlocución directa con dirección de siniestros']]].map(([n, t, items], i) => (
          <div key={i} className="qual" style={{ position: 'static' }}>
            <div className="q-h">{n}</div>
            <div className="q-v" style={{ fontSize: '1.4rem' }}>{t}</div>
            {items.map((x) => <div key={x} className="q-li"><b>✓</b><span>{x}</span></div>)}
            <PB variant="primary" fullWidth onClick={open} style={{ marginTop: '20px' }} iconRight={<PIcon name="arrow-right" size={15} />}>Iniciar colaboración</PB>
          </div>
        ))}
      </div>
    </section>
    <section className="sec" style={{ paddingTop: 0 }}>
      <SH eyebrow="Declaraciones B2B" title="Referencias" />
      <div className="tgr">{TESTI.map((t, i) => <Testi key={i} t={t} />)}</div>
    </section>
    <Band h="¿Su despacho necesita" em="un perito de parte solvente?" s="Informe de viabilidad en 48 horas · Sin compromiso" btn="Iniciar colaboración" open={open} />
  </>);
}

/* ── HONORARIOS ─────────────────────────────────────────── */
function Honorarios({ go, open }) {
  return (<>
    <PHero go={go} bc={<b>Honorarios</b>} h1='Honorarios de<br/><em>informes periciales</em>'
      sub="Honorarios fijos acordados antes del inicio del encargo. Sin costes variables ni sorpresas. La ratificación en sala está incluida sin sobrecoste." />
    <section className="sec">
      <div className="sgrid">
        <div>
          <h3 className="body-h3">Presupuesto cerrado antes del inicio</h3>
          <p className="body-p">No se utiliza una tarifa estándar porque cada caso es técnicamente diferente. El coste depende de la complejidad, el número de visitas, los ensayos requeridos y el alcance del análisis. Tras analizar la documentación inicial, se emite una propuesta técnica con honorarios fijos cerrados.</p>
          <h3 className="body-h3">Qué incluye el presupuesto</h3>
          <p className="body-p"><b>Inspección</b> del inmueble o infraestructura · <b>análisis</b> de la documentación técnica · <b>redacción</b> y maquetación del dictamen · <b>revisión interna</b> y control de calidad · <b>ratificación en sede judicial</b> e interrogatorio cruzado · <b>desplazamientos</b> en toda España.</p>
          <p className="body-p">No hay costes adicionales posteriores al presupuesto acordado.</p>
        </div>
        <Qual label="Factores de coste" open={open} cta="Solicitar presupuesto" note="Primera consulta sin coste"
          items={[['01', 'Tipo de dictamen — parte, judicial o contrainforme'], ['02', 'Complejidad técnica del caso'], ['03', 'Número de visitas de inspección'], ['04', 'Ensayos — termografía, testigos, FEM'], ['05', 'Alcance geográfico'], ['06', 'Urgencia del plazo']]} />
      </div>
    </section>
    <Band h="¿Quiere saber cuánto costaría su informe?" s="Primera consulta sin coste" btn="Solicitar presupuesto" open={open} />
  </>);
}

/* ── DESPACHO ───────────────────────────────────────────── */
function Despacho({ go, open }) {
  return (<>
    <PHero go={go} seal bc={<b>El Despacho</b>} h1='Albert Vilardell Serra<br/><em>Ingeniero Civil · Perito Judicial</em>'
      sub="Despacho de ingeniería forense fundado en Barcelona. Más de 15 años en peritaje de edificación, obra civil y siniestros complejos para el mercado legal y asegurador." />
    <section className="sec">
      <div className="sgrid">
        <div>
          <div className="portrait">
            <Img seed="perito-albert" w={900} h={680} alt="Albert Vilardell Serra"
              srcs={['https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=70']} />
          </div>
          <h3 className="body-h3">Especialización, no generalismo</h3>
          <p className="body-p">Este despacho no acepta cualquier encargo. La especialización en dictámenes para litigios de alta cuantía implica rechazar casos que no se ajustan al perfil de trabajo y concentrar los recursos en los asuntos donde el impacto técnico es determinante.</p>
          <p className="body-p">La independencia técnica y la solvencia del dictamen son el único activo. No se trabaja en exclusiva para ninguna aseguradora ni se depende de ninguna constructora.</p>
          <h3 className="body-h3">Principios de trabajo</h3>
          <p className="body-p"><b>Independencia técnica</b> — innegociable, sin exclusivas. <b>Plazos por contrato</b> — si no se puede garantizar, no se acepta el encargo. <b>Honorarios fijos</b> — acordados antes del inicio, ratificación incluida. <b>Claridad técnica</b> — un dictamen que no se entiende en sala no tiene valor.</p>
        </div>
        <Qual label="Habilitación profesional" open={open} cta="Consultar disponibilidad" note="L–J 9h–18h · V 9h–14h · Cita previa"
          items={[['TÍT', 'Ingeniero Civil — ETSECCPB · UPC'], ['COL', 'ECCAT nº 16448'], ['JUD', 'Perito Judicial — Ministerio de Justicia'], ['IRD', 'Perito de Seguros — INESE Insurance School'], ['BCN', 'C. de Numància, 95, Local 5 · 08029 Barcelona'], ['GRA', 'C. Navarra, 14 · 08401 Granollers']]} />
      </div>
    </section>
    <Band h="¿Necesita un perito con esta formación?" open={open} />
  </>);
}

/* ── CONTACTO ───────────────────────────────────────────── */
function Contacto({ go, open }) {
  return (<>
    <PHero go={go} bc={<b>Contacto</b>} h1='Solicitar<br/><em>consulta técnica</em>'
      sub="Primera valoración sin coste. Respuesta en menos de 24 horas laborables. Para asuntos urgentes, contacto directo por teléfono." />
    <section className="sec">
      <div className="sgrid">
        <div>
          <h3 className="body-h3">Canales</h3>
          <p className="body-p fm" style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--ink-900)' }}>+34 614 194 985<br />info@perito.barcelona</p>
          <h3 className="body-h3">Sedes</h3>
          <p className="body-p"><b>Barcelona (principal)</b><br />Carrer de Numància, 95, Local 5 · 08029 Barcelona<br />Con cita previa · L–J 9h–18h · V 9h–14h</p>
          <p className="body-p"><b>Granollers</b><br />Carrer Navarra, 14 · 08401 Granollers<br />Con cita previa</p>
          <h3 className="body-h3">Confidencialidad</h3>
          <p className="body-p">Toda la información de la consulta inicial se trata con estricta confidencialidad conforme al RGPD (Reglamento UE 2016/679), exclusivamente para la gestión de la consulta.</p>
        </div>
        <Qual label="Consulta guiada" open={open} cta="Iniciar consulta guiada" note="Confidencial · Sin compromiso"
          items={[['01', 'Tipo de asunto'], ['02', 'Descripción breve'], ['03', 'Importe en disputa'], ['04', 'Situación procesal'], ['05', 'Datos de contacto']]} />
      </div>
    </section>
  </>);
}

Object.assign(window, { Home, Construccion, Informes, Svc, Casos, Abogados, Honorarios, Despacho, Contacto });
