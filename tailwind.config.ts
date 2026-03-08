import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange: {
          DEFAULT: "var(--orange)",
          500: "var(--orange)",
        },
        yellow: {
          DEFAULT: "var(--yellow)",
          400: "var(--yellow)",
        },
        green: {
          DEFAULT: "var(--green)",
          500: "var(--green)",
          dark: "var(--green-dark)",
        },
        "bg-light": "var(--bg-light)",
        "bg-dark": "var(--bg-dark)",
        "text-dark": "var(--text-dark)",
        "text-muted": "var(--text-muted)",
      },
      backgroundImage: {
        'gradient-brand': 'var(--gradient)',
      },
      fontFamily: {
        nunito: ['var(--font-nunito)'],
        inter: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
export default config;
