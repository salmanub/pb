/* @ds-bundle: {"format":3,"namespace":"VilardellPeritajeForenseDesignSystem_58f0b0","components":[{"name":"Seal","sourcePath":"components/brand/Seal.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"Accordion","sourcePath":"components/disclosure/Accordion.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"StepForm","sourcePath":"components/forms/StepForm.jsx"},{"name":"SectionHeader","sourcePath":"components/layout/SectionHeader.jsx"},{"name":"App","sourcePath":"uploads/perito-definitivo.jsx"}],"sourceHashes":{"components/brand/Seal.jsx":"4c1791f110a8","components/brand/Wordmark.jsx":"8bb9f2071757","components/core/Button.jsx":"9fe964b5c047","components/core/Card.jsx":"77b07b49df14","components/core/Tag.jsx":"69c372093b9e","components/data/Stat.jsx":"1c17b237e98c","components/disclosure/Accordion.jsx":"67927beb26d5","components/forms/Field.jsx":"bf65a90d102b","components/forms/Input.jsx":"5bf21dea6c3a","components/forms/StepForm.jsx":"1af2af095ad8","components/layout/SectionHeader.jsx":"88ceefa6d04c","ui_kits/perito/pages.jsx":"3356a34fc1a0","ui_kits/perito/shared.jsx":"11e85b55b70a","ui_kits/website/HomePage.jsx":"1a423dbae47d","ui_kits/website/HomeVanguard.jsx":"4ec2d94d68c5","ui_kits/website/SiteChrome.jsx":"63c1c25062e6","ui_kits/website/SiteData.jsx":"8dd34fd0c431","ui_kits/website/SitePages.jsx":"89c8d3902506","uploads/perito-definitivo.jsx":"a947401189da"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VilardellPeritajeForenseDesignSystem_58f0b0 = window.VilardellPeritajeForenseDesignSystem_58f0b0 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Seal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Seal — the registration stamp device. A hairline oxide ring with
 * curved heading text, a serif monogram and a mono reference line.
 * Use as a credibility mark: "ratificado", colegiado nº, etc.
 */
function Seal({
  monogram = 'VS',
  top = 'PERITO · BARCELONA',
  bottom = 'ECCAT · 16448',
  size = 120,
  tone = 'oxide',
  // 'oxide' | 'ink' | 'light'
  style = {},
  ...rest
}) {
  const colors = {
    oxide: {
      ring: 'var(--oxide-500)',
      text: 'var(--oxide-600)',
      mono: 'var(--oxide-500)'
    },
    ink: {
      ring: 'var(--ink-900)',
      text: 'var(--ink-900)',
      mono: 'var(--concrete-600)'
    },
    light: {
      ring: 'var(--bone-100)',
      text: 'var(--bone-100)',
      mono: 'var(--text-on-dark-muted)'
    }
  }[tone];
  const id = React.useId ? React.useId().replace(/:/g, '') : 'seal' + Math.round(size);
  const r = 50;
  const rText = 41;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    style: {
      display: 'block',
      ...style
    }
  }, rest, {
    role: "img",
    "aria-label": `${monogram} — ${top}`
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: `top-${id}`,
    d: `M ${60 - rText},60 A ${rText},${rText} 0 0 1 ${60 + rText},60`,
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    id: `bot-${id}`,
    d: `M ${60 - rText},60 A ${rText},${rText} 0 0 0 ${60 + rText},60`,
    fill: "none"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: r,
    fill: "none",
    stroke: colors.ring,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: r - 5,
    fill: "none",
    stroke: colors.ring,
    strokeWidth: "0.75",
    opacity: "0.55"
  }), [0, 90, 180, 270].map(deg => /*#__PURE__*/React.createElement("line", {
    key: deg,
    x1: "60",
    y1: "6",
    x2: "60",
    y2: "11",
    stroke: colors.ring,
    strokeWidth: "1.25",
    transform: `rotate(${deg} 60 60)`
  })), /*#__PURE__*/React.createElement("text", {
    fontFamily: "var(--font-mono)",
    fontSize: "7.5",
    letterSpacing: "2.2",
    fill: colors.text,
    fontWeight: "500"
  }, /*#__PURE__*/React.createElement("textPath", {
    href: `#top-${id}`,
    startOffset: "50%",
    textAnchor: "middle"
  }, top)), /*#__PURE__*/React.createElement("text", {
    fontFamily: "var(--font-mono)",
    fontSize: "7",
    letterSpacing: "2",
    fill: colors.mono,
    fontWeight: "500"
  }, /*#__PURE__*/React.createElement("textPath", {
    href: `#bot-${id}`,
    startOffset: "50%",
    textAnchor: "middle"
  }, bottom)), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "60",
    textAnchor: "middle",
    dominantBaseline: "central",
    fontFamily: "var(--font-serif)",
    fontSize: "30",
    fontWeight: "500",
    fill: colors.text,
    letterSpacing: "0.5"
  }, monogram), /*#__PURE__*/React.createElement("line", {
    x1: "44",
    y1: "72",
    x2: "76",
    y2: "72",
    stroke: colors.ring,
    strokeWidth: "0.75",
    opacity: "0.5"
  }));
}
Object.assign(__ds_scope, { Seal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Seal.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wordmark — the denominative logo. Serif "perito" + oxide seal dot
 * + mono "barcelona". The serif carries authority; the mono ties it
 * to the domain and the documentary system.
 */
function Wordmark({
  variant = 'lockup',
  // 'lockup' | 'stacked' | 'mono'
  tone = 'ink',
  // 'ink' | 'light'
  size = 28,
  style = {},
  ...rest
}) {
  const ink = tone === 'light' ? 'var(--bone-100)' : 'var(--ink-900)';
  const sub = tone === 'light' ? 'var(--text-on-dark-muted)' : 'var(--concrete-600)';
  const mark = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      lineHeight: 1,
      fontSize: `${size}px`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      color: ink,
      letterSpacing: '-0.01em'
    }
  }, "perito"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontFamily: 'var(--font-serif)',
      fontWeight: 600
    }
  }, "."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      color: sub,
      fontSize: `${size * 0.62}px`,
      letterSpacing: '0.01em'
    }
  }, "barcelona"));
  if (variant === 'mono') {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        color: ink,
        fontSize: `${size * 0.62}px`,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: 'var(--accent)'
      }
    }), "PERITO\xB7BCN");
  }
  if (variant === 'stacked') {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '6px',
        ...style
      }
    }, rest), mark, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: `${Math.max(9, size * 0.32)}px`,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: sub,
        fontWeight: 500
      }
    }, "Peritaje \xB7 Ingenier\xEDa forense"));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      ...style
    }
  }, rest), mark);
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the brand's primary action. Square-ish corners, no glossy
 * shadow. Press darkens rather than scales (precise, not playful).
 */
function Button({
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
    sm: {
      padding: '8px 14px',
      fontSize: '0.8125rem',
      gap: '7px'
    },
    md: {
      padding: '12px 22px',
      fontSize: '0.9375rem',
      gap: '9px'
    },
    lg: {
      padding: '15px 28px',
      fontSize: '1rem',
      gap: '10px'
    }
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
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: active ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--accent-on)',
      borderColor: 'transparent'
    },
    secondary: {
      background: hover ? 'var(--ink-900)' : 'transparent',
      color: hover ? 'var(--bone-100)' : 'var(--ink-900)',
      borderColor: 'var(--ink-900)'
    },
    ghost: {
      background: hover ? 'var(--surface-muted)' : 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'transparent'
    },
    'on-dark': {
      background: active ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--accent-on)',
      borderColor: 'transparent'
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    disabled: as === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — hairline-bordered, near-square, documentary surface.
 * No glossy shadow by default. Optional reference code header rule.
 */
function Card({
  children,
  refCode = null,
  interactive = false,
  tone = 'paper',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    paper: {
      background: 'var(--surface-card)',
      borderColor: 'var(--border-hairline)'
    },
    raised: {
      background: 'var(--surface-raised)',
      borderColor: 'var(--border-subtle)'
    },
    ink: {
      background: 'var(--surface-ink)',
      borderColor: 'var(--ink-700)'
    },
    tint: {
      background: 'var(--surface-tint)',
      borderColor: 'var(--oxide-200)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      borderRadius: 'var(--radius-md)',
      border: '1px solid',
      ...tones[tone],
      borderColor: interactive && hover ? 'var(--border-accent)' : tones[tone].borderColor,
      transition: 'border-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      transform: interactive && hover ? 'var(--lift)' : 'none',
      boxShadow: interactive && hover ? 'var(--shadow-card)' : 'none',
      overflow: 'hidden',
      ...style
    }
  }, rest), refCode && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 18px',
      borderBottom: '1px solid',
      borderColor: tone === 'ink' ? 'var(--ink-700)' : 'var(--border-subtle)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-mono-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: tone === 'ink' ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, refCode), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — the brand's signature evidence label. Monospace, tracked,
 * often a reference code (EXP. 16448 · ECCAT). Use it to stamp
 * sections, cases and figures with documentary authority.
 */
function Tag({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: '0.6875rem',
      padding: '3px 7px'
    },
    md: {
      fontSize: 'var(--fs-mono-label)',
      padding: '4px 9px'
    }
  };
  const variants = {
    default: {
      background: 'var(--surface-muted)',
      color: 'var(--text-muted)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid var(--border-hairline)'
    },
    accent: {
      background: 'var(--accent-tint)',
      color: 'var(--oxide-600)',
      border: '1px solid var(--oxide-200)'
    },
    ink: {
      background: 'var(--ink-900)',
      color: 'var(--bone-100)',
      border: '1px solid var(--ink-900)'
    },
    positive: {
      background: 'var(--positive-tint)',
      color: 'var(--positive)',
      border: '1px solid transparent'
    },
    caution: {
      background: 'var(--caution-tint)',
      color: 'var(--caution)',
      border: '1px solid transparent'
    }
  };
  const dotColors = {
    default: 'var(--concrete-500)',
    outline: 'var(--concrete-500)',
    accent: 'var(--oxide-500)',
    ink: 'var(--oxide-400)',
    positive: 'var(--positive)',
    caution: 'var(--caution)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: dotColors[variant],
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stat — a verifiable figure presented as evidence, not a boast.
 * Big mono number, sober label, optional source note. The source
 * is what makes it credible — always cite where you can.
 */
function Stat({
  value,
  label,
  source = null,
  align = 'left',
  accent = false,
  onDark = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-data-xl)',
      fontWeight: 'var(--fw-medium)',
      lineHeight: 1,
      letterSpacing: '-0.01em',
      color: accent ? onDark ? 'var(--oxide-400)' : 'var(--accent)' : onDark ? 'var(--bone-100)' : 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 1.4,
      color: onDark ? 'var(--text-on-dark)' : 'var(--text-body)',
      maxWidth: '30ch',
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0
    }
  }, label), source && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '8px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6875rem',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-faint)'
    }
  }, source));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Accordion — quiet FAQ disclosure for the worried-homeowner audience.
 * Hairline dividers, serif question, mono index. No chrome, no shadows.
 */
function Accordion({
  items = [],
  defaultOpen = 0,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: '1px solid var(--border-hairline)',
      ...style
    }
  }, rest), items.map((item, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        width: '100%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        padding: '22px 0',
        font: 'inherit',
        color: 'var(--text-strong)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-faint)',
        letterSpacing: 'var(--tracking-mono)',
        flexShrink: 0,
        width: '28px'
      }
    }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--fs-h4)',
        fontWeight: 'var(--fw-medium)',
        lineHeight: 1.35,
        flex: 1
      }
    }, item.q), /*#__PURE__*/React.createElement("span", {
      style: {
        width: '20px',
        height: '20px',
        flexShrink: 0,
        position: 'relative',
        transition: 'transform var(--dur-base) var(--ease-out)',
        transform: isOpen ? 'rotate(45deg)' : 'none',
        color: 'var(--accent)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: '9px',
        left: '2px',
        width: '16px',
        height: '1.5px',
        background: 'currentColor'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '9px',
        top: '2px',
        height: '16px',
        width: '1.5px',
        background: 'currentColor'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        padding: 0,
        paddingLeft: '46px',
        paddingBottom: '24px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-body)',
        lineHeight: 'var(--lh-body)',
        color: 'var(--text-muted)',
        maxWidth: '62ch'
      }
    }, item.a))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Field — label + control wrapper with mono label and optional hint.
 * Wrap Input, Textarea or Select.
 */
function Field({
  label,
  hint = null,
  optional = false,
  htmlFor,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: '12px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-mono-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), optional && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      textTransform: 'none',
      letterSpacing: 0
    }
  }, "opcional")), children, hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-small)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — square, hairline-bordered text control. Oxide focus ring.
 * Use multiline for a textarea.
 */
function Input({
  multiline = false,
  invalid = false,
  rows = 4,
  style = {},
  ...rest
}) {
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
    fontFamily: 'var(--font-sans)'
  };
  const handlers = {
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  };
  if (multiline) return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    style: {
      ...base,
      ...style
    }
  }, rest, handlers));
  return /*#__PURE__*/React.createElement("input", _extends({
    style: {
      ...base,
      ...style
    }
  }, rest, handlers));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/StepForm.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StepForm — a guided, one-question-at-a-time intake. Conversational in
 * structure, documentary in form: a "§ NN / NN" progress rule, sober fades,
 * choice steps that advance on selection, and a final contact step.
 *
 * Each step: { key, eyebrow?, question, helper?, type: 'choice' | 'fields',
 *   options?: string[], fields?: [{ name, label, type?, placeholder?, optional?, multiline? }] }
 */
function StepForm({
  steps = [],
  title = 'Cuéntanos tu caso',
  onComplete = null,
  onClose = null,
  confirmTitle = 'Solicitud recibida',
  confirmText = 'Hemos registrado tu caso. Te responderemos en 24 h laborables con los siguientes pasos.',
  style = {},
  ...rest
}) {
  const [i, setI] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [done, setDone] = React.useState(false);
  const total = steps.length;
  const step = steps[i];
  const setAnswer = (key, val) => setAnswers(a => ({
    ...a,
    [key]: val
  }));
  const goNext = () => {
    if (i < total - 1) setI(i + 1);else {
      setDone(true);
      onComplete && onComplete(answers);
    }
  };
  const goBack = () => i > 0 && setI(i - 1);
  const chooseAndAdvance = (key, val) => {
    setAnswer(key, val);
    window.setTimeout(() => setI(cur => cur < total - 1 ? cur + 1 : cur), 240);
  };
  const fieldsValid = s => !s.fields || s.fields.every(f => f.optional || (answers[s.key]?.[f.name] || '').trim().length > 0);
  const pct = done ? 100 : Math.round((i + 1) / total * 100);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '560px',
      width: '100%',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-mono-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      color: 'var(--text-faint)'
    }
  }, "\xA7 ", String(done ? total : i + 1).padStart(2, '0'), " / ", String(total).padStart(2, '0')), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      width: 30,
      height: 30,
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-hairline)',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontSize: '16px',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '2px',
      background: 'var(--stone-250)',
      marginTop: '14px',
      borderRadius: '1px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      background: 'var(--accent)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 24px 8px',
      minHeight: '200px'
    }
  }, done ? /*#__PURE__*/React.createElement(StepFade, {
    key: "done"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '14px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--positive-tint)',
      color: 'var(--positive)',
      fontSize: '22px',
      fontWeight: 600
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 400,
      margin: '20px 0 0',
      color: 'var(--text-strong)'
    }
  }, confirmTitle), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px auto 0',
      maxWidth: '40ch',
      color: 'var(--text-muted)',
      lineHeight: 1.55
    }
  }, confirmText))) : /*#__PURE__*/React.createElement(StepFade, {
    key: i
  }, step.eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-mono-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)',
      marginBottom: '12px'
    }
  }, step.eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 400,
      lineHeight: 1.2,
      color: 'var(--text-strong)',
      margin: 0
    }
  }, step.question), step.helper && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      color: 'var(--text-muted)',
      fontSize: '0.95rem',
      lineHeight: 1.55
    }
  }, step.helper), step.type === 'choice' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '22px'
    }
  }, step.options.map((opt, k) => {
    const selected = answers[step.key] === opt;
    return /*#__PURE__*/React.createElement(Choice, {
      key: opt,
      index: k,
      label: opt,
      selected: selected,
      onClick: () => chooseAndAdvance(step.key, opt)
    });
  })), step.type === 'fields' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginTop: '22px'
    }
  }, step.fields.map(f => /*#__PURE__*/React.createElement(__ds_scope.Field, {
    key: f.name,
    label: f.label,
    htmlFor: f.name,
    optional: f.optional
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: f.name,
    type: f.type || 'text',
    multiline: f.multiline,
    rows: f.rows || 3,
    placeholder: f.placeholder,
    value: answers[step.key]?.[f.name] || '',
    onChange: e => setAnswer(step.key, {
      ...(answers[step.key] || {}),
      [f.name]: e.target.value
    })
  })))))), !done && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '14px 24px 22px',
      borderTop: '1px solid var(--border-subtle)',
      marginTop: '8px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    onClick: goBack,
    style: {
      visibility: i === 0 ? 'hidden' : 'visible'
    }
  }, "Atr\xE1s"), step.type === 'fields' ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: goNext,
    disabled: !fieldsValid(step)
  }, i === total - 1 ? 'Enviar solicitud' : 'Continuar') : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Selecciona una opci\xF3n")));
}
function Choice({
  label,
  index,
  selected,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const letter = String.fromCharCode(65 + index);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      width: '100%',
      textAlign: 'left',
      padding: '14px 16px',
      cursor: 'pointer',
      font: 'inherit',
      background: selected ? 'var(--accent-tint)' : hover ? 'var(--surface-muted)' : 'var(--surface-raised)',
      border: '1.5px solid',
      borderColor: selected ? 'var(--accent)' : 'var(--border-hairline)',
      borderRadius: 'var(--radius-sm)',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      flexShrink: 0,
      borderRadius: 'var(--radius-xs)',
      border: '1px solid',
      borderColor: selected ? 'var(--accent)' : 'var(--border-hairline)',
      background: selected ? 'var(--accent)' : 'transparent',
      color: selected ? 'var(--bone-100)' : 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      fontWeight: 600
    }
  }, letter), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '0.975rem',
      color: 'var(--text-strong)'
    }
  }, label));
}
function StepFade({
  children
}) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(8px)',
      transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)'
    }
  }, children);
}
Object.assign(__ds_scope, { StepForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/StepForm.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionHeader — the marginalia system. A mono reference eyebrow,
 * a serif title, and an optional lede. Establishes the dossier
 * structure across the whole site.
 */
function SectionHeader({
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
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      textAlign: align,
      maxWidth: align === 'center' ? '720px' : 'none',
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-mono-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      fontWeight: 'var(--fw-medium)',
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-accent)',
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '24px',
      height: '1.5px',
      background: 'var(--accent)',
      display: 'inline-block'
    }
  }), eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: titleSize,
      fontWeight: 'var(--fw-regular)',
      lineHeight: 'var(--lh-heading)',
      letterSpacing: 'var(--tracking-tight)',
      color: onDark ? 'var(--text-on-dark)' : 'var(--text-strong)',
      margin: 0
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '20px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-lede)',
      lineHeight: 'var(--lh-lede)',
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
      maxWidth: '60ch',
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0
    }
  }, lede));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/perito/pages.jsx
try { (() => {
/* global React */
/* pages.jsx — todas las páginas del sitio perito.barcelona (mejorado). */
const {
  PIcon,
  Img,
  PB,
  PTag,
  PSeal,
  PStat,
  SVCS,
  CASOS,
  TESTI,
  FAQS_HOME,
  PROTO,
  Ticker,
  Band,
  Faq,
  Qual,
  PHero,
  ServiceRow
} = window;
const SH = ({
  eyebrow,
  title,
  em,
  right
}) => /*#__PURE__*/React.createElement("div", {
  className: "sh"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow"
}, eyebrow), /*#__PURE__*/React.createElement("h2", {
  className: "st",
  dangerouslySetInnerHTML: {
    __html: title
  }
})), right);

/* ── HOME ───────────────────────────────────────────────── */
function Home({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "hero hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Ingenier\xEDa Forense \u2014 Toda Espa\xF1a"), /*#__PURE__*/React.createElement("h1", {
    className: "h1"
  }, "Peritaje para quien", /*#__PURE__*/React.createElement("br", null), "no puede permitirse", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "un mal informe.")), /*#__PURE__*/React.createElement("p", {
    className: "hsub"
  }, "Dict\xE1menes periciales en edificaci\xF3n y obra civil. Para aseguradoras, despachos de abogados y administraciones que necesitan un informe que se sostenga en sala."), /*#__PURE__*/React.createElement("div", {
    className: "hctas"
  }, /*#__PURE__*/React.createElement(PB, {
    variant: "primary",
    size: "lg",
    onClick: open
  }, "Consultar caso"), /*#__PURE__*/React.createElement(PB, {
    variant: "secondary",
    size: "lg",
    onClick: () => go('casos')
  }, "Casos de referencia"), /*#__PURE__*/React.createElement("span", {
    className: "htel"
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "phone",
    size: 14,
    color: "var(--accent)"
  }), " +34 614 194 985")), /*#__PURE__*/React.createElement("button", {
    className: "hero-particular",
    onClick: () => go('construccion')
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "house",
    size: 17,
    color: "var(--amber-500)"
  }), /*#__PURE__*/React.createElement("span", null, "\xBFEs un particular con un problema en su vivienda? ", /*#__PURE__*/React.createElement("b", null, "Empiece aqu\xED \u2192")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-img"
  }, /*#__PURE__*/React.createElement(Img, {
    seed: "perito-edificio",
    w: 900,
    h: 1100,
    alt: "Estructura de edificaci\xF3n en Barcelona",
    srcs: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=70']
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-img-tag fm"
  }, "EXP \xB7 INSPECCI\xD3N ESTRUCTURAL"))), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement("div", {
    className: "fullband"
  }, /*#__PURE__*/React.createElement(Img, {
    seed: "perito-obra",
    w: 1800,
    h: 700,
    treat: false,
    alt: "Trabajo de campo en obra civil",
    srcs: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=70']
  }), /*#__PURE__*/React.createElement("div", {
    className: "fullband-cap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: '#fff',
      marginBottom: '.6rem'
    }
  }, "Trabajo de campo"), /*#__PURE__*/React.createElement("div", {
    className: "fullband-h"
  }, "Inspecci\xF3n documentada \xB7 obra civil y edificaci\xF3n"))), /*#__PURE__*/React.createElement("div", {
    className: "stats"
  }, [['DAT·01', '>120', 'M€', 'Importe total peritado', 'Acumulado en dictámenes'], ['DAT·02', '+400', '', 'Dictámenes emitidos', 'Edificación y obra civil'], ['DAT·03', '97', '%', 'Ratificados en sede judicial', 'Sin impugnación de fondo'], ['DAT·04', '24', '–48h', 'Desplazamiento nacional', 'Sede Barcelona · toda España']].map(([n, v, u, l, s]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: "sc"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sc-n"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "sn"
  }, v, /*#__PURE__*/React.createElement("span", null, u)), /*#__PURE__*/React.createElement("div", {
    className: "sl"
  }, l), /*#__PURE__*/React.createElement("div", {
    className: "ss"
  }, s)))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "Clientes de referencia",
    title: "Trabajamos con profesionales<br/><em>que no admiten margen de error</em>"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tgrid"
  }, [['Dossier A — Sector jurídico', 'Despachos de Abogados Especializados', 'Perito de parte o consultor técnico en procedimientos y arbitrajes. Honorarios fijos, plazos garantizados, ratificación conforme a la LEC art. 347.', ['Dº Construcción', 'Resp. Civil', 'LEC art. 347'], 'abogados'], ['Dossier B — Sector asegurador', 'Aseguradoras y Reaseguradoras', 'Valoración independiente de siniestros complejos: causa, alcance y cuantificación. Contrapericia. Colaboración en siniestros concurrentes.', ['Grandes Riesgos', 'Multirriesgo', 'IRD'], 'abogados'], ['Dossier C — Promotor · AAPP', 'Promotoras, Constructoras y AAPP', 'Auditoría pre-litigio, due diligence en compraventa de activos y dictámenes para contencioso-administrativo. Interlocución técnica directa.', ['Due Diligence', 'C-A', 'LCSP'], null]].map(([n, t, d, tags, dest], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "tc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tc-n"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "tc-t"
  }, t), /*#__PURE__*/React.createElement("div", {
    className: "tc-d"
  }, d), /*#__PURE__*/React.createElement("div", {
    className: "tc-tags"
  }, tags.map(x => /*#__PURE__*/React.createElement("span", {
    key: x,
    className: "tc-tag"
  }, x))), /*#__PURE__*/React.createElement("button", {
    className: "tc-cta",
    onClick: () => dest ? go(dest) : open()
  }, dest ? 'Ver protocolo B2B →' : 'Consultar caso →'))))), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "\xCDndice de dict\xE1menes",
    title: "Dict\xE1menes t\xE9cnicos<br/><em>de alta especializaci\xF3n</em>",
    right: /*#__PURE__*/React.createElement(PB, {
      variant: "secondary",
      onClick: () => go('informes')
    }, "Ver cat\xE1logo")
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "srow",
    onClick: () => go('construccion')
  }, /*#__PURE__*/React.createElement("span", {
    className: "snum"
  }, "SILO\xB71"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stag"
  }, "Particulares \xB7 vivienda"), /*#__PURE__*/React.createElement("div", {
    className: "st2"
  }, "Perito de Construcci\xF3n en Barcelona"), /*#__PURE__*/React.createElement("div", {
    className: "sd"
  }, "Vicios ocultos, mala ejecuci\xF3n, patolog\xEDas y humedades. Para particulares, comunidades y empresas.")), /*#__PURE__*/React.createElement("span", {
    className: "snorm"
  }, "CTE \xB7 LOE \xB7 CC 1484"), /*#__PURE__*/React.createElement("span", {
    className: "sarr"
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: "arrow-right",
    size: 18,
    color: "currentColor"
  }))), SVCS.slice(0, 6).map(s => /*#__PURE__*/React.createElement(ServiceRow, {
    key: s.slug,
    s: s,
    go: go
  })))), /*#__PURE__*/React.createElement("div", {
    className: "proto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proto-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow proto-eb"
  }, "Protocolo de encargo"), /*#__PURE__*/React.createElement("h2", {
    className: "st proto-h"
  }, "C\xF3mo trabajamos"), /*#__PURE__*/React.createElement("div", {
    className: "pgrid"
  }, PROTO.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.n,
    className: "ps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psn"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "pst"
  }, p.t), /*#__PURE__*/React.createElement("div", {
    className: "psd"
  }, p.d)))))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "Casos de referencia",
    title: "Dict\xE1menes de<br/><em>alta cuant\xEDa resueltos</em>",
    right: /*#__PURE__*/React.createElement(PB, {
      variant: "secondary",
      onClick: () => go('casos')
    }, "Ver todos")
  }), /*#__PURE__*/React.createElement("div", {
    className: "cgrid"
  }, CASOS.map((c, i) => /*#__PURE__*/React.createElement(CaseCard, {
    key: i,
    c: c
  })))), /*#__PURE__*/React.createElement("div", {
    className: "band-soft"
  }, /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "Clientes",
    title: "Lo que dicen quienes<br/><em>trabajan con nosotros</em>"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tgr"
  }, TESTI.map((t, i) => /*#__PURE__*/React.createElement(Testi, {
    key: i,
    t: t
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "Preguntas frecuentes",
    title: "Dudas habituales"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement(Faq, {
    items: FAQS_HOME
  }))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFNecesita un dictamen",
    em: "que se sostenga en sala?",
    s: "Respuesta t\xE9cnica en menos de 24 horas laborables",
    btn: "Solicitar consulta t\xE9cnica",
    open: open
  }));
}
const CaseCard = ({
  c
}) => /*#__PURE__*/React.createElement("div", {
  className: "cc"
}, /*#__PURE__*/React.createElement("div", {
  className: "ctag"
}, c.tag), /*#__PURE__*/React.createElement("div", {
  className: "cimp"
}, c.imp), /*#__PURE__*/React.createElement("div", {
  className: "ctit"
}, c.t), /*#__PURE__*/React.createElement("div", {
  className: "cdesc"
}, c.d), c.pills && /*#__PURE__*/React.createElement("div", {
  className: "cpills"
}, c.pills.map(p => /*#__PURE__*/React.createElement("span", {
  key: p,
  className: "cp"
}, p))));
const Testi = ({
  t
}) => /*#__PURE__*/React.createElement("div", {
  className: "tcard"
}, /*#__PURE__*/React.createElement("div", {
  className: "tq"
}, "\xAB", t.q, "\xBB"), /*#__PURE__*/React.createElement("div", {
  className: "ta"
}, t.a), /*#__PURE__*/React.createElement("div", {
  className: "tr"
}, t.r));

