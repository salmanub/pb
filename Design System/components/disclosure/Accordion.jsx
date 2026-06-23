import React from 'react';

/**
 * Accordion — quiet FAQ disclosure for the worried-homeowner audience.
 * Hairline dividers, serif question, mono index. No chrome, no shadows.
 */
export function Accordion({ items = [], defaultOpen = 0, style = {}, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ borderTop: '1px solid var(--border-hairline)', ...style }} {...rest}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '18px', width: '100%',
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                padding: '22px 0', font: 'inherit', color: 'var(--text-strong)',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-faint)',
                letterSpacing: 'var(--tracking-mono)', flexShrink: 0, width: '28px',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-medium)',
                lineHeight: 1.35, flex: 1,
              }}>
                {item.q}
              </span>
              <span style={{
                width: '20px', height: '20px', flexShrink: 0, position: 'relative',
                transition: 'transform var(--dur-base) var(--ease-out)',
                transform: isOpen ? 'rotate(45deg)' : 'none', color: 'var(--accent)',
              }}>
                <span style={{ position: 'absolute', top: '9px', left: '2px', width: '16px', height: '1.5px', background: 'currentColor' }} />
                <span style={{ position: 'absolute', left: '9px', top: '2px', height: '16px', width: '1.5px', background: 'currentColor' }} />
              </span>
            </button>
            <div style={{
              display: 'grid',
              gridTemplateRows: isOpen ? '1fr' : '0fr',
              transition: 'grid-template-rows var(--dur-base) var(--ease-out)',
            }}>
              <div style={{ overflow: 'hidden' }}>
                <p style={{
                  margin: 0, padding: 0, paddingLeft: '46px', paddingBottom: '24px',
                  fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)',
                  color: 'var(--text-muted)', maxWidth: '62ch',
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
