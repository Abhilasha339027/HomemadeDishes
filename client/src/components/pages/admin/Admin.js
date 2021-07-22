import React from "react";
import {
  Avatar,
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
  useTheme,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CHEF, GET_ALL_CHEFS, VERIFY_CHEF } from "../../../queries/chef";
import useStyles from "../../../styles/GlobalStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Image from "cloudinary-react/lib/components/Image";
import Transformation from "cloudinary-react/lib/components/Transformation";
import TablePaginationActions from "../../util/TabPagination";
import Loader from "../../util/Loader";
import { CheckCircleOutlineOutlined } from "@material-ui/icons";

export default function Admin() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const theme = useTheme();

  const { loading, data, error } = useQuery(GET_ALL_CHEFS, {
    fetchPolicy: "cache-and-network",
    onError: (err) => console.log(err),
  });

  const [verifyChef] = useMutation(VERIFY_CHEF);

  const approveChef = (id) => {
    verifyChef({
      variables: { id },
      refetchQueries: [{ query: GET_ALL_CHEFS }],
    });
  };

  const [deleteChefopen, setDeleteChefOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDeleteChefOpen(true);
  };

  const handleClose = () => {
    setDeleteChefOpen(false);
  };

  const [deleteChef, { loading: delChefLoading }] = useMutation(DELETE_CHEF, {
    onError: (err) => console.log(err),

    refetchQueries: [{ query: GET_ALL_CHEFS }],
  });

  if (loading || delChefLoading) return <Loader />;
  else if (data) {
    function createData(
      avatar,
      firstName,
      lastName,
      orders,
      email,
      foodItems,
      id
    ) {
      return { avatar, firstName, lastName, orders, email, foodItems, id };
    }

    const rows = [
      ...data.getAllChefs.map((chef) =>
        createData(
          chef.avatar,
          chef.firstName,
          chef.lastName,
          chef.orders,
          chef.email,
          chef.foodItems.length,
          chef.id
        )
      ),
    ];

    let set = data.getAllChefs.map((item) => item.foodItems.length);
    let newSet = set.reduce((a, b) => a + b, 0);

    let orders = data.getAllChefs.map((a) => a.orders);
    orders = orders.reduce((a, b) => a + b, 0);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const onDeleteChef = (id) => {
      deleteChef({ variables: { id } });
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
      <Box minWidth={150} py={10} ml={12} mr={3}>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3}>
                <Box height={100} mx={2}>
                  <Grid
                    container
                    className={classes.mxHeight}
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
                    className={classes.mxHeight}
                    direction="column"
                    justify="space-around"
                  >
                    <Grid item>
                      <Typography>Number of Dishes</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{newSet}</Typography>
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
                    className={classes.mxHeight}
                    direction="column"
                    justify="space-around"
                  >
                    <Grid item>
                      <Typography>Number of Orders</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{orders}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {/* <Box py={2}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              history.push("/admin-dashboard/add-chef");
            }}
          >
            Add new chef
          </Button>
        </Box> */}
        <TableContainer component={Paper} elevation={5} square>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">email</TableCell>
                <TableCell align="right">No. Dishes</TableCell>
                <TableCell align="right">No. Orders</TableCell>
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
                  <TableCell component="th" scope="row" width={40}>
                    {row.avatar ? (
                      <Avatar>
                        <Image
                          width="40"
                          publicId={row.avatar}
                          cloudName="defivdghh"
                          secure="true"
                        >
                          <Transformation gravity="face" crop="thumb" />
                        </Image>
                      </Avatar>
                    ) : (
                      <Avatar>{row.firstName[0]}</Avatar>
                    )}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    width={40}
                  >
                    {row.firstName}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.lastName}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.foodItems}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.orders}
                  </TableCell>
                  <TableCell style={{ width: 60 }} align="right">
                    <IconButton
                      style={{ width: 25 }}
                      onClick={handleClickOpen}
                      color="inherit"
                    >
                      <DeleteIcon style={{ width: 25 }} />
                    </IconButton>
                    <IconButton
                      style={{ width: 25 }}
                      color="inherit"
                      onClick={() => approveChef(row.id)}
                    >
                      {/* <span class="material-icons">task_alt</span> */}
                      <CheckCircleOutlineOutlined />
                    </IconButton>
                    <IconButton style={{ width: 25 }} color="inherit">
                      <EditIcon style={{ width: 25 }} />
                    </IconButton>
                    <Dialog
                      open={deleteChefopen}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Are you sure you want to delete this chef?
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Disagree
                        </Button>
                        <Button
                          onClick={() => onDeleteChef(row.id)}
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
  } else if (error) {
    return "Nothing";
  }
}
