import React from 'react';

/**
 * Field — label + control wrapper with mono label and optional hint.
 * Wrap Input, Textarea or Select.
 */
export function Field({ label, hint = null, optional = false, htmlFor, children, style = {}, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', ...style }} {...rest}>
      {label && (
        <label htmlFor={htmlFor} style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-label)',
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          fontWeight: 'var(--fw-medium)', color: 'var(--text-muted)',
        }}>
          <span>{label}</span>
          {optional && <span style={{ color: 'var(--text-faint)', textTransform: 'none', letterSpacing: 0 }}>opcional</span>}
        </label>
      )}
      {children}
      {hint && (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-small)', color: 'var(--text-muted)' }}>
          {hint}
        </span>
      )}
    </div>
  );
}