/* ── CONSTRUCCIÓN (particulares) ────────────────────────── */
function Construccion({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ph ph-particular"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bc"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => go('home')
  }, "Inicio"), " / ", /*#__PURE__*/React.createElement("b", null, "Construcci\xF3n")), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow eyebrow-amber"
  }, "Para particulares y comunidades"), /*#__PURE__*/React.createElement("h1", {
    className: "ph-h1"
  }, "Perito de Construcci\xF3n", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
    className: "em-amber"
  }, "en Barcelona")), /*#__PURE__*/React.createElement("p", {
    className: "ph-sub"
  }, "\xBFHumedades que no se resuelven? \xBFVicios ocultos tras comprar? \xBFUna reforma mal ejecutada? Le explicamos qu\xE9 pasa y qu\xE9 opciones tiene, con un informe que sirve ante su aseguradora o el juzgado."), /*#__PURE__*/React.createElement(PB, {
    variant: "primary",
    size: "lg",
    onClick: open,
    style: {
      background: 'var(--amber-500)'
    }
  }, "Cu\xE9ntenos su caso")), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lead-img"
  }, /*#__PURE__*/React.createElement(Img, {
    seed: "perito-constr",
    w: 1100,
    h: 560,
    alt: "Patolog\xEDas constructivas en vivienda",
    srcs: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1100&q=70']
  })), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "El t\xE9cnico que diferencia el defecto del argumento"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "Un perito de construcci\xF3n no solo describe lo que ve en una inspecci\xF3n. Analiza el fallo desde la ra\xEDz \u2014 proyecto, direcci\xF3n facultativa o ejecuci\xF3n \u2014 y lo traduce en un dictamen con estructura jur\xEDdica capaz de ser ratificado ante un tribunal."), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "La diferencia entre ganar o perder un procedimiento civil por defectos constructivos suele reducirse a la solidez del informe pericial aportado como prueba, conforme a la Ley de Enjuiciamiento Civil, art. 335."), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "Atendemos tanto a ", /*#__PURE__*/React.createElement("b", null, "particulares"), " con disputas en su vivienda \u2014 vicios ocultos tras la compra, reformas mal ejecutadas, humedades sin resolver \u2014 como a ", /*#__PURE__*/React.createElement("b", null, "empresas, comunidades de propietarios y despachos"), ". La titulaci\xF3n de Ingeniero Civil (ECCAT n\xBA 16448) permite analizar estructura y cimentaci\xF3n con una profundidad diferente a la de otros t\xE9cnicos."), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "\xC1mbito de actuaci\xF3n"), /*#__PURE__*/React.createElement("div", null, SVCS.filter(s => ['vicios-ocultos', 'reclamacion-mala-ejecucion', 'patologias-estructurales', 'humedades-filtraciones', 'contrainforme-pericial', 'naves-industriales'].includes(s.slug)).map(s => /*#__PURE__*/React.createElement(ServiceRow, {
    key: s.slug,
    s: s,
    go: go,
    compact: true
  })))), /*#__PURE__*/React.createElement(Qual, {
    label: "Su consulta, paso a paso",
    open: open,
    cta: "Cu\xE9ntenos su caso",
    items: [['✓', 'Análisis previo de viabilidad técnica'], ['✓', 'Presupuesto cerrado antes del encargo'], ['✓', 'Ratificación en sala incluida'], ['✓', 'Desplazamiento a toda España 24–48h']],
    note: "+34 614 194 985 \xB7 Respuesta 24h"
  }))), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "Casos en construcci\xF3n",
    title: "Referencias"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cgrid"
  }, CASOS.slice(2, 5).map((c, i) => /*#__PURE__*/React.createElement(CaseCard, {
    key: i,
    c: c
  })))), /*#__PURE__*/React.createElement(Band, {
    amber: true,
    h: "\xBFTiene un problema constructivo",
    em: "que necesita documentar?",
    s: "Consulta inicial sin coste",
    btn: "Cu\xE9ntenos su caso",
    open: open
  }));
}

/* ── INFORMES (hub) ─────────────────────────────────────── */
function Informes({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    seal: true,
    bc: /*#__PURE__*/React.createElement("b", null, "Informes Periciales"),
    h1: "Informes Periciales de<br/><em>Edificaci\xF3n y Obra Civil</em>",
    sub: "Ocho especialidades t\xE9cnico-legales para la resoluci\xF3n de disputas complejas. Metodolog\xEDa cient\xEDfica e independiente, preparada para ratificaci\xF3n oral conforme a la LEC."
  }), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", null, SVCS.map(s => /*#__PURE__*/React.createElement(ServiceRow, {
    key: s.slug,
    s: s,
    go: go
  })))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFNo identifica su caso en el \xEDndice?",
    s: "Descr\xEDbanoslo \u2014 le orientamos sin coste",
    open: open
  }));
}

/* ── SERVICIO (genérico para los 8) ─────────────────────── */
function Svc({
  svc,
  go,
  open
}) {
  const amber = svc.audience === 'particular';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      onClick: () => go('informes')
    }, "Informes"), " / ", /*#__PURE__*/React.createElement("b", null, svc.num)),
    h1: `${svc.t}<em style="display:block;font-size:.5em;margin-top:.4em;${amber ? 'color:var(--amber-500)' : ''}">${svc.tag}</em>`,
    sub: svc.desc
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lead-img"
  }, /*#__PURE__*/React.createElement(Img, {
    seed: 'svc-' + svc.slug,
    w: 1100,
    h: 620,
    alt: svc.t,
    srcs: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1100&q=70']
  })), /*#__PURE__*/React.createElement("div", {
    className: "nchips"
  }, svc.lsi.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    className: "nchip"
  }, l))), svc.body.map(([h, p], i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, h), /*#__PURE__*/React.createElement("p", {
    className: "body-p",
    dangerouslySetInnerHTML: {
      __html: p
    }
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Preguntas frecuentes"), /*#__PURE__*/React.createElement(Faq, {
    items: svc.faqs
  })), /*#__PURE__*/React.createElement(Qual, {
    label: `Expediente · ${svc.num}`,
    open: open,
    cta: "Consultar este dictamen"
  }))), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "Otros dict\xE1menes",
    title: "Relacionados"
  }), /*#__PURE__*/React.createElement("div", null, SVCS.filter(x => x.slug !== svc.slug).slice(0, 4).map(s => /*#__PURE__*/React.createElement(ServiceRow, {
    key: s.slug,
    s: s,
    go: go,
    compact: true
  })))), /*#__PURE__*/React.createElement(Band, {
    amber: amber,
    h: "\xBFNecesita este dictamen?",
    s: "Consulta inicial sin coste \xB7 Plazo por contrato",
    open: open
  }));
}

/* ── CASOS ──────────────────────────────────────────────── */
function Casos({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "Casos"),
    h1: "Dict\xE1menes de<br/><em>alta cuant\xEDa resueltos</em>",
    sub: "Selecci\xF3n de casos resueltos en edificaci\xF3n, obra civil y siniestros industriales. Importes y detalles anonimizados para preservar la confidencialidad de las partes."
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cgrid"
  }, CASOS.map((c, i) => /*#__PURE__*/React.createElement(CaseCard, {
    key: i,
    c: c
  })))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFTiene un caso similar?",
    s: "Consulta sin compromiso",
    open: open
  }));
}

/* ── ABOGADOS / B2B ─────────────────────────────────────── */
function Abogados({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    seal: true,
    bc: /*#__PURE__*/React.createElement("b", null, "B2B"),
    h1: "Servicio t\xE9cnico para<br/><em>despachos y aseguradoras</em>",
    sub: "Protocolo de colaboraci\xF3n B2B para despachos especializados en construcci\xF3n y compa\xF1\xEDas aseguradoras que necesitan un perito de parte independiente."
  }), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid",
    style: {
      gridTemplateColumns: '1fr 1fr'
    }
  }, [['Protocolo A — Despachos', 'Para Despachos de Abogados', ['Informe preliminar de viabilidad técnica en 48 horas', 'Honorarios fijos pactados por escrito', 'Ratificación garantizada (LEC art. 347) incluida', 'Múltiples procedimientos simultáneos', 'Informe de avance periódico al letrado']], ['Protocolo B — Aseguradoras', 'Para Aseguradoras y Reaseguradoras', ['Valoración de causa, alcance y cuantía del siniestro', 'Contrapericia frente al perito del asegurado', 'Colaboración en siniestros concurrentes', 'Certificación IRD — INESE Insurance School', 'Interlocución directa con dirección de siniestros']]].map(([n, t, items], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "qual",
    style: {
      position: 'static'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "q-h"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "q-v",
    style: {
      fontSize: '1.4rem'
    }
  }, t), items.map(x => /*#__PURE__*/React.createElement("div", {
    key: x,
    className: "q-li"
  }, /*#__PURE__*/React.createElement("b", null, "\u2713"), /*#__PURE__*/React.createElement("span", null, x))), /*#__PURE__*/React.createElement(PB, {
    variant: "primary",
    fullWidth: true,
    onClick: open,
    style: {
      marginTop: '20px'
    },
    iconRight: /*#__PURE__*/React.createElement(PIcon, {
      name: "arrow-right",
      size: 15
    })
  }, "Iniciar colaboraci\xF3n"))))), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "Declaraciones B2B",
    title: "Referencias"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tgr"
  }, TESTI.map((t, i) => /*#__PURE__*/React.createElement(Testi, {
    key: i,
    t: t
  })))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFSu despacho necesita",
    em: "un perito de parte solvente?",
    s: "Informe de viabilidad en 48 horas \xB7 Sin compromiso",
    btn: "Iniciar colaboraci\xF3n",
    open: open
  }));
}

/* ── HONORARIOS ─────────────────────────────────────────── */
function Honorarios({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "Honorarios"),
    h1: "Honorarios de<br/><em>informes periciales</em>",
    sub: "Honorarios fijos acordados antes del inicio del encargo. Sin costes variables ni sorpresas. La ratificaci\xF3n en sala est\xE1 incluida sin sobrecoste."
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Presupuesto cerrado antes del inicio"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "No se utiliza una tarifa est\xE1ndar porque cada caso es t\xE9cnicamente diferente. El coste depende de la complejidad, el n\xFAmero de visitas, los ensayos requeridos y el alcance del an\xE1lisis. Tras analizar la documentaci\xF3n inicial, se emite una propuesta t\xE9cnica con honorarios fijos cerrados."), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Qu\xE9 incluye el presupuesto"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, /*#__PURE__*/React.createElement("b", null, "Inspecci\xF3n"), " del inmueble o infraestructura \xB7 ", /*#__PURE__*/React.createElement("b", null, "an\xE1lisis"), " de la documentaci\xF3n t\xE9cnica \xB7 ", /*#__PURE__*/React.createElement("b", null, "redacci\xF3n"), " y maquetaci\xF3n del dictamen \xB7 ", /*#__PURE__*/React.createElement("b", null, "revisi\xF3n interna"), " y control de calidad \xB7 ", /*#__PURE__*/React.createElement("b", null, "ratificaci\xF3n en sede judicial"), " e interrogatorio cruzado \xB7 ", /*#__PURE__*/React.createElement("b", null, "desplazamientos"), " en toda Espa\xF1a."), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "No hay costes adicionales posteriores al presupuesto acordado.")), /*#__PURE__*/React.createElement(Qual, {
    label: "Factores de coste",
    open: open,
    cta: "Solicitar presupuesto",
    note: "Primera consulta sin coste",
    items: [['01', 'Tipo de dictamen — parte, judicial o contrainforme'], ['02', 'Complejidad técnica del caso'], ['03', 'Número de visitas de inspección'], ['04', 'Ensayos — termografía, testigos, FEM'], ['05', 'Alcance geográfico'], ['06', 'Urgencia del plazo']]
  }))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFQuiere saber cu\xE1nto costar\xEDa su informe?",
    s: "Primera consulta sin coste",
    btn: "Solicitar presupuesto",
    open: open
  }));
}

/* ── DESPACHO ───────────────────────────────────────────── */
function Despacho({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    seal: true,
    bc: /*#__PURE__*/React.createElement("b", null, "El Despacho"),
    h1: "Albert Vilardell Serra<br/><em>Ingeniero Civil \xB7 Perito Judicial</em>",
    sub: "Despacho de ingenier\xEDa forense fundado en Barcelona. M\xE1s de 15 a\xF1os en peritaje de edificaci\xF3n, obra civil y siniestros complejos para el mercado legal y asegurador."
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "portrait"
  }, /*#__PURE__*/React.createElement(Img, {
    seed: "perito-albert",
    w: 900,
    h: 680,
    alt: "Albert Vilardell Serra",
    srcs: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=70']
  })), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Especializaci\xF3n, no generalismo"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "Este despacho no acepta cualquier encargo. La especializaci\xF3n en dict\xE1menes para litigios de alta cuant\xEDa implica rechazar casos que no se ajustan al perfil de trabajo y concentrar los recursos en los asuntos donde el impacto t\xE9cnico es determinante."), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "La independencia t\xE9cnica y la solvencia del dictamen son el \xFAnico activo. No se trabaja en exclusiva para ninguna aseguradora ni se depende de ninguna constructora."), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Principios de trabajo"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, /*#__PURE__*/React.createElement("b", null, "Independencia t\xE9cnica"), " \u2014 innegociable, sin exclusivas. ", /*#__PURE__*/React.createElement("b", null, "Plazos por contrato"), " \u2014 si no se puede garantizar, no se acepta el encargo. ", /*#__PURE__*/React.createElement("b", null, "Honorarios fijos"), " \u2014 acordados antes del inicio, ratificaci\xF3n incluida. ", /*#__PURE__*/React.createElement("b", null, "Claridad t\xE9cnica"), " \u2014 un dictamen que no se entiende en sala no tiene valor.")), /*#__PURE__*/React.createElement(Qual, {
    label: "Habilitaci\xF3n profesional",
    open: open,
    cta: "Consultar disponibilidad",
    note: "L\u2013J 9h\u201318h \xB7 V 9h\u201314h \xB7 Cita previa",
    items: [['TÍT', 'Ingeniero Civil — ETSECCPB · UPC'], ['COL', 'ECCAT nº 16448'], ['JUD', 'Perito Judicial — Ministerio de Justicia'], ['IRD', 'Perito de Seguros — INESE Insurance School'], ['BCN', 'C. de Numància, 95, Local 5 · 08029 Barcelona'], ['GRA', 'C. Navarra, 14 · 08401 Granollers']]
  }))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFNecesita un perito con esta formaci\xF3n?",
    open: open
  }));
}

/* ── CONTACTO ───────────────────────────────────────────── */
function Contacto({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "Contacto"),
    h1: "Solicitar<br/><em>consulta t\xE9cnica</em>",
    sub: "Primera valoraci\xF3n sin coste. Respuesta en menos de 24 horas laborables. Para asuntos urgentes, contacto directo por tel\xE9fono."
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Canales"), /*#__PURE__*/React.createElement("p", {
    className: "body-p fm",
    style: {
      fontSize: '1.05rem',
      fontWeight: 500,
      color: 'var(--ink-900)'
    }
  }, "+34 614 194 985", /*#__PURE__*/React.createElement("br", null), "info@perito.barcelona"), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Sedes"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, /*#__PURE__*/React.createElement("b", null, "Barcelona (principal)"), /*#__PURE__*/React.createElement("br", null), "Carrer de Num\xE0ncia, 95, Local 5 \xB7 08029 Barcelona", /*#__PURE__*/React.createElement("br", null), "Con cita previa \xB7 L\u2013J 9h\u201318h \xB7 V 9h\u201314h"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, /*#__PURE__*/React.createElement("b", null, "Granollers"), /*#__PURE__*/React.createElement("br", null), "Carrer Navarra, 14 \xB7 08401 Granollers", /*#__PURE__*/React.createElement("br", null), "Con cita previa"), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Confidencialidad"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "Toda la informaci\xF3n de la consulta inicial se trata con estricta confidencialidad conforme al RGPD (Reglamento UE 2016/679), exclusivamente para la gesti\xF3n de la consulta.")), /*#__PURE__*/React.createElement(Qual, {
    label: "Consulta guiada",
    open: open,
    cta: "Iniciar consulta guiada",
    note: "Confidencial \xB7 Sin compromiso",
    items: [['01', 'Tipo de asunto'], ['02', 'Descripción breve'], ['03', 'Importe en disputa'], ['04', 'Situación procesal'], ['05', 'Datos de contacto']]
  }))));
}
Object.assign(window, {
  Home,
  Construccion,
  Informes,
  Svc,
  Casos,
  Abogados,
  Honorarios,
  Despacho,
  Contacto
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/perito/pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/perito/shared.jsx
try { (() => {
/* global React */
/* ════════════════════════════════════════════════════════════════
   PERITO.BARCELONA — versión definitiva, mejorada sobre el sistema.
   shared.jsx — datos + piezas compartidas (Nav, Footer, Ticker,
   Band, Qual, PHero, Icon, filas de servicio).
   Re-skin teal/ámbar + Playfair/DM Sans/JetBrains aplicado por tokens
   en index.html; aquí se consumen los componentes del sistema.
   ════════════════════════════════════════════════════════════════ */
const PDS = window.VilardellPeritajeForenseDesignSystem_58f0b0;
const {
  Button: PB,
  Tag: PTag,
  Seal: PSeal,
  Stat: PStat,
  Accordion: PAcc
} = PDS;

/* ── Icono (Lucide inline, recolor por currentColor) ── */
function PIcon({
  name,
  size = 18,
  color = 'currentColor',
  strokeWidth = 1.7,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': strokeWidth
        }
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      color,
      ...style
    },
    "aria-hidden": "true"
  });
}

/* ── Imagen de stock con fallback fiable (picsum) — nunca rota ──
   Avanza al siguiente origen ante error O si no carga en ~2.6s
   (algunas URLs de stock quedan colgadas sin disparar onError). */
function Img({
  srcs = [],
  seed = 'p',
  w = 1200,
  h = 900,
  alt = '',
  treat = true,
  style = {}
}) {
  const list = [...srcs, `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`];
  const [i, setI] = React.useState(0);
  const loaded = React.useRef(false);
  const adv = () => {
    if (!loaded.current) setI(x => Math.min(x + 1, list.length - 1));
  };
  React.useEffect(() => {
    loaded.current = false;
    const t = setTimeout(adv, 2600);
    return () => clearTimeout(t);
  }, [i]);
  return /*#__PURE__*/React.createElement("img", {
    src: list[i],
    alt: alt,
    onLoad: () => {
      loaded.current = true;
    },
    onError: () => setI(x => Math.min(x + 1, list.length - 1)),
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: treat ? 'grayscale(0.12) contrast(1.02)' : 'none',
      ...style
    }
  });
}

/* ── DATOS (contenido del cliente, conservado) ──────────── */
const SVCS = [{
  slug: 'informe-de-parte',
  num: 'EXP·01',
  tag: 'Litigación civil',
  t: 'Informe Pericial de Parte',
  norm: 'LEC art. 335',
  audience: 'pro',
  desc: 'Dictamen encargado por una de las partes para fundamentar su postura en negociación, mediación o demanda. Plena validez probatoria.',
  lsi: ['LEC art. 335', 'Dictamen técnico', 'Ratificación de parte', 'Procedimiento civil', 'Prueba pericial'],
  body: [['Su argumento técnico en una disputa', 'En cualquier litigio, la parte que presenta los argumentos técnicos más sólidos tiene ventaja decisiva. Un <b>informe pericial de parte</b> es un dictamen encargado por usted para investigar la realidad técnica de los hechos y defender su postura con objetividad y rigor.'], ['Cuándo es esencial', '<b>Antes de una demanda</b> — para evaluar la solidez técnica de la reclamación. <b>Durante una negociación</b> — un informe contundente fuerza acuerdos favorables sin juicio. <b>Como prueba</b> conforme a la LEC. <b>Para refutar</b> el dictamen de la parte contraria mediante un contrainforme.']],
  faqs: [['¿Tiene validez en un juicio?', 'Sí. Es un medio de prueba reconocido por la LEC (arts. 335 y ss.) y puede defenderse como prueba pericial ante el juez.'], ['¿Diferencia con el dictamen judicial?', 'El de parte lo encarga usted o su letrado; el judicial lo designa el juzgado. La metodología es idéntica.']]
}, {
  slug: 'perito-judicial',
  num: 'EXP·02',
  tag: 'Designación judicial',
  t: 'Actuación como Perito Judicial',
  norm: 'LEC art. 347',
  audience: 'pro',
  desc: 'Por designación del juzgado o de parte. Imparcialidad acreditada y defensa oral solvente ante interrogatorio cruzado.',
  lsi: ['Designación judicial', 'Lista de peritos', 'LEC art. 347', 'Tacha de peritos', 'Ratificación en sala'],
  body: [['Actuación en sede judicial', 'La figura del perito judicial exige tres condiciones: conocimiento técnico acreditado, inscripción en la lista oficial del Ministerio de Justicia y capacidad de defender el dictamen verbalmente ante el juez y los letrados de ambas partes.'], ['Ratificación e interrogatorio cruzado', 'La ratificación oral es parte integrante del servicio. La solidez de esa defensa es determinante para el peso que el juez otorga al dictamen. <b>Honorarios de ratificación incluidos sin sobrecoste.</b>']],
  faqs: [['¿Cómo se designa al perito judicial?', 'Por sorteo entre los inscritos en la lista oficial del Ministerio de Justicia, o por acuerdo de las partes (LEC art. 339).'], ['¿Puede impugnarse el dictamen?', 'Las partes pueden tachar al perito o impugnar el dictamen (LEC art. 343). La solvencia del informe es la mejor defensa.']]
}, {
  slug: 'patologias-estructurales',
  num: 'EXP·03',
  tag: 'Diagnóstico estructural',
  t: 'Patologías Estructurales',
  norm: 'CTE DB-SE · EHE-08',
  audience: 'mix',
  desc: 'Grietas activas, fisuras en forjados, asientos diferenciales y deformaciones críticas. Modelado FEM y ensayos in situ.',
  lsi: ['CTE DB-SE', 'EHE-08', 'Grietas activas', 'Asiento diferencial', 'Cálculo estructural', 'Modelado FEM'],
  body: [['Diagnóstico de patologías estructurales', 'Una patología estructural es cualquier alteración de los elementos portantes que afecte a la capacidad resistente o a la estabilidad. El diagnóstico correcto es el punto de partida de cualquier intervención técnica o reclamación jurídica.'], ['Metodología', 'Inspección visual y cartografía de fisuras · testigos de yeso y ensayos no destructivos · modelado estructural conforme al Eurocódigo 2 y CTE DB-SE · diagnóstico con origen, gravedad y cuantificación. El dictamen diferencia responsabilidades: proyecto, dirección de obra o ejecución (LOE art. 17).']],
  faqs: [['¿Todas las grietas son estructurales?', 'No. Pueden ser térmicas, de retracción, de asiento o de fatiga. La determinación del origen requiere análisis de geometría, apertura, disposición y evolución.'], ['¿Cuándo es urgente actuar?', 'Cuando la grieta es activa, afecta a elementos portantes, supera 1 mm con disposición diagonal o hay deformación perceptible.']]
}, {
  slug: 'humedades-filtraciones',
  num: 'EXP·04',
  tag: 'Patología hídrica',
  t: 'Humedades y Filtraciones',
  norm: 'CTE DB-HS',
  audience: 'particular',
  desc: 'Detección no destructiva del origen mediante termografía infrarroja y pruebas de estanqueidad. Dictamen para reclamar a constructora, comunidad o aseguradora.',
  lsi: ['Termografía infrarroja', 'CTE DB-HS', 'Capilaridad ascendente', 'Condensación', 'Prueba de estanqueidad', 'Perito humedades Barcelona'],
  body: [['El síntoma no es el origen', 'La mancha visible rara vez indica el origen exacto del agua. El diagnóstico con metodología no destructiva — termografía infrarroja, higrómetros de profundidad, pruebas de estanqueidad — localiza el origen sin abrir obra. <b>Si ha pagado reparaciones que no han funcionado</b>, lo más probable es que se haya tratado el síntoma sin haber identificado la causa.'], ['Tipos de humedad', 'Capilaridad ascendente desde el terreno · filtración por cubierta o terraza (CTE DB-HS 1) · filtración por fachada o carpinterías · condensación superficial o intersticial · daños por instalaciones. El dictamen establece el origen, cuantifica los daños y delimita responsabilidades: constructora, comunidad de propietarios o cobertura de la póliza.']],
  faqs: [['¿La termografía basta para localizar el origen?', 'Es la herramienta de detección no destructiva principal, complementada con higrómetros de profundidad y análisis del detalle constructivo.'], ['¿Sirve para reclamar al seguro?', 'Sí. El dictamen delimita si el origen corresponde a la constructora, a la comunidad o está cubierto por la póliza.']]
}, {
  slug: 'vicios-ocultos',
  num: 'EXP·05',
  tag: 'Compraventa inmobiliaria',
  t: 'Vicios Ocultos',
  norm: 'CC art. 1484',
  audience: 'particular',
  desc: 'Defectos graves no aparentes en la compraventa. Acreditación de preexistencia dentro del plazo de saneamiento de 6 meses.',
  lsi: ['Código Civil art. 1484', 'Defectos no aparentes', 'Plazo de saneamiento', 'Preexistencia', 'Acción redhibitoria'],
  body: [['Qué son los vicios ocultos', 'Defectos graves no aparentes en la compraventa que impiden el uso adecuado del bien. Regulados en el CC arts. 1484 y ss.: derecho a rescindir (acción redhibitoria) o reducir el precio (acción estimatoria). Deben ser graves, anteriores a la venta y desconocidos por el comprador.'], ['El plazo de 6 meses', 'El CC art. 1490 establece 6 meses desde la entrega para ejercitar las acciones. El informe pericial debe obtenerse dentro de ese plazo para acreditar técnicamente existencia, gravedad y preexistencia del defecto. <b>Si acaba de detectar el problema, el tiempo corre en su contra: contacte cuanto antes.</b>']],
  faqs: [['¿Qué plazo tengo para reclamar?', '6 meses desde la entrega del inmueble (CC art. 1490). Es imprescindible actuar dentro de ese plazo.'], ['¿Cómo se demuestra que el defecto es anterior a la compra?', 'Mediante el análisis técnico del grado de desarrollo de la patología: la antigüedad de una humedad o la evolución de una fisura permiten acreditar la preexistencia.']]
}, {
  slug: 'reclamacion-mala-ejecucion',
  num: 'EXP·06',
  tag: 'Incumplimiento contractual',
  t: 'Mala Ejecución de Obra',
  norm: 'LOE art. 17',
  audience: 'mix',
  desc: 'Contraste objetivo de la obra frente a contrato, memoria de calidades y lex artis. Cuantificación de incumplimientos.',
  lsi: ['LOE art. 17', 'Memoria de calidades', 'Lex artis', 'Partidas no ejecutadas', 'Subsanación'],
  body: [['Cuando el resultado no es el pactado', 'Acabados deficientes, materiales inferiores a los acordados, partidas cobradas y no ejecutadas. El peritaje contrasta lo ejecutado con el contrato, el presupuesto, la memoria de calidades y la buena práctica constructiva (<b>lex artis</b>).'], ['El proceso de reclamación', '<b>1 · Reclamación amistosa:</b> un dictamen profesional suele bastar para que la constructora subsane. <b>2 · Mediación</b> con base técnica. <b>3 · Vía judicial:</b> el informe es la prueba pericial clave. Ratificación incluida.']],
  faqs: [['¿Qué plazos establece la LOE?', '1 año para defectos de acabado, 3 años para habitabilidad, 10 años para defectos estructurales, desde la recepción de la obra (LOE art. 17).'], ['¿Necesito informe para reclamar?', 'No es obligatorio en fase extrajudicial, pero es la herramienta más efectiva para que la empresa acepte subsanar sin juicio.']]
}, {
  slug: 'contrainforme-pericial',
  num: 'EXP·07',
  tag: 'Análisis crítico',
  t: 'Contrainforme Pericial',
  norm: 'LEC art. 348',
  audience: 'pro',
  desc: 'Detección de carencias metodológicas y refutación técnica de dictámenes presentados por la parte contraria.',
  lsi: ['Refutación técnica', 'Carencias metodológicas', 'Pericial contraria', 'Sana crítica', 'Juicio oral'],
  body: [['Desmontar el argumento contrario', 'El contrainforme no elabora un nuevo dictamen sobre la patología: demuestra que las conclusiones del dictamen contrario son <b>incorrectas, incompletas o metodológicamente deficientes</b>.'], ['Qué se analiza', 'Rigor metodológico de la inspección · corrección de las referencias normativas (CTE, EHE-08, LOE) · coherencia entre datos y conclusiones · corrección de la cuantificación económica. Un juez que no puede fiarse del perito contrario da mayor crédito al dictamen que sí demuestra solidez.']],
  faqs: [['¿Puede el juez rechazar un informe pericial?', 'Valora libremente su fuerza probatoria conforme a la sana crítica (LEC art. 348). Un contrainforme sólido merma el peso del dictamen contrario.'], ['¿Cuánto se tarda?', 'Entre 10 y 20 días hábiles desde la recepción del informe a refutar. Acelerable con plazo procesal próximo.']]
}, {
  slug: 'naves-industriales',
  num: 'EXP·08',
  tag: 'Industrial · B2B',
  t: 'Naves Industriales',
  norm: 'RSCIEI · TR-34',
  audience: 'pro',
  desc: 'Pavimentos logísticos, estructuras metálicas, daños post-alquiler y cumplimiento RSCIEI. Para aseguradoras y operadores.',
  lsi: ['RSCIEI', 'Pavimentos logísticos', 'Daños post-alquiler', 'Estructura metálica', 'TR-34', 'Siniestro industrial'],
  body: [['Peritaje especializado industrial', 'Las naves logísticas tienen normativa propia. Principales disputas: <b>daños post-alquiler, siniestros de incendio, fallos en pavimentos y cumplimiento RSCIEI</b>.'], ['Pavimentos logísticos e incendios', 'Fisuras por retracción o asiento de solera · planitud insuficiente para equipos VNA · juntas mal ejecutadas. Tolerancias conforme a la norma TR-34. En incendios: causa y origen, daño a estructura metálica y verificación del cumplimiento RSCIEI en el momento del siniestro.']],
  faqs: [['¿Qué es el RSCIEI?', 'El Reglamento de Seguridad Contra Incendios en Establecimientos Industriales (RD 2267/2004). Su incumplimiento es causa frecuente de conflicto.'], ['¿Qué es un dictamen post-alquiler?', 'Determina qué daños son uso normal (arrendador) y cuáles imputables al arrendatario por uso indebido o modificaciones no autorizadas.']]
}];
const CASOS = [{
  tag: 'Siniestro de incendio',
  imp: '1,2 M€',
  t: 'Incendio estructural en nave logística',
  d: 'Causa, origen y extensión en 8.000 m². Cuantificación para aseguradora nacional. Ratificado en juzgado.',
  pills: ['Aseguradora', '90 días', 'Ratificado']
}, {
  tag: 'Obra civil',
  imp: '2,8 M€',
  t: 'Asiento diferencial en puente de vía rápida',
  d: 'Patologías en hormigón pretensado. Contencioso-administrativo contra constructora.',
  pills: ['AAPP', 'Litigio C-A', 'Barcelona']
}, {
  tag: 'Vicios ocultos',
  imp: '680 K€',
  t: 'Patologías de envolvente en 120 viviendas',
  d: 'Fachada ventilada, cubierta y carpinterías. Comunidad contra promotora. Resolución favorable.',
  pills: ['Comunidad', '2024', 'Barcelona']
}, {
  tag: 'Humedades',
  imp: '340 K€',
  t: 'Filtración por cubierta en plurifamiliar',
  d: 'Termografía. CTE DB-HS. Reparación íntegra a cargo de la constructora.',
  pills: ['Extrajudicial', 'Granollers']
}, {
  tag: 'Mala ejecución',
  imp: '430 K€',
  t: 'Incumplimientos en reforma de local',
  d: 'Partidas no ejecutadas y materiales inferiores a memoria de calidades.',
  pills: ['Despacho', 'Mediación', 'BCN']
}, {
  tag: 'Contrainforme',
  imp: '920 K€',
  t: 'Refutación en colapso de forjado',
  d: 'Carencias metodológicas en el informe de la aseguradora. Ratificación en juicio oral.',
  pills: ['Juicio oral', 'Valencia']
}];
const TESTI = [{
  q: 'Su dictamen fue la base de toda nuestra estrategia de negociación. Tan claro y contundente que logramos acuerdo sin ir a juicio.',
  a: 'Socio de Área',
  r: 'Despacho de construcción · Madrid'
}, {
  q: 'Valoro la disponibilidad para ratificar en sala sin demoras y el rigor metodológico del informe.',
  a: 'Directora de Siniestros',
  r: 'Aseguradora multinacional · Barcelona'
}, {
  q: 'El informe de due diligence identificó contingencias que no habíamos previsto. Se amortizó muchas veces.',
  a: 'Director de Inversiones',
  r: 'Family Office · Barcelona'
}];
const FAQS_HOME = [['¿En qué territorios operan?', 'Sede en Barcelona con operativa en toda España. Desplazamiento a cualquier punto en 24–48h.'], ['¿Importe mínimo de encargo?', 'No existe mínimo, pero el encargo es óptimo a partir de 50.000 € en disputa.'], ['¿La ratificación en sala está incluida?', 'Sí. Ratificación e interrogatorio cruzado incluidos en honorarios sin sobrecoste.'], ['¿Plazo de entrega del dictamen?', 'Entre 20 y 45 días hábiles desde la inspección. Plazo por escrito, garantizado contractualmente.'], ['¿Perito de parte y perito judicial?', 'Ambos, nunca en el mismo caso.']];
const PROTO = [{
  n: 'FASE 01',
  t: 'Briefing técnico',
  d: 'Reunión de instrucción con letrado o director de siniestros. Análisis previo de viabilidad sin coste.'
}, {
  n: 'FASE 02',
  t: 'Propuesta cerrada',
  d: 'Alcance definido, honorarios fijos y fecha de entrega comprometida por escrito. Sin variables.'
}, {
  n: 'FASE 03',
  t: 'Instrucción y dictamen',
  d: 'Inspección, análisis, redacción y revisión interna. Formato técnico-jurídico listo para aportación.'
}, {
  n: 'FASE 04',
  t: 'Ratificación incluida',
  d: 'Ratificación en sala e interrogatorio cruzado incluidos en honorarios. Sin sobrecoste.'
}];
const TICK = ['Informe de Parte', 'Perito Judicial', 'Patologías Estructurales', 'Humedades', 'Vicios Ocultos', 'Mala Ejecución', 'Contrainforme', 'Naves Industriales', 'CTE DB-SE', 'CTE DB-HS', 'LOE art. 17', 'LEC art. 347', 'RSCIEI', 'ECCAT nº 16448', 'Toda España'];
const INTAKE = [{
  key: 'tipo',
  eyebrow: 'Consulta · 01 / 05',
  type: 'choice',
  question: '¿Qué tipo de asunto desea consultar?',
  helper: 'Seleccione la categoría de su caso.',
  options: ['Informe pericial de parte', 'Actuación como perito judicial', 'Patologías o daños estructurales', 'Humedades y filtraciones', 'Vicios ocultos en compraventa', 'Mala ejecución de obra', 'Contrainforme pericial', 'Nave industrial o logística', 'Obra pública', 'Otro']
}, {
  key: 'desc',
  eyebrow: 'Consulta · 02 / 05',
  type: 'fields',
  question: 'Describa brevemente el caso',
  helper: 'Tipo de inmueble, patología, fase del procedimiento.',
  fields: [{
    name: 'desc',
    label: 'El caso',
    multiline: true,
    rows: 4,
    placeholder: 'Ej. edificio residencial con fisuras en forjado, fase previa a demanda…'
  }]
}, {
  key: 'imp',
  eyebrow: 'Consulta · 03 / 05',
  type: 'choice',
  question: '¿Importe estimado en disputa?',
  helper: 'Orientativo — para asignar el equipo adecuado.',
  options: ['Menos de 50.000 €', '50.000 – 200.000 €', '200.000 – 1.000.000 €', 'Más de 1.000.000 €', 'No determinado']
}, {
  key: 'legal',
  eyebrow: 'Consulta · 04 / 05',
  type: 'choice',
  question: '¿Existe representación legal o procedimiento?',
  options: ['Sí, hay letrado / despacho', 'Sí, procedimiento judicial abierto', 'No aún — fase previa', 'No aplicable']
}, {
  key: 'con',
  eyebrow: 'Consulta · 05 / 05',
  type: 'fields',
  question: '¿Con quién contactamos?',
  helper: 'Respuesta en menos de 24 horas laborables.',
  fields: [{
    name: 'nombre',
    label: 'Nombre y apellidos',
    placeholder: 'Nombre y apellidos'
  }, {
    name: 'empresa',
    label: 'Empresa / Despacho',
    optional: true,
    placeholder: 'Empresa o despacho'
  }, {
    name: 'email',
    label: 'Email profesional',
    type: 'email',
    placeholder: 'nombre@empresa.com'
  }, {
    name: 'tel',
    label: 'Teléfono',
    type: 'tel',
    optional: true,
    placeholder: '+34 ___ ___ ___'
  }]
}];

/* ── PIEZAS COMPARTIDAS ─────────────────────────────────── */
const Ticker = () => /*#__PURE__*/React.createElement("div", {
  className: "ticker",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("div", {
  className: "ti tick"
}, [...TICK, ...TICK].map((t, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  className: "tit"
}, /*#__PURE__*/React.createElement("span", {
  className: "dot"
}), t))));
const Band = ({
  h,
  em,
  s,
  btn,
  open,
  amber
}) => /*#__PURE__*/React.createElement("div", {
  className: 'cta-band' + (amber ? ' amber' : '')
}, /*#__PURE__*/React.createElement("h2", {
  className: "cta-h"
}, h, em && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, em))), s && /*#__PURE__*/React.createElement("div", {
  className: "cta-s"
}, s), /*#__PURE__*/React.createElement(PB, {
  variant: "on-dark",
  size: "lg",
  onClick: open,
  style: {
    background: '#fff',
    color: amber ? 'var(--amber-600)' : 'var(--accent-press)'
  }
}, btn || 'Consultar caso'));
const Faq = ({
  items
}) => /*#__PURE__*/React.createElement(PAcc, {
  defaultOpen: -1,
  items: items.map(([q, a]) => ({
    q,
    a: /*#__PURE__*/React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: a
      }
    })
  }))
});

