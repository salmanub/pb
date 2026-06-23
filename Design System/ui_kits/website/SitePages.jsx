/* global React */
(function () {
const { wrap, SVCS, CASOS, TESTI, Qual, ServiceRow, CaseCard, Testi, FaqList, BandCTA, PageHero, SecHead, WB, WTag, WSH, WCard } = window;
const sec = { ...wrap, padding: 'var(--section-y) var(--gutter)' };
const sgrid = { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'clamp(28px,4vw,56px)', alignItems: 'start' };

const Body = ({ blocks }) => (
  <div>
    {blocks.map(([h, p], i) => (
      <div key={i}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h3)', fontWeight: 500, color: 'var(--text-strong)', margin: '26px 0 10px', paddingBottom: '8px', borderBottom: '2px solid var(--accent)', display: 'inline-block' }}>{h}</h3>
        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)', margin: '0 0 12px', maxWidth: '62ch' }} dangerouslySetInnerHTML={{ __html: p }} />
      </div>
    ))}
  </div>
);

/* ── CONSTRUCCIÓN (particulares) ───────────────────────── */
function Construccion({ go, open }) {
  const rels = SVCS.filter((s) => ['vicios-ocultos', 'reclamacion-mala-ejecucion', 'patologias-estructurales', 'humedades-filtraciones', 'contrainforme-pericial'].includes(s.slug));
  return (<>
    <PageHero go={go} trail={[{ label: 'Inicio', go: 'home' }, { label: 'Construcción' }]}
      title='Perito de construcción<br/>en Barcelona'
      lede="¿Humedades que no se resuelven? ¿Vicios ocultos tras comprar? ¿Una reforma mal ejecutada? Te explicamos qué pasa y qué opciones tienes — con un informe que sirve ante tu aseguradora o el juzgado." />
    <section style={sec}>
      <div style={sgrid} className="site-two">
        <div>
          <Body blocks={[
            ['El técnico que diferencia el defecto del argumento', 'Un perito de construcción no solo describe lo que ve en una inspección. Analiza el fallo desde la raíz — proyecto, dirección facultativa o ejecución — y lo traduce en un dictamen con estructura jurídica capaz de ser ratificado ante un tribunal.'],
            ['Particulares y comunidades', 'Atendemos disputas en vivienda — vicios ocultos tras la compra, reformas mal ejecutadas, humedades sin resolver — y también a comunidades de propietarios y despachos. La titulación de Ingeniero Civil (ECCAT nº 16448) permite analizar estructura y cimentación con una profundidad diferente.'],
          ]} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h3)', fontWeight: 500, margin: '30px 0 6px', color: 'var(--text-strong)' }}>Ámbito de actuación</h3>
          <div>{rels.map((s) => <ServiceRow key={s.slug} s={s} go={go} compact />)}</div>
        </div>
        <Qual label="Tu consulta, paso a paso" onIntake={open} cta="Cuéntanos tu caso"
          items={[['✓', 'Análisis previo de viabilidad técnica'], ['✓', 'Presupuesto cerrado antes del encargo'], ['✓', 'Ratificación en sala incluida'], ['✓', 'Desplazamiento a toda España 24–48h']]}
          note="614 194 985 · Respuesta 24h" />
      </div>
    </section>
    <section style={{ ...sec, paddingTop: 0 }}>
      <WSH eyebrow="§ Casos en construcción" title="Referencias" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginTop: 'var(--space-10)' }} className="site-three">{CASOS.slice(2, 5).map((c, i) => <CaseCard key={i} c={c} />)}</div>
    </section>
    <BandCTA eyebrow="Primer contacto" title="¿Tienes un problema constructivo que documentar?" lede="Consulta inicial sin coste. Te orientamos sobre si necesitas un dictamen y con qué alcance." btn="Cuéntanos tu caso" onClick={open} />
  </>);
}

