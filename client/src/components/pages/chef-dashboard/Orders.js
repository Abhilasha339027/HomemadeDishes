import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ORDERS_CHEF,
  ADD_MARK_AS_DELIVERING,
  ADD_MARK_AS_DELIVERED,
  DELETE_ORDER,
} from "../../../queries/order";
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
  Tooltip,
} from "@material-ui/core";
import TablePaginationActions from "../../util/TabPagination";
import { Delete, ShoppingCart, Done } from "@material-ui/icons";
import Loader from "../../util/Loader";
import useStyles from "../../../styles/GlobalStyles";

export default function Orders() {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let [selectedRow, setSelectedRow] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_ORDERS_CHEF, {
    fetchPolicy: "cache-and-network",
  });

  const onCellClick = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedRow(params.row.id);
    // history.push(`/${params.row.id}`);
  };

  const [addMarkAsDelivering] = useMutation(ADD_MARK_AS_DELIVERING, {
    onError: (err) => console.log(err),
    refetchQueries: [{ query: GET_ORDERS_CHEF }],
  });

  const [addMarkAsDelivered] = useMutation(ADD_MARK_AS_DELIVERED, {
    onError: (err) => console.log(err),
    refetchQueries: [{ query: GET_ORDERS_CHEF }],
  });

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    onError: (err) => console.log(err),
  });

  if (loading) {
    return <Loader />;
  } else if (error) return error.message;

  if (data) {
    function createData(fullName, totalPrice, status, items, id) {
      return { fullName, totalPrice, status, items, id };
    }

    const rows = [
      ...data.getAllMyOrdersChef.map((order) =>
        createData(
          order.fullName,
          order.totalPrice,
          order.status,
          order.items,
          order.id
        )
      ),
    ];

    const changeStatus = (id) => {
      addMarkAsDelivering({
        variables: { id },
      });
    };

    const markAsDelivered = (id) => {
      addMarkAsDelivered({
        variables: { id },
      });
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleDeleteOpen = (id) => {
      setDeleteId(id);
      setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
      setDeleteOpen(false);
    };

    const onDeleteOrder = () => {
      let id = deleteId.id;
      deleteOrder({
        variables: { id },
        update: (proxy, result) => {
          let query = proxy.readQuery({ query: GET_ORDERS_CHEF });
          let data = {};
          data.getAllMyOrdersChef = query.getAllMyOrdersChef.filter(
            (res) => res.id !== id
          );
          proxy.writeQuery({ query: GET_ORDERS_CHEF, data });
        },
      });
      setDeleteOpen(false);
    };

    return (
      <Box>
        <TableContainer component={Paper} elevation={5}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">No. Dishes</TableCell>
                <TableCell align="right">Total Price</TableCell>
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
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    width={40}
                    onClick={() => onCellClick(row)}
                  >
                    {row.fullName}
                  </TableCell>

                  <TableCell
                    align="right"
                    width={160}
                    onClick={() => onCellClick(row)}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell
                    align="right"
                    width={160}
                    onClick={() => onCellClick(row)}
                  >
                    {row.items.length}
                  </TableCell>
                  <TableCell
                    width={160}
                    onClick={() => onCellClick(row)}
                    align="right"
                  >
                    {row.totalPrice}
                  </TableCell>
                  <TableCell
                    width={60}
                    onClick={() => onCellClick(row)}
                    align="right"
                  >
                    <Tooltip title="Delete Order">
                      <IconButton
                        style={{ width: 25 }}
                        onClick={() => handleDeleteOpen(row)}
                        color="inherit"
                      >
                        <Delete style={{ width: 25 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Deliver">
                      <IconButton
                        style={{ width: 25 }}
                        onClick={() => changeStatus(row.id)}
                        color="inherit"
                      >
                        <ShoppingCart style={{ width: 25 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark as Delivered">
                      <IconButton
                        style={{ width: 25 }}
                        onClick={() => markAsDelivered(row.id)}
                        color="inherit"
                      >
                        <Done style={{ width: 25 }} />
                      </IconButton>
                    </Tooltip>
                    <Dialog
                      open={deleteOpen}
                      onClose={handleDeleteClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Are you sure you want to delete this Order?
                      </DialogTitle>
                      <DialogActions>
                        <Button color="secondary">Disagree</Button>
                        <Button
                          onClick={() => onDeleteOrder(row.id)}
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
        <Dialog
          open={open}
          TransitionComponent={Slide}
          PaperProps={{ elevation: 10 }}
          TransitionProps={{ direction: "up" }}
          onClose={handleClose}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {selectedRow?.fullName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Status: {selectedRow?.status}
            </DialogContentText>
            <DialogContentText
              variant="h6"
              className={classes.fontBold}
              id="alert-dialog-slide-description"
            >
              Items:
            </DialogContentText>
            {selectedRow?.items?.map((item, index) => (
              <Box px={2} key={index}>
                <DialogContentText id="alert-dialog-slide-description">
                  Name: {item.item.name}
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description">
                  Price: {item.item.price}
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description">
                  Quantity: {item.quantity}
                </DialogContentText>
              </Box>
            ))}
            <DialogContentText id="alert-dialog-slide-description">
              Total Price: {selectedRow.totalPrice}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Deliver
            </Button>
            <Button
              onClick={() => onDeleteOrder(selectedRow.id)}
              color="secondary"
              autoFocus
            >
              Agree
            </Button>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}
