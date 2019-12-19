import React, { useEffect } from "react";
import routes from "../routes";
import QuotesTable from "../components/Quotes/QuotesTable";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useQuoteContext } from "../providers/QuoteProvider";

const MyQuotes: React.FC<any> = props => {
  const quoteContext = useQuoteContext();
  const history = useHistory();

  useEffect(() => {
    if (!quoteContext.state.isLoading && quoteContext.state.quotes.length === 0) {
      quoteContext.findAll();
    }
  }, [quoteContext]);

  return (
    <>
      <Button color="primary" variant="contained" onClick={(e: any) => history.push(routes.QUOTES_FORM.path)}>
        Créer un devis
      </Button>
      <QuotesTable quotes={quoteContext.state.quotes} isLoading={quoteContext.state.isLoading} />
    </>
  );
};

export default MyQuotes;
