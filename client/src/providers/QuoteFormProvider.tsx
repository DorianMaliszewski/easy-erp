import React, { useState } from "react";
import QuoteFormContext from "../contexts/QuoteFormContext";
import { QuoteLineData } from "../models/QuoteLineData";
import { QuoteData } from "../models/QuoteData";
import { useQuoteContext } from "./QuoteProvider";
import { useHistory } from "react-router-dom";
import routes from "../routes";

const QuoteFormProvider: React.FC<any> = props => {
  const [quote, setQuote] = useState<QuoteData>(props.quote);
  const quoteContext = useQuoteContext();
  const history = useHistory();

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
    quoteContext.save(quote, false).subscribe((newQuote: QuoteData) => {
      if (newQuote) {
        setQuote(newQuote);
        history.push(routes.QUOTES_DETAIL.path.replace(":id", newQuote.id?.toString() || ""));
      }
    });
  };

  const saveDraft = () => {
    quoteContext.save(quote, true).subscribe((newQuote: QuoteData) => {
      if (newQuote) {
        setQuote(newQuote);
        history.push(routes.QUOTES_DETAIL.path.replace(":id", newQuote.id?.toString() || ""));
      }
    });
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
