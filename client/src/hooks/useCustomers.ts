import React, { useContext, useEffect } from "react";
import CustomerContext from "../contexts/CustomerContext";
import { CustomerData } from "../models/CustomerData";

const useCustomers = () => {
  const customerContext = useContext(CustomerContext);
  useEffect(() => {
    if (!customerContext.state.customers) {
      customerContext.findAll();
    }
  }, []);

  return {
    customers: customerContext.state.customers as CustomerData[],
    isLoading: customerContext.state.isLoading,
    refresh: customerContext.findAll
  };
};

export default useCustomers;
