/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fifa: {
          blue: '#020617',
          gold: '#f59e0b',
          green: '#10b981',
          card: '#0f172a',
          accent: '#3b82f6',
          danger: '#ef4444'
        }
      }
    },
  },
  plugins: [],
}
