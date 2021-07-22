import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { FormContext } from "../../../../contexts/chefApplicationForm";
import useStyles from "../../../../styles/GlobalStyles";

function AddReferrer() {
  const muiTheme = useTheme();
  const { handleChange, values } = useContext(FormContext);
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (values.refValue === 1) {
      handleChange({ ...values, target: { name: "refValue", value: "" } });
    } else {
      handleChange({ ...values, target: { name: "finish", value: false } });
    }
  }, []);

  return (
    <Box textAlign="center" py={3}>
      <Typography gutterBottom variant="h6" className={classes.fontBold2}>
        How did you hear about YummyMaker?
      </Typography>

      <Box
        width={60}
        height={5}
        mb={3}
        mx="auto"
        bgcolor={muiTheme.palette.secondary.main}
      ></Box>
      <FormControl component="form" onSubmit={onSubmit}>
        <RadioGroup
          aria-label="reference"
          name="refValue"
          value={values.refValue}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Facebook"
            control={<Radio />}
            label="Facebook"
            className={classes.fontBold2}
          />

          <FormControlLabel
            value="Instagram"
            control={<Radio />}
            label="Instagram"
            className={classes.fontBold2}
          />

          <FormControlLabel
            value="Friend Or Family"
            control={<Radio />}
            label="Friend Or Family"
            className={classes.fontBold2}
          />

          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="Other"
            className={classes.fontBold2}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default AddReferrer;
