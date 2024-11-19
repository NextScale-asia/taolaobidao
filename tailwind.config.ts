import { type Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
    './routes/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
