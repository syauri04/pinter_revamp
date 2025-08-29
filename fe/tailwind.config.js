/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 20s linear infinite",
        "slide-down": "slideDown 300ms ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        rethink: "var(--font-rethink-sans)",
      },
      backgroundImage: {
        "soft-white": `linear-gradient(0deg, #FFFFFF, #FFFFFF),
                       linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03))`,
      },
    },
  },
  plugins: [],
};
