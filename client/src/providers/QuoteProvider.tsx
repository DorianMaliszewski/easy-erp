import React, { useReducer } from "react";
import QuoteContext from "../contexts/QuoteContext";
import { quoteReducer } from "../reducers/quote";
import { FIND_ALL_QUOTES } from "../actions/quote";
import { QuoteApi } from "../api/quote";

const initialState = {
  isLoading: false,
  quotes: null,
  numFound: 0
};

const QuoteProvider: React.FC<any> = props => {
  const [quoteState, dispatch] = useReducer(quoteReducer, initialState);

  const findAll = () => {
    console.log("Statring promise");
    return QuoteApi.getInstance()
      .findAll()
      .subscribe(dto => {
        dispatch({ type: FIND_ALL_QUOTES.SUCCESS, quotes: dto.items, numFound: dto.numFound });
      });
  };

  const findById = (id: number) => {
    return QuoteApi.getInstance().findOneById(id);
  };

  return <QuoteContext.Provider value={{ state: quoteState, findAll, findById }}>{props.children}</QuoteContext.Provider>;
};

QuoteProvider.propTypes = {};

export default QuoteProvider;
