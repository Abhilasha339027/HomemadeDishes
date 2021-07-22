import React from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";

function UsersSection() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
          <Paper>
            <Typography>Users</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UsersSection;
