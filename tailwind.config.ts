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
        glass: {
          bg: '#0b1929',
          deep: '#0f2035',
          card: 'rgba(255,255,255,0.05)',
          border: 'rgba(255,255,255,0.10)',
        },
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
        violet: {
          300: '#8bb8e2',
          400: '#5b9bd5',
          500: '#4a8cc6',
          600: '#3a7ab5',
        },
        cyan: {
          300: '#a1add0',
          400: '#7c8eb5',
          500: '#6b7da6',
          600: '#5a6c96',
        },
        emerald: {
          400: '#4caf7c',
          500: '#3d9a6b',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress-fill': 'progress-fill 1s ease-out forwards',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'mesh-rotate': 'mesh-rotate 15s ease infinite',
        'border-flow': 'border-flow 4s linear infinite',
        'float-particle': 'float-particle 20s ease-in-out infinite',
      },
      keyframes: {
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'mesh-rotate': {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(30deg)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float-particle': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-30px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-15px)' },
          '75%': { transform: 'translateY(-25px) translateX(5px)' },
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(91, 155, 213, 0.3)',
        'glow-cyan': '0 0 30px rgba(124, 142, 181, 0.3)',
        'glow-sm': '0 0 15px rgba(91, 155, 213, 0.2)',
        'glow-lg': '0 0 50px rgba(91, 155, 213, 0.25), 0 0 100px rgba(124, 142, 181, 0.1)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config;
