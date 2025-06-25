/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: "0 0 1px #6366f1", // Indigo
      },
      keyframes: {
        "slide-in-left": {
          "0%": { transform: "translateX(-50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "slide-in-left": "slide-in-left 0.10s ease-out",
        "slide-in-right": "slide-in-right 0.10s ease-out",
        "gradient-x": "gradientX 6s ease infinite",
      },
      boxShadow: {
        top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)", // shadow on top
        bottom: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", // shadow on bottom
      },
      backgroundSize: {
        200: "200% 200%",
      },
    },
  },
  plugins: [],
};
