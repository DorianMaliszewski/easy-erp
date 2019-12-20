import { useContext, useEffect } from "react";
import { CustomerData } from "../models/CustomerData";
import { useCustomersContext } from "../providers/CustomerProvider";

const useCustomers = () => {
  const customerContext = useCustomersContext();
  useEffect(() => {
    if (!customerContext.state.customers && !customerContext.state.isLoading) {
      customerContext.findAll();
    }
  }, [customerContext]);

  return {
    customers: customerContext.state.customers as CustomerData[],
    isLoading: customerContext.state.isLoading,
    refresh: customerContext.findAll
  };
};

export default useCustomers;