/* Caja de cualificación sticky — mecanismo de captación */
const Qual = ({
  label,
  open,
  cta,
  note,
  items
}) => /*#__PURE__*/React.createElement("aside", {
  className: "qual"
}, /*#__PURE__*/React.createElement("div", {
  className: "q-h"
}, label || 'Cualificación del caso'), /*#__PURE__*/React.createElement("div", {
  className: "q-v"
}, "Consulta sin coste"), (items || PROTO.map((p, i) => [String(i + 1).padStart(2, '0'), p.t, p.d])).map(([n, t, d], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  className: "q-li"
}, /*#__PURE__*/React.createElement("b", null, n), /*#__PURE__*/React.createElement("span", null, t && d ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
  className: "q-st"
}, t), d) : t))), /*#__PURE__*/React.createElement(PB, {
  variant: "primary",
  fullWidth: true,
  onClick: open,
  style: {
    marginTop: '20px'
  },
  iconRight: /*#__PURE__*/React.createElement(PIcon, {
    name: "arrow-right",
    size: 15
  })
}, cta || 'Consultar caso'), /*#__PURE__*/React.createElement("div", {
  className: "q-note"
}, note || 'Ratificación incluida · Toda España'));
const PHero = ({
  bc,
  go,
  h1,
  sub,
  seal
}) => /*#__PURE__*/React.createElement("div", {
  className: "ph"
}, /*#__PURE__*/React.createElement("div", {
  className: "bc"
}, /*#__PURE__*/React.createElement("span", {
  onClick: () => go('home')
}, "Inicio"), " / ", bc), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '32px'
  }
}, /*#__PURE__*/React.createElement("h1", {
  className: "ph-h1",
  dangerouslySetInnerHTML: {
    __html: h1
  }
}), seal && /*#__PURE__*/React.createElement("div", {
  className: "ph-seal"
}, /*#__PURE__*/React.createElement(PSeal, {
  size: 104,
  tone: "ink"
}))), /*#__PURE__*/React.createElement("p", {
  className: "ph-sub"
}, sub));
const ServiceRow = ({
  s,
  go,
  compact
}) => /*#__PURE__*/React.createElement("button", {
  className: "srow",
  onClick: () => go('svc-' + s.slug),
  style: compact ? {
    gridTemplateColumns: '1fr 150px 32px'
  } : {}
}, !compact && /*#__PURE__*/React.createElement("span", {
  className: "snum"
}, s.num), /*#__PURE__*/React.createElement("div", null, !compact && /*#__PURE__*/React.createElement("div", {
  className: "stag"
}, s.tag), /*#__PURE__*/React.createElement("div", {
  className: "st2"
}, s.t), !compact && /*#__PURE__*/React.createElement("div", {
  className: "sd"
}, s.desc)), /*#__PURE__*/React.createElement("span", {
  className: "snorm"
}, s.norm), /*#__PURE__*/React.createElement("span", {
  className: "sarr"
}, /*#__PURE__*/React.createElement(PIcon, {
  name: "arrow-right",
  size: 18,
  color: "currentColor"
})));

