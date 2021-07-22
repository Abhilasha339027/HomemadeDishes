import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
// import tileData from "./tileData";
import featured1 from "../../../media/featured1.jpg";
import featured2 from "../../../media/featured2.jpg";
import featured3 from "../../../media/featured3.jpg";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import useStyles from "../../../styles/GlobalStyles";
import { motion } from "framer-motion";

const tileData = [
  { img: featured1, title: "Image", author: "Author" },
  { img: featured2, title: "Image", author: "Author" },
  { img: featured3, title: "Image", author: "Author" },
];

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const TileBar = ({ tile }) => {
  return (
    <Box>
      <span>by: {tile.author}</span>
    </Box>
  );
};

export default function FeaturedSection() {
  const classes = useStyles();

  const variants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 0.8,
      transition: {
        type: "spring",
        mass: 1,
        damping: 8,
        duration: 0.5,
      },
    },
  };

  return (
    <div className={classes.gridRoot, classes.newBackground}>
      <Box py={5}>
        <Typography variant="h3" align="center" className={classes.fontBold}>
          Our Best Dishes
        </Typography>
      </Box>

      <Container>
        <Grid container alignItems="flex-start" spacing={5} >
          {tileData.map((tile, index) => {
            return (
              <Grid
                component={motion.div}
                // initial={{ scale: 1 }}
                item
                key={index}
                xs={12}
                sm={4}
                style={{ position: "relative",  margin: "auto" }}
                
                
              >
                <Box
                  className={`${classes.featuredOverlay} ${
                    classes["featured" + index]
                  }`}
                  width="100%"
                  height={300}
                  
                >
                  <Box
                    component={motion.div}
                    initial="hidden"
                    whileHover="visible"
                    onTap="visible"
                    opacity={0}
                    height="100%"
                    textAlign="center"
                    variants={variants}
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <Box
                      position="absolute"
                      top="50%"
                      left="0"
                      right="0"
                      bottom="0"
                      marginleft="auto"
                    >
                      <Typography>{tile.title}</Typography>
                      <Typography>{tile.author}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        {/* <GridList className={classes.gridList}>
          {tileData.map((tile) => (
            <GridListTile
              key={tile.img}
              component={motion.div}
              whileHover={{ scale: 1.5, zIndex: 100 }}
            >
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                className={classes.gridWrap}
                subtitle={<TileBar tile={tile} />}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
              </GridList> */}
      </Container>
    </div>
  );
}

// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Container,
//   Divider,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputBase,
//   Paper,
//   Snackbar,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@material-ui/core";
// import { Search, LocationOn } from "@material-ui/icons";
// import { Alert, Skeleton } from "@material-ui/lab";
// import { useHistory } from "react-router-dom";

// import useStyles from "../../../styles/GlobalStyles";
// import { useQuery } from "@apollo/client";
// import { GET_MISC } from "../../../queries/misc";
// import Image from "cloudinary-react/lib/components/Image";

// function FeaturedSection() {
//   const classes = useStyles();
//   const history = useHistory();
//   const refs = useRef(null);
//   const featureRef = useRef(null);
//   const feature2Ref = useRef(null);
//   const [imgRef, setImgRef] = useState({});
//   const [feature1Ref, setFeature1Ref] = useState({});
//   const [error, setError] = useState(false);
//   const { data: getMiscData } = useQuery(GET_MISC, {
//     fetchPolicy: "cache-and-network",
//   });

//   const [zipValue, setZipValue] = useState("");

//   const [offset, setOffset] = useState(0);
//   const muiTheme = useTheme();

//   useEffect(() => {
//     function handleScroll() {
//       setOffset(window.pageYOffset);
//     }

//     if (getMiscData) {
//       if (featureRef?.current) {
//         setFeature1Ref({ ...feature1Ref, ref: featureRef.current });
//       }

//       setImgRef({
//         ...imgRef,
//         width: refs.current.width,
//         height: refs.current.height,
//       });
//     }

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [offset]);

//   const handleZipInput = (e) => {
//     setZipValue(e.target.value);
//     setError(false);
//   };

//   const onRemoveError = () => setError(false);

//   const handleZipSubmit = (e) => {
//     e.preventDefault();
//     if (!zipValue || zipValue?.length < 1) {
//       setError(true);
//     } else {
//       setError(false);
//       history.push(`/chefs/zipcode/${zipValue}`);
//     }
//   };

//   const isMd = useMediaQuery(muiTheme.breakpoints.down("md"));
//   const isSm = useMediaQuery(muiTheme.breakpoints.down("sm"));
//   let mediaQuery;

//   if (isMd) {
//     mediaQuery = offset * 0.04;
//   } else mediaQuery = offset * 0.04;

//   const data = getMiscData ? getMiscData.getMisc?.featuredDishes : null;

//   return (
//     <Box></Box>
//     // <Container style={{ overflowX: "hidden" }}>
//     //   <Typography variant="h3" align="center" className={classes.fontBold}>
//     //     Featured Dishes
//     //   </Typography>
//     //   <Box py={10}>
//     //     <Grid container alignItems="stretch" spacing={2}>
//     //       <Grid container item xs={12} md={6}>
//     //         {getMiscData ? (
//     //           <Box
//     //             position="relative"
//     //             ref={featureRef}
//     //             height="100%"
//     //             style={
//     //               isSm
//     //                 ? {
//     //                     transform: `translateX(${mediaQuery / 1.5}px)`,
//     //                     width: "75%",
//     //                     transition: "transform 1s",
//     //                   }
//     //                 : {
//     //                     transform: "translateX(0px)",
//     //                     width: "100%",
//     //                   }
//     //             }
//     //           >
//     //             <Image
//     //               publicId={data[0]?.image}
//     //               cloudName="defivdghh"
//     //               className={`${classes.mxWidth} ${classes.mxHeight} ${classes.featuredImage}`}
//     //               secure="true"
//     //               width="max"
//     //             ></Image>
//     //             <Box
//     //               bgcolor={muiTheme.palette.warning.dark}
//     //               className={classes.featuredOverlay}
//     //             >
//     //               <Box py={3} className={classes.featuredText}>
//     //                 <Typography variant="h4" paragraph>
//     //                   {data[0]?.headline}
//     //                 </Typography>
//     //                 <Typography paragraph>
//     //                   Explore Dishes In Your Area
//     //                 </Typography>
//     //                 <Paper
//     //                   component="form"
//     //                   onSubmit={handleZipSubmit}
//     //                   className={classes.searchButton}
//     //                 >
//     //                   <InputAdornment position="start">
//     //                     <LocationOn />
//     //                   </InputAdornment>
//     //                   <InputBase
//     //                     placeholder="Enter Zip Code"
//     //                     onChange={handleZipInput}
//     //                     type="number"
//     //                     value={zipValue}
//     //                     inputProps={{
//     //                       "aria-label": "Enter Zip Code",
//     //                       min: 0,
//     //                     }}
//     //                   />
//     //                   <InputAdornment position="end">
//     //                     <Divider
//     //                       className={classes.divider}
//     //                       orientation="vertical"
//     //                       color="secondary"
//     //                     />
//     //                     <IconButton
//     //                       type="submit"
//     //                       size="medium"
//     //                       className={classes.iconButton}
//     //                       aria-label="search"
//     //                       color="secondary"
//     //                     >
//     //                       <Search />
//     //                     </IconButton>
//     //                   </InputAdornment>
//     //                 </Paper>
//     //               </Box>
//     //             </Box>
//     //           </Box>
//     //         ) : (
//     //           <Skeleton variant="rect" width="100%" height={600} />
//     //         )}
//     //       </Grid>

//     //       <Grid container item xs={12} md={6}>
//     //         <Box width="100%" className={classes.hero}>
//     //           <Box
//     //             ref={feature2Ref}
//     //             mt={5}
//     //             style={
//     //               isSm
//     //                 ? {
//     //                     marginLeft: "50%",
//     //                     transform: `translateX(-${mediaQuery * 0.4}%)`,
//     //                     transition: "transform 1s",
//     //                     width: "70%",
//     //                   }
//     //                 : {
//     //                     transform: `translateY(-${mediaQuery * 2}px)`,
//     //                     transition: "transform 1s",
//     //                     width: "100%",
//     //                   }
//     //             }
//     //             position="relative"
//     //             height="100%"
//     //           >
//     //             <Box mb={3} mt={10} position="relative">
//     //               {getMiscData ? (
//     //                 <>
//     //                   <Image
//     //                     publicId={data[1]?.image}
//     //                     cloudName="defivdghh"
//     //                     className={`${classes.mxWidth} ${classes.mxHeight} ${classes.featuredImage}`}
//     //                     secure="true"
//     //                     width="max"
//     //                   ></Image>
//     //                   <Box
//     //                     bgcolor={muiTheme.palette.warning.dark}
//     //                     className={classes.featuredOverlay}
//     //                     style={{ zIndex: 1 }}
//     //                   >
//     //                     <Box
//     //                       py={3}
//     //                       className={classes.featuredText}
//     //                       style={{ height: "100%", top: "60%" }}
//     //                     >
//     //                       <Typography variant="h4" paragraph>
//     //                         {data[1].headline}
//     //                       </Typography>
//     //                       <Typography paragraph>
//     //                         Explore Dishes In Your Area
//     //                       </Typography>
//     //                       <Paper
//     //                         component="form"
//     //                         onSubmit={handleZipSubmit}
//     //                         className={classes.searchButton}
//     //                       >
//     //                         <InputAdornment position="start">
//     //                           <LocationOn />
//     //                         </InputAdornment>
//     //                         <InputBase
//     //                           placeholder="Enter Zip Code"
//     //                           onChange={handleZipInput}
//     //                           type="number"
//     //                           value={zipValue}
//     //                           className={classes.width75}
//     //                           inputProps={{
//     //                             min: 0,
//     //                             "aria-label": "Enter Zip Code",
//     //                           }}
//     //                         />
//     //                         <InputAdornment position="end">
//     //                           <Divider
//     //                             className={classes.divider}
//     //                             orientation="vertical"
//     //                             color="secondary"
//     //                           />
//     //                           <IconButton
//     //                             type="submit"
//     //                             size="medium"
//     //                             className={classes.iconButton}
//     //                             aria-label="search"
//     //                             color="secondary"
//     //                           >
//     //                             <Search />
//     //                           </IconButton>
//     //                         </InputAdornment>
//     //                       </Paper>
//     //                     </Box>
//     //                   </Box>
//     //                 </>
//     //               ) : (
//     //                 <Skeleton variant="rect" width="100%" height={300} />
//     //               )}
//     //             </Box>

//     //             <Box>
//     //               <Box width="100%" position="relative" height="100%">
//     //                 <Grid container justify="space-between">
//     //                   <Grid container item xs={6}>
//     //                     {getMiscData ? (
//     //                       <Box>
//     //                         <Image
//     //                           publicId={data[2]?.image}
//     //                           cloudName="defivdghh"
//     //                           ref={refs}
//     //                           className={`${classes.mxWidth} ${classes.featuredImage}`}
//     //                           secure="true"
//     //                           width="max"
//     //                         ></Image>
//     //                         <Box
//     //                           bgcolor={muiTheme.palette.warning.dark}
//     //                           className={classes.featuredOverlay}
//     //                           style={{
//     //                             zIndex: 1,
//     //                             width: "60%",
//     //                             height: "120%",
//     //                           }}
//     //                         >
//     //                           <Box
//     //                             mx={2}
//     //                             py={3}
//     //                             className={classes.featuredText}
//     //                             style={{
//     //                               height: "100%",
//     //                               width: "100%",
//     //                               left: "50%",
//     //                               top: "50%",
//     //                             }}
//     //                           >
//     //                             <Typography variant="h6" paragraph>
//     //                               Chicken made by Chef Carlos
//     //                             </Typography>
//     //                             <Typography paragraph variant="body2">
//     //                               Explore Dishes In Your Area
//     //                             </Typography>
//     //                             <Paper
//     //                               component="form"
//     //                               onSubmit={handleZipSubmit}
//     //                               className={classes.searchButton}
//     //                               style={{ width: "90%" }}
//     //                             >
//     //                               <InputAdornment position="start">
//     //                                 <LocationOn />
//     //                               </InputAdornment>
//     //                               <InputBase
//     //                                 placeholder="Enter Zip Code"
//     //                                 onChange={handleZipInput}
//     //                                 type="number"
//     //                                 className={classes.width75}
//     //                                 value={zipValue}
//     //                                 inputProps={{
//     //                                   "aria-label": "Enter Zip Code",
//     //                                   min: 0,
//     //                                 }}
//     //                               />
//     //                               <InputAdornment position="end">
//     //                                 <Divider
//     //                                   className={classes.divider}
//     //                                   orientation="vertical"
//     //                                   color="secondary"
//     //                                 />
//     //                                 <IconButton
//     //                                   type="submit"
//     //                                   size="medium"
//     //                                   className={classes.iconButton}
//     //                                   aria-label="search"
//     //                                   color="secondary"
//     //                                 >
//     //                                   <Search />
//     //                                 </IconButton>
//     //                               </InputAdornment>
//     //                             </Paper>
//     //                           </Box>
//     //                         </Box>
//     //                       </Box>
//     //                     ) : (
//     //                       <Skeleton variant="rect" width="100%" height={250} />
//     //                     )}
//     //                   </Grid>

//     //                   <Grid
//     //                     container
//     //                     direction="column"
//     //                     justify="center"
//     //                     item
//     //                     xs={5}
//     //                   >
//     //                     {getMiscData ? (
//     //                       <>
//     //                         <Box display="block" position="relative">
//     //                           <Typography variant="h5" paragraph>
//     //                             Chicken
//     //                           </Typography>
//     //                           <Typography variant="body1" paragraph>
//     //                             Chef Ly
//     //                           </Typography>
//     //                         </Box>
//     //                         <Box display="block" position="relative">
//     //                           <Typography variant="h5" paragraph>
//     //                             Chicken
//     //                           </Typography>
//     //                           <Typography variant="body1" paragraph>
//     //                             Chef Ly
//     //                           </Typography>
//     //                         </Box>
//     //                       </>
//     //                     ) : (
//     //                       <Skeleton variant="rect" width="100%" height={250} />
//     //                     )}
//     //                   </Grid>
//     //                 </Grid>
//     //               </Box>
//     //             </Box>
//     //           </Box>
//     //         </Box>
//     //       </Grid>
//     //     </Grid>
//     //   </Box>

//     //   <Snackbar open={error} autoHideDuration={3000} onClose={onRemoveError}>
//     //     <Alert severity="error" onClose={onRemoveError}>
//     //       Error, Please check your input
//     //     </Alert>
//     //   </Snackbar>
//     // </Container>
//   );
// }

// export default FeaturedSection;
