import React, { useContext } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import routes from "../routes";
import { AUTH_TOKEN } from "../constants";
import AdministrationSwitch from "../components/Administration/AdministrationSwitch";

// Pages
import Dashboard from "../pages/Dashboard";
import MyAgenda from "../pages/MyAgenda";
import MyBills from "../pages/MyBills";
import MyQuotes from "../pages/MyQuotes";
import MyCustomers from "../pages/MyCustomers";
import MyProfile from "../pages/MyProfile";
import QuoteDetail from "../pages/QuoteDetail";
import EventDetail from "../pages/EventDetail";
import BillDetail from "../pages/BillDetail";
import CustomerDetail from "../pages/CustomerDetail";
import QuoteFormPage from "../pages/QuoteFormPage";
import CustomerFormPage from "../pages/Administration/CustomerFormPage";
import UserDetail from "../pages/UserDetail";
import ToastProvider from "../providers/ToastProvider";
import AuthContext from "../contexts/AuthContext";

const ConnectedRouter: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  if (!localStorage.getItem(AUTH_TOKEN)) {
    history.push(routes.LOGIN.path);
  }

  return (
    <MainLayout>
      <ToastProvider horizontal="right">
        <Switch>
          <Route path={routes.DASHBOARD.path} exact component={Dashboard} />
          <Route path={routes.USER_DETAIL.path} component={UserDetail} />
          <Route path={routes.DASHBOARD.path} component={Dashboard} />
          <Route exact path={routes.MY_AGENDA.path} component={MyAgenda} />
          <Route path={routes.EVENTS_DETAIL.path} component={EventDetail} />
          <Route path={routes.MY_BILLS.path} component={MyBills} />
          <Route path={routes.BILLS_DETAIL.path} component={BillDetail} />
          <Route path={routes.MY_QUOTES.path} component={MyQuotes} />
          <Route path={routes.QUOTES_FORM.path + "/:id"} component={QuoteFormPage} />
          <Route path={routes.QUOTES_FORM.path} component={QuoteFormPage} />
          <Route path={routes.QUOTES_DETAIL.path} component={QuoteDetail} />
          <Route path={routes.MY_CUSTOMERS.path} component={MyCustomers} />
          <Route path={routes.CUSTOMERS_DETAIL.path} component={CustomerDetail} />
          <Route path={routes.CUSTOMERS_FORM.path} component={CustomerFormPage} />
          <Route path={routes.MY_PROFILE.path} component={MyProfile} />
          <Route path={routes.USER_DETAIL.path} component={UserDetail} />
          {authContext.isMoreThanOrEqualAdmin() ? <Route path={"/admin"} component={AdministrationSwitch} /> : null}
          <Route render={props => <Redirect to={routes.DASHBOARD.path} />} />
          <Redirect path="*" to={routes.DASHBOARD.path} />
        </Switch>
      </ToastProvider>
    </MainLayout>
  );
};

export default ConnectedRouter;
