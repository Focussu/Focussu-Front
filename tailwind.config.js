// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    "text-[clamp(24px,4vw,50px)]",
    "text-[clamp(18px,2.5vw,24px)]",
    "text-[clamp(32px,4vw,52px)]",
  ],
};
