/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        // Romantic palette
        rose: {
          soft: "oklch(0.72 0.14 350)",
          light: "oklch(0.88 0.08 350)",
          deep: "oklch(0.55 0.20 350)",
        },
        lavender: {
          DEFAULT: "oklch(0.78 0.10 290)",
          light: "oklch(0.90 0.06 290)",
          deep: "oklch(0.62 0.14 290)",
        },
        blush: {
          DEFAULT: "oklch(0.88 0.08 10)",
          light: "oklch(0.95 0.04 10)",
          deep: "oklch(0.75 0.12 10)",
        },
        petal: "oklch(0.93 0.05 350)",
        "gold-soft": "oklch(0.82 0.10 75)",
        // Enhanced romantic gradient stops
        "lavender-deep": "#c084fc",
        "blush-pink": "#f9a8d4",
        "warm-rose": "#fda4af",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        'serif-elegant': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.5rem",
        full: "9999px",
      },
      boxShadow: {
        'romantic': '0 8px 32px rgba(233, 30, 140, 0.15), 0 2px 8px rgba(233, 30, 140, 0.08)',
        'romantic-lg': '0 20px 60px rgba(233, 30, 140, 0.20), 0 8px 24px rgba(233, 30, 140, 0.12)',
        'glow-pink': '0 0 20px rgba(233, 30, 140, 0.3), 0 0 40px rgba(233, 30, 140, 0.15)',
        'glow-lavender': '0 0 20px rgba(192, 132, 252, 0.3), 0 0 40px rgba(192, 132, 252, 0.15)',
        'glass': '0 8px 32px rgba(136, 14, 79, 0.10), inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'romantic-gradient': 'var(--romantic-gradient)',
        'love-gradient': 'linear-gradient(135deg, oklch(0.88 0.08 290) 0%, oklch(0.92 0.07 340) 28%, oklch(0.94 0.06 10) 55%, oklch(0.90 0.09 350) 78%, oklch(0.87 0.10 300) 100%)',
        'heart-glow': 'radial-gradient(ellipse at center, rgba(249,168,212,0.15) 0%, transparent 70%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-heart': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-100px)', opacity: '0' },
        },
        'music-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(249,168,212,0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(249,168,212,0.9), 0 0 40px rgba(244,114,182,0.5)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease forwards',
        'pulse-heart': 'pulse-heart 2s ease-in-out infinite',
        'float-up': 'float-up 3s ease-in-out infinite',
        'music-glow': 'music-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
