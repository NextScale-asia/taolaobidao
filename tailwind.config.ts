import { type Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
    './routes/**/*.{ts,tsx}',
  ],
  plugins: [animate],
} satisfies Config;
