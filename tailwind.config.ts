import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F16',
        panel: '#0E1525',
        text: '#E6EDF7',
        muted: '#8A94A6',
        cian: '#00E5FF',
        'cian-soft': '#7DF9FF',
        amber: '#FFB300',
        alert: '#FF3D00',
      },
      fontFamily: { sans: ['Inter','system-ui','sans-serif'], hud: ['Orbitron','sans-serif'] },
      boxShadow: { hud: '0 0 20px rgba(0,229,255,0.25)' },
      keyframes: { glow: { '0%,100%': { opacity: 1 }, '50%': { opacity: .5 } } },
      animation: { glow: 'glow 2s ease-in-out infinite' },
    },
  },
  plugins: [animate],
};
export default config;
