/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1B1220',
        surface: '#251728',
        wine: '#7A2048',
        wineLight: '#A8365F',
        gold: '#D9A441',
        blush: '#F2A6B0',
        ink: '#F3EAEE',
        muted: '#B9A6B4',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
