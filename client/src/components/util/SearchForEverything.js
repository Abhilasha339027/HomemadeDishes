/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  Avatar,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useLazyQuery } from "@apollo/client";
import useStyles from "../../styles/GlobalStyles";
import { SEARCH_FOR_ALL } from "../../queries/chef";
import Image from "cloudinary-react/lib/components/Image";
import { useHistory, useRouteMatch } from "react-router-dom";
import { throttle } from "lodash";

function SearchForEverything(props) {
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();
  const classes = useStyles();
  const zipCode = parseInt(match.params.zipCode);
  const [value, setValue] = useState("");

  const [getResults, { data, loading }] = useLazyQuery(SEARCH_FOR_ALL, {
    fetchPolicy: "no-cache",
  });

  const onChangeHandle = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const throttledSearch = throttle(
      () => getResults({ variables: { option: value, zip: zipCode } }),
      300
    );

    if (value.length > 3) {
      throttledSearch();
    }

    if (data) {
      setOptions([...data.getBySearch.dishes, ...data.getBySearch.chefs]);
    }

    return () => {
      setValue("");
    };
  }, [value]);

  const onChange = (newValue) => {
    newValue.__typename === "User"
      ? history.push(`/chef/${zipCode}/${newValue.id}`)
      : history.push(`/chef/${zipCode}/${newValue.chef.id}`);
  };

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) =>
        option.__typename === "User" ? option.firstName : option.name
      }
      options={options}
      loading={loading}
      onChange={(e, value) => onChange(value)}
      className={classes.textField}
      groupBy={(option) => (option.__typename === "User" ? "Chefs" : "Dishes")}
      clearOnBlur
      renderOption={(option) => {
        return option.__typename === "User" ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                {option.avatar ? (
                  <Image
                    width="40"
                    secure="true"
                    publicId={option.avatar}
                    cloudName="defivdghh"
                  ></Image>
                ) : (
                  <Avatar>
                    {option.firstName[0]} {option.lastName[0]}
                  </Avatar>
                )}
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" className={classes.fontBold}>
                  {option.firstName} {option.lastName}
                </Typography>
                <Typography>{option.cuisine}</Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Image
                  width="40"
                  secure="true"
                  publicId={option.image}
                  cloudName="defivdghh"
                ></Image>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h6" className={classes.fontBold}>
                  {option.name}
                </Typography>
                <Typography variant="body2">{option.chefName}</Typography>
              </Grid>
            </Grid>
          </>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          fullWidth
          className={classes.searchField}
          color="secondary"
          onChange={(ev) => {
            // Only fire API when user has entered at least 3 char
            if (ev.target.value.length > 3) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default SearchForEverything;
