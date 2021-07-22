import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { AuthContext } from "../../../contexts/auth";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../../queries/user";
import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import AddFoodItems from "./AddFoodItems";
import useStyles from "../../../styles/GlobalStyles";
import AllFoodItems from "./AllFoodItems";
import Orders from "./Orders";
import Loader from "../../util/Loader";
import Profile from "./Profile";
import ChefApplicationStepper from "../auth/ChefApplication.js/ChefApplicationStepper";
import { Close } from "@material-ui/icons";
import { ChefFormContextProvider } from "../../../contexts/chefApplicationForm";
// import Settings from "./Settings";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ChefDashboard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { loading, error, data } = useQuery(GET_PROFILE);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const theme = useTheme();

  // const { logout } = useContext(AuthContext);
  // const handleLogout = () => {
  //   logout();
  // };

  useEffect(() => {
    if (!data.getUser.isApplicationDone) {
      setIsApplicationOpen(true);
    }
  }, [data.getUser]);

  const handleCloseApplication = () => setIsApplicationOpen(false);

  const handleApplicationOpen = () => {
    setIsApplicationOpen(false);
  };

  const handleClose = () => {};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) return <Loader />;
  else if (data) {
    return (
      <>
        <Box mt={6} py={5} className={classes.profileRoot} width="100%">
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            scrollButtons="on"
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Settings" {...a11yProps(0)} />
            <Tab label="All Dishes" {...a11yProps(1)} />
            <Tab label="Add Dish" {...a11yProps(2)} />
            <Tab label="Orders" {...a11yProps(3)} />
            {/* <Tab label="Settings" {...a11yProps(4)} /> */}
          </Tabs>

          <TabPanel value={value} index={0}>
            <Profile />
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.TabPanel}>
            <AllFoodItems />
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.TabPanel}>
            <AddFoodItems />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Orders />
          </TabPanel>
          {/* <TabPanel value={value} index={4}>
          <Settings />
        </TabPanel> */}
        </Box>
        <Box className={classes.newBackground1}>
          <Dialog
            fullScreen
            open={isApplicationOpen}
            onClose={handleClose}
            TransitionComponent={Slide}
            TransitionProps={{ direction: "up" }}
            // overlayStyle={{ backgroundColor: "white" }}
            // color="inherit"
            // className={classes.newBackground1}
            PaperProps={{
              style: {
                backgroundColor: theme.palette.secondary.extra,
              },
            }}
          >
            <AppBar className={(classes.appBar, classes.fontBold)}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseApplication}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
                <Typography variant="h6">Chef Application</Typography>
              </Toolbar>
            </AppBar>
            <Box>
              <Box textAlign="center" pt={10} mt={8}>
                <Typography variant="h3" className={classes.fontBold}>
                  Your Application
                </Typography>
                <Typography variant="body1" className={classes.fontBold1}>
                  Please complete the form to finish your application
                </Typography>
              </Box>

              <Box py={2}>
                <Divider />
              </Box>
              <Box>
                <ChefFormContextProvider>
                  <ChefApplicationStepper
                    handleApplicationOpen={handleApplicationOpen}
                  />
                </ChefFormContextProvider>
              </Box>
            </Box>
          </Dialog>
        </Box>
      </>
    );
  } else if (error) {
    return (
      <Box py={20} textAlign="center">
        <Typography variant="h4" color="error">
          Could not connect or Could not find anything...
        </Typography>
      </Box>
    );
  }
}
