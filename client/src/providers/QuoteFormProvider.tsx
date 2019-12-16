import React, { useState } from "react";
import QuoteFormContext from "../contexts/QuoteFormContext";
import { QuoteLineData } from "../models/QuoteLineData";
import { QuoteApi } from "../api/quote";
import { QuoteData } from "../models/QuoteData";
import useSnackbar from "../hooks/useSnackbar";

const QuoteFormProvider: React.FC<any> = props => {
  const [quote, setQuote] = useState<QuoteData>(props.quote);
  const snackbar = useSnackbar();

  const addLine = () => {
    const newQuote = { ...quote };
    newQuote.lines.push({ ...new QuoteLineData(), lineNumber: newQuote.lines.length + 1 });
    setQuote(newQuote);
  };

  const delLine = (index: number) => {
    const newQuote = { ...quote };
    newQuote.lines.splice(index, 1);
    setQuote(newQuote);
  };

  const changeTva = (value: number) => {
    setQuote({ ...quote, tva: (value ? value : 0) / 100 });
  };

  const setClient = (value: number) => {
    const newQuote = { ...quote };
    newQuote.clientId = value;
    setQuote(newQuote);
  };

  const handleLineChange = (index: number, field: string, value: any) => {
    const newQuote = { ...quote };
    const newLine = newQuote.lines[index] as any;
    newLine[field as keyof QuoteLineData] = value;
    setQuote(newQuote);
  };

  const submit = () => {
    QuoteApi.getInstance()
      .save(quote, false)
      .subscribe((result: QuoteData) => {
        snackbar.show("Modification enregistrée", "success");
      }, handleError);
  };

  const saveDraft = () => {
    QuoteApi.getInstance()
      .save(quote)
      .subscribe((result: QuoteData) => {
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
    <QuoteFormContext.Provider
      value={{
        quote,
        addLine,
        delLine,
        setQuote,
        handleLineChange,
        changeTva,
        setClient,
        submit,
        saveDraft
      }}
    >
      {props.children}
    </QuoteFormContext.Provider>
  );
};

export default QuoteFormProvider;
