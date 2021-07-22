import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { GET_PROFILE, UPDATE_PROFILE } from "../../../queries/user";
import useStyles from "../../../styles/GlobalStyles";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE_IMAGE } from "../../../queries/profile";
import { Image, Transformation } from "cloudinary-react";
import { keys } from "../../../keys";

function ProfileSetup(props) {
  const classes = useStyles();
  let user = props.profile;
  const [errors, setErrors] = React.useState({});

  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const [updateUser] = useMutation(UPDATE_PROFILE, {
    update: (proxy, result) => {
      proxy.writeQuery({ query: GET_PROFILE, result });
    },

    variables: values,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addProfileImage] = useMutation(ADD_PROFILE_IMAGE, {
    onCompleted: (data) => {
      console.log("Upload successful");
    },

    onError: (err) => console.log(err),
  });

  const handleImageSubmit = async (e) => {
    var file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", keys.CLOUDINARY_KEY);
    formdata.append("upload_preset", keys.CLOUDINARY_PRESET);
    let cloudinaryURL = `https://api.cloudinary.com/v1_1/${keys.CLOUDINARY_KEY}/image/upload`;
    let res;

    try {
      res = await fetch(cloudinaryURL, {
        method: "POST",
        mode: "cors",
        body: formdata,
      });
    } catch (error) {
      setErrors({
        ...errors,
        avatar: "Something Went Wrong, Couldn't upload Avatar",
      });
    }

    if (res) {
      let json = await res.json();
      addProfileImage({ variables: { avatar: json.public_id } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <Box>
      <form noValidate onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          spacing={1}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <TextField
              // fullWidth
              variant="filled"
              name="firstName"
              label="First Name"
              color="secondary"
              value={values.firstName}
              onChange={handleChange}
              InputLabelProps={{
                classes: {
                  root: classes.textPlaceholder,
                },
              }}
              className={classes.textField}
            />
          </Grid>
          <Grid item>
            <TextField
              // fullWidth
              variant="filled"
              name="lastName"
              label="Last Name"
              color="secondary"
              value={values.lastName}
              onChange={handleChange}
              InputLabelProps={{
                classes: {
                  root: classes.textPlaceholder,
                },
              }}
              className={classes.textField}
            />
          </Grid>
        </Grid>
        <Box
          mt={1}
          ml={4}
          mr={4}
          spacing={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            // fullWidth
            variant="filled"
            name="email"
            label="Email"
            color="secondary"
            value={values.email}
            onChange={handleChange}
            InputLabelProps={{
              classes: {
                root: classes.textPlaceholder,
              },
            }}
            className={classes.textField}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <Button
            type="submit"
            color="secondary"
            className={classes.bgSecondary}
          >
            Submit
          </Button>
        </Box>
      </form>
      <Box py={8}>
        <Grid container spacing={2} direction="column" alignItems="center">
          {errors?.avatar && (
            <Box my={2}>
              <Typography variant="subtitle2" color="error">
                {errors?.avatar}
              </Typography>
            </Box>
          )}
          <Image publicId={user.avatar} cloudName="defivdghh" secure="true">
            <Transformation
              width="200"
              height="200"
              gravity="face"
              crop="thumb"
            />
          </Image>

          {/* <Grid item>
            <Avatar className={classes.bigAvatar} src={user.avatar}></Avatar>
          </Grid> */}
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
                fullWidth
                color="secondary"
                component="span"
                className={classes.bgSecondary}
              >
                Upload Avatar
              </Button>
            </label>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProfileSetup;
