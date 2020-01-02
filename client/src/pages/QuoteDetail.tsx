import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Paper, Grid, Typography, Divider, Button, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import moment from "moment";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import Splashscreen from "./Splashscreen";
import QuoteContext from "../contexts/QuoteContext";

import { getQuoteStatus } from "../utils/utils";
import { QuoteData } from "../models/QuoteData";
import { CustomerData } from "../models/CustomerData";
import QuoteActionButtons from "../components/Quotes/QuoteActionButtons";
import QuoteLineDetailTable from "../components/Quotes/QuoteLineDetailTable";
import { useCustomersContext } from "../providers/CustomerProvider";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const QuoteDetail: React.FC<any> = () => {
  const quoteContext = useContext(QuoteContext);
  const [quote, setQuote] = useState<QuoteData>();

  const [customer, setCustomer] = useState<CustomerData>();
  const customerContext = useCustomersContext();

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      quoteContext.findById(parseInt(id, 10)).subscribe(
        (q: QuoteData) => {
          setQuote(q);
          if (q.clientId) {
            customerContext.findById(q.clientId).subscribe((c: CustomerData) => {
              setCustomer(c);
            });
          }
        },
        (err: any) => {
          console.error(err);
          history.goBack();
        }
      );
    }
  }, [id, quoteContext, history, customerContext]);

  if (!quote) {
    return <Splashscreen text="Récupération du devis" />;
  }

  const quoteStatus = getQuoteStatus(quote.status as string);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item xs container justify="space-between">
        <Grid item>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </Grid>
        <Grid item>
          <QuoteActionButtons quote={quote} />
        </Grid>
      </Grid>
      <Grid item>
        <Paper className={classnames(classes.root)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Devis n°{quote.id}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={6} sm={3}>
              Client
            </Grid>
            <Grid item xs={6} sm={9}>
              {customer ? customer.name : <Skeleton />}
            </Grid>
            <Grid item xs={6} sm={3}>
              Etat
            </Grid>
            <Grid container item xs={6} sm={9} direction="row" alignContent="center" alignItems="center">
              {quoteStatus?.icon}
              <div style={{ paddingLeft: 10 }}>{quoteStatus?.text}</div>
            </Grid>
            <Grid item xs={6} sm={3}>
              Créé par
            </Grid>
            <Grid item xs={6} sm={9}>
              {quote.createdBy}
            </Grid>
            <Grid item xs={6} sm={3}>
              Créé
            </Grid>
            <Grid item xs={6} sm={9}>
              {moment(quote.createdAt).fromNow()}
            </Grid>
            <Grid item xs={6} sm={3}>
              Mis à jour
            </Grid>
            <Grid item xs={6} sm={9}>
              {quote.updatedAt ? moment(quote.updatedAt).fromNow() : "Jamais"}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={classnames(classes.root)}>
          <QuoteLineDetailTable quote={quote} />
        </Paper>
      </Grid>
    </Grid>
  );
};

QuoteDetail.propTypes = {};

export default QuoteDetail;
