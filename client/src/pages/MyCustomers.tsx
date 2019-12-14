import React, { useContext } from "react";
import CustomersTable from "../components/Customers/CustomersTable";
import CustomerContext from "../contexts/CustomerContext";
import Splashscreen from "./Splashscreen";

const MyCustomers: React.FC<any> = props => {
  const customerContext = useContext(CustomerContext);

  if (!customerContext.state.customers) {
    customerContext.findAll();
    return <Splashscreen text="Récupération des clients" />;
  }
  return (
    <>
      <CustomersTable customers={customerContext.state.customers} />
    </>
  );
};

export default MyCustomers;