/* ── NAV ────────────────────────────────────────────────── */
function Nav({
  page,
  go,
  open
}) {
  const [m, setM] = React.useState(false);
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: "ni"
  }, /*#__PURE__*/React.createElement("button", {
    className: "logo",
    onClick: () => go('home')
  }, "perito", /*#__PURE__*/React.createElement("span", null, ".barcelona")), /*#__PURE__*/React.createElement("div", {
    className: "nlinks"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'nl' + (page === 'construccion' ? ' on' : ''),
    onClick: () => go('construccion')
  }, "Perito Construcci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "dd"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'nl' + (page.startsWith('svc') || page === 'informes' ? ' on' : ''),
    onClick: () => go('informes')
  }, "Dict\xE1menes ", /*#__PURE__*/React.createElement(PIcon, {
    name: "chevron-down",
    size: 13
  })), /*#__PURE__*/React.createElement("div", {
    className: "ddm"
  }, SVCS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.slug,
    className: "ddi",
    onClick: () => go('svc-' + s.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ddi-n"
  }, s.num), /*#__PURE__*/React.createElement("span", {
    className: "ddi-t"
  }, s.t))))), /*#__PURE__*/React.createElement("button", {
    className: 'nl' + (page === 'casos' ? ' on' : ''),
    onClick: () => go('casos')
  }, "Casos"), /*#__PURE__*/React.createElement("button", {
    className: 'nl' + (page === 'abogados' ? ' on' : ''),
    onClick: () => go('abogados')
  }, "Abogados\xB7Seguros"), /*#__PURE__*/React.createElement("button", {
    className: 'nl' + (page === 'honorarios' ? ' on' : ''),
    onClick: () => go('honorarios')
  }, "Honorarios"), /*#__PURE__*/React.createElement("button", {
    className: 'nl' + (page === 'despacho' ? ' on' : ''),
    onClick: () => go('despacho')
  }, "Despacho"), /*#__PURE__*/React.createElement(PB, {
    variant: "primary",
    size: "sm",
    onClick: open
  }, "Consultar caso")), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    onClick: () => setM(!m),
    "aria-label": "Men\xFA"
  }, /*#__PURE__*/React.createElement(PIcon, {
    name: m ? 'x' : 'menu',
    size: 22
  }))), m && /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile"
  }, [['Perito Construcción', 'construccion'], ['Dictámenes', 'informes'], ['Casos', 'casos'], ['Abogados·Seguros', 'abogados'], ['Honorarios', 'honorarios'], ['Despacho', 'despacho']].map(([l, p]) => /*#__PURE__*/React.createElement("button", {
    key: p,
    className: "nm-link",
    onClick: () => {
      setM(false);
      go(p);
    }
  }, l)), /*#__PURE__*/React.createElement(PB, {
    variant: "primary",
    fullWidth: true,
    onClick: () => {
      setM(false);
      open();
    },
    style: {
      marginTop: '8px'
    }
  }, "Consultar caso")));
}
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "fi2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flogo"
  }, "perito", /*#__PURE__*/React.createElement("span", null, ".barcelona")), /*#__PURE__*/React.createElement("div", {
    className: "ftext"
  }, "Ingenier\xEDa forense en dict\xE1menes periciales para litigios de alta cuant\xEDa en edificaci\xF3n y obra civil. Toda Espa\xF1a."), /*#__PURE__*/React.createElement("div", {
    className: "fcred"
  }, "Albert Vilardell Serra \xB7 Ingeniero Civil", /*#__PURE__*/React.createElement("br", null), "ECCAT n\xBA 16448 \xB7 Perito Judicial (M. Justicia)", /*#__PURE__*/React.createElement("br", null), "Perito de Seguros IRD \xB7 INESE")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fctit"
  }, "Dict\xE1menes"), SVCS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.slug,
    className: "flink",
    onClick: () => go('svc-' + s.slug)
  }, s.t))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fctit"
  }, "Despacho"), [['Perito Construcción', 'construccion'], ['Casos de Referencia', 'casos'], ['Abogados y Seguros', 'abogados'], ['Honorarios', 'honorarios'], ['El Despacho', 'despacho'], ['Contacto', 'contacto']].map(([l, p]) => /*#__PURE__*/React.createElement("button", {
    key: p,
    className: "flink",
    onClick: () => go(p)
  }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fctit"
  }, "Sedes"), /*#__PURE__*/React.createElement("div", {
    className: "fnap"
  }, "Carrer de Num\xE0ncia, 95, Local 5", /*#__PURE__*/React.createElement("br", null), "08029 Barcelona", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Carrer Navarra, 14", /*#__PURE__*/React.createElement("br", null), "08401 Granollers", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "+34 614 194 985", /*#__PURE__*/React.createElement("br", null), "info@perito.barcelona"))), /*#__PURE__*/React.createElement("div", {
    className: "fbot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fcp"
  }, "\xA9 2026 perito.barcelona \xB7 Aviso legal \xB7 Privacidad \xB7 Cookies"), /*#__PURE__*/React.createElement("span", {
    className: "fsc"
  }, "Ingenier\xEDa Forense \xB7 Toda Espa\xF1a"))));
}
Object.assign(window, {
  PIcon,
  Img,
  PB,
  PTag,
  PSeal,
  PStat,
  SVCS,
  CASOS,
  TESTI,
  FAQS_HOME,
  PROTO,
  INTAKE,
  Ticker,
  Band,
  Faq,
  Qual,
  PHero,
  ServiceRow,
  Nav,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/perito/shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
/* global React */
const DS = window.VilardellPeritajeForenseDesignSystem_58f0b0;
const {
  Button,
  Tag,
  Card,
  Stat,
  SectionHeader,
  Accordion,
  Seal
} = DS;
const {
  Icon,
  Placeholder,
  Reveal
} = window;
const wrap = {
  maxWidth: 'var(--container-wide)',
  margin: '0 auto',
  padding: '0 var(--gutter)'
};
const SERVICES = [{
  code: '2.1',
  slug: 'patologias-estructurales',
  icon: 'building-2',
  t: 'Patología de la edificación',
  d: 'Grietas, fisuras, asentamientos y daños estructurales. Causa, alcance y responsabilidad.'
}, {
  code: '2.2',
  slug: 'vicios-ocultos',
  icon: 'house',
  t: 'Vicios ocultos',
  d: 'Defectos no aparentes en compraventa o tras la entrega de obra nueva. Art. 1.484 CC y LOE.'
}, {
  code: '2.3',
  slug: 'humedades-filtraciones',
  icon: 'droplets',
  t: 'Humedades y filtraciones',
  d: 'Origen real de la humedad, no el síntoma. Diagnóstico instrumental y solución valorada.'
}, {
  code: '2.4',
  slug: 'naves-industriales',
  icon: 'hard-hat',
  t: 'Obra civil e infraestructura',
  d: 'Dictámenes sobre ejecución, mediciones, modificados y patología en obra pública y privada.'
}, {
  code: '2.5',
  slug: 'reclamacion-mala-ejecucion',
  icon: 'scale',
  t: 'Valoración de daños',
  d: 'Cuantificación pericial del coste de reparación y del perjuicio para reclamación o juicio.'
}, {
  code: '2.6',
  slug: 'contrainforme-pericial',
  icon: 'file-check-2',
  t: 'Contrainforme y ratificación',
  d: 'Revisión crítica de dictámenes de la parte contraria y comparecencia en sede judicial.'
}];
const METHOD = [{
  n: '01',
  t: 'Inspección',
  d: 'Visita técnica documentada: mediciones, ensayos y registro fotográfico fechado.'
}, {
  n: '02',
  t: 'Análisis',
  d: 'Diagnóstico de la causa conforme a normativa (CTE, LOE, EHE) y a la lex artis.'
}, {
  n: '03',
  t: 'Dictamen',
  d: 'Informe trazable con conclusiones fundadas y valoración económica del daño.'
}, {
  n: '04',
  t: 'Ratificación',
  d: 'Defensa del dictamen en sala, frente al juez y a la pericial contraria.'
}];
const CASES = [{
  exp: 'EXP. 22-074',
  loc: 'Barcelona',
  t: 'Defectos estructurales en promoción de 84 viviendas',
  amount: '€2,84 M',
  tag: 'Ratificado'
}, {
  exp: 'EXP. 23-119',
  loc: 'Girona',
  t: 'Filtraciones en cubierta de equipamiento público',
  amount: '€640 K',
  tag: 'Acuerdo'
}, {
  exp: 'EXP. 24-058',
  loc: 'Tarragona',
  t: 'Vicios ocultos tras compraventa de vivienda unifamiliar',
  amount: '€118 K',
  tag: 'Ratificado'
}];
function HomePage({
  go
}) {
  return /*#__PURE__*/React.createElement("main", {
    id: "top"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      paddingTop: 'clamp(48px,8vw,104px)',
      paddingBottom: 'var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.55fr 1fr',
      gap: 'clamp(32px,5vw,72px)',
      alignItems: 'center'
    },
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label-mono",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      color: 'var(--text-accent)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1.5,
      background: 'var(--accent)'
    }
  }), "Ingenier\xEDa forense \xB7 Perito judicial \xB7 Barcelona"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--fs-display-1)',
      lineHeight: 'var(--lh-display)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-strong)',
      margin: '22px 0 0',
      fontWeight: 400
    }
  }, "Dict\xE1menes que se", /*#__PURE__*/React.createElement("br", null), "sostienen en sala."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '26px',
      fontSize: 'var(--fs-lede)',
      lineHeight: 'var(--lh-lede)',
      color: 'var(--text-muted)',
      maxWidth: '52ch'
    }
  }, "Albert Vilardell Serra, ingeniero civil colegiado y perito judicial. Informes periciales sobre edificaci\xF3n y obra civil redactados para resistir el contradictorio \u2014 y para que la prueba quede demostrada, no afirmada."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      marginTop: '34px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go('contacto'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 17
    })
  }, "Solicitar dictamen"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => go('intake')
  }, "Tengo un problema en mi vivienda"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    },
    className: "hero-aside"
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "Inspecci\xF3n \xB7 obra civil",
    ratio: "4 / 5",
    seal: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-22px',
      left: '-22px',
      background: 'var(--paper-50)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px',
      boxShadow: 'var(--shadow-card)',
      maxWidth: '230px'
    },
    className: "hero-badge"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 20,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Inscrito \xB7 Min. Justicia")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '8px',
      fontFamily: 'var(--font-serif)',
      fontSize: '1rem',
      color: 'var(--text-strong)'
    }
  }, "Perito judicial y de seguros (IRD)"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--paper-50)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: 'var(--space-16) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '40px'
    },
    className: "stats-grid"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "\u20AC2,8 M",
    label: "Mayor importe peritado en un \xFAnico dictamen",
    source: "EXP. 22-074",
    accent: true
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "340+",
    label: "Dict\xE1menes en edificaci\xF3n y obra civil",
    source: "2009 \u2013 2025"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "100 %",
    label: "Dict\xE1menes ratificados en sede judicial",
    source: "Sin impugnaci\xF3n pericial"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "16 a\xF1os",
    label: "Colegiado ECCAT n\xBA 16448",
    source: "Ingenier\xEDa civil"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "\xA7 01 \xB7 A qui\xE9n acompa\xF1amos",
    title: "Dos encargos, el mismo rigor",
    size: "md",
    lede: "Tanto si gestiona un siniestro de varios millones como si le angustia una humedad que nadie resuelve, el dictamen se sostiene igual."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginTop: 'var(--space-12)'
    },
    className: "two-col"
  }, [{
    icon: 'landmark',
    tag: 'Aseguradoras · Despachos · Administración',
    t: 'Para el profesional exigente',
    pts: ['Dictámenes defendibles frente a la pericial contraria', 'Cuantificación rigurosa del daño y la responsabilidad', 'Ratificación y comparecencia en sede judicial'],
    cta: 'Encargar una pericial',
    tone: 'ink'
  }, {
    icon: 'home',
    tag: 'Particulares · Comunidades',
    t: 'Para el propietario preocupado',
    pts: ['Te explicamos qué pasa y qué opciones tienes', 'Presupuesto cerrado tras una primera consulta sin coste', 'Un informe que sirve ante tu aseguradora o el juzgado'],
    cta: 'Cuéntanos tu caso',
    tone: 'paper'
  }].map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.t,
    tone: c.tone === 'ink' ? 'ink' : 'paper',
    interactive: true,
    style: {
      padding: '32px 30px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 26,
    color: c.tone === 'ink' ? 'var(--oxide-400)' : 'var(--accent)'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6875rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: c.tone === 'ink' ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
      marginTop: '20px'
    }
  }, c.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--fs-h2)',
      fontWeight: 400,
      color: c.tone === 'ink' ? 'var(--bone-100)' : 'var(--text-strong)',
      margin: '8px 0 0'
    }
  }, c.t), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '22px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, c.pts.map(p => /*#__PURE__*/React.createElement("li", {
    key: p,
    style: {
      display: 'flex',
      gap: '11px',
      alignItems: 'flex-start',
      color: c.tone === 'ink' ? 'rgba(244,240,232,0.86)' : 'var(--text-body)',
      fontSize: '0.95rem',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 17,
    color: c.tone === 'ink' ? 'var(--oxide-400)' : 'var(--accent)',
    style: {
      marginTop: '2px',
      flexShrink: 0
    }
  }), p))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '28px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: c.tone === 'ink' ? 'on-dark' : 'secondary',
    onClick: () => go(c.tone === 'ink' ? 'contacto' : 'intake'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, c.cta)))))), /*#__PURE__*/React.createElement("section", {
    id: "servicios",
    style: {
      background: 'var(--paper-50)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "\xA7 02 \xB7 Servicios periciales",
    title: "Cada patolog\xEDa, un dictamen espec\xEDfico",
    lede: "Seis \xE1reas de actuaci\xF3n. Todas terminan en un informe trazable, fundado en normativa y defendible ante el juzgado."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: 'var(--space-12)'
    },
    className: "three-col"
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(Reveal, {
    key: s.code
  }, /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    refCode: /*#__PURE__*/React.createElement("span", null, "\xA7 ", s.code, /*#__PURE__*/React.createElement("span", {
      style: {
        float: 'right'
      }
    }, "Servicio")),
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 26px',
      cursor: 'pointer'
    },
    onClick: () => go('svc-' + s.slug)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 24,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '1.3rem',
      fontWeight: 500,
      color: 'var(--text-strong)',
      margin: '18px 0 0'
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      lineHeight: 1.55
    }
  }, s.d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '18px',
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, "Ver servicio ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14,
    color: "var(--accent)"
  }))))))))), /*#__PURE__*/React.createElement("section", {
    id: "metodo",
    style: {
      ...wrap,
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "\xA7 03 \xB7 M\xE9todo pericial",
    title: "Del indicio a la prueba",
    align: "center",
    lede: "Un procedimiento documentado en cada fase. La trazabilidad es lo que hace que un dictamen se sostenga."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '0',
      marginTop: 'var(--space-12)',
      borderTop: '2px solid var(--ink-900)'
    },
    className: "method-grid"
  }, METHOD.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.n,
    style: {
      padding: '28px 26px 0',
      borderRight: i < 3 ? '1px solid var(--border-hairline)' : 'none'
    },
    className: "method-cell"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      color: 'var(--accent)',
      letterSpacing: '0.1em'
    }
  }, m.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '1.35rem',
      fontWeight: 400,
      color: 'var(--text-strong)',
      margin: '14px 0 0'
    }
  }, m.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      lineHeight: 1.55
    }
  }, m.d))))), /*#__PURE__*/React.createElement("section", {
    id: "casos",
    style: {
      background: 'var(--ink-900)',
      color: 'var(--bone-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    onDark: true,
    eyebrow: "\xA7 04 \xB7 Casos ratificados",
    title: "La prueba, en cifras verificables",
    lede: "Una selecci\xF3n de expedientes recientes. Los importes corresponden al da\xF1o peritado; los n\xFAmeros de expediente son reales en el sistema interno del despacho."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: 'var(--space-12)'
    },
    className: "three-col"
  }, CASES.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.exp,
    tone: "ink",
    style: {
      borderColor: 'var(--ink-700)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      color: 'var(--text-on-dark-muted)'
    }
  }, c.exp, " \xB7 ", c.loc), /*#__PURE__*/React.createElement(Tag, {
    variant: "accent",
    size: "sm",
    dot: true
  }, c.tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '2rem',
      color: 'var(--bone-100)',
      margin: '20px 0 0',
      letterSpacing: '-0.01em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, c.amount), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: '0.92rem',
      color: 'rgba(244,240,232,0.78)',
      lineHeight: 1.5
    }
  }, c.t))))))), /*#__PURE__*/React.createElement("section", {
    id: "sobre",
    style: {
      ...wrap,
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.85fr 1.15fr',
      gap: 'clamp(32px,5vw,72px)',
      alignItems: 'center'
    },
    className: "two-col"
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "Albert Vilardell Serra",
    ratio: "4 / 5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "\xA7 05 \xB7 El perito",
    title: "Albert Vilardell Serra",
    size: "md",
    lede: "Ingeniero civil colegiado (ECCAT n\xBA 16448), perito judicial inscrito en el Ministerio de Justicia y perito de seguros IRD. Diecisiete a\xF1os redactando dict\xE1menes que se sostienen ante el juez."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: '24px'
    }
  }, ['Ingeniero civil · ECCAT 16448', 'Perito judicial · Min. Justicia', 'Perito de seguros · IRD', 'Actuación en toda España'].map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    variant: "outline"
  }, t))), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: '30px 0 0',
      paddingLeft: '22px',
      borderLeft: '2px solid var(--accent)',
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: '1.35rem',
      lineHeight: 1.45,
      color: 'var(--text-strong)'
    }
  }, "\xABMi trabajo no es tener raz\xF3n: es dejar la causa tan documentada que el juez pueda comprobarla por s\xED mismo.\xBB")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--paper-50)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: 'var(--section-y) var(--gutter)',
      maxWidth: '880px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "\xA7 06 \xB7 Preguntas frecuentes",
    title: "Antes de encargar un dictamen"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement(Accordion, {
    defaultOpen: 0,
    items: [{
      q: '¿Cuánto cuesta un dictamen pericial?',
      a: 'Depende del alcance y la complejidad. Tras una primera consulta sin coste recibirás un presupuesto cerrado por escrito antes de iniciar cualquier trabajo.'
    }, {
      q: '¿El informe sirve ante un juez o solo ante mi aseguradora?',
      a: 'Sirve para ambos. Cada dictamen se redacta conforme a la LEC y a la normativa técnica aplicable, con la trazabilidad necesaria para ser ratificado en sede judicial.'
    }, {
      q: '¿Cuánto se tarda desde que os contacto?',
      a: 'Entre dos y cuatro semanas desde la inspección, según el caso. Los plazos siempre se acuerdan por escrito de antemano.'
    }, {
      q: '¿Actuáis fuera de Cataluña?',
      a: 'Sí. La sede está en Barcelona, pero se actúa en toda España, presencialmente para la inspección y la ratificación.'
    }]
  })))), /*#__PURE__*/React.createElement(ContactCTA, {
    go: go
  }));
}
function ContactCTA({
  go
}) {
  const {
    Field,
    Input
  } = DS;
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    style: {
      ...wrap,
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(32px,5vw,80px)',
      alignItems: 'center'
    },
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "\xA7 07 \xB7 Primer contacto",
    title: "Cu\xE9ntanos el caso",
    size: "md",
    lede: "Una primera consulta sin coste para orientarte sobre si necesitas un dictamen y con qu\xE9 alcance. Respondemos en 24 h laborables."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      marginTop: '28px'
    }
  }, /*#__PURE__*/React.createElement(Seal, {
    size: 64,
    tone: "oxide"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      lineHeight: 1.7
    }
  }, "614 194 985", /*#__PURE__*/React.createElement("br", null), "info@perito.barcelona"))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 'clamp(24px,3vw,38px)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2",
    size: 40,
    color: "var(--positive)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '1.5rem',
      fontWeight: 400,
      margin: '16px 0 0',
      color: 'var(--text-strong)'
    }
  }, "Solicitud recibida"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      color: 'var(--text-muted)'
    }
  }, "Te responderemos en 24 h laborables.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '18px'
    },
    className: "form-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nombre",
    htmlFor: "n"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "n",
    required: true,
    placeholder: "Nombre y apellidos"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Soy",
    htmlFor: "r"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "r",
    placeholder: "Particular / Despacho / Aseguradora"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Correo electr\xF3nico",
    htmlFor: "e"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "e",
    type: "email",
    required: true,
    placeholder: "nombre@empresa.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "El caso",
    htmlFor: "c",
    hint: "Ubicaci\xF3n del inmueble y problema, en una l\xEDnea."
  }, /*#__PURE__*/React.createElement(Input, {
    id: "c",
    multiline: true,
    rows: 3,
    placeholder: "Humedades persistentes en\u2026"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    type: "submit"
  }, "Enviar solicitud")))));
}
window.HomePage = HomePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeVanguard.jsx
try { (() => {
/* global React */
// Avant-garde / editorial direction for perito.barcelona — maximal whitespace,
// oversized Spectral, asymmetric grid, oxide used as a single gesture.
const VDS = window.VilardellPeritajeForenseDesignSystem_58f0b0;
const {
  Seal: VSeal,
  Wordmark: VWord,
  StepForm: VStep
} = VDS;
const {
  Icon: VIcon,
  Reveal: VReveal
} = window;
const vwrap = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 clamp(24px, 6vw, 96px)'
};
const VSERVICES = [{
  n: '01',
  t: 'Patología de la edificación',
  d: 'Grietas, asentamientos y daño estructural. Causa, alcance, responsabilidad.'
}, {
  n: '02',
  t: 'Vicios ocultos',
  d: 'Defectos no aparentes en compraventa y obra nueva. Art. 1.484 CC · LOE.'
}, {
  n: '03',
  t: 'Humedades y filtraciones',
  d: 'El origen real, no el síntoma. Diagnóstico instrumental y solución valorada.'
}, {
  n: '04',
  t: 'Obra civil e infraestructura',
  d: 'Ejecución, mediciones, modificados y patología en obra pública y privada.'
}, {
  n: '05',
  t: 'Valoración de daños',
  d: 'Cuantificación pericial del coste de reparación y del perjuicio.'
}, {
  n: '06',
  t: 'Contrainforme y ratificación',
  d: 'Revisión crítica de la pericial contraria y comparecencia en sala.'
}];
function VNav({
  onIntake
}) {
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const h = () => setSolid(window.scrollY > 12);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const items = [['01', 'Servicios', 'servicios'], ['02', 'Casos', 'casos'], ['03', 'Método', 'metodo'], ['04', 'Contacto', 'contacto']];
  const jump = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 60,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: solid ? 'rgba(244,240,232,0.82)' : 'transparent',
      backdropFilter: solid ? 'blur(12px) saturate(180%)' : 'none',
      transition: 'background var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...vwrap,
      height: '88px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(VWord, {
    variant: "lockup",
    size: 24
  }), /*#__PURE__*/React.createElement("nav", {
    className: "vnav",
    style: {
      display: 'flex',
      gap: '38px',
      alignItems: 'center'
    }
  }, items.map(([n, label, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    onClick: e => {
      e.preventDefault();
      jump(id);
    },
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '7px',
      color: 'var(--text-strong)'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--text-accent)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-strong)'
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.62rem',
      color: 'var(--text-faint)',
      letterSpacing: '0.1em'
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '0.9rem',
      fontWeight: 500
    }
  }, label)))), /*#__PURE__*/React.createElement("button", {
    onClick: onIntake,
    className: "vnav-cta",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '9px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--accent)'
    }
  }), " Solicitar dictamen")));
}
function VHero({
  onIntake
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...vwrap,
      paddingTop: 'clamp(48px, 10vh, 130px)',
      paddingBottom: 'clamp(80px, 14vh, 200px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Ingenier\xEDa forense"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--stone-400)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, "Perito judicial"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--stone-400)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, "Barcelona \u2014 toda Espa\xF1a")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      color: 'var(--text-strong)',
      fontSize: 'clamp(2.8rem, 9.5vw, 8.5rem)',
      lineHeight: 0.98,
      letterSpacing: '-0.03em',
      margin: 'clamp(36px, 7vh, 88px) 0 0',
      textWrap: 'balance'
    }
  }, "La prueba", /*#__PURE__*/React.createElement("br", null), "no se afirma.", /*#__PURE__*/React.createElement("br", null), "Se ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      fontWeight: 400,
      position: 'relative'
    }
  }, "demuestra", /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '0.08em',
      height: '3px',
      background: 'var(--accent)'
    }
  })), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(24px, 5vw, 80px)',
      marginTop: 'clamp(48px, 9vh, 110px)',
      alignItems: 'end'
    },
    className: "vhero-foot"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)',
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      maxWidth: '42ch',
      margin: 0
    }
  }, "Albert Vilardell Serra redacta dict\xE1menes periciales sobre edificaci\xF3n y obra civil concebidos para resistir el contradictorio \u2014 y para que el juez compruebe la causa por s\xED mismo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '28px',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onIntake,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '1rem',
      fontWeight: 600,
      color: 'var(--text-strong)',
      background: 'none',
      border: 'none',
      borderBottom: '2px solid var(--accent)',
      paddingBottom: '4px',
      cursor: 'pointer'
    }
  }, "Tengo un problema en mi vivienda"), /*#__PURE__*/React.createElement(VSeal, {
    size: 84,
    tone: "ink"
  }))));
}
function VStats() {
  const stats = [['€2,8M', 'Mayor importe peritado', 'EXP. 22-074'], ['340+', 'Dictámenes emitidos', '2009 — 2025'], ['100%', 'Ratificados en sala', 'Sin impugnación'], ['16448', 'Colegiado ECCAT', 'Ingeniería civil']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...vwrap,
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 0
    },
    className: "vstats"
  }, stats.map(([v, l, s], i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      padding: 'clamp(40px,7vh,80px) 0',
      borderRight: i < 3 ? '1px solid var(--border-hairline)' : 'none',
      paddingRight: '24px',
      paddingLeft: i > 0 ? 'clamp(16px,2vw,32px)' : 0
    },
    className: "vstat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'clamp(2rem, 4vw, 3.4rem)',
      fontWeight: 400,
      color: i === 0 ? 'var(--accent)' : 'var(--text-strong)',
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '18px',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.95rem',
      color: 'var(--text-body)'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '6px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.62rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, s)))));
}
function VServiceRow({
  s,
  onIntake
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onIntake,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '88px 1fr auto',
      alignItems: 'center',
      gap: 'clamp(16px,4vw,56px)',
      width: '100%',
      textAlign: 'left',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 'clamp(26px,4vh,42px) 0',
      borderTop: '1px solid var(--border-hairline)',
      font: 'inherit'
    },
    className: "vsvc-row"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      color: hover ? 'var(--accent)' : 'var(--text-faint)',
      letterSpacing: '0.1em',
      transition: 'color var(--dur-base)'
    }
  }, s.n), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 400,
      color: 'var(--text-strong)',
      fontSize: 'clamp(1.5rem, 3.4vw, 2.7rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      transform: hover ? 'translateX(14px)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }, s.t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '0.95rem',
      color: 'var(--text-muted)',
      maxWidth: '52ch',
      maxHeight: hover ? '60px' : '0',
      opacity: hover ? 1 : 0,
      overflow: 'hidden',
      transform: hover ? 'translateX(14px)' : 'none',
      transition: 'max-height var(--dur-slow) var(--ease-out), opacity var(--dur-base), transform var(--dur-slow) var(--ease-out)'
    }
  }, s.d)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: hover ? 'var(--accent)' : 'var(--stone-400)',
      transform: hover ? 'translateX(6px)' : 'none',
      transition: 'transform var(--dur-base), color var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement(VIcon, {
    name: "arrow-right",
    size: 24,
    color: "currentColor"
  })));
}
function HomeVanguard() {
  const [intake, setIntake] = React.useState(false);
  const openIntake = () => setIntake(true);
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setIntake(false);
    }
    if (intake) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [intake]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VNav, {
    onIntake: openIntake
  }), /*#__PURE__*/React.createElement(VHero, {
    onIntake: openIntake
  }), /*#__PURE__*/React.createElement(VStats, null), /*#__PURE__*/React.createElement("section", {
    style: {
      ...vwrap,
      padding: 'clamp(90px,16vh,200px) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '20ch'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, "\xA7 Criterio")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 'clamp(1.7rem, 4.2vw, 3.4rem)',
      lineHeight: 1.18,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: 'clamp(28px,5vh,56px) 0 0',
      maxWidth: '20ch',
      textWrap: 'balance'
    }
  }, "Un dictamen no gana por afirmarse con fuerza. Gana cuando la causa queda tan documentada que cualquiera puede comprobarla.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 'clamp(300px,52vh,560px)',
      overflow: 'hidden',
      borderTop: '1px solid var(--ink-900)',
      borderBottom: '1px solid var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1900&q=70",
    alt: "Inspecci\xF3n en obra civil",
    onError: e => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = 'https://picsum.photos/seed/vanguardband/1900/800?grayscale';
    },
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(0.22) contrast(1.03)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(0deg, rgba(28,26,23,0.6), transparent 55%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...vwrap,
      paddingBottom: 'clamp(24px,5vh,56px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#fff'
    }
  }, "Trabajo de campo \xB7 inspecci\xF3n documentada")))), /*#__PURE__*/React.createElement("section", {
    id: "servicios",
    style: {
      ...vwrap,
      paddingBottom: 'clamp(80px,14vh,180px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 'clamp(24px,5vh,48px)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.74rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 500,
      margin: 0
    }
  }, "01 \u2014 Servicios periciales"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.74rem',
      color: 'var(--text-faint)',
      letterSpacing: '0.1em'
    }
  }, "06 \xE1reas")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, VSERVICES.map(s => /*#__PURE__*/React.createElement(VServiceRow, {
    key: s.n,
    s: s,
    onIntake: openIntake
  })))), /*#__PURE__*/React.createElement("section", {
    id: "casos",
    style: {
      background: 'var(--ink-900)',
      color: 'var(--bone-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...vwrap,
      padding: 'clamp(100px,18vh,220px) 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--text-on-dark-muted)'
    }
  }, "02 \u2014 Caso ratificado \xB7 EXP. 23-119"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontStyle: 'italic',
      fontSize: 'clamp(2rem, 5.5vw, 4.6rem)',
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      color: 'var(--bone-100)',
      margin: 'clamp(32px,6vh,72px) 0 0',
      maxWidth: '16ch',
      textWrap: 'balance'
    }
  }, "Tres reparaciones fallaron. La ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--oxide-400)',
      fontStyle: 'normal'
    }
  }, "cuarta"), " fue el dictamen."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'clamp(28px,5vh,52px)',
      maxWidth: '46ch',
      color: 'rgba(244,240,232,0.7)',
      fontSize: '1.1rem',
      lineHeight: 1.6
    }
  }, "Filtraciones en la cubierta de un equipamiento p\xFAblico. El diagn\xF3stico instrumental localiz\xF3 la causa en una junta de dilataci\xF3n mal resuelta y cerr\xF3 la reclamaci\xF3n en un acuerdo de 640.000 \u20AC."))), /*#__PURE__*/React.createElement("section", {
    id: "metodo",
    style: {
      ...vwrap,
      padding: 'clamp(90px,16vh,200px) 0'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.74rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 500,
      margin: '0 0 clamp(40px,7vh,72px)'
    }
  }, "03 \u2014 Del indicio a la prueba"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'clamp(24px,4vw,48px)'
    },
    className: "vmethod"
  }, [['Inspección', 'Visita documentada: mediciones, ensayos, registro fechado.'], ['Análisis', 'Diagnóstico conforme a CTE, LOE, EHE y lex artis.'], ['Dictamen', 'Informe trazable, conclusiones fundadas, valoración.'], ['Ratificación', 'Defensa en sala frente a la pericial contraria.']].map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      color: 'var(--accent)',
      letterSpacing: '0.1em'
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 400,
      fontSize: '1.5rem',
      color: 'var(--text-strong)',
      margin: '14px 0 0'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      lineHeight: 1.55
    }
  }, d))))), /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    style: {
      borderTop: '1px solid var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...vwrap,
      padding: 'clamp(90px,16vh,200px) 0',
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 'clamp(32px,6vw,80px)',
      alignItems: 'end'
    },
    className: "vcontact"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, "04 \u2014 Primer contacto"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 'clamp(2.4rem,6vw,5rem)',
      lineHeight: 1,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: 'clamp(24px,5vh,48px) 0 0'
    }
  }, "Cu\xE9ntanos", /*#__PURE__*/React.createElement("br", null), "el caso.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '1.05rem',
      lineHeight: 1.6,
      margin: 0
    }
  }, "Primera consulta sin coste. Presupuesto cerrado antes de empezar. Respuesta en 24 h laborables."), /*#__PURE__*/React.createElement("button", {
    onClick: openIntake,
    style: {
      alignSelf: 'flex-start',
      fontFamily: 'var(--font-sans)',
      fontSize: '1.05rem',
      fontWeight: 600,
      color: 'var(--bone-100)',
      background: 'var(--accent)',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '16px 30px',
      cursor: 'pointer'
    }
  }, "Solicitar dictamen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      letterSpacing: '0.04em',
      lineHeight: 1.9,
      marginTop: '8px'
    }
  }, "93 000 00 00", /*#__PURE__*/React.createElement("br", null), "info@perito.barcelona")))), /*#__PURE__*/React.createElement("footer", {
    style: {
      ...vwrap,
      padding: 'clamp(40px,7vh,72px) 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(VWord, {
    variant: "lockup",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.66rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "\xA9 2026 Albert Vilardell Serra \xB7 Perito judicial \xB7 ECCAT 16448")), intake && /*#__PURE__*/React.createElement("div", {
    onClick: () => setIntake(false),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(28,26,23,0.55)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '6vh 20px 48px',
      overflowY: 'auto',
      animation: 'om-fade var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: '560px',
      boxShadow: 'var(--shadow-overlay)',
      borderRadius: 'var(--radius-md)',
      animation: 'om-rise var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(VStep, {
    onClose: () => setIntake(false),
    title: "Cu\xE9ntanos tu caso",
    steps: [{
      key: 'p',
      eyebrow: '§ 01 · Tu situación',
      type: 'choice',
      question: '¿Qué está pasando en tu inmueble?',
      helper: 'Elige lo que más se acerque.',
      options: ['Humedades o filtraciones', 'Grietas o fisuras', 'Vicios ocultos tras comprar', 'Reforma mal ejecutada']
    }, {
      key: 'i',
      eyebrow: '§ 02 · El inmueble',
      type: 'choice',
      question: '¿De qué tipo de inmueble hablamos?',
      options: ['Vivienda particular', 'Comunidad de propietarios', 'Local o nave', 'Obra pública']
    }, {
      key: 'c',
      eyebrow: '§ 03 · Contacto',
      type: 'fields',
      question: '¿Cómo te contactamos?',
      helper: 'Una primera consulta sin coste.',
      fields: [{
        name: 'nombre',
        label: 'Nombre',
        placeholder: 'Tu nombre'
      }, {
        name: 'email',
        label: 'Correo',
        type: 'email',
        placeholder: 'nombre@correo.com'
      }]
    }]
  }))));
}
window.HomeVanguard = HomeVanguard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeVanguard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteChrome.jsx
try { (() => {
/* global React */
// Shared chrome for the perito.barcelona website UI kit:
// Icon (Lucide), SiteHeader, SiteFooter, Placeholder, Reveal.

const {
  Button,
  Wordmark,
  Seal,
  Tag
} = window.VilardellPeritajeForenseDesignSystem_58f0b0;

/** Lucide icon → inline SVG, recolourable via `color`. */
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.6,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': strokeWidth
        }
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      color,
      ...style
    },
    "aria-hidden": "true"
  });
}

/** Documentary image panel — real stock image with reliable fallback (never broken). */
const STOCK = {
  portrait: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=70',
  obra: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1100&q=70',
  edificio: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=70',
  detalle: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1100&q=70'
};
function pickStock(label = '') {
  const l = label.toLowerCase();
  if (/albert|retrato|perito|despacho/.test(l)) return STOCK.portrait;
  if (/inspecc|obra|campo|construc/.test(l)) return STOCK.obra;
  if (/termograf|humedad|filtrac|diagn/.test(l)) return STOCK.detalle;
  return STOCK.edificio;
}
function Placeholder({
  label,
  ratio = '4 / 3',
  tone = 'stone',
  seal = false,
  src,
  style = {}
}) {
  const seed = encodeURIComponent((label || 'perito').slice(0, 24));
  const list = [src || pickStock(label), `https://picsum.photos/seed/${seed}/900/700?grayscale`];
  const [i, setI] = React.useState(0);
  const loaded = React.useRef(false);
  React.useEffect(() => {
    loaded.current = false;
    const t = setTimeout(() => {
      if (!loaded.current) setI(x => Math.min(x + 1, list.length - 1));
    }, 2600);
    return () => clearTimeout(t);
  }, [i]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: 'var(--stone-200)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: list[i],
    alt: label || '',
    onLoad: () => {
      loaded.current = true;
    },
    onError: () => setI(x => Math.min(x + 1, list.length - 1)),
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(0.18) contrast(1.02)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(0deg, rgba(28,26,23,0.55), rgba(28,26,23,0.04) 45%, transparent)'
    }
  }), seal && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }
  }, /*#__PURE__*/React.createElement(Seal, {
    size: 84,
    tone: "light"
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      margin: '14px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6875rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#fff',
      textShadow: '0 1px 4px rgba(0,0,0,0.45)'
    }
  }, label));
}

