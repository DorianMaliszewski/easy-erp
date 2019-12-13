import { FIND_ALL_QUOTES } from "../actions/quote";

export const quoteReducer = (state, action) => {
  switch (action.type) {
    case FIND_ALL_QUOTES.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FIND_ALL_QUOTES.SUCCESS:
      return {
        ...state,
        quotes: action.quotes,
        numFound: action.numFound
      };
    case FIND_ALL_QUOTES.FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};
