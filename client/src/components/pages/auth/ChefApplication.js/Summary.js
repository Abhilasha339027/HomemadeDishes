import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { FormContext } from "../../../../contexts/chefApplicationForm";
import useStyles from "../../../../styles/GlobalStyles";
import { Link } from "react-router-dom";

function Summary() {
  const { handleChange, values } = useContext(FormContext);
  const classes = useStyles();

  return (
    <Box textAlign="center">
      <Box py={1}>
        <Typography my={3} variant="h4" className={classes.fontBold1}>
          How it works
        </Typography>
        <Box py={3} textAlign="left">
          <ul style={{ width: "fit-content", margin: "auto" }}>
            <li>
              <Typography variant="body1" className={classes.fontBold2}>
                All Chefs are YummyMakers on our site.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" className={classes.fontBold2}>
                Please read out <Link to="/privacy-policy">Policy</Link> or
                <Link to="/terms-of-service">Terms of use</Link>
              </Typography>
            </li>
            <li>
              <Typography variant="body1" className={classes.fontBold2}>
                Be your own boss! All YummyMakers on YummyMaker.com are
                independent Contractors.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" className={classes.fontBold2}>
                Yumymaker.com provide local chefs and expert cooks with the
                proper exposure they need to grow their practice.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" className={classes.fontBold2}>
                Pick your own schedule, charge what you want.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" className={classes.fontBold2}>
                No Hidden fees! We only charge a 25% fee for our service and the
                maintenance of our site.
              </Typography>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default Summary;