/* ── INFORMES (hub) ────────────────────────────────────── */
function Informes({ go, open }) {
  return (<>
    <PageHero go={go} seal trail={[{ label: 'Inicio', go: 'home' }, { label: 'Dictámenes' }]}
      title='Informes periciales de<br/>edificación y obra civil'
      lede="Ocho especialidades técnico-legales para la resolución de disputas complejas. Metodología científica e independiente, preparada para ratificación oral conforme a la LEC." />
    <section style={sec}><div>{SVCS.map((s) => <ServiceRow key={s.slug} s={s} go={go} />)}</div></section>
    <BandCTA eyebrow="Sin coste" title="¿No identificas tu caso en el índice?" lede="Descríbenoslo y te orientamos sin compromiso." btn="Consultar caso" onClick={open} />
  </>);
}

/* ── SERVICIO (genérico) ───────────────────────────────── */
function Svc({ svc, go, open }) {
  return (<>
    <PageHero go={go} trail={[{ label: 'Inicio', go: 'home' }, { label: 'Dictámenes', go: 'informes' }, { label: svc.num }]}
      title={`${svc.t}<em style="display:block;font-style:italic;font-size:.42em;margin-top:.5em;color:var(--text-accent);letter-spacing:0">${svc.tag}</em>`}
      lede={svc.desc} />
    <section style={{ ...sec, paddingTop: 'var(--space-6)' }}>
      <div style={sgrid} className="site-two">
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {svc.lsi.map((l) => <WTag key={l} variant="ink">{l}</WTag>)}
          </div>
          <Body blocks={svc.body} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h3)', fontWeight: 500, margin: '32px 0 16px', color: 'var(--text-strong)' }}>Preguntas frecuentes</h3>
          <FaqList items={svc.faqs} />
        </div>
        <Qual label={`Expediente · ${svc.num}`} onIntake={open} cta="Consultar este dictamen" />
      </div>
    </section>
    <section style={{ ...sec, paddingTop: 0 }}>
      <WSH eyebrow="§ Otros dictámenes" title="Relacionados" />
      <div style={{ marginTop: 'var(--space-8)' }}>{SVCS.filter((x) => x.slug !== svc.slug).slice(0, 4).map((s) => <ServiceRow key={s.slug} s={s} go={go} compact />)}</div>
    </section>
    <BandCTA eyebrow="Sin coste" title="¿Necesitas este dictamen?" lede="Consulta inicial sin coste. Plazo de entrega por contrato." btn="Consultar caso" onClick={open} />
  </>);
}

/* ── CASOS ─────────────────────────────────────────────── */
function Casos({ go, open }) {
  return (<>
    <PageHero go={go} trail={[{ label: 'Inicio', go: 'home' }, { label: 'Casos' }]}
      title='Dictámenes de<br/>alta cuantía resueltos'
      lede="Selección de casos en edificación, obra civil y siniestros industriales. Importes y detalles anonimizados para preservar la confidencialidad de las partes." />
    <section style={sec}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="site-three">{CASOS.map((c, i) => <CaseCard key={i} c={c} dark={i % 3 === 1} />)}</div></section>
    <BandCTA eyebrow="Sin compromiso" title="¿Tienes un caso similar?" lede="Cuéntanoslo y te decimos si tiene recorrido pericial." btn="Consultar caso" onClick={open} />
  </>);
}

