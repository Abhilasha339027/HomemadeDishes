import React, { useContext } from "react";

import { AuthContext } from "../../../contexts/auth";
import AdminNavbar from "./AdminNavbar";
import SimpleNavbar from "./SimpleNavbar";

const Navbar = (props) => {
  const { user } = useContext(AuthContext);

  let pathname = window.location.href;

  if (user?.role === "admin" && pathname.includes("/admin-dashboard")) {
    return <AdminNavbar />;
  } else if (
    !pathname.includes("/admin-dashboard") ||
    !user ||
    user.role !== "admin"
  ) {
    return <SimpleNavbar />;
  }
};

export default Navbar;
