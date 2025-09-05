// tailwind.config.ts
import { defineConfig } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:  '#A8C6FF',   // Pastel Azul Claro
          mint:  '#A8E6CF',   // Pastel Verde Menta
          yellow:'#FFF5BA',   // Pastel Amarillo Suave
          pink:  '#FFD6E0',   // Pastel Rosa Claro
          gray:  '#F2F2F2',   // Gris Claro Neutro
        }
      },
      boxShadow: {
        card: '0 8px 24px rgba(17,24,39,0.06)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      }
    },
  },
  plugins: []
};

