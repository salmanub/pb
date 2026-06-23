import React from 'react';

/**
 * SectionHeader — the marginalia system. A mono reference eyebrow,
 * a serif title, and an optional lede. Establishes the dossier
 * structure across the whole site.
 */
export function SectionHeader({
  eyebrow = null,
  title,
  lede = null,
  align = 'left',
  size = 'md',
  onDark = false,
  style = {},
  ...rest
}) {
  const titleSize = size === 'lg' ? 'var(--fs-display-2)' : size === 'sm' ? 'var(--fs-h2)' : 'var(--fs-h1)';
  return (
    <header
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? '720px' : 'none',
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
        ...style,
      }}
      {...rest}
    >
      {eyebrow && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-label)',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          fontWeight: 'var(--fw-medium)',
          color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-accent)',
          marginBottom: '18px',
        }}>
          <span style={{ width: '24px', height: '1.5px', background: 'var(--accent)', display: 'inline-block' }} />
          {eyebrow}
        </div>
      )}
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: titleSize,
        fontWeight: 'var(--fw-regular)',
        lineHeight: 'var(--lh-heading)',
        letterSpacing: 'var(--tracking-tight)',
        color: onDark ? 'var(--text-on-dark)' : 'var(--text-strong)',
        margin: 0,
      }}>
        {title}
      </h2>
      {lede && (
        <p style={{
          marginTop: '20px',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--fs-lede)',
          lineHeight: 'var(--lh-lede)',
          color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
          maxWidth: '60ch',
          marginLeft: align === 'center' ? 'auto' : 0,
          marginRight: align === 'center' ? 'auto' : 0,
        }}>
          {lede}
        </p>
      )}
    </header>
  );
}
