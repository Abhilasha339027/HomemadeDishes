import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Paper,
  Snackbar,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { Search, LocationOn } from "@material-ui/icons";

import useStyles from "../../styles/GlobalStyles";
import headerImg from "../../media/headerbg.jpg";
import howItWorksData from "./Home/howItWorksData.json";
import image1 from "../../media/image1.jpg";
import image2 from "../../media/image2.jpg";
// import artboard1 from "../../media/artboard1.svg";
// import artboard2 from "../../media/artboard2.svg";
// import artboard3 from "../../media/artboard3.svg";
import FeaturedSection from "./Home/FeaturedSection";
import VerticalCarousel from "../helperComponents/VerticalCarousel";
import { data } from "./Home/data";
import Animated from "./Home/Animated";

function Home(props) {
  const classes = useStyles();
  const [zipValue, setZipValue] = useState("");
  const [error, setError] = useState(false);
  const muiTheme = useTheme();
  const history = useHistory();
  const isXs = useMediaQuery(muiTheme.breakpoints.down("xs"));

  // const zipCode = localStorage.getItem("zipCode");

  // if (zipCode && !isNaN(zipCode)) {
  //   history.push(`/chefs/zipcode/${zipCode}`);
  // }

  const handleZipInput = (e) => {
    setZipValue(e.target.value);
    setError(false);
  };

  const onRemoveError = () => setError(false);

  const handleZipSubmit = (e) => {
    e.preventDefault();
    if (!zipValue || zipValue?.length < 1) {
      setError(true);
    } else {
      setError(false);
      localStorage.setItem("zipCode", zipValue);
      history.push(`/chefs/zipcode/${zipValue}`);
    }
  };

  return (
    <>
      <Box>
        <Box
          height={700}
          className={classes.heroSection}
          background={headerImg}
          position="relative"
        >
          <Box
            pt="150px"
            className={`${classes.heroSectionFont} `}
            position="relative"
            height={300}
          >
            <Typography
              variant="h2"
              paragraph
              component="h1"
              className={`${classes.fontBold}`}
            >
              Local Chefs.
              <br />
              Homemade dishes.
              <br />
              Delivered.
            </Typography>
            <Typography
              gutterBottom
              // className={classes.font2nd}
              variant="h6"
            >
              See who's cooking in your neighborhood
            </Typography>
            <Box width="50%" mx="auto" py={10}>
              <Paper
                component="form"
                onSubmit={handleZipSubmit}
                className={`${classes.searchButton}`}
                // className={`${classes.light} ${classes.searchButton}`}
              >
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
                <InputBase
                  placeholder="Enter Zip Code"
                  onChange={handleZipInput}
                  className={classes.width75}
                  type="number"
                  value={zipValue}
                  inputProps={{
                    "aria-label": "Enter Zip Code",
                  }}
                />
                <InputAdornment position="end">
                  <Divider
                    className={classes.divider}
                    orientation="vertical"
                    color="secondary"
                  />
                  <IconButton
                    type="submit"
                    size="medium"
                    className={classes.iconButton}
                    aria-label="search"
                    color="secondary"
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              </Paper>
            </Box>
            <Snackbar
              open={error}
              autoHideDuration={3000}
              onClose={onRemoveError}
            >
              <Alert severity="error" onClose={onRemoveError}>
                Error, Please check your input
              </Alert>
            </Snackbar>
          </Box>
        </Box>
        {/* <Card className={classes.headerImage} square>
          <CardMedia
            component="img"
            className={classes.headerImg}
            alt="Food"
            height="600"
            image={headerImg}
          />
          {/* <Typography
            gutterBottom
            variant="h2"
            component="h2"
            className={classes.font}
          >
            YUMMYMAKER.COM
          </Typography> 

          <Typography
            variant="h2"
            component="h3"
            className={`${classes.heroFont} ${classes.fontBold}`}
          >
            Local Chefs.
            <br />
            Homemade dishes.
            <br />
            Delivered.
          </Typography>
          <Typography className={classes.font2nd} variant="h6">
            See who's cooking in your neighborhood
          </Typography>
          <Paper
            component="form"
            onSubmit={handleZipSubmit}
            className={`${classes.light} ${classes.searchButton}`}
          >
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
            <InputBase
              placeholder="Enter Zip Code"
              onChange={handleZipInput}
              className={classes.width75}
              type="number"
              value={zipValue}
              inputProps={{
                "aria-label": "Enter Zip Code",
              }}
            />
            <InputAdornment position="end">
              <Divider
                className={classes.divider}
                orientation="vertical"
                color="secondary"
              />
              <IconButton
                type="submit"
                size="medium"
                className={classes.iconButton}
                aria-label="search"
                color="secondary"
              >
                <Search />
              </IconButton>
            </InputAdornment>
          </Paper>
          <Snackbar
            open={error}
            autoHideDuration={3000}
            onClose={onRemoveError}
          >
            <Alert severity="error" onClose={onRemoveError}>
              Error, Please check your input
            </Alert>
          </Snackbar>
        </Card> */}
      </Box>

      <Animated data={howItWorksData} />

      {/* <Box my={10}>
        <Container>
          <Box>
            <Typography
              gutterBottom
              className={classes.fontBold}
              align="center"
              variant="h3"
            >
              How It Works
            </Typography>
          </Box>
          <Grid container spacing={3} justify="space-around">
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center">
                <Grid
                  container
                  justify="space-evenly"
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <img
                      alt="Search Box"
                      src={artboard1}
                      width={150}
                      height={150}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      component="h5"
                      className={classes.fontGilroyBold}
                      gutterBottom
                    >
                      Pick Your YummyMaker
                    </Typography>
                    <Typography align="center" variant="body1" paragraph>
                      Find your YummyMaker by category or location, select a
                      meal of your choice.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center">
                <Grid
                  container
                  justify="space-evenly"
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <img
                      alt="Search Box"
                      src={artboard2}
                      width={150}
                      height={150}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      component="h5"
                      className={classes.fontGilroyBold}
                      gutterBottom
                    >
                      Order
                    </Typography>
                    <Typography align="center" variant="body1" paragraph>
                      Order your favorite meal and pick a delivery date with
                      your prefered.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center">
                <Grid
                  container
                  justify="space-evenly"
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <img
                      alt="Search Box"
                      src={artboard3}
                      width={150}
                      height={150}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      component="h5"
                      className={classes.fontGilroyBold}
                      gutterBottom
                    >
                      Get Your Order
                    </Typography>
                    <Typography align="center" variant="body1" paragraph>
                      Connect with selected local chefs, discuss details of your
                      meal and become best buddies.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      */}
      <FeaturedSection />

      <Container>
        <Box mb={5} mt={10} position="relative">
          <Box pb={5}>
            <Typography
              variant="h3"
              className={classes.fontBold}
              align="center"
            >
              Meet Our Chefs
            </Typography>
          </Box>
          <VerticalCarousel data={data.slides} leadingText="All About" />
        </Box>
      </Container>

      <Box my={10} className={classes.about1}>
        <Container>
          <Grid container spacing={3} justify="space-around">
            <Grid item sm={6} md={4}>
              <Box className={classes.sticky1}>
                <Typography
                  // color="textPrimary"
                  component="h2"
                  variant="h5"
                  gutterBottom
                  className={classes.fontBold}
                >
                  YummyMaker
                </Typography>

                <Typography
                  paragraph
                  // variant="body1"
                  //color="white"
                  // align="justify"
                  className={classes.fontBold2}
                >
                  We understand making your own meal can be the most daunting of
                  tasks. This is why we've gone the extra-mile to source top
                  local chefs and expert cooks in your neighborhood, put them in
                  one place and made them completely accessible for you. At the
                  click of a button, you can choose a meal of your craving,
                  select a local chef that suits your taste and settle down to a
                  dining experience you'll go on to rave about for days.
                </Typography>
                <Paper
                  component="form"
                  onSubmit={handleZipSubmit}
                  className={classes.searchButton}
                >
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                  <InputBase
                    placeholder="Enter Zip Code"
                    onChange={handleZipInput}
                    type="number"
                    className={classes.width75}
                    value={zipValue}
                    inputProps={{
                      "aria-label": "Enter Zip Code",
                    }}
                  />
                  <InputAdornment position="end">
                    <Divider
                      className={classes.divider}
                      orientation="vertical"
                      color="secondary"
                    />
                    <IconButton
                      type="submit"
                      size="medium"
                      className={classes.iconButton}
                      aria-label="search"
                      color="secondary"
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                </Paper>
              </Box>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={6}>
                <img alt="Imag" width="100%" height="100%" src={image1} />
              </Grid>
            </Hidden>
          </Grid>

          <Box my={10}>
            <Grid container spacing={3} justify="space-around">
              <Hidden xsDown>
                <Grid item sm={6}>
                  <img alt="Img" width="100%" height="100%" src={image2} />
                </Grid>
              </Hidden>
              <Grid item sm={6} md={4}>
                <Box className={classes.sticky1}>
                  <Typography
                    component="h2"
                    variant="h5"
                    gutterBottom
                    className={classes.fontBold}
                  >
                    YummyMaker
                  </Typography>
                  {/* <Box
                    width="100%"
                    height={5}
                    mb={3}
                    mx={isXs ? "auto" : 0}
                    bgcolor={muiTheme.palette.secondary.main}
                  ></Box> */}
                  <Typography
                    paragraph
                    align="justify"
                    className={classes.fontBold2}
                  >
                    Your busy schedule will never again come in the way of
                    treating yourself and family to quality home-made meals that
                    suit your craving and meet your dietary need. Don't settle
                    for less when the best is just around the block. Meet a
                    local chef around you and start treating yourself to some
                    taste-bud-blowing delicacies.
                  </Typography>
                  <Paper
                    component="form"
                    onSubmit={handleZipSubmit}
                    className={classes.searchButton}
                  >
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                    <InputBase
                      placeholder="Enter Zip Code"
                      onChange={handleZipInput}
                      type="number"
                      className={classes.width75}
                      value={zipValue}
                      inputProps={{
                        "aria-label": "Enter Zip Code",
                      }}
                    />
                    <InputAdornment position="end">
                      <Divider
                        className={classes.divider}
                        orientation="vertical"
                        color="secondary"
                      />
                      <IconButton
                        type="submit"
                        size="medium"
                        className={classes.iconButton}
                        aria-label="search"
                        color="secondary"
                      >
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <div className={classes.newBackground}>
        <Container>
          <Box my={10} textAlign="center">
            <Typography
              variant="h5"
              component="h3"
              paragraph
              className={classes.fontBold}
            >
              WHY YUMMYMAKER
            </Typography>
            <Typography paragraph variant="body1" className={classes.fontBold2}>
              Yumymaker provide local chefs and expert cooks with the proper
              exposure they need to grow their practice. By simply cooking a
              meal you're good at, you can start earning extra money to bolster
              your finance.
            </Typography>
            <Typography paragraph variant="body1" className={classes.fontBold2}>
              This is the fun part. As a home chef, you get to operate
              independently, cooking delicacies for your customers right from
              your own kitchen YummyMaker also allows you be your own boss
              as you get to choose whenever and whoever you want to work with
              based on your personal preference and work schedule.
            </Typography>
          </Box>
          <Box pb={5}>
            <Paper
              className={classes.bgSecondary}
              elevation={5}
              color="secondary"
            >
              <Box py={5} textAlign="center" mx={2}>
                <Typography variant="body2" className={classes.fontBold}>
                  WORKING AT YOUR LEISURE, EARNING A LIVING AND GROWING YOUR
                  PRACTICE HAS NEVER BEEN EASIER.
                </Typography>
                <Box pt={2}>
                  <Button
                    onClick={() => props.history.push("/register-chef")}
                    color="inherit"
                    variant="outlined"
                  >
                    BECOME A YUMMYMAKER
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
          <Box py={5} textAlign="center">
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              paragraph
              className={classes.fontBold}
            >
              WE HELP CUSTOMERS GET THE BEST VALUE
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    color="textSecondary"
                    className={classes.textItalic}
                  >
                    No Cooking, No Cleaning
                  </Typography>
                  <Typography align="center" className={classes.fontBold2}>
                    With YummyMaker, you get to eat home-made food cooked
                    and packed by your local chef. This way, you can wave
                    goodbye to the challenges of cooking or the stress of
                    getting takeout.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.textItalic}
                  >
                    Convenience
                  </Typography>
                  <Typography align="center" className={classes.fontBold2}>
                    With YummyMaker, you get to eat any home-made meal of
                    your choice, whenever and wherever you want it. Our chefs
                    are committed to ensuring your absolute convenience while
                    satisfying your daily cravings.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.textItalic}
                    color="textSecondary"
                  >
                    Customized Service
                  </Typography>
                  <Typography align="center" className={classes.fontBold2}>
                    Whether you're on vegan, gluten-free, keto diet or you even
                    have certain food allergies, our YummyMakers are able to
                    customize every meal to meet your dietary and health needs.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box textAlign="center" my={5}>
            <Typography variant="h3" className={classes.fontBold}>
              Ready to order?
            </Typography>
            <Typography variant="body1" className={classes.fontBold2}>
              Dishes worth traveling for, made just a few streets away.
            </Typography>
            <Box my={3} width={isXs ? "100%" : "50%"} mx="auto">
              <Paper
                component="form"
                onSubmit={handleZipSubmit}
                className={classes.searchButton}
              >
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
                <InputBase
                  placeholder="Enter Zip Code"
                  onChange={handleZipInput}
                  className={classes.width75}
                  type="number"
                  value={zipValue}
                  inputProps={{
                    "aria-label": "Enter Zip Code",
                  }}
                />

                <InputAdornment position="end">
                  <Divider
                    className={classes.divider}
                    orientation="vertical"
                    color="secondary"
                  />
                  <IconButton
                    type="submit"
                    size="medium"
                    className={classes.iconButton}
                    aria-label="search"
                    color="secondary"
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              </Paper>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default Home;
