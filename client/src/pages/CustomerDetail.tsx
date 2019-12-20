import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CustomerCard from "../components/Customers/CustomerCard";
import { CustomerData } from "../models/CustomerData";
import routes from "../routes";
import { useCustomersContext } from "../providers/CustomerProvider";

const CustomerDetail: React.FC<any> = props => {
  const history = useHistory();
  const { id } = useParams();

  const customerContext = useCustomersContext();
  const [customer, setCustomer] = useState<any>();

  useEffect(() => {
    if (id) {
      customerContext.findById(parseInt(id, 10)).subscribe(
        (c: CustomerData) => {
          setCustomer(c);
        },
        (err: any) => {
          history.goBack();
        }
      );
    }
  }, [id]);

  if (!customer) {
    return <Splashscreen text="Récupération du client" />;
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container direction="row" justify="space-between">
        <Grid item>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={e => history.push(routes.CUSTOMERS_UPDATE.path.replace(":id", customer.id))}>
            Modifier
          </Button>
        </Grid>
      </Grid>
      <CustomerCard customer={customer} />
    </Grid>
  );
};

export default CustomerDetail;
