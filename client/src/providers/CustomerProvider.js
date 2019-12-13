import React, { useReducer } from 'react';
import CustomerContext from '../contexts/CustomerContext';
import { FIND_ALL_CUSTOMERS, DELETE_CUSTOMER } from '../actions/customer';
import { customerReducer } from '../reducers/customer';
import { INSTANCE_URL } from '../constants';
import CustomerApi from '../api/client';

let id = 0;
function createData(name, contact, phone, email, site, address, postalCode, createdBy) {
  id += 1;
  return { id, name, contact, phone, email, site, address, postalCode, createdBy };
}

const customersRows = [
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin'),
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin'),
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin'),
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin'),
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin')
];

const initialState = {
  isLoading: false,
  customers: null,
  numFound: 0
};

const API_URL = sessionStorage.getItem(INSTANCE_URL) + '/' + process.env.REACT_APP_CUSTOMER_SERVICE;

const CustomerProvider = props => {
  const [customerState, dispatch] = useReducer(customerReducer, initialState);

  const findAll = () => {
    console.log('Starting promise');
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Promise finished');
        dispatch({ type: FIND_ALL_CUSTOMERS.SUCCESS, customers: customersRows, numFound: customersRows.length });
        resolve(customersRows);
      }, 1000);
    });
  };

  const findById = id => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(customersRows.find(q => q.id === id));
      }, 1000);
    });
  };

  const deleteCustomer = id => {
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch({ type: DELETE_CUSTOMER.SUCCESS, id });
        resolve(id);
      }, 1000);
    });
  };

  const create = customer => {
    return CustomerApi.create(customer);
  };

  return <CustomerContext.Provider value={{ state: customerState, findAll, findById, deleteCustomer, create }}>{props.children}</CustomerContext.Provider>;
};

export default CustomerProvider;
