import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  Alert,
  Autocomplete,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
} from "@material-ui/lab";
import Image from "cloudinary-react/lib/components/Image";
import Transformation from "cloudinary-react/lib/components/Transformation";
import MuiPhoneNumber from "material-ui-phone-number";
import { Switch } from "@material-ui/core";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import LogRocket from "logrocket";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { ErrorOutline, CheckCircleOutline } from "@material-ui/icons";

import { GET_CHEF, ADD_CHEF_INFO } from "../../../queries/chef";
import {
  ADD_CONNECTED_ACCOUNT,
  LOGIN_TO_STRIPE,
  REMOVE_CONNECTED_ACCOUNT,
  VERIFY_STRIPE,
} from "../../../queries/payment";
import useStyles from "../../../styles/GlobalStyles";
import { initMap } from "../../util/getAddress";
import { cuisines } from "../../util/listOfCuisines";
import GoogleMaps from "../Checkout/SearchBox";
import { AuthContext } from "../../../contexts/auth";
import { keys } from "../../../keys";

var date = new Date();
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

function ChefProfileDetails(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { user: userContext } = useContext(AuthContext);
  const [paymentDone, setPaymentDone] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [streetAddress, setStreetAddress] = useState();
  const [errors, setErrors] = useState({});
  const history = useHistory();
  let query = queryString.parse(history.location.search);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    handle: "",
    avatar: "",
    tags: [],
    streetAddress: "",
    placeId: "",
    cuisine: [],
    deliveryFee: 0,
    deliveryDays: [],
    isAvailable: false,
    foodCertificate: "",
    stripeConnected: false,
    deliveryOption: "",
    bio: "",
  });

  const [addChefInfo] = useMutation(ADD_CHEF_INFO, {
    onError: (err) => console.log(err),
    onCompleted: (result) => {
      setIsDone(true);
    },
  });

  const [addConnectedAccount] = useMutation(ADD_CONNECTED_ACCOUNT, {
    onError: (err) => console.log(err.networkError.result),
    onCompleted: (paymentData) => {
      window.location.href = paymentData.addConnectedAccount;
    },
  });

  const [removeConnectedAccount] = useMutation(REMOVE_CONNECTED_ACCOUNT, {
    onError: (err) => console.log(err.networkError),
    update: (proxy, result) => {
      let oldData = proxy.readQuery({ query: GET_CHEF });
      setValues({ ...values, stripeConnected: false });

      let newData = proxy.writeQuery({
        query: GET_CHEF,
        data: { ...oldData, stripeConnected: false },
      });
    },
  });

  const [loginStripe] = useMutation(LOGIN_TO_STRIPE, {
    onError: (err) => console.log(err.networkError),
    onCompleted: (res) => {
      window.open(res.loginToStripe, "_blank");
    },
  });

  const { data, loading } = useQuery(GET_CHEF, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    onError: (error) => console.log(error, "Errors"),
    onCompleted: ({ getChef: { id, reviews, foodItems, ...result } }) => {
      setValues({ ...values, ...result });
    },
  });

  const [verifyStripe, { loading: verifyStripeloading }] = useLazyQuery(
    VERIFY_STRIPE,
    {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
      onError: (err) => {
        setErrors({ verifyStripe: true });
      },
      onCompleted: ({ verifyStripe }) => {
        if (verifyStripe) {
          setErrors({});
          setPaymentDone(true);
        } else {
          setErrors({ verifyStripe: "Something Went Wrong" });
        }
      },
    }
  );

  const handleImageSubmit = async (e) => {
    var file = e.target.files[0];
    let name = e.target.name;
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", keys.CLOUDINARY_KEY);
    formdata.append("upload_preset", keys.CLOUDINARY_PRESET);
    let cloudinaryURL = `https://api.cloudinary.com/v1_1/${keys.CLOUDINARY_KEY}/image/upload`;

    let res = await fetch(cloudinaryURL, {
      method: "POST",
      mode: "cors",
      body: formdata,
    });

    let json = await res.json();
    console.log(json);
    setValues({ ...values, [name]: json.public_id });
  };

  const handleCertSubmit = async (e) => {
    var file = e.target.files[0];
    let name = e.target.name;
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", keys.CLOUDINARY_KEY);
    formdata.append("upload_preset", keys.CLOUDINARY_PRESET);
    let cloudinaryURL = `https://api.cloudinary.com/v1_1/${keys.CLOUDINARY_KEY}/image/upload`;

    let res = await fetch(cloudinaryURL, {
      method: "POST",
      mode: "cors",
      body: formdata,
    });

    let json = await res.json();
    setValues({ ...values, [name]: json.public_id });
  };

  const handleDateChange = (date) => {
    if (date) {
      let [month, d, year] = date?.toLocaleDateString("en-US")?.split("/");

      if (month && d && year) {
        setValues((prevState) => ({
          ...values,
          deliveryDays: [...prevState.deliveryDays, `${month}, ${d}, ${year}`],
        }));
      }
    }
  };

  const handleDeleteDate = (index) => {
    let prevState = [...values.deliveryDays];
    prevState.splice(index, 1);
    setValues({ ...values, deliveryDays: prevState });
  };

  const handleChangePhone = (value) => setValues({ ...values, phone: value });

  const onSubmit = (e) => {
    e.preventDefault();

    addChefInfo({ variables: { ...values } });
  };

  const changeAvailability = () => {
    setValues({ ...values, isAvailable: !values.isAvailable });
  };

  useEffect(() => {
    if (values?.placeId && !loading) {
      initMap("maps", values.placeId, (result) =>
        setStreetAddress(result.formatted_address)
      );
    }
  }, [values.placeId, loading]);

  useEffect(() => {
    if (query.status === "complete") {
      verifyStripe();
    }
  }, [query.status]);

  const onChangeZip = (data) => {
    setValues({
      ...values,
      streetAddress: data.description,
      placeId: data.place_id,
    });
  };

  const handleDeliveryOption = (e, newOption) => {
    setValues({ ...values, deliveryOption: newOption });
  };

  const handleAddTags = (chip) => {
    setValues((prevState) => ({
      ...values,
      tags: [...prevState.tags, chip],
    }));
  };

  const handleDelTags = (chip, index) => {
    let prevState = [...values.tags];
    prevState.splice(index, 1);
    setValues({ ...values, tags: prevState });
  };

  const onCuisineChange = (e, chip) => {
    if (!values.cuisine.includes(chip)) {
      setValues({ ...values, cuisine: chip });
    }
  };

  const handleCuisineDelete = (chip, index) => {
    let prevState = [...values.cuisine];
    prevState.splice(index, 1);
    setValues({ ...values, cuisine: prevState });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const addBank = () => {
    addConnectedAccount();
  };

  const loginToStripe = () => {
    loginStripe();
  };

  const removeBankAccount = () => {
    removeConnectedAccount();
  };

  const handleClose = () => {
    setErrors({});
    setPaymentDone(false);
  };

  return (
    <Box py={2}>
      {loading ? (
        <Container>
          <Box display="block" height={200} mx="auto" width={200}>
            <Skeleton component={Box} variant="circle" height="100%" />
          </Box>
          <Box py={2}>
            <Skeleton variant="rect" width="100%" height={300} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="rect" width="100%" height={600} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="rect" width="100%" height={600} />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <form onSubmit={onSubmit}>
          <Container>
            <Typography
              gutterBottom
              align="center"
              className={classes.fontBold2}
            >
              Profile Picture
            </Typography>
            <Box mx="auto" height="300px" width="300px">
              <Box>
                <Box mx="auto" my={2} width="200px" height="200px">
                  {values?.avatar ? (
                    <Image
                      publicId={`${values?.avatar}.png`}
                      cloudName="defivdghh"
                      secure="true"
                    >
                      <Transformation
                        width="200"
                        height="200"
                        radius="max"
                        gravity="face"
                        crop="thumb"
                      />
                    </Image>
                  ) : (
                    <Avatar
                      className={`${classes.mxWidth} ${classes.mxHeight}`}
                    >
                      {userContext.firstName[0]}
                    </Avatar>
                  )}
                </Box>

                <Box position="relative" width="100%">
                  <input
                    accept="image/*"
                    name="avatar"
                    className={classes.uploadInput}
                    id="contained-button-file"
                    onChange={handleImageSubmit}
                    type="file"
                  />

                  <label htmlFor="contained-button-file">
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      component="span"
                    >
                      Upload your Avatar
                    </Button>
                  </label>
                </Box>
              </Box>
            </Box>

            <Box position="relative">
              <Container>
                <Paper>
                  <Box
                    height={300}
                    width="100%"
                    color="#000"
                    className={classes.foodItem}
                  >
                    <Box id="maps" width="100%" height="100%"></Box>
                  </Box>
                </Paper>

                <Box py={2}>
                  <Grid container spacing={3} alignItems="stretch">
                    <Grid item xs={12} sm={6}>
                      <Paper component={Box} height="100%">
                        <Box py={2} className={classes.foodItem} height="100%">
                          <Container maxWidth="xl">
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  name="firstName"
                                  value={values.firstName}
                                  label="First Name"
                                  variant="filled"
                                  fullWidth
                                  color="secondary"
                                  onChange={(e) => onChange(e)}
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                  className={classes.textField}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  name="lastName"
                                  value={values.lastName}
                                  fullWidth
                                  color="secondary"
                                  variant="filled"
                                  label="Last Name"
                                  onChange={(e) => onChange(e)}
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                  className={classes.textField}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  name="email"
                                  value={values.email}
                                  label="Email"
                                  fullWidth
                                  type="email"
                                  inputMode="email"
                                  color="secondary"
                                  variant="filled"
                                  onChange={(e) => onChange(e)}
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                  className={classes.textField}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  name="handle"
                                  value={values.handle}
                                  variant="filled"
                                  color="secondary"
                                  fullWidth
                                  label="Handle"
                                  onChange={(e) => onChange(e)}
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                  className={classes.textField}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <GoogleMaps
                                  onChange={(e) => onChangeZip(e)}
                                  // error={errors?.streetAddress ? true : false}
                                  value={streetAddress}
                                ></GoogleMaps>
                                {/* <TextField label="Street Address" /> */}
                              </Grid>

                              <Grid item xs={12}>
                                <MuiPhoneNumber
                                  defaultCountry={"us"}
                                  name="phone"
                                  fullWidth
                                  label="Phone Number"
                                  // {...(errors?.phone ? { helperText: errors.phone } : "")}
                                  onChange={handleChangePhone}
                                  color="secondary"
                                  // error={errors?.phone ? true : false}
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
                              </Grid>
                              <Grid item xs={12}>
                                <Box py={2}>
                                  <Typography
                                    variant="h6"
                                    className={classes.fontBold}
                                  >
                                    Bio
                                  </Typography>
                                  <Typography
                                    paragraph
                                    className={classes.fontBold2}
                                  >
                                    Introduce youself, Tell your customers about
                                    your story.
                                  </Typography>
                                  <TextField
                                    name="bio"
                                    className={classes.textField}
                                    value={values.bio}
                                    variant="filled"
                                    fullWidth
                                    color="secondary"
                                    multiline
                                    rows={6}
                                    helperText={`${
                                      values.bio ? values.bio.length : 0
                                    }/800`}
                                    label="Bio"
                                    onChange={(e) => onChange(e)}
                                    InputLabelProps={{
                                      classes: {
                                        root: classes.textPlaceholder,
                                      },
                                    }}
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                {!values.foodCertificate ? (
                                  <>
                                    <input
                                      accept="application/pdf"
                                      name="foodCertificate"
                                      className={classes.uploadInput}
                                      id="food-safety-cert"
                                      onChange={handleImageSubmit}
                                      type="file"
                                    />

                                    <label htmlFor="food-safety-cert">
                                      <Button
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        component="span"
                                      >
                                        Upload your Food Safety Certificate
                                      </Button>
                                    </label>
                                  </>
                                ) : (
                                  <Button
                                    disabled
                                    variant="contained"
                                    className={classes.success}
                                    color="secondary"
                                  >
                                    Certificate has been added
                                  </Button>
                                )}
                              </Grid>
                            </Grid>
                          </Container>
                        </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper component={Box} height="100%">
                        <Box py={4} className={classes.foodItem} height="100%">
                          <Container>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="h6"
                                  className={classes.fontBold}
                                  gutterBottom
                                >
                                  Select your Availability
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className={classes.fontBold2}
                                >
                                  If you enable this, your profile will be
                                  disabled and you won't come in search results.
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={values.isAvailable}
                                      onChange={changeAvailability}
                                      name="isAvailable"
                                    />
                                  }
                                  label="Are you currently available for orders ?"
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Typography className={classes.fontBold2}>
                                  Select the dates you will be available
                                </Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  {/* <DatePicker
                                fullWidth
                                // value={values.deliverydays}
                                onChange={handleChange}
                                InputProps={{
                                  inputProps: { max: "2021-2-10" },
                                }}
                              /> */}
                                  <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Add delivery dates"
                                    // error={errors?.deliveryDays ? true : false}
                                    format="MM/dd"
                                    size="medium"
                                    views={["date"]}
                                    disablePast
                                    maxDate={lastDay}
                                    openTo="year"
                                    color="secondary"
                                    fullWidth
                                    value={
                                      values.deliveryDays.length > 0
                                        ? values?.deliveryDays[
                                            values?.deliveryDays?.length - 1
                                          ]
                                        : new Date().toISOString()
                                    }
                                    DialogProps={{
                                      PaperProps: {
                                        color: "secondary",
                                        elevation: 5,
                                      },
                                    }}
                                    inputVariant="filled"
                                    onChange={handleDateChange}
                                    showTodayButton
                                    SelectProps={{ color: "secondary" }}
                                    inputProps={{
                                      color: "secondary",
                                      contentEditable: "false",
                                    }}
                                    leftArrowButtonProps={{
                                      color: "primary",
                                    }}
                                    rightArrowButtonProps={{
                                      color: "secondary",
                                    }}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                    InputLabelProps={{
                                      classes: {
                                        root: classes.textPlaceholder,
                                      },
                                    }}
                                    className={classes.textField}
                                  />
                                </MuiPickersUtilsProvider>

                                {values.deliveryDays.length > 0 && (
                                  <Paper
                                    elevation={5}
                                    component="ul"
                                    className={classes.chipList}
                                  >
                                    {values.deliveryDays.map((day, index) => (
                                      <li key={index}>
                                        <Chip
                                          label={day}
                                          className={classes.chip}
                                          color="secondary"
                                          onDelete={(index) =>
                                            handleDeleteDate(index)
                                          }
                                        />
                                      </li>
                                    ))}
                                  </Paper>
                                )}
                              </Grid>

                              <Grid item xs={12}>
                                <Typography
                                  variant="h6"
                                  className={classes.fontBold2}
                                >
                                  Add other info
                                </Typography>
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
                              </Grid>
                              {/* 
                              <Grid item xs={12}>
                                <ChipInput
                                  value={values.tags}
                                  onChange={handleAddTags}
                                  name="tags"
                                  variant="filled"
                                  label="Profile Tags"
                                  fullWidth
                                  // {...(errors?.dietary ? { helperText: errors.dietary } : "")}
                                  // error={errors?.dietary ? true : false}
                                  color="secondary"
                                  chipRenderer={(chip) => {
                                    return (
                                      <Chip
                                        value={chip.text}
                                        color="secondary"
                                        variant="outlined"
                                        size="small"
                                        className={classes.chip}
                                        key={chip.value}
                                        label={chip.value}
                                        onDelete={handleDelTags}
                                      />
                                    );
                                  }}
                                  onDelete={(chip, index) =>
                                    handleDelTags(chip, index)
                                  }
                                  onAdd={(chips) => handleAddTags(chips)}
                                /> */}
                              {/* <TextField
                                  name="cuisine"
                                  value={values.cuisine}
                                  onChange={onChange}
                                  label="Cuisine"
                                  fullWidth
                                  variant="filled"
                                /> */}
                              {/* </Grid> */}

                              <Grid item xs={12}>
                                <TextField
                                  name="deliveryFee"
                                  value={values.deliveryFee}
                                  onChange={onChange}
                                  color="secondary"
                                  fullWidth
                                  variant="filled"
                                  type="number"
                                  inputMode="numeric"
                                  label="Delivery Fee"
                                  InputLabelProps={{
                                    classes: {
                                      root: classes.textPlaceholder,
                                    },
                                  }}
                                  className={classes.textField}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Typography
                                  className={classes.fontBold2}
                                  gutterBottom
                                >
                                  Are you delivering or pickup?
                                </Typography>
                                <ToggleButtonGroup
                                  value={values.deliveryOption}
                                  exclusive
                                  onChange={handleDeliveryOption}
                                  aria-label="Delivery Option"
                                  color="secondary"
                                >
                                  <ToggleButton
                                    color="secondary"
                                    value="delivery"
                                    aria-label="Delivery"
                                    style={{
                                      color: theme.palette.text.primary,
                                      fontFamily:
                                        "Open Sans Condensed, sans-serif",
                                    }}
                                  >
                                    Delivery
                                  </ToggleButton>
                                  <ToggleButton
                                    value="pickup"
                                    aria-label="Pickup"
                                    style={{
                                      color: theme.palette.text.primary,
                                      fontFamily:
                                        "Open Sans Condensed, sans-serif",
                                    }}
                                  >
                                    Pickup
                                  </ToggleButton>
                                </ToggleButtonGroup>
                              </Grid>
                              <Grid item xs={12}>
                                {values.stripeConnected ? (
                                  <Box>
                                    <Button
                                      fullWidth
                                      className={`${classes.success} ${classes.my2}`}
                                      variant="contained"
                                      onClick={loginToStripe}
                                      endIcon={
                                        <CheckCircleOutline size="large" />
                                      }
                                    >
                                      Login To Connected Stripe
                                    </Button>
                                    <Button
                                      fullWidth
                                      onClick={removeBankAccount}
                                      className={`${classes.error} ${classes.my2}`}
                                      variant="contained"
                                      endIcon={<ErrorOutline />}
                                    >
                                      Remove Bank Account
                                    </Button>
                                  </Box>
                                ) : (
                                  <Button
                                    color="primary"
                                    fullWidth
                                    onClick={addBank}
                                    variant="contained"
                                  >
                                    Connect Bank Account
                                  </Button>
                                )}
                              </Grid>
                            </Grid>
                          </Container>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Box py={2}>
                    <Button
                      color="primary"
                      fullWidth
                      style={{ zIndex: 1 }}
                      onSubmit={onSubmit}
                      variant="outlined"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Container>
        </form>
      )}

      <Snackbar
        open={errors.verifyStripe}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Oops, Something Went Wrong. Please try adding bank later
        </Alert>
      </Snackbar>

      <Snackbar
        open={paymentDone}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Bank Account added...
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ChefProfileDetails;
