import React, { useState, useContext } from 'react';
import Layout from '../components/Layouts/Layout';
import routes from '../routes';
import { Typography, Divider, Icon, Button } from '@material-ui/core';
import Quote from '../models/Quote';
import QuoteForm from '../components/Quotes/QuoteForm';
import { withRouter } from 'react-router-dom';
import QuoteContext from '../contexts/QuoteContext';
import Splashscreen from './Splashscreen';
import QuoteFormProvider from '../providers/QuoteFormProvider';

const QuoteFormPage = ({ match }) => {
  const [quote, setQuote] = useState(new Quote());
  const quoteContext = useContext(QuoteContext);

  if (match.params.id && !quote.id) {
    quoteContext.findById(parseInt(match.params.id, 10)).then(quoteFinded => {
      setQuote(quoteFinded);
    });
    return (
      <Layout title={routes.QUOTES_FORM.title}>
        <Splashscreen text="Récupération du devis" />
      </Layout>
    );
  }

  return (
    <Layout title={routes.QUOTES_FORM.title}>
      <QuoteFormProvider quote={quote}>
        <Typography variant="h5">{quote.id ? 'Modifier' : 'Créer'} un devis</Typography>
        <Divider style={{ margin: 10 }} />
        <QuoteForm quote={quote} />
      </QuoteFormProvider>
    </Layout>
  );
};

QuoteFormPage.propTypes = {};

export default withRouter(QuoteFormPage);
