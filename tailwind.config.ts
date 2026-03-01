import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        bp: {
          blue: '#5b9bd5',
          steel: '#7c8eb5',
          green: '#4caf7c',
          red: '#d65f5f',
          amber: '#e5a84b',
          navy: '#0b1929',
          dark: '#0f2035',
          grid: '#1a3a5c',
          line: '#1e4a6e',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress-fill': 'progress-fill 1s ease-out forwards',
      },
      keyframes: {
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
