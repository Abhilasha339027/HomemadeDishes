// import { grey } from "@material-ui/core/colors";

const fontSize = 14;
const htmlFontSize = 16;
const coef = fontSize / 12;

export const darkTheme = {
  direction: "ltr",
  typography: {
    pxToRem: (size) => `${(size / htmlFontSize) * coef}rem`,
    fontFamily: {
      primary: ["Josefin Sans", "sans-serif"].join(","),
      secondary: ["CaviarDreams_Bold", "sans-serif"].join(","),
      italicText: ["Miniver", "sans-serif"].join(","),
      buttonText: ["Open Sans Condensed", "sans-serif"].join(","),
      // secondary:
    },
  },

  palette: {
    primary: {
      main: "#0b1315",
    },

    background: {
      paper: "#262626",
      default: "#0b1315",
      hover: "#0b1315",
    },

    secondary: {
      main: "#fff",
      extra: "#121e21",
    },

    text: {
      primary: "#c9ab81",
    },
  },
};
