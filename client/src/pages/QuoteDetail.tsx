import React, { useContext, useState, useEffect } from "react";
import QuoteContext from "../contexts/QuoteContext";
import { useHistory, useParams } from "react-router-dom";
import { Paper, Grid, Typography, Divider, Button, Theme } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import QuoteDetailDialogTopActions from "../components/Quotes/QuoteDetailDialogTopActions";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { getQuoteStatus } from "../utils/utils";
import moment from "moment";
import { QuoteData } from "../models/QuoteData";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  }
}));

const QuoteDetail: React.FC<any> = () => {
  const quoteContext = useContext(QuoteContext);
  const [quote, setQuote] = useState<QuoteData>();
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      quoteContext.findById(parseInt(id, 10)).subscribe(
        (q: QuoteData) => {
          setQuote(q);
        },
        (err: any) => {
          history.goBack();
        }
      );
    }
  }, [id, quoteContext, history]);

  if (!quote) {
    return <Splashscreen text="Récupération du devis" />;
  }

  const quoteStatus = getQuoteStatus(quote.status as string);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", paddingBottom: 20 }}>
        <div style={{ flexGrow: 1 }}>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </div>
        <QuoteDetailDialogTopActions />
      </div>
      <Paper className={classnames(classes.root)}>
        <Typography variant="h5" gutterBottom>
          Devis n°{quote.id}
        </Typography>
        <Divider />
        <Grid container style={{ paddingTop: 20 }} spacing={3}>
          <Grid item xs={6} sm={3}>
            Client
          </Grid>
          <Grid item xs={6} sm={9}>
            {quote.clientId}
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
    </>
  );
};

QuoteDetail.propTypes = {};

export default QuoteDetail;
