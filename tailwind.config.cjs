const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./*.html",
    "./pages/*.html",
    "./layout/*.html",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      xs: { max: "575px" }, // Mobile (iPhone 3 - iPhone XS Max).
      sm: { min: "576px", max: "897px" }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
      md: { min: "898px", max: "1199px" }, // Tablet (matches max: iPad Pro @ 1112px).
      lg: { min: "1200px" }, // Desktop smallest.
      xl: { min: "1159px" }, // Desktop wide.
      "2xl": { min: "1359px" }, // Desktop widescreen.
      // adding xs to the rest
      // xs: "475px",
      // // if you did not add this, you would have only "xs"
      // ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#626262",
      },
      fontFamily: {
        sans: ["Open Sans", "ubuntu", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
