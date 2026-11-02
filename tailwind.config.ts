import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        semrush: {
          orange: "#FF642D",
          dark: "#171A22",
          surface: "#1F232E",
          border: "#2C3242",
          blue: "#356AE6",
          green: "#00C288",
          purple: "#7357FF",
        }
      },
    },
  },
  plugins: [],
};
export default config;
