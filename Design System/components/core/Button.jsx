import React from 'react';

/**
 * Button — the brand's primary action. Square-ish corners, no glossy
 * shadow. Press darkens rather than scales (precise, not playful).
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  as = 'button',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    sm: { padding: '8px 14px', fontSize: '0.8125rem', gap: '7px' },
    md: { padding: '12px 22px', fontSize: '0.9375rem', gap: '9px' },
    lg: { padding: '15px 28px', fontSize: '1rem', gap: '10px' },
  };

  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes[size].gap,
    padding: sizes[size].padding,
    fontFamily: 'var(--font-sans)',
    fontSize: sizes[size].fontSize,
    fontWeight: 'var(--fw-semibold)',
    lineHeight: 1,
    letterSpacing: '0.005em',
    borderRadius: 'var(--radius-sm)',
    border: '1.5px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  const variants = {
    primary: {
      background: active ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--accent-on)',
      borderColor: 'transparent',
    },
    secondary: {
      background: hover ? 'var(--ink-900)' : 'transparent',
      color: hover ? 'var(--bone-100)' : 'var(--ink-900)',
      borderColor: 'var(--ink-900)',
    },
    ghost: {
      background: hover ? 'var(--surface-muted)' : 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'transparent',
    },
    'on-dark': {
      background: active ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--accent-on)',
      borderColor: 'transparent',
    },
  };

  const Tag = as;
  return (
    <Tag
      style={{ ...base, ...variants[variant], ...style }}
      disabled={as === 'button' ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
