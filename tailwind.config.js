/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        DEFAULT: "calc(1400px + 1rem * 2)",
      },
    },
    extend: {
      colors: {
        "surface-container": "hsl(0 0% 12%)",
        surface: "hsl(0 0% 7%)",
        "on-surface": "hsl(0 0% 90%)",
        "on-surface-variant": "hsl(0 0% 60%)",
        primary: "hsl(274 80% 80%)",
        "primary-container": "hsl(274 16% 18%)",
        "primary-container-high": "hsl(274 16% 23%)",
        danger: "hsl(0 100% 70%)",
        "danger-container": "hsl(0 16% 18%)",
        success: "hsl(118 49% 50%)",
        "success-container": "hsl(118 16% 18%)",
        placeholder: "hsl(0 0% 50%)",
        outline: "hsl(0 0% 40%)",
        "outline-variant": "hsl(0 0% 30%)",
      },
      padding: {
        "safe-area": "1.5rem",
      },
      gap: {
        "safe-area": "1.5rem",
      },
      borderRadius: {
        "large-shape": "16px",
        "medium-shape": "12px",
      },
      fontSize: {
        "display-l": "36px",
        "headline-l": "32px",
        "headline-m": "28px",
        "title-l": "22px",
        "body-extra": "18px",
        "body-m": "14px",
        "body-s": "12px",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        ripple: {
          "0%": {
            scale: "0",
          },
          "100%": {
            scale: "3",
          },
        },
      },
      animation: {
        ripple: "ripple 600ms linear forwards",
      },
    },
  },
  plugins: [],
}
