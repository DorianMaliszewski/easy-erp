import React, { useContext, useEffect } from "react";
import CustomerContext from "../contexts/CustomerContext";
import Splashscreen from "./Splashscreen";
import { CustomerTableEnhanced } from "../components/Customers/CustomerTableEnhanced/CustomerTableEnhanced";

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
      <CustomerTableEnhanced rows={customerContext.state.customers} isLoading={customerContext.state.isLoading} />
    </>
  );
};

export default MyCustomers;
