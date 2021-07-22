import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import useStyles from "../../../styles/GlobalStyles";
import { GET_ALL_CHEFS } from "../../../queries/chef";
import { useMutation, useQuery } from "@apollo/client";
import {
  CHANGE_AVAILABILITY,
  DELETE_FOOD_ITEM,
  GET_ALL_FOODITEMS,
} from "../../../queries/food";
import TablePaginationActions from "../../util/TabPagination";
import StopIcon from "@material-ui/icons/Stop";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "../../util/Loader";

function Dishes() {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_ALL_CHEFS);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deleteItemOpen, setDeleteItemOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDeleteItemOpen(true);
  };

  const handleClose = () => {
    setDeleteItemOpen(false);
  };

  const {
    loading: foodItemLoading,
    data: foodItems,
  } = useQuery(GET_ALL_FOODITEMS, { onError: (err) => console.log(err) });

  const [deleteFoodItem, { loading: delFoodLoading }] = useMutation(
    DELETE_FOOD_ITEM,
    {
      onError: (err) => console.log(err),

      refetchQueries: [{ query: GET_ALL_FOODITEMS }],
    }
  );

  const [changeAvailabilityMutate] = useMutation(CHANGE_AVAILABILITY, {
    onError: (err) => console.log(err),

    update: (proxy, result) => {
      proxy.writeQuery({ query: GET_ALL_FOODITEMS }, result);
    },

    // refetchQueries: [{ query: GET_ALL_FOODITEMS }],
  });

  const changeAvailability = (id) => {
    changeAvailabilityMutate({ variables: { id } });
  };

  if (loading || foodItemLoading || delFoodLoading) return <Loader />;
  else if (data && foodItems) {
    function createData(name, chefName, price, portionSize, isAvailable, id) {
      return { name, chefName, price, portionSize, isAvailable, id };
    }

    const rows = [
      ...foodItems.getAllFoodItems.map((item) =>
        createData(
          item.name,
          item.chefName,
          item.price,
          item.portionSize,
          item.isAvailable,
          item.id
        )
      ),
    ];

    const onDeleteFood = (id) => {
      setDeleteItemOpen(false);
      deleteFoodItem({ variables: { id } });
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
      <Box minWidth={150} py={10} ml={12} mr={3}>
        <Box pb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3}>
                <Box height={100} mx={2}>
                  <Grid
                    container
                    className={classes.fullHeight}
                    direction="column"
                    justify="space-around"
                  >
                    <Grid item>
                      <Typography>Number of Chefs</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{data.getAllChefs.length}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3}>
                <Box height={100} mx={2}>
                  <Grid
                    container
                    className={classes.fullHeight}
                    direction="column"
                    justify="space-around"
                  >
                    <Grid item>
                      <Typography>Number of Dishes</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {foodItems.getAllFoodItems.length}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper} elevation={5}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Chef</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">Portion Size</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" width={140}>
                    {row.name}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    width={140}
                  >
                    {row.chefName}
                  </TableCell>
                  <TableCell style={{ width: 60 }} align="right">
                    {row.price}
                  </TableCell>
                  <TableCell style={{ width: 60 }} align="right">
                    {row.portionSize}
                  </TableCell>
                  <TableCell style={{ width: 60 }} align="right">
                    <IconButton
                      style={{ width: 25 }}
                      onClick={handleClickOpen}
                      color="secondary"
                    >
                      <DeleteIcon style={{ width: 25 }} />
                    </IconButton>
                    <IconButton
                      style={{ width: 25 }}
                      onClick={() => changeAvailability(row.id)}
                      color="secondary"
                    >
                      {row.isAvailable ? (
                        <StopIcon style={{ width: 25 }} />
                      ) : (
                        <PlayArrowIcon />
                      )}
                    </IconButton>
                    <Dialog
                      open={deleteItemOpen}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Are you sure you want to delete this Dish?
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Disagree
                        </Button>
                        <Button
                          onClick={() => onDeleteFood(row.id)}
                          color="secondary"
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    );
  } else {
    return <Typography>Something Went Wrong</Typography>;
  }
}

export default Dishes;
