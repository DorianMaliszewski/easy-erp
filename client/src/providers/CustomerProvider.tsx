import React, { useReducer } from "react";
import CustomerContext from "../contexts/CustomerContext";
import { FIND_ALL_CUSTOMERS, DELETE_CUSTOMER } from "../actions/customer";
import { customerReducer } from "../reducers/customer";
import CustomerApi from "../api/customer";
import { Observable } from "rxjs";

const initialState = {
  isLoading: false,
  customers: null,
  numFound: 0
};

const CustomerProvider: React.FC<any> = props => {
  const [customerState, dispatch] = useReducer(customerReducer, initialState);

  const findAll = () => {
    return CustomerApi.getInstance()
      .findAll()
      .subscribe(dto => {
        dispatch({ type: FIND_ALL_CUSTOMERS.SUCCESS, customers: dto.items, numFound: dto.numFound });
      });
  };

  const findById = (id: number) => {
    return CustomerApi.getInstance().findOneById(id);
  };

  const deleteCustomer = (id: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch({ type: DELETE_CUSTOMER.SUCCESS, id });
        resolve(id);
      }, 1000);
    });
  };

  const create = (customer: any) => {
    return CustomerApi.getInstance().create(customer);
  };

  return <CustomerContext.Provider value={{ state: customerState, findAll, findById, deleteCustomer, create }}>{props.children}</CustomerContext.Provider>;
};

export default CustomerProvider;
