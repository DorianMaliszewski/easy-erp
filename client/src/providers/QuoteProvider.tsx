import React, { useReducer } from "react";
import QuoteContext from "../contexts/QuoteContext";
import { quoteReducer } from "../reducers/quote";
import { FIND_ALL_QUOTES } from "../actions/quote";
import { QuoteApi } from "../api/quote";

let id = 0;
function createQuoteData(status: string, price: number, creator: string, client: string, createdAt: Date, updatedAt: Date) {
  id += 1;
  return { id, status, price, creator, client, createdAt, updatedAt };
}

const quotesRows = [
  createQuoteData("DRAFT", 0.0, "admin", "Client 4", new Date(), new Date()),
  createQuoteData("DRAFT", 0.0, "admin", "Client 3", new Date("2019-04-05T08:24:00"), new Date()),
  createQuoteData("NEED_CONFIRMATION", 0.0, "admin", "Client 3", new Date("2019-04-05T08:24:00"), new Date()),
  createQuoteData("WAITING_CUSTOMER", 0.0, "admin", "Client 1", new Date("2019-04-05T08:24:00"), new Date()),
  createQuoteData("WAITING_CUSTOMER", 0.0, "admin", "Client 1", new Date("2019-04-03T08:24:00"), new Date()),
  createQuoteData("ACCEPTED", 0.0, "admin", "Client 2", new Date("2019-04-01T08:24:00"), new Date()),
  createQuoteData("CANCELED", 0.0, "admin", "Client 6", new Date("2019-04-03T08:24:00"), new Date())
];

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