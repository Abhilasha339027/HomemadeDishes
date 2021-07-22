import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";

import useStyles from "../../../styles/GlobalStyles";
import { GET_CHEFS_BY_ZIP } from "../../../queries/chef";
import ChefCardItem from "./ChefCardItem";
import Loader from "../../util/Loader";
import SearchArea from "../../ChefsHome/ChefsByZip/SearchArea";
import CuisinesList from "./CuisinesList";
import { Link, useHistory } from "react-router-dom";
import { cuisines } from "../../util/listOfCuisines";
import { PrefContext } from "../../../contexts/preff";
import { ArrowRightAltRounded } from "@material-ui/icons";
import ChefNotFoundError from "../../layout/static/ChefNotFound";

function GetChefsByZip(props) {
  const classes = useStyles();
  const zipCode = props.match.params.zipCode;
  const history = useHistory();
  const { pref, changePref } = useContext(PrefContext);

  const onCuisineClick = (cusine) => {
    history.push(`/chefs/zipcode/${zipCode}/${cuisine}`);
  };

  const { error, loading, data } = useQuery(GET_CHEFS_BY_ZIP, {
    variables: { zipCode },
    fetchPolicy: "cache-and-network",
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    changePref({ ...pref, zipCode });
  }, [zipCode]);

  if (loading) {
    return <Loader />;
  }

  let uniqueCuisines = [];
  if (data?.getChefsByAreaCode) {
    // data.getChefsByAreaCode.forEach(function (item) {
    //   var i = uniqueCuisines.findIndex((x) => item.cuisine === x.cuisine);
    //   if (i <= -1) {
    //     uniqueCuisines.push({ ...item });
    //   }
    // });
    // data.getChefsByAreaCode.forEach((element) =>
    //   //   element.cuisine.forEach((elem) => cuisine.push(elem))
    //   // console.log(union(element))
    // );
    // uniqueCuisines = union(
    //   ...data.getChefsByAreaCode.map((elem) => elem.cuisine)
    // );
    // uniqueCuisines = [...new Set(cuisine)];
    // let getUniqueCuisine = cuisines;
    // console.log(cuisines);
  }

  // console.log(uniqueCuisines);
  const openAllChefs = (cuisine) => {
    history.push(`/chefs/zipcode/${zipCode}/${cuisine}`);
  };
  // console.log(data);

  let allChefs = [];

  cuisines.forEach((cuisine, i) => {
    let newdata = data?.getChefsByAreaCode?.filter(
      (chef) => chef.cuisine.indexOf(cuisine) >= 0
    );

    if (newdata?.length > 0) {
      let newlist = newdata.sort((a, b) => {
        if (a.orders <= b.orders) return 1;
        else return -1;
      });

      allChefs.push(newdata);
    }
  });

  allChefs = allChefs.sort((a, b) => (a.length <= b.length ? 1 : -1));

  const chefs = data?.getChefsByAreaCode;
  let cuisine = [];

  return (
    <>
      <Box my={10}>
        <CuisinesList />
        <Box my={2}>
          <Container>
            <SearchArea />
            <Box>
              {data?.getChefsByAreaCode?.length > 0 ? (
                cuisines.map((cuisine, i) => {
                  let newData = data.getChefsByAreaCode
                    .filter((chef) => chef.cuisine.indexOf(cuisine) >= 0)
                    .sort((a, b) => (a.orders <= b.orders ? 1 : -1));

                  if (newData.length > 0) {
                    return (
                      <Box key={i}>
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
                          {newData.slice(0, 3).map((each, index) => {
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

                        <Box py={2}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/chefs/zipcode/${zipCode}/${cuisine}`}
                          >
                            <Button
                              className={classes.animateButton}
                              color="secondary"
                              endIcon={<ArrowRightAltRounded />}
                              variant="outlined"
                              onClick={() => onCuisineClick(cuisine)}
                            >
                              See More {cuisine} cuisines
                            </Button>
                          </Link>
                        </Box>
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
                // <Box my={20} className={classes.errorText}>
                //   <Typography variant="h4" color="error">
                //     Something Went Wrong or can not get chefs
                //   </Typography>
                // </Box>
                <ChefNotFoundError />
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default GetChefsByZip;
