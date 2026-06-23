import React from 'react';

/**
 * Input — square, hairline-bordered text control. Oxide focus ring.
 * Use multiline for a textarea.
 */
export function Input({ multiline = false, invalid = false, rows = 4, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const base = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--fs-body)',
    lineHeight: 1.5,
    color: 'var(--text-strong)',
    background: 'var(--surface-raised)',
    border: '1.5px solid',
    borderColor: invalid ? 'var(--accent)' : focus ? 'var(--ink-900)' : 'var(--border-hairline)',
    borderRadius: 'var(--radius-sm)',
    padding: multiline ? '12px 14px' : '11px 14px',
    outline: 'none',
    boxShadow: focus ? 'var(--shadow-focus)' : 'none',
    transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
    resize: multiline ? 'vertical' : undefined,
    fontFamily: 'var(--font-sans)',
  };
  const handlers = {
    onFocus: (e) => { setFocus(true); rest.onFocus && rest.onFocus(e); },
    onBlur: (e) => { setFocus(false); rest.onBlur && rest.onBlur(e); },
  };
  if (multiline) return <textarea rows={rows} style={{ ...base, ...style }} {...rest} {...handlers} />;
  return <input style={{ ...base, ...style }} {...rest} {...handlers} />;
}
