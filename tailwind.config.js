export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'boost-orange': '#FC5400',
        'boost-grey': '#F8F8F8',
        "search-grey":"grey"
      },
      borderRadius: {
        'customsearch': '0.5rem',
        'custom': '1.25rem', // Adding a custom border radius
      },
      width:{
        "widthsearch":"300px",
      }
    },
  },
  plugins: [],
}