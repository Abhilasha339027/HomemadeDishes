import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@material-ui/core";

import useStyles from "../../../styles/GlobalStyles";
import ChefCardItem from "./ChefCardItem";
import { GET_CHEFS_BY_CUISINE } from "../../../queries/chef";
import SearchArea from "../../ChefsHome/ChefsByZip/SearchArea";
import Loader from "../../util/Loader";
import CuisinesList from "./CuisinesList";
import { cuisines } from "../../util/listOfCuisines";
import { PrefContext } from "../../../contexts/preff";
import ChefNotFoundError from "../../layout/static/ChefNotFound";

function GetChefsByCuisine(props) {
  const classes = useStyles();

  let zipCode = props.match.params.zipCode;
  let cuisine = props.match.params.cuisine;
  const { pref, changePref } = useContext(PrefContext);

  useEffect(() => {
    changePref({ ...pref, zipCode });
  }, [zipCode]);

  const { error, loading, data } = useQuery(GET_CHEFS_BY_CUISINE, {
    variables: { zipCode, cuisine },
  });

  if (loading) {
    return <Loader />;
  }

  var uniqueCuisines = [];
  if (data && data.getChefByCuisine.length > 0) {
    data.getChefByCuisine.forEach(function (item) {
      var i = uniqueCuisines.findIndex((x) => item.cuisine === x.cuisine);
      if (i <= -1) {
        uniqueCuisines.push({ ...item });
      }
    });
  }

  const chefs = data?.getChefByCuisine;

  return (
    <Box my={10}>
      <CuisinesList />
      <Container>
        <SearchArea />
        <Box>
          {chefs?.length > 0 ? (
            cuisines.map((cuisine, i) => {
              let newData = chefs?.filter(
                (chef) => chef.cuisine.indexOf(cuisine) >= 0
              );

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
            <ChefNotFoundError />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default GetChefsByCuisine;
