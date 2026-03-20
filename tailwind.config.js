/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "kbbq-red": "#D32F2F",
        "kbbq-orange": "#FF6F00",
        "kbbq-gold": "#FFB300",
        "kbbq-brown": "#5D4037",
        "kbbq-cream": "#FFF8E1",
        "kbbq-charcoal": "#263238",
      },
      fontFamily: {
        korean: ["Noto Sans KR", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        sizzle: "sizzle 0.5s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sizzle: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
