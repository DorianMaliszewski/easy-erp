import React, { useReducer } from "react";
import BillContext from "../contexts/BillContext";
import { FIND_ALL_BILLS } from "../actions/bill";
import { billReducer } from "../reducers/bill";
import { BillApi } from "../api/bill";

const initialState = {
  isLoading: false,
  numFound: 0,
  bills: null
};

const BillProvider: React.FC<any> = props => {
  const [billState, dispatch] = useReducer(billReducer, initialState);

  const findAll = () => {
    return BillApi.getInstance()
      .findAll()
      .subscribe(dto => {
        dispatch({ type: FIND_ALL_BILLS.SUCCESS, bills: dto.items, numFound: dto.numFound });
      });
  };

  const findById = (id: number) => {
    return BillApi.getInstance().findOneById(id);
  };

  return <BillContext.Provider value={{ state: billState, findAll, findById }}>{props.children}</BillContext.Provider>;
};

export default BillProvider;
