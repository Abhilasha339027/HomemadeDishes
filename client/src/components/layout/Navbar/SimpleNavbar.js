import React, { useContext, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Hidden,
  IconButton,
  Link as MaterialLink,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import Settings from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useLazyQuery } from "@apollo/client";
import Image from "cloudinary-react/lib/components/Image";
import Transformation from "cloudinary-react/lib/components/Transformation";

import useStyles from "../../../styles/GlobalStyles";
import { AuthContext } from "../../../contexts/auth";
import { GET_PROFILE } from "../../../queries/user";
import { PrefContext } from "../../../contexts/preff";
import logo from "../../../media/yummylogo.png";

function SimpleNavbar() {
  const history = useHistory();
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  // const { pref, changePref } = useContext(PrefContext);
  const theme = useTheme();
  const [appBar, setAppBar] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const [getUser, { data }] = useLazyQuery(GET_PROFILE);

  useEffect(() => {
    if (user) {
      getUser();
    }
    const handleScroll = () => {
      const position = window.scrollY;

      if (position > 100 && location.pathname === "/") setAppBar(true);
      else if (location.pathname !== "/") setAppBar(true);
      else setAppBar(false);
    };

    handleScroll();
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [location, appBar]);

  useEffect(() => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  }, [location]);

  const handleUIChange = () => {
    let currentTheme = JSON.parse(localStorage.getItem("isLight"));
    localStorage.setItem("isLight", !currentTheme);
    window.location.reload();
  };

  const handleProfileClick = () => {
    history.push("/profile");
  };

  const handleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        elevation={3}
        color={appBar ? "primary" : "transparent"}
        className={appBar ? classes.appBarBorder : classes.appBar}
      >
        <Container>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              className={classes.menuBar}
            >
              <Grid item>
                <Box height="100%" display="flex" alignItems="center">
                  <MaterialLink component={Button} href="/">
                    <img
                      src={logo}
                      className={classes.logo}
                      alt="YummyMaker"
                      // imgProps={{ width: "100%" }}
                    ></img>
                  </MaterialLink>
                  {/* {pref && history.location.pathname.includes("chefs/") && (
                    <Hidden smDown>
                       <Box
                        display="flex"
                        justifyItems="space-between"
                        alignItems="space-between"
                        // px={3}
                      >
                        <Link
                          component={Button}
                          variant={
                            pref.deliveryOption === "delivery"
                              ? "contained"
                              : "outlined"
                          }
                          onClick={setPref}
                          size="small"
                          color="secondary"
                        >
                          Delivery
                        </Link>
                        <Box my="auto" px={1}>
                          OR
                        </Box>
                        <Link
                          component={Button}
                          onClick={setPref}
                          size="small"
                          variant={
                            pref.deliveryOption === "pickup"
                              ? "contained"
                              : "outlined"
                          }
                          color="secondary"
                        >
                          Pickup
                        </Link>
                      </Box>
                    </Hidden>
                  )} */}
                </Box>
              </Grid>
              <Grid item className={classes.navMenu}>
                <Button
                  onClick={handleUIChange}
                  className={
                    theme.palette.type === "dark"
                      ? classes.inheritColor
                      : appBar
                      ? classes.textLight
                      : classes.defaultColor
                  }
                >
                  <Settings />
                </Button>
                {user && (user.role === "admin" || user.role === "chef") ? (
                  ""
                ) : (
                  <Link
                    // color="inherit"
                    className={`${(classes.navLink, classes.applyForChef)} ${
                      theme.palette.type === "dark"
                        ? classes.inheritColor
                        : appBar
                        ? classes.textLight
                        : classes.defaultColor
                    }`}
                    component={Button}
                    to="/register-chef"
                  >
                    Chef Application
                  </Link>
                )}
                {user ? (
                  <>
                    {user.role === "admin" ? (
                      <Link
                        color="inherit"
                        component={Button}
                        className={`${classes.navLink} ${
                          theme.palette.type === "dark"
                            ? classes.inheritColor
                            : appBar
                            ? classes.textLight
                            : classes.defaultColor
                        }`}
                        to="/admin-dashboard"
                      >
                        dashboard
                      </Link>
                    ) : (
                      ""
                    )}
                    {user.role === "chef" ? (
                      <Link
                        color="inherit"
                        component={Button}
                        className={`${classes.navLink} ${
                          theme.palette.type === "dark"
                            ? classes.inheritColor
                            : appBar
                            ? classes.textLight
                            : classes.defaultColor
                        }`}
                        to="/chef-dashboard"
                      >
                        dashboard
                      </Link>
                    ) : (
                      ""
                    )}
                    {/* <IconButton
                      className={`${classes.navLink} ${
                        theme.palette.type === "dark"
                          ? classes.inheritColor
                          : appBar
                          ? classes.inheritColor
                          : classes.textLight
                      }`}
                      color="inherit"
                    >
                      <NotificationsIcon />
                    </IconButton> */}
                    <IconButton
                      onClick={handleProfileClick}
                      className={classes.navLink}
                    >
                      {data?.getUser?.avatar ? (
                        <Avatar>
                          <Image
                            publicId={data.getUser.avatar}
                            cloudName="defivdghh"
                            secure="true"
                          >
                            <Transformation
                              width="40"
                              height="40"
                              gravity="face"
                              crop="thumb"
                            />
                          </Image>
                        </Avatar>
                      ) : (
                        <Avatar>{user.firstName[0]}</Avatar>
                      )}
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Link
                      component={Button}
                      to="/login"
                      className={`${classes.navLink} ${
                        theme.palette.type === "dark"
                          ? classes.inheritColor
                          : appBar
                          ? classes.textLight
                          : classes.defaultColor
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      component={Button}
                      className={`${classes.navLink} ${
                        theme.palette.type === "dark"
                          ? classes.inheritColor
                          : appBar
                          ? classes.textLight
                          : classes.defaultColor
                      }`}
                      to="/Register"
                    >
                      Register
                    </Link>

                    <IconButton
                      className={`${classes.navLink} ${
                        theme.palette.type === "dark"
                          ? classes.inheritColor
                          : appBar
                          ? classes.textLight
                          : classes.defaultColor
                      }`}
                    >
                      <NotificationsIcon />
                    </IconButton>
                  </>
                )}
              </Grid>

              <Drawer
                anchor="right"
                onClose={handleDrawer}
                open={drawerOpen}
                className={classes.bgMain}
              >
                <Box width={200}>
                  <List>
                    <ListItem button onClick={handleUIChange}>
                      <ListItemText primary="Toggle theme" />
                    </ListItem>
                    {user && (user.role === "admin" || user.role === "chef") ? (
                      user.role === "chef" ? (
                        <ListItem button component={Link} to="/chef-dashboard">
                          <ListItemText>Dashboard</ListItemText>
                        </ListItem>
                      ) : (
                        <ListItem button component={Link} to="/admin-dashboard">
                          <ListItemText>Dashboard</ListItemText>
                        </ListItem>
                      )
                    ) : (
                      <ListItem
                        className={classes.applyForChef}
                        component={Link}
                        to="/register-chef"
                      >
                        Become a Chef
                      </ListItem>
                    )}
                    <Divider />
                    {user ? (
                      <ListItem button component={Link} to="/profile">
                        <ListItemText>Profile</ListItemText>
                      </ListItem>
                    ) : (
                      <>
                        <ListItem button component={Link} to="/register">
                          <ListItemText>Register</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="/login">
                          <ListItemText>Login</ListItemText>
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>

              <Hidden mdUp>
                <IconButton onClick={handleDrawer}>
                  <MenuIcon />
                </IconButton>
              </Hidden>

              {/* <Select
                id="demo-simple-select"
                IconComponent={MenuIcon}
                color="secondary"
                variant="standard"
                className={classes.mobileMenu}
              >
                <MenuItem className={classes.navLink} onClick={handleUIChange}>
                  UI Color
                </MenuItem>
                {pref && history.location.pathname.includes("chefs/zipcode") && (
                  <MenuItem
                    className={classes.navLink}
                    name="deliveryOption"
                    value={pref.deliveryOption}
                    onClick={
                      pref.deliveryOption === "pickup" ? setPref : setPref
                    }
                  >
                    {pref.deliveryOption === "pickup" ? "Delivery" : "Pickup"}
                  </MenuItem>
                )}
                {user && (user.role === "admin" || user.role === "chef") ? (
                  user.role === "chef" ? (
                    <MenuItem
                      component={Link}
                      className={classes.navLink}
                      to="/chef-dashboard"
                    >
                      dashboard
                    </MenuItem>
                  ) : (
                    <MenuItem
                      className={classes.navLink}
                      component={Link}
                      to="/admin-dashboard"
                    >
                      dashboard
                    </MenuItem>
                  )
                ) : (
                  <MenuItem
                    className={(classes.navLink, classes.applyForChef)}
                    component={Link}
                    to="/register-chef"
                  >
                    Become a Chef
                  </MenuItem>
                )}
                {user ? (
                  <MenuItem
                    component={Link}
                    to="/profile"
                    className={classes.navLink}
                  >
                    Profile
                  </MenuItem>
                ) : (
                  <div>
                    <MenuItem
                      component={Link}
                      className={classes.navLink}
                      to="/register"
                    >
                      Register
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      className={classes.navLink}
                      to="/login"
                    >
                      Login
                    </MenuItem>
                  </div>
                )}
              </Select> */}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}

export default SimpleNavbar;
