import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Chip,
  InputAdornment,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useMutation } from "@apollo/client";
import { GET_FOODITEMS_BY_CHEFID } from "../../../queries/food";
import Transformation from "cloudinary-react/lib/components/Transformation";
import Image from "cloudinary-react/lib/components/Image";
import { AttachMoney } from "@material-ui/icons";

import { ADD_FOOD_ITEM } from "../../../queries/chef";
import useStyles from "../../../styles/GlobalStyles";
import Loader from "../../util/Loader";
import { keys } from "../../../keys";

function FoodItems() {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    allergyWarning: "",
    description: "",
    serving: 0,
    category: "",
    ingredients: [],
    isAvailable: false,
    price: 0,
    image: "",
  });

  const [errors, setErrors] = useState({});

  const [addFoodItem, { loading }] = useMutation(ADD_FOOD_ITEM, {
    update(proxy, result) {
      proxy.writeQuery({ query: GET_FOODITEMS_BY_CHEFID, result });
    },

    onError(err) {
      if (err?.graphQLErrors[0]?.extensions?.exception?.errors) {
        setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addFoodItem({
      variables: {
        ...values,
        price: parseFloat(values.price),
        serving: parseFloat(values.serving),
      },
    });
  };

  const handleImageSubmit = async (e) => {
    var file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", keys.CLOUDINARY_KEY);
    formdata.append("upload_preset", keys.CLOUDINARY_PRESET);
    let cloudinaryURL = `https://api.cloudinary.com/v1_1/${keys.CLOUDINARY_KEY}/image/upload`;

    let res = await fetch(cloudinaryURL, {
      method: "POST",
      mode: "cors",
      body: formdata,
    });

    let json = await res.json();
    setValues({ ...values, image: json.public_id });
  };

  const changeAvailability = (e) => {
    setValues({ ...values, isAvailable: !values.isAvailable });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAddIngredients = (chip) => {
    setValues((prevState) => ({
      ...values,
      ingredients: [...prevState.ingredients, chip],
    }));
  };

  const handleDelIngredients = (chip, index) => {
    let prevState = [...values.ingredients];
    prevState.splice(index, 1);
    setValues({ ...values, ingredients: prevState });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box mt={5}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h4" className={classes.fontBold} gutterBottom>
            Add new Item
          </Typography>

          <form noValidate onSubmit={handleSubmit}>
            <Box className={classes.formRoot}>
              <TextField
                fullWidth
                name="name"
                error={errors?.name ? true : false}
                helperText={errors?.name}
                label="Name"
                variant="filled"
                color="secondary"
                value={values.name}
                onChange={handleChange}
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.textPlaceholder,
                  },
                }}
              />

              <TextField
                fullWidth
                name="allergyWarning"
                onChange={handleChange}
                label="Allergy Warning"
                variant="filled"
                helperText={errors?.allergyWarning}
                color="secondary"
                error={errors?.allergyWarning ? true : false}
                value={values.allergyWarning}
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.textPlaceholder,
                  },
                }}
              />

              <TextField
                fullWidth
                name="serving"
                label="Servings"
                variant="filled"
                helperText={errors?.serving}
                error={errors?.serving ? true : false}
                color="secondary"
                value={values.serving}
                onChange={handleChange}
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.textPlaceholder,
                  },
                }}
              />

              <TextField
                fullWidth
                name="price"
                error={errors?.price ? true : false}
                label="price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
                helperText={errors?.price}
                variant="filled"
                color="secondary"
                onChange={handleChange}
                value={values.price}
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.textPlaceholder,
                  },
                }}
              />

              <TextField
                fullWidth
                name="category"
                error={errors?.category ? true : false}
                label="Category"
                helperText={errors?.category}
                variant="filled"
                color="secondary"
                onChange={handleChange}
                value={values.category}
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.textPlaceholder,
                  },
                }}
              />

              <Box mb={3}>
                <ChipInput
                  value={values.ingredients}
                  name="ingredients"
                  variant="filled"
                  error={errors?.ingredients ? true : false}
                  helperText={errors?.ingredients}
                  color="secondary"
                  label="Ingredients"
                  className={classes.textField}
                  InputLabelProps={{
                    classes: {
                      root: classes.textPlaceholder,
                    },
                  }}
                  chipRenderer={(chip) => {
                    return (
                      <Chip
                        value={chip.text}
                        color="secondary"
                        variant="outlined"
                        label={chip.value}
                        onDelete={chip.handleDelete}
                      />
                    );
                  }}
                  onDelete={(chip, index) => handleDelIngredients(chip, index)}
                  onAdd={(chips) => handleAddIngredients(chips)}
                />
              </Box>
              {/* <Autocomplete
                          multiple
                          options={[{ title: "title" }]}
                          getOptionLabel={(option) => option.title}
                          color="secondary"
                          open={false}
                          onKeyPress={handleAddIngredients}
                          renderTags={(params) => (
                            <Chip color="secondary">{params.title}</Chip>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="filled"
                              label="Ingredients"
                              color="secondary"
                            />
                          )}
                        /> */}
              {/* <TextField
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
                        </Typography> */}

              {/* <Grid item xs={12}>
                        <Box my={2}>
                          <Typography variant="h5">Dates Available</Typography>
                          {values.availableDay.map((day) => (
                            <Chip label={day} />
                          ))}
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Date picker dialog"
                              format="MM/dd/yyyy"
                              color="secondary"
                              value={selectedDate}
                              DialogProps={{ PaperProps: { elevation: 5 } }}
                              inputVariant="filled"
                              clearable
                              onChange={handleDateChange}
                              showTodayButton
                              SelectProps={{ color: "secondary" }}
                              inputProps={{ color: "secondary" }}
                              leftArrowButtonProps={{ color: "secondary" }}
                              rightArrowButtonProps={{ color: "secondary" }}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Box> */}
              {/* <TextField
                          fullWidth
                          name="availableDay"
                          label="Available days"
                          variant="filled"
                          color="secondary"
                          onChange={handleChange}
                          value={values.availableDay}
                        />

                        <Typography variant="subtitle2" paragraph>
                          Add a Comma separated list
                          ("Thursday,Saturday,Monday")
                        </Typography> */}
              {/* </Grid> */}
              <Box>
                <FormControlLabel
                  label="Is Dish Available?"
                  InputLabelProps={{
                    classes: {
                      root: classes.textPlaceholder,
                    },
                  }}
                  control={
                    <Switch
                      checked={values.isAvailable}
                      onChange={changeAvailability}
                      name="isAvailable"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  }
                />
              </Box>

              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="filled"
                multiline
                error={errors.description ? true : false}
                helperText={errors.description}
                color="primary"
                value={values.description}
                onChange={handleChange}
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.textPlaceholder,
                  },
                }}
              />
              {values.image && (
                <Box>
                  <Image
                    publicId={values.image}
                    cloudName="defivdghh"
                    secure="true"
                    width="200"
                  ></Image>
                </Box>
              )}
              <Box m={4}>
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
              </Box>
              <Box>
                <Button
                  color="secondary"
                  variant="contained"
                  name="submit"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default FoodItems;
