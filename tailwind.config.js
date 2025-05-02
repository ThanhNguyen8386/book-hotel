/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mbs': '240px',

      'mb': '480px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'translate-y-6' },
          '100%': { transform: 'translate-y-0' },
        },
        grow: {
          '100%': { transform: 'scale-100' },
          '50%': { transform: 'scale-125' },
          '0%': { transform: 'scale-150' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px) scale(1.5)' },
          '100%': { opacity: 1, transform: 'translateY(0px) scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: 0, transform: 'translateY(-50px) scale(0.75)' },
          '100%': { opacity: 1, transform: 'translateY(0px) scale(1)' },
        },
      },
      fontFamily: {
        work: ['"Work Sans"', 'sans-serif'],
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out',
        grow: 'grow 1s ease',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-out': 'fadeOut 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
}