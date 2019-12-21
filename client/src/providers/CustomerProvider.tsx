import React, { useReducer } from "react";
import { FIND_ALL_CUSTOMERS, DELETE_CUSTOMER, CUSTOMER_UPDATE, CUSTOMER_ADD } from "../actions/customer";
import { customerReducer } from "../reducers/customer";
import CustomerApi from "../api/customer";
import { tap, catchError, map } from "rxjs/operators";
import { CustomerData } from "../models/CustomerData";
import { of } from "rxjs";
import useSnackbar from "../hooks/useSnackbar";
import { DTO } from "../models/DTO";

const initialState = {
  isLoading: false,
  customers: null,
  numFound: 0
};

const CustomerContext = React.createContext<any>({});

const CustomerProvider: React.FC<any> = props => {
  const [customerState, dispatch] = useReducer(customerReducer, initialState);
  const snackbar = useSnackbar();
  const findAll = () => {
    dispatch({ type: FIND_ALL_CUSTOMERS.REQUEST });
    return CustomerApi.getInstance()
      .findAll()
      .pipe(
        map(dto => {
          dispatch({ type: FIND_ALL_CUSTOMERS.SUCCESS, customers: dto.items, numFound: dto.numFound });
          return dto;
        })
      );
  };

  const findById = (id: number) => {
    let customerFinded = null;
    if (customerState.customers) {
      customerFinded = customerState.customers.find((customer: CustomerData) => customer.id === id);
    }
    console.log(customerFinded);

    return customerFinded ? of(customerFinded) : findAll().pipe(map((dto: DTO<CustomerData>) => dto.items.find(c => c.id === id)));
  };

  const deleteCustomer = (id: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch({ type: DELETE_CUSTOMER.SUCCESS, id });
        resolve(id);
      }, 1000);
    });
  };
  const save = (customer: CustomerData) => {
    return CustomerApi.getInstance()
      .save(customer)
      .pipe(
        tap((result: CustomerData) => {
          snackbar.show("Modification enregistrée", "success");
          return updateState(result, customer.id ? false : true);
        }),
        catchError(handleError(customer))
      );
  };

  const updateState = (customer: CustomerData, isCreate: boolean) => {
    if (!isCreate) {
      dispatch({ type: CUSTOMER_UPDATE.SUCCESS, customer });
    } else {
      dispatch({ type: CUSTOMER_ADD.SUCCESS, customer });
    }
    return customer;
  };

  const handleError = (customer: CustomerData) => {
    return (error: any) => {
      console.log("An error occured", error);
      snackbar.show("Une erreur est survenue, veuillez réessayer", "error");
      return of(customer);
    };
  };

  return <CustomerContext.Provider value={{ state: customerState, findAll, findById, deleteCustomer, save }}>{props.children}</CustomerContext.Provider>;
};

const useCustomersContext = () => {
  const customerContext = React.useContext(CustomerContext);

  return customerContext;
};

export { CustomerProvider, useCustomersContext };
