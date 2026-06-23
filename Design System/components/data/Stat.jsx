import React from 'react';

/**
 * Stat — a verifiable figure presented as evidence, not a boast.
 * Big mono number, sober label, optional source note. The source
 * is what makes it credible — always cite where you can.
 */
export function Stat({
  value,
  label,
  source = null,
  align = 'left',
  accent = false,
  onDark = false,
  style = {},
  ...rest
}) {
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-data-xl)',
        fontWeight: 'var(--fw-medium)',
        lineHeight: 1,
        letterSpacing: '-0.01em',
        color: accent ? (onDark ? 'var(--oxide-400)' : 'var(--accent)') : (onDark ? 'var(--bone-100)' : 'var(--text-strong)'),
        fontVariantNumeric: 'tabular-nums',
      }}>
        {value}
      </div>
      <div style={{
        marginTop: '12px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-body-sm)',
        lineHeight: 1.4,
        color: onDark ? 'var(--text-on-dark)' : 'var(--text-body)',
        maxWidth: '30ch',
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
      }}>
        {label}
      </div>
      {source && (
        <div style={{
          marginTop: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase',
          color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-faint)',
        }}>
          {source}
        </div>
      )}
    </div>
  );
}
