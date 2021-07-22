import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  debounce,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import useStyles from "../../../styles/GlobalStyles";
import { useHistory } from "react-router-dom";
import Image from "cloudinary-react/lib/components/Image";
import Transformation from "cloudinary-react/lib/components/Transformation";
import Placeholder from "cloudinary-react/lib/components/Placeholder";

const ChefCardItem = (props) => {
  const cardRef = useRef();
  const classes = useStyles();
  const [cardDimensions, setCardDimensions] = React.useState({
    width: "max",
    height: "400",
  });
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const currentCardDim = cardRef.current;
    setCardDimensions({
      width: currentCardDim.clientWidth,
      height: currentCardDim.clientHeight,
    });

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });

      let dimension = cardRef.current;
      setCardDimensions({
        width: dimension.clientWidth,
        height: dimension.clientHeight,
      });
    }, 300);

    window.addEventListener("resize", debouncedHandleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [dimensions]);

  const foodItems = props.chef.foodItems;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/chef/${props.zipCode}/${props.chef.handle}`);
  };
  
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Card elevation={10} className={classes.chefCard} >
          <Carousel animation="slide" navButtonsAlwaysVisible autoPlay={false} className={classes.chefCard}>
            {foodItems.map((item, index) => {
              return (
                <CardActionArea ref={cardRef} onClick={handleClick} key={index} className={classes.chefCard}>
                  <div className={classes.chefCard} >
                    <Image
                      dpr="auto"
                      width={cardDimensions.width}
                      height="340"
                      // responsive
                      // responsiveUseBreakpoints="true"
                      secure="true"
                      publicId={item.image}
                      cloudName="defivdghh"
                      loading="lazy"
                    >
                      <Placeholder type="blur"></Placeholder>
                    </Image>
                    <CardContent className={classes.chefCard}>
                      <Grid container justify="space-between" className={classes.chefCard}>
                        <Grid item className={classes.chefCard}>
                          <Typography
                            variant="body1"
                            className={classes.textItalic}
                          >
                            {item.chefName}
                          </Typography>
                          <Typography
                            variant="h6"
                            className={classes.fontBold1}
                          >
                            {item.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar alt={item.chefName}>
                            <Avatar>
                              <Image
                                publicId={props.chef.avatar}
                                cloudName="defivdghh"
                                secure="true"
                              >
                                <Transformation
                                  width="40"
                                  height="40"
                                  gravity="face"
                                  crop="thumb"
                                />
                              </Image>
                            </Avatar>
                          </Avatar>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                  </div>
                </CardActionArea>
              );
            })}
          </Carousel>
        </Card>
      </Grid>
    </>
  );
};

export default ChefCardItem;
