import { Box, Container, Paper, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import useStyles from "../../../styles/GlobalStyles";
import { grey } from "@material-ui/core/colors";
import CuisineImages from "./CuisineImages";

const cuisines = [
  "All",
  "Indian",
  "Chinese",
  "Middle East",
  "Italian",
  "Mexican",
  "Korean",
];

function CuisinesList() {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const zipCode = match.params.zipCode;

  const onCuisineClick = (cuisine) => {
    history.push(`/chefs/zipcode/${zipCode}/${cuisine}`);
  };

  return (
    <Box>
      {/* <Paper
        elevation={0}
        style={{
          backgroundColor:
            theme.palette.type === "light"
              ? grey[200]
              : theme.palette.background.paper,
        }}
        square
      > */}
      <Container maxWidth="xl" className={classes.mxAuto1}>
        <Box
          display="flex"
          alignItems="center"
          height={160}
          style={{ overflowX: "auto" }}
          textAlign="center"
          pt={2}
        >
          {cuisines.map((cuisine, i) => {
            return (
              <Box
                key={i}
                onClick={() => onCuisineClick(cuisine)}
                justifyContent="space-around"
                px={2}
                className={classes.cuisine}
              >
                <div className={classes.cuisineMenu}>
                  {/* <img src={cuisine1} alt="cuisine" width="80px" /> */}
                  <CuisineImages cuisine={cuisine} />
                </div>
                <div>
                  <Typography variant="body2" className={classes.fontBold}>
                    {cuisine}
                  </Typography>
                </div>
              </Box>
            );
          })}
        </Box>
      </Container>
      {/* </Paper> */}
    </Box>
  );
}

export default CuisinesList;
