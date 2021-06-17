const {
  colors: defaultColors,
  screens: defaultScreens,
} = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    colmena: {
      light: "#2DD4BF",
      DEFAULT: "#14B8A6",
      dark: "#0D9488",
    },
  },
};

const screen = { xs: "475px", ...defaultScreens };

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Ubuntu", "Sans-serif"],
    },
    colors: colors,
    screens: {
      xs: "475px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
