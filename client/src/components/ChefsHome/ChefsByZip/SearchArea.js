import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import useStyles from "../../../styles/GlobalStyles";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  useTheme,
} from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import { GET_CHEFS_BY_ZIP } from "../../../queries/chef";
import SearchForEverything from "../../util/SearchForEverything";
import queryString from "query-string";
import { PrefContext } from "../../../contexts/preff";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

const diets = ["Vegetarian", "Vegan", "Halal"];

function SearchArea() {
  const history = useHistory();
  // let query = queryString.parse(history.location.search);
  const match = useRouteMatch();
  const [btnState, setBtnState] = useState(true);
  const theme = useTheme();

  const { pref, changePref } = useContext(PrefContext);
  const [searchPref, setSearchPref] = useState({
    dietary: [],
    deliveryDays: [],
    deliveryOption: "",
  });

  let zipCode = match.params.zipCode;
  let cuisine = match.params.cuisine;
  let deliveryDays = [];

  const { data: chefData } = useQuery(GET_CHEFS_BY_ZIP, {
    variables: { zipCode },
  });

  const classes = useStyles();
  if (chefData && chefData.getChefsByAreaCode.length > 0) {
    chefData.getChefsByAreaCode.map((chef) =>
      chef.deliveryDays.map((day) => deliveryDays.push(day))
    );
  }

  const onChange = (e) => {
    setSearchPref({ ...searchPref, [e.target.name]: e.target.value });
    setBtnState(false);
  };

  const onDeliveryOptionChange = (e, option) => {
    setSearchPref({ ...searchPref, deliveryOption: option });
    setBtnState(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Generate query object
    const queryObj = {
      c: cuisine,
      diet: searchPref.dietary,
      deliveryDay: searchPref.deliveryDays,
      deliveryOption: searchPref.deliveryOption,
    };

    // Add preferences to preference context
    changePref(queryObj);

    // Generate query string
    let query = queryString.stringify(queryObj, {
      skipEmptyString: true,
      skipNull: true,
    });

    history.push(`/chefs/filter/${zipCode}?${query}`);
  };

  return (
    <Box my={8}>
      <Grid container spacing={1} alignItems="center" justify="space-between">
        <Grid item xs={12} sm={8}>
          <form onSubmit={onSubmit}>
            {/* <Container maxWidth="xs"> */}
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              style={{ overflowX: "auto" }}
            >
              <Grid item xs={5} sm={4}>
                <InputLabel
                  id="delivery-day-input-label"
                  className={classes.fontBold2}
                >
                  Delivery Day:
                </InputLabel>

                <Select
                  fullWidth
                  id="delivery-day-input-select"
                  labelId="delivery-day-input-label"
                  name="deliveryDays"
                  multiple
                  renderValue={(selected) => selected.join(", ")}
                  value={searchPref.deliveryDays}
                  onChange={onChange}
                  variant="outlined"
                  className={classes.textField}
                >
                  {deliveryDays.map((day) => {
                    return (
                      <MenuItem key={day} value={day}>
                        <Checkbox
                          checked={searchPref.deliveryDays?.indexOf(day) > -1}
                        />
                        <ListItemText primary={day} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>

              <Grid item xs={5} sm={4}>
                <InputLabel
                  id="dietary-input-label"
                  className={classes.fontBold2}
                >
                  Dietary:
                </InputLabel>
                <Select
                  fullWidth
                  label="Dietary"
                  id="dietary-input-select"
                  value={searchPref.dietary}
                  name="dietary"
                  multiple
                  onChange={onChange}
                  renderValue={(selected) => selected.join(", ")}
                  labelId="dietary-input-label"
                  variant="outlined"
                  className={classes.textField}
                >
                  {diets.map((diet) => {
                    return (
                      <MenuItem key={diet} value={diet}>
                        <Checkbox
                          checked={searchPref.dietary?.indexOf(diet) > -1}
                        />
                        <ListItemText primary={diet} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <ToggleButtonGroup
                  value={searchPref.deliveryOption}
                  onChange={onDeliveryOptionChange}
                  exclusive
                  style={{ marginLeft: "20px" }}
                >
                  <ToggleButton
                    value="delivery"
                    style={{
                      color: theme.palette.text.primary,
                      // fontWeight: "bold",
                      // border: `1px solid ${theme.palette.primary.light}`,
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    Delivery
                  </ToggleButton>
                  <ToggleButton
                    value="pickup"
                    style={{
                      color: theme.palette.text.primary,
                      // border: `1px solid ${theme.palette.primary.light}`,

                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    pickup
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid item xs={1}>
                <Button
                  fullWidth
                  color="secondary"
                  disabled={btnState}
                  variant="outlined"
                  type="submit"
                  style={{ color: btnState ? "#5a5a3f" : "inherit " }}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
            {/* </Container> */}
          </form>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <SearchForEverything />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchArea;
