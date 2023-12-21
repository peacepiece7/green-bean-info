import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#FF0000",
      },
    },
  },
  plugins: [lineClamp],
};
