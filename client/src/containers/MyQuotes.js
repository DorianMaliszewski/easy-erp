import React, { useContext } from 'react';
import Layout from '../components/Layouts/Layout';
import routes from '../routes';
import QuotesTable from '../components/Quotes/QuotesTable';
import QuoteContext from '../contexts/QuoteContext';
import Splashscreen from './Splashscreen';
import { withStyles, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
const MyQuotes = props => {
  const quoteContext = useContext(QuoteContext);

  if (!quoteContext.state.quotes) {
    quoteContext.findAll();
    return (
      <Layout title={routes.MY_QUOTES.title}>
        <Splashscreen text="Récupération des devis" />
      </Layout>
    );
  }

  return (
    <Layout title={routes.MY_QUOTES.title}>
      <Button color="primary" variant="contained" onClick={e => props.history.push(routes.QUOTES_FORM.path)}>
        Créer un devis
      </Button>
      <QuotesTable quotes={quoteContext.state.quotes} />
    </Layout>
  );
};

const styles = theme => ({});

export default withStyles(styles)(withRouter(MyQuotes));