/* ── ABOGADOS / B2B ────────────────────────────────────── */
function Abogados({ go, open }) {
  const cols = [
    ['Protocolo A — Despachos', 'Para despachos de abogados', ['Informe preliminar de viabilidad técnica en 48 horas', 'Honorarios fijos pactados por escrito', 'Ratificación garantizada (LEC art. 347) incluida', 'Múltiples procedimientos simultáneos', 'Informe de avance periódico al letrado']],
    ['Protocolo B — Aseguradoras', 'Para aseguradoras y reaseguradoras', ['Valoración de causa, alcance y cuantía del siniestro', 'Contrapericia frente al perito del asegurado', 'Colaboración en siniestros concurrentes', 'Certificación IRD — INESE', 'Interlocución directa con dirección de siniestros']],
  ];
  return (<>
    <PageHero go={go} seal trail={[{ label: 'Inicio', go: 'home' }, { label: 'Abogados · Seguros' }]}
      title='Servicio técnico para<br/>despachos y aseguradoras'
      lede="Protocolo de colaboración B2B para despachos especializados en construcción y compañías aseguradoras que necesitan un perito de parte independiente." />
    <section style={sec}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="site-two">
        {cols.map(([n, t, items]) => (
          <WCard key={n} style={{ padding: '30px', borderTop: '3px solid var(--accent)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-accent)' }}>{n}</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2)', fontWeight: 400, color: 'var(--text-strong)', margin: '10px 0 0' }}>{t}</h3>
            <ul style={{ listStyle: 'none', margin: '20px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((x) => <li key={x} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.5 }}><window.Icon name="check" size={17} color="var(--accent)" style={{ marginTop: '2px', flexShrink: 0 }} />{x}</li>)}
            </ul>
            <div style={{ marginTop: '24px' }}><WB variant="secondary" onClick={open} iconRight={<window.Icon name="arrow-right" size={16} />}>Iniciar colaboración</WB></div>
          </WCard>
        ))}
      </div>
    </section>
    <section style={{ ...sec, paddingTop: 0 }}>
      <WSH eyebrow="§ Declaraciones" title="Referencias B2B" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginTop: 'var(--space-10)' }} className="site-three">{TESTI.map((t, i) => <Testi key={i} t={t} />)}</div>
    </section>
    <BandCTA eyebrow="Sin compromiso" title="¿Tu despacho necesita un perito de parte solvente?" lede="Informe de viabilidad en 48 horas." btn="Iniciar colaboración" onClick={open} />
  </>);
}

/* ── HONORARIOS ────────────────────────────────────────── */
function Honorarios({ go, open }) {
  return (<>
    <PageHero go={go} trail={[{ label: 'Inicio', go: 'home' }, { label: 'Honorarios' }]}
      title='Honorarios de<br/>informes periciales'
      lede="Honorarios fijos acordados antes del inicio del encargo. Sin costes variables ni sorpresas. La ratificación en sala está incluida sin sobrecoste." />
    <section style={sec}>
      <div style={sgrid} className="site-two">
        <Body blocks={[
          ['Presupuesto cerrado antes del inicio', 'No se utiliza una tarifa estándar porque cada caso es técnicamente diferente. El coste depende de la complejidad, el número de visitas, los ensayos requeridos y el alcance del análisis. Tras analizar la documentación inicial, se emite una propuesta técnica con honorarios fijos cerrados.'],
          ['Qué incluye el presupuesto', '<b>Inspección</b> del inmueble o infraestructura · <b>análisis</b> de la documentación técnica · <b>redacción</b> y maquetación del dictamen · <b>revisión interna</b> y control de calidad · <b>ratificación en sede judicial</b> e interrogatorio cruzado · <b>desplazamientos</b> en toda España. No hay costes adicionales posteriores al presupuesto acordado.'],
        ]} />
        <Qual label="Factores de coste" onIntake={open} cta="Solicitar presupuesto" note="Primera consulta sin coste"
          items={[['01', 'Tipo de dictamen — parte, judicial o contrainforme'], ['02', 'Complejidad técnica del caso'], ['03', 'Número de visitas de inspección'], ['04', 'Ensayos — termografía, testigos, FEM'], ['05', 'Alcance geográfico'], ['06', 'Urgencia del plazo']]} />
      </div>
    </section>
    <BandCTA eyebrow="Sin coste" title="¿Quieres saber cuánto costaría tu informe?" lede="Primera consulta sin coste y presupuesto cerrado por escrito." btn="Solicitar presupuesto" onClick={open} />
  </>);
}

