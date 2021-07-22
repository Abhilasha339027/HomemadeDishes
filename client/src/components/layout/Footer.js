import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import logo from "../../media/yummylogo.png";
import useStyles from "../../styles/GlobalStyles";

function Footer() {
  const classes = useStyles();

  return (
    <>
      <Box>
        <Paper square elevation={2} className={classes.footer}>
          <Box py={3} textAlign="center">
            <Container>
              <Grid container justify="space-evenly" spacing={3}>
                <Grid item xs={12} md={12}>
                  <Box width={300} mx="auto">
                  <Typography className={classes.fontBold} variant="h6">
                    YummyMaker
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.fontBold} variant="h6">
                      THE EXPOSURE LOCAL CHEFS NEEDS.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      className={classes.fontBold}
                    >
                      THE QUALITY MEALS CUSTOMERS DESERVE.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography className={classes.fontBold}>Links</Typography>
                  <Box py={1}>
                    <Link href="/" className={classes.fontBold2}>
                      Privacy Policy
                    </Link>
                  </Box>
                  <Box pb={1}>
                    <Link
                      href="/"
                      className={classes.fontBold2}
                    >
                      Terms of Service
                    </Link>
                  </Box>
                  <Box pb={1}>
                    <Link href="/" className={classes.fontBold2}>
                      Become a Chef
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography className={classes.fontBold}>Follow</Typography>
                  <Box py={1}>
                    <Link
                      href="/ "
                      target="_blank"
                      className={classes.fontBold2}
                    >
                      Facebook
                    </Link>
                  </Box>
                  <Box pb={1}>
                    <Link
                      href="/ "
                      target="_blank"
                      className={classes.fontBold2}
                    >
                      Instagram
                    </Link>
                  </Box>
                  {/* <Box pb={1}>
                    <Link href="/twitter" className={classes.fontBold2}>
                      Twitter
                    </Link>
                  </Box> */}
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box py={2} textAlign="center">
            <Typography className={classes.fontBold2} variant="subtitle2">
              © YummyMaker 2020. All Rights Reserved.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default Footer;
