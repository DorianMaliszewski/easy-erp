import React, { useReducer, useEffect } from "react";
import BillContext from "../contexts/BillContext";
import { FIND_ALL_BILLS, BILL_UPDATE, BILL_ADD } from "../actions/bill";
import { billReducer } from "../reducers/bill";
import { BillApi } from "../api/BillApi";
import { QuoteData } from "../models/QuoteData";
import useSnackbar from "../hooks/useSnackbar";
import { BillData } from "../models/BillData";
import { map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

const initialState = {
  isLoading: false,
  numFound: 0,
  bills: []
};

const BillProvider: React.FC<any> = props => {
  const [billState, dispatch] = useReducer(billReducer, initialState);
  const snackbar = useSnackbar();

  const findAll = () => {
    dispatch({ type: FIND_ALL_BILLS.REQUEST });
    return BillApi.getInstance()
      .findAll()
      .pipe(
        tap(dto => {
          dispatch({ type: FIND_ALL_BILLS.SUCCESS, bills: dto.items, numFound: dto.numFound });
        })
      );
  };

  const findById = (id: number) => {
    return BillApi.getInstance().findOneById(id);
  };

  const createFromQuote = (quote: QuoteData) => {
    return BillApi.getInstance()
      .createFromQuote(quote)
      .pipe(tap(result => updateState(result, true)));
  };

  const accept = (id: number) => {
    return BillApi.getInstance()
      .accept(id)
      .pipe(tap(result => updateState(result, true)));
  };

  const send = (id: number) => {
    return BillApi.getInstance()
      .send(id)
      .pipe(tap(result => updateState(result, true)));
  };

  const cancel = (id: number) => {
    return BillApi.getInstance()
      .cancel(id)
      .pipe(tap(result => updateState(result, true)));
  };

  const payed = (id: number) => {
    return BillApi.getInstance()
      .payed(id)
      .pipe(tap(result => updateState(result, true)));
  };

  const save = (bill: BillData, isDraft: boolean = true) => {
    return BillApi.getInstance()
      .save(bill)
      .pipe(
        map((result: BillData) => {
          snackbar.show(isDraft ? "Brouillon enregistrée" : "Modification enregistrée", "success");
          return updateState(result, bill.id ? true : false);
        }),
        catchError(handleError(bill))
      );
  };

  const updateState = (bill: BillData, isCreate: boolean) => {
    if (!isCreate) {
      dispatch({ type: BILL_UPDATE.SUCCESS, bill: bill });
    } else {
      dispatch({ type: BILL_ADD.SUCCESS, bill: bill });
    }
    return bill;
  };

  const handleError = (bill: BillData) => {
    return (error: any) => {
      console.log("An error occured", error);
      snackbar.show("Une erreur est survenue, veuillez réessayer", "error");
      return of(bill);
    };
  };

  return <BillContext.Provider value={{ state: billState, findAll, findById, createFromQuote, accept, send, cancel, save, payed }}>{props.children}</BillContext.Provider>;
};

const useBillContext = () => {
  const billContext = React.useContext(BillContext);

  useEffect(() => {
    if (!billContext.state.isLoading && billContext.state.bills.length === 0) {
      billContext.findAll().subscribe();
    }
  });
  return billContext;
};

export { BillProvider, useBillContext };
