import React from 'react';

/**
 * Wordmark — the denominative logo. Serif "perito" + oxide seal dot
 * + mono "barcelona". The serif carries authority; the mono ties it
 * to the domain and the documentary system.
 */
export function Wordmark({
  variant = 'lockup',   // 'lockup' | 'stacked' | 'mono'
  tone = 'ink',         // 'ink' | 'light'
  size = 28,
  style = {},
  ...rest
}) {
  const ink = tone === 'light' ? 'var(--bone-100)' : 'var(--ink-900)';
  const sub = tone === 'light' ? 'var(--text-on-dark-muted)' : 'var(--concrete-600)';

  const mark = (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', lineHeight: 1, fontSize: `${size}px` }}>
      <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, color: ink, letterSpacing: '-0.01em' }}>
        perito
      </span>
      <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>.</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 500, color: sub,
        fontSize: `${size * 0.62}px`, letterSpacing: '0.01em',
      }}>
        barcelona
      </span>
    </span>
  );

  if (variant === 'mono') {
    return (
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 600, color: ink,
        fontSize: `${size * 0.62}px`, letterSpacing: '0.18em', textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', gap: '8px', ...style,
      }} {...rest}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)' }} />
        PERITO·BCN
      </span>
    );
  }

  if (variant === 'stacked') {
    return (
      <span style={{ display: 'inline-flex', flexDirection: 'column', gap: '6px', ...style }} {...rest}>
        {mark}
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: `${Math.max(9, size * 0.32)}px`,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: sub, fontWeight: 500,
        }}>
          Peritaje · Ingeniería forense
        </span>
      </span>
    );
  }

  return <span style={{ display: 'inline-flex', ...style }} {...rest}>{mark}</span>;
}
