import React from 'react';

/**
 * Seal — the registration stamp device. A hairline oxide ring with
 * curved heading text, a serif monogram and a mono reference line.
 * Use as a credibility mark: "ratificado", colegiado nº, etc.
 */
export function Seal({
  monogram = 'VS',
  top = 'PERITO · BARCELONA',
  bottom = 'ECCAT · 16448',
  size = 120,
  tone = 'oxide',     // 'oxide' | 'ink' | 'light'
  style = {},
  ...rest
}) {
  const colors = {
    oxide: { ring: 'var(--oxide-500)', text: 'var(--oxide-600)', mono: 'var(--oxide-500)' },
    ink:   { ring: 'var(--ink-900)', text: 'var(--ink-900)', mono: 'var(--concrete-600)' },
    light: { ring: 'var(--bone-100)', text: 'var(--bone-100)', mono: 'var(--text-on-dark-muted)' },
  }[tone];

  const id = React.useId ? React.useId().replace(/:/g, '') : 'seal' + Math.round(size);
  const r = 50;
  const rText = 41;

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: 'block', ...style }} {...rest}
      role="img" aria-label={`${monogram} — ${top}`}>
      <defs>
        <path id={`top-${id}`} d={`M ${60 - rText},60 A ${rText},${rText} 0 0 1 ${60 + rText},60`} fill="none" />
        <path id={`bot-${id}`} d={`M ${60 - rText},60 A ${rText},${rText} 0 0 0 ${60 + rText},60`} fill="none" />
      </defs>
      <circle cx="60" cy="60" r={r} fill="none" stroke={colors.ring} strokeWidth="1.5" />
      <circle cx="60" cy="60" r={r - 5} fill="none" stroke={colors.ring} strokeWidth="0.75" opacity="0.55" />
      {/* cardinal ticks */}
      {[0, 90, 180, 270].map((deg) => (
        <line key={deg} x1="60" y1="6" x2="60" y2="11"
          stroke={colors.ring} strokeWidth="1.25"
          transform={`rotate(${deg} 60 60)`} />
      ))}
      <text fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="2.2"
        fill={colors.text} fontWeight="500">
        <textPath href={`#top-${id}`} startOffset="50%" textAnchor="middle">{top}</textPath>
      </text>
      <text fontFamily="var(--font-mono)" fontSize="7" letterSpacing="2"
        fill={colors.mono} fontWeight="500">
        <textPath href={`#bot-${id}`} startOffset="50%" textAnchor="middle">{bottom}</textPath>
      </text>
      <text x="60" y="60" textAnchor="middle" dominantBaseline="central"
        fontFamily="var(--font-serif)" fontSize="30" fontWeight="500" fill={colors.text}
        letterSpacing="0.5">{monogram}</text>
      <line x1="44" y1="72" x2="76" y2="72" stroke={colors.ring} strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}
