import { FIND_ALL_QUOTES, QUOTE_UPDATE, QUOTE_ADD } from "../actions/quote";
import { QuoteData } from "../models/QuoteData";

type QuoteState = {
  isLoading: boolean;
  quotes: QuoteData[];
  numFound: number;
};

export const quoteReducer = (state: QuoteState, action: any) => {
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
        numFound: action.numFound,
        isLoading: false
      };
    case FIND_ALL_QUOTES.FAIL:
      return {
        ...state,
        isLoading: false
      };
    case QUOTE_UPDATE.SUCCESS: {
      const index = state.quotes.findIndex(q => q.id === action.quote.id);
      if (index > -1) {
        state.quotes.splice(index, 1, action.quote);
      }
      return { ...state };
    }
    case QUOTE_ADD.SUCCESS: {
      state.quotes.push(action.quote);
      return { ...state };
    }
    default:
      return state;
  }
};
