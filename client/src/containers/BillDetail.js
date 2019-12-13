import React, { useContext, useState } from "react";
import Layout from "../components/Layouts/Layout";
import routes from "../routes";
import BillContext from "../contexts/BillContext";
import { withRouter } from "react-router-dom";
import { Paper, Grid, Typography, Divider, Button, withStyles, Link } from "@material-ui/core";
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

const BillDetail = ({ location, match, history }) => {
  const billContext = useContext(BillContext);
  const [bill, setBill] = useState(null);
  const classes = useStyle();

  if (!bill) {
    billContext.findById(parseInt(match.params.id, 10)).then(b => {
      if (b) {
        setBill(b);
      } else {
        history.goBack();
      }
    });
    return (
      <Layout title={routes.BILLS_DETAIL.title}>
        <Splashscreen text='Récupération de la facture' />
      </Layout>
    );
  }

  const billStatus = getQuoteStatus(bill.status);

  return (
    <Layout title={routes.BILLS_DETAIL.title} showGoBack>
      <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", paddingBottom: 20 }}>
        <div style={{ flexGrow: 1 }}>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </div>
        <QuoteDetailDialogTopActions />
      </div>
      <Paper className={classnames(classes.root)}>
        <Typography variant='h5' gutterBottom>
          Facture n°{bill.id}
        </Typography>
        <Divider />
        <Grid container style={{ paddingTop: 20 }} spacing={24}>
          <Grid item xs={6} sm={3}>
            Client
          </Grid>
          <Grid item xs={6} sm={9}>
            <Link href={routes.CUSTOMERS_DETAIL.path.replace(":id", 1)}>{bill.client}</Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            Etat
          </Grid>
          <Grid container item xs={6} sm={9} direction='row' alignContent='center' alignItems='center'>
            {billStatus.icon}
            <div style={{ paddingLeft: 10 }}>{billStatus.text}</div>
          </Grid>
          <Grid item xs={6} sm={3}>
            Créé par
          </Grid>
          <Grid item xs={6} sm={9}>
            {bill.creator}
          </Grid>
          <Grid item xs={6} sm={3}>
            Créé
          </Grid>
          <Grid item xs={6} sm={9}>
            {moment(bill.createdAt).fromNow()}
          </Grid>
          <Grid item xs={6} sm={3}>
            Mis à jour
          </Grid>
          <Grid item xs={6} sm={9}>
            {moment(bill.updatedAt).fromNow()}
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

BillDetail.propTypes = {};

const styles = theme => ({});

export default withStyles(styles)(withRouter(BillDetail));
