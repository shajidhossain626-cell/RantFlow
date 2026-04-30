module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#f5c451',
        ink: '#030712',
      },
      boxShadow: {
        premium: '0 24px 80px rgba(124,58,237,.24)',
      },
    },
  },
  plugins: [],
};
