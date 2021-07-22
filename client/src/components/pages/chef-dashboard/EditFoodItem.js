import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_MY_FOOD_ITEMS,
  GET_FOOD_ITEM_BY_ID,
  UPDATE_FOOD_ITEM,
} from "../../../queries/food";
import useStyles from "../../../styles/GlobalStyles";
import { Switch } from "@material-ui/core";
import Image from "cloudinary-react/lib/components/Image";
import Transformation from "cloudinary-react/lib/components/Transformation";
import Loader from "../../util/Loader";

const getCurrentDish = (id, data) => {
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.id === id) {
      return element;
    }
  }
};

function EditFoodItem(props) {
  const id = props.match.params.id;
  const classes = useStyles();
  const { data, error, loading } = useQuery(GET_ALL_MY_FOOD_ITEMS);
  const dish = getCurrentDish(id, data.getAllMyFoodItems);
  // const { data, loading, error } = useQuery(GET_FOOD_ITEM_BY_ID, {
  //   variables: { id },
  // });

  const [values, setValues] = useState({
    name: dish?.name,
    allergyWarning: dish?.allergyWarning,
    serving: dish?.serving,
    description: dish?.description,
    price: dish?.price,
    ingredients: dish?.ingredients,
    availableDay: dish?.availableDay,
    isAvailable: dish?.isAvailable,
    image: dish?.image,
  });

  const changeAvailability = () => {
    setValues({ ...values, isAvailable: !values.isAvailable });
  };

  const [updateFoodItem] = useMutation(UPDATE_FOOD_ITEM, {
    // update: (proxy, result) => {
    //   console.log(result);
    //   let data = proxy.readQuery({
    //     query: GET_FOOD_ITEM_BY_ID,
    //     variables: { id },
    //   });
    update: (proxy, { data }) => {
      // console.log(proxy, data.updateFoodItem);
      let newData = proxy.readQuery({ query: GET_ALL_MY_FOOD_ITEMS });
      console.log(newData);
      let updatedData = newData.getAllMyFoodItems.map((item, index) => {
        if (item.id === data.updateFoodItem) {
          return data.updateFoodItem;
        } else {
          return item;
        }
      });
      console.log(updatedData);
      // proxy.writeQuery({
      //   query: GET_ALL_MY_FOOD_ITEMS,
      //   data: {
      //     getAllMyFoodItems: {},
      //   },
      // });
    },

    //   proxy.writeQuery({
    //     query: GET_FOOD_ITEM_BY_ID,
    //     variables: { id },
    //     result,
    //   });
    // },

    onError: (err) => console.log(err),
  });

  // if (newData) console.log(newData);
  // else if (newError) console.log(newError);

  const handleSubmit = (e) => {
    e.preventDefault();
    let ingredients =
      typeof values.ingredients === "string"
        ? values.ingredients.split(",")
        : values.ingredients;
    let availableDay =
      typeof values.availableDay === "string"
        ? values.availableDay.split(",")
        : values.availableDay;
    let price =
      typeof values.price === "string"
        ? parseFloat(values.price)
        : values.price;

    let serving =
      typeof values.serving === "string"
        ? parseFloat(values.serving)
        : values.serving;

    updateFoodItem({
      variables: {
        ...values,
        id,
        ingredients,
        availableDay,
        price,
        serving,
      },
    });
  };

  const handleImageSubmit = async (e) => {
    var file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", "defivdghh");
    formdata.append("upload_preset", "po0ime55");

    let res = await fetch(
      "https://api.cloudinary.com/v1_1/defivdghh/image/upload",
      {
        method: "POST",
        mode: "cors",
        body: formdata,
      }
    );

    let json = await res.json();
    setValues({ ...values, image: json.public_id });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <Loader />;
  } else if (data) {
    return (
      <Box mt={6} textAlign="center">
        <Container>
          <Grid>
            <Typography variant="h3" gutterBottom>
              Edit Food item
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2} justify="flex-end">
                <Grid item>
                  <Grid container spacing={6}>
                    <Grid item>
                      <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        variant="filled"
                        color="secondary"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        fullWidth
                        name="allergyWarning"
                        onChange={handleChange}
                        label="Allergy Warning"
                        variant="filled"
                        color="secondary"
                        value={values.allergyWarning}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={6}>
                    <Grid item>
                      <TextField
                        fullWidth
                        name="serving"
                        label="Servings"
                        variant="filled"
                        color="secondary"
                        value={values.serving}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        fullWidth
                        name="price"
                        label="price"
                        variant="filled"
                        color="secondary"
                        onChange={handleChange}
                        value={values.price}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={6}>
                    <Grid item>
                      <TextField
                        fullWidth
                        name="ingredients"
                        label="ingredients"
                        variant="filled"
                        color="secondary"
                        onChange={handleChange}
                        value={values.ingredients}
                      />
                      <Typography variant="subtitle2" paragraph>
                        Add a Comma separated list (Rice,Chicken,Onion)
                      </Typography>
                    </Grid>

                    <Grid item>
                      <TextField
                        fullWidth
                        name="availableDay"
                        label="Available days"
                        variant="filled"
                        color="secondary"
                        onChange={handleChange}
                        value={values.availableDay}
                      />

                      <Typography variant="subtitle2" paragraph>
                        Add a Comma separated list ("Thursday,Saturday,Monday")
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.isAvailable}
                        onChange={changeAvailability}
                        name="isAvailable"
                      />
                    }
                    label="Are you currently available for orders ?"
                    InputLabelProps={{
                      classes: {
                        root: classes.textPlaceholder,
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    name="description"
                    label="Description"
                    variant="filled"
                    multiline
                    color="secondary"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  {values.image ? (
                    <Image
                      publicId={values.image}
                      cloudName="defivdghh"
                      secure="true"
                    >
                      <Transformation
                        width="200"
                        height="200"
                        gravity="face"
                        crop="thumb"
                      />
                    </Image>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item>
                  <input
                    accept="image/*"
                    className={classes.uploadInput}
                    id="contained-button-file"
                    onChange={handleImageSubmit}
                    type="file"
                  />

                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="secondary"
                      component="span"
                    >
                      Upload Image
                    </Button>
                  </label>
                </Grid>

                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    name="submit"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      </Box>
    );
  } else if (error?.graphQLErrors[0]?.extensions) {
    console.log(error);
  }
}

export default EditFoodItem;
