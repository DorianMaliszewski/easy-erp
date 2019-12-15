import React, { useState, useContext } from "react";
import { Typography, Divider } from "@material-ui/core";
import { QuoteData } from "../models/QuoteData";
import QuoteForm from "../components/Quotes/QuoteForm";
import { useParams } from "react-router-dom";
import QuoteContext from "../contexts/QuoteContext";
import Splashscreen from "./Splashscreen";
import QuoteFormProvider from "../providers/QuoteFormProvider";

const QuoteFormPage: React.FC<any> = props => {
  const { id } = useParams();
  const [quote, setQuote] = useState(new QuoteData());
  const quoteContext = useContext(QuoteContext);

  if (id && !quote.id) {
    quoteContext.findById(parseInt(id, 10)).subscribe((quoteFinded: QuoteData) => {
      if (!quoteFinded.lines) {
        quoteFinded.lines = [];
      }
      setQuote(quoteFinded);
    });
    return <Splashscreen text="Récupération du devis" />;
  }

  return (
    <QuoteFormProvider quote={quote}>
      <Typography variant="h5">{quote.id ? "Modifier" : "Créer"} un devis</Typography>
      <Divider style={{ margin: 10 }} />
      <QuoteForm quote={quote} />
    </QuoteFormProvider>
  );
};

QuoteFormPage.propTypes = {};

export default QuoteFormPage;
