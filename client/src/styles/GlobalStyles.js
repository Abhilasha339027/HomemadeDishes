import { makeStyles } from "@material-ui/core";
import { grey, red, teal } from "@material-ui/core/colors";
import headerImg from "../media/headerbg.jpg";
import featured1 from "../media/featured1.jpg";
import featured2 from "../media/featured2.jpg";
import featured3 from "../media/featured3.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(2),
  },

  h300: {
    height: 300,
  },

  mxHeight: {
    height: "100%",
  },

  mxWidth: {
    width: "100%",
  },

  featuredImage: {
    display: "block",
  },

  textLight: {
    color: theme.palette.text.primary,
  },

  defaultColor: {
    color: "white",
  },

  profileRoot: {
    // flexGrow: 1,
    // display: "flex",
  },

  TabPanel: {
    // width: "100%",
  },

  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // [theme.breakpoints.down("sm")]: {
    //   width: "50%",
    // },
  },

  featuredOverlay: {
    color: "#fff",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  featured0: {
    backgroundImage: `url(${featured1})`,
  },

  featured1: {
    backgroundImage: `url(${featured2})`,
  },

  featured2: {
    backgroundImage: `url(${featured3})`,
  },

  hero: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignTtems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  headline: {
    fontSize: "15rem",
    color: "blueviolet",
    fontWeight: 100,
    lineHeight: 0.5,
  },

  headLine: {
    fontWeight: "bold",
  },

  menuBar: {
    marginTop: "auto",
    marginBottom: "auto",
  },

  logo: {
    width: 200,
    color: theme.palette.type === "light" ? grey[900] : grey[100],
  },

  navMenu: {
    marginTop: "auto",
    marginBottom: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  navLink: {
    textAlign: "center",
    fontFamily: "CaviarDreams_bold, sans-serif",
    // fontWeight: "bold",
    fontWeight: "700",
    textTransform: "uppercase",

    letterSpacing: ".15em",
    // fontSize: "16px",
  },

  activeNavLink: {
    fontWeight: "bolder",
  },

  applyForChef: {
    fontWeight: "bolder",
    letterSpacing: ".25em",
  },

  mobileMenu: {
    // display: "none",
    [theme.breakpoints.down("sm")]: {
      // display: "inline-flex",
      padding: theme.spacing(0),
    },
  },

  iconG: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },

  uploadInput: { display: "none" },

  appBarTransparent: {
    backgroundColor: "rgba(67, 129, 168,0.5)",
  },

  textSecondary: {
    color: theme.palette.text.primary,
    fontFamily: "Miniver,sans-serif",
    fontWeight: 300,
    marginBottom: "50px",
  },

  cartContainer: {
    position: "sticky",
    top: "30%",
    backgroundColor: theme.palette.secondary.extra,
    border: "1px solid",
    borderColor: theme.palette.text.primary,
  },

  cartSection: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  mobileFab: {
    position: "absolute",
    bottom: "50%",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },

  appBarBottom: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      backgroundColor: theme.palette.secondary.main,
      position: "fixed",
      bottom: "0",
      width: "100%",
    },
  },

  appBar: {
    paddingTop: 10,
    paddingBottom: 10,
    transition: "500ms all",
  },

  textField: {
    backgroundColor: theme.palette.secondary.extra,
    border: "1px solid",
    borderColor: theme.palette.text.primary,

    "& .MuiFormLabel-root": {
      color: theme.palette.secondary.main,
      fontFamily: "Open Sans Condensed, sans-serif",
    },
  },

  textField1: {
    backgroundColor: theme.palette.secondary.extra,
    border: "1px solid",
    borderColor: theme.palette.text.primary,
    color: theme.palette.text.primary,
    height: "42px",
    fontFamily: "Open Sans Condensed, sans-serif",
    padding: "5px",
  },

  toogle: {
    backgroundColor: theme.palette.secondary.extra,
    color: theme.palette.text.primary,
    border: "1px solid",
    borderColor: theme.palette.text.primary,
    fontFamily: "Open Sans Condensed, sans-serif",
  },

  textPlaceholder: {
    // backgroundColor:theme.palette.secondary.extra,
    color: theme.palette.secondary.main,
    fontFamily: "Open Sans Condensed, sans-serif",

    // textTransform: "uppercase",
  },

  appBarBorder: {
    borderBottom: "1px solid #c9ab81",
  },

  appBarSolid: {
    backgroundColor: "rgba(67, 129, 168)",
  },

  formRoot: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },

  fontGilroyBold: {
    fontFamily: "Gilroy-Bold",
  },

  "@global": {
    body: {
      scrollBehavior: "auto",
    },

    ".headline::first-letter": {
      fontSize: 20,
    },

    input: {
      "&[type=number]": {
        "-moz-appearance": "textfield",
      },
      "&::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },

    ".MuiButton-outlinedPrimary": {
      color: theme.palette.text.primary,
      borderColor: theme.palette.text.primary,
    },

    // /* Chrome, Safari, Edge, Opera */
    // "input::-webkit-outer-spin-button input::-webkit-inner-spin-button": {
    //   "-webkit-appearance": "none",
    //   margin: 0,
    // },

    ".MuiFormLabel-colorSecondary": {
      color: theme.palette.secondary.main,
      fontFamily: "Open Sans Condensed, sans-serif",
    },
    // /* Firefox */
    // "input[type=number]": {
    //   "-moz-appearance": "textfield",
    // },

    ".sub-headline": {
      fontSize: 10,
      textTransform: "uppercase",
      color: "white",
    },

    ".MuiToggleButton-root.Mui-selected": {
      backgroundColor: `${
        theme.palette.type === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.dark
      } !important`,
    },
  },

  circularProgress: {
    marginLeft: "45%",
    marginTop: "15%",
    marginRight: "50%",
  },

  errorText: {
    marginLeft: "auto",
    // fontSize: 124,
    [theme.breakpoints.only("sm")]: {
      fontSize: 22,
    },
    fontFamily: "Dela Gothic One, cursive",
  },

  cuisineMenu: {
    margin: "auto",
    width: 60,
  },

  cardImage: {
    height: 250,
  },

  cuisineNameHeader: {
    marginTop: theme.spacing(5),
    // fontWeight: "bold",

    [theme.breakpoints.only("sm")]: {
      fontSize: 22,
    },
    fontFamily: "CaviarDreams_bold, sans-serif",
    // fontWeight: "bold",
    // fontWeight: "700",
    textTransform: "uppercase",

    letterSpacing: ".11em",
  },

  light: {
    position: "absolute",
    top: "80%",
    width: 400,
    left: "0%",
    right: "0%",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("md")]: {
      top: "80%",
      width: 300,
    },
    [theme.breakpoints.down("sm")]: {
      top: "85%",
    },
    [theme.breakpoints.down("xs")]: {
      top: "85%",
      width: 200,
    },
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
  },

  bigAvatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },

  input: {
    color: grey[800],
    marginRight: theme.spacing(1),
  },

  header: {
    paddingTop: theme.spacing(30),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(20),
    },

    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(10),
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(4),
    },
  },

  heading: {
    color: grey[100],
    [theme.breakpoints.down("xs")]: {
      fontSize: 32,
    },
  },

  headerText: {
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  displayNone: {
    display: "none",
  },

  grey: {
    color: grey[100],
  },

  headerImage: {
    position: "relative",
    backgroundColor: "#000",
  },

  headerImg: {
    opacity: 0.5,
    // backgroundColor: "rgba(0,0,0,0.8)",
    backgroundColor: theme.palette.secondary.extra,
  },

  heroFont: {
    position: "absolute",
    top: "20%",
    width: "100%",
    left: "0%",
    right: "0%",
    textAlign: "center",
    marginLeft: "0%",
    textShadow: "#fff 0px 1px 1px",
    fontFamily: "'Open Sans', sans-serif",
    WebkitTextStroke: "0.45px rgba(0, 0, 0, 0.1)",
    fontSmooth: "always",
    color: grey[100],

    // [theme.breakpoints.down("sm")]: {
    //   fontSize: theme.typography.h3.fontSize,
    // },

    // [theme.breakpoints.down("xs")]: {
    //   fontSize: theme.typography.h3.fontSize,
    // },
  },

  font2nd: {
    position: "absolute",
    top: "70%",
    left: "0%",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    marginLeft: "0%",
    color: grey[100],
  },

  fontBold: {
    fontWeight: "bold",
    paddingBottom: "10px",
    [theme.breakpoints.only("sm")]: {
      fontSize: 22,
    },
    fontFamily: "CaviarDreams_bold, sans-serif",
    // fontWeight: "bold",
    // fontWeight: "700",
    textTransform: "uppercase",

    letterSpacing: ".15em",
  },

  fontBold1: {
    // fontWeight: "bold",
    [theme.breakpoints.only("sm")]: {
      fontSize: 22,
    },
    fontFamily: "CaviarDreams_bold, sans-serif",
    fontWeight: "bold",
    // fontWeight: "700",
    textTransform: "uppercase",

    letterSpacing: ".20em",
  },
  fontBold2: {
    // fontWeight: "bold",
    [theme.breakpoints.only("sm")]: {
      fontSize: 22,
    },
    fontFamily: "Josefin Sans, sans-serif",
    fontWeight: 300,
    // fontWeight: "700",
    textTransform: "none",
    color: theme.palette.secondary.main,

    letterSpacing: 0,
  },
  headerBody: {
    position: "absolute",
    left: "10%",
    right: "10%",
    textAlign: "center",
    color: grey[100],
    [theme.breakpoints.up("xs")]: {
      top: "40%",
    },
    [theme.breakpoints.up("sm")]: {
      top: "45%",
    },
    [theme.breakpoints.up("md")]: {
      top: "40%",
    },
    [theme.breakpoints.up("lg")]: {
      top: "40%",
    },
  },

  chefheaderBody: {
    // position: "absolute",
    // left: "10%",
    // right: "10%",
    // textAlign: "center",
    // color: grey[100],
    // [theme.breakpoints.up("xs")]: {
    //   top: "15%",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   top: "5%",
    // },
    // [theme.breakpoints.up("md")]: {
    //   top: "10%",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   top: "10%",
    // },
  },

  rootCard: {
    maxWidth: 345,
  },

  media: {
    height: 140,
    maxWidth: 345,
  },

  fullHeight: { height: "100%" },

  erorButton: {
    color: red[800],
  },

  redButton: {
    backgroundColor: teal[400],
    color: red[900],
    display: "block",
    fontWeight: "bold",
    position: "absolute",
    top: "80%",
    left: "45%",
  },

  about1: {
    position: "relative",
  },

  mxAuto1: {
    margin: "auto",
  },

  cuisine: {
    cursor: "pointer",
    border: "1px solid",
    borderColor: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.extra,
    padding: "10px",
    margin: "auto",
    minWidth: "160px",
    minHeight: "140px",
    "&:hover": {
      backgroundColor: theme.palette.background.hover,
    },
  },

  mxAuto: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 200,
    height: 200,
  },

  sticky1: {
    position: "sticky",
    top: 100,
    alignSelf: "flex-start",
    backgroundColor: theme.palette.secondary.extra,
    padding: "30px",
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      top: 0,
      textAlign: "center",
    },
  },

  // sticky2: {
  //   position: "sticky",
  //   top: 100,
  //   boxShadow: ""
  // },

  image1: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },

  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },

  width75: {
    width: "75%",
  },

  searchButton: {
    padding: "10px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.default,
    border: "1px solid",
    borderColor: theme.palette.text.primary,
  },

  bgMain: { backgroundColor: theme.palette.background.default },

  footer: {
    backgroundColor: theme.palette.background.default,
    borderTop: "1px solid",
    borderColor: theme.palette.secondary.extra1,
  },

  divider: {
    height: 28,
    // margin: 4,
  },

  searchButton1: {
    padding: "1px 2px",
    display: "flex",
    // width: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.default,
    border: "1px solid",
    borderColor: theme.palette.text.primary,
  },

  bgSecondary: {
    background: "transparent",
    border: "1px solid",
    borderColor: theme.palette.text.primary,
    color: theme.palette.text.primary,
  },

  // myNewButton: {
  //   background: "transparent",
  //   border: "1px solid",
  //   borderColor: theme.palette.text.primary,
  //   color: theme.palette.secondary.main,
  // },

  chipList: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },

  chip: {
    margin: theme.spacing(0.5),
  },

  newColor: {
    color: theme.palette.text.primary,
  },

  animateButton: {
    "&:hover": {
      "& .MuiButton-endIcon": {
        paddingLeft: 20,
      },
    },
    "& .MuiButton-endIcon": {
      transition: "200ms all",
    },
  },

  heroSection: {
    background: `url(${headerImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  heroSectionFont: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    textShadow: "#fff 0px 1px 1px",
    fontFamily: "'Open Sans', sans-serif",
    WebkitTextStroke: "0.45px rgba(0, 0, 0, 0.1)",
    fontSmooth: "always",
    color: grey[100],
  },

  wrapper: {
    padding: 5,
  },

  mt2: {
    transform: `translateY(-5%)`,
    backgroundColor: theme.palette.secondary.extra,
  },

  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",

    // backgroundColor: theme.palette.background.paper,
  },

  gridList: {
    // height: 450,
  },

  marginSet: {
    marginBottom: "24px",
  },

  gridWrap: {
    width: "100%",
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  newBackground: {
    backgroundColor: theme.palette.secondary.extra,
    paddingBottom: "100px",
    padding: "50px",
  },

  foodItem: {
    backgroundColor: theme.palette.secondary.extra,
  },

  detail: {
    alignSelf: "center",
  },

  newBackground1: {
    backgroundColor: theme.palette.secondary.extra,
    // paddingBottom: "100px",
    paddingTop: "50px",
  },

  chefCard: {
    backgroundColor: theme.palette.secondary.extra,
    minWidth: "100px",
  },

  textHeading: {
    fontFamily: "Open Sans Condensed, sans-serif",
  },

  textItalic: {
    fontFamily: "Miniver,sans-serif",
    fontWeight: 300,
    color: theme.palette.text.primary,
  },

  textNormal: {
    fontFamily: "Josefin Sans, sans-serif",
  },

  textbutton: {
    fontFamily: "Open Sans Condensed, sans-serif",
  },

  my2: {
    marginTop: "2px",
    marginBottom: "2px",
  },

  success: {
    backgroundColor: "rgb(76, 175, 80) !important",
    color: "#000 !important",
    fontFamily: "Josefin Sans, sans-serif",
  },

  error: {
    backgroundColor: theme.palette.error.main,
    fontFamily: "Josefin Sans, sans-serif",
  },
}));

export default useStyles;
