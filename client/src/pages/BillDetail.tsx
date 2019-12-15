import React, { useContext, useState, useEffect } from "react";
import routes from "../routes";
import BillContext from "../contexts/BillContext";
import { useHistory, useParams } from "react-router-dom";
import { Paper, Grid, Typography, Divider, Button, Link, Theme } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import QuoteDetailDialogTopActions from "../components/Quotes/QuoteDetailDialogTopActions";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { getQuoteStatus } from "../utils/utils";
import moment from "moment";
import { BillData } from "../models/BillData";

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  }
}));

const BillDetail: React.FC<any> = props => {
  const history = useHistory();
  const { id } = useParams();
  const billContext = useContext(BillContext);
  const [bill, setBill] = useState<any>();
  const classes = useStyle();

  useEffect(() => {
    if (id) {
      billContext.findById(parseInt(id, 10)).subscribe(
        (b: BillData) => {
          setBill(b);
        },
        (err: any) => {
          console.error(err);
          history.goBack();
        }
      );
    }
  }, [id, billContext, history]);

  if (!bill) {
    return <Splashscreen text="Récupération de la facture" />;
  }

  const billStatus = getQuoteStatus(bill.status);

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
          Facture n°{bill.id}
        </Typography>
        <Divider />
        <Grid container style={{ paddingTop: 20 }} spacing={3}>
          <Grid item xs={6} sm={3}>
            Client
          </Grid>
          <Grid item xs={6} sm={9}>
            <Link href={routes.CUSTOMERS_DETAIL.path.replace(":id", "1")}>{bill.client}</Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            Etat
          </Grid>
          <Grid container item xs={6} sm={9} direction="row" alignContent="center" alignItems="center">
            {billStatus?.icon}
            <div style={{ paddingLeft: 10 }}>{billStatus?.text}</div>
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
    </>
  );
};

BillDetail.propTypes = {};

export default BillDetail;
