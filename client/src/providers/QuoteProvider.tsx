import React, { useReducer } from "react";
import QuoteContext from "../contexts/QuoteContext";
import { quoteReducer } from "../reducers/quote";
import { FIND_ALL_QUOTES, QUOTE_UPDATE, QUOTE_ADD } from "../actions/quote";
import { QuoteApi } from "../api/quote";
import { QuoteData } from "../models/QuoteData";
import useSnackbar from "../hooks/useSnackbar";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const initialState = {
  isLoading: false,
  quotes: [],
  numFound: 0
};

const QuoteProvider: React.FC<any> = props => {
  const [quoteState, dispatch] = useReducer(quoteReducer, initialState);
  const snackbar = useSnackbar();

  const findAll = () => {
    console.log("Statring promise");
    dispatch({ type: FIND_ALL_QUOTES.REQUEST });
    return QuoteApi.getInstance()
      .findAll()
      .subscribe(dto => {
        dispatch({ type: FIND_ALL_QUOTES.SUCCESS, quotes: dto.items, numFound: dto.numFound });
      });
  };

  const findById = (id: number) => {
    return QuoteApi.getInstance().findOneById(id);
  };

  const accept = (id: number) => {
    return QuoteApi.getInstance().accept(id);
  };

  const send = (id: number) => {
    return QuoteApi.getInstance().send(id);
  };

  const cancel = (id: number) => {
    return QuoteApi.getInstance().cancel(id);
  };

  const save = (quote: QuoteData, isDraft: boolean = true) => {
    return QuoteApi.getInstance()
      .save(quote)
      .pipe(
        map((result: QuoteData) => {
          snackbar.show(isDraft ? "Brouillon enregistrée" : "Modification enregistrée", "success");
          if (quote.id) {
            dispatch({ type: QUOTE_UPDATE.SUCCESS, quote: result });
          } else {
            dispatch({ type: QUOTE_ADD.SUCCESS, quote: result });
          }
          return result;
        }),
        catchError(handleError(quote))
      );
  };

  const handleError = (quote: QuoteData) => {
    return (error: any) => {
      console.log("An error occured", error);
      snackbar.show("Une erreur est survenue, veuillez réessayer", "error");
      return of(quote);
    };
  };

  return <QuoteContext.Provider value={{ state: quoteState, findAll, findById, accept, send, cancel, save }}>{props.children}</QuoteContext.Provider>;
};

QuoteProvider.propTypes = {};

const useQuoteContext = () => {
  const quoteContext = React.useContext(QuoteContext);

  return quoteContext;
};

export { QuoteProvider, useQuoteContext };
