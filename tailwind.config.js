


/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // New brand palette
        'brand-bold': '#1e466b',
        'brand-light': '#67baf4',
        'soft-white': '#fafafa',
        'jet-black': '#0d0d0d',

        // Remap the `cyan` scale to the new bold/light blue palette so
        // existing utility classes (bg-cyan-600, text-cyan-700, etc.) pick up
        // the new colors without needing to refactor every file.
        cyan: {
          50: '#eff7fe',
          100: '#dceffd',
          200: '#c4e3fb',
          300: '#95cef9',
          400: '#67baf4', // light blue brand
          500: '#3d8dc9',
          600: '#1e466b', // bold blue brand (primary buttons)
          700: '#163551',
          800: '#0e2538',
          900: '#081823',
        },

        // Override slate-900 so default body/heading text uses true jet black
        slate: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#0d0d0d', // jet black
        },
      },
      fontFamily: {
        heading: ['"IBM Plex Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


