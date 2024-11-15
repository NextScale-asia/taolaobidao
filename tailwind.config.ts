import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
    './routes/**/*.{ts,tsx}',
  ],
  plugins: [require("tailwindcss/plugin/tailwindcss-animate")],
} satisfies Config;
