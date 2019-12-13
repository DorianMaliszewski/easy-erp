import { FIND_ALL_CUSTOMERS, DELETE_CUSTOMER } from "../actions/customer";

export const customerReducer = (state, action) => {
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
        customers: action.customers.filter(customer => customer.id !== action.id)
      };
    default:
      return state;
  }
};
