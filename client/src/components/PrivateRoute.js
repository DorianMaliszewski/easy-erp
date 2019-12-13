import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import routes from "../routes";

import { Redirect, Route } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const PrivateRoute = props => {
  const authContext = useContext(AuthContext);

  if (authContext.isConnected()) {
    return <Route {...props} />;
  }

  if (sessionStorage.getItem(AUTH_TOKEN) && !authContext.user) {
    return <div />;
  }

  return <Route render={props => <Redirect to={{ pathname: routes.LOGIN_ROUTE.path, state: { from: props.location } }} />} />;
};

export default PrivateRoute;
