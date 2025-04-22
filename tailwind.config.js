module.exports = {
  content: ['./src/**/*.{njk,md,js,html}'],
  theme: {
    extend: {
      colors: {
        'accent': '#00B8D4',
        'dark': '#0B1030',
        'accent-light': '#16d6ff',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'accent-sm': '0 4px 10px rgba(0, 184, 212, 0.2)',
        'accent-md': '0 10px 25px rgba(0, 184, 212, 0.3)',
        'accent-lg': '0 25px 50px rgba(0, 184, 212, 0.3)',
      },
      dropShadow: {
        'accent-sm': '0 2px 4px rgba(0, 184, 212, 0.2)',
        'accent-md': '0 4px 8px rgba(0, 184, 212, 0.3)',
      },
    },
  },
  plugins: [],
  safelist: [
    'text-accent',
    'bg-accent',
    'border-accent',
    'shadow-accent-sm',
    'ring-accent',
    'font-montserrat'
  ],
}