/** Fade-up on scroll into view. */
function Reveal({
  children,
  delay = 0,
  style = {}
}) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, {
      threshold: 0.12
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: seen ? 1 : 0,
      transform: seen ? 'none' : 'translateY(16px)',
      transition: `opacity var(--dur-slow) var(--ease-out) ${delay}ms, transform var(--dur-slow) var(--ease-out) ${delay}ms`,
      ...style
    }
  }, children);
}
const NAVITEMS = [['Perito Construcción', 'construccion'], ['Casos', 'casos'], ['Abogados·Seguros', 'abogados'], ['Honorarios', 'honorarios'], ['Despacho', 'despacho']];
function SiteHeader({
  go,
  active = 'home'
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [dd, setDd] = React.useState(false);
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const linkStyle = on => ({
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: on ? 'var(--text-accent)' : 'var(--text-body)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '4px 0',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px'
  });
  const svcs = window.SVCS || [];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(241,241,234,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(180%) blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'background var(--dur-base), border-color var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-wide)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      height: '74px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    variant: "lockup",
    size: 25
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '26px'
    },
    className: "site-nav"
  }, /*#__PURE__*/React.createElement("button", {
    style: linkStyle(active === 'construccion'),
    onClick: () => go('construccion')
  }, "Perito Construcci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    },
    onMouseEnter: () => setDd(true),
    onMouseLeave: () => setDd(false)
  }, /*#__PURE__*/React.createElement("button", {
    style: linkStyle(active === 'informes' || active.startsWith('svc')),
    onClick: () => go('informes')
  }, "Dict\xE1menes ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 13
  })), dd && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 12px)',
      left: '-16px',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      minWidth: '320px',
      boxShadow: 'var(--shadow-overlay)',
      overflow: 'hidden'
    }
  }, svcs.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.slug,
    onClick: () => {
      setDd(false);
      go('svc-' + s.slug);
    },
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '10px',
      width: '100%',
      textAlign: 'left',
      padding: '11px 16px',
      background: 'none',
      border: 'none',
      borderBottom: '1px solid var(--border-subtle)',
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--accent-tint)',
    onMouseLeave: e => e.currentTarget.style.background = 'none'
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.58rem',
      color: 'var(--text-accent)',
      fontWeight: 600,
      letterSpacing: '0.06em'
    }
  }, s.num), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.85rem',
      color: 'var(--text-body)'
    }
  }, s.t))))), NAVITEMS.slice(1).map(([l, d]) => /*#__PURE__*/React.createElement("button", {
    key: d,
    style: linkStyle(active === d),
    onClick: () => go(d)
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+34614194985",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8125rem',
      color: 'var(--text-strong)',
      letterSpacing: '0.02em'
    },
    className: "site-phone"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 15,
    color: "var(--accent)"
  }), " 614 194 985"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => go('contacto')
  }, "Solicitar dictamen"), /*#__PURE__*/React.createElement("button", {
    className: "site-burger",
    onClick: () => setM(!m),
    "aria-label": "Men\xFA",
    style: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m ? 'x' : 'menu',
    size: 22
  })))), m && /*#__PURE__*/React.createElement("div", {
    className: "site-mobile",
    style: {
      display: 'none',
      flexDirection: 'column',
      padding: '8px var(--gutter) 18px',
      background: 'var(--surface-raised)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, [['Perito Construcción', 'construccion'], ['Dictámenes', 'informes'], ...NAVITEMS.slice(1), ['Contacto', 'contacto']].map(([l, d]) => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => {
      setM(false);
      go(d);
    },
    style: {
      textAlign: 'left',
      background: 'none',
      border: 'none',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '13px 0',
      fontSize: '0.95rem',
      color: 'var(--text-strong)',
      cursor: 'pointer'
    }
  }, l))));
}
function FooterCol({
  title,
  links,
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6875rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-on-dark-muted)',
      marginBottom: '18px'
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, links.map(([l, d]) => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      if (d) go(d);
    },
    style: {
      color: 'var(--bone-100)',
      fontSize: '0.9rem',
      opacity: 0.82
    }
  }, l)))));
}
function SiteFooter({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-900)',
      color: 'var(--bone-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-wide)',
      margin: '0 auto',
      padding: 'var(--space-20) var(--gutter) var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: '48px'
    },
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    variant: "stacked",
    tone: "light",
    size: 24
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '22px',
      maxWidth: '34ch',
      color: 'var(--text-on-dark-muted)',
      fontSize: '0.9rem',
      lineHeight: 1.6
    }
  }, "Dict\xE1menes periciales sobre edificaci\xF3n y obra civil. Sede en Barcelona, actuaci\xF3n en toda Espa\xF1a."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginTop: '22px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "outline",
    style: {
      color: 'var(--text-on-dark-muted)',
      borderColor: 'var(--ink-700)'
    }
  }, "ECCAT \xB7 16448"), /*#__PURE__*/React.createElement(Tag, {
    variant: "outline",
    style: {
      color: 'var(--text-on-dark-muted)',
      borderColor: 'var(--ink-700)'
    }
  }, "Min. Justicia"))), /*#__PURE__*/React.createElement(FooterCol, {
    go: go,
    title: "Dict\xE1menes",
    links: [['Vicios ocultos', 'svc-vicios-ocultos'], ['Humedades y filtraciones', 'svc-humedades-filtraciones'], ['Patologías estructurales', 'svc-patologias-estructurales'], ['Mala ejecución', 'svc-reclamacion-mala-ejecucion'], ['Ver catálogo', 'informes']]
  }), /*#__PURE__*/React.createElement(FooterCol, {
    go: go,
    title: "Despacho",
    links: [['Perito Construcción', 'construccion'], ['Casos ratificados', 'casos'], ['Abogados y Seguros', 'abogados'], ['Honorarios', 'honorarios'], ['El Despacho', 'despacho']]
  }), /*#__PURE__*/React.createElement(FooterCol, {
    go: go,
    title: "Contacto",
    links: [['Solicitar dictamen', 'contacto'], ['Primera consulta', 'contacto'], ['614 194 985', null], ['info@perito.barcelona', null]]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-16)',
      paddingTop: 'var(--space-6)',
      borderTop: '1px solid var(--ink-700)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6875rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-on-dark-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Albert Vilardell Serra \xB7 Perito judicial"), /*#__PURE__*/React.createElement("span", null, "Aviso legal \xB7 Privacidad \xB7 Cookies"))));
}
Object.assign(window, {
  Icon,
  Placeholder,
  Reveal,
  SiteHeader,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteData.jsx
try { (() => {
/* global React */
// Full content + sober shared blocks for the definitive perito.barcelona site.
(function () {
  const WNS = window.VilardellPeritajeForenseDesignSystem_58f0b0;
  const {
    Button: WB,
    Tag: WTag,
    Card: WCard,
    Stat: WStat,
    SectionHeader: WSH,
    Accordion: WAcc,
    Seal: WSeal
  } = WNS;
  const wrap = {
    maxWidth: 'var(--container-wide)',
    margin: '0 auto',
    padding: '0 var(--gutter)'
  };
  const SVCS = [{
    slug: 'informe-de-parte',
    num: 'EXP·01',
    tag: 'Litigación civil',
    t: 'Informe Pericial de Parte',
    norm: 'LEC art. 335',
    audience: 'pro',
    desc: 'Dictamen encargado por una de las partes para fundamentar su postura en negociación, mediación o demanda. Plena validez probatoria.',
    lsi: ['LEC art. 335', 'Dictamen técnico', 'Ratificación de parte', 'Procedimiento civil', 'Prueba pericial'],
    body: [['Su argumento técnico en una disputa', 'En cualquier litigio, la parte que presenta los argumentos técnicos más sólidos tiene ventaja decisiva. Un <b>informe pericial de parte</b> es un dictamen encargado por usted para investigar la realidad técnica de los hechos y defender su postura con objetividad y rigor.'], ['Cuándo es esencial', '<b>Antes de una demanda</b> — para evaluar la solidez técnica de la reclamación. <b>Durante una negociación</b> — un informe contundente fuerza acuerdos favorables sin juicio. <b>Como prueba</b> conforme a la LEC. <b>Para refutar</b> el dictamen de la parte contraria mediante un contrainforme.']],
    faqs: [['¿Tiene validez en un juicio?', 'Sí. Es un medio de prueba reconocido por la LEC (arts. 335 y ss.) y puede defenderse como prueba pericial ante el juez.'], ['¿Diferencia con el dictamen judicial?', 'El de parte lo encarga usted o su letrado; el judicial lo designa el juzgado. La metodología es idéntica.']]
  }, {
    slug: 'perito-judicial',
    num: 'EXP·02',
    tag: 'Designación judicial',
    t: 'Actuación como Perito Judicial',
    norm: 'LEC art. 347',
    audience: 'pro',
    desc: 'Por designación del juzgado o de parte. Imparcialidad acreditada y defensa oral solvente ante interrogatorio cruzado.',
    lsi: ['Designación judicial', 'Lista de peritos', 'LEC art. 347', 'Tacha de peritos', 'Ratificación en sala'],
    body: [['Actuación en sede judicial', 'La figura del perito judicial exige tres condiciones: conocimiento técnico acreditado, inscripción en la lista oficial del Ministerio de Justicia y capacidad de defender el dictamen verbalmente ante el juez y los letrados de ambas partes.'], ['Ratificación e interrogatorio cruzado', 'La ratificación oral es parte integrante del servicio. La solidez de esa defensa es determinante para el peso que el juez otorga al dictamen. <b>Honorarios de ratificación incluidos sin sobrecoste.</b>']],
    faqs: [['¿Cómo se designa al perito judicial?', 'Por sorteo entre los inscritos en la lista oficial del Ministerio de Justicia, o por acuerdo de las partes (LEC art. 339).'], ['¿Puede impugnarse el dictamen?', 'Las partes pueden tachar al perito o impugnar el dictamen (LEC art. 343). La solvencia del informe es la mejor defensa.']]
  }, {
    slug: 'patologias-estructurales',
    num: 'EXP·03',
    tag: 'Diagnóstico estructural',
    t: 'Patologías Estructurales',
    norm: 'CTE DB-SE · EHE-08',
    audience: 'mix',
    desc: 'Grietas activas, fisuras en forjados, asientos diferenciales y deformaciones críticas. Modelado FEM y ensayos in situ.',
    lsi: ['CTE DB-SE', 'EHE-08', 'Grietas activas', 'Asiento diferencial', 'Cálculo estructural', 'Modelado FEM'],
    body: [['Diagnóstico de patologías estructurales', 'Una patología estructural es cualquier alteración de los elementos portantes que afecte a la capacidad resistente o a la estabilidad. El diagnóstico correcto es el punto de partida de cualquier intervención técnica o reclamación jurídica.'], ['Metodología', 'Inspección visual y cartografía de fisuras · testigos de yeso y ensayos no destructivos · modelado estructural conforme al Eurocódigo 2 y CTE DB-SE · diagnóstico con origen, gravedad y cuantificación. El dictamen diferencia responsabilidades: proyecto, dirección de obra o ejecución (LOE art. 17).']],
    faqs: [['¿Todas las grietas son estructurales?', 'No. Pueden ser térmicas, de retracción, de asiento o de fatiga. La determinación del origen requiere análisis de geometría, apertura, disposición y evolución.'], ['¿Cuándo es urgente actuar?', 'Cuando la grieta es activa, afecta a elementos portantes, supera 1 mm con disposición diagonal o hay deformación perceptible.']]
  }, {
    slug: 'humedades-filtraciones',
    num: 'EXP·04',
    tag: 'Patología hídrica',
    t: 'Humedades y Filtraciones',
    norm: 'CTE DB-HS',
    audience: 'particular',
    desc: 'Detección no destructiva del origen mediante termografía infrarroja y pruebas de estanqueidad. Dictamen para reclamar a constructora, comunidad o aseguradora.',
    lsi: ['Termografía infrarroja', 'CTE DB-HS', 'Capilaridad ascendente', 'Condensación', 'Prueba de estanqueidad', 'Perito humedades Barcelona'],
    body: [['El síntoma no es el origen', 'La mancha visible rara vez indica el origen exacto del agua. El diagnóstico con metodología no destructiva — termografía infrarroja, higrómetros de profundidad, pruebas de estanqueidad — localiza el origen sin abrir obra. <b>Si ha pagado reparaciones que no han funcionado</b>, lo más probable es que se haya tratado el síntoma sin haber identificado la causa.'], ['Tipos de humedad', 'Capilaridad ascendente desde el terreno · filtración por cubierta o terraza (CTE DB-HS 1) · filtración por fachada o carpinterías · condensación superficial o intersticial · daños por instalaciones. El dictamen establece el origen, cuantifica los daños y delimita responsabilidades: constructora, comunidad de propietarios o cobertura de la póliza.']],
    faqs: [['¿La termografía basta para localizar el origen?', 'Es la herramienta de detección no destructiva principal, complementada con higrómetros de profundidad y análisis del detalle constructivo.'], ['¿Sirve para reclamar al seguro?', 'Sí. El dictamen delimita si el origen corresponde a la constructora, a la comunidad o está cubierto por la póliza.']]
  }, {
    slug: 'vicios-ocultos',
    num: 'EXP·05',
    tag: 'Compraventa inmobiliaria',
    t: 'Vicios Ocultos',
    norm: 'CC art. 1484',
    audience: 'particular',
    desc: 'Defectos graves no aparentes en la compraventa. Acreditación de preexistencia dentro del plazo de saneamiento de 6 meses.',
    lsi: ['Código Civil art. 1484', 'Defectos no aparentes', 'Plazo de saneamiento', 'Preexistencia', 'Acción redhibitoria'],
    body: [['Qué son los vicios ocultos', 'Defectos graves no aparentes en la compraventa que impiden el uso adecuado del bien. Regulados en el CC arts. 1484 y ss.: derecho a rescindir (acción redhibitoria) o reducir el precio (acción estimatoria). Deben ser graves, anteriores a la venta y desconocidos por el comprador.'], ['El plazo de 6 meses', 'El CC art. 1490 establece 6 meses desde la entrega para ejercitar las acciones. El informe pericial debe obtenerse dentro de ese plazo para acreditar técnicamente existencia, gravedad y preexistencia del defecto. <b>Si acaba de detectar el problema, el tiempo corre en su contra: contacte cuanto antes.</b>']],
    faqs: [['¿Qué plazo tengo para reclamar?', '6 meses desde la entrega del inmueble (CC art. 1490). Es imprescindible actuar dentro de ese plazo.'], ['¿Cómo se demuestra que el defecto es anterior a la compra?', 'Mediante el análisis técnico del grado de desarrollo de la patología: la antigüedad de una humedad o la evolución de una fisura permiten acreditar la preexistencia.']]
  }, {
    slug: 'reclamacion-mala-ejecucion',
    num: 'EXP·06',
    tag: 'Incumplimiento contractual',
    t: 'Mala Ejecución de Obra',
    norm: 'LOE art. 17',
    audience: 'mix',
    desc: 'Contraste objetivo de la obra frente a contrato, memoria de calidades y lex artis. Cuantificación de incumplimientos.',
    lsi: ['LOE art. 17', 'Memoria de calidades', 'Lex artis', 'Partidas no ejecutadas', 'Subsanación'],
    body: [['Cuando el resultado no es el pactado', 'Acabados deficientes, materiales inferiores a los acordados, partidas cobradas y no ejecutadas. El peritaje contrasta lo ejecutado con el contrato, el presupuesto, la memoria de calidades y la buena práctica constructiva (<b>lex artis</b>).'], ['El proceso de reclamación', '<b>1 · Reclamación amistosa:</b> un dictamen profesional suele bastar para que la constructora subsane. <b>2 · Mediación</b> con base técnica. <b>3 · Vía judicial:</b> el informe es la prueba pericial clave. Ratificación incluida.']],
    faqs: [['¿Qué plazos establece la LOE?', '1 año para defectos de acabado, 3 años para habitabilidad, 10 años para defectos estructurales, desde la recepción de la obra (LOE art. 17).'], ['¿Necesito informe para reclamar?', 'No es obligatorio en fase extrajudicial, pero es la herramienta más efectiva para que la empresa acepte subsanar sin juicio.']]
  }, {
    slug: 'contrainforme-pericial',
    num: 'EXP·07',
    tag: 'Análisis crítico',
    t: 'Contrainforme Pericial',
    norm: 'LEC art. 348',
    audience: 'pro',
    desc: 'Detección de carencias metodológicas y refutación técnica de dictámenes presentados por la parte contraria.',
    lsi: ['Refutación técnica', 'Carencias metodológicas', 'Pericial contraria', 'Sana crítica', 'Juicio oral'],
    body: [['Desmontar el argumento contrario', 'El contrainforme no elabora un nuevo dictamen sobre la patología: demuestra que las conclusiones del dictamen contrario son <b>incorrectas, incompletas o metodológicamente deficientes</b>.'], ['Qué se analiza', 'Rigor metodológico de la inspección · corrección de las referencias normativas (CTE, EHE-08, LOE) · coherencia entre datos y conclusiones · corrección de la cuantificación económica. Un juez que no puede fiarse del perito contrario da mayor crédito al dictamen que sí demuestra solidez.']],
    faqs: [['¿Puede el juez rechazar un informe pericial?', 'Valora libremente su fuerza probatoria conforme a la sana crítica (LEC art. 348). Un contrainforme sólido merma el peso del dictamen contrario.'], ['¿Cuánto se tarda?', 'Entre 10 y 20 días hábiles desde la recepción del informe a refutar. Acelerable con plazo procesal próximo.']]
  }, {
    slug: 'naves-industriales',
    num: 'EXP·08',
    tag: 'Industrial · B2B',
    t: 'Naves Industriales',
    norm: 'RSCIEI · TR-34',
    audience: 'pro',
    desc: 'Pavimentos logísticos, estructuras metálicas, daños post-alquiler y cumplimiento RSCIEI. Para aseguradoras y operadores.',
    lsi: ['RSCIEI', 'Pavimentos logísticos', 'Daños post-alquiler', 'Estructura metálica', 'TR-34', 'Siniestro industrial'],
    body: [['Peritaje especializado industrial', 'Las naves logísticas tienen normativa propia. Principales disputas: <b>daños post-alquiler, siniestros de incendio, fallos en pavimentos y cumplimiento RSCIEI</b>.'], ['Pavimentos logísticos e incendios', 'Fisuras por retracción o asiento de solera · planitud insuficiente para equipos VNA · juntas mal ejecutadas. Tolerancias conforme a la norma TR-34. En incendios: causa y origen, daño a estructura metálica y verificación del cumplimiento RSCIEI en el momento del siniestro.']],
    faqs: [['¿Qué es el RSCIEI?', 'El Reglamento de Seguridad Contra Incendios en Establecimientos Industriales (RD 2267/2004). Su incumplimiento es causa frecuente de conflicto.'], ['¿Qué es un dictamen post-alquiler?', 'Determina qué daños son uso normal (arrendador) y cuáles imputables al arrendatario por uso indebido o modificaciones no autorizadas.']]
  }];
  const CASOS = [{
    tag: 'Siniestro de incendio',
    imp: '€1,2 M',
    t: 'Incendio estructural en nave logística',
    d: 'Causa, origen y extensión en 8.000 m². Cuantificación para aseguradora nacional. Ratificado en juzgado.',
    pills: ['Aseguradora', '90 días', 'Ratificado']
  }, {
    tag: 'Obra civil',
    imp: '€2,8 M',
    t: 'Asiento diferencial en puente de vía rápida',
    d: 'Patologías en hormigón pretensado. Contencioso-administrativo contra constructora.',
    pills: ['AAPP', 'Litigio C-A', 'Barcelona']
  }, {
    tag: 'Vicios ocultos',
    imp: '€680 K',
    t: 'Patologías de envolvente en 120 viviendas',
    d: 'Fachada ventilada, cubierta y carpinterías. Comunidad contra promotora. Resolución favorable.',
    pills: ['Comunidad', '2024', 'Barcelona']
  }, {
    tag: 'Humedades',
    imp: '€340 K',
    t: 'Filtración por cubierta en plurifamiliar',
    d: 'Termografía. CTE DB-HS. Reparación íntegra a cargo de la constructora.',
    pills: ['Extrajudicial', 'Granollers']
  }, {
    tag: 'Mala ejecución',
    imp: '€430 K',
    t: 'Incumplimientos en reforma de local',
    d: 'Partidas no ejecutadas y materiales inferiores a memoria de calidades.',
    pills: ['Despacho', 'Mediación', 'BCN']
  }, {
    tag: 'Contrainforme',
    imp: '€920 K',
    t: 'Refutación en colapso de forjado',
    d: 'Carencias metodológicas en el informe de la aseguradora. Ratificación en juicio oral.',
    pills: ['Juicio oral', 'Valencia']
  }];
  const TESTI = [{
    q: 'Su dictamen fue la base de toda nuestra estrategia de negociación. Tan claro y contundente que logramos acuerdo sin ir a juicio.',
    a: 'Socio de Área',
    r: 'Despacho de construcción · Madrid'
  }, {
    q: 'Valoro la disponibilidad para ratificar en sala sin demoras y el rigor metodológico del informe.',
    a: 'Directora de Siniestros',
    r: 'Aseguradora multinacional · Barcelona'
  }, {
    q: 'El informe de due diligence identificó contingencias que no habíamos previsto. Se amortizó muchas veces.',
    a: 'Director de Inversiones',
    r: 'Family Office · Barcelona'
  }];
  const PROTO = [['Briefing técnico', 'Reunión de instrucción con letrado o director de siniestros. Análisis previo de viabilidad sin coste.'], ['Propuesta cerrada', 'Alcance definido, honorarios fijos y fecha de entrega comprometida por escrito. Sin variables.'], ['Instrucción y dictamen', 'Inspección, análisis, redacción y revisión interna. Formato técnico-jurídico listo para aportación.'], ['Ratificación incluida', 'Ratificación en sala e interrogatorio cruzado incluidos en honorarios. Sin sobrecoste.']];

  /* ── BLOQUES SOBRIOS ────────────────────────────────────── */
  function Breadcrumb({
    trail = [],
    go
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, trail.map((seg, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement(window.Icon, {
      name: "chevron-right",
      size: 13,
      color: "var(--text-faint)"
    }), seg.go ? /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go(seg.go);
      },
      style: {
        color: 'var(--text-muted)'
      }
    }, seg.label) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-accent)'
      }
    }, seg.label))));
  }
  function PageHero({
    trail,
    go,
    title,
    lede,
    seal
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 'clamp(36px,6vw,84px)',
        paddingBottom: 'var(--space-12)'
      }
    }, /*#__PURE__*/React.createElement(Breadcrumb, {
      trail: trail,
      go: go
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: seal ? '1fr auto' : '1fr',
        gap: 'clamp(24px,4vw,56px)',
        alignItems: 'center',
        marginTop: 'var(--space-8)'
      },
      className: "pagehero-grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--fs-display-1)',
        lineHeight: 'var(--lh-display)',
        letterSpacing: 'var(--tracking-tight)',
        color: 'var(--text-strong)',
        margin: 0,
        fontWeight: 400
      },
      dangerouslySetInnerHTML: {
        __html: title
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: '22px',
        fontSize: 'var(--fs-lede)',
        lineHeight: 'var(--lh-lede)',
        color: 'var(--text-muted)',
        maxWidth: '60ch'
      }
    }, lede)), seal && /*#__PURE__*/React.createElement("div", {
      className: "pagehero-seal"
    }, /*#__PURE__*/React.createElement(WSeal, {
      size: 104,
      tone: "ink"
    }))));
  }
  function Qual({
    label = 'Cualificación del caso',
    items,
    cta = 'Consultar caso',
    note = 'Ratificación incluida · Toda España',
    onIntake
  }) {
    const list = items || PROTO.map((p, i) => [String(i + 1).padStart(2, '0'), p[0]]);
    return /*#__PURE__*/React.createElement(WCard, {
      refCode: label,
      style: {
        position: 'sticky',
        top: '92px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '22px 22px 24px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1.6rem',
        color: 'var(--text-accent)',
        marginBottom: '4px'
      }
    }, "Consulta sin coste"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '14px'
      }
    }, list.map(([n, t], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        padding: '11px 0',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: '0.9rem',
        color: 'var(--text-body)',
        lineHeight: 1.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--text-accent)',
        fontWeight: 600,
        flexShrink: 0,
        paddingTop: '2px'
      }
    }, n), /*#__PURE__*/React.createElement("span", null, t)))), /*#__PURE__*/React.createElement(WB, {
      variant: "primary",
      fullWidth: true,
      onClick: onIntake,
      style: {
        marginTop: '18px'
      },
      iconRight: /*#__PURE__*/React.createElement(window.Icon, {
        name: "arrow-right",
        size: 15
      })
    }, cta), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '12px',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)'
      }
    }, note)));
  }
  function ServiceRow({
    s,
    go,
    compact
  }) {
    const [h, setH] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      onClick: () => go('svc-' + s.slug),
      style: {
        display: 'grid',
        gridTemplateColumns: compact ? '1fr 150px 28px' : '92px 1fr 200px 28px',
        gap: 'clamp(14px,3vw,40px)',
        alignItems: 'center',
        width: '100%',
        textAlign: 'left',
        background: h ? 'var(--surface-card)' : 'transparent',
        border: 'none',
        borderTop: '1px solid var(--border-hairline)',
        cursor: 'pointer',
        padding: '22px 14px',
        font: 'inherit',
        transition: 'background var(--dur-fast) var(--ease-out)'
      },
      className: "svc-row"
    }, !compact && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-accent)',
        letterSpacing: '0.08em',
        fontWeight: 500
      }
    }, s.num), /*#__PURE__*/React.createElement("span", null, !compact && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)',
        marginBottom: '6px'
      }
    }, s.tag), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontFamily: 'var(--font-serif)',
        fontSize: compact ? '1.1rem' : '1.3rem',
        fontWeight: 400,
        color: h ? 'var(--text-accent)' : 'var(--text-strong)',
        transition: 'color var(--dur-fast)',
        lineHeight: 1.15
      }
    }, s.t), !compact && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        marginTop: '7px',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        lineHeight: 1.5,
        maxWidth: '60ch'
      }
    }, s.desc)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)',
        textAlign: 'right',
        lineHeight: 1.5
      },
      className: "svc-norm"
    }, s.norm), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        color: h ? 'var(--text-accent)' : 'var(--text-faint)',
        transform: h ? 'translateX(4px)' : 'none',
        transition: 'transform var(--dur-fast), color var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement(window.Icon, {
      name: "arrow-right",
      size: 20,
      color: "currentColor"
    })));
  }
  function CaseCard({
    c,
    dark
  }) {
    return /*#__PURE__*/React.createElement(WCard, {
      tone: dark ? 'ink' : 'paper',
      style: dark ? {
        borderColor: 'var(--ink-700)'
      } : {}
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '24px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-accent)',
        fontWeight: 600
      }
    }, c.tag)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '2rem',
        color: dark ? 'var(--bone-100)' : 'var(--text-strong)',
        margin: '16px 0 0',
        letterSpacing: '-0.01em',
        fontVariantNumeric: 'tabular-nums'
      }
    }, c.imp), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '10px',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: dark ? 'var(--bone-100)' : 'var(--text-strong)'
      }
    }, c.t), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '7px 0 0',
        fontSize: '0.85rem',
        color: dark ? 'rgba(241,241,234,0.72)' : 'var(--text-muted)',
        lineHeight: 1.55
      }
    }, c.d), c.pills && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '7px',
        marginTop: '16px',
        flexWrap: 'wrap'
      }
    }, c.pills.map(p => /*#__PURE__*/React.createElement(WTag, {
      key: p,
      variant: "outline",
      size: "sm",
      style: dark ? {
        color: 'var(--text-on-dark-muted)',
        borderColor: 'var(--ink-700)'
      } : {}
    }, p)))));
  }
  function Testi({
    t
  }) {
    return /*#__PURE__*/React.createElement(WCard, {
      style: {
        padding: '26px',
        borderTop: '3px solid var(--accent)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1.05rem',
        lineHeight: 1.55,
        color: 'var(--text-strong)',
        margin: 0
      }
    }, "\xAB", t.q, "\xBB"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '18px',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, t.a), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-accent)',
        marginTop: '4px'
      }
    }, t.r));
  }
  function FaqList({
    items
  }) {
    return /*#__PURE__*/React.createElement(WAcc, {
      defaultOpen: -1,
      items: items.map(([q, a]) => ({
        q,
        a: /*#__PURE__*/React.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: a
          }
        })
      }))
    });
  }
  function BandCTA({
    eyebrow,
    title,
    lede,
    btn,
    onClick,
    tone = 'tint'
  }) {
    const ink = tone === 'ink';
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: ink ? 'var(--surface-ink)' : 'var(--surface-tint)',
        borderTop: ink ? 'none' : '1px solid var(--oxide-200)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...wrap,
        padding: 'var(--section-y) var(--gutter)',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }
    }, /*#__PURE__*/React.createElement(WSeal, {
      size: 64,
      tone: ink ? 'light' : 'oxide'
    })), /*#__PURE__*/React.createElement(WSH, {
      align: "center",
      onDark: ink,
      eyebrow: eyebrow,
      title: title,
      lede: lede
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '28px'
      }
    }, /*#__PURE__*/React.createElement(WB, {
      variant: "primary",
      size: "lg",
      onClick: onClick
    }, btn))));
  }
  const SecHead = ({
    eyebrow,
    title,
    lede,
    align,
    right
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '20px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(WSH, {
    eyebrow: eyebrow,
    title: title,
    lede: lede,
    align: align
  }), right);
  Object.assign(window, {
    wrap,
    SVCS,
    CASOS,
    TESTI,
    PROTO,
    Breadcrumb,
    PageHero,
    Qual,
    ServiceRow,
    CaseCard,
    Testi,
    FaqList,
    BandCTA,
    SecHead,
    WB,
    WTag,
    WCard,
    WStat,
    WSH,
    WAcc,
    WSeal
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteData.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SitePages.jsx
try { (() => {
/* global React */
(function () {
  const {
    wrap,
    SVCS,
    CASOS,
    TESTI,
    Qual,
    ServiceRow,
    CaseCard,
    Testi,
    FaqList,
    BandCTA,
    PageHero,
    SecHead,
    WB,
    WTag,
    WSH,
    WCard
  } = window;
  const sec = {
    ...wrap,
    padding: 'var(--section-y) var(--gutter)'
  };
  const sgrid = {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: 'clamp(28px,4vw,56px)',
    alignItems: 'start'
  };
  const Body = ({
    blocks
  }) => /*#__PURE__*/React.createElement("div", null, blocks.map(([h, p], i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--fs-h3)',
      fontWeight: 500,
      color: 'var(--text-strong)',
      margin: '26px 0 10px',
      paddingBottom: '8px',
      borderBottom: '2px solid var(--accent)',
      display: 'inline-block'
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '1rem',
      lineHeight: 1.75,
      color: 'var(--text-muted)',
      margin: '0 0 12px',
      maxWidth: '62ch'
    },
    dangerouslySetInnerHTML: {
      __html: p
    }
  }))));

  /* ── CONSTRUCCIÓN (particulares) ───────────────────────── */
  function Construccion({
    go,
    open
  }) {
    const rels = SVCS.filter(s => ['vicios-ocultos', 'reclamacion-mala-ejecucion', 'patologias-estructurales', 'humedades-filtraciones', 'contrainforme-pericial'].includes(s.slug));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
      go: go,
      trail: [{
        label: 'Inicio',
        go: 'home'
      }, {
        label: 'Construcción'
      }],
      title: "Perito de construcci\xF3n<br/>en Barcelona",
      lede: "\xBFHumedades que no se resuelven? \xBFVicios ocultos tras comprar? \xBFUna reforma mal ejecutada? Te explicamos qu\xE9 pasa y qu\xE9 opciones tienes \u2014 con un informe que sirve ante tu aseguradora o el juzgado."
    }), /*#__PURE__*/React.createElement("section", {
      style: sec
    }, /*#__PURE__*/React.createElement("div", {
      style: sgrid,
      className: "site-two"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Body, {
      blocks: [['El técnico que diferencia el defecto del argumento', 'Un perito de construcción no solo describe lo que ve en una inspección. Analiza el fallo desde la raíz — proyecto, dirección facultativa o ejecución — y lo traduce en un dictamen con estructura jurídica capaz de ser ratificado ante un tribunal.'], ['Particulares y comunidades', 'Atendemos disputas en vivienda — vicios ocultos tras la compra, reformas mal ejecutadas, humedades sin resolver — y también a comunidades de propietarios y despachos. La titulación de Ingeniero Civil (ECCAT nº 16448) permite analizar estructura y cimentación con una profundidad diferente.']]
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--fs-h3)',
        fontWeight: 500,
        margin: '30px 0 6px',
        color: 'var(--text-strong)'
      }
    }, "\xC1mbito de actuaci\xF3n"), /*#__PURE__*/React.createElement("div", null, rels.map(s => /*#__PURE__*/React.createElement(ServiceRow, {
      key: s.slug,
      s: s,
      go: go,
      compact: true
    })))), /*#__PURE__*/React.createElement(Qual, {
      label: "Tu consulta, paso a paso",
      onIntake: open,
      cta: "Cu\xE9ntanos tu caso",
      items: [['✓', 'Análisis previo de viabilidad técnica'], ['✓', 'Presupuesto cerrado antes del encargo'], ['✓', 'Ratificación en sala incluida'], ['✓', 'Desplazamiento a toda España 24–48h']],
      note: "614 194 985 \xB7 Respuesta 24h"
    }))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...sec,
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement(WSH, {
      eyebrow: "\xA7 Casos en construcci\xF3n",
      title: "Referencias"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: '20px',
        marginTop: 'var(--space-10)'
      },
      className: "site-three"
    }, CASOS.slice(2, 5).map((c, i) => /*#__PURE__*/React.createElement(CaseCard, {
      key: i,
      c: c
    })))), /*#__PURE__*/React.createElement(BandCTA, {
      eyebrow: "Primer contacto",
      title: "\xBFTienes un problema constructivo que documentar?",
      lede: "Consulta inicial sin coste. Te orientamos sobre si necesitas un dictamen y con qu\xE9 alcance.",
      btn: "Cu\xE9ntanos tu caso",
      onClick: open
    }));
  }

  /* ── INFORMES (hub) ────────────────────────────────────── */
  function Informes({
    go,
    open
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
      go: go,
      seal: true,
      trail: [{
        label: 'Inicio',
        go: 'home'
      }, {
        label: 'Dictámenes'
      }],
      title: "Informes periciales de<br/>edificaci\xF3n y obra civil",
      lede: "Ocho especialidades t\xE9cnico-legales para la resoluci\xF3n de disputas complejas. Metodolog\xEDa cient\xEDfica e independiente, preparada para ratificaci\xF3n oral conforme a la LEC."
    }), /*#__PURE__*/React.createElement("section", {
      style: sec
    }, /*#__PURE__*/React.createElement("div", null, SVCS.map(s => /*#__PURE__*/React.createElement(ServiceRow, {
      key: s.slug,
      s: s,
      go: go
    })))), /*#__PURE__*/React.createElement(BandCTA, {
      eyebrow: "Sin coste",
      title: "\xBFNo identificas tu caso en el \xEDndice?",
      lede: "Descr\xEDbenoslo y te orientamos sin compromiso.",
      btn: "Consultar caso",
      onClick: open
    }));
  }

  /* ── SERVICIO (genérico) ───────────────────────────────── */
  function Svc({
    svc,
    go,
    open
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
      go: go,
      trail: [{
        label: 'Inicio',
        go: 'home'
      }, {
        label: 'Dictámenes',
        go: 'informes'
      }, {
        label: svc.num
      }],
      title: `${svc.t}<em style="display:block;font-style:italic;font-size:.42em;margin-top:.5em;color:var(--text-accent);letter-spacing:0">${svc.tag}</em>`,
      lede: svc.desc
    }), /*#__PURE__*/React.createElement("section", {
      style: {
        ...sec,
        paddingTop: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: sgrid,
      className: "site-two"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '8px'
      }
    }, svc.lsi.map(l => /*#__PURE__*/React.createElement(WTag, {
      key: l,
      variant: "ink"
    }, l))), /*#__PURE__*/React.createElement(Body, {
      blocks: svc.body
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--fs-h3)',
        fontWeight: 500,
        margin: '32px 0 16px',
        color: 'var(--text-strong)'
      }
    }, "Preguntas frecuentes"), /*#__PURE__*/React.createElement(FaqList, {
      items: svc.faqs
    })), /*#__PURE__*/React.createElement(Qual, {
      label: `Expediente · ${svc.num}`,
      onIntake: open,
      cta: "Consultar este dictamen"
    }))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...sec,
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement(WSH, {
      eyebrow: "\xA7 Otros dict\xE1menes",
      title: "Relacionados"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-8)'
      }
    }, SVCS.filter(x => x.slug !== svc.slug).slice(0, 4).map(s => /*#__PURE__*/React.createElement(ServiceRow, {
      key: s.slug,
      s: s,
      go: go,
      compact: true
    })))), /*#__PURE__*/React.createElement(BandCTA, {
      eyebrow: "Sin coste",
      title: "\xBFNecesitas este dictamen?",
      lede: "Consulta inicial sin coste. Plazo de entrega por contrato.",
      btn: "Consultar caso",
      onClick: open
    }));
  }

  /* ── CASOS ─────────────────────────────────────────────── */
  function Casos({
    go,
    open
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
      go: go,
      trail: [{
        label: 'Inicio',
        go: 'home'
      }, {
        label: 'Casos'
      }],
      title: "Dict\xE1menes de<br/>alta cuant\xEDa resueltos",
      lede: "Selecci\xF3n de casos en edificaci\xF3n, obra civil y siniestros industriales. Importes y detalles anonimizados para preservar la confidencialidad de las partes."
    }), /*#__PURE__*/React.createElement("section", {
      style: sec
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: '20px'
      },
      className: "site-three"
    }, CASOS.map((c, i) => /*#__PURE__*/React.createElement(CaseCard, {
      key: i,
      c: c,
      dark: i % 3 === 1
    })))), /*#__PURE__*/React.createElement(BandCTA, {
      eyebrow: "Sin compromiso",
      title: "\xBFTienes un caso similar?",
      lede: "Cu\xE9ntanoslo y te decimos si tiene recorrido pericial.",
      btn: "Consultar caso",
      onClick: open
    }));
  }

  /* ── ABOGADOS / B2B ────────────────────────────────────── */
  function Abogados({
    go,
    open
  }) {
    const cols = [['Protocolo A — Despachos', 'Para despachos de abogados', ['Informe preliminar de viabilidad técnica en 48 horas', 'Honorarios fijos pactados por escrito', 'Ratificación garantizada (LEC art. 347) incluida', 'Múltiples procedimientos simultáneos', 'Informe de avance periódico al letrado']], ['Protocolo B — Aseguradoras', 'Para aseguradoras y reaseguradoras', ['Valoración de causa, alcance y cuantía del siniestro', 'Contrapericia frente al perito del asegurado', 'Colaboración en siniestros concurrentes', 'Certificación IRD — INESE', 'Interlocución directa con dirección de siniestros']]];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
      go: go,
      seal: true,
      trail: [{
        label: 'Inicio',
        go: 'home'
      }, {
        label: 'Abogados · Seguros'
      }],
      title: "Servicio t\xE9cnico para<br/>despachos y aseguradoras",
      lede: "Protocolo de colaboraci\xF3n B2B para despachos especializados en construcci\xF3n y compa\xF1\xEDas aseguradoras que necesitan un perito de parte independiente."
    }), /*#__PURE__*/React.createElement("section", {
      style: sec
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      },
      className: "site-two"
    }, cols.map(([n, t, items]) => /*#__PURE__*/React.createElement(WCard, {
      key: n,
      style: {
        padding: '30px',
        borderTop: '3px solid var(--accent)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text-accent)'
      }
    }, n), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--fs-h2)',
        fontWeight: 400,
        color: 'var(--text-strong)',
        margin: '10px 0 0'
      }
    }, t), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        margin: '20px 0 0',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }
    }, items.map(x => /*#__PURE__*/React.createElement("li", {
      key: x,
      style: {
        display: 'flex',
        gap: '11px',
        alignItems: 'flex-start',
        fontSize: '0.95rem',
        color: 'var(--text-body)',
        lineHeight: 1.5
      }
    }, /*#__PURE__*/React.createElement(window.Icon, {
      name: "check",
      size: 17,
      color: "var(--accent)",
      style: {
        marginTop: '2px',
        flexShrink: 0
      }
    }), x))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '24px'
      }
    }, /*#__PURE__*/React.createElement(WB, {
      variant: "secondary",
      onClick: open,
      iconRight: /*#__PURE__*/React.createElement(window.Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Iniciar colaboraci\xF3n")))))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...sec,
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement(WSH, {
      eyebrow: "\xA7 Declaraciones",
      title: "Referencias B2B"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: '20px',
        marginTop: 'var(--space-10)'
      },
      className: "site-three"
    }, TESTI.map((t, i) => /*#__PURE__*/React.createElement(Testi, {
      key: i,
      t: t
    })))), /*#__PURE__*/React.createElement(BandCTA, {
      eyebrow: "Sin compromiso",
      title: "\xBFTu despacho necesita un perito de parte solvente?",
      lede: "Informe de viabilidad en 48 horas.",
      btn: "Iniciar colaboraci\xF3n",
      onClick: open
    }));
  }

  /* ── HONORARIOS ────────────────────────────────────────── */
  function Honorarios({
    go,
    open
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
      go: go,
      trail: [{
        label: 'Inicio',
        go: 'home'
      }, {
        label: 'Honorarios'
      }],
      title: "Honorarios de<br/>informes periciales",
      lede: "Honorarios fijos acordados antes del inicio del encargo. Sin costes variables ni sorpresas. La ratificaci\xF3n en sala est\xE1 incluida sin sobrecoste."
    }), /*#__PURE__*/React.createElement("section", {
      style: sec
    }, /*#__PURE__*/React.createElement("div", {
      style: sgrid,
      className: "site-two"
    }, /*#__PURE__*/React.createElement(Body, {
      blocks: [['Presupuesto cerrado antes del inicio', 'No se utiliza una tarifa estándar porque cada caso es técnicamente diferente. El coste depende de la complejidad, el número de visitas, los ensayos requeridos y el alcance del análisis. Tras analizar la documentación inicial, se emite una propuesta técnica con honorarios fijos cerrados.'], ['Qué incluye el presupuesto', '<b>Inspección</b> del inmueble o infraestructura · <b>análisis</b> de la documentación técnica · <b>redacción</b> y maquetación del dictamen · <b>revisión interna</b> y control de calidad · <b>ratificación en sede judicial</b> e interrogatorio cruzado · <b>desplazamientos</b> en toda España. No hay costes adicionales posteriores al presupuesto acordado.']]
    }), /*#__PURE__*/React.createElement(Qual, {
      label: "Factores de coste",
      onIntake: open,
      cta: "Solicitar presupuesto",
      note: "Primera consulta sin coste",
      items: [['01', 'Tipo de dictamen — parte, judicial o contrainforme'], ['02', 'Complejidad técnica del caso'], ['03', 'Número de visitas de inspección'], ['04', 'Ensayos — termografía, testigos, FEM'], ['05', 'Alcance geográfico'], ['06', 'Urgencia del plazo']]
    }))), /*#__PURE__*/React.createElement(BandCTA, {
      eyebrow: "Sin coste",
      title: "\xBFQuieres saber cu\xE1nto costar\xEDa tu informe?",
      lede: "Primera consulta sin coste y presupuesto cerrado por escrito.",
      btn: "Solicitar presupuesto",
      onClick: open
    }));
  }

  /* ── DESPACHO ──────────────────────────────────────────── */
  function Despacho({
    go,
    open
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
      go: go,
      seal: true,
      trail: [{
        label: 'Inicio',
        go: 'home'
      }, {
        label: 'El Despacho'
      }],
      title: "Albert Vilardell Serra<br/><em style=\"font-style:italic;color:var(--text-accent)\">Ingeniero Civil \xB7 Perito Judicial</em>",
      lede: "Despacho de ingenier\xEDa forense fundado en Barcelona. M\xE1s de 15 a\xF1os en peritaje de edificaci\xF3n, obra civil y siniestros complejos para el mercado legal y asegurador."
    }), /*#__PURE__*/React.createElement("section", {
      style: sec
    }, /*#__PURE__*/React.createElement("div", {
      style: sgrid,
      className: "site-two"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.Placeholder, {
      label: "Albert Vilardell Serra",
      ratio: "3 / 2",
      style: {
        marginBottom: '26px'
      }
    }), /*#__PURE__*/React.createElement(Body, {
      blocks: [['Especialización, no generalismo', 'Este despacho no acepta cualquier encargo. La especialización en dictámenes para litigios de alta cuantía implica rechazar casos que no se ajustan al perfil y concentrar los recursos donde el impacto técnico es determinante. La independencia técnica y la solvencia del dictamen son el único activo.'], ['Principios de trabajo', '<b>Independencia técnica</b> — innegociable, sin exclusivas. <b>Plazos por contrato</b> — si no se puede garantizar, no se acepta el encargo. <b>Honorarios fijos</b> — acordados antes del inicio, ratificación incluida. <b>Claridad técnica</b> — un dictamen que no se entiende en sala no tiene valor.']]
    })), /*#__PURE__*/React.createElement(Qual, {
      label: "Habilitaci\xF3n profesional",
      onIntake: open,
      cta: "Consultar disponibilidad",
      note: "L\u2013J 9h\u201318h \xB7 V 9h\u201314h \xB7 Cita previa",
      items: [['TÍT', 'Ingeniero Civil — ETSECCPB · UPC'], ['COL', 'ECCAT nº 16448'], ['JUD', 'Perito Judicial — Ministerio de Justicia'], ['IRD', 'Perito de Seguros — INESE'], ['BCN', 'C. de Numància, 95 · 08029 Barcelona'], ['GRA', 'C. Navarra, 14 · 08401 Granollers']]
    }))), /*#__PURE__*/React.createElement(BandCTA, {
      eyebrow: "Disponibilidad",
      title: "\xBFNecesitas un perito con esta formaci\xF3n?",
      btn: "Consultar caso",
      onClick: open
    }));
  }

  /* ── CONTACTO ──────────────────────────────────────────── */
  function Contacto({
    go,
    open
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
      go: go,
      trail: [{
        label: 'Inicio',
        go: 'home'
      }, {
        label: 'Contacto'
      }],
      title: "Solicitar<br/>consulta t\xE9cnica",
      lede: "Primera valoraci\xF3n sin coste. Respuesta en menos de 24 horas laborables. Para asuntos urgentes, contacto directo por tel\xE9fono."
    }), /*#__PURE__*/React.createElement("section", {
      style: sec
    }, /*#__PURE__*/React.createElement("div", {
      style: sgrid,
      className: "site-two"
    }, /*#__PURE__*/React.createElement(Body, {
      blocks: [['Canales', '<b style="color:var(--text-strong)">614 194 985</b> · <b style="color:var(--text-strong)">info@perito.barcelona</b>'], ['Sedes', '<b>Barcelona (principal)</b> — Carrer de Numància, 95, Local 5 · 08029 Barcelona. Con cita previa · L–J 9h–18h · V 9h–14h.<br/><b>Granollers</b> — Carrer Navarra, 14 · 08401 Granollers. Con cita previa.'], ['Confidencialidad', 'Toda la información de la consulta inicial se trata con estricta confidencialidad conforme al RGPD (Reglamento UE 2016/679), exclusivamente para la gestión de la consulta.']]
    }), /*#__PURE__*/React.createElement(Qual, {
      label: "Consulta guiada",
      onIntake: open,
      cta: "Iniciar consulta guiada",
      note: "Confidencial \xB7 Sin compromiso",
      items: [['01', 'Tipo de asunto'], ['02', 'Descripción breve'], ['03', 'Importe en disputa'], ['04', 'Situación procesal'], ['05', 'Datos de contacto']]
    }))));
  }
  Object.assign(window, {
    Construccion,
    Informes,
    Svc,
    Casos,
    Abogados,
    Honorarios,
    Despacho,
    Contacto
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SitePages.jsx", error: String((e && e.message) || e) }); }

// uploads/perito-definitivo.jsx
try { (() => {
const {
  useState
} = React;
/* ════════════════════════════════════════════════════════════════
   PERITO.BARCELONA — VERSIÓN DEFINITIVA
   Base visual: Peritia v5 (Playfair Display + DM Sans + JetBrains Mono,
   teal, espacio blanco editorial)
   + Maquinaria de captación del "Expediente":
     · Caja de cualificación sticky en páginas de servicio
     · Chips de normativa en negro
     · Metadatos mono de expediente (EXP·01…) como eyebrows
   ════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
:root{--t:#0F766E;--tl:#CCFBF1;--td:#134E4A;--a:#B45309;--i:#0F1923;--i6:rgba(15,25,35,.6);--i3:rgba(15,25,35,.3);--i1:rgba(15,25,35,.07);--p:#FAFAF8;--b:#E5E7EB;--w:#FFFFFF;}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--w);color:var(--i);-webkit-font-smoothing:antialiased;}
.fd{font-family:'Playfair Display',serif;}
.fm{font-family:'JetBrains Mono',monospace;}
@keyframes tk{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.tick{animation:tk 40s linear infinite;}
.tick:hover{animation-play-state:paused;}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.au{animation:fu .4s cubic-bezier(.16,1,.3,1) forwards;}
@keyframes sp{to{transform:rotate(360deg)}}
.spin{animation:sp .7s linear infinite;}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:60;background:rgba(255,255,255,.93);backdrop-filter:blur(14px);border-bottom:1px solid var(--b);}
.ni{max-width:1280px;margin:0 auto;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:64px;}
.logo{font-family:'Playfair Display',serif;font-weight:900;font-size:1.05rem;letter-spacing:-.02em;color:var(--i);cursor:pointer;}
.logo span{color:var(--t);}
.nlinks{display:flex;align-items:center;gap:1.6rem;}
.nl{font-size:.8rem;font-weight:500;color:var(--i6);cursor:pointer;letter-spacing:.03em;background:none;border:none;transition:color .2s;padding:0;position:relative;font-family:'DM Sans',sans-serif;}
.nl:hover,.nl.on{color:var(--t);}
.nl.on::after{content:'';position:absolute;bottom:-6px;left:0;right:0;height:2px;background:var(--t);}
.dd{position:relative;}
.ddm{position:absolute;top:calc(100% + 14px);left:-1rem;background:white;border:1px solid var(--b);min-width:300px;box-shadow:0 12px 40px rgba(15,25,35,.1);z-index:80;opacity:0;visibility:hidden;transform:translateY(-4px);transition:all .2s cubic-bezier(.16,1,.3,1);}
.dd:hover .ddm{opacity:1;visibility:visible;transform:translateY(0);}
.ddi{display:flex;align-items:baseline;gap:.75rem;padding:.7rem 1rem;font-size:.8rem;color:var(--i6);transition:all .15s;border-bottom:1px solid var(--b);cursor:pointer;}
.ddi:last-child{border-bottom:none;}
.ddi:hover{background:var(--tl);color:var(--td);}
.ddi-n{font-family:'JetBrains Mono',monospace;font-size:.55rem;color:var(--t);font-weight:600;flex-shrink:0;}
.ddi-t{font-weight:500;}

/* BUTTONS */
.btn-p{background:var(--t);color:#fff;padding:.8rem 1.75rem;border:none;cursor:pointer;font-size:.78rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;transition:all .2s;font-family:'DM Sans',sans-serif;}
.btn-p:hover{background:var(--td);transform:translateY(-1px);}
.btn-g{background:transparent;color:var(--i);padding:.8rem 1.6rem;border:1.5px solid var(--b);cursor:pointer;font-size:.78rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;transition:all .2s;font-family:'DM Sans',sans-serif;}
.btn-g:hover{border-color:var(--i);}
.btn-w{background:#fff;color:var(--t);padding:.9rem 2.4rem;border:none;cursor:pointer;font-size:.85rem;font-weight:600;transition:all .2s;font-family:'DM Sans',sans-serif;}
.btn-w:hover{background:var(--i);color:#fff;}

/* HERO */
.hero{min-height:92vh;display:flex;flex-direction:column;justify-content:center;padding:120px 1.5rem 70px;max-width:1280px;margin:0 auto;}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--t);margin-bottom:1.4rem;display:flex;align-items:center;gap:.75rem;}
.eyebrow::before{content:'';width:28px;height:1px;background:var(--t);}
.h1{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(2.7rem,7vw,6.4rem);line-height:.94;letter-spacing:-.03em;color:var(--i);margin-bottom:1.5rem;}
.h1 em{font-style:italic;color:var(--t);}
.hsub{font-size:1.05rem;color:var(--i6);max-width:570px;line-height:1.7;margin-bottom:2.4rem;font-weight:300;}
.hctas{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;}
.htel{font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--i6);}

/* TICKER */
.ticker{border-top:1px solid var(--b);border-bottom:1px solid var(--b);overflow:hidden;background:var(--p);}
.ti{display:flex;width:max-content;}
.tit{white-space:nowrap;padding:.85rem 2.4rem;font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--i3);border-right:1px solid var(--b);display:flex;align-items:center;gap:.75rem;}
.dot{width:4px;height:4px;border-radius:50%;background:var(--t);flex-shrink:0;}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--b);max-width:1280px;margin:0 auto;}
.sc{padding:2.4rem 1.5rem;border-right:1px solid var(--b);position:relative;}
.sc:last-child{border-right:none;}
.sc-n{position:absolute;top:.9rem;right:1.1rem;font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.12em;color:var(--i3);opacity:.6;}
.sn{font-family:'Playfair Display',serif;font-weight:900;line-height:1;letter-spacing:-.03em;margin-bottom:.45rem;font-size:clamp(1.75rem,3vw,3rem);color:var(--i);}
.sn span{color:var(--t);}
.sl{font-size:.8rem;color:var(--i6);line-height:1.4;font-weight:500;}
.ss{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:var(--i3);margin-top:.25rem;}

/* SECTIONS */
.sec{max-width:1280px;margin:0 auto;padding:5rem 1.5rem;}
.sh{margin-bottom:3.2rem;display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem;}
.st{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(1.875rem,3.5vw,3rem);letter-spacing:-.025em;color:var(--i);line-height:1.05;}
.st em{font-style:italic;color:var(--t);}

/* B2B */
.tgrid{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--b);}
.tc{padding:2.2rem;border-right:1px solid var(--b);transition:background .3s;display:flex;flex-direction:column;}
.tc:last-child{border-right:none;}
.tc:hover{background:var(--i);}
.tc:hover .tc-t,.tc:hover .tc-cta{color:white;}
.tc:hover .tc-d{color:rgba(255,255,255,.55);}
.tc:hover .tc-n{color:rgba(204,251,241,.6);}
.tc:hover .tc-tag{color:rgba(255,255,255,.5);border-color:rgba(255,255,255,.2);}
.tc-n{font-family:'JetBrains Mono',monospace;font-size:.58rem;color:var(--t);margin-bottom:1.4rem;letter-spacing:.16em;font-weight:600;transition:color .3s;text-transform:uppercase;}
.tc-t{font-family:'Playfair Display',serif;font-weight:700;font-size:1.2rem;color:var(--i);margin-bottom:.85rem;line-height:1.2;transition:color .3s;}
.tc-d{font-size:.8rem;color:var(--i6);line-height:1.65;font-weight:300;margin-bottom:1.2rem;transition:color .3s;flex:1;}
.tc-tags{display:flex;flex-wrap:wrap;gap:.375rem;margin-bottom:1.2rem;}
.tc-tag{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:var(--i6);border:1px solid var(--b);padding:.2rem .5rem;transition:all .3s;}
.tc-cta{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:var(--t);background:none;border:none;cursor:pointer;text-align:left;padding:0;align-self:flex-start;transition:color .3s;}

/* SERVICE ROWS */
.srow{display:grid;grid-template-columns:80px 1fr 180px 36px;align-items:center;gap:1.5rem;padding:1.5rem 0;border-bottom:1px solid var(--b);cursor:pointer;transition:all .2s;}
.srow:hover .st2{color:var(--t);}
.srow:hover .sarr{transform:translateX(4px);color:var(--t);}
.snum{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:var(--t);letter-spacing:.1em;font-weight:600;}
.stag{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--i3);margin-bottom:.35rem;}
.st2{font-family:'Playfair Display',serif;font-weight:700;font-size:1.12rem;color:var(--i);margin-bottom:.35rem;transition:color .2s;}
.sd{font-size:.78rem;color:var(--i6);line-height:1.55;font-weight:300;max-width:560px;}
.snorm{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;color:var(--i3);text-align:right;line-height:1.6;}
.sarr{font-size:1.1rem;color:var(--i3);transition:all .2s;}

