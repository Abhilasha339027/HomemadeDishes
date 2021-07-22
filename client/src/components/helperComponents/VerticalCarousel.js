import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Brightness1 } from "@material-ui/icons";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import useStyles from "../../styles/GlobalStyles";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { Search, LocationOn } from "@material-ui/icons";

const VerticalCarousel = ({ data, leadingText }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zipValue, setZipValue] = useState("");
  const [error, setError] = useState(false);
  const classes = useStyles();
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const history = useHistory();

  useEffect(() => {
    const incIndex = setInterval(() => {
      setActiveIndex(() => {
        if (activeIndex === 2) {
          return 0;
        }
        return activeIndex + 1;
      });
    }, 10000);
    return () => {
      clearInterval(incIndex);
    };
  }, [activeIndex]);

  // const handleClick = (direction) => {
  //   setActiveIndex((prevIndex) => {
  //     if (direction === "next") {
  //       if (prevIndex + 1 > data.length - 1) {
  //         return 0;
  //       }
  //       return prevIndex + 1;
  //     }

  //     if (prevIndex - 1 < 0) {
  //       return data.length - 1;
  //     }

  //     return prevIndex - 1;
  //   });
  // };

  const handleZipInput = (e) => {
    setZipValue(e.target.value);
    setError(false);
  };

  const changeActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const onRemoveError = () => setError(false);

  const handleZipSubmit = (e) => {
    e.preventDefault();
    if (!zipValue || zipValue?.length < 1) {
      setError(true);
    } else {
      setError(false);
      history.push(`/chefs/zipcode/${zipValue}`);
    }
  };

  return (
    <Box>
      <Grid
        container
        justify="space-between"
        spacing={sm ? 2 : 0}
        alignItems="center"
        
      >
        <Grid item xs={12} sm={5}>
          <img
            src={data[activeIndex].content.headImage}
            alt={data[activeIndex].introline}
            className={`${classes.mxWidth} ${classes.mxHeight} ${classes.featuredImage}`}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.newBackground}>
          <img
            src={data[activeIndex].content.image}
            alt={data[activeIndex].introline}
            className={classes.mxWidth}
          />
          <Box textAlign="center" my={2}>
            <Typography paragraph variant="h5" 
            className={classes.textItalic}>
              {data[activeIndex].content.name}
            </Typography>
            <Typography paragraph variant="h5" className={classes.fontBold}>
              {data[activeIndex].content.cuisine}
            </Typography>
            <Typography paragraph className={classes.fontBold2}>{data[activeIndex].content.copy}</Typography>
          </Box>
          <Paper
            component="form"
            onSubmit={handleZipSubmit}
            className={classes.searchButton}
          >
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
            <InputBase
              placeholder="Enter Zip Code"
              onChange={handleZipInput}
              type="number"
              className={classes.width75}
              value={zipValue}
              inputProps={{
                "aria-label": "Enter Zip Code",
              }}
            />
            <InputAdornment position="end">
              <Divider
                className={classes.divider}
                orientation="vertical"
                color="secondary"
              />
              <IconButton
                type="submit"
                size="medium"
                className={classes.iconButton}
                aria-label="search"
                color="secondary"
              >
                <Search />
              </IconButton>
            </InputAdornment>
          </Paper>
        </Grid>
        <Grid item xs={12} md={1}>
          <Grid
            container
            direction={sm ? "row" : "column"}
            justify="center"
            alignItems="center"
          >
            {data.map((data, index) => (
              <Grid item key={index}>
                <IconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  onClick={() => changeActiveIndex(index)}
                >
                  <Brightness1
                    fontSize="small"
                    color={activeIndex === index ? "secondary" : "inherit"}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Snackbar open={error} autoHideDuration={3000} onClose={onRemoveError}>
        <Alert severity="error" onClose={onRemoveError}>
          Error, Please check your input
        </Alert>
      </Snackbar>
    </Box>
  );
};

VerticalCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  leadingText: PropTypes.string.isRequired,
};

export default VerticalCarousel;