/* ── DESPACHO ──────────────────────────────────────────── */
function Despacho({ go, open }) {
  return (<>
    <PageHero go={go} seal trail={[{ label: 'Inicio', go: 'home' }, { label: 'El Despacho' }]}
      title='Albert Vilardell Serra<br/><em style="font-style:italic;color:var(--text-accent)">Ingeniero Civil · Perito Judicial</em>'
      lede="Despacho de ingeniería forense fundado en Barcelona. Más de 15 años en peritaje de edificación, obra civil y siniestros complejos para el mercado legal y asegurador." />
    <section style={sec}>
      <div style={sgrid} className="site-two">
        <div>
          <window.Placeholder label="Albert Vilardell Serra" ratio="3 / 2" style={{ marginBottom: '26px' }} />
          <Body blocks={[
            ['Especialización, no generalismo', 'Este despacho no acepta cualquier encargo. La especialización en dictámenes para litigios de alta cuantía implica rechazar casos que no se ajustan al perfil y concentrar los recursos donde el impacto técnico es determinante. La independencia técnica y la solvencia del dictamen son el único activo.'],
            ['Principios de trabajo', '<b>Independencia técnica</b> — innegociable, sin exclusivas. <b>Plazos por contrato</b> — si no se puede garantizar, no se acepta el encargo. <b>Honorarios fijos</b> — acordados antes del inicio, ratificación incluida. <b>Claridad técnica</b> — un dictamen que no se entiende en sala no tiene valor.'],
          ]} />
        </div>
        <Qual label="Habilitación profesional" onIntake={open} cta="Consultar disponibilidad" note="L–J 9h–18h · V 9h–14h · Cita previa"
          items={[['TÍT', 'Ingeniero Civil — ETSECCPB · UPC'], ['COL', 'ECCAT nº 16448'], ['JUD', 'Perito Judicial — Ministerio de Justicia'], ['IRD', 'Perito de Seguros — INESE'], ['BCN', 'C. de Numància, 95 · 08029 Barcelona'], ['GRA', 'C. Navarra, 14 · 08401 Granollers']]} />
      </div>
    </section>
    <BandCTA eyebrow="Disponibilidad" title="¿Necesitas un perito con esta formación?" btn="Consultar caso" onClick={open} />
  </>);
}

/* ── CONTACTO ──────────────────────────────────────────── */
function Contacto({ go, open }) {
  return (<>
    <PageHero go={go} trail={[{ label: 'Inicio', go: 'home' }, { label: 'Contacto' }]}
      title='Solicitar<br/>consulta técnica'
      lede="Primera valoración sin coste. Respuesta en menos de 24 horas laborables. Para asuntos urgentes, contacto directo por teléfono." />
    <section style={sec}>
      <div style={sgrid} className="site-two">
        <Body blocks={[
          ['Canales', '<b style="color:var(--text-strong)">614 194 985</b> · <b style="color:var(--text-strong)">info@perito.barcelona</b>'],
          ['Sedes', '<b>Barcelona (principal)</b> — Carrer de Numància, 95, Local 5 · 08029 Barcelona. Con cita previa · L–J 9h–18h · V 9h–14h.<br/><b>Granollers</b> — Carrer Navarra, 14 · 08401 Granollers. Con cita previa.'],
          ['Confidencialidad', 'Toda la información de la consulta inicial se trata con estricta confidencialidad conforme al RGPD (Reglamento UE 2016/679), exclusivamente para la gestión de la consulta.'],
        ]} />
        <Qual label="Consulta guiada" onIntake={open} cta="Iniciar consulta guiada" note="Confidencial · Sin compromiso"
          items={[['01', 'Tipo de asunto'], ['02', 'Descripción breve'], ['03', 'Importe en disputa'], ['04', 'Situación procesal'], ['05', 'Datos de contacto']]} />
      </div>
    </section>
  </>);
}

Object.assign(window, { Construccion, Informes, Svc, Casos, Abogados, Honorarios, Despacho, Contacto });
})();