/* PROTOCOL DARK */
.proto{background:var(--i);padding:5rem 0;}
.proto-in{max-width:1280px;margin:0 auto;padding:0 1.5rem;}
.pgrid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.1);margin-top:3rem;}
.ps{padding:2.2rem 1.6rem 2.2rem 0;border-right:1px solid rgba(255,255,255,.1);}
.ps:last-child{border-right:none;padding-right:0;}
.psn{font-family:'JetBrains Mono',monospace;font-size:.58rem;color:rgba(204,251,241,.55);letter-spacing:.2em;margin-bottom:1.2rem;font-weight:600;}
.pst{font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;color:#fff;margin-bottom:.6rem;}
.psd{font-size:.78rem;color:rgba(255,255,255,.45);line-height:1.65;font-weight:300;}

/* CASES */
.cgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--b);}
.cc{background:#fff;padding:1.9rem;transition:background .2s;position:relative;}
.cc:hover{background:var(--p);}
.ctag{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--t);margin-bottom:.8rem;display:flex;align-items:center;gap:.5rem;font-weight:600;}
.ctag::before{content:'';width:12px;height:1px;background:var(--t);}
.cimp{font-family:'Playfair Display',serif;font-weight:900;font-size:2.2rem;color:var(--i);letter-spacing:-.03em;margin-bottom:.4rem;}
.ctit{font-size:.875rem;color:var(--i);font-weight:500;margin-bottom:.55rem;}
.cdesc{font-size:.75rem;color:var(--i6);line-height:1.6;font-weight:300;}
.cpills{display:flex;gap:.5rem;margin-top:1.1rem;flex-wrap:wrap;}
.cp{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.12em;text-transform:uppercase;color:var(--i6);border:1px solid var(--b);padding:.2rem .5rem;}

