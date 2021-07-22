import React, { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { CHANGE_CHEF_SETTINGS, GET_CHEF_SETTINGS } from "../../../queries/chef";
import { Alert } from "@material-ui/lab";
import Loader from "../../util/Loader";
import useStyles from "../../../styles/GlobalStyles";
function Settings() {
  const [values, setValue] = useState({
    deliveryOption: "",
    deliveryFee: 0,
    pickupFee: 0,
  });
  const classes = useStyles();
  const onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const [isComplete, setIsComplete] = React.useState(false);

  const [error, setError] = React.useState(false);

  const handleClose = () => {
    setIsComplete(false);
    setError(false);
  };

  const { data } = useQuery(GET_CHEF_SETTINGS, {
    onCompleted: ({ getChefSettings, __typename }) => {
      setValue({ ...getChefSettings });
    },
    fetchPolicy: "cache-and-network",
  });

  const [changeChefSettings, { loading }] = useMutation(CHANGE_CHEF_SETTINGS, {
    variables: {
      ...values,
      deliveryFee: parseInt(values.deliveryFee),
      pickupFee: parseInt(values.pickupFee),
    },

    onCompleted: () => setIsComplete(true),

    refetchQueries: [{ query: GET_CHEF_SETTINGS }],

    onError: (err) => {
      setError(true);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    changeChefSettings();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography gutterBottom align="center" variant="h4" component="h2" className={classes.fontBold}>
        Settings
      </Typography>

      <Box>
        <form onSubmit={onSubmit}>
          <Box py={2}>
            <InputLabel id="simple-select-filled-label">
              Select delivery day
            </InputLabel>
            <Select
              value={values.deliveryOption}
              onChange={onChange}
              color="secondary"
              labelId="simple-select-filled-label"
              name="deliveryOption"
            >
              <MenuItem value="both">Delivery and Pickup Both</MenuItem>
              <MenuItem value="pickup">Pickup Only</MenuItem>
              <MenuItem value="delivery">Delivery Only</MenuItem>
            </Select>
          </Box>
          <Box py={2}>
            <TextField
              name="deliveryFee"
              value={values.deliveryFee}
              onChange={onChange}
              color="secondary"
              type="number"
              inputMode="numeric"
              label="Delivery Fee"
            />
          </Box>
          <Box py={2}>
            <TextField
              name="pickupFee"
              value={values.pickupFee}
              onChange={onChange}
              color="secondary"
              label="Pickup Fee"
            />
            <Box py={2}>
              <Button type="submit" variant="outlined" color="secondary">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Oops, Something Went Wrong
          </Alert>
        </Snackbar>
        <Snackbar
          open={isComplete}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Data Saved
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default Settings;
