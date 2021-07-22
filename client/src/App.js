import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import {
  Box,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import LogRocket from "logrocket";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

import "./fonts.css";
import ErrorBoundary from "./ErrorBoundary";
import { lightTheme } from "./themes/LightTheme";
import { darkTheme } from "./themes/DarkTheme";
import { CartContextProvider } from "./contexts/cartContext";
import AuthRoute from "./components/util/routes/AuthRoute";
import ProtectedRoute from "./components/util/routes/ProtectedRoute";
import ChefRoute from "./components/util/routes/ChefRoute";
import AdminRoute from "./components/util/routes/AdminRoute";
import Footer from "./components/layout/Footer";
import Loader from "./components/util/Loader";
import { AuthContext } from "./contexts/auth";
import { keys } from "./keys";
import { PrefProvider } from "./contexts/preff";
import setupLogRocketReact from "logrocket-react";
import Error from "./components/layout/static/Error";

// Lazy Imports
const Home = lazy(() => import("./components/layout/Home.js"));
const PrivacyPolicy = lazy(() =>
  import("./components/layout/static/PrivacyPolicy")
);

const TermsOfService = lazy(() =>
  import("./components/layout/static/TermsOfService")
);

const GetChefsByZip = lazy(() =>
  import("./components/pages/Chefs/GetChefsByZip")
);

const GetChefsByCuisine = lazy(() =>
  import("./components/pages/Chefs/GetChefsByCuisine")
);

const FoodItems = lazy(() => import("./components/pages/Dishes/FoodItems"));
const MyProfile = lazy(() => import("./components/pages/profile/MyProfile"));
const AdvancedSearch = lazy(() =>
  import("./components/ChefsHome/ChefsByZip/AdvancedSearch")
);

const CheckoutProvider = lazy(() =>
  import("./components/pages/Checkout/CheckoutProvider")
);

const Register = lazy(() => import("./components/pages/auth/Register"));
const Login = lazy(() => import("./components/pages/auth/Login"));
const Dishes = lazy(() => import("./components/pages/admin/Dishes"));
const EditFoodItem = lazy(() =>
  import("./components/pages/chef-dashboard/EditFoodItem")
);
const Admin = lazy(() => import("./components/pages/admin/Admin"));
const RegisterChef = lazy(() =>
  import("./components/pages/auth/ChefApplication.js/RegisterChef")
);
const Settings = lazy(() => import("./components/pages/admin/Settings"));

const ChefDashboard = React.lazy(() =>
  import("./components/pages/chef-dashboard/ChefDashboard")
);

function App(props) {
  const { user } = useContext(AuthContext);

  LogRocket.init("wcxutl/yummymakercom");
  setupLogRocketReact(LogRocket);

  user &&
    LogRocket.identify(user.id, {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,

      role: user.role,
      handle: user.handle,
    });

  let theme = JSON.parse(localStorage.getItem("isLight"));
  let muiTheme = createMuiTheme(theme ? lightTheme : darkTheme);
  muiTheme = responsiveFontSizes(muiTheme);

  return (
    <PrefProvider>
      <ErrorBoundary>
        <Router>
          <ThemeProvider theme={muiTheme}>
            <CartContextProvider>
              <Box>
                <Navbar />

                <Box>
                  <Suspense fallback={<Loader />}>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route
                        exact
                        path="/terms-of-service"
                        component={TermsOfService}
                      />
                      <Route exact path="/chef-service-fee" />
                      {/* <Route exact path="/chef-commision-fee" /> */}

                      <Route
                        exact
                        path="/privacy-policy"
                        component={PrivacyPolicy}
                      />

                      <Route
                        exact
                        path="/register-chef"
                        component={RegisterChef}
                      />

                      <ChefRoute
                        exact
                        path="/edit/food/:id"
                        component={EditFoodItem}
                      />

                      <ChefRoute
                        exact
                        path="/chef-dashboard"
                        component={ChefDashboard}
                      />

                      <AdminRoute
                        exact
                        path="/admin-dashboard"
                        component={Admin}
                      />

                      <AdminRoute
                        exact
                        path="/admin-dashboard/dishes"
                        component={Dishes}
                      />

                      <AdminRoute
                        exact
                        path="/admin-dashboard/settings"
                        component={Settings}
                      />

                      <AuthRoute exact path="/login" component={Login} />
                      <AuthRoute exact path="/register" component={Register} />

                      <ProtectedRoute
                        exact
                        path="/checkout/:name"
                        component={CheckoutProvider}
                      />
                      <Route
                        exact
                        path="/chef/:zipCode/:handle"
                        component={FoodItems}
                      />
                      <Route
                        exact
                        path="/chefs/filter/:zipCode"
                        component={AdvancedSearch}
                      />
                      <Route
                        exact
                        path="/chefs/zipcode/:zipCode"
                        component={GetChefsByZip}
                      />
                      <Route
                        exact
                        path="/chefs/zipcode/:zipCode/:cuisine"
                        component={GetChefsByCuisine}
                      />

                      <ProtectedRoute
                        exact
                        path="/profile"
                        component={MyProfile}
                      />
                      <Route component={Error} />
                    </Switch>
                  </Suspense>
                </Box>
                <Footer />

                {/* 
            <ScrollTop {...props}>
            <Fab
                color="secondary"
                size="small"
                aria-label="scroll back to top"
              >
                <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop> */}
              </Box>
            </CartContextProvider>
          </ThemeProvider>
        </Router>
      </ErrorBoundary>
    </PrefProvider>
  );
}

export default App;
