import React, { useContext } from "react";
import Layout from "../components/Layouts/Layout";
import routes from "../routes";
import CustomersTable from "../components/Customers/CustomersTable";
import { withStyles } from "@material-ui/core";
import CustomerContext from "../contexts/CustomerContext";
import Splashscreen from "../containers/Splashscreen";

const MyCustomers = props => {
  const customerContext = useContext(CustomerContext);

  if (!customerContext.state.customers) {
    customerContext.findAll();
    return (
      <Layout title={routes.MY_CUSTOMERS.title}>
        <Splashscreen text="Récupération des clients" />
      </Layout>
    );
  }
  return (
    <Layout title={routes.MY_CUSTOMERS.title}>
      <CustomersTable customers={customerContext.state.customers} />
    </Layout>
  );
};

const styles = theme => ({});

export default withStyles(styles)(MyCustomers);
