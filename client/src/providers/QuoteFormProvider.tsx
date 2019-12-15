import React, { useState, useEffect } from "react";
import QuoteFormContext from "../contexts/QuoteFormContext";
import { QuoteLineData } from "../models/QuoteLineData";
import { QuoteApi } from "../api/quote";
import { useHistory } from "react-router-dom";
import routes from "../routes";

const QuoteFormProvider: React.FC<any> = props => {
  const [quote, setQuote] = useState(props.quote);
  const history = useHistory();
  const [tva, setTva] = useState(0);

  const addLine = () => {
    const newQuote = { ...quote };
    newQuote.lines.push({ ...new QuoteLineData() });
    setQuote(newQuote);
  };

  const delLine = (index: number) => {
    const newQuote = { ...quote };
    newQuote.lines.splice(index, 1);
    setQuote(newQuote);
  };

  const changeTva = (value: number) => {
    setTva(value);
  };

  const setClient = (value: number) => {
    const newQuote = { ...quote };
    newQuote.client = value;
    setQuote(newQuote);
  };

  const calculTTCAndTotal = (line: QuoteLineData) => {
    console.log("Ma tva", tva, "Prix UHT", line.puht, "Prix ttc", line.puht * (1 + tva / 100));
    line.puttc = tva && tva > 0 ? line.puht * (1 + tva / 100) : line.puht;
    line.puttc = Math.round(line.puttc * 100) / 100;
    line.total = line.puttc * line.quantity;
    line.total = Math.round(line.total * 100) / 100;
    return line;
  };

  const handleLineChange = (index: number, field: string, value: any) => {
    const newQuote = { ...quote };
    const newLine = newQuote.lines[index];
    newLine[field] = value;
    switch (field) {
      case "puht":
      case "quantity":
        calculTTCAndTotal(newLine);
        break;
      default:
        break;
    }
    setQuote(newQuote);
  };

  const submit = () => {
    QuoteApi.getInstance().create({ ...quote, tva });
    history.push(routes.MY_QUOTES.path);
  };

  useEffect(() => {
    const newQuote = { ...quote };
    newQuote.lines = [...newQuote.lines.map((line: QuoteLineData) => calculTTCAndTotal(line))];
    setQuote(newQuote);
  }, [tva]);

  return (
    <QuoteFormContext.Provider
      value={{
        quote,
        addLine,
        delLine,
        setQuote,
        handleLineChange,
        tva,
        changeTva,
        setClient,
        submit
      }}
    >
      {props.children}
    </QuoteFormContext.Provider>
  );
};

export default QuoteFormProvider;
