import React, { useState, useContext, useEffect, useMemo } from "react";
import { CustomerData } from "../models/CustomerData";
import { Typography } from "@material-ui/core";
import AdminCustomerForm from "../components/Administration/AdminCustomers/AdminCustomerForm";
import { useParams } from "react-router-dom";
import { useCustomersContext } from "../providers/CustomerProvider";

const CustomerFormPage: React.FC<any> = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(new CustomerData());
  const customerContext = useCustomersContext();

  useEffect(() => {
    if (id) {
      customerContext.findById(parseInt(id, 10)).subscribe((customerFinded: any) => {
        setCustomer(customerFinded);
      });
    }
  }, [id]);

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
