import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../../queries/user";
import Loader from "../../util/Loader";
import ChefProfileDetails from "./ChefProfileDetails";
import useStyles from "../../../styles/GlobalStyles";
function Profile(props) {
  const classes = useStyles();
  const { data, loading } = useQuery(GET_PROFILE, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loader />;
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" className={classes.fontBold}>
        View Your Profile
      </Typography>

      <ChefProfileDetails />
    </Box>
  );
}

export default Profile;
