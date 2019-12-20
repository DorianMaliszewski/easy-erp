import { FIND_ALL_CUSTOMERS, DELETE_CUSTOMER, CUSTOMER_ADD, CUSTOMER_UPDATE } from "../actions/customer";
import { CustomerData } from "../models/CustomerData";

type CustomerState = {
  customers: any;
  isLoading: boolean;
  numFound: number;
};

export const customerReducer = (state: CustomerState, action: any) => {
  switch (action.type) {
    case FIND_ALL_CUSTOMERS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FIND_ALL_CUSTOMERS.SUCCESS:
      return {
        ...state,
        customers: action.customers,
        numFound: action.numFound,
        isLoading: false
      };
    case FIND_ALL_CUSTOMERS.FAIL:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_CUSTOMER.SUCCESS:
      return {
        ...state,
        customers: action.customers.filter((customer: any) => customer.id !== action.id)
      };
    case CUSTOMER_ADD.SUCCESS:
      state.customers.push(action.customer);
      return { ...state };
    case CUSTOMER_UPDATE.SUCCESS: {
      const index = state.customers.findIndex((customer: CustomerData) => customer.id === action.customer.id);
      if (index > -1) {
        state.customers.splice(index, 1, action.customer);
      }
      return { ...state };
    }
    default:
      return state;
  }
};
