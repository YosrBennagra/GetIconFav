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
          violet: '#7c3aed',
          cyan: '#06b6d4',
          bg: '#0d0d1a',
          deep: '#1a0a2e',
          card: 'rgba(255,255,255,0.05)',
          border: 'rgba(255,255,255,0.10)',
          green: '#10b981',
          red: '#ef4444',
          amber: '#f59e0b',
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
        glow: '0 0 30px rgba(124, 58, 237, 0.3)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.3)',
        'glow-sm': '0 0 15px rgba(124, 58, 237, 0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config;
