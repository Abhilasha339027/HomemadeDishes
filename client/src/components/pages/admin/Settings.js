import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MISC, GET_MISC } from "../../../queries/misc";
import Loader from "../../util/Loader";

function Settings() {
  const [values, setValues] = useState({ tax: 0, serviceFee: 0 });

  const { loading } = useQuery(GET_MISC, {
    onCompleted: (data) => {
      setValues({
        ...values,
        tax: data.getMisc.tax,
        serviceFee: data.getMisc.serviceFee,
      });
    },
  });

  const [addMisc] = useMutation(ADD_MISC, {
    update: (proxy, data) => {
      proxy.writeQuery({ query: GET_MISC, data });
    },
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMisc({ variables: values });
  };

  if (loading) return <Loader />;

  return (
    <Box m={10}>
      <Typography variant="h4" gutterBottom>
        Web Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box py={3}>
          <TextField
            color="secondary"
            variant="outlined"
            value={values.tax}
            name="tax"
            onChange={onChange}
            label="Tax"
            type="number"
          ></TextField>
        </Box>
        <Box>
          <TextField
            color="secondary"
            variant="outlined"
            value={values.serviceFee}
            name="serviceFee"
            onChange={onChange}
            type="number"
            label="serviceFee"
          ></TextField>
        </Box>
        <Box py={3}>
          <Button color="secondary" variant="outlined" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Settings;
