import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Slide,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import { Alert, Autocomplete } from "@material-ui/lab";
import { Close } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import useStyles from "../../../../styles/GlobalStyles";
import registerMainImg from "../../../../media/registerMain.jpg";
import { useForm } from "../../../util/hooks/hooks";
import { APPLY_FOR_CHEF } from "../../../../queries/user";
import Loader from "../../../util/Loader";
import ChefApplicationStepper from "./ChefApplicationStepper";
import { ChefFormContextProvider } from "../../../../contexts/chefApplicationForm";
import { cuisines } from "../../../util/listOfCuisines";
import { AuthContext } from "../../../../contexts/auth";
import { useHistory } from "react-router-dom";
import WhyDetails from "./DetailsList";

function RegisterChef(props) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const history = useHistory();
  const theme = useTheme();
  const authContext = useContext(AuthContext);

  const { onChange, onSubmit, setValue, values } = useForm(applyChef, {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    handle: "",
    phone: "",
    zipCode: "",
    cuisine: [],
  });

  const [applyForChef, { loading }] = useMutation(APPLY_FOR_CHEF, {
    variables: { ...values },
    update: (proxy, result) => {
      authContext.login(result.data.applyForChef);
      setIsApplicationOpen(true);
    },

    onError: (err) => {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
    },
  });

  function applyChef() {
    setErrors({});
    if (!isNaN(parseInt(values.zipCode))) {
      applyForChef();
    } else {
      setErrors({ ...errors, zipCode: "Please Enter a valid Zip Code" });
    }
  }

  const handleChangePhone = (value) => setValue("phone", value);

  const handleClose = () => setErrors({});

  const onCuisineChange = (e, chip) => {
    if (!values.cuisine.includes(chip)) {
      setValue("cuisine", chip);
    }
  };

  const handleCuisineDelete = (chip, index) => {
    let prevState = [...values.cuisine];
    prevState.splice(index, 1);
    setValue("cuisine", prevState);
  };

  const handleCloseApplication = () => setIsApplicationOpen(false);

  const handleApplicationOpen = () => {
    history.go();
    setIsApplicationOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={classes.newBackground1}>
        {/* <Box my={10}>
          <Container>
          <Box>
          <Typography align="center" gutterBottom variant="h4">
                WHY BECOME A YUMMYMAKER
              </Typography>
            </Box> */}
        {/* <Box pt={2} textAlign="center">
              <Grid container spacing={3}>
                <Grid item xs={6} sm={2} md={4}>
                  <Box>
                    <AttachMoney color="error" fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h6" gutterBottom>
                      MAKE EXTRA MONEY
                    </Typography>
                  </Box>
                  <Box>
                    <Typography paragraph variant="body1">
                      While doing what they're passionate about, Yummymaker.com
                      has helped a number of local chefs create extra source of
                      income.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={2} md={4}>
                  <Box>
                    <AttachMoney color="error" fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h6" gutterBottom>
                      CONTROL YOUR OWN SCHEDULE
                    </Typography>
                  </Box>
                  <Box>
                    <Typography paragraph variant="body1">
                      With Yummymaker.com, you become your own boss. You get to
                      choose when you work based on your personal schedule and
                      who you want to work with.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={2} md={4}>
                  <Box>
                    <AttachMoney color="error" fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h6" gutterBottom>
                      EXPAND YOUR CRAFT
                    </Typography>
                  </Box>
                  <Box>
                    <Typography paragraph variant="body1">
                      Connect with new clients on Yummymaker.com to give your
                      business the exposure it needs and boost your sales.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={2} md={4}>
                  <Box>
                    <AttachMoney color="error" fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h6" gutterBottom>
                      FREE STORE MANAGER
                    </Typography>
                  </Box>
                  <Box>
                    <Typography paragraph variant="body1">
                      With an easy to operate platform and excellent store
                      management system, your culinary business is sure to
                      thrive on Yummymaker.com.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={2} md={4}>
                  <Box>
                    <AttachMoney color="error" fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h6" gutterBottom>
                      UNLIMITED POSTING
                    </Typography>
                  </Box>
                  <Box>
                    <Typography paragraph variant="body1">
                      We provide local chefs with unlimited posting, placing you
                      right in front of your target audience and customers who
                      need your specific service.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={2} md={4}>
                  <Box>
                    <AttachMoney color="error" fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h6" gutterBottom>
                      LOW SERVICE FEE
                    </Typography>
                  </Box>
                  <Box>
                    <Typography paragraph variant="body1">
                      With a fair pricing system and no hidden charges, we
                      charge as low as 20% on every sales you make.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box> */}
        {/* </Container>
        </Box> */}

        <div className={classes.bgMain}>
          <Container>
            <Box mb={5} style={{ paddingTop: "60px" }}>
              <Typography
                variant="h3"
                component="h5"
                align="center"
                className={classes.fontBold}
              >
                WHY BECOME A YUMMYMAKER ?
              </Typography>
            </Box>
            <Box style={{ paddingBottom: "60px" }}>
              <div>
                <WhyDetails />
              </div>
            </Box>
          </Container>
        </div>

        <div>
          <Container>
            <Box className={classes.chefheaderBody} mt={8}>
              <Typography
                align="center"
                paragraph
                variant="h5"
                className={classes.fontBold}
                component="p"
                color="secondary"
              >
                Are you a trained Chef, a personal Chef or an expert cook? Are
                you passionate about cooking for people? If any of these sounds
                like you, let's help you turn your passion into profits.
              </Typography>

              {/* 
                  <Grid item xs={12} md={6}>
                    <div>
                      <Paper
                        style={
                          isXs
                            ? { backgroundColor: theme.palette.secondary.extra }
                            : { backgroundColor: "transparent" }
                        }
                        elevation={5}
                      >
                        <Box px={2} py={2}>
                          <Typography
                            align="left"
                            paragraph
                            variant="h5"
                            component="p"
                          
                            className={classes.fontBold2}
                            color="secondary"
                          >
                            Become an accredited local chef on our website and
                            start connecting with buyers in your locale.
                          </Typography>
                          <form onSubmit={onSubmit}>
                            <Box my={1}>
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Paper className={classes.bgMain}>
                                    <TextField
                                      fullWidth
                                      variant="filled"
                                      error={errors?.firstName ? true : false}
                                      value={values.firstName}
                                      onChange={onChange}
                                      label="First Name"
                                      name="firstName"
                                      color="secondary"
                                      InputLabelProps={{
                                        classes: {
                                          root: classes.textPlaceholder,
                                        },
                                      }}
                                      className={classes.textField}
                                    />
                                  </Paper>
                                </Grid>

                                <Grid item xs={6}>
                                  <Paper className={classes.bgMain}>
                                    <TextField
                                      fullWidth
                                      variant="filled"
                                      error={errors?.lastName ? true : false}
                                      value={values.lastName}
                                      onChange={onChange}
                                      label="Last Name"
                                      name="lastName"
                                      color="secondary"
                                      InputLabelProps={{
                                        classes: {
                                          root: classes.textPlaceholder,
                                        },
                                      }}
                                      className={classes.textField}
                                    />
                                  </Paper>
                                </Grid>
                              </Grid>
                            </Box>

                            <Box my={1}>
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Paper className={classes.bgMain}>
                                    <TextField
                                      fullWidth
                                      label="Email"
                                      name="email"
                                      error={errors?.email ? true : false}
                                      value={values.email}
                                      onChange={onChange}
                                      variant="filled"
                                      color="secondary"
                                      InputLabelProps={{
                                        classes: {
                                          root: classes.textPlaceholder,
                                        },
                                      }}
                                      className={classes.textField}
                                    />
                                  </Paper>
                                </Grid>

                                <Grid item xs={6}>
                                  <Paper className={classes.bgMain}>
                                    <TextField
                                      fullWidth
                                      label="Handle"
                                      name="handle"
                                      error={errors?.handle ? true : false}
                                      value={values.handle}
                                      onChange={onChange}
                                      variant="filled"
                                      color="secondary"
                                      InputLabelProps={{
                                        classes: {
                                          root: classes.textPlaceholder,
                                        },
                                      }}
                                      className={classes.textField}
                                    />
                                  </Paper>
                                </Grid>
                              </Grid>
                            </Box>

                            <Box my={1}>
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Paper className={classes.bgMain}>
                                    <TextField
                                      fullWidth
                                      variant="filled"
                                      error={errors?.password ? true : false}
                                      value={values.password}
                                      onChange={onChange}
                                      type="password"
                                      label="Password"
                                      name="password"
                                      color="secondary"
                                      InputLabelProps={{
                                        classes: {
                                          root: classes.textPlaceholder,
                                        },
                                      }}
                                      className={classes.textField}
                                    />
                                  </Paper>
                                </Grid>

                                <Grid item xs={6}>
                                  <Paper className={classes.bgMain}>
                                    <TextField
                                      fullWidth
                                      variant="filled"
                                      error={
                                        errors?.confirmPassword ? true : false
                                      }
                                      value={values.confirmPassword}
                                      onChange={onChange}
                                      type="password"
                                      label="Confirm Password"
                                      name="confirmPassword"
                                      color="secondary"
                                      InputLabelProps={{
                                        classes: {
                                          root: classes.textPlaceholder,
                                        },
                                      }}
                                      className={classes.textField}
                                    />
                                  </Paper>
                                </Grid>
                              </Grid>
                            </Box>

                            <Box my={1}>
                              <Paper className={classes.bgMain}>
                                <Autocomplete
                                  multiple
                                  id="tags-standard"
                                  options={cuisines}
                                  value={values.cuisine}
                                  color="secondary"
                                  onChange={onCuisineChange}
                                  renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                      <Chip
                                        variant="outlined"
                                        color="secondary"
                                        label={option}
                                        {...getTagProps({ index })}
                                        onDelete={() =>
                                          handleCuisineDelete(option, index)
                                        }
                                        InputLabelProps={{
                                          classes: {
                                            root: classes.textPlaceholder,
                                          },
                                        }}
                                        className={classes.textField}
                                      />
                                    ))
                                  }
                                  getOptionLabel={(option) => option}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="filled"
                                      label="Cuisine"
                                      color="secondary"
                                      placeholder="Indian, Chinese"
                                      InputLabelProps={{
                                        classes: {
                                          root: classes.textPlaceholder,
                                        },
                                      }}
                                      className={classes.textField}
                                    />
                                  )}
                                />
                              </Paper>
                            </Box>
                            <Box my={1}>
                              <Paper className={classes.bgMain}>
                                <TextField
                                  fullWidth
                                  label="Zip Code"
                                  name="zipCode"
                                  error={errors?.zipCode ? true : false}
                                  value={values.zipCode}
                                  onChange={onChange}
                                  variant="filled"
                                  color="secondary"
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                  className={classes.textField}
                                />
                              </Paper>
                            </Box>
                            <Box my={1}>
                              <Paper className={classes.bgMain}>
                                <MuiPhoneNumber
                                  defaultCountry={"us"}
                                  name="phone"
                                  label="Phone Number"
                                  onChange={handleChangePhone}
                                  color="secondary"
                                  fullWidth
                                  error={errors?.phone ? true : false}
                                  value={values.phone}
                                  variant="filled"
                                  onlyCountries={["us"]}
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                  className={classes.textField}
                                />
                              </Paper>
                            </Box>
                            <Box mt={1}>
                              <Button
                                color="secondary"
                                fullWidth
                                type="submit"
                                variant="contained"
                              >
                                Apply
                              </Button>
                            </Box>
                          </form>
                        </Box>
                      </Paper>
                    </div>
                  </Grid> */}
            </Box>
          </Container>
        </div>

        <div>
          <Box my={2} mt={isXs ? 20 : 10}>
            <Container>
              <Grid
                container
                alignContent="center"
                justify="center"
                spacing={4}
              >
                <Grid item xs={12} sm={6}>
                  <Box
                    width="90%"
                    mx="auto"
                    px={4}
                    py={4}
                    position="sticky"
                    top={100}
                    style={{ boxShadow: "2px 2px 8px #000" }}
                  >
                    <Typography
                      gutterBottom
                      align="center"
                      variant="h5"
                      component="h2"
                      className={classes.fontBold1}
                    >
                      Apply for chef
                    </Typography>

                    <Typography
                      align="left"
                      paragraph
                      variant="h5"
                      component="p"
                      className={classes.fontBold2}
                      color="secondary"
                    >
                      Become an accredited local chef on our website and start
                      connecting with buyers in your locale.
                    </Typography>

                    <form onSubmit={onSubmit}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Paper className={classes.textField}>
                            <TextField
                              fullWidth
                              variant="filled"
                              error={errors?.firstName ? true : false}
                              value={values.firstName}
                              onChange={onChange}
                              label="First Name"
                              name="firstName"
                              color="secondary"

                              // color="secondary"
                              // InputLabelProps={{
                              //   className: classes.textPlaceholder,
                              // }}
                              // InputLabelProps={{
                              //   classes: {
                              //     root: classes.textPlaceholder,
                              //   },
                              // }}
                            />
                          </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Paper className={classes.textField}>
                            <TextField
                              fullWidth
                              variant="filled"
                              error={errors?.lastName ? true : false}
                              value={values.lastName}
                              onChange={onChange}
                              label="Last Name"
                              name="lastName"
                              color="secondary"
                            />
                          </Paper>
                        </Grid>
                      </Grid>

                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Paper className={classes.textField}>
                            <TextField
                              fullWidth
                              label="Email"
                              name="email"
                              error={errors?.email ? true : false}
                              value={values.email}
                              onChange={onChange}
                              variant="filled"
                              color="secondary"
                            />
                          </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Paper className={classes.textField}>
                            <TextField
                              fullWidth
                              label="Handle"
                              name="handle"
                              error={errors?.handle ? true : false}
                              value={values.handle}
                              onChange={onChange}
                              variant="filled"
                              color="secondary"
                            />
                          </Paper>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Paper className={classes.textField}>
                            <TextField
                              fullWidth
                              variant="filled"
                              error={errors?.password ? true : false}
                              value={values.password}
                              onChange={onChange}
                              type="password"
                              label="Password"
                              name="password"
                              color="secondary"
                            />
                          </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Paper className={classes.textField}>
                            <TextField
                              fullWidth
                              variant="filled"
                              error={errors?.confirmPassword ? true : false}
                              value={values.confirmPassword}
                              onChange={onChange}
                              type="password"
                              label="Confirm Password"
                              name="confirmPassword"
                              color="secondary"
                            />
                          </Paper>
                        </Grid>
                      </Grid>

                      <Box my={1}>
                        <Paper className={classes.textField}>
                          {/* <TextField
                            fullWidth
                            variant="filled"
                            error={errors?.cuisine ? true : false}
                            value={values.cuisine}
                            onChange={onChange}
                            label="Cuisine"
                            name="cuisine"
                            color="secondary"
                          /> */}
                          <Autocomplete
                            multiple
                            id="tags-standard"
                            options={cuisines}
                            value={values.cuisine}
                            color="secondary"
                            onChange={onCuisineChange}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  color="secondary"
                                  label={option}
                                  {...getTagProps({ index })}
                                  onDelete={() =>
                                    handleCuisineDelete(option, index)
                                  }
                                />
                              ))
                            }
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="filled"
                                label="Cuisine"
                                color="secondary"
                                placeholder="Indian, Chinese"
                              />
                            )}
                          />
                        </Paper>
                      </Box>
                      <Box my={1}>
                        <Paper className={classes.textField}>
                          <TextField
                            fullWidth
                            label="Zip Code"
                            name="zipCode"
                            error={errors?.zipCode ? true : false}
                            value={values.zipCode}
                            onChange={onChange}
                            variant="filled"
                            color="secondary"
                          />
                        </Paper>
                      </Box>
                     
                      <Box mt={1}>
                        <Button
                          color="secondary"
                          fullWidth
                          type="submit"
                          variant="outlined"
                        >
                          Apply
                        </Button>
                      </Box>
                      {/* <Box my={1}>
                        <Paper className={classes.bgMain}>
                          <TextField
                            fullWidth
                            variant="filled"
                            error={errors?.name ? true : false}
                            value={values.name}
                            onChange={onChange}
                            label="Name"
                            name="name"
                            color="secondary"
                            InputLabelProps={{
                              classes: {
                                root: classes.textPlaceholder,
                              },
                            }}
                            className={classes.textField}
                          />
                        </Paper>
                      </Box>

                      <Box my={1}>
                        <Paper className={classes.bgMain}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            error={errors?.email ? true : false}
                            value={values.email}
                            onChange={onChange}
                            variant="filled"
                            color="secondary"
                            InputLabelProps={{
                              classes: {
                                root: classes.textPlaceholder,
                              },
                            }}
                            className={classes.textField}
                          />
                        </Paper>
                      </Box>

                      <Box my={1}>
                        <Paper className={classes.bgMain}>
                          <Autocomplete
                            multiple
                            id="tags-standard"
                            options={cuisines}
                            value={values.cuisine}
                            color="secondary"
                            onChange={onCuisineChange}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  color="secondary"
                                  label={option}
                                  {...getTagProps({ index })}
                                  onDelete={() =>
                                    handleCuisineDelete(option, index)
                                  }
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                  className={classes.textField}
                                />
                              ))
                            }
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="filled"
                                label="Cuisine"
                                placeholder="Indian, Chinese"
                                InputLabelProps={{
                                  classes: {
                                    root: classes.textPlaceholder,
                                  },
                                }}
                                className={classes.textField}
                              />
                            )}
                          />
                        </Paper>
                      </Box>
                      <Box my={1}>
                        <Paper className={classes.bgMain}>
                          <TextField
                            fullWidth
                            label="Zip Code"
                            name="zipCode"
                            error={errors?.zipCode ? true : false}
                            value={values.zipCode}
                            onChange={onChange}
                            variant="filled"
                            type="number"
                            color="secondary"
                            InputLabelProps={{
                              classes: {
                                root: classes.textPlaceholder,
                              },
                            }}
                            className={classes.textField}
                          />
                        </Paper>
                      </Box>
                      <Box my={1}>
                        <Paper className={classes.bgMain}>
                          <MuiPhoneNumber
                            defaultCountry={"us"}
                            name="phone"
                            label="Phone Number"
                            onChange={handleChangePhone}
                            color="secondary"
                            fullWidth
                            error={errors?.phone ? true : false}
                            value={values.phone}
                            variant="filled"
                            onlyCountries={["us"]}
                            InputLabelProps={{
                              classes: {
                                root: classes.textPlaceholder,
                              },
                            }}
                            className={classes.textField}
                          />
                        </Paper>
                      </Box>
                      <Box mt={1}>
                        <Button
                          color="secondary"
                          fullWidth
                          type="submit"
                          variant="outlined"
                        >
                          Apply
                        </Button>
                      </Box> */}
                    </form>
                  </Box>
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={6}>
                    <img
                      src={registerMainImg}
                      alt="Register"
                      className={classes.mxWidth}
                    />
                  </Grid>
                </Hidden>
              </Grid>
            </Container>
          </Box>
        </div>

        <Box className={classes.newBackground1}>
          <Dialog
            fullScreen
            open={isApplicationOpen}
            onClose={handleClose}
            TransitionComponent={Slide}
            TransitionProps={{ direction: "up" }}
            // overlayStyle={{ backgroundColor: "white" }}
            // color="inherit"
            // className={classes.newBackground1}
            PaperProps={{
              style: {
                backgroundColor: theme.palette.secondary.extra,
              },
            }}
          >
            <AppBar className={(classes.appBar, classes.fontBold)}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseApplication}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
                <Typography variant="h6">Chef Application</Typography>
              </Toolbar>
            </AppBar>
            <Box>
              <Box textAlign="center" pt={10} mt={8}>
                <Typography variant="h3" className={classes.fontBold}>
                  Your Application
                </Typography>
              </Box>

              <Box py={2}>
                <Divider />
              </Box>
              <Box>
                <ChefFormContextProvider>
                  <ChefApplicationStepper
                    handleApplicationOpen={handleApplicationOpen}
                  />
                </ChefFormContextProvider>
              </Box>
            </Box>
          </Dialog>
        </Box>
        <div className={classes.newBackground1}>
          <Snackbar
            open={errors && Object.keys(errors)?.length > 0 ? true : false}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            onClose={handleClose}
            className={classes.newBackground1}
          >
            <Alert severity="error" onClose={handleClose}>
              {errors &&
                Object.values(errors).map((error) => (
                  <Typography key={error}>{error}</Typography>
                ))}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}

export default RegisterChef;
