import React from 'react';

/**
 * Card — hairline-bordered, near-square, documentary surface.
 * No glossy shadow by default. Optional reference code header rule.
 */
export function Card({
  children,
  refCode = null,
  interactive = false,
  tone = 'paper',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const tones = {
    paper: { background: 'var(--surface-card)', borderColor: 'var(--border-hairline)' },
    raised: { background: 'var(--surface-raised)', borderColor: 'var(--border-subtle)' },
    ink: { background: 'var(--surface-ink)', borderColor: 'var(--ink-700)' },
    tint: { background: 'var(--surface-tint)', borderColor: 'var(--oxide-200)' },
  };

  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        borderRadius: 'var(--radius-md)',
        border: '1px solid',
        ...tones[tone],
        borderColor: interactive && hover ? 'var(--border-accent)' : tones[tone].borderColor,
        transition: 'border-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        transform: interactive && hover ? 'var(--lift)' : 'none',
        boxShadow: interactive && hover ? 'var(--shadow-card)' : 'none',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {refCode && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 18px',
          borderBottom: '1px solid',
          borderColor: tone === 'ink' ? 'var(--ink-700)' : 'var(--border-subtle)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-label)',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          color: tone === 'ink' ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
        }}>
          {refCode}
        </div>
      )}
      {children}
    </div>
  );
}
