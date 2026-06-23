import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{njk,md,js,html}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // ── Paleta del Design System (Design System/tokens/colors.css) ──
      colors: {
        ink: {
          900: '#18211C',
          800: '#232E27',
          700: '#34403A',
        },
        concrete: {
          600: '#5E665F',
          500: '#828A82',
        },
        stone: {
          400: '#AEB4AE',
          300: '#D5DAD5',
          250: '#DFE3DE',
          200: '#E8EBE7',
        },
        bone: {
          100: '#F1F1EA',
        },
        paper: {
          50: '#FAFAF4',
        },
        oxide: {
          700: '#11502F',
          600: '#15633C',
          500: '#1C7A4A',
          400: '#2A9760',
          200: '#A6D8BD',
          100: '#DCEFE3',
        },
        moss: {
          600: '#4C6650',
          100: '#E2E9E0',
        },
        ochre: {
          600: '#936E22',
          100: '#F0E7CF',
        },
        slate: {
          700: '#324350',
          100: '#E0E6EA',
        },
      },

      // ── Tipografía (Design System/tokens/typography.css) ──
      fontFamily: {
        serif: ["'Spectral'", 'Georgia', "'Times New Roman'", 'serif'],
        sans: ["'IBM Plex Sans'", 'system-ui', '-apple-system', "'Segoe UI'", 'Helvetica', 'Arial', 'sans-serif'],
        mono: ["'IBM Plex Mono'", 'ui-monospace', "'SFMono-Regular'", 'Menlo', 'Consolas', 'monospace'],
        // ── LEGACY COMPAT (eliminar cuando se porten las plantillas) ──
        display: ["'Spectral'", 'Georgia', 'serif'],
        body: ["'IBM Plex Sans'", 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-1': ['clamp(2.75rem, 5.2vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'display-2': ['clamp(2.1rem, 3.6vw, 3.1rem)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'h1': ['clamp(1.9rem, 2.8vw, 2.5rem)', { lineHeight: '1.14' }],
        'h2': ['clamp(1.55rem, 2.1vw, 2rem)', { lineHeight: '1.14' }],
        'h3': ['1.3rem', { lineHeight: '1.14' }],
        'h4': ['1.1rem', { lineHeight: '1.14' }],
        'lede': ['clamp(1.125rem, 1.4vw, 1.3rem)', { lineHeight: '1.55' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.65' }],
        'small': ['0.8125rem', { lineHeight: '1.65' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
        'mono-label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.14em' }],
        'mono-sm': ['0.8125rem', { lineHeight: '1.4' }],
        'mono-data': ['1rem', { lineHeight: '1.4' }],
        'data-xl': ['clamp(2.4rem, 4vw, 3.4rem)', { lineHeight: '1.04' }],
      },

      // ── Radii (Design System/tokens/elevation.css) ──
      borderRadius: {
        'xs': '2px',
        'sm': '3px',
        DEFAULT: '5px',
        'md': '5px',
        'lg': '8px',
        'pill': '999px',
      },

      // ── Sombras (Design System/tokens/elevation.css) ──
      boxShadow: {
        'sm': '0 1px 2px rgba(28, 26, 23, 0.05)',
        'card': '0 1px 0 rgba(28, 26, 23, 0.03), 0 2px 8px rgba(28, 26, 23, 0.04)',
        'overlay': '0 12px 40px -8px rgba(28, 26, 23, 0.22), 0 4px 12px rgba(28, 26, 23, 0.10)',
        'focus': '0 0 0 3px rgba(28, 122, 74, 0.28)',
        // ── LEGACY COMPAT (eliminar cuando se porten las plantillas) ──
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'medium': '0 5px 20px rgba(0, 0, 0, 0.04)',
        'hard': '0 10px 40px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 20px rgba(15, 118, 110, 0.15)',
      },

      // ── Spacing adicional ──
      spacing: {
        'gutter': 'clamp(20px, 5vw, 64px)',
        'section': 'clamp(64px, 9vw, 144px)',
        'block-gap': 'clamp(40px, 5vw, 72px)',
      },

      // ── Containers ──
      maxWidth: {
        'container-max': '1200px',
        'container-text': '720px',
        'container-wide': '1320px',
      },

      // ── Border widths ──
      borderWidth: {
        'hair': '1px',
        'strong': '1.5px',
        'rule': '2px',
      },

      // ── LEGACY COMPAT (eliminar cuando se porten las plantillas) ──
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(241 245 249 / 0.1)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E\")",
        'radial-fade': 'radial-gradient(circle, rgba(15,118,110,0.08) 0%, rgba(255,255,255,0) 70%)',
      },

      // ── Transiciones (Design System/tokens/motion.css) ──
      transitionDuration: {
        'fast': '140ms',
        'base': '200ms',
        'slow': '320ms',
      },
      transitionTimingFunction: {
        'ds-out': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        'ds-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ds-in': 'cubic-bezier(0.4, 0, 1, 1)',
      },

      // ── Tracking ──
      letterSpacing: {
        'label': '0.14em',
        'mono': '0.02em',
        'tight-ds': '-0.015em',
      },
    },
  },
  plugins: [typography],
};