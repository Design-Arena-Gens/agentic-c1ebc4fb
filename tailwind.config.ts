import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F17',
        foreground: '#E6EAF2',
        muted: '#8A94A6',
        card: '#0F1522',
        accent: '#7C5CFC',
        accent2: '#1FB2A6',
        danger: '#EF4444',
        warning: '#F59E0B',
        success: '#10B981'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124,92,252,0.25), 0 10px 30px rgba(124,92,252,0.15)',
      },
      backgroundImage: {
        'radial': 'radial-gradient(1000px 500px at 80% -20%, rgba(124,92,252,0.25), rgba(31,178,166,0.15) 60%, transparent 80%)',
        'gloss': 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      }
    },
  },
  plugins: [],
};

export default config;
