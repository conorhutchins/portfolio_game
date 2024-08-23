// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        buttonBg: 'var(--button-background-color)',
        buttonText: 'var(--button-text-color)',
        buttonHoverBg: 'var(--button-hover-background-color)',
      },
      fontFamily: {
        commissioner: ['Commissioner'],
      },
    },
  },
  plugins: [],
};
