import React from "react";
import { Container, Grid, Typography,  useMediaQuery,  Box,
  Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Errori from '../../../media/error5.png';
import useStyles from "../../../styles/GlobalStyles";

const Error = () => {

   const classes = useStyles();
  //  const theme = useTheme();
   const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
   
    <div style={{margin: isXs ? "2px" : "50px", display: 'flex', alignItems:'center', justifyContent: 'center', marginTop: '100px'}}>
      <Container>
        <Card   variant="outlined" style={{padding: isXs ? "10px" : "50px", background: 'transparent', boxShadow: "2px 2px 20px #000" }}>
          <CardActionArea style={{justifyContent: 'center'}}> 
            <Grid container alignContent="center" justify="center" spacing={1}>
              <Grid item xs={12} sm={6} style={{textAlign: 'center'}}>
              <div style={{display: 'flex', alignItems:'center', justifyContent: 'center', marginTop: '20px'}}>
              <CardMedia
                style={{ height: 500, width: 290, textAlign: 'center'}}
                image={Errori}
              
                title="Contemplative Reptile"
                align='center'
              />
              </div>
              </Grid>
              <Grid item xs={12} sm={6}>
              <div style={{display: 'flex', alignItems:'center', justifyContent: 'center', marginTop: '20px'}}>
                <CardContent>
                  <Typography
                     gutterBottom
                    variant="h2"
                    component="h2"
                    align="center"
                    className={classes.errorText}
                  >
                      Oops...
                  </Typography>
                  <Typography
                 variant="h5"
                 gutterBottom
                //  color="textSecondary"
                 component="p"
                 align="center"
                 className={classes.errorText}
               >
                Something went wrong!
               </Typography>
               <Typography
               gutterBottom
                 variant="body1"
                //  color="textSecondary"
                 component="p"
                 align="center"
                 className={classes.fontBold2}
               >
                uh oh, we can't seem to find the page you're looking for. Try going back to the previous page or you may find what you were looking for on our homepage;
               </Typography>
               <Box mt={1} style={{textAlign: 'center'}}>
                        <Button
                          color="secondary"
                          href="/"
                          type="submit"
                          variant="outlined"
                          style={{textAlign: 'center'}}
                        >
                          Go Home
                        </Button>
                      </Box>
                </CardContent>
                </div>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  );
};

export default Error;
