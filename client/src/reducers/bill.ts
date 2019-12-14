import { FIND_ALL_BILLS } from "../actions/bill";

export const billReducer = (state: any, action: any) => {
  switch (action.type) {
    case FIND_ALL_BILLS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FIND_ALL_BILLS.SUCCESS:
      return {
        ...state,
        bills: action.bills,
        numFound: action.numFound,
        isLoading: false
      };
    case FIND_ALL_BILLS.FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
