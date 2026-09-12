import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "midnight-teal": "#07090E",
        "deep-teal": "#101724",
        "neon-flamingo": "#FF2A85",
        "sunset-orange": "#FF7539",
        "palm-teal": "#00E5FF",
        "off-white": "#F4F7F6",
        "vice-purple": "#7928CA",
        "vice-gold": "#FFB800",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
