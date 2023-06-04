/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        primary: {
          purple: "hsl(259, 100%, 65%)",
          "light-red": "hsl(0, 100%, 67%)",
        },
        neutral: {
          "off-white": "hsl(0, 0%, 94%)",
          "light-grey": "hsl(0, 0%, 86%)",
          "smokey-grey": "hsl(0, 1%, 44%)",
          "off-black": "hsl(0, 0%, 8%)",
        },
      },
    },
  },
  plugins: [],
};
