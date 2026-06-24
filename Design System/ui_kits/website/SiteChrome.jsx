/* global React */
// Shared chrome for the perito.barcelona website UI kit:
// Icon (Lucide), SiteHeader, SiteFooter, Placeholder, Reveal.

const { Button, Wordmark, Seal, Tag } = window.VilardellPeritajeForenseDesignSystem_58f0b0;

/** Lucide icon → inline SVG, recolourable via `color`. */
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.6, style = {} }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      ref.current.appendChild(i);
      window.lucide.createIcons({ attrs: { width: size, height: size, 'stroke-width': strokeWidth } });
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} style={{ display: 'inline-flex', color, ...style }} aria-hidden="true" />;
}

/** Documentary image panel — real stock image with reliable fallback (never broken). */
const STOCK = {
  portrait: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=70',
  obra: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1100&q=70',
  edificio: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=70',
  detalle: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1100&q=70',
};
function pickStock(label = '') {
  const l = label.toLowerCase();
  if (/albert|retrato|perito|despacho/.test(l)) return STOCK.portrait;
  if (/inspecc|obra|campo|construc/.test(l)) return STOCK.obra;
  if (/termograf|humedad|filtrac|diagn/.test(l)) return STOCK.detalle;
  return STOCK.edificio;
}
function Placeholder({ label, ratio = '4 / 3', tone = 'stone', seal = false, src, style = {} }) {
  const seed = encodeURIComponent((label || 'perito').slice(0, 24));
  const list = [src || pickStock(label), `https://picsum.photos/seed/${seed}/900/700?grayscale`];
  const [i, setI] = React.useState(0);
  const loaded = React.useRef(false);
  React.useEffect(() => {
    loaded.current = false;
    const t = setTimeout(() => { if (!loaded.current) setI((x) => Math.min(x + 1, list.length - 1)); }, 2600);
    return () => clearTimeout(t);
  }, [i]);
  return (
    <div style={{
      aspectRatio: ratio, background: 'var(--stone-200)', borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden', ...style,
    }}>
      <img src={list[i]} alt={label || ''}
        onLoad={() => { loaded.current = true; }}
        onError={() => setI((x) => Math.min(x + 1, list.length - 1))}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.18) contrast(1.02)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(28,26,23,0.55), rgba(28,26,23,0.04) 45%, transparent)' }} />
      {seal && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <Seal size={84} tone="light" />
        </div>
      )}
      {label && (
        <span style={{
          position: 'absolute', left: 0, bottom: 0, margin: '14px', fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff',
          textShadow: '0 1px 4px rgba(0,0,0,0.45)',
        }}>{label}</span>
      )}
    </div>
  );
}