/* TESTIMONIALS */
.tgr{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
.tcard{background:#fff;border:1px solid var(--b);border-top:3px solid var(--t);padding:1.7rem;}
.tq{font-family:'Playfair Display',serif;font-style:italic;font-size:.95rem;color:var(--i);line-height:1.65;margin-bottom:1.2rem;}
.ta{font-size:.8rem;font-weight:600;color:var(--i);}
.tr{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.1em;color:var(--t);text-transform:uppercase;margin-top:.25rem;}

/* FAQ */
.faq-item{border-bottom:1px solid var(--b);}
.faq-btn{width:100%;display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1.2rem 0;background:none;border:none;cursor:pointer;text-align:left;}
.faq-q{font-size:.92rem;font-weight:500;color:var(--i);font-family:'DM Sans',sans-serif;}
.faq-ic{font-family:'JetBrains Mono',monospace;font-size:1rem;color:var(--t);transition:transform .2s;flex-shrink:0;}
.faq-a{font-size:.86rem;color:var(--i6);line-height:1.7;font-weight:300;padding-bottom:1.2rem;max-width:760px;}

/* CTA BAND */
.cta-band{background:var(--t);padding:4.4rem 1.5rem;text-align:center;}
.cta-h{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(1.7rem,3.5vw,2.9rem);color:#fff;letter-spacing:-.025em;margin-bottom:.85rem;line-height:1.1;}
.cta-h em{font-style:italic;}
.cta-s{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:1.9rem;}

/* FOOTER */
footer{background:var(--i);color:#fff;padding:3.4rem 1.5rem 2rem;}
.fi2{max-width:1280px;margin:0 auto;}
.fg{display:grid;grid-template-columns:1.8fr 1fr 1fr 1.2fr;gap:2.4rem;margin-bottom:2.4rem;padding-bottom:2.4rem;border-bottom:1px solid rgba(255,255,255,.08);}
.flogo{font-family:'Playfair Display',serif;font-weight:900;font-size:1.05rem;color:#fff;letter-spacing:-.02em;margin-bottom:.85rem;}
.flogo span{color:rgba(204,251,241,.6);}
.ftext{font-size:.78rem;color:rgba(255,255,255,.38);line-height:1.65;font-weight:300;max-width:250px;margin-bottom:1.2rem;}
.fcred{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.08em;color:rgba(255,255,255,.22);line-height:1.85;}
.fctit{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.22);margin-bottom:1rem;}
.flink{display:block;font-size:.78rem;color:rgba(255,255,255,.45);margin-bottom:.5rem;cursor:pointer;transition:color .2s;background:none;border:none;text-align:left;padding:0;font-family:'DM Sans',sans-serif;}
.flink:hover{color:#fff;}
.fnap{font-family:'JetBrains Mono',monospace;font-size:.68rem;color:rgba(255,255,255,.42);line-height:1.85;}
.fbot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;}
.fcp{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.1em;color:rgba(255,255,255,.22);}
.fsc{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(204,251,241,.32);}

/* PAGE HERO */
.ph{padding:125px 1.5rem 0;max-width:1280px;margin:0 auto;}
.bc{display:flex;align-items:center;gap:.6rem;font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:var(--i3);margin-bottom:1rem;}
.bc b{color:var(--t);font-weight:600;}
.bc span{cursor:pointer;}
.ph-h1{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(2.2rem,4.6vw,4.1rem);letter-spacing:-.03em;color:var(--i);line-height:.96;margin-bottom:1rem;}
.ph-h1 em{font-style:italic;color:var(--t);}
.ph-sub{font-size:.95rem;color:var(--i6);max-width:620px;line-height:1.7;font-weight:300;padding-bottom:2.8rem;}

/* ── CAPTACIÓN: chips + qual sticky (del Expediente) ── */
.nchips{display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:2rem;}
.nchip{font-family:'JetBrains Mono',monospace;font-size:.56rem;letter-spacing:.1em;text-transform:uppercase;background:var(--i);color:var(--p);padding:.35rem .7rem;font-weight:500;}
.sgrid{display:grid;grid-template-columns:1.55fr 1fr;gap:3rem;align-items:start;}
.qual{background:var(--p);border:1px solid var(--b);border-top:3px solid var(--t);padding:1.8rem;position:sticky;top:88px;}
.q-h{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:var(--i3);margin-bottom:.35rem;}
.q-v{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:1.7rem;color:var(--t);margin-bottom:1.2rem;}
.q-li{display:flex;gap:.75rem;align-items:flex-start;padding:.65rem 0;border-top:1px solid var(--b);font-size:.78rem;color:var(--i6);line-height:1.55;font-weight:300;}
.q-li b{font-family:'JetBrains Mono',monospace;color:var(--t);font-size:.66rem;font-weight:600;flex-shrink:0;padding-top:.1rem;}
.q-li .q-st{color:var(--i);font-weight:500;display:block;margin-bottom:.1rem;font-size:.8rem;}
.q-note{font-family:'JetBrains Mono',monospace;font-size:.55rem;color:var(--i3);text-align:center;margin-top:.8rem;letter-spacing:.12em;text-transform:uppercase;}
.body-h3{font-family:'Playfair Display',serif;font-weight:700;font-size:1.3rem;color:var(--i);margin:2.2rem 0 .85rem;padding-bottom:.5rem;border-bottom:2px solid var(--t);display:inline-block;}
.body-p{font-size:.9rem;color:var(--i6);line-height:1.8;margin-bottom:1rem;max-width:620px;font-weight:300;}
.body-p a{color:var(--t);font-weight:500;text-decoration:none;border-bottom:1.5px solid var(--tl);transition:border-color .15s;}
.body-p a:hover{border-bottom-color:var(--t);}
.body-p b{color:var(--i);font-weight:600;}

/* TYPEFORM */
.tfo{position:fixed;inset:0;z-index:100;background:rgba(15,25,35,.65);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:1.2rem;}
.tfm{background:#fff;width:100%;max-width:650px;min-height:490px;display:flex;flex-direction:column;box-shadow:0 24px 72px rgba(0,0,0,.22);position:relative;overflow:hidden;}
.tfp{height:3px;background:var(--tl);}
.tfpf{height:100%;background:var(--t);transition:width .5s cubic-bezier(.4,0,.2,1);}
.tfb{flex:1;padding:2.7rem 2.7rem 2.2rem;display:flex;flex-direction:column;justify-content:center;}
.tfl{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--t);margin-bottom:1.2rem;font-weight:600;}
.tfq{font-family:'Playfair Display',serif;font-weight:700;font-size:1.5rem;color:var(--i);line-height:1.2;margin-bottom:.55rem;white-space:pre-line;}
.tfh{font-size:.86rem;color:var(--i6);margin-bottom:1.7rem;font-weight:300;}
.tfopt{padding:.85rem 1rem;border:1.5px solid var(--b);cursor:pointer;font-size:.86rem;color:var(--i);font-weight:500;transition:all .15s;text-align:left;background:#fff;display:flex;align-items:center;gap:.85rem;font-family:'DM Sans',sans-serif;margin-bottom:.55rem;}
.tfopt:hover{border-color:var(--t);background:var(--tl);}
.tfopt.sel{border-color:var(--t);background:var(--tl);}
.tfk{font-family:'JetBrains Mono',monospace;font-size:.62rem;width:22px;height:22px;border:1px solid var(--b);display:flex;align-items:center;justify-content:center;color:var(--i3);flex-shrink:0;}
.tft{width:100%;border:none;border-bottom:2px solid var(--b);padding:.6rem 0;font-size:1rem;color:var(--i);outline:none;resize:none;height:108px;background:transparent;font-family:'DM Sans',sans-serif;transition:border-color .2s;}
.tft:focus{border-bottom-color:var(--t);}
.tfi{width:100%;border:none;border-bottom:2px solid var(--b);padding:.6rem 0;font-size:.95rem;color:var(--i);outline:none;background:transparent;font-family:'DM Sans',sans-serif;transition:border-color .2s;}
.tfi:focus{border-bottom-color:var(--t);}
.tfi::placeholder,.tft::placeholder{color:var(--i3);}
.tfa{display:flex;align-items:center;justify-content:space-between;margin-top:1.7rem;}
.tfback{background:none;border:none;color:var(--i6);font-size:.86rem;cursor:pointer;font-family:'DM Sans',sans-serif;}
.tfx{position:absolute;top:.85rem;right:.85rem;background:none;border:none;width:34px;height:34px;cursor:pointer;color:var(--i6);font-size:1.25rem;display:flex;align-items:center;justify-content:center;transition:color .2s;}
.tfx:hover{color:var(--i);}
.tfpriv{display:flex;align-items:flex-start;gap:.6rem;font-size:.78rem;color:var(--i6);margin-top:.85rem;cursor:pointer;font-weight:300;line-height:1.5;}
.tfpriv input{accent-color:var(--t);margin-top:2px;cursor:pointer;}
.tferr{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.05em;color:#DC2626;margin-top:.6rem;}

@media(max-width:1024px){
  .stats{grid-template-columns:repeat(2,1fr);}
  .tgrid{grid-template-columns:1fr;}
  .pgrid{grid-template-columns:repeat(2,1fr);}
  .fg{grid-template-columns:1fr 1fr;}
  .cgrid{grid-template-columns:repeat(2,1fr);}
  .sgrid{grid-template-columns:1fr;}
  .qual{position:static;}
  .srow{grid-template-columns:60px 1fr 36px;}
  .snorm{display:none;}
}
@media(max-width:768px){
  .h1{font-size:2.5rem;}
  .nlinks{display:none;}
  .stats{grid-template-columns:1fr 1fr;}
  .tgr,.cgrid,.pgrid,.fg{grid-template-columns:1fr;}
}
`;

/* ── DATA ──────────────────────────────────────────────── */
const SVCS = [{
  slug: "informe-de-parte",
  num: "EXP·01",
  tag: "Litigación civil",
  t: "Informe Pericial de Parte",
  norm: "LEC art. 335",
  desc: "Dictamen encargado por una de las partes para fundamentar su postura en negociación, mediación o demanda. Plena validez probatoria.",
  lsi: ["LEC art. 335", "Dictamen técnico", "Ratificación de parte", "Procedimiento civil", "Prueba pericial"],
  body: [["Su argumento técnico en una disputa", "En cualquier litigio, la parte que presenta los argumentos técnicos más sólidos tiene ventaja decisiva. Un <b>informe pericial de parte</b> es un dictamen encargado por usted para investigar la realidad técnica de los hechos y defender su postura con objetividad y rigor."], ["Cuándo es esencial", "<b>Antes de una demanda</b> — para evaluar la solidez técnica de la reclamación. <b>Durante una negociación</b> — un informe contundente fuerza acuerdos favorables sin juicio. <b>Como prueba</b> conforme a la LEC. <b>Para refutar</b> el dictamen de la parte contraria mediante un contrainforme."]],
  faqs: [["¿Tiene validez en un juicio?", "Sí. Es un medio de prueba reconocido por la LEC (arts. 335 y ss.) y puede defenderse como prueba pericial ante el juez."], ["¿Diferencia con el dictamen judicial?", "El de parte lo encarga usted o su letrado; el judicial lo designa el juzgado. La metodología es idéntica."]]
}, {
  slug: "perito-judicial",
  num: "EXP·02",
  tag: "Designación judicial",
  t: "Actuación como Perito Judicial",
  norm: "LEC art. 347",
  desc: "Por designación del juzgado o de parte. Imparcialidad acreditada y defensa oral solvente ante interrogatorio cruzado.",
  lsi: ["Designación judicial", "Lista de peritos", "LEC art. 347", "Tacha de peritos", "Ratificación en sala"],
  body: [["Actuación en sede judicial", "La figura del perito judicial exige tres condiciones: conocimiento técnico acreditado, inscripción en la lista oficial del Ministerio de Justicia y capacidad de defender el dictamen verbalmente ante el juez y los letrados de ambas partes."], ["Ratificación e interrogatorio cruzado", "La ratificación oral es parte integrante del servicio. La solidez de esa defensa es determinante para el peso que el juez otorga al dictamen. <b>Honorarios de ratificación incluidos sin sobrecoste.</b>"]],
  faqs: [["¿Cómo se designa al perito judicial?", "Por sorteo entre los inscritos en la lista oficial del Ministerio de Justicia, o por acuerdo de las partes (LEC art. 339)."], ["¿Puede impugnarse el dictamen?", "Las partes pueden tachar al perito o impugnar el dictamen (LEC art. 343). La solvencia del informe es la mejor defensa."]]
}, {
  slug: "patologias-estructurales",
  num: "EXP·03",
  tag: "Diagnóstico estructural",
  t: "Patologías Estructurales",
  norm: "CTE DB-SE · EHE-08",
  desc: "Grietas activas, fisuras en forjados, asientos diferenciales y deformaciones críticas. Modelado FEM y ensayos in situ.",
  lsi: ["CTE DB-SE", "EHE-08", "Grietas activas", "Asiento diferencial", "Cálculo estructural", "Modelado FEM"],
  body: [["Diagnóstico de patologías estructurales", "Una patología estructural es cualquier alteración de los elementos portantes que afecte a la capacidad resistente o a la estabilidad. El diagnóstico correcto es el punto de partida de cualquier intervención técnica o reclamación jurídica."], ["Metodología", "Inspección visual y cartografía de fisuras · testigos de yeso y ensayos no destructivos · modelado estructural conforme al Eurocódigo 2 y CTE DB-SE · diagnóstico con origen, gravedad y cuantificación. El dictamen diferencia responsabilidades: proyecto, dirección de obra o ejecución (LOE art. 17)."]],
  faqs: [["¿Todas las grietas son estructurales?", "No. Pueden ser térmicas, de retracción, de asiento o de fatiga. La determinación del origen requiere análisis de geometría, apertura, disposición y evolución."], ["¿Cuándo es urgente actuar?", "Cuando la grieta es activa, afecta a elementos portantes, supera 1 mm con disposición diagonal o hay deformación perceptible."]]
}, {
  slug: "humedades-filtraciones",
  num: "EXP·04",
  tag: "Patología hídrica",
  t: "Humedades y Filtraciones",
  norm: "CTE DB-HS",
  desc: "Detección no destructiva del origen mediante termografía infrarroja y pruebas de estanqueidad. Dictamen para reclamar a constructora, comunidad o aseguradora.",
  lsi: ["Termografía infrarroja", "CTE DB-HS", "Capilaridad ascendente", "Condensación", "Prueba de estanqueidad", "Perito humedades Barcelona"],
  body: [["El síntoma no es el origen", "La mancha visible rara vez indica el origen exacto del agua. El diagnóstico con metodología no destructiva — termografía infrarroja, higrómetros de profundidad, pruebas de estanqueidad — localiza el origen sin abrir obra. <b>Si ha pagado reparaciones que no han funcionado</b>, lo más probable es que se haya tratado el síntoma sin haber identificado la causa."], ["Tipos de humedad", "Capilaridad ascendente desde el terreno · filtración por cubierta o terraza (CTE DB-HS 1) · filtración por fachada o carpinterías · condensación superficial o intersticial · daños por instalaciones. El dictamen establece el origen, cuantifica los daños y delimita responsabilidades: constructora, comunidad de propietarios o cobertura de la póliza."], ["Reparación tras el dictamen", "Una vez el dictamen delimita el origen y las responsabilidades, la ejecución de la reparación corresponde a empresas especializadas. Para esa fase puede solicitar presupuesto con diagnóstico técnico previo a la red de especialistas en <a href='https://humedades.barcelona' target='_blank' rel='noopener'>tratamiento de humedades en Barcelona</a>, que ejecutan la solución definitiva — no el parche — conforme al origen identificado en el dictamen."]],
  faqs: [["¿La termografía basta para localizar el origen?", "Es la herramienta de detección no destructiva principal, complementada con higrómetros de profundidad y análisis del detalle constructivo."], ["¿Sirve para reclamar al seguro?", "Sí. El dictamen delimita si el origen corresponde a la constructora, a la comunidad o está cubierto por la póliza."], ["¿Quién repara la humedad después del informe?", "El dictamen identifica el origen y al responsable. La reparación la ejecuta una empresa especializada en tratamiento de humedades; podemos orientarle hacia especialistas verificados."]]
}, {
  slug: "vicios-ocultos",
  num: "EXP·05",
  tag: "Compraventa inmobiliaria",
  t: "Vicios Ocultos",
  norm: "CC art. 1484",
  desc: "Defectos graves no aparentes en la compraventa. Acreditación de preexistencia dentro del plazo de saneamiento de 6 meses.",
  lsi: ["Código Civil art. 1484", "Defectos no aparentes", "Plazo de saneamiento", "Preexistencia", "Acción redhibitoria", "Vicios ocultos vivienda Barcelona"],
  body: [["Qué son los vicios ocultos", "Defectos graves no aparentes en la compraventa que impiden el uso adecuado del bien. Regulados en el CC arts. 1484 y ss.: derecho a rescindir (acción redhibitoria) o reducir el precio (acción estimatoria). Deben ser graves, anteriores a la venta y desconocidos por el comprador."], ["El plazo de 6 meses", "El CC art. 1490 establece 6 meses desde la entrega para ejercitar las acciones. El informe pericial debe obtenerse dentro de ese plazo para acreditar técnicamente existencia, gravedad y preexistencia del defecto. <b>Si acaba de detectar el problema, el tiempo corre en su contra: contacte cuanto antes.</b>"], ["Humedades ocultas: el vicio más frecuente", "Las humedades disimuladas bajo revestimientos recién pintados antes de la venta son el vicio oculto más habitual en Barcelona. El dictamen acredita la preexistencia mediante el análisis del grado de avance de la patología. Tras la reclamación, si necesita ejecutar la reparación, puede solicitar presupuesto a especialistas en <a href='https://humedades.barcelona' target='_blank' rel='noopener'>diagnóstico y tratamiento de humedades en Barcelona</a> con la garantía de actuar sobre el origen identificado en el informe."]],
  faqs: [["¿Qué plazo tengo para reclamar?", "6 meses desde la entrega del inmueble (CC art. 1490). Es imprescindible actuar dentro de ese plazo."], ["¿Qué defectos cuentan como vicios ocultos?", "Los que hacen el inmueble impropio para su uso o lo disminuyen de tal modo que, de haberlos conocido, el comprador no habría comprado o habría pagado menos."], ["¿Cómo se demuestra que el defecto es anterior a la compra?", "Mediante el análisis técnico del grado de desarrollo de la patología: la antigüedad de una humedad, la evolución de una fisura o el estado de una instalación permiten acreditar técnicamente la preexistencia."]]
}, {
  slug: "reclamacion-mala-ejecucion",
  num: "EXP·06",
  tag: "Incumplimiento contractual",
  t: "Mala Ejecución de Obra",
  norm: "LOE art. 17",
  desc: "Contraste objetivo de la obra frente a contrato, memoria de calidades y lex artis. Cuantificación de incumplimientos.",
  lsi: ["LOE art. 17", "Memoria de calidades", "Lex artis", "Partidas no ejecutadas", "Subsanación"],
  body: [["Cuando el resultado no es el pactado", "Acabados deficientes, materiales inferiores a los acordados, partidas cobradas y no ejecutadas. El peritaje contrasta lo ejecutado con el contrato, el presupuesto, la memoria de calidades y la buena práctica constructiva (<b>lex artis</b>)."], ["El proceso de reclamación", "<b>1 · Reclamación amistosa:</b> un dictamen profesional suele bastar para que la constructora subsane. <b>2 · Mediación</b> con base técnica. <b>3 · Vía judicial:</b> el informe es la prueba pericial clave. Ratificación incluida."]],
  faqs: [["¿Qué plazos establece la LOE?", "1 año para defectos de acabado, 3 años para habitabilidad, 10 años para defectos estructurales, desde la recepción de la obra (LOE art. 17)."], ["¿Necesito informe para reclamar?", "No es obligatorio en fase extrajudicial, pero es la herramienta más efectiva para que la empresa acepte subsanar sin juicio."]]
}, {
  slug: "contrainforme-pericial",
  num: "EXP·07",
  tag: "Análisis crítico",
  t: "Contrainforme Pericial",
  norm: "LEC art. 348",
  desc: "Detección de carencias metodológicas y refutación técnica de dictámenes presentados por la parte contraria.",
  lsi: ["Refutación técnica", "Carencias metodológicas", "Pericial contraria", "Sana crítica", "Juicio oral"],
  body: [["Desmontar el argumento contrario", "El contrainforme no elabora un nuevo dictamen sobre la patología: demuestra que las conclusiones del dictamen contrario son <b>incorrectas, incompletas o metodológicamente deficientes</b>."], ["Qué se analiza", "Rigor metodológico de la inspección · corrección de las referencias normativas (CTE, EHE-08, LOE) · coherencia entre datos y conclusiones · corrección de la cuantificación económica. Un juez que no puede fiarse del perito contrario da mayor crédito al dictamen que sí demuestra solidez."]],
  faqs: [["¿Puede el juez rechazar un informe pericial?", "Valora libremente su fuerza probatoria conforme a la sana crítica (LEC art. 348). Un contrainforme sólido merma el peso del dictamen contrario."], ["¿Cuánto se tarda?", "Entre 10 y 20 días hábiles desde la recepción del informe a refutar. Acelerable con plazo procesal próximo."]]
}, {
  slug: "naves-industriales",
  num: "EXP·08",
  tag: "Industrial · B2B",
  t: "Naves Industriales",
  norm: "RSCIEI · TR-34",
  desc: "Pavimentos logísticos, estructuras metálicas, daños post-alquiler y cumplimiento RSCIEI. Para aseguradoras y operadores.",
  lsi: ["RSCIEI", "Pavimentos logísticos", "Daños post-alquiler", "Estructura metálica", "TR-34", "Siniestro industrial"],
  body: [["Peritaje especializado industrial", "Las naves logísticas tienen normativa propia. Principales disputas: <b>daños post-alquiler, siniestros de incendio, fallos en pavimentos y cumplimiento RSCIEI</b>."], ["Pavimentos logísticos e incendios", "Fisuras por retracción o asiento de solera · planitud insuficiente para equipos VNA · juntas mal ejecutadas. Tolerancias conforme a la norma TR-34. En incendios: causa y origen, daño a estructura metálica y verificación del cumplimiento RSCIEI en el momento del siniestro."]],
  faqs: [["¿Qué es el RSCIEI?", "El Reglamento de Seguridad Contra Incendios en Establecimientos Industriales (RD 2267/2004). Su incumplimiento es causa frecuente de conflicto en arrendamientos y siniestros."], ["¿Qué es un dictamen post-alquiler?", "Determina qué daños son uso normal (arrendador) y cuáles imputables al arrendatario por uso indebido o modificaciones no autorizadas."]]
}];
const CASOS = [{
  tag: "Siniestro de incendio",
  imp: "1,2 M€",
  t: "Incendio estructural en nave logística",
  d: "Causa, origen y extensión en 8.000 m². Cuantificación para aseguradora nacional. Ratificado en juzgado.",
  pills: ["Aseguradora", "90 días", "Ratificado"]
}, {
  tag: "Obra civil",
  imp: "2,8 M€",
  t: "Asiento diferencial en puente de vía rápida",
  d: "Patologías en hormigón pretensado. Contencioso-administrativo contra constructora.",
  pills: ["AAPP", "Litigio C-A", "Barcelona"]
}, {
  tag: "Vicios ocultos",
  imp: "680 K€",
  t: "Patologías de envolvente en 120 viviendas",
  d: "Fachada ventilada, cubierta y carpinterías. Comunidad contra promotora. Resolución favorable.",
  pills: ["Comunidad", "2024", "Barcelona"]
}, {
  tag: "Humedades",
  imp: "340 K€",
  t: "Filtración por cubierta en plurifamiliar",
  d: "Termografía. CTE DB-HS. Reparación íntegra a cargo de la constructora.",
  pills: ["Extrajudicial", "Granollers"]
}, {
  tag: "Mala ejecución",
  imp: "430 K€",
  t: "Incumplimientos en reforma de local",
  d: "Partidas no ejecutadas y materiales inferiores a memoria de calidades.",
  pills: ["Despacho", "Mediación", "BCN"]
}, {
  tag: "Contrainforme",
  imp: "920 K€",
  t: "Refutación en colapso de forjado",
  d: "Carencias metodológicas en el informe de la aseguradora. Ratificación en juicio oral.",
  pills: ["Juicio oral", "Valencia"]
}];
const TESTI = [{
  q: "Su dictamen fue la base de toda nuestra estrategia de negociación. Tan claro y contundente que logramos acuerdo sin ir a juicio.",
  a: "Socio de Área",
  r: "Despacho de construcción · Madrid"
}, {
  q: "Valoro la disponibilidad para ratificar en sala sin demoras y el rigor metodológico del informe.",
  a: "Directora de Siniestros",
  r: "Aseguradora multinacional · Barcelona"
}, {
  q: "El informe de due diligence identificó contingencias que no habíamos previsto. Se amortizó muchas veces.",
  a: "Director de Inversiones",
  r: "Family Office · Barcelona"
}];
const FAQS_HOME = [["¿En qué territorios operan?", "Sede en Barcelona con operativa en toda España. Desplazamiento a cualquier punto en 24–48h."], ["¿Importe mínimo de encargo?", "No existe mínimo, pero el encargo es óptimo a partir de 50.000 € en disputa."], ["¿La ratificación en sala está incluida?", "Sí. Ratificación e interrogatorio cruzado incluidos en honorarios sin sobrecoste."], ["¿Plazo de entrega del dictamen?", "Entre 20 y 45 días hábiles desde la inspección. Plazo por escrito, garantizado contractualmente."], ["¿Perito de parte y perito judicial?", "Ambos, nunca en el mismo caso."]];
const PROTO = [{
  n: "FASE 01",
  t: "Briefing técnico",
  d: "Reunión de instrucción con letrado o director de siniestros. Análisis previo de viabilidad sin coste."
}, {
  n: "FASE 02",
  t: "Propuesta cerrada",
  d: "Alcance definido, honorarios fijos y fecha de entrega comprometida por escrito. Sin variables."
}, {
  n: "FASE 03",
  t: "Instrucción y dictamen",
  d: "Inspección, análisis, redacción y revisión interna. Formato técnico-jurídico listo para aportación."
}, {
  n: "FASE 04",
  t: "Ratificación incluida",
  d: "Ratificación en sala e interrogatorio cruzado incluidos en honorarios. Sin sobrecoste."
}];
const TF = [{
  k: "tipo",
  l: "01 / 05",
  q: "¿Qué tipo de asunto\ndesea consultar?",
  h: "Seleccione la categoría de su caso",
  type: "sel",
  o: ["Informe pericial de parte", "Actuación como perito judicial", "Patologías o daños estructurales", "Humedades y filtraciones", "Vicios ocultos en compraventa", "Mala ejecución de obra", "Contrainforme pericial", "Nave industrial o logística", "Obra pública", "Otro"]
}, {
  k: "desc",
  l: "02 / 05",
  q: "Describa brevemente\nel caso.",
  h: "Tipo de inmueble, patología, fase del procedimiento",
  type: "txt",
  ph: "Ej: edificio residencial con fisuras en forjado, fase previa a demanda…"
}, {
  k: "imp",
  l: "03 / 05",
  q: "¿Importe estimado\nen disputa?",
  h: "Orientativo — para asignar el equipo adecuado",
  type: "sel",
  o: ["Menos de 50.000 €", "50.000 – 200.000 €", "200.000 – 1.000.000 €", "Más de 1.000.000 €", "No determinado"]
}, {
  k: "legal",
  l: "04 / 05",
  q: "¿Existe representación\nlegal o procedimiento?",
  h: "",
  type: "sel",
  o: ["Sí, hay letrado / despacho", "Sí, procedimiento judicial abierto", "No aún — fase previa", "No aplicable"]
}, {
  k: "con",
  l: "05 / 05",
  q: "¿Con quién contactamos?",
  h: "Respuesta en menos de 24 horas laborables",
  type: "con"
}];
const TICK = ["Informe de Parte", "Perito Judicial", "Patologías Estructurales", "Humedades", "Vicios Ocultos", "Mala Ejecución", "Contrainforme", "Naves Industriales", "CTE DB-SE", "CTE DB-HS", "LOE art. 17", "LEC art. 347", "RSCIEI", "ECCAT nº 16448", "Toda España"];

/* ── TYPEFORM ─────────────────────────────────── */
function Typeform({
  onClose
}) {
  const [s, setS] = useState(0),
    [a, setA] = useState({}),
    [c, setC] = useState({
      n: "",
      e: "",
      em: "",
      t: "",
      p: false
    });
  const [err, setErr] = useState(""),
    [done, setDone] = useState(false),
    [ld, setLd] = useState(false);
  const st = TF[s],
    pct = Math.round(s / TF.length * 100);
  const pick = o => {
    setA({
      ...a,
      [st.k]: o
    });
    setErr("");
    setTimeout(() => setS(x => x + 1), 300);
  };
  const next = () => {
    if (st.type === "txt" && !a[st.k]?.trim()) {
      setErr("Describa el caso brevemente.");
      return;
    }
    if (st.type === "con") {
      if (!c.n.trim() || !c.em.trim()) {
        setErr("Nombre e email obligatorios.");
        return;
      }
      if (!c.p) {
        setErr("Acepte la política de privacidad.");
        return;
      }
      setLd(true);
      setTimeout(() => {
        setLd(false);
        setDone(true);
      }, 1100);
      return;
    }
    setErr("");
    setS(x => x + 1);
  };
  if (done) return /*#__PURE__*/React.createElement("div", {
    className: "tfo",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "tfm au",
    onClick: e => e.stopPropagation(),
    style: {
      minHeight: 340
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "3.4rem 2.7rem",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "2.6rem",
      marginBottom: "1.1rem"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    className: "fd",
    style: {
      fontSize: "1.625rem",
      fontWeight: 700,
      marginBottom: ".6rem"
    }
  }, "Consulta recibida."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: ".875rem",
      color: "var(--i6)",
      lineHeight: 1.7,
      fontWeight: 300,
      marginBottom: "1.8rem"
    }
  }, "Respuesta en menos de 24 horas laborables.", /*#__PURE__*/React.createElement("br", null), "Urgencias: ", /*#__PURE__*/React.createElement("b", {
    className: "fm",
    style: {
      color: "var(--t)"
    }
  }, "+34 614 194 985")), /*#__PURE__*/React.createElement("button", {
    className: "btn-p",
    onClick: onClose
  }, "Cerrar"))));
  return /*#__PURE__*/React.createElement("div", {
    className: "tfo",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "tfm au",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "tfp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tfpf",
    style: {
      width: pct + "%"
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "tfx",
    onClick: onClose
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "tfb"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tfl"
  }, "Consulta \xB7 ", st.l), /*#__PURE__*/React.createElement("div", {
    className: "tfq"
  }, st.q), st.h && /*#__PURE__*/React.createElement("div", {
    className: "tfh"
  }, st.h), st.type === "sel" && st.o.map((o, i) => /*#__PURE__*/React.createElement("button", {
    key: o,
    className: "tfopt" + (a[st.k] === o ? " sel" : ""),
    onClick: () => pick(o)
  }, /*#__PURE__*/React.createElement("span", {
    className: "tfk"
  }, String.fromCharCode(65 + i)), o)), st.type === "txt" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", {
    className: "tft",
    placeholder: st.ph,
    value: a[st.k] || "",
    onChange: e => {
      setA({
        ...a,
        [st.k]: e.target.value
      });
      setErr("");
    },
    autoFocus: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "tfa"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tfback",
    onClick: () => setS(x => x - 1)
  }, "\u2190 Anterior"), /*#__PURE__*/React.createElement("button", {
    className: "btn-p",
    onClick: next
  }, "Continuar \u2192"))), st.type === "con" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: ".9rem 1.5rem"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "tfi",
    placeholder: "Nombre y apellidos",
    value: c.n,
    onChange: e => setC({
      ...c,
      n: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    className: "tfi",
    placeholder: "Empresa / Despacho",
    value: c.e,
    onChange: e => setC({
      ...c,
      e: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    className: "tfi",
    type: "email",
    placeholder: "Email profesional",
    value: c.em,
    onChange: e => setC({
      ...c,
      em: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    className: "tfi",
    type: "tel",
    placeholder: "Tel\xE9fono (opcional)",
    value: c.t,
    onChange: e => setC({
      ...c,
      t: e.target.value
    })
  })), /*#__PURE__*/React.createElement("label", {
    className: "tfpriv"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: c.p,
    onChange: e => setC({
      ...c,
      p: e.target.checked
    })
  }), /*#__PURE__*/React.createElement("span", null, "He le\xEDdo y acepto la ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--t)"
    }
  }, "Pol\xEDtica de Privacidad"), ". Datos tratados exclusivamente para esta consulta.")), /*#__PURE__*/React.createElement("div", {
    className: "tfa"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tfback",
    onClick: () => setS(x => x - 1)
  }, "\u2190 Anterior"), /*#__PURE__*/React.createElement("button", {
    className: "btn-p",
    onClick: next,
    disabled: ld
  }, ld ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "spin",
    style: {
      width: 13,
      height: 13,
      border: "2px solid rgba(255,255,255,.4)",
      borderTopColor: "#fff",
      borderRadius: "50%",
      display: "inline-block",
      marginRight: ".5rem"
    }
  }), "Enviando\u2026") : "Enviar consulta →"))), err && /*#__PURE__*/React.createElement("div", {
    className: "tferr"
  }, "\u26A0 ", err))));
}

/* ── SHARED ────────────────────────────────────── */
const Ticker = () => /*#__PURE__*/React.createElement("div", {
  className: "ticker",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("div", {
  className: "ti tick"
}, [...TICK, ...TICK].map((t, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  className: "tit"
}, /*#__PURE__*/React.createElement("span", {
  className: "dot"
}), t))));
const Band = ({
  h,
  em,
  s,
  btn,
  open
}) => /*#__PURE__*/React.createElement("div", {
  className: "cta-band"
}, /*#__PURE__*/React.createElement("h2", {
  className: "cta-h"
}, h, em && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, em))), s && /*#__PURE__*/React.createElement("div", {
  className: "cta-s"
}, s), /*#__PURE__*/React.createElement("button", {
  className: "btn-w",
  onClick: open
}, btn || "Consultar caso"));
const FaqBlock = ({
  items
}) => {
  const [o, setO] = useState(null);
  return /*#__PURE__*/React.createElement("div", null, items.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "faq-item"
  }, /*#__PURE__*/React.createElement("button", {
    className: "faq-btn",
    onClick: () => setO(o === i ? null : i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "faq-q"
  }, f[0]), /*#__PURE__*/React.createElement("span", {
    className: "faq-ic",
    style: {
      transform: o === i ? "rotate(45deg)" : ""
    }
  }, o === i ? "×" : "+")), o === i && /*#__PURE__*/React.createElement("div", {
    className: "faq-a au"
  }, f[1]))));
};
/* Caja de cualificación sticky — mecanismo del Expediente en piel v5 */
const Qual = ({
  label,
  open,
  cta,
  note,
  items
}) => /*#__PURE__*/React.createElement("div", {
  className: "qual"
}, /*#__PURE__*/React.createElement("div", {
  className: "q-h"
}, label || "CUALIFICACIÓN DEL CASO"), /*#__PURE__*/React.createElement("div", {
  className: "q-v"
}, "Consulta sin coste"), (items || PROTO.map((p, i) => [String(i + 1).padStart(2, "0"), p.t, p.d])).map(([n, t, d], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  className: "q-li"
}, /*#__PURE__*/React.createElement("b", null, n), /*#__PURE__*/React.createElement("span", null, t && d ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
  className: "q-st"
}, t), d) : t))), /*#__PURE__*/React.createElement("button", {
  className: "btn-p",
  style: {
    width: "100%",
    marginTop: "1.3rem"
  },
  onClick: open
}, cta || "Consultar caso →"), /*#__PURE__*/React.createElement("div", {
  className: "q-note"
}, note || "Ratificación incluida · Toda España"));

/* ── NAV / FOOTER ─────────────────────────────── */
function Nav({
  page,
  go,
  open
}) {
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: "ni"
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo",
    onClick: () => go("home")
  }, "Perito", /*#__PURE__*/React.createElement("span", null, ".Barcelona")), /*#__PURE__*/React.createElement("div", {
    className: "nlinks"
  }, /*#__PURE__*/React.createElement("button", {
    className: "nl" + (page === "construccion" ? " on" : ""),
    onClick: () => go("construccion")
  }, "Perito Construcci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "dd"
  }, /*#__PURE__*/React.createElement("button", {
    className: "nl" + (page.startsWith("svc") || page === "informes" ? " on" : ""),
    onClick: () => go("informes")
  }, "Dict\xE1menes T\xE9cnicos \u25BE"), /*#__PURE__*/React.createElement("div", {
    className: "ddm"
  }, SVCS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.slug,
    className: "ddi",
    onClick: () => go("svc-" + s.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ddi-n"
  }, s.num), /*#__PURE__*/React.createElement("span", {
    className: "ddi-t"
  }, s.t))))), /*#__PURE__*/React.createElement("button", {
    className: "nl" + (page === "casos" ? " on" : ""),
    onClick: () => go("casos")
  }, "Casos"), /*#__PURE__*/React.createElement("button", {
    className: "nl" + (page === "abogados" ? " on" : ""),
    onClick: () => go("abogados")
  }, "Abogados\xB7Seguros"), /*#__PURE__*/React.createElement("button", {
    className: "nl" + (page === "honorarios" ? " on" : ""),
    onClick: () => go("honorarios")
  }, "Honorarios"), /*#__PURE__*/React.createElement("button", {
    className: "nl" + (page === "despacho" ? " on" : ""),
    onClick: () => go("despacho")
  }, "Despacho"), /*#__PURE__*/React.createElement("button", {
    className: "btn-p",
    style: {
      fontSize: ".72rem",
      padding: ".6rem 1.2rem"
    },
    onClick: open
  }, "Consultar caso"))));
}
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "fi2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flogo"
  }, "Perito", /*#__PURE__*/React.createElement("span", null, ".Barcelona")), /*#__PURE__*/React.createElement("div", {
    className: "ftext"
  }, "Ingenier\xEDa forense en dict\xE1menes periciales para litigios de alta cuant\xEDa en edificaci\xF3n y obra civil. Toda Espa\xF1a."), /*#__PURE__*/React.createElement("div", {
    className: "fcred"
  }, "Albert Vilardell Serra \xB7 Ingeniero Civil", /*#__PURE__*/React.createElement("br", null), "ECCAT n\xBA 16448 \xB7 Perito Judicial (MJusticia)", /*#__PURE__*/React.createElement("br", null), "Perito de Seguros IRD \xB7 INESE")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fctit"
  }, "Dict\xE1menes"), SVCS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.slug,
    className: "flink",
    onClick: () => go("svc-" + s.slug)
  }, s.t))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fctit"
  }, "Despacho"), [["Perito Construcción", "construccion"], ["Casos de Referencia", "casos"], ["Abogados y Seguros", "abogados"], ["Honorarios", "honorarios"], ["El Despacho", "despacho"], ["Contacto", "contacto"]].map(([l, p]) => /*#__PURE__*/React.createElement("button", {
    key: p,
    className: "flink",
    onClick: () => go(p)
  }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fctit"
  }, "Sedes"), /*#__PURE__*/React.createElement("div", {
    className: "fnap"
  }, "Carrer de Num\xE0ncia, 95, Local 5", /*#__PURE__*/React.createElement("br", null), "08029 Barcelona", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Carrer Navarra, 14", /*#__PURE__*/React.createElement("br", null), "08401 Granollers", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "+34 614 194 985", /*#__PURE__*/React.createElement("br", null), "info@perito.barcelona"))), /*#__PURE__*/React.createElement("div", {
    className: "fbot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fcp"
  }, "\xA9 2026 perito.barcelona \xB7 Aviso legal \xB7 Privacidad \xB7 Cookies"), /*#__PURE__*/React.createElement("span", {
    className: "fsc"
  }, "Ingenier\xEDa Forense \xB7 Toda Espa\xF1a"))));
}

/* ── HOME ─────────────────────────────────────── */
function Home({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Ingenier\xEDa Forense \u2014 Toda Espa\xF1a"), /*#__PURE__*/React.createElement("h1", {
    className: "h1"
  }, "Peritaje para quien", /*#__PURE__*/React.createElement("br", null), "no puede permitirse", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "un mal informe.")), /*#__PURE__*/React.createElement("p", {
    className: "hsub"
  }, "Dict\xE1menes periciales en edificaci\xF3n y obra civil. Para aseguradoras, despachos de abogados y administraciones que necesitan un informe que se sostenga en sala."), /*#__PURE__*/React.createElement("div", {
    className: "hctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-p",
    onClick: open
  }, "Consultar caso"), /*#__PURE__*/React.createElement("button", {
    className: "btn-g",
    onClick: () => go("casos")
  }, "Casos de referencia"), /*#__PURE__*/React.createElement("span", {
    className: "htel"
  }, "+34 614 194 985"))), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement("div", {
    className: "stats"
  }, [["DAT·01", ">120", "M€", "Importe total peritado", "Acumulado en dictámenes"], ["DAT·02", "+400", "", "Dictámenes emitidos", "Edificación y obra civil"], ["DAT·03", "97", "%", "Ratificados en sede judicial", "Sin impugnación de fondo"], ["DAT·04", "24", "–48h", "Desplazamiento nacional", "Sede Barcelona · toda España"]].map(([n, v, u, l, s]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: "sc"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sc-n"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "sn"
  }, v, /*#__PURE__*/React.createElement("span", null, u)), /*#__PURE__*/React.createElement("div", {
    className: "sl"
  }, l), /*#__PURE__*/React.createElement("div", {
    className: "ss"
  }, s)))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Clientes de referencia"), /*#__PURE__*/React.createElement("h2", {
    className: "st"
  }, "Trabajamos con profesionales", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "que no admiten margen de error")))), /*#__PURE__*/React.createElement("div", {
    className: "tgrid"
  }, [["Dossier A — Sector jurídico", "Despachos de Abogados Especializados", "Perito de parte o consultor técnico en procedimientos y arbitrajes. Honorarios fijos, plazos garantizados, ratificación conforme a la LEC art. 347.", ["Dº Construcción", "Resp. Civil", "LEC art. 347"], "abogados"], ["Dossier B — Sector asegurador", "Aseguradoras y Reaseguradoras", "Valoración independiente de siniestros complejos: causa, alcance y cuantificación. Contrapericia. Colaboración en siniestros concurrentes.", ["Grandes Riesgos", "Multirriesgo", "IRD"], "abogados"], ["Dossier C — Promotor · AAPP", "Promotoras, Constructoras y AAPP", "Auditoría pre-litigio, due diligence en compraventa de activos y dictámenes para contencioso-administrativo. Interlocución técnica directa.", ["Due Diligence", "C-A", "LCSP"], null]].map(([n, t, d, tags, dest], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "tc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tc-n"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "tc-t"
  }, t), /*#__PURE__*/React.createElement("div", {
    className: "tc-d"
  }, d), /*#__PURE__*/React.createElement("div", {
    className: "tc-tags"
  }, tags.map(x => /*#__PURE__*/React.createElement("span", {
    key: x,
    className: "tc-tag"
  }, x))), /*#__PURE__*/React.createElement("button", {
    className: "tc-cta",
    onClick: () => dest ? go(dest) : open()
  }, dest ? "Ver protocolo B2B →" : "Consultar caso →"))))), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "\xCDndice de dict\xE1menes"), /*#__PURE__*/React.createElement("h2", {
    className: "st"
  }, "Dict\xE1menes t\xE9cnicos", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "de alta especializaci\xF3n"))), /*#__PURE__*/React.createElement("button", {
    className: "btn-g",
    onClick: () => go("informes")
  }, "Ver cat\xE1logo \u2192")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "srow",
    onClick: () => go("construccion")
  }, /*#__PURE__*/React.createElement("span", {
    className: "snum"
  }, "SILO\xB71"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stag"
  }, "Intenci\xF3n \xB7 Persona"), /*#__PURE__*/React.createElement("div", {
    className: "st2"
  }, "Perito de Construcci\xF3n en Barcelona"), /*#__PURE__*/React.createElement("div", {
    className: "sd"
  }, "Vicios ocultos, mala ejecuci\xF3n, patolog\xEDas y humedades. Para particulares, comunidades y empresas.")), /*#__PURE__*/React.createElement("span", {
    className: "snorm"
  }, "CTE \xB7 LOE \xB7 CC 1484"), /*#__PURE__*/React.createElement("span", {
    className: "sarr"
  }, "\u2192")), SVCS.slice(0, 6).map(s => /*#__PURE__*/React.createElement("div", {
    key: s.slug,
    className: "srow",
    onClick: () => go("svc-" + s.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: "snum"
  }, s.num), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stag"
  }, s.tag), /*#__PURE__*/React.createElement("div", {
    className: "st2"
  }, s.t), /*#__PURE__*/React.createElement("div", {
    className: "sd"
  }, s.desc)), /*#__PURE__*/React.createElement("span", {
    className: "snorm"
  }, s.norm), /*#__PURE__*/React.createElement("span", {
    className: "sarr"
  }, "\u2192"))))), /*#__PURE__*/React.createElement("div", {
    className: "proto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proto-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: "rgba(204,251,241,.6)"
    }
  }, "Protocolo de encargo"), /*#__PURE__*/React.createElement("h2", {
    className: "st",
    style: {
      color: "#fff"
    }
  }, "C\xF3mo trabajamos"), /*#__PURE__*/React.createElement("div", {
    className: "pgrid"
  }, PROTO.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.n,
    className: "ps"
  }, /*#__PURE__*/React.createElement("div", {
    className: "psn"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "pst"
  }, p.t), /*#__PURE__*/React.createElement("div", {
    className: "psd"
  }, p.d)))))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Casos de referencia"), /*#__PURE__*/React.createElement("h2", {
    className: "st"
  }, "Dict\xE1menes de", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "alta cuant\xEDa resueltos"))), /*#__PURE__*/React.createElement("button", {
    className: "btn-g",
    onClick: () => go("casos")
  }, "Ver todos \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "cgrid"
  }, CASOS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctag"
  }, c.tag), /*#__PURE__*/React.createElement("div", {
    className: "cimp"
  }, c.imp), /*#__PURE__*/React.createElement("div", {
    className: "ctit"
  }, c.t), /*#__PURE__*/React.createElement("div", {
    className: "cdesc"
  }, c.d), /*#__PURE__*/React.createElement("div", {
    className: "cpills"
  }, c.pills.map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    className: "cp"
  }, p))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--p)",
      borderTop: "1px solid var(--b)"
    }
  }, /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Clientes"), /*#__PURE__*/React.createElement("h2", {
    className: "st"
  }, "Lo que dicen quienes", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "trabajan con nosotros")))), /*#__PURE__*/React.createElement("div", {
    className: "tgr"
  }, TESTI.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "tcard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tq"
  }, "\"", t.q, "\""), /*#__PURE__*/React.createElement("div", {
    className: "ta"
  }, t.a), /*#__PURE__*/React.createElement("div", {
    className: "tr"
  }, t.r)))))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Preguntas frecuentes"), /*#__PURE__*/React.createElement("h2", {
    className: "st"
  }, "Dudas habituales"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(FaqBlock, {
    items: FAQS_HOME
  }))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFNecesita un dictamen",
    em: "que se sostenga en sala?",
    s: "Respuesta t\xE9cnica en menos de 24 horas laborables",
    btn: "Solicitar consulta t\xE9cnica",
    open: open
  }));
}

/* ── PAGE HERO ────────────────────────────────── */
const PHero = ({
  bc,
  go,
  h1,
  sub
}) => /*#__PURE__*/React.createElement("div", {
  className: "ph"
}, /*#__PURE__*/React.createElement("div", {
  className: "bc"
}, /*#__PURE__*/React.createElement("span", {
  onClick: () => go("home")
}, "Inicio"), " / ", bc), /*#__PURE__*/React.createElement("h1", {
  className: "ph-h1",
  dangerouslySetInnerHTML: {
    __html: h1
  }
}), /*#__PURE__*/React.createElement("p", {
  className: "ph-sub"
}, sub));

/* ── CONSTRUCCIÓN ─────────────────────────────── */
function Construccion({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "Construcci\xF3n"),
    h1: "Perito de Construcci\xF3n<br/><em>en Barcelona</em>",
    sub: "Dict\xE1menes t\xE9cnicos para documentar defectos constructivos, incumplimientos contractuales o patolog\xEDas en edificios y obras. Barcelona y toda Espa\xF1a."
  }), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "El t\xE9cnico que diferencia el defecto del argumento"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "Un perito de construcci\xF3n no solo describe lo que ve en una inspecci\xF3n. Analiza el fallo desde la ra\xEDz \u2014 proyecto, direcci\xF3n facultativa o ejecuci\xF3n \u2014 y lo traduce en un dictamen con estructura jur\xEDdica capaz de ser ratificado ante un tribunal."), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "La diferencia entre ganar o perder un procedimiento civil por defectos constructivos suele reducirse a la solidez del informe pericial aportado como prueba, conforme a la Ley de Enjuiciamiento Civil, art. 335."), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "Atendemos tanto a ", /*#__PURE__*/React.createElement("b", null, "particulares"), " con disputas en su vivienda \u2014 vicios ocultos tras la compra, reformas mal ejecutadas, humedades sin resolver \u2014 como a ", /*#__PURE__*/React.createElement("b", null, "empresas, comunidades de propietarios y despachos"), " que necesitan un dictamen con validez judicial. La titulaci\xF3n de Ingeniero Civil (ECCAT n\xBA 16448) permite analizar estructura y cimentaci\xF3n con una profundidad diferente a la de otros t\xE9cnicos."), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "\xC1mbito de actuaci\xF3n"), /*#__PURE__*/React.createElement("div", null, SVCS.filter(s => ["vicios-ocultos", "reclamacion-mala-ejecucion", "patologias-estructurales", "humedades-filtraciones", "contrainforme-pericial", "naves-industriales"].includes(s.slug)).map(s => /*#__PURE__*/React.createElement("div", {
    key: s.slug,
    className: "srow",
    onClick: () => go("svc-" + s.slug),
    style: {
      gridTemplateColumns: "1fr 150px 36px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "st2",
    style: {
      fontSize: ".95rem",
      marginBottom: 0
    }
  }, s.t)), /*#__PURE__*/React.createElement("span", {
    className: "snorm"
  }, s.norm), /*#__PURE__*/React.createElement("span", {
    className: "sarr"
  }, "\u2192"))))), /*#__PURE__*/React.createElement(Qual, {
    open: open,
    items: [["✓", "Análisis previo de viabilidad técnica"], ["✓", "Presupuesto cerrado antes del encargo"], ["✓", "Ratificación en sala incluida"], ["✓", "Desplazamiento a toda España 24–48h"]],
    note: "+34 614 194 985 \xB7 Respuesta 24h"
  }))), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Casos en construcci\xF3n"), /*#__PURE__*/React.createElement("h2", {
    className: "st"
  }, "Referencias"))), /*#__PURE__*/React.createElement("div", {
    className: "cgrid"
  }, CASOS.slice(2, 5).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctag"
  }, c.tag), /*#__PURE__*/React.createElement("div", {
    className: "cimp"
  }, c.imp), /*#__PURE__*/React.createElement("div", {
    className: "ctit"
  }, c.t), /*#__PURE__*/React.createElement("div", {
    className: "cdesc"
  }, c.d))))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFTiene un problema constructivo",
    em: "que necesita documentar?",
    s: "Consulta inicial sin coste",
    open: open
  }));
}

/* ── INFORMES HUB ─────────────────────────────── */
function Informes({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "Informes Periciales"),
    h1: "Informes Periciales de<br/><em>Edificaci\xF3n y Obra Civil</em>",
    sub: "Ocho especialidades t\xE9cnico-legales para la resoluci\xF3n de disputas complejas. Metodolog\xEDa cient\xEDfica e independiente, preparada para ratificaci\xF3n oral conforme a la LEC."
  }), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", null, SVCS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.slug,
    className: "srow",
    onClick: () => go("svc-" + s.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: "snum"
  }, s.num), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stag"
  }, s.tag), /*#__PURE__*/React.createElement("div", {
    className: "st2"
  }, s.t), /*#__PURE__*/React.createElement("div", {
    className: "sd"
  }, s.desc)), /*#__PURE__*/React.createElement("span", {
    className: "snorm"
  }, s.norm), /*#__PURE__*/React.createElement("span", {
    className: "sarr"
  }, "\u2192"))))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFNo identifica su caso en el \xEDndice?",
    s: "Descr\xEDbanoslo \u2014 le orientamos sin coste",
    open: open
  }));
}

/* ── SERVICE CHILD ────────────────────────────── */
function Svc({
  svc,
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      onClick: () => go("informes")
    }, "Informes"), " / ", /*#__PURE__*/React.createElement("b", null, svc.num)),
    h1: `${svc.t} <em style="display:block;font-size:.55em;margin-top:.3em">${svc.tag}</em>`,
    sub: svc.desc
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nchips"
  }, svc.lsi.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    className: "nchip"
  }, l))), svc.body.map(([h, p], i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, h), /*#__PURE__*/React.createElement("p", {
    className: "body-p",
    dangerouslySetInnerHTML: {
      __html: p
    }
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Preguntas frecuentes"), /*#__PURE__*/React.createElement(FaqBlock, {
    items: svc.faqs
  })), /*#__PURE__*/React.createElement(Qual, {
    label: `Expediente · ${svc.num}`,
    open: open,
    cta: "Consultar este dictamen \u2192"
  }))), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Otros dict\xE1menes"), /*#__PURE__*/React.createElement("h2", {
    className: "st"
  }, "Relacionados"))), /*#__PURE__*/React.createElement("div", null, SVCS.filter(x => x.slug !== svc.slug).slice(0, 4).map(s => /*#__PURE__*/React.createElement("div", {
    key: s.slug,
    className: "srow",
    onClick: () => go("svc-" + s.slug),
    style: {
      gridTemplateColumns: "80px 1fr 150px 36px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "snum"
  }, s.num), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "st2",
    style: {
      fontSize: ".95rem",
      marginBottom: 0
    }
  }, s.t)), /*#__PURE__*/React.createElement("span", {
    className: "snorm"
  }, s.norm), /*#__PURE__*/React.createElement("span", {
    className: "sarr"
  }, "\u2192"))))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFNecesita este dictamen?",
    s: "Consulta inicial sin coste \xB7 Plazo por contrato",
    open: open
  }));
}

/* ── CASOS ────────────────────────────────────── */
function Casos({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "Casos"),
    h1: "Dict\xE1menes de<br/><em>alta cuant\xEDa resueltos</em>",
    sub: "Selecci\xF3n de casos resueltos en edificaci\xF3n, obra civil y siniestros industriales. Importes y detalles anonimizados para preservar la confidencialidad de las partes."
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cgrid"
  }, CASOS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctag"
  }, c.tag), /*#__PURE__*/React.createElement("div", {
    className: "cimp"
  }, c.imp), /*#__PURE__*/React.createElement("div", {
    className: "ctit"
  }, c.t), /*#__PURE__*/React.createElement("div", {
    className: "cdesc"
  }, c.d), /*#__PURE__*/React.createElement("div", {
    className: "cpills"
  }, c.pills.map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    className: "cp"
  }, p))))))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFTiene un caso similar?",
    s: "Consulta sin compromiso",
    open: open
  }));
}

/* ── ABOGADOS B2B ─────────────────────────────── */
function Abogados({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "B2B"),
    h1: "Servicio t\xE9cnico para<br/><em>despachos y aseguradoras</em>",
    sub: "Protocolo de colaboraci\xF3n B2B para despachos especializados en construcci\xF3n y compa\xF1\xEDas aseguradoras que necesitan un perito de parte independiente."
  }), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid",
    style: {
      gridTemplateColumns: "1fr 1fr"
    }
  }, [["Protocolo A — Despachos", "Para Despachos de Abogados", ["Informe preliminar de viabilidad técnica en 48 horas", "Honorarios fijos pactados por escrito", "Ratificación garantizada (LEC art. 347) incluida", "Múltiples procedimientos simultáneos", "Informe de avance periódico al letrado"]], ["Protocolo B — Aseguradoras", "Para Aseguradoras y Reaseguradoras", ["Valoración de causa, alcance y cuantía del siniestro", "Contrapericia frente al perito del asegurado", "Colaboración en siniestros concurrentes", "Certificación IRD — INESE Insurance School", "Interlocución directa con dirección de siniestros"]]].map(([n, t, items], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "qual",
    style: {
      position: "static"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "q-h"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "q-v",
    style: {
      fontSize: "1.4rem"
    }
  }, t), items.map(x => /*#__PURE__*/React.createElement("div", {
    key: x,
    className: "q-li"
  }, /*#__PURE__*/React.createElement("b", null, "\u2713"), x)), /*#__PURE__*/React.createElement("button", {
    className: "btn-p",
    style: {
      width: "100%",
      marginTop: "1.3rem"
    },
    onClick: open
  }, "Iniciar colaboraci\xF3n \u2192"))))), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sh"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Declaraciones B2B"), /*#__PURE__*/React.createElement("h2", {
    className: "st"
  }, "Referencias"))), /*#__PURE__*/React.createElement("div", {
    className: "tgr"
  }, TESTI.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "tcard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tq"
  }, "\"", t.q, "\""), /*#__PURE__*/React.createElement("div", {
    className: "ta"
  }, t.a), /*#__PURE__*/React.createElement("div", {
    className: "tr"
  }, t.r))))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFSu despacho necesita",
    em: "un perito de parte solvente?",
    s: "Informe de viabilidad en 48 horas \xB7 Sin compromiso",
    btn: "Iniciar colaboraci\xF3n",
    open: open
  }));
}

/* ── HONORARIOS ───────────────────────────────── */
function Honorarios({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "Honorarios"),
    h1: "Honorarios de<br/><em>informes periciales</em>",
    sub: "Honorarios fijos acordados antes del inicio del encargo. Sin costes variables ni sorpresas. La ratificaci\xF3n en sala est\xE1 incluida sin sobrecoste."
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Presupuesto cerrado antes del inicio"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "No se utiliza una tarifa est\xE1ndar porque cada caso es t\xE9cnicamente diferente. El coste depende de la complejidad, el n\xFAmero de visitas, los ensayos requeridos y el alcance del an\xE1lisis. Tras analizar la documentaci\xF3n inicial, se emite una propuesta t\xE9cnica con honorarios fijos cerrados."), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Qu\xE9 incluye el presupuesto"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, /*#__PURE__*/React.createElement("b", null, "Inspecci\xF3n"), " del inmueble o infraestructura \xB7 ", /*#__PURE__*/React.createElement("b", null, "an\xE1lisis"), " de la documentaci\xF3n t\xE9cnica \xB7 ", /*#__PURE__*/React.createElement("b", null, "redacci\xF3n"), " y maquetaci\xF3n del dictamen \xB7 ", /*#__PURE__*/React.createElement("b", null, "revisi\xF3n interna"), " y control de calidad \xB7 ", /*#__PURE__*/React.createElement("b", null, "ratificaci\xF3n en sede judicial"), " e interrogatorio cruzado \xB7 ", /*#__PURE__*/React.createElement("b", null, "desplazamientos"), " en toda Espa\xF1a."), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "No hay costes adicionales posteriores al presupuesto acordado.")), /*#__PURE__*/React.createElement(Qual, {
    label: "Factores de coste",
    open: open,
    cta: "Solicitar presupuesto \u2192",
    note: "Primera consulta sin coste",
    items: [["01", "Tipo de dictamen — parte, judicial o contrainforme"], ["02", "Complejidad técnica del caso"], ["03", "Número de visitas de inspección"], ["04", "Ensayos — termografía, testigos, FEM"], ["05", "Alcance geográfico"], ["06", "Urgencia del plazo"]]
  }))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFQuiere saber cu\xE1nto costar\xEDa su informe?",
    s: "Primera consulta sin coste",
    btn: "Solicitar presupuesto",
    open: open
  }));
}

/* ── DESPACHO ─────────────────────────────────── */
function Despacho({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "El Despacho"),
    h1: "Albert Vilardell Serra<br/><em>Ingeniero Civil \xB7 Perito Judicial</em>",
    sub: "Despacho de ingenier\xEDa forense fundado en Barcelona. M\xE1s de 15 a\xF1os en peritaje de edificaci\xF3n, obra civil y siniestros complejos para el mercado legal y asegurador."
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Especializaci\xF3n, no generalismo"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "Este despacho no acepta cualquier encargo. La especializaci\xF3n en dict\xE1menes para litigios de alta cuant\xEDa implica rechazar casos que no se ajustan al perfil de trabajo y concentrar los recursos en los asuntos donde el impacto t\xE9cnico es determinante."), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "La independencia t\xE9cnica y la solvencia del dictamen son el \xFAnico activo. No se trabaja en exclusiva para ninguna aseguradora ni se depende de ninguna constructora."), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Principios de trabajo"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, /*#__PURE__*/React.createElement("b", null, "Independencia t\xE9cnica"), " \u2014 innegociable, sin exclusivas. ", /*#__PURE__*/React.createElement("b", null, "Plazos por contrato"), " \u2014 si no se puede garantizar, no se acepta el encargo. ", /*#__PURE__*/React.createElement("b", null, "Honorarios fijos"), " \u2014 acordados antes del inicio, ratificaci\xF3n incluida. ", /*#__PURE__*/React.createElement("b", null, "Claridad t\xE9cnica"), " \u2014 un dictamen que no se entiende en sala no tiene valor.")), /*#__PURE__*/React.createElement(Qual, {
    label: "Habilitaci\xF3n profesional",
    open: open,
    cta: "Consultar disponibilidad \u2192",
    note: "L\u2013J 9h\u201318h \xB7 V 9h\u201314h \xB7 Cita previa",
    items: [["TÍT", "Ingeniero Civil — ETSECCPB · UPC"], ["COL", "ECCAT nº 16448"], ["JUD", "Perito Judicial — Ministerio de Justicia"], ["IRD", "Perito de Seguros — INESE Insurance School"], ["BCN", "C. de Numància, 95, Local 5 · 08029 Barcelona"], ["GRA", "C. Navarra, 14 · 08401 Granollers"]]
  }))), /*#__PURE__*/React.createElement(Band, {
    h: "\xBFNecesita un perito con esta formaci\xF3n?",
    open: open
  }));
}

/* ── CONTACTO ─────────────────────────────────── */
function Contacto({
  go,
  open
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PHero, {
    go: go,
    bc: /*#__PURE__*/React.createElement("b", null, "Contacto"),
    h1: "Solicitar<br/><em>consulta t\xE9cnica</em>",
    sub: "Primera valoraci\xF3n sin coste. Respuesta en menos de 24 horas laborables. Para asuntos urgentes, contacto directo por tel\xE9fono."
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sgrid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Canales"), /*#__PURE__*/React.createElement("p", {
    className: "body-p fm",
    style: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "var(--i)"
    }
  }, "+34 614 194 985", /*#__PURE__*/React.createElement("br", null), "info@perito.barcelona"), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Sedes"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, /*#__PURE__*/React.createElement("b", null, "Barcelona (principal)"), /*#__PURE__*/React.createElement("br", null), "Carrer de Num\xE0ncia, 95, Local 5 \xB7 08029 Barcelona", /*#__PURE__*/React.createElement("br", null), "Con cita previa \xB7 L\u2013J 9h\u201318h \xB7 V 9h\u201314h"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, /*#__PURE__*/React.createElement("b", null, "Granollers"), /*#__PURE__*/React.createElement("br", null), "Carrer Navarra, 14 \xB7 08401 Granollers", /*#__PURE__*/React.createElement("br", null), "Con cita previa"), /*#__PURE__*/React.createElement("h3", {
    className: "body-h3"
  }, "Confidencialidad"), /*#__PURE__*/React.createElement("p", {
    className: "body-p"
  }, "Toda la informaci\xF3n de la consulta inicial se trata con estricta confidencialidad conforme al RGPD (Reglamento UE 2016/679), exclusivamente para la gesti\xF3n de la consulta.")), /*#__PURE__*/React.createElement(Qual, {
    label: "Consulta guiada",
    open: open,
    cta: "Iniciar consulta guiada \u2192",
    note: "Confidencial \xB7 Sin compromiso",
    items: [["01", "Tipo de asunto"], ["02", "Descripción breve"], ["03", "Importe en disputa"], ["04", "Situación procesal"], ["05", "Datos de contacto"]]
  }))));
}

/* ── APP ──────────────────────────────────────── */
function App() {
  const [page, setPage] = useState("home");
  const [form, setForm] = useState(false);
  const go = p => {
    setPage(p);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const open = () => setForm(true);
  const svc = page.startsWith("svc-") ? SVCS.find(s => s.slug === page.slice(4)) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement(Nav, {
    page: page,
    go: go,
    open: open
  }), /*#__PURE__*/React.createElement("main", null, page === "home" && /*#__PURE__*/React.createElement(Home, {
    go: go,
    open: open
  }), page === "construccion" && /*#__PURE__*/React.createElement(Construccion, {
    go: go,
    open: open
  }), page === "informes" && /*#__PURE__*/React.createElement(Informes, {
    go: go,
    open: open
  }), svc && /*#__PURE__*/React.createElement(Svc, {
    svc: svc,
    go: go,
    open: open
  }), page === "casos" && /*#__PURE__*/React.createElement(Casos, {
    go: go,
    open: open
  }), page === "abogados" && /*#__PURE__*/React.createElement(Abogados, {
    go: go,
    open: open
  }), page === "honorarios" && /*#__PURE__*/React.createElement(Honorarios, {
    go: go,
    open: open
  }), page === "despacho" && /*#__PURE__*/React.createElement(Despacho, {
    go: go,
    open: open
  }), page === "contacto" && /*#__PURE__*/React.createElement(Contacto, {
    go: go,
    open: open
  })), /*#__PURE__*/React.createElement(Footer, {
    go: go
  }), form && /*#__PURE__*/React.createElement(Typeform, {
    onClose: () => setForm(false)
  }));
}
Object.assign(__ds_scope, { App });
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/perito-definitivo.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Seal = __ds_scope.Seal;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.StepForm = __ds_scope.StepForm;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.App = __ds_scope.App;

})();
