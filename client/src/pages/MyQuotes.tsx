import React, { useContext } from "react";
import routes from "../routes";
import QuotesTable from "../components/Quotes/QuotesTable";
import QuoteContext from "../contexts/QuoteContext";
import Splashscreen from "./Splashscreen";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const MyQuotes: React.FC<any> = props => {
  const quoteContext = useContext(QuoteContext);
  const history = useHistory();

  if (!quoteContext.state.quotes) {
    quoteContext.findAll();
    return <Splashscreen text="Récupération des devis" />;
  }

  return (
    <>
      <Button color="primary" variant="contained" onClick={(e: any) => history.push(routes.QUOTES_FORM.path)}>
        Créer un devis
      </Button>
      <QuotesTable quotes={quoteContext.state.quotes} />
    </>
  );
};

export default MyQuotes;
