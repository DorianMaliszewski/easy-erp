import React, { useState, useEffect } from "react";
import QuoteFormContext from "../contexts/QuoteFormContext";
import QuoteLine from "../models/QuoteLine";
import { QuoteApi } from "../api/quote";
import { withRouter } from "react-router-dom";
import routes from "../routes";

const QuoteFormProvider = props => {
  const [quote, setQuote] = useState(props.quote);
  const [tva, setTva] = useState(0);

  const addLine = () => {
    const newQuote = { ...quote };
    newQuote.lines.push({ ...new QuoteLine() });
    setQuote(newQuote);
  };

  const delLine = index => {
    const newQuote = { ...quote };
    newQuote.lines.splice(index, 1);
    setQuote(newQuote);
  };

  const changeTva = value => {
    setTva(value);
  };

  const setClient = value => {
    const newQuote = { ...quote };
    newQuote.client = value;
    setQuote(newQuote);
  };

  const calculTTCAndTotal = line => {
    console.log(
      "Ma tva",
      tva,
      "Prix UHT",
      line.puht,
      "Prix ttc",
      line.puht * (1 + tva / 100)
    );
    line.puttc = tva && tva > 0 ? line.puht * (1 + tva / 100) : line.puht;
    line.puttc = Math.round(line.puttc * 100) / 100;
    line.total = line.puttc * line.quantity;
    line.total = Math.round(line.total * 100) / 100;
    return line;
  };

  const handleLineChange = (index, field, value) => {
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
    QuoteApi.create({ ...quote, tva });
    props.history.push(routes.MY_QUOTES.path);
  };

  useEffect(() => {
    const newQuote = { ...quote };
    newQuote.lines = [...newQuote.lines.map(line => calculTTCAndTotal(line))];
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

QuoteFormProvider.propTypes = {};

export default withRouter(QuoteFormProvider);
