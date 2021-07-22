import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import useStyles from "../../../styles/GlobalStyles";
import ChefCardItem from "../../pages/Chefs/ChefCardItem";
import Loader from "../../util/Loader";
import SearchArea from "./SearchArea";
import { ADVANCED_SEARCH } from "../../../queries/chef";
import CuisinesList from "../../pages/Chefs/CuisinesList";
import { cuisines } from "../../util/listOfCuisines";
import { PrefContext } from "../../../contexts/preff";

function AdvancedSearch(props) {
  const classes = useStyles();
  const zipCode = props.match.params.zipCode;
  const {
    pref: { diet, deliveryDay: deliveryDays, deliveryOption },
  } = useContext(PrefContext);

  const { error, loading, data } = useQuery(ADVANCED_SEARCH, {
    variables: {
      zipCode,
      diet,
      deliveryDays,
      deliveryOption,
    },
    fetchPolicy: "cache-and-network",
    onError: (err) => console.log(err.networkError.result),
  });

  if (loading) {
    return <Loader />;
  }

  if (data && data.advancedSearch.length > 0) {
    let uniqueCuisines = [];
    data.advancedSearch.forEach(function (item) {
      var i = uniqueCuisines.findIndex((x) => item.cuisine === x.cuisine);
      if (i <= -1) {
        uniqueCuisines.push({ ...item });
      }
    });

    const chefs = data.advancedSearch;

    return (
      <Box my={10}>
        <CuisinesList />
        <Container>
          <SearchArea />
          <Box>
            {chefs?.length > 0 ? (
              cuisines.map((cuisine, i) => {
                let newData = chefs
                  .filter((chef) => chef.cuisine.indexOf(cuisine) >= 0)
                  .sort((a, b) => (a.orders <= b.orders ? 1 : -1));

                if (newData.length > 0) {
                  return (
                    <Box>
                      <Box>
                        <Typography
                          variant="h3"
                          component="h3"
                          gutterBottom
                          className={classes.cuisineNameHeader}
                        >
                          {cuisine}
                        </Typography>
                      </Box>
                      <Grid container spacing={3}>
                        {newData.map((each, index) => {
                          return (
                            // <Grid item>
                            <ChefCardItem
                              key={index}
                              chef={each}
                              zipCode={zipCode}
                            />

                            /* <Typography>{each.}</Typography> */
                            // </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  );
                } else return null;
              })
            ) : (
              // uniqueCuisines.map((elem, index) => {
              //   // let uniqueChefs = data.getChefsByAreaCode.forEach((chef) => {
              //   //   if (chef.cuisine.indexOf(elem) >= 0) console.log(chef);
              //   // });
              //   if (data.getChefsByAreaCode[0].cuisine.includes(elem)) {
              //     console.log(elem);
              //   }

              //   // console.log(uniqueChefs);
              //   return (
              //     <Box key={index}>
              //       <Typography
              //         variant="h3"
              //         component="h3"
              //         gutterBottom
              //         className={classes.cuisineNameHeader}
              //       >
              //         {cuisine.cuisine[0]}
              //       </Typography>
              //       <Grid container spacing={3}>
              //         {chefs.map((chef, index) =>
              //           chef.cuisine === cuisine.cuisine &&
              //           chef.foodItems.length > 0 ? (
              //             <ChefCardItem
              //               key={index}
              //               chef={chef}
              //               zipCode={zipCode}
              //             />
              //           ) : null
              //         )}
              //       </Grid>
              //       <Box pt={2}>
              //         <Button
              //           endIcon={<ArrowForward />}
              //           variant="outlined"
              //           onClick={() => openAllChefs(cuisine.cuisine)}
              //           className={classes.animateButton}
              //           color="secondary"
              //         >
              //           See All {cuisine.cuisine[0]} Chefs
              //         </Button>
              //       </Box>
              //     </Box>
              <Box my={20} className={classes.errorText}>
                <Typography variant="h4" color="error">
                  Something Went Wrong or can not get chefs
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    );
  } else if (error) {
    return (
      <Box mt={30} className={classes.errorText}>
        <Typography variant="h4" color="error">
          Something Went Wrong or can not get chefs
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box mt={30} className={classes.errorText}>
        <Typography variant="h4"> Could not find anything</Typography>
      </Box>
    );
  }
}

export default AdvancedSearch;
