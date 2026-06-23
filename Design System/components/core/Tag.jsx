import React from 'react';

/**
 * Tag — the brand's signature evidence label. Monospace, tracked,
 * often a reference code (EXP. 16448 · ECCAT). Use it to stamp
 * sections, cases and figures with documentary authority.
 */
export function Tag({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: '0.6875rem', padding: '3px 7px' },
    md: { fontSize: 'var(--fs-mono-label)', padding: '4px 9px' },
  };

  const variants = {
    default: { background: 'var(--surface-muted)', color: 'var(--text-muted)', border: '1px solid transparent' },
    outline: { background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-hairline)' },
    accent:  { background: 'var(--accent-tint)', color: 'var(--oxide-600)', border: '1px solid var(--oxide-200)' },
    ink:     { background: 'var(--ink-900)', color: 'var(--bone-100)', border: '1px solid var(--ink-900)' },
    positive:{ background: 'var(--positive-tint)', color: 'var(--positive)', border: '1px solid transparent' },
    caution: { background: 'var(--caution-tint)', color: 'var(--caution)', border: '1px solid transparent' },
  };

  const dotColors = {
    default: 'var(--concrete-500)', outline: 'var(--concrete-500)', accent: 'var(--oxide-500)',
    ink: 'var(--oxide-400)', positive: 'var(--positive)', caution: 'var(--caution)',
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        lineHeight: 1.2,
        borderRadius: 'var(--radius-xs)',
        whiteSpace: 'nowrap',
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dotColors[variant], flexShrink: 0 }} />
      )}
      {children}
    </span>
  );
}
