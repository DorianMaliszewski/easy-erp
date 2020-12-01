import React, { useReducer, useEffect } from "react";
import QuoteContext from "../contexts/QuoteContext";
import { quoteReducer } from "../reducers/quote";
import { FIND_ALL_QUOTES, QUOTE_UPDATE, QUOTE_ADD } from "../actions/quote";
import { QuoteApi } from "../api/QuoteApi";
import { QuoteData } from "../models/QuoteData";
import useSnackbar from "../hooks/useSnackbar";
import { map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { DTO } from "../models/DTO";

const initialState = {
  isLoading: false,
  quotes: [],
  numFound: 0
};

const QuoteProvider: React.FC<any> = props => {
  const [quoteState, dispatch] = useReducer(quoteReducer, initialState);
  const snackbar = useSnackbar();

  const findAll = () => {
    dispatch({ type: FIND_ALL_QUOTES.REQUEST });
    return QuoteApi.getInstance()
      .findAll()
      .pipe(
        tap((dto: DTO<QuoteData>) => {
          dispatch({ type: FIND_ALL_QUOTES.SUCCESS, quotes: dto.items, numFound: dto.numFound });
        })
      );
  };

  const findById = (id: number) => {
    let quoteFinded = null;
    if (quoteState.quotes) {
      quoteFinded = quoteState.quotes.find((customer: QuoteData) => customer.id === id);
    }
    return quoteFinded ? of(quoteFinded) : findAll().pipe(map((dto: DTO<QuoteData>) => dto.items.find(c => c.id === id)));
  };

  const accept = (id: number) => {
    return QuoteApi.getInstance()
      .accept(id)
      .pipe(tap((quote: QuoteData) => updateState(quote, false)));
  };

  const send = (id: number) => {
    return QuoteApi.getInstance()
      .send(id)
      .pipe(tap((quote: QuoteData) => updateState(quote, false)));
  };

  const cancel = (id: number) => {
    return QuoteApi.getInstance()
      .cancel(id)
      .pipe(tap((quote: QuoteData) => updateState(quote, false)));
  };

  const save = (quote: QuoteData, isDraft: boolean = true) => {
    return QuoteApi.getInstance()
      .save(quote)
      .pipe(
        map((result: QuoteData) => {
          snackbar.show(isDraft ? "Brouillon enregistrée" : "Modification enregistrée", "success");
          return updateState(result, quote.id ? false : true);
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

  const updateState = (quote: QuoteData, isCreate: boolean) => {
    if (isCreate) {
      dispatch({ type: QUOTE_ADD.SUCCESS, quote });
    } else {
      dispatch({ type: QUOTE_UPDATE.SUCCESS, quote });
    }
    return quote;
  };

  return <QuoteContext.Provider value={{ state: quoteState, findAll, findById, accept, send, cancel, save }}>{props.children}</QuoteContext.Provider>;
};

QuoteProvider.propTypes = {};

const useQuoteContext = () => {
  const quoteContext = React.useContext(QuoteContext);
  useEffect(() => {
    if (!quoteContext.state.isLoading && quoteContext.state.quotes.length === 0) {
      quoteContext.findAll().subscribe();
    }
  }, [quoteContext]);

  return quoteContext;
};

export { QuoteProvider, useQuoteContext };
