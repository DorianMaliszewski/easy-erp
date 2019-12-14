import React, { useReducer } from "react";
import BillContext from "../contexts/BillContext";
import { FIND_ALL_BILLS } from "../actions/bill";
import { billReducer } from "../reducers/bill";

let id = 0;
function createBillData(status: string, price: number, creator: string, client: number, createdAt: Date, updatedAt: Date) {
  id += 1;
  return { id, status, price, creator, client, createdAt, updatedAt };
}

const billsRows = [
  createBillData("WAITING_CUSTOMER", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("ACCEPTED", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("CANCELED", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("DRAFT", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("NEED_CONFIRMATION", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("WAITING_CUSTOMER", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("ACCEPTED", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("CANCELED", 0.0, "admin", 1, new Date(), new Date())
];

const initialState = {
  isLoading: false,
  numFound: 0,
  bills: null
};

const BillProvider: React.FC<any> = props => {
  const [billState, dispatch] = useReducer(billReducer, initialState);

  const findAll = () => {
    console.log("Starting promise");
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("Promise finished");
        dispatch({ type: FIND_ALL_BILLS.SUCCESS, bills: billsRows, numFound: billsRows.length });
        resolve(billsRows);
      }, 1000);
    });
  };

  const findById = (id: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(billsRows.find(q => q.id === id));
      }, 1000);
    });
  };

  return <BillContext.Provider value={{ state: billState, findAll, findById }}>{props.children}</BillContext.Provider>;
};

export default BillProvider;
