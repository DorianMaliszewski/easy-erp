import React, { useState, useContext } from "react";
import { CustomerData } from "../../models/CustomerData";
import { Typography } from "@material-ui/core";
import AdminCustomerForm from "../../components/Administration/AdminCustomers/AdminCustomerForm";
import CustomerContext from "../../contexts/CustomerContext";

const CustomerFormPage: React.FC<any> = ({ match }) => {
  const [customer, setCustomer] = useState(new CustomerData());
  const customerContext = useContext(CustomerContext);

  if (match.params.id) {
    customerContext.findById(parseInt(match.params.id, 10)).subscribe((customerFinded: any) => {
      setCustomer(customer);
    });
  }

  const submit = () => {
    customerContext.create(customer).then((data: any) => {
      console.log("Retour de create", data);
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
