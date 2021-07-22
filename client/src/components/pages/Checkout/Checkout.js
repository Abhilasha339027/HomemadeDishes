import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slide,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { CloseIcon } from "@material-ui/data-grid";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useRouteMatch } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import MuiPhoneNumber from "material-ui-phone-number";
import { Rating } from "@material-ui/lab";

import { ADD_ORDER } from "../../../queries/order";
import GoogleMaps from "./SearchBox";
import { ADD_REVIEW } from "../../../queries/chef";
import Loader from "../../util/Loader";
import { GET_MISC } from "../../../queries/misc";
import { CartContext } from "../../../contexts/cartContext";
import { PrefContext } from "../../../contexts/preff";
import { calculateBill } from "../../util/calculateBill";
import useStyles from "../../../styles/GlobalStyles";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function Checkout() {
  const [dishData, setDishData] = useState({
    streetAddress: "",
    addressLine2: "",
    deliveryDate: "",
    deliveryInstructions: "",
    name: "",
    phone: "",
  });
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();
  const theme = useTheme();
  const { mainCart } = useContext(CartContext);
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");
  const [hover, setHover] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const name = match.params.name;
  const { pref, changePref } = useContext(PrefContext);

  let orderItems = [];
  let pricePerItem = [];

  if (mainCart) {
    for (const property in mainCart) {
      if (
        mainCart[property]?.chefAll !== "" &&
        mainCart[property].chefAll.handle === name
      ) {
        let { chef, ...newdata } = mainCart[property];
        orderItems.push(newdata);
        pricePerItem.push(newdata.price * newdata.quantity);
      }
    }
  }

  const [addReview] = useMutation(ADD_REVIEW, {
    onCompleted: (data) => history.goBack(),
    onError: (err) => console.log(err),
  });

  const { loading: miscLoading, data: miscData } = useQuery(GET_MISC);

  const onRatingChange = (e, newRating) => setRating(newRating);
  const onChangeActive = (e, newHover) => setHover(newHover);
  const handleClose = () => setOpen(false);

  const onChangeReview = (e) => setReview(e.target.value);

  const onCloseSnackbar = () => setErrors({ network: null, payment: null });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setOpen(false);
    addReview({
      variables: { id: orderItems[0].foodId, text: review, rating },
    });
  };

  // const {data, loading: getMiscLoading} = useQuery()

  const [addOrder, { loading, error }] = useMutation(ADD_ORDER, {
    onError: (err) => {
      setErrors({ unKnownError: "Something Went Wrong" });
    },

    onCompleted: async (data) => {
      const payment = await stripe.confirmCardPayment(data.addOrder, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      setIsDone(true);
      setOpen(true);
    },
  });

  if (error) {
    return <Typography>Error, Something Went Wrong</Typography>;
  }

  if (errors.unKnownError) {
    return <Typography>Error, Something Went Wrong</Typography>;
  }

  const handleChange = (e) => {
    setDishData({ ...dishData, [e.target.name]: e.target.value });
  };

  const onChangeZip = async (data) => {
    setDishData({ ...dishData, streetAddress: data.place_id });
  };

  const onStreetAddressError = (data) => {
    setErrors({ ...errors, streetAddress: data.streetAddress });
  };

  const handleChangePhone = (value) => {
    setDishData({ ...dishData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stripe) {
      // setErrors({ card: error.message });

      let items = orderItems.map((item) => {
        let {
          chef,
          price,
          chefLoc,
          chefAll,
          name,
          availableDay,
          ...newdata
        } = item;
        return newdata;
      });

      addOrder({
        variables: {
          ...dishData,
          items,
        },
      });
    }
  };

  if (miscLoading) {
    return <Loader />;
  }

  const onGoBack = () => {
    history.goBack();
  };

  if (!mainCart || !miscData || orderItems.length === 0) {
    onGoBack();
  }

  if (mainCart && miscData && orderItems.length > 0) {
    const finalPrice = calculateBill({
      pricePerItem,
      miscData,
      orderItems,
      pref,
    });

    return (
      <Box mt={5}>
        <Container>
          <Box py={5}>
            <Button onClick={onGoBack} variant="outlined" color="secondary">
              Go Back
            </Button>
          </Box>
          <Grid container justify="space-between" spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
                className={classes.fontBold}
              >
                Delivery Instructions
              </Typography>
              <Box>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <GoogleMaps
                        onError={(e) => onStreetAddressError}
                        chefLoc={orderItems[0].chefLoc}
                        onChange={(e) => onChangeZip(e)}
                        InputLabelProps={{
                          classes: {
                            root: classes.textPlaceholder,
                          },
                        }}
                      ></GoogleMaps>
                      {/* <TextField
                        fullWidth
                        label="Street Address"
                        color="secondary"
                        value={dishData.streetAddress}
                        onChange={handleChange}
                        variant="filled"
                        name="streetAddress"
                      /> */}

                      {errors.streetAddress ? (
                        <Typography variant="subtitle2" color="error">
                          {errors.streetAddress}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        label="Address Line 2"
                        color="secondary"
                        value={dishData.addressLine2}
                        onChange={(e) => handleChange(e)}
                        variant="filled"
                        error={errors.addressLine2 ? true : false}
                        name="addressLine2"
                        InputLabelProps={{
                          classes: {
                            root: classes.textPlaceholder,
                          },
                        }}
                        className={classes.textField}
                      />

                      {errors.addressLine2 ? (
                        <Typography variant="subtitle2" color="error">
                          {errors.addressLine2}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        label="Name"
                        color="secondary"
                        onChange={(e) => handleChange(e)}
                        value={dishData.name}
                        variant="filled"
                        error={errors.name ? true : false}
                        name="name"
                        InputLabelProps={{
                          classes: {
                            root: classes.textPlaceholder,
                          },
                        }}
                        className={classes.textField}
                      />

                      {errors.name ? (
                        <Typography variant="subtitle2" color="error">
                          {errors.name}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item>
                      <MuiPhoneNumber
                        fullWidth
                        defaultCountry={"us"}
                        name="phone"
                        label="Phone"
                        onChange={(e) => handleChangePhone(e)}
                        color="secondary"
                        value={dishData.phone}
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
                    <Grid item>
                      <TextField
                        fullWidth
                        label="Delivery Instructions"
                        color="secondary"
                        value={dishData.deliveryInstructions}
                        onChange={(e) => handleChange(e)}
                        error={errors.deliveryInstructions ? true : false}
                        variant="filled"
                        name="deliveryInstructions"
                        InputLabelProps={{
                          classes: {
                            root: classes.textPlaceholder,
                          },
                        }}
                        className={classes.textField}
                      />

                      {errors.deliveryInstructions ? (
                        <Typography variant="subtitle2" color="error">
                          {errors.deliveryInstructions}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item>
                      <InputLabel
                        id="demo-simple-select-filled-label"
                        className={classes.fontBold2}
                        mb={2}
                      >
                        Select delivery day
                      </InputLabel>
                      <Select
                        fullWidth
                        onChange={(e) => handleChange(e)}
                        name="deliveryDate"
                        value={
                          dishData?.deliveryDate ? dishData.deliveryDate : ""
                        }
                        labelId="demo-simple-select-filled-label"
                        error={errors.deliveryDate ? true : false}
                        id="demo-simple-select-filled"
                        InputLabelProps={{
                          classes: {
                            root: classes.textPlaceholder,
                          },
                        }}
                        className={classes.textField1}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {orderItems[0]?.chefAll.deliveryDays?.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>

                      {errors.deliveryDate ? (
                        <Typography variant="subtitle2" color="error">
                          {errors.deliveryDate}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item>
                      <label className={classes.fontBold2}>Card Details</label>
                      <CardElement
                        InputLabelProps={{
                          classes: {
                            root: classes.textPlaceholder,
                          },
                        }}
                        options={{
                          style: {
                            base: {
                              fontSize: "20px",
                              color: theme.palette.text.primary,
                              paddingTop: "10px",
                              margin: "10px",
                              fontFamily: "Open Sans Condensed, sans-serif",
                              textAlign: "center",
                              "::placeholder": {
                                color: theme.palette.text.primary,
                                padding: "10px",
                                marginLeft: "10px",
                                fontFamily: "Open Sans Condensed, sans-serif",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                        className={classes.textField1}
                      />
                      <Box mx="auto" width={50} py={3}>
                        <Button
                          type="submit"
                          variant="outlined"
                          color="secondary"
                          elevation={10}
                          disabled={!stripe && isDone}
                        >
                          Order
                        </Button>
                      </Box>
                      <Snackbar
                        open={errors.payment || errors.network ? true : false}
                        TransitionComponent={Slide}
                        message="Something Went Wrong"
                        onClose={onCloseSnackbar}
                        autoHideDuration={10000}
                        action={
                          <>
                            <IconButton
                              aria-label="close"
                              color="secondary"
                              onClick={onCloseSnackbar}
                            >
                              <CloseIcon />
                            </IconButton>
                          </>
                        }
                      />
                      <Snackbar
                        open={errors.card ? true : false}
                        TransitionComponent={Slide}
                        message={errors.card}
                        onClose={onCloseSnackbar}
                        autoHideDuration={10000}
                        action={
                          <>
                            <IconButton
                              aria-label="close"
                              color="secondary"
                              onClick={onCloseSnackbar}
                            >
                              <CloseIcon />
                            </IconButton>
                          </>
                        }
                      />
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
            <Dialog
              open={open}
              TransitionComponent={Slide}
              TransitionProps={{ direction: "up" }}
              PaperProps={{ elevation: 10 }}
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                Would you take a minute to review this chef?
              </DialogTitle>
              <form onSubmit={handleSubmitReview}>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Your order is being processed. Reviews help us make our
                    services better, You may also give a review later from
                    <Button color="secondary" variant="text" href="/profile">
                      Orders
                    </Button>{" "}
                    &gt; Orders
                    <Box my={2}>
                      <Rating
                        value={rating}
                        onChange={onRatingChange}
                        onChangeActive={onChangeActive}
                      />
                      {rating !== null && (
                        <Typography>
                          {labels[hover !== -1 ? hover : rating]}
                        </Typography>
                      )}
                    </Box>
                    <TextField
                      value={review}
                      onChange={onChangeReview}
                      fullWidth
                      multiline
                      label="Write A Review"
                      color="secondary"
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" color="secondary">
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
            <Grid item xs={12} md={6}>
              <Box mt={6} py={3}>
                <Paper
                  elevation={6}
                  style={{ backgroundColor: theme.palette.secondary.extra }}
                >
                  <TableContainer>
                    <Box py={3} px={3}>
                      <Typography
                        align="center"
                        color="secondary"
                        variant="h6"
                        className={classes.fontBold}
                      >
                        Your Order with {orderItems[0].chefAll.firstName}
                      </Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.fontBold1}>
                              Name
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classes.fontBold1}
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classes.fontBold1}
                            >
                              Price
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderItems.map((item) => {
                            return (
                              <TableRow key={item.id}>
                                <TableCell className={classes.fontBold2}>
                                  {item.name}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  className={classes.fontBold2}
                                >
                                  {item.quantity}x
                                </TableCell>
                                <TableCell
                                  align="right"
                                  className={classes.fontBold2}
                                >
                                  {item.price} x {item.quantity} ={" "}
                                  {item.price * item.quantity}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                  <Box py={3} px={3}>
                    <Grid container justify="space-around">
                      <Grid item xs={6}>
                        <Typography className={classes.fontBold}>
                          Sub Total:
                        </Typography>
                      </Grid>

                      <Grid item xs={1}>
                        <Typography className={classes.fontBold1}>
                          {pricePerItem.reduce((a, b) => a + b, 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container justify="space-around">
                      {finalPrice.deliveryFee && (
                        <>
                          <Grid item xs={6} className={classes.fontBold}>
                            <Typography>Delivery Fee:</Typography>
                          </Grid>

                          <Grid item xs={1}>
                            <Typography className={classes.fontBold}>
                              {finalPrice.deliveryFee?.toFixed(2)}
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                    {/* <Grid container justify="space-around">
                      <Grid item xs={6}>
                        <Typography className={classes.fontBold}>
                          Service Fee:
                        </Typography>
                      </Grid>

                      <Grid item xs={1}>
                        <Typography className={classes.fontBold}>
                          {finalPrice.serviceFee?.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid> */}
                    <Grid container justify="space-around">
                      <Grid item xs={6} className={classes.fontBold}>
                        <Typography>Final Price:</Typography>
                      </Grid>

                      <Grid item xs={1}>
                        <Typography className={classes.fontBold}>
                          {finalPrice.finalPrice?.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          {/* <Snackbar open={ errors }><Alert></Alert></Snackbar> */}
        </Container>
      </Box>
    );
  } else return null;
}

export default Checkout;
