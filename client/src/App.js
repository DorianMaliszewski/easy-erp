import React, { useContext } from "react";
import "./App.css";
import Signin from "./containers/Signin";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import routes from "./routes";
import Dashboard from "./containers/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { REFRESH_TOKEN } from "./constants";
import AuthContext from "./contexts/AuthContext";
import AdministrationSwitch from "./components/Administration/AdministrationSwitch";
import MyAgenda from "./containers/MyAgenda";
import MyBills from "./containers/MyBills";
import MyQuotes from "./containers/MyQuotes";
import MyCustomers from "./containers/MyCustomers";
import MyProfile from "./containers/MyProfile";
import moment from "moment";
import "moment/locale/fr";
import Splashscreen from "./containers/Splashscreen";
import QuoteDetail from "./containers/QuoteDetail";
import EventDetail from "./containers/EventDetail";
import BillDetail from "./containers/BillDetail";
import CustomerDetail from "./containers/CustomerDetail";
import QuoteFormPage from "./containers/QuoteFormPage";
import CustomerFormPage from "./containers/Administration/CustomerFormPage";
import UserDetail from "./containers/UserDetail";

moment.locale("fr");

const App = ({ location, ...props }) => {
  const authContext = useContext(AuthContext);
  if (localStorage.getItem(REFRESH_TOKEN) && !authContext.user) {
    authContext.refreshToken().then(res => {
      if (res === false) {
        authContext.setUser(null); // Modify state to rerender and redirect to login
      }
    });
    return <Splashscreen />;
  }

  return (
    <Switch>
      <Route path={routes.LOGIN_ROUTE.path} component={Signin} />
      <PrivateRoute path={routes.DASHBOARD.path} component={Dashboard} />
      <PrivateRoute exact path={routes.MY_AGENDA.path} component={MyAgenda} />
      <PrivateRoute path={routes.EVENTS_DETAIL.path} component={EventDetail} />
      <PrivateRoute path={routes.MY_BILLS.path} component={MyBills} />
      <PrivateRoute path={routes.BILLS_DETAIL.path} component={BillDetail} />
      <PrivateRoute path={routes.MY_QUOTES.path} component={MyQuotes} />
      <PrivateRoute path={routes.QUOTES_FORM.path + "/:id"} component={QuoteFormPage} />
      <PrivateRoute path={routes.QUOTES_FORM.path} component={QuoteFormPage} />
      <PrivateRoute path={routes.QUOTES_DETAIL.path} component={QuoteDetail} />
      <PrivateRoute path={routes.MY_CUSTOMERS.path} component={MyCustomers} />
      <PrivateRoute path={routes.CUSTOMERS_DETAIL.path} component={CustomerDetail} />
      <PrivateRoute path={routes.CUSTOMERS_FORM.path} component={CustomerFormPage} />
      <PrivateRoute path={routes.MY_PROFILE.path} component={MyProfile} />
      <PrivateRoute path={routes.USER_DETAIL.path} component={UserDetail} />
      {authContext.isMoreThanOrEqualAdmin() ? <Route path={routes.ADMIN.path} component={AdministrationSwitch} /> : null}
      <Route render={props => <Redirect to={routes.DASHBOARD.path} />} />
    </Switch>
  );
};

export default withRouter(App);
