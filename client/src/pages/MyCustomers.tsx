import React, { useEffect } from "react";
import Splashscreen from "./Splashscreen";
import { CustomerTableEnhanced } from "../components/Customers/CustomerTableEnhanced/CustomerTableEnhanced";
import { Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import routes from "../routes";
import { useCustomersContext } from "../providers/CustomerProvider";

const MyCustomers: React.FC<any> = props => {
  const customerContext = useCustomersContext();
  const history = useHistory();

  useEffect(() => {
    if (!customerContext.state.customers && !customerContext.state.isLoading) {
      customerContext.findAll().subscribe();
    }
  }, [customerContext]);

  if (!customerContext.state.customers) {
    return <Splashscreen text="Récupération des clients" />;
  }
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={e => history.push(routes.CUSTOMERS_ADD.path)}>
          Ajouter un client
        </Button>
      </Grid>
      <Grid item>
        <CustomerTableEnhanced rows={customerContext.state.customers} isLoading={customerContext.state.isLoading} />
      </Grid>
    </Grid>
  );
};

export default MyCustomers;
