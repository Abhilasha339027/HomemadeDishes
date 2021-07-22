import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import useStyles from "../../../../styles/GlobalStyles";
import ReactCardFlip from "react-card-flip";
import {
 
  Typography,
} from "@material-ui/core";

const Detail = (props) => {

  const classes = useStyles();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    
    
     <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div>
          <Card
           
            className={classes.foodItem}
            // onClick={handleClick}
            onMouseEnter={handleClick}
            
          >
            <CardActionArea>
              <div style={{display: 'flex', alignItems:'center', justifyContent: 'center', marginTop: '20px'}}>
              <CardMedia
                style={{ height: 110, width: 125 }}
                image={props.image}
                title="Contemplative Reptile"
                align='center'
              />
              </div>
             

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="h2"
                  className={classes.fontBold}
                  align='center'
                >
                  {props.heading}
                </Typography>
                {/* <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.fontBold2}
                >
                  While doing what they are re passionate about, Yummymaker.com
                  has helped a number of local chefs create extra source of
                  income.
                </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

        <div>
          <Card
            // style={{ minWidth: 345, minHeight: 352 }}
            className={classes.foodItem}
            // onClick={handleClick}
            style={{ padding: '30px' }}
            onMouseLeave={handleClick}
            // onMouseEnter={handleClick}
          >
            <CardActionArea>
              {/* <CardMedia
                style={{ height: 140 }}
                image={props.image}
                title="Contemplative Reptile"
              /> */}

              <CardContent>
                {/* <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.fontBold}
                >
                  MAKE EXTRA MONEY
                </Typography> */}
                <Typography
                    paragraph
                  color="textSecondary"
                  className={classes.fontBold2}
                  align='center'
                  m={8}
                >
                  {props.info}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </ReactCardFlip>
  
      
    
  );
};

export default Detail;
