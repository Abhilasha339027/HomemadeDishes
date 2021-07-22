import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import AddCircle from "@material-ui/icons/AddCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  useTheme,
} from "@material-ui/core";
import { CartContext } from "../../../contexts/cartContext";
import Image from "cloudinary-react/lib/components/Image";
import { debounce } from "../../util/fp";
import useStyles from "../../../styles/GlobalStyles";

export default function SinglefoodItem({ food }) {
  const classes = useStyles();
  const cardRef = useRef();

  const [cardDimensions, setCardDimensions] = useState({
    width: 100,
    height: 200,
  });

  const [cart, setCart] = useState({
    food: { name: "", price: 0, quantity: 0, availableDay: [], chefID: "" },
  });

  const [expanded, setExpanded] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    let dimension = cardRef.current;
    setCardDimensions({
      width: dimension.clientWidth,
      height: dimension.clientHeight,
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

  const handleExpandClick = () => {
    setExpanded(true);
  };

  const handleExpandClose = () => {
    setExpanded(false);
  };

  const { mainCart, setmainCart } = useContext(CartContext);

  const onAddToCart = () => {
    setCart({
      food: {
        name: food.name,
        price: food.price,
        quantity: ++cart.food.quantity,
        chefLoc: food.chef.placeId,
        chefAll: food.chef,
        foodId: food.id,
        chef: food.chef.firstName,
        availableDay: food.availableDay,
      },
    });
  };

  const onRemoveFromCart = () => {
    if (cart.food.quantity === 1) {
      setCart({
        food: { name: "", price: 0, quantity: 0, foodId: "", availableDay: [] },
      });
    } else if (cart.food.quantity > 1) {
      setCart({
        food: { ...cart.food, quantity: --cart.food.quantity },
      });
    }
  };

  const onSubmitCart = (e) => {
    let saveCart = {};
    if (cart.food.quantity > 0) {
      saveCart = { ...mainCart, ["a" + food.id]: { ...cart.food } };
    } else {
      delete mainCart["a" + food.id];
    }

    setmainCart({ ...mainCart, ...saveCart });
  };
  const theme = useTheme();
  return (
    <>
      <Card elevation={3} ref={cardRef} className={classes.foodItem}>
        <CardHeader
          className={classes.fontBold}
          title={food.name}
          action={
            <Typography variant="body1" component="p" color="secondary">
              ${food.price}
            </Typography>
          }
        ></CardHeader>
        <CardMedia>
          <Image
            secure="true"
            width={cardDimensions.width}
            crop="fill"
            publicId={food.image}
            cloudName="defivdghh"
          ></Image>
        </CardMedia>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.fontBold2}
          >
            {food.description}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton
            color="inherit"
            aria-label="remove from cart"
            onClick={onRemoveFromCart}
          >
            <RemoveCircle />
          </IconButton>

          <Typography>{cart.food.quantity}</Typography>

          <IconButton
            color="inherit"
            aria-label="add to cart"
            onClick={onAddToCart}
          >
            <AddCircle />
          </IconButton>
          <div>
            <Button
              onClick={onSubmitCart}
              color="primary"
              // fullWidth
              style={{ width: "20%", marginRight: "6px", paddng: "4px" }}
              variant="contained"
              size="small"
              className={classes.textbutton}
            >
              Add
            </Button>
            {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon color="error" />
        </IconButton> */}
            <Button
              variant="outlined"
              color="secondary"
              style={{ width: "20%", marginLeft: "2px" }}
              onClick={handleExpandClick}
              size="small"
              className={classes.textbutton}
            >
              Details
            </Button>
          </div>
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.textSecondary}>
          <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph variant="body2">
            {food?.ingredients?.join(", ")}
          </Typography>
          <Typography paragraph>Allergy Warning:</Typography>
          <Typography paragraph variant="body2">
            {food?.allergyWarning}
          </Typography>
          <Typography paragraph>Portion Size:</Typography>
          <Typography paragraph variant="body2">
            {food?.serving} Servings
          </Typography>
          <Typography paragraph>Price:</Typography>
          <Typography paragraph variant="body2">
            {food.price}
          </Typography>
        </CardContent>
      </Collapse> */}
      </Card>
      <Dialog
        onClose={handleExpandClose}
        aria-labelledby="customized-dialog-title"
        open={expanded}
        // PaperProps={{ elevation: 10 }}
        maxWidth="xs"
        PaperProps={{
          style: {
            backgroundColor: theme.palette.secondary.extra,
          },
          elevation: 10,
        }}
      >
        <Image
          secure="true"
          width="max"
          height="300"
          publicId={food.image}
          cloudName="defivdghh"
        ></Image>
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleExpandClose}
          className={classes.fontBold}
        >
          {food.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="body2"
            gutterBottom
            className={classes.fontBold2}
          >
            {food.description}
          </Typography>

          <Typography gutterBottom variant="body2" className={classes.fontBold}>
            Ingredients
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className={classes.fontBold2}
          >
            {food.ingredients}
          </Typography>

          <Typography variant="body2" className={classes.fontBold} gutterBottom>
            Allergy Warnings
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className={classes.fontBold2}
          >
            {food.allergyWarning}
          </Typography>
          <Typography gutterBottom variant="body2" className={classes.fontBold}>
            Portion Size
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            className={classes.fontBold2}
          >
            {food.serving} Servings
          </Typography>
        </DialogContent>
        <DialogActions>
          <IconButton
            color="inherit"
            aria-label="remove from cart"
            onClick={onRemoveFromCart}
          >
            <RemoveCircle />
          </IconButton>

          <Typography>{cart.food.quantity}</Typography>

          <IconButton
            color="inherit"
            aria-label="add to cart"
            onClick={onAddToCart}
          >
            <AddCircle />
          </IconButton>
          <Button
            onClick={onSubmitCart}
            color="primary"
            fullWidth
            variant="contained"
            className={classes.textbutton}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
