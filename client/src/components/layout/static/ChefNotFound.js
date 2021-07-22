import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  Box,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Errori from "../../../media/error5.png";
import useStyles from "../../../styles/GlobalStyles";
import { SUBSCRIBE_TO_MAILS } from "../../../queries/mailing";
import { useMutation } from "@apollo/client";
import LogRocket from "logrocket";

const ChefNotFoundError = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ email: "" });
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [signUpToMails] = useMutation(SUBSCRIBE_TO_MAILS, {
    onCompleted: (res) => {
      setOpen(false);
    },

    onError: (err) => LogRocket.error(err.networkError.result),

    variables: { email: values.email },
  });

  const onChange = (e) => setValues({ [e.target.name]: e.target.value });

  const openSignupDialog = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();
    signUpToMails();
  };

  return (
    <div
      style={{
        margin: isXs ? "2px" : "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <Container>
        <Card
          variant="outlined"
          style={{
            padding: isXs ? "10px" : "50px",
            background: "transparent",
            boxShadow: "2px 2px 20px #000",
          }}
        >
          <CardActionArea style={{ justifyContent: "center" }}>
            <Grid container alignContent="center" justify="center" spacing={1}>
              <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <CardMedia
                    style={{ height: 500, width: 290, textAlign: "center" }}
                    image={Errori}
                    title="Contemplative Reptile"
                    align="center"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="h2"
                      align="center"
                      className={classes.errorText}
                    >
                      Oops...
                    </Typography>
                    <Typography
                      variant="h5"
                      gutterBottom
                      //  color="textSecondary"
                      component="p"
                      align="center"
                      className={classes.errorText}
                    >
                      We don't service your area yet.
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      //  color="textSecondary"
                      component="p"
                      align="center"
                      className={classes.fontBold2}
                    >
                      We are working hard to service your neighborhood.
                      <Link color="textPrimary" onClick={openSignupDialog}>
                        {" "}
                        Signup{" "}
                      </Link>
                      to our mailing list and get update on our progress.
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      //  color="textSecondary"
                      component="p"
                      align="center"
                      className={classes.fontBold2}
                    >
                      Grow your neighborhood become a chef today by applying at:
                      <Link href="/register-chef" color="textPrimary">
                        YummyMaker/register-chef
                      </Link>
                    </Typography>
                    <Box mt={1} style={{ textAlign: "center" }}>
                      <Button
                        color="secondary"
                        href="/"
                        variant="outlined"
                        style={{ textAlign: "center" }}
                      >
                        Go Home
                      </Button>
                    </Box>
                  </CardContent>
                </div>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText color="secondary">
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              id="name"
              value={values.email}
              onChange={onChange}
              color="secondary"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" onClick={onSubmit} color="secondary">
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ChefNotFoundError;
