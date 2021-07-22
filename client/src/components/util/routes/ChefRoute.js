import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth";

const ChefRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user?.role === "chef" ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ChefRoute;
