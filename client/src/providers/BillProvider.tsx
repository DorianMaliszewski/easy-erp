import React, { useReducer } from "react";
import BillContext from "../contexts/BillContext";
import { FIND_ALL_BILLS, BILL_UPDATE, BILL_ADD } from "../actions/bill";
import { billReducer } from "../reducers/bill";
import { BillApi } from "../api/bill";
import { QuoteData } from "../models/QuoteData";
import useSnackbar from "../hooks/useSnackbar";
import { BillData } from "../models/BillData";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const initialState = {
  isLoading: false,
  numFound: 0,
  bills: null
};

const BillProvider: React.FC<any> = props => {
  const [billState, dispatch] = useReducer(billReducer, initialState);
  const snackbar = useSnackbar();

  const findAll = () => {
    dispatch({ type: FIND_ALL_BILLS.REQUEST });
    return BillApi.getInstance()
      .findAll()
      .subscribe(dto => {
        dispatch({ type: FIND_ALL_BILLS.SUCCESS, bills: dto.items, numFound: dto.numFound });
      });
  };

  const findById = (id: number) => {
    return BillApi.getInstance().findOneById(id);
  };

  const createFromQuote = (quote: QuoteData) => {
    return BillApi.getInstance().createFromQuote(quote);
  };

  const accept = (id: number) => {
    return BillApi.getInstance().accept(id);
  };

  const send = (id: number) => {
    return BillApi.getInstance().send(id);
  };

  const cancel = (id: number) => {
    return BillApi.getInstance().cancel(id);
  };

  const save = (bill: BillData, isDraft: boolean = true) => {
    return BillApi.getInstance()
      .save(bill)
      .pipe(
        map((result: QuoteData) => {
          snackbar.show(isDraft ? "Brouillon enregistrée" : "Modification enregistrée", "success");
          if (bill.id) {
            dispatch({ type: BILL_UPDATE.SUCCESS, bill: result });
          } else {
            dispatch({ type: BILL_ADD.SUCCESS, bill: result });
          }
          return result;
        }),
        catchError(handleError(bill))
      );
  };

  const handleError = (bill: BillData) => {
    return (error: any) => {
      console.log("An error occured", error);
      snackbar.show("Une erreur est survenue, veuillez réessayer", "error");
      return of(bill);
    };
  };

  return <BillContext.Provider value={{ state: billState, findAll, findById, createFromQuote }}>{props.children}</BillContext.Provider>;
};

const useBillContext = () => {
  const billContext = React.useContext(BillContext);
  return billContext;
};

export { BillProvider, useBillContext };
