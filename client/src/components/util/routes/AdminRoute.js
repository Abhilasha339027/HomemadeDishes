import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Switch>
      <Route {...rest}>
        {user?.role === "admin" ? <Component /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
};

export default AdminRoute;
