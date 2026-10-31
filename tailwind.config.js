/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        papel: '#FFFFFF',
        tinta: '#1A1A1A',
        'tinta-suave': '#6B6B6B',
        acento: '#E91B1E',
        'acento-fuerte': '#C4161A',
        'acento-tenue': '#FDECEC',
        enlace: '#1D4ED8',
        linea: '#E5E7EB',
        bloque: '#D4D4D4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        logo: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      fontSize: {
        rotulo: ['0.75rem', { lineHeight: '1rem' }],
        pie: ['0.75rem', { lineHeight: '1.125rem' }],
        menu: ['0.875rem', { lineHeight: '1.25rem' }],
        cuerpo: ['1rem', { lineHeight: '1.5rem' }],
        tarjeta: ['1rem', { lineHeight: '1.3rem' }],
        entradilla: ['1rem', { lineHeight: '1.5rem' }],
        'entradilla-lg': ['1.25rem', { lineHeight: '1.75rem' }],
        titular: ['1.5rem', { lineHeight: '2rem' }],
        'titular-lg': ['2.5rem', { lineHeight: '3.25rem' }],
      },
      maxWidth: {
        portada: '77rem',
        nota: '61.25rem',
        lectura: '34rem',
      },
    },
  },
  plugins: [],
};