/** Fade-up on scroll into view. */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? 'none' : 'translateY(16px)',
      transition: `opacity var(--dur-slow) var(--ease-out) ${delay}ms, transform var(--dur-slow) var(--ease-out) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

const NAVITEMS = [
  ['Perito Construcción', 'construccion'],
  ['Casos', 'casos'],
  ['Abogados·Seguros', 'abogados'],
  ['Bitácora', 'bitacora'],
  ['Despacho', 'despacho'],
];

function SiteHeader({ go, active = 'home' }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [dd, setDd] = React.useState(false);
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const linkStyle = (on) => ({ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 500, color: on ? 'var(--text-accent)' : 'var(--text-body)', cursor: 'pointer', background: 'none', border: 'none', padding: '4px 0', display: 'inline-flex', alignItems: 'center', gap: '5px' });
  const svcs = window.SVCS || [];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(241,241,234,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(180%) blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'background var(--dur-base), border-color var(--dur-base)',
    }}>
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '0 var(--gutter)', height: '74px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); go('home'); }} style={{ display: 'flex' }}><Wordmark variant="lockup" size={25} /></a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="site-nav">
          <button style={linkStyle(active === 'construccion')} onClick={() => go('construccion')}>Perito Construcción</button>
          <div style={{ position: 'relative' }} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
            <button style={linkStyle(active === 'informes' || active.startsWith('svc'))} onClick={() => go('informes')}>Dictámenes <Icon name="chevron-down" size={13} /></button>
            {dd && (
              <div style={{ position: 'absolute', top: 'calc(100% + 12px)', left: '-16px', background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', minWidth: '320px', boxShadow: 'var(--shadow-overlay)', overflow: 'hidden' }}>
                {svcs.map((s) => (
                  <button key={s.slug} onClick={() => { setDd(false); go('svc-' + s.slug); }} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', width: '100%', textAlign: 'left', padding: '11px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-tint)'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-accent)', fontWeight: 600, letterSpacing: '0.06em' }}>{s.num}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>{s.t}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {NAVITEMS.slice(1).map(([l, d]) => <button key={d} style={linkStyle(active === d)} onClick={() => go(d)}>{l}</button>)}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="tel:+34614194985" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-strong)', letterSpacing: '0.02em' }} className="site-phone">
            <Icon name="phone" size={15} color="var(--accent)" /> 614 194 985
          </a>
          <Button variant="primary" size="sm" onClick={() => go('contacto')}>Solicitar dictamen</Button>
          <button className="site-burger" onClick={() => setM(!m)} aria-label="Menú" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-strong)' }}><Icon name={m ? 'x' : 'menu'} size={22} /></button>
        </div>
      </div>
      {m && (
        <div className="site-mobile" style={{ display: 'none', flexDirection: 'column', padding: '8px var(--gutter) 18px', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-subtle)' }}>
          {[['Perito Construcción', 'construccion'], ['Dictámenes', 'informes'], ...NAVITEMS.slice(1), ['Contacto', 'contacto']].map(([l, d]) => (
            <button key={d} onClick={() => { setM(false); go(d); }} style={{ textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--border-subtle)', padding: '13px 0', fontSize: '0.95rem', color: 'var(--text-strong)', cursor: 'pointer' }}>{l}</button>
          ))}
        </div>
      )}
    </header>
  );
}

function FooterCol({ title, links, go }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-on-dark-muted)', marginBottom: '18px' }}>{title}</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {links.map(([l, d]) => (
          <li key={l}><a href="#" onClick={(e) => { e.preventDefault(); if (d) go(d); }} style={{ color: 'var(--bone-100)', fontSize: '0.9rem', opacity: 0.82 }}>{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

function SiteFooter({ go }) {
  return (
    <footer style={{ background: 'var(--ink-900)', color: 'var(--bone-100)' }}>
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-20) var(--gutter) var(--space-12)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '48px' }} className="footer-grid">
          <div>
            <Wordmark variant="stacked" tone="light" size={24} />
            <p style={{ marginTop: '22px', maxWidth: '34ch', color: 'var(--text-on-dark-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Dictámenes periciales sobre edificación y obra civil. Sede en Barcelona, actuación en toda España.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '22px', flexWrap: 'wrap' }}>
              <Tag variant="outline" style={{ color: 'var(--text-on-dark-muted)', borderColor: 'var(--ink-700)' }}>ECCAT · 16448</Tag>
              <Tag variant="outline" style={{ color: 'var(--text-on-dark-muted)', borderColor: 'var(--ink-700)' }}>Perito judicial</Tag>
            </div>
          </div>
          <FooterCol go={go} title="Dictámenes" links={[['Vicios ocultos', 'svc-vicios-ocultos'], ['Humedades y filtraciones', 'svc-humedades-filtraciones'], ['Patologías estructurales', 'svc-patologias-estructurales'], ['Mala ejecución', 'svc-reclamacion-mala-ejecucion'], ['Ver catálogo', 'informes']]} />
          <FooterCol go={go} title="Despacho" links={[['Perito Construcción', 'construccion'], ['Casos ratificados', 'casos'], ['Bitácora técnica', 'bitacora'], ['Honorarios', 'honorarios'], ['El Despacho', 'despacho']]} />
          <FooterCol go={go} title="Contacto" links={[['Solicitar dictamen', 'contacto'], ['Primera consulta', 'contacto'], ['614 194 985', null], ['info@perito.barcelona', null]]} />
        </div>
        <div style={{
          marginTop: 'var(--space-16)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--ink-700)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
          fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-on-dark-muted)',
        }}>
          <span>© 2026 Albert Vilardell Serra · Perito judicial</span>
          <span>Aviso legal · Privacidad · Cookies</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Placeholder, Reveal, SiteHeader, SiteFooter });
