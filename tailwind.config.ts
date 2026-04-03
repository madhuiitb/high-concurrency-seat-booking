import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        seatPulse: {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(34,197,94,0.6)",
          },
          "50%": {
            transform: "scale(1.08)",
            boxShadow: "0 0 0 6px rgba(34,197,94,0)",
          },
        },
      },
      animation: {
        seatPulse: "seatPulse 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
