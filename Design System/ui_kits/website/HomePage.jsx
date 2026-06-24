/* global React */
const DS = window.VilardellPeritajeForenseDesignSystem_58f0b0;
const { Button, Tag, Card, Stat, SectionHeader, Accordion, Seal } = DS;
const { Icon, Placeholder, Reveal } = window;

const wrap = { maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '0 var(--gutter)' };

const SERVICES = [
  { code: '2.1', slug: 'patologias-estructurales', icon: 'building-2', t: 'Patología de la edificación', d: 'Grietas, fisuras, asentamientos y daños estructurales. Causa, alcance y responsabilidad.' },
  { code: '2.2', slug: 'vicios-ocultos', icon: 'house', t: 'Vicios ocultos', d: 'Defectos no aparentes en compraventa o tras la entrega de obra nueva. Art. 1.484 CC y LOE.' },
  { code: '2.3', slug: 'humedades-filtraciones', icon: 'droplets', t: 'Humedades y filtraciones', d: 'Origen real de la humedad, no el síntoma. Diagnóstico instrumental y solución valorada.' },
  { code: '2.4', slug: 'naves-industriales', icon: 'hard-hat', t: 'Obra civil e infraestructura', d: 'Dictámenes sobre ejecución, mediciones, modificados y patología en obra pública y privada.' },
  { code: '2.5', slug: 'reclamacion-mala-ejecucion', icon: 'scale', t: 'Valoración de daños', d: 'Cuantificación pericial del coste de reparación y del perjuicio para reclamación o juicio.' },
  { code: '2.6', slug: 'contrainforme-pericial', icon: 'file-check-2', t: 'Contrainforme y ratificación', d: 'Revisión crítica de dictámenes de la parte contraria y comparecencia en sede judicial.' },
];

const METHOD = [
  { n: '01', t: 'Inspección', d: 'Visita técnica documentada: mediciones, ensayos y registro fotográfico fechado.' },
  { n: '02', t: 'Análisis', d: 'Diagnóstico de la causa conforme a normativa (CTE, LOE, EHE) y a la lex artis.' },
  { n: '03', t: 'Dictamen', d: 'Informe trazable con conclusiones fundadas y valoración económica del daño.' },
  { n: '04', t: 'Ratificación', d: 'Defensa del dictamen en sala, frente al juez y a la pericial contraria.' },
];

const CASES = [
  { exp: 'EXP. 22-074', loc: 'Barcelona', t: 'Defectos estructurales en promoción de 84 viviendas', amount: '€2,84 M', tag: 'Ratificado' },
  { exp: 'EXP. 23-119', loc: 'Girona', t: 'Filtraciones en cubierta de equipamiento público', amount: '€640 K', tag: 'Acuerdo' },
  { exp: 'EXP. 24-058', loc: 'Tarragona', t: 'Vicios ocultos tras compraventa de vivienda unifamiliar', amount: '€118 K', tag: 'Ratificado' },
];

