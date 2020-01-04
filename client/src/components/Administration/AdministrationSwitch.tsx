import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../routes";

import Users from "../../pages/Administration/Users";
import ClientsUsers from "../../pages/Administration/ClientsUsers";
import { AUTH_TOKEN } from "../../constants";
import AuthContext from "../../contexts/AuthContext";
import TenantDetail from "../../pages/Administration/TenantDetail";
import TenantFormPage from "../../pages/Administration/TenantFormPage";

const AdministrationSwitch: React.FC<any> = props => {
  const authContext = useContext(AuthContext);

  if (!authContext.isConnected()) {
    return <Route render={props => <Redirect to={{ pathname: routes.LOGIN.path, state: { from: props.location } }} />} />;
  }

  if (!authContext.isMoreThanOrEqualAdmin()) {
    return <Redirect to="/" />;
  }

  if (localStorage.getItem(AUTH_TOKEN) && !authContext.user) {
    return <div />;
  }

  return (
    <Switch>
      {authContext.user.role.name === "ROLE_SUPER_ADMIN" && <Route path={routes.ADMIN_TENANT_FORM.path} component={TenantFormPage} />}
      {authContext.user.role.name === "ROLE_SUPER_ADMIN" && <Route path={routes.ADMIN_TENANT.path} component={TenantDetail} />}
      <Route path={routes.ADMIN_USERS.path} component={Users} />
      <Route path={routes.ADMIN_CLIENTS_USERS.path} component={ClientsUsers} />
      <Redirect to="/" />
    </Switch>
  );
};

AdministrationSwitch.propTypes = {
  component: PropTypes.elementType,
  render: PropTypes.func
};

export default AdministrationSwitch;
