import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ProfileSetup from "./ProfileSetup";
import { AuthContext } from "../../../contexts/auth";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../../queries/user";
import Orders from "./Orders";
import Loader from "../../util/Loader";

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

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // display: "flex",
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`,
    // [theme.breakpoints.down("sm")]: {
    //   width: "50%",
    // },
  },
  TabPanel: {
    width: "100%",
  },
}));

export default function MyProfile(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { logout } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_PROFILE, {
    fetchPolicy: "cache-and-network",
  });

  const handleLogout = () => {
    logout();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <Loader />;
  } else if (data) {
    return (
      <Box
        className={classes.root}
        mt={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            scrollButtons="on"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            // className={classes.tabs}
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
            {/* <Tab label="Addresses" {...a11yProps(2)} /> */}
            <Tab label="Logout" onClick={handleLogout} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ProfileSetup profile={data.getUser} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Orders />
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
        </div>
      </Box>
    );
  } else if (error) {
    console.log(error.graphQLErrors);
  }
}
