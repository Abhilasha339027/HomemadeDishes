import { Backdrop, Box, CircularProgress } from "@material-ui/core";
import React from "react";
import useStyles from "../../styles/GlobalStyles";

function Loader() {
  const classes = useStyles();

  return (
    <Box mt={30} width={100} mb={100} mx="auto">
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Box>
  );
}

export default Loader;
