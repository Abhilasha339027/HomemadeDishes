import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import useStyles from "../../../styles/GlobalStyles";
import registerMainImg from "../../../media/registerMain.jpg";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useMutation } from "@apollo/client";
import {
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  REGISTER_USER,
} from "../../../queries/user";
import { AuthContext } from "../../../contexts/auth";
import Loader from "../../util/Loader";
import { useForm } from "../../util/hooks/hooks";
import { keys } from "../../../keys";

const Register = (props) => {
  const classes = useStyles();
  const { onChange, onSubmit, values } = useForm(addNewUser, {
    firstName: "",
    lastName: "",
    handle: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const authContext = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      authContext.login(result.data.register);
      props.history.push("/");
    },

    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
    },

    variables: values,
  });

  function addNewUser() {
    addUser();
  }

  const [googleLogin] = useMutation(GOOGLE_LOGIN, {
    update: (proxy, result) => {
      authContext.login(result.data.googleLogin);
    },

    onError: (err) =>
      setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors),
  });

  const [facebookLogin] = useMutation(FACEBOOK_LOGIN, {
    update: (proxy, result) => {
      authContext.login(result.data.facebookLogin);
    },

    onError: (err) => {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
    },
  });

  const onFacebookSuccess = ({ accessToken, userID }) => {
    facebookLogin({
      variables: {
        accessToken: accessToken,
        userID: userID,
      },
    });
  };

  const onGoogleSuccess = ({ tokenId }) => {
    googleLogin({ variables: { tokenId } });
  };

  const onGoogleError = () => {
    setErrors({ account: "Something Went Wrong" });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box my={5} mt={16}>
      <Container>
        <Grid container spacing={1} justify="space-evenly">
          <Grid item md={5}>
            <img src={registerMainImg} alt="Dish" width="100%" />
          </Grid>
          <Grid item alignItems="center" xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h4" className={classes.textSecondary}>
                Sign Up
              </Typography>
              <Box my={2}>
                <FacebookLogin
                  appId={keys.FACEBOOK_OAUTH_URL}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={onFacebookSuccess}
                  isDisabled
                  // onFailure={(err) => console.log(err)}
                  size="metro"
                ></FacebookLogin>
              </Box>
              <Box my={2}>
                <GoogleLogin
                  clientId={keys.GOOGLE_OAUTH}
                  autoLoad={false}
                  theme="dark"
                  disabled
                  fields="name,email,picture"
                  onSuccess={onGoogleSuccess}
                  // onFailure={onGoogleError}
                ></GoogleLogin>
              </Box>

              {errors.account ? (
                <Typography color="error" variant="subtitle2">
                  {errors.account}
                </Typography>
              ) : null}

              <form noValidate onSubmit={onSubmit}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  justify="flex-end"
                >
                  <Grid item>
                    <div className={classes.textField}>
                      <TextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                        variant="filled"
                        color="secondary"
                        error={errors.firstName ? true : false}
                        value={values.firstName}
                        onChange={onChange}
                      />
                    </div>
                    {errors.firstName ? (
                      <Typography color="error" variant="subtitle2">
                        {errors.firstName}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <div className={classes.textField}>
                      <TextField
                        fullWidth
                        name="lastName"
                        onChange={onChange}
                        label="Last Name"
                        variant="filled"
                        error={errors.lastName ? true : false}
                        color="secondary"
                        value={values.lastName}
                      />
                    </div>
                  </Grid>

                  {errors.lastName ? (
                    <Typography color="error" variant="subtitle2">
                      {errors.lastName}
                    </Typography>
                  ) : null}
                  <Grid item>
                    <div className={classes.textField}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        variant="filled"
                        error={errors.email ? true : false}
                        color="secondary"
                        value={values.email}
                        onChange={onChange}
                      />
                    </div>
                  </Grid>

                  {errors.email ? (
                    <Typography color="error" variant="subtitle2">
                      {errors.email}
                    </Typography>
                  ) : null}
                  <Grid item>
                    <div className={classes.textField}>
                      <TextField
                        fullWidth
                        name="handle"
                        label="Profile Handle"
                        error={errors.handle ? true : false}
                        variant="filled"
                        color="secondary"
                        onChange={onChange}
                        values={values.handle}
                      />
                    </div>
                  </Grid>

                  {errors.handle ? (
                    <Typography color="error" variant="subtitle2">
                      {errors.handle}
                    </Typography>
                  ) : null}

                  <Grid item>
                    <div className={classes.textField}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        variant="filled"
                        error={errors.password ? true : false}
                        type="password"
                        color="secondary"
                        value={values.password}
                        onChange={onChange}
                      />
                    </div>
                  </Grid>

                  {errors.password ? (
                    <Typography color="error" variant="subtitle2">
                      {errors.password}
                    </Typography>
                  ) : null}

                  <Grid item>
                    <div className={classes.textField}>
                      <TextField
                        fullWidth
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        error={errors.confirmPassword ? true : false}
                        variant="filled"
                        color="secondary"
                        value={values.confirmPassword}
                        onChange={onChange}
                      />
                    </div>
                  </Grid>

                  {errors.confirmPassword ? (
                    <Typography color="error" variant="subtitle2">
                      {errors.confirmPassword}
                    </Typography>
                  ) : null}
                  <Grid item>
                    <Button
                      // color="secondary"
                      // variant="contained"
                      fullWidth
                      name="submit"
                      type="submit"
                      className={classes.bgSecondary}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;
