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
  LOGIN_USER,
} from "../../../queries/user";
import { AuthContext } from "../../../contexts/auth";
import Loader from "../../util/Loader";
import { useForm } from "../../util/hooks/hooks";
import { keys } from "../../../keys";

function Register(props) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});

  const authContext = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(handleLogin, {
    email: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result)
      authContext.login(result.data.login);
    },

    onError(err) {
      console.log(err.graphQLErrors)
      setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
    },
    variables: values,
  });

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
      console.log(err);
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

  function handleLogin() {
    login();
  }

  const onGoogleSuccess = ({ tokenId }) => {
    googleLogin({ variables: { tokenId } });
  };

  const onGoogleError = () => {
    setErrors({ account: "Something Went Wrong" });
  };

  if (loading) return <Loader />;

  return (
    <Box my={5} mt={12}>
      <Container>
        <Grid container justify="space-evenly">
          <Grid item md={4}>
            <img src={registerMainImg} alt="Dish" width="100%" />
          </Grid>
          <Grid item alignItems="center" md={4}>
            <Box mt={3} textAlign="center">
              <Typography variant="h4" className={classes.textSecondary}>
                Sign In
              </Typography>
              <Box my={2}>
                <FacebookLogin
                  appId={keys.FACEBOOK_OAUTH_URL}
                  autoLoad={false}
                  fields="name,email,picture"
                  // isDisabled
                  callback={onFacebookSuccess}
                  size="small"
                ></FacebookLogin>
              </Box>
              <Box my={2}>
                <GoogleLogin
                  clientId={keys.GOOGLE_OAUTH}
                  autoLoad={false}
                  theme="dark"
                  // disabled
                  fields="name,email,picture"
                  onSuccess={onGoogleSuccess}
                  onFailure={onGoogleError}
                ></GoogleLogin>
              </Box>
              {errors?.account ? (
                <Typography color="error" variant="subtitle2">
                  {errors?.account}
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
                        name="email"
                        label="Email"
                        error={errors?.email ? true : false}
                        variant="filled"
                        color="secondary"
                        onChange={onChange}
                        values={values.handle}
                      />
                    </div>

                    {errors?.email ? (
                      <Typography color="error" variant="subtitle2">
                        {errors?.email}
                      </Typography>
                    ) : null}
                  </Grid>

                  <Grid item>
                    <div className={classes.textField}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        variant="filled"
                        error={errors?.password ? true : false}
                        type="password"
                        color="secondary"
                        value={values.password}
                        onChange={onChange}
                      />
                    </div>

                    {errors?.password ? (
                      <Typography color="error" variant="subtitle2">
                        {errors?.password}
                      </Typography>
                    ) : null}
                  </Grid>

                  <Grid item>
                    <Button
                      // color="secondary"
                      // variant="contained"
                      fullWidth
                      name="submit"
                      type="submit"
                      className={classes.bgSecondary}
                    >
                      Log In
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
}

export default Register;
