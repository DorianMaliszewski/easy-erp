import React, { useContext, useState } from "react";
import Layout from "../components/Layouts/Layout";
import routes from "../routes";
import QuoteContext from "../contexts/QuoteContext";
import { withRouter } from "react-router-dom";
import { Paper, Grid, Typography, Divider, Button, withStyles } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import QuoteDetailDialogTopActions from "../components/Quotes/QuoteDetailDialogTopActions";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { getQuoteStatus } from "../utils/utils";
import moment from "moment";

const useStyle = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3
  }
}));

const QuoteDetail = ({ location, match, history }) => {
  const quoteContext = useContext(QuoteContext);
  const [quote, setQuote] = useState(null);
  const classes = useStyle();

  if (!quote) {
    quoteContext.findById(parseInt(match.params.id, 10)).then(q => {
      if (q) {
        setQuote(q);
      } else {
        history.goBack();
      }
    });
    return (
      <Layout title={routes.QUOTES_DETAIL.title}>
        <Splashscreen text="Récupération du devis" />
      </Layout>
    );
  }

  const quoteStatus = getQuoteStatus(quote.status);

  return (
    <Layout title={routes.QUOTES_DETAIL.title} showGoBack>
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
        <Grid container style={{ paddingTop: 20 }} spacing={24}>
          <Grid item xs={6} sm={3}>
            Client
          </Grid>
          <Grid item xs={6} sm={9}>
            {quote.client}
          </Grid>
          <Grid item xs={6} sm={3}>
            Etat
          </Grid>
          <Grid container item xs={6} sm={9} direction="row" alignContent="center" alignItems="center">
            {quoteStatus.icon}
            <div style={{ paddingLeft: 10 }}>{quoteStatus.text}</div>
          </Grid>
          <Grid item xs={6} sm={3}>
            Créé par
          </Grid>
          <Grid item xs={6} sm={9}>
            {quote.creator}
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
            {moment(quote.updatedAt).fromNow()}
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

QuoteDetail.propTypes = {};

const styles = theme => ({});

export default withStyles(styles)(withRouter(QuoteDetail));
