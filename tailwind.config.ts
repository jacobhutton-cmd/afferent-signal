import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          green: '#16A34A',
        },
        dark: {
          gold: '#F5C518',
          cyan: '#06B6D4',
          bg: '#0F172A',
          surface: '#1E293B',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #2563EB, #16A34A)',
        'dark-gradient': 'linear-gradient(to right, #F5C518, #06B6D4)',
      },
    },
  },
  plugins: [],
}

export default config
