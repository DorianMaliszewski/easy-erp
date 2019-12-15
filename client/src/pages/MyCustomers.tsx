import React, { useContext, useEffect } from "react";
import CustomersTable from "../components/Customers/CustomersTable";
import CustomerContext from "../contexts/CustomerContext";
import Splashscreen from "./Splashscreen";

const MyCustomers: React.FC<any> = props => {
  const customerContext = useContext(CustomerContext);

  useEffect(() => {
    if (!customerContext.state.customers) customerContext.findAll();
  }, [customerContext]);

  if (!customerContext.state.customers) {
    return <Splashscreen text="Récupération des clients" />;
  }
  return (
    <>
      <CustomersTable customers={customerContext.state.customers} />
    </>
  );
};

export default MyCustomers;
