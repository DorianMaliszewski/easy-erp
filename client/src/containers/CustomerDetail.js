import React, { useContext, useState } from "react";
import Layout from "../components/Layouts/Layout";
import routes from "../routes";
import { withRouter } from "react-router-dom";
import { Button, withStyles } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CustomerContext from "../contexts/CustomerContext";
import CustomerCard from "../components/Customers/CustomerCard";

const CustomerDetail = ({ location, match, history }) => {
  const customerContext = useContext(CustomerContext);
  const [customer, setCustomer] = useState(null);

  if (!customer) {
    customerContext.findById(parseInt(match.params.id, 10)).then(c => {
      if (c) {
        setCustomer(c);
      } else {
        history.goBack();
      }
    });
    return (
      <Layout title={routes.CUSTOMERS_DETAIL.title}>
        <Splashscreen text='Récupération du client' />
      </Layout>
    );
  }

  return (
    <Layout title={routes.CUSTOMERS_DETAIL.title} showGoBack>
      <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", paddingBottom: 20 }}>
        <div style={{ flexGrow: 1 }}>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </div>
      </div>
      <CustomerCard customer={customer} />
    </Layout>
  );
};

CustomerDetail.propTypes = {};

const styles = theme => ({});

export default withStyles(styles)(withRouter(CustomerDetail));
