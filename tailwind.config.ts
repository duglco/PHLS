import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pine: {
          50: "#f4f8f2",
          100: "#e6efe0",
          200: "#c8dec0",
          300: "#a3c39a",
          400: "#7ea673",
          500: "#5c8a52",
          600: "#476f3f",
          700: "#375833",
          800: "#2c452a",
          900: "#233823"
        },
        soil: {
          100: "#f5efe8",
          200: "#e6d8c9",
          300: "#cdb69b",
          600: "#7a5b3d",
          800: "#4a3726"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 20px 50px -30px rgba(22, 36, 22, 0.45)",
        glow: "0 12px 30px -18px rgba(92, 138, 82, 0.65)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top, rgba(126, 166, 115, 0.25), transparent 55%), radial-gradient(circle at 20% 60%, rgba(205, 182, 155, 0.35), transparent 50%)"
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        floatUp: "floatUp 0.8s ease-out both",
        shimmer: "shimmer 6s ease infinite"
      }
    }
  },
  plugins: []
};

export default config;
