/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Courier New', 'Consolas', 'Monaco', 'monospace'],
        'serif': ['Times New Roman', 'Georgia', 'Times', 'serif'],
        'sans': ['Arial', 'Helvetica', 'Verdana', 'sans-serif'],
        'condensed': ['Arial Narrow', 'Trebuchet MS', 'sans-serif'],
        'terminal': ['Courier', 'Courier New', 'Lucida Console', 'monospace'],
        'display': ['Impact', 'Arial Black', 'Trebuchet MS', 'sans-serif'],
      },
      colors: {
        'theme': {
          'bg': 'var(--bg)',
          'text': 'var(--text)',
          'border': 'var(--border)',
          'hover': 'var(--hover)',
          'tooltip-bg': 'var(--tooltip-bg)',
          'tooltip-text': 'var(--tooltip-text)',
          'highlight': 'var(--highlight)',
          'dim': 'var(--dim)',
        }
      }
    },
  },
  plugins: [],
}