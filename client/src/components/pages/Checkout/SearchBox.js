import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import { useHistory } from "react-router-dom";
import { throttle } from "lodash";
import { keys } from "../../../keys";
import { Box } from "@material-ui/core";
import useStyles from "../../../styles/GlobalStyles";
function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     color: theme.palette.text.secondary,
//     marginRight: theme.spacing(2),
//   },
// }));

export default function GoogleMaps(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  const [errors, setErrors] = React.useState({});

  const history = useHistory();

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${keys.GOOGLE_API}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        request.componentRestrictions = {
          country: "us",
        };
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  const validateLocation = (origin, dest) => {
    const matrix = new window.google.maps.DistanceMatrixService();

    matrix.getDistanceMatrix(
      {
        origins: [{ placeId: origin }],
        destinations: [{ placeId: dest }],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      },
      (response, status) => {
        // console.log(response?.rows[0]?.elements[0]?.distance?.value / 1.609344);
        let distance = response?.rows[0]?.elements[0]?.distance?.value;

        if (distance) {
          setErrors({
            streetAddress: "The Chef doesn't deliver to that address",
          });
        } else if (distance && distance < 10000)
          setErrors({ streetAddress: null });
      }
    );

    return { errors, isValid: Object.keys(errors).length === 0 };
  };

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleChange = (newValue) => {
    if (
      history.location.pathname.includes("checkout") &&
      props.chefLoc &&
      newValue?.place_id
    ) {
      validateLocation(props.chefLoc, newValue.place_id);
      props.onChange(newValue);
    } else if (newValue?.place_id) {
      props.onChange(newValue);
    }
    if (props.onError) {
      props.onError(errors.streetAddress ? errors : null);
    }
  };

  return (
    <Box className={classes.textField}>
      <Autocomplete
        id="google-map-demo"
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        color="secondary"
        includeInputInList
        filterSelectedOptions
        value={props.value ? props.value : value}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          handleChange(newValue);
        }}
        InputLabelProps={{
          classes: {
            root: classes.textPlaceholder,
          },
        }}
        className={classes.textField}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Street Address"
            variant="filled"
            InputLabelProps={{
              classes: {
                root: classes.textPlaceholder,
              },
            }}
            className={classes.textField}
            error={errors.streetAddress || props.error ? true : false}
          />
        )}
        renderOption={(option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.iconG} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />

      {errors.streetAddress ? (
        <Typography variant="subtitle2" color="error">
          {errors.streetAddress}
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
}
