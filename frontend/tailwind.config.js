module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#e6edff',
          200: '#c7d6ff',
          300: '#98b6ff',
          400: '#6b92ff',
          500: '#3e6fff',
          600: '#3359e6',
          700: '#2847bf',
          800: '#1e368f',
          900: '#14235f'
        },
        surface: '#f7fafc',
        muted: '#6b7280',
        accent: '#06b6d4'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
      },
      boxShadow: {
        'card': '0 6px 18px rgba(22, 28, 45, 0.06)'
      },
      borderRadius: {
        'lg-xl': '0.75rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ],
  corePlugins: {
    preflight: true
  }
}
