import React, { useEffect, useRef } from "react";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import {
  motion,
  useAnimation,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import "./animated.css";
import useStyles from "../../../styles/GlobalStyles";
import { Skeleton } from "@material-ui/lab";
import Image from "./Image";
import { useOnScreen } from "../../util/hooks/hooks";
import { useInView } from "react-intersection-observer";
// import art1 from "../../../media/artboard1.svg";
// import art2 from "../../../media/artboard2.svg";
// import art3 from "../../../media/artboard3.svg";

function Animated({ data }) {
  // const { scrollYProgress } = useViewportScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const classes = useStyles();

  const animation = useAnimation();
  const [animateRef, inView, entry] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    } else {
      animation.start("hidden");
    }

    // return () => {
    //   animation.stop();
    // };
  }, [animation, inView]);

  const animateVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        mass: 1,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <Box pt={5} pb={10}>
      <Container>
        <Box my={5}>
          <Typography
            variant="h2"
            component="h3"
            align="center"
            className={classes.fontBold}
          >
            How It Works
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          ref={animateRef}
          alignItems="flex-end"
          justify="center"
        >
          {data.map((each, index) => (
            <Grid
              component={motion.div}
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              className={index === 1 ? classes.mt2 : ""}
              variants={animateVariants}
              initial="hidden"
              animate={animation}
            >
              <Box
                className={classes.wrapper}
                style={index === 1 ? { transform: "translateY(-5%)" } : {}}
              >
                <Box py={3}>
                  <motion.div
                    animate={{
                      translateY: [0, 5, 0],
                      transition: {
                        type: "spring",
                        duration: 2,
                        repeat: Infinity,
                      },
                    }}
                    className="animateable"
                  >
                    <Image img={index} />
                  </motion.div>
                </Box>
                <Box>
                  <Typography
                    align="center"
                    paragraph
                    className={classes.fontBold1}
                    color="textPrimary"
                  >
                    {each.h}
                  </Typography>
                </Box>
                <Box>
                  <Typography align="center"
                  className={classes.fontBold2}>{each.p}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Animated;
