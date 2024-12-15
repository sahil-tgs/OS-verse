import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        windowsFade: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        windowsFade: 'windowsFade 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

export default config