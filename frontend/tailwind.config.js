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
        "4xl": "3.5rem",
        heart: "50% 50% 50% 50% / 60% 60% 40% 40%",
      },
      boxShadow: {
        glow: "0 0 20px oklch(0.72 0.18 350 / 0.4), 0 4px 15px oklch(0.72 0.18 350 / 0.25)",
        "glow-lg": "0 0 40px oklch(0.72 0.18 350 / 0.5), 0 8px 30px oklch(0.72 0.18 350 / 0.35)",
        "glow-xl": "0 0 60px oklch(0.72 0.18 350 / 0.6), 0 12px 50px oklch(0.72 0.18 350 / 0.45)",
        romantic: "0 8px 40px oklch(0.62 0.18 350 / 0.15), 0 2px 12px oklch(0.62 0.18 350 / 0.10)",
        "romantic-lg": "0 16px 60px oklch(0.62 0.18 350 / 0.25), 0 4px 20px oklch(0.62 0.18 350 / 0.15)",
        glass: "0 8px 32px oklch(0.62 0.18 350 / 0.12), inset 0 1px 0 oklch(0.99 0.005 340 / 0.6)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "fade-in-up": "fadeInUp 0.9s ease forwards",
        "fade-in-scale": "fadeInScale 0.8s ease forwards",
        "float-up": "floatUp 8s ease-in-out infinite",
        "float-particle": "floatParticle 12s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "pulse-heart": "pulseHeart 2.6s ease-in-out infinite",
        heartbeat: "heartbeat 1.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "infinity-glow": "infinityGlow 2s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
        shake: "shake 0.5s ease",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInScale: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0) translateX(0) scale(1)", opacity: "0.7" },
          "25%": { transform: "translateY(-25vh) translateX(10px) scale(1.05)", opacity: "0.8" },
          "50%": { transform: "translateY(-50vh) translateX(-8px) scale(0.95)", opacity: "0.6" },
          "75%": { transform: "translateY(-75vh) translateX(12px) scale(1.02)", opacity: "0.4" },
          "100%": { transform: "translateY(-100vh) translateX(-5px) scale(0.9)", opacity: "0" },
        },
        floatParticle: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.3" },
          "100%": { transform: "translateY(-100vh) translateX(20px)", opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px oklch(0.72 0.18 350 / 0.3)" },
          "50%": { boxShadow: "0 0 50px oklch(0.72 0.18 350 / 0.7), 0 0 80px oklch(0.68 0.14 290 / 0.4)" },
        },
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)", filter: "drop-shadow(0 0 8px oklch(0.72 0.18 350 / 0.5))" },
          "50%": { transform: "scale(1.15)", filter: "drop-shadow(0 0 20px oklch(0.72 0.18 350 / 0.9))" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.2)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.15)" },
          "70%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        infinityGlow: {
          "0%, 100%": { opacity: "0.7", textShadow: "0 0 30px oklch(0.72 0.18 350 / 0.6)" },
          "50%": { opacity: "1", textShadow: "0 0 60px oklch(0.72 0.18 350 / 1), 0 0 100px oklch(0.68 0.14 290 / 0.8)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-6px)" },
          "80%": { transform: "translateX(6px)" },
        },
      },
      backgroundImage: {
        "romantic-gradient": "linear-gradient(135deg, oklch(0.92 0.06 290) 0%, oklch(0.95 0.05 320) 30%, oklch(0.96 0.06 350) 60%, oklch(0.94 0.07 10) 100%)",
        "romantic-gradient-dark": "linear-gradient(135deg, oklch(0.16 0.04 290) 0%, oklch(0.18 0.04 320) 30%, oklch(0.20 0.05 350) 60%, oklch(0.18 0.05 10) 100%)",
        "petal-gradient": "linear-gradient(180deg, oklch(0.95 0.04 350) 0%, oklch(0.92 0.06 290) 100%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
