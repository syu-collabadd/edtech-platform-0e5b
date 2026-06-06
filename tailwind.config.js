/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          400: '#818CF8',
          500: '#6366F1',
          600: '#5B5BD6',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        violet: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 12px 0 rgba(0,0,0,0.06)',
        card: '0 1px 4px 0 rgba(0,0,0,0.04), 0 4px 16px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