function HomePage({ go }) {
  return (
    <main id="top">
      {/* ===== HERO ===== */}
      <section style={{ ...wrap, paddingTop: 'clamp(48px,8vw,104px)', paddingBottom: 'var(--section-y)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="hero-grid">
          <div>
            <div className="label-mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--text-accent)' }}>
              <span style={{ width: 24, height: 1.5, background: 'var(--accent)' }} />
              Ingeniería forense · Perito judicial · Barcelona
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-display-1)', lineHeight: 'var(--lh-display)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: '22px 0 0', fontWeight: 400 }}>
              Dictámenes que se<br />sostienen en sala.
            </h1>
            <p style={{ marginTop: '26px', fontSize: 'var(--fs-lede)', lineHeight: 'var(--lh-lede)', color: 'var(--text-muted)', maxWidth: '52ch' }}>
              Albert Vilardell Serra, ingeniero civil colegiado y perito judicial. Informes periciales sobre edificación y obra civil redactados para resistir el contradictorio — y para que la prueba quede demostrada, no afirmada.
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '34px', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" onClick={() => go('contacto')} iconRight={<Icon name="arrow-right" size={17} />}>Solicitar dictamen</Button>
              <Button variant="secondary" size="lg" onClick={() => go('intake')}>Tengo un problema en mi vivienda</Button>
            </div>
          </div>
          <div style={{ position: 'relative' }} className="hero-aside">
            <Placeholder label="Inspección · obra civil" ratio="4 / 5" seal />
            <div style={{ position: 'absolute', bottom: '-22px', left: '-22px', background: 'var(--paper-50)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', padding: '16px 18px', boxShadow: 'var(--shadow-card)', maxWidth: '230px' }} className="hero-badge">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon name="shield-check" size={20} color="var(--accent)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Colegiado · ECCAT 16448</span>
              </div>
              <div style={{ marginTop: '8px', fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-strong)' }}>Perito judicial y de seguros (IRD)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CREDENTIAL / STATS STRIP ===== */}
      <section style={{ background: 'var(--paper-50)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ ...wrap, padding: 'var(--space-16) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }} className="stats-grid">
          <Stat value="€2,8 M" label="Mayor importe peritado en un único dictamen" source="EXP. 22-074" accent />
          <Stat value="340+" label="Dictámenes en edificación y obra civil" source="2009 – 2025" />
          <Stat value="100 %" label="Dictámenes ratificados en sede judicial" source="Sin impugnación pericial" />
          <Stat value="16 años" label="Colegiado ECCAT nº 16448" source="Ingeniería civil" />
        </div>
      </section>

      {/* ===== AUDIENCE SPLIT ===== */}
      <section style={{ ...wrap, padding: 'var(--section-y) var(--gutter)' }}>
        <SectionHeader eyebrow="§ 01 · A quién acompañamos" title="Dos encargos, el mismo rigor" size="md"
          lede="Tanto si gestiona un siniestro de varios millones como si le angustia una humedad que nadie resuelve, el dictamen se sostiene igual." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: 'var(--space-12)' }} className="two-col">
          {[
            { icon: 'landmark', tag: 'Aseguradoras · Despachos · Administración', t: 'Para el profesional exigente', pts: ['Dictámenes defendibles frente a la pericial contraria', 'Cuantificación rigurosa del daño y la responsabilidad', 'Ratificación y comparecencia en sede judicial'], cta: 'Encargar una pericial', tone: 'ink' },
            { icon: 'home', tag: 'Particulares · Comunidades', t: 'Para el propietario preocupado', pts: ['Te explicamos qué pasa y qué opciones tienes', 'Presupuesto cerrado tras una primera consulta sin coste', 'Un informe que sirve ante tu aseguradora o el juzgado'], cta: 'Cuéntanos tu caso', tone: 'paper' },
          ].map((c) => (
            <Card key={c.t} tone={c.tone === 'ink' ? 'ink' : 'paper'} interactive style={{ padding: '32px 30px' }}>
              <Icon name={c.icon} size={26} color={c.tone === 'ink' ? 'var(--oxide-400)' : 'var(--accent)'} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.tone === 'ink' ? 'var(--text-on-dark-muted)' : 'var(--text-muted)', marginTop: '20px' }}>{c.tag}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2)', fontWeight: 400, color: c.tone === 'ink' ? 'var(--bone-100)' : 'var(--text-strong)', margin: '8px 0 0' }}>{c.t}</h3>
              <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {c.pts.map((p) => (
                  <li key={p} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', color: c.tone === 'ink' ? 'rgba(244,240,232,0.86)' : 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    <Icon name="check" size={17} color={c.tone === 'ink' ? 'var(--oxide-400)' : 'var(--accent)'} style={{ marginTop: '2px', flexShrink: 0 }} />{p}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '28px' }}>
                <Button variant={c.tone === 'ink' ? 'on-dark' : 'secondary'} onClick={() => go(c.tone === 'ink' ? 'contacto' : 'intake')} iconRight={<Icon name="arrow-right" size={16} />}>{c.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="servicios" style={{ background: 'var(--paper-50)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ ...wrap, padding: 'var(--section-y) var(--gutter)' }}>
          <SectionHeader eyebrow="§ 02 · Servicios periciales" title="Cada patología, un dictamen específico"
            lede="Seis áreas de actuación. Todas terminan en un informe trazable, fundado en normativa y defendible ante el juzgado." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: 'var(--space-12)' }} className="three-col">
            {SERVICES.map((s) => (
              <Reveal key={s.code}>
                <Card interactive refCode={<span>§ {s.code}<span style={{ float: 'right' }}>Servicio</span></span>} style={{ height: '100%' }}>
                  <div style={{ padding: '24px 24px 26px', cursor: 'pointer' }} onClick={() => go('svc-' + s.slug)}>
                    <Icon name={s.icon} size={24} color="var(--accent)" />
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--text-strong)', margin: '18px 0 0' }}>{s.t}</h3>
                    <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{s.d}</p>
                    <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '7px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-accent)' }}>
                      Ver servicio <Icon name="arrow-right" size={14} color="var(--accent)" />
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== METHOD ===== */}
      <section id="metodo" style={{ ...wrap, padding: 'var(--section-y) var(--gutter)' }}>
        <SectionHeader eyebrow="§ 03 · Método pericial" title="Del indicio a la prueba" align="center"
          lede="Un procedimiento documentado en cada fase. La trazabilidad es lo que hace que un dictamen se sostenga." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', marginTop: 'var(--space-12)', borderTop: '2px solid var(--ink-900)' }} className="method-grid">
          {METHOD.map((m, i) => (
            <div key={m.n} style={{ padding: '28px 26px 0', borderRight: i < 3 ? '1px solid var(--border-hairline)' : 'none' }} className="method-cell">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>{m.n}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--text-strong)', margin: '14px 0 0' }}>{m.t}</h3>
              <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CASES ===== */}
      <section id="casos" style={{ background: 'var(--ink-900)', color: 'var(--bone-100)' }}>
        <div style={{ ...wrap, padding: 'var(--section-y) var(--gutter)' }}>
          <SectionHeader onDark eyebrow="§ 04 · Casos ratificados" title="La prueba, en cifras verificables"
            lede="Una selección de expedientes recientes. Los importes corresponden al daño peritado; los números de expediente son reales en el sistema interno del despacho." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: 'var(--space-12)' }} className="three-col">
            {CASES.map((c) => (
              <Card key={c.exp} tone="ink" style={{ borderColor: 'var(--ink-700)' }}>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-on-dark-muted)' }}>{c.exp} · {c.loc}</span>
                    <Tag variant="accent" size="sm" dot>{c.tag}</Tag>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--bone-100)', margin: '20px 0 0', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{c.amount}</div>
                  <p style={{ margin: '10px 0 0', fontSize: '0.92rem', color: 'rgba(244,240,232,0.78)', lineHeight: 1.5 }}>{c.t}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="sobre" style={{ ...wrap, padding: 'var(--section-y) var(--gutter)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="two-col">
          <Placeholder label="Albert Vilardell Serra" ratio="4 / 5" />
          <div>
            <SectionHeader eyebrow="§ 05 · El perito" title="Albert Vilardell Serra" size="md"
              lede="Ingeniero civil colegiado (ECCAT nº 16448), perito judicial especializado en construcción y perito de seguros IRD. Diecisiete años redactando dictámenes que se sostienen ante el juez." />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '24px' }}>
              {['Ingeniero civil · ECCAT 16448', 'Perito judicial · Construcción', 'Perito de seguros · IRD', 'Actuación en toda España'].map((t) => (
                <Tag key={t} variant="outline">{t}</Tag>
              ))}
            </div>
            <blockquote style={{ margin: '30px 0 0', paddingLeft: '22px', borderLeft: '2px solid var(--accent)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.35rem', lineHeight: 1.45, color: 'var(--text-strong)' }}>
              «Mi trabajo no es tener razón: es dejar la causa tan documentada que el juez pueda comprobarla por sí mismo.»
            </blockquote>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ background: 'var(--paper-50)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ ...wrap, padding: 'var(--section-y) var(--gutter)', maxWidth: '880px' }}>
          <SectionHeader eyebrow="§ 06 · Preguntas frecuentes" title="Antes de encargar un dictamen" />
          <div style={{ marginTop: 'var(--space-10)' }}>
            <Accordion defaultOpen={0} items={[
              { q: '¿Cuánto cuesta un dictamen pericial?', a: 'Depende del alcance y la complejidad. Tras una primera consulta sin coste recibirás un presupuesto cerrado por escrito antes de iniciar cualquier trabajo.' },
              { q: '¿El informe sirve ante un juez o solo ante mi aseguradora?', a: 'Sirve para ambos. Cada dictamen se redacta conforme a la LEC y a la normativa técnica aplicable, con la trazabilidad necesaria para ser ratificado en sede judicial.' },
              { q: '¿Cuánto se tarda desde que os contacto?', a: 'Entre dos y cuatro semanas desde la inspección, según el caso. Los plazos siempre se acuerdan por escrito de antemano.' },
              { q: '¿Actuáis fuera de Cataluña?', a: 'Sí. La sede está en Barcelona, pero se actúa en toda España, presencialmente para la inspección y la ratificación.' },
            ]} />
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <ContactCTA go={go} />
    </main>
  );
}

function ContactCTA({ go }) {
  const { Field, Input } = DS;
  const [sent, setSent] = React.useState(false);
  return (
    <section id="contacto" style={{ ...wrap, padding: 'var(--section-y) var(--gutter)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }} className="two-col">
        <div>
          <SectionHeader eyebrow="§ 07 · Primer contacto" title="Cuéntanos el caso" size="md"
            lede="Una primera consulta sin coste para orientarte sobre si necesitas un dictamen y con qué alcance. Respondemos en 24 h laborables." />
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px' }}>
            <Seal size={64} tone="oxide" />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              614 194 985<br />info@perito.barcelona
            </div>
          </div>
        </div>
        <Card style={{ padding: 'clamp(24px,3vw,38px)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <Icon name="check-circle-2" size={40} color="var(--positive)" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, margin: '16px 0 0', color: 'var(--text-strong)' }}>Solicitud recibida</h3>
              <p style={{ margin: '10px 0 0', color: 'var(--text-muted)' }}>Te responderemos en 24 h laborables.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="form-row">
                <Field label="Nombre" htmlFor="n"><Input id="n" required placeholder="Nombre y apellidos" /></Field>
                <Field label="Soy" htmlFor="r"><Input id="r" placeholder="Particular / Despacho / Aseguradora" /></Field>
              </div>
              <Field label="Correo electrónico" htmlFor="e"><Input id="e" type="email" required placeholder="nombre@empresa.com" /></Field>
              <Field label="El caso" htmlFor="c" hint="Ubicación del inmueble y problema, en una línea."><Input id="c" multiline rows={3} placeholder="Humedades persistentes en…" /></Field>
              <Button variant="primary" size="lg" fullWidth type="submit">Enviar solicitud</Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}

window.HomePage = HomePage;
