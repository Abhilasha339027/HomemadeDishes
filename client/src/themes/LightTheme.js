// import { grey } from "@material-ui/core/colors";

const fontSize = 14;
const htmlFontSize = 16;
const coef = fontSize / 12;

export const lightTheme = {
  theme: "dark",
  typography: {
    pxToRem: (size) => `${(size / htmlFontSize) * coef}rem`,
    // fontFamily: "sans-serif",

    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },

  palette: {
    type: "light",

    primary: {
      main: '#fff',
    },

    background: {
      default: "#fff",
      paper: "#fff",
      hover: "#d9d9d9"
    },
    
    secondary: {
      main: "#463d34",
      extra1: "#463d34",
    },
    
    text: {
      primary: "#463d34",
    },
  },
};
