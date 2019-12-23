import React, { useState, useContext, useEffect, useMemo } from "react";
import { CustomerData } from "../models/CustomerData";
import { Typography } from "@material-ui/core";
import AdminCustomerForm from "../components/Administration/AdminCustomers/AdminCustomerForm";
import { useParams, useHistory } from "react-router-dom";
import routes from "../routes";
import { useCustomersContext } from "../providers/CustomerProvider";

const CustomerFormPage: React.FC<any> = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(new CustomerData());
  const customerContext = useCustomersContext();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      customerContext.findById(parseInt(id, 10)).subscribe((customerFinded: any) => {
        setCustomer(customerFinded);
      });
    }
  }, [id]);

  const submit = () => {
    customerContext.save(customer).subscribe((data: any) => {
      if (data.id) {
        history.push(routes.CUSTOMERS_DETAIL.path.replace(":id", data.id));
      }
    });
  };

  return (
    <>
      <Typography variant="h5" gutterBottom style={{ marginBottom: 20 }}>
        {customer.id ? "Modifier" : "Créer"} un client
      </Typography>
      <AdminCustomerForm customer={customer} setCustomer={setCustomer} handleSubmit={submit} />
    </>
  );
};

export default CustomerFormPage;
