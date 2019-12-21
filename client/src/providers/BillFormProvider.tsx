import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BillData, BillLineData } from "../models/BillData";
import useSnackbar from "../hooks/useSnackbar";
import { BillApi } from "../api/BillApi";
import routes from "../routes";

const BillFormContext = React.createContext<any>({});

const BillFormProvider: React.FC<any> = props => {
  const history = useHistory();
  const [bill, setBill] = useState<BillData>(props.bill);
  const snackbar = useSnackbar();

  const addLine = () => {
    const newBill = { ...bill };
    newBill.lines.push({ ...new BillLineData(), lineNumber: newBill.lines.length + 1 });
    setBill(newBill);
  };

  const delLine = (index: number) => {
    const newBill = { ...bill };
    newBill.lines.splice(index, 1);
    setBill(newBill);
  };

  const changeTva = (value: number) => {
    setBill({ ...bill, tva: (value ? value : 0) / 100 });
  };

  const setClient = (value: number) => {
    const newBill = { ...bill };
    newBill.clientId = value;
    setBill(newBill);
  };

  const handleLineChange = (index: number, field: string, value: any) => {
    const newBill = { ...bill };
    const newLine = newBill.lines[index] as any;
    newLine[field as keyof BillLineData] = value;
    setBill(newBill);
  };

  const submit = () => {
    BillApi.getInstance()
      .save(bill, false)
      .subscribe((result: BillData) => {
        history.push(routes.BILLS_FORM.path + "/" + result.id);
        snackbar.show("Modification enregistrée", "success");
      }, handleError);
  };

  const saveDraft = () => {
    BillApi.getInstance()
      .save(bill)
      .subscribe((result: BillData) => {
        history.push(routes.BILLS_FORM.path + "/" + result.id);
        snackbar.show("Brouillon enregistrée", "success");
      }, handleError);
  };

  const handleError = () => {
    return (error: any) => {
      console.log("An error occured", error);
      snackbar.show("Une erreur est survenue, veuillez réessayer", "error");
    };
  };

  return (
    <BillFormContext.Provider
      value={{
        addLine,
        delLine,
        saveDraft,
        submit,
        handleLineChange,
        changeTva,
        setBill,
        bill,
        setClient
      }}
    >
      {props.children}
    </BillFormContext.Provider>
  );
};

const useBillFormContext = () => {
  const billFormContext = useContext(BillFormContext);

  return billFormContext;
};

export { BillFormProvider, useBillFormContext };
