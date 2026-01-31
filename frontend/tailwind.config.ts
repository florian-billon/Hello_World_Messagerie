import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberCyan: "#4fdfff",
        cyberMint: "#5df2c6",
        cyberRed: "#a00000",
        cyberRedHover: "#c00000",
      },
      backgroundColor: {
        panelBg: "rgba(0, 0, 0, 0.45)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease",
      },
    },
  },
  plugins: [],
};

export default config;

