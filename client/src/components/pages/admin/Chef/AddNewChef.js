import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  FormControlLabel,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import Transformation from "cloudinary-react/lib/components/Transformation";
import Image from "cloudinary-react/lib/components/Image";
import MuiPhoneNumber from "material-ui-phone-number";

import useStyles from "../../../../styles/GlobalStyles";
import { useMutation } from "@apollo/client";
import { ADD_CHEF } from "../../../../queries/chef";
import Loader from "../../../util/Loader";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ChipInput from "material-ui-chip-input";
import GoogleMaps from "../../Checkout/SearchBox";
import { Alert } from "@material-ui/lab";
import { keys } from "../../../../keys";

function AddNewChef(props) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [isDone, setIsDone] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    avatar: "",
    fromZipCode: 0,
    toZipCode: 0,
    cuisine: "",
    bio: "",
    address: "",
    placeId: "",
    deliveryDays: [],
    dietary: [],
    zipCode: 0,
    phone: "",
    isAvailable: false,
    description: "",
  });

  const handleDateChange = (date) => {
    let [month, d, year] = date.toLocaleDateString("en-US").split("/");

    setValues((prevState) => ({
      ...values,
      deliveryDays: [...prevState.deliveryDays, `${month}, ${d}, ${year}`],
    }));
  };

  const handleClose = () => setIsDone(false);

  const handleDeleteDate = (index) => {
    let prevState = [...values.deliveryDays];
    prevState.splice(index, 1);
    setValues({ ...values, deliveryDays: prevState });
  };

  const [addChef, { loading }] = useMutation(ADD_CHEF, {
    onError: (err) => {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
    },

    onCompleted: () => {
      setValues({});
      setErrors({});
      setIsDone(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addChef({
      variables: {
        ...values,
        zipCode: parseInt(values.zipCode),
        toZipCode: parseInt(values.toZipCode),
        fromZipCode: parseInt(values.fromZipCode),
      },
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAddDietary = (chip) => {
    setValues((prevState) => ({
      ...values,
      dietary: [...prevState.dietary, chip],
    }));
  };

  const handleDelDietary = (chip, index) => {
    let prevState = [...values.dietary];
    prevState.splice(index, 1);
    setValues({ ...values, dietary: prevState });
  };

  const handleChangePhone = (value) => setValues({ ...values, phone: value });

  const handleImageSubmit = async (e) => {
    var file = e.target.files[0];
    let name = e.target.name;
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
    setValues({ ...values, [name]: json.public_id });
  };

  const onChangeZip = (data) => {
    setValues({ ...values, address: data.description, placeId: data.place_id });
  };

  const changeAvailability = (e) => {
    setValues({ ...values, isAvailable: !values.isAvailable });
  };

  if (loading) return <Loader />;

  return (
    <Box mx={10} mt={5}>
      <Container>
        <Box textAlign="center" mb={5}>
          <Typography gutterBottom variant="h5" className={classes.textPrimary}>
            Add new Chef
          </Typography>
          {errors?.user ? (
            <Box my={2}>
              <Alert severity="error">{errors?.user}</Alert>
            </Box>
          ) : (
            ""
          )}
          <form noValidate onSubmit={handleSubmit}>
            <Box className={classes.formRoot}>
              <TextField
                name="firstName"
                label="First Name"
                variant="filled"
                style={{ width: "48%" }}
                error={errors?.firstName ? true : false}
                color="secondary"
                value={values.firstName}
                onChange={handleChange}
                {...(errors?.firstName ? { helperText: errors.firstName } : "")}
              />

              <TextField
                name="lastName"
                style={{ width: "48%" }}
                label="Last Name"
                variant="filled"
                color="secondary"
                error={errors?.lastName ? true : false}
                {...(errors?.lastName ? { helperText: errors.lastName } : "")}
                value={values.lastName}
                onChange={handleChange}
              />

              <TextField
                name="email"
                onChange={handleChange}
                style={{ width: "48%" }}
                label="Email"
                error={errors?.email ? true : false}
                variant="filled"
                color="secondary"
                {...(errors?.email ? { helperText: errors.email } : "")}
                value={values.email}
              />

              <TextField
                name="handle"
                label="Handle"
                style={{ width: "48%" }}
                variant="filled"
                color="secondary"
                error={errors?.handle ? true : false}
                onChange={handleChange}
                {...(errors?.handle ? { helperText: errors.handle } : "")}
                value={values.handle}
              />

              <TextField
                name="password"
                label="password"
                type="password"
                variant="filled"
                style={{ width: "48%" }}
                color="secondary"
                {...(errors?.password && { helperText: errors.password })}
                error={errors?.password ? true : false}
                value={values.password}
                onChange={handleChange}
              />

              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="filled"
                style={{ width: "48%" }}
                color="secondary"
                {...(errors?.firstName ? { helperText: errors.firstName } : "")}
                error={errors?.confirmPassword ? true : false}
                value={values.confirmPassword}
                onChange={handleChange}
              />

              <TextField
                name="fromZipCode"
                label="Zip Code chef starts serving from"
                variant="filled"
                style={{ width: "48%" }}
                inputMode="numeric"
                type="number"
                error={errors?.fromZipCode ? true : false}
                color="secondary"
                {...(errors?.fromZipCode
                  ? { helperText: errors.fromZipCode }
                  : "")}
                onChange={handleChange}
                value={values.fromZipCode}
              />

              <TextField
                name="toZipCode"
                label="Zip Code chef ends serving to"
                variant="filled"
                type="number"
                style={{ width: "48%" }}
                color="secondary"
                {...(errors?.toZipCode ? { helperText: errors.toZipCode } : "")}
                error={errors?.toZipCode ? true : false}
                onChange={handleChange}
                value={values.toZipCode}
              />

              <TextField
                name="zipCode"
                label="Your Zip Code"
                variant="filled"
                style={{ width: "48%" }}
                type="number"
                {...(errors?.zipCode ? { helperText: errors.zipCode } : "")}
                error={errors?.zipCode ? true : false}
                color="secondary"
                onChange={handleChange}
                value={values.zipCode}
              />

              <TextField
                name="cuisine"
                label="cuisine"
                variant="filled"
                {...(errors?.cuisine ? { helperText: errors.cuisine } : "")}
                style={{ width: "48%" }}
                color="secondary"
                error={errors?.cuisine ? true : false}
                onChange={handleChange}
                value={values.cuisine}
              />

              <MuiPhoneNumber
                defaultCountry={"us"}
                name="phone"
                label="Phone Number"
                {...(errors?.phone ? { helperText: errors.phone } : "")}
                onChange={handleChangePhone}
                style={{ width: "45%" }}
                color="secondary"
                error={errors?.phone ? true : false}
                value={values.phone}
                variant="filled"
                onlyCountries={["us"]}
              />

              <ChipInput
                value={values.dietary}
                name="dietary"
                variant="filled"
                style={{ width: "48%" }}
                label="Dietary"
                {...(errors?.dietary ? { helperText: errors.dietary } : "")}
                error={errors?.dietary ? true : false}
                color="secondary"
                chipRenderer={(chip) => {
                  return (
                    <Chip
                      value={chip.text}
                      color="secondary"
                      variant="outlined"
                      key={chip.value}
                      label={chip.value}
                      onDelete={chip.handleDelete}
                    />
                  );
                }}
                onDelete={(chip, index) => handleDelDietary(chip, index)}
                onAdd={(chips) => handleAddDietary(chips)}
              />

              <GoogleMaps
                onChange={(e) => onChangeZip(e)}
                error={errors?.streetAddress ? true : false}
              ></GoogleMaps>

              {errors?.streetAddress ? (
                <Typography color="error" variant="subtitle2">
                  {errors?.streetAddress}
                </Typography>
              ) : (
                ""
              )}

              <TextField
                name="bio"
                label="bio"
                multiline
                style={{ width: "48%" }}
                {...(errors?.bio ? { helperText: errors.bio } : "")}
                variant="filled"
                error={errors?.bio ? true : false}
                color="secondary"
                value={values.bio}
                onChange={handleChange}
              />

              <TextField
                name="description"
                multiline
                style={{ width: "48%" }}
                label="description"
                variant="filled"
                {...(errors?.description
                  ? { helperText: errors.description }
                  : "")}
                color="secondary"
                error={errors?.description ? true : false}
                value={values.description}
                onChange={handleChange}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Add delivery dates"
                  error={errors?.deliveryDays ? true : false}
                  format="MM/dd"
                  size="medium"
                  views={["date"]}
                  openTo="year"
                  color="secondary"
                  {...(errors?.deliveryDays
                    ? { helperText: errors.deliveryDays }
                    : "")}
                  value={values?.deliveryDays[values?.deliveryDays?.length - 1]}
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

              <Box my={2}>
                {values.deliveryDays.map((day, index) => (
                  <Chip
                    label={day}
                    key={day}
                    color="secondary"
                    onDelete={() => handleDeleteDate(index)}
                  />
                ))}
              </Box>

              <FormControlLabel
                label="Is Chef Available?"
                control={
                  <Switch
                    checked={values.isAvailable}
                    onChange={changeAvailability}
                    name="isAvailable"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
              />
              <Box mx="auto" width="200px" height="200px" py={2}>
                {values.avatar ? (
                  <Image
                    publicId={values.avatar}
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
                  <Avatar style={{ width: "200px", height: "200px" }} />
                )}
              </Box>

              <Box py={5}>
                <input
                  accept="image/*"
                  name="avatar"
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
                    Upload your Avatar
                  </Button>
                </label>
              </Box>

              <Button
                color="secondary"
                variant="contained"
                name="submit"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <Snackbar open={isDone} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddNewChef;
