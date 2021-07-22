import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_FOOD_ITEM, GET_ALL_MY_FOOD_ITEMS } from "../../../queries/food";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Slide,
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
import Loader from "../../util/Loader";
import TablePaginationActions from "../../util/TabPagination";
import { Delete, Edit, Stop } from "@material-ui/icons";
import Image from "cloudinary-react/lib/components/Image";
import Transformation from "cloudinary-react/lib/components/Transformation";
import { useHistory } from "react-router";

export default function DataTable() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let [selectedRow, setSelectedRow] = React.useState({});

  const history = useHistory();

  const { data, loading } = useQuery(GET_ALL_MY_FOOD_ITEMS, {
    fetchPolicy: "cache-and-network",
  });

  const [DeleteFoodItem] = useMutation(DELETE_FOOD_ITEM, {
    refetchQueries: [
      {
        query: GET_ALL_MY_FOOD_ITEMS,
      },
    ],

    variables: { id: selectedRow.id },
  });

  const createData = (
    id,
    name,
    price,
    image,
    orders,
    description,
    portionSize,
    isAvailable,
    allergyWarning,
    ingredients
  ) => {
    return {
      id,
      name,
      price,
      image,
      orders,
      description,
      portionSize,
      isAvailable,
      allergyWarning,
      ingredients,
    };
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <Loader />;
  } else if (data) {
    let rows = data.getAllMyFoodItems.map((item) => ({
      ...createData(
        item.id,
        item.name,
        item.price,
        item.image,
        item.orders,
        item.description,
        item.portionSize,
        item.isAvailable,
        item.allergyWarning,
        item.ingredients.join(", ")
      ),
    }));

    const onCellClick = (row) => {
      setOpen(true);
      setSelectedRow(row);
      // history.push(`/${params.row.id}`);
    };

    const handleClose = () => {
      setOpen(false);
      // setSelectedRow(params.row.id);
      // history.push(`/${params.row.id}`);
    };

    const handleDeleteClose = () => setDeleteOpen(false);

    const handleDeleteOpen = (d) => {
      setDeleteOpen(true);
      setSelectedRow(d);
    };

    const handleDeleteItem = () => {
      DeleteFoodItem();
      setDeleteOpen(false);
    };

    const handleEditItem = (e) => {
      setOpen(false);
      history.push(`/edit/food/${e.id}`);
    };

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div style={{ width: "100%" }}>
        <Box>
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            className={classes.fontBold}
          >
            View all your Dishes
          </Typography>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headLine} variant="head">
                    Name
                  </TableCell>
                  <TableCell
                    align="right"
                    variant="head"
                    className={classes.headLine}
                  >
                    No. Orders
                  </TableCell>
                  <TableCell
                    align="right"
                    variant="head"
                    className={classes.headLine}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="right"
                    variant="head"
                    className={classes.headLine}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="right"
                    variant="head"
                    className={classes.headLine}
                  >
                    Actions
                  </TableCell>
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
                    <TableCell onClick={() => onCellClick(row)}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.orders}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      {row.isAvailable ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDeleteOpen(row)}
                        color="secondary"
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEditItem(row)}
                        color="secondary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary">
                        <Stop />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={12} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={5}
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

          <Dialog
            open={deleteOpen}
            TransitionComponent={Slide}
            PaperProps={{ elevation: 10 }}
            TransitionProps={{ direction: "up" }}
            keepMounted
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              Are you sure You want to delete {selectedRow.name}?
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleDeleteClose} color="secondary">
                Disagree
              </Button>
              <Button onClick={handleDeleteItem} color="secondary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open}
            TransitionComponent={Slide}
            PaperProps={{ elevation: 10 }}
            TransitionProps={{ direction: "up" }}
            maxWidth="md"
            fullWidth
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {selectedRow.name}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                color="textPrimary"
                id="alert-dialog-slide-description"
              >
                {selectedRow.description}
              </DialogContentText>
              <DialogContentText
                color="textPrimary"
                id="alert-dialog-slide-description"
              >
                Price: {selectedRow.price}
              </DialogContentText>
              <DialogContentText
                color="textPrimary"
                id="alert-dialog-slide-description"
              >
                Portion Size: {selectedRow.portionSize}
              </DialogContentText>
              <DialogContentText
                color="textPrimary"
                id="alert-dialog-slide-description"
              >
                Ingredients: {selectedRow.ingredients}
              </DialogContentText>
              <DialogContentText
                color="textPrimary"
                id="alert-dialog-slide-description"
              >
                Orders Done: {selectedRow.orders}
              </DialogContentText>

              {selectedRow.image && (
                <Image
                  publicId={`${selectedRow.image}.png`}
                  cloudName="defivdghh"
                  secure="true"
                  width="200"
                ></Image>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="secondary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    );
  } else {
    return (
      <Box py={20} textAlign="center">
        <Typography variant="h4" color="error">
          No Orders Yet
        </Typography>
      </Box>
    );
  }
}

// import React from "react";
// import { useQuery } from "@apollo/client";
// import { Backdrop, Box, CircularProgress, Typography } from "@material-ui/core";
// import useStyles from "../../../styles/GlobalStyles";

// function AllFoodItems() {
//   const classes = useStyles();
//   const { data, error, loading } = useQuery();

//   if (loading) {
//     return (
//       <Box mt={30} width={100} mx="auto">
//         <Backdrop className={classes.backdrop} open={true}>
//           <CircularProgress color="secondary" />
//         </Backdrop>
//       </Box>
//     );
//   } else if (data) {
//     return (
//       <Box>
//         <Typography>See Your All Food Items</Typography>
//       </Box>
//     );
//   }
// }

// export default AllFoodItems;
