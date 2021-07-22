import React from "react";
import Detail from './Detail';

import {
 
  Box,
  Container,
 
  Grid,
} from "@material-ui/core";
// const useStyles = makeStyles({
//   root: {
//     minWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });
import money from "../../../../media/money-bag.png";
import calendar from "../../../../media/calendar.png";
// import savings from "../../../../media/savings.png";
import posting from "../../../../media/posting.png";
import expand from "../../../../media/expand.png";
import growth from "../../../../media/growth.png";

export default function Whyetails() {
  // const classes = useStyles();
  // const [isFlipped, setIsFlipped] = useState(false);


  const data=[
    {
      image: money,
      heading: 'MAKE EXTRA MONEY',
      info: "While doing what they are re passionate about, Yummymaker.com has helped a number of local chefs create extra source of income."

    },
    {
      image: calendar,
      heading: 'CONTROL YOUR SCHEDULE',
      info: "With Yummymaker.com, you become your own boss. You get to choose when you work based on your personal schedule and who you want to work with."

    },
    {
      image: expand,
      heading: 'EXPAND YOUR CRAFT',
      info: "Connect with new clients on Yummymaker.com to give your business the exposure it needs and boost your sales."

    },
    {
      image: growth,
      heading: 'FREE STORE MANAGER',
      info: "With an easy to operate platform and excellent store management system, your culinary business is sure to thrive on Yummymaker.com. "

    },
    {
      image: posting,
      heading: 'UNLIMITED POSTING',
      info: "While doing what they are re passionate about, Yummymaker.com has helped a number of local chefs create extra source of income.We provide local chefs with unlimited posting, placing you right in front of your target audience and customers who need your specific service."

    },
    {
      image: money,
      heading: 'LOW SERVICE FEE',
      info: "With a fair pricing system and no hidden charges, we charge as low as 20% on every sales you make."

    },

  ];

  // const handleClick = () => {
  //   setIsFlipped(!isFlipped);
  // };

  return (
    <Box>
      <Container>
      
        <Grid container alignContent="center" justify="center" spacing={6}>
          {data.map( card => {
            return(
              <Grid item xs={12} sm={6} lg={4}>
                <Detail
                heading={card.heading}
                info={card.info}
                image={card.image}/>
              </Grid> 
            )
          }) }
         
        </Grid>
      </Container>
    </Box>
  );
}
