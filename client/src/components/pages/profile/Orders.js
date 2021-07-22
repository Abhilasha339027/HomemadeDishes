import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Cancel } from "@material-ui/icons";
import TablePaginationActions from "../../util/TabPagination";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  TableHead,
  Typography,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../../queries/order";
import useStyles from "../../../styles/GlobalStyles";
import Loader from "../../util/Loader";

export default function Orders(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isOpen, setIsOpen] = React.useState(false);

  const { loading, error, data } = useQuery(GET_ORDERS, {
    fetchPolicy: "cache-and-network",
    onError: (err) => console.log(err),
  });

  let orders = data?.getOrders ? data.getOrders : [];

  const createData = (
    id,
    firstName,
    lastName,
    items,
    status,
    totalPrice,
    chef
  ) => {
    return { id, firstName, lastName, items, status, totalPrice, chef };
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (e) => {
    setIsOpen(true);
  };

  const handleClose = (e) => {
    setIsOpen(false);
  };

  if (loading) return <Loader />;
  else if (data && orders.length > 0) {
    const rows = [
      ...orders.map((order) =>
        createData(
          order.id,
          order.chef.firstName,
          order.chef.lastName,
          order.items,
          order.status,
          order.totalPrice,
          order.chef.handle
        )
      ),
    ];

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Box>
        <Typography gutterBottom variant="h4" component="h4">
          View all your orders
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headLine} variant="head">
                  Chef
                </TableCell>
                <TableCell
                  align="right"
                  variant="head"
                  className={classes.headLine}
                >
                  No. Dishes
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
                  <TableCell component="th" scope="row" onClick={handleOpen}>
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell align="right">{row.items.length}</TableCell>
                  <TableCell align="right">{row.totalPrice}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  {row.status === "Processing" ? (
                    <TableCell align="right">
                      <IconButton color="secondary">
                        <Cancel />
                      </IconButton>
                    </TableCell>
                  ) : (
                    ""
                  )}

                  <Dialog
                    open={isOpen}
                    TransitionComponent={Slide}
                    keepMounted
                    PaperProps={{ elevation: 10 }}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-slide-title">
                      Order Details
                    </DialogTitle>
                    <DialogContent>
                      {row.items.map((item, index) => (
                        <div>
                          <DialogContentText>
                            <span className={classes.fontBold}>Name: </span>
                            {item.item.name}
                          </DialogContentText>
                          <DialogContentText>
                            <span className={classes.fontBold}>Price: </span>$
                            {item.item.price}
                          </DialogContentText>
                          <DialogContentText>
                            <span className={classes.fontBold}>Quantity: </span>
                            {item.quantity}
                          </DialogContentText>
                        </div>
                      ))}

                      <DialogContentText>
                        <span className={classes.fontBold}>Status: </span>
                        {row.status}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary"
                      >
                        Mark as Deliverd/Pickedup
                      </Button>
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary"
                      >
                        Cancel The Order
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
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
  } else if (error || data.getOrders.length < 1) {
    return (
      <Box py={20} textAlign="center">
        <Typography variant="h4" color="error">
          No Orders Yet
        </Typography>
      </Box>
    );
  }
}
