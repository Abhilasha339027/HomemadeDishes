/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Image from "cloudinary-react/lib/components/Image";

import { GET_FOODITEMS_BY_HANDLE } from "../../../queries/food";
import useStyles from "../../../styles/GlobalStyles";
import SingleFoodItem from "./SingleFoodItem";
import { CartContext } from "../../../contexts/cartContext";
import { useHistory } from "react-router-dom";
import Loader from "../../util/Loader";
import { calculateEverage } from "../../util/calculateRating";
import Transformation from "cloudinary-react/lib/components/Transformation";

function FoodItems(props) {
  const handle = props.match.params.handle;
  const history = useHistory();
  const [drawer, setDrawer] = useState(false);
  const chefLocRef = useRef();
  const avatarRef = useRef();
  const { mainCart } = useContext(CartContext);
  const classes = useStyles();
  const [avatarDim, setAvatarDim] = useState();

  const { error, loading, data } = useQuery(GET_FOODITEMS_BY_HANDLE, {
    variables: { handle },
    onError: (err) => {},
  });

  useEffect(() => {
    let avatar = avatarRef.current;
    if (avatar) {
      setAvatarDim({
        ...avatarDim,
        width: avatar.clientWidth,
        height: avatar.clientHeight,
      });
    }

    return () => {
      setAvatarDim({});
    };
  }, [avatarRef]);

  const handleGoBottom = () => {
    let chefLoc = chefLocRef.current;
    window["scrollTo"]({
      top: chefLoc.getBoundingClientRect().y,
      behavior: "smooth",
    });
  };

  const drawerOpen = () => {
    setDrawer(true);
  };

  const drawerClose = () => {
    setDrawer(false);
  };

  const handleCheckout = (e) => {
    props.history.push(`/checkout/${data.getFoodByHandle[0].chef.handle}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (data) {
    let ratings = [
      // ...(data?.getFoodByHandle.length > 0 &&
      ...data?.getFoodByHandle[0]?.chef?.reviews?.map(
        (review) => review.rating
      ),
    ];

    const averageStars = calculateEverage(ratings);

    let orderItems = [];
    let pricePerItem = [];
    for (const property in mainCart) {
      if (data.getFoodByHandle[0].chef.id === mainCart[property]?.chefAll?.id) {
        orderItems.push(mainCart[property]);
        pricePerItem.push(
          mainCart[property].price * mainCart[property].quantity
        );
      }
    }

    const handleGoBack = () => {
      history.goBack();
    };

    const chefData = data.getFoodByHandle;

    return (
      <Box mt={14}>
        <Container>
          <Box mb={3}>
            <Button onClick={handleGoBack} color="secondary" variant="outlined">
              Go back
            </Button>
          </Box>
          <Paper elevation={8} className={classes.newBackground}>
            <Box py={3}>
              <Container>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12} md={4} lg={4}>
                    <Box mx="auto" position="relative">
                      <Avatar
                        // className={`${classes.mxWidth} ${classes.mxHeight}`}
                        style={{ height: 200, width: 200, margin: "auto" }}
                      >
                        <Image
                          publicId={`${chefData[0].chef.avatar}.png`}
                          cloudName="defivdghh"
                          secure="true"
                          // className={`${classes.mxWidth}`}
                        >
                          <Transformation
                            gravity="face"
                            crop="thumb"
                            width="200"
                            height="200"
                            // height="max"
                            // width={avatarDim?.width}
                          ></Transformation>
                        </Image>
                      </Avatar>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4} lg={5}>
                    <Box textAlign="center">
                      <Typography variant="h4" className={classes.fontBold}>
                        {chefData[0].chef.firstName} {chefData[0].chef.lastName}
                      </Typography>
                      <Typography variant="h5">
                        {chefData[0].chef.cuisine.map((each) => (
                          <Chip
                            label={each}
                            value={each}
                            variant="outlined"
                            color="secondary"
                            className={classes.chip}
                          />
                        ))}
                      </Typography>
                      <Rating
                        value={averageStars}
                        defaultValue={0}
                        precision={0.5}
                        readOnly
                      />
                      <Box>
                        <Button
                          color="secondary"
                          variant="text"
                          onClick={handleGoBottom}
                          className={classes.fontBold1}
                        >
                          Read More About {chefData[0].chef.firstName}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Paper>
        </Container>

        <Box mt={8}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                <Grid container spacing={3}>
                  {chefData.map((foodItem, index) => (
                    <Grid item key={index} xs={12} sm={6} lg={4}>
                      <SingleFoodItem food={foodItem} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item md={3} className={classes.cartSection}>
                <Paper elevation={8} className={classes.cartContainer}>
                  <Container>
                    {!Array.isArray(orderItems) || !orderItems.length ? (
                      <Box py={20} textAlign="center">
                        <Typography className={classes.fontBold1}>Your cart is empty !</Typography>
                      </Box>
                    ) : (
                      <Box py={3} textAlign="center">
                        <Typography className={classes.fontBold}>
                          Your order with {chefData[0]?.chef?.firstName}
                        </Typography>
                        {orderItems.map((order, index) => {
                          return order.quantity > 0 ? (
                            <Grid container key={index} justify="space-around">
                              <Grid item>
                                <Typography paragraph className={classes.fontBold2}>
                                  {order?.quantity}x {order?.name}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography paragraph className={classes.fontBold2}>
                                  ${(order.price * order.quantity).toFixed(2)}
                                </Typography>
                              </Grid>
                            </Grid>
                          ) : null;
                        })}
                        <Grid container justify="space-between">
                          <Grid item>
                            <Typography className={classes.fontBold1}>Total:</Typography>
                          </Grid>
                          <Grid item>
                            <Typography  className={classes.fontBold1}>
                              {pricePerItem
                                .reduce((a, b) => a + b, 0)
                                .toFixed(2)}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Box width="70%" my={5} mx="auto">
                          <Button
                            variant="outlined"
                            fullWidth
                            color="secondary"
                            onClick={handleCheckout}
                            className={classes.textbutton}
                          >
                            Go to Checkout
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Container>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box my={3} ref={chefLocRef} className={classes.cart}>
          <Container>
            <Paper elevation={10} className={classes.newBackground}>
              <Box py={2}>
                <Container>
                  <Grid
                    container
                    spacing={3}
                    justify="space-evenly"
                    alignItems="center"
                  >
                    <Grid item xs={12} md={4} lg={4} ref={avatarRef}>
                      <Box textAlign="center" position="relative">
                        <Avatar
                          // className={`${classes.mxWidth} ${classes.mxHeight}`}
                          style={{ height: 200, width: 200, margin: "auto" }}
                        >
                          <Image
                            publicId={`${chefData[0].chef.avatar}.png`}
                            cloudName="defivdghh"
                            secure="true"
                            // className={`${classes.mxWidth}`}
                          >
                            <Transformation
                              gravity="face"
                              crop="thumb"
                              width="200"
                              height="200"
                              // height="max"
                              // width={avatarDim?.width}
                            ></Transformation>
                          </Image>
                        </Avatar>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} lg={5}>
                      <Box textAlign="center">
                        <Typography
                          variant="h4"
                          paragraph
                          // color="textSecondary"
                          className={classes.fontBold}
                        >
                          {chefData[0]?.chef?.firstName}{" "}
                          {chefData[0]?.chef?.lastName}
                        </Typography>
                        <Typography
                          variant="body2"
                          paragraph
                          // color="textSecondary"
                          className={classes.fontBold2}
                        >
                          {chefData[0]?.chef?.bio}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Paper>
          </Container>
        </Box>

        <Box className={classes.appBarBottom} height="60px" zIndex={1}>
          <Fab onClick={drawerOpen} className={classes.mobileFab}>
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
        <Drawer anchor="bottom" open={drawer} onClose={drawerClose} className={classes.cartContainer}>
          <Container className={classes.cartContainer}>
            {!Array.isArray(orderItems) || !orderItems.length ? (
              <Box py={20} textAlign="center">
                <Typography className={classes.fontBold}>
                  Your cart is empty !
                </Typography>
              </Box>
            ) : (
              <Box py={3} textAlign="center">
                <Typography className={classes.fontBold}>
                  Your order with {chefData[0]?.chef?.firstName}
                </Typography>
                {orderItems.map((order, index) => {
                  return order.quantity > 0 ? (
                    <Grid container key={index} justify="space-around">
                      <Grid item>
                        <Typography paragraph className={classes.fontBold2}>
                          {order?.quantity}x {order?.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography paragraph className={classes.fontBold2}>
                          ${(order.price * order.quantity).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : null;
                })}
                <Typography
                  paragraph
                  className={classes.fontBold}
                ></Typography>
                <Box width="70%" my={5} mx="auto">
                  <Box pb={3}>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography  className={classes.fontBold}>Total:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography  className={classes.fontBold}>
                          {pricePerItem.reduce((a, b) => a + b, 0).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={handleCheckout}
                    className={classes.textButton}
                  >
                    Go to Checkout
                  </Button>
                </Box>
              </Box>
            )}
          </Container>
        </Drawer>
      </Box>
    );
  }
  if (error) {
    return (
      <Box mt={30}>
        <Typography align="center" variant="h3" color="error">
          Sorry, Could not find anything
        </Typography>
      </Box>
    );
  }
}

export default FoodItems;
