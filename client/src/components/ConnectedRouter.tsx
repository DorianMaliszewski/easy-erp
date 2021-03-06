import React, { useContext } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import routes from "../routes";
import { AUTH_TOKEN } from "../constants";
import AdministrationSwitch from "../components/Administration/AdministrationSwitch";
// State
import AuthContext from "../contexts/AuthContext";
import BillForm from "../pages/BillFormPage";
import Splashscreen from "../pages/Splashscreen";

// Pages
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const MyAgenda = React.lazy(() => import("../pages/MyAgenda"));
const MyBills = React.lazy(() => import("../pages/MyBills"));
const MyQuotes = React.lazy(() => import("../pages/MyQuotes"));
const MyCustomers = React.lazy(() => import("../pages/MyCustomers"));
const MyProfile = React.lazy(() => import("../pages/MyProfile"));
const QuoteDetail = React.lazy(() => import("../pages/QuoteDetail"));
const EventDetail = React.lazy(() => import("../pages/EventDetail"));
const BillDetail = React.lazy(() => import("../pages/BillDetail"));
const CustomerDetail = React.lazy(() => import("../pages/CustomerDetail"));
const QuoteFormPage = React.lazy(() => import("../pages/QuoteFormPage"));
const CustomerFormPage = React.lazy(() => import("../pages/CustomerFormPage"));
const UserDetail = React.lazy(() => import("../pages/UserDetail"));
const CustomerUserDetail = React.lazy(() => import("../pages/CustomerUserDetail"));
const CustomerUserFormPage = React.lazy(() => import("../pages/CustomerUserFormPage"));

const ConnectedRouter: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  if (!localStorage.getItem(AUTH_TOKEN)) {
    history.push(routes.LOGIN.path);
  }

  if (!authContext.user) {
    return (
      <MainLayout>
        <Splashscreen text=" " />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <React.Suspense fallback={<div></div>}>
        <Switch>
          <Route path={routes.DASHBOARD.path} exact component={Dashboard} />
          <Route path={routes.USER_DETAIL.path} component={UserDetail} />
          <Route path={routes.DASHBOARD.path} component={Dashboard} />
          <Route exact path={routes.MY_AGENDA.path} component={MyAgenda} />
          <Route path={routes.EVENTS_DETAIL.path} component={EventDetail} />

          <Route path={routes.MY_BILLS.path} component={MyBills} />
          <Route path={routes.BILLS_DETAIL.path} component={BillDetail} />
          <Route path={routes.BILLS_FORM.path + "/:id"} component={BillForm} />
          <Route path={routes.BILLS_FORM.path} exact={true} component={BillForm} />

          <Route path={routes.MY_QUOTES.path} component={MyQuotes} />
          <Route path={routes.QUOTES_FORM.path + "/:id"} component={QuoteFormPage} />
          <Route path={routes.QUOTES_FORM.path} component={QuoteFormPage} />
          <Route path={routes.QUOTES_DETAIL.path} component={QuoteDetail} />

          <Route path={routes.MY_CUSTOMERS.path} component={MyCustomers} />
          <Route path={routes.CUSTOMERS_DETAIL.path} component={CustomerDetail} />
          <Route path={routes.CUSTOMERS_UPDATE.path} component={CustomerFormPage} />
          <Route path={routes.CUSTOMERS_ADD.path} exact component={CustomerFormPage} />

          <Route path={routes.MY_PROFILE.path} component={MyProfile} />

          <Route path={routes.CUSTOMER_USER_ADD.path} exact component={CustomerUserFormPage} />
          <Route path={routes.CUSTOMER_USER_UPDATE.path} component={CustomerUserFormPage} />
          <Route path={routes.CUSTOMER_USER_DETAIL.path} exact component={CustomerUserDetail} />

          <Route path={"/admin"} component={AdministrationSwitch} />

          <Redirect path="*" to={routes.DASHBOARD.path} />
        </Switch>
      </React.Suspense>
    </MainLayout>
  );
};

export default ConnectedRouter;
