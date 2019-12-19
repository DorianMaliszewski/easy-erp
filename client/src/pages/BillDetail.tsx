import React, { useContext, useState, useEffect } from "react";
import routes from "../routes";
import BillContext from "../contexts/BillContext";
import { useHistory, useParams } from "react-router-dom";
import { Paper, Grid, Typography, Divider, Button, Link, Theme } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { getQuoteStatus } from "../utils/utils";
import { BillData } from "../models/BillData";
import CustomerContext from "../contexts/CustomerContext";
import { CustomerData } from "../models/CustomerData";
import { Skeleton } from "@material-ui/lab";
import QuoteOrBillLineDetailTable from "../components/Tables/QuoteOrBillLineDetailTable/QuoteOrBillLineDetailTable";
import BillActionButtons from "../components/Bills/BillActionButtons";

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
  const [bill, setBill] = useState<BillData>();

  const [customer, setCustomer] = useState();
  const customerContext = useContext(CustomerContext);

  const classes = useStyle();

  useEffect(() => {
    if (id) {
      billContext.findById(parseInt(id, 10)).subscribe(
        (b: BillData) => {
          setBill(b);
          if (b.clientId) {
            customerContext.findById(b.clientId).subscribe((c: CustomerData) => setCustomer(c));
          }
        },
        (err: any) => {
          console.error(err);
          history.goBack();
        }
      );
    }
  }, [id, billContext, customerContext, history]);

  if (!bill) {
    return <Splashscreen text="Récupération de la facture" />;
  }

  const billStatus = getQuoteStatus(bill.status as string);

  return (
    <>
      <Grid container justify="space-between">
        <Grid item>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </Grid>
        <Grid item>
          <BillActionButtons bill={bill} />
        </Grid>
      </Grid>
      <Grid item>
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
              <Link href={routes.CUSTOMERS_DETAIL.path.replace(":id", bill.clientId ? bill.clientId.toString() : "")}>{customer ? customer.name : <Skeleton />}</Link>
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
              {bill.createdBy}
            </Grid>
            <Grid item xs={6} sm={3}>
              Créé
            </Grid>
            <Grid item xs={6} sm={9}>
              {bill.createdAt?.fromNow()}
            </Grid>
            <Grid item xs={6} sm={3}>
              Mis à jour
            </Grid>
            <Grid item xs={6} sm={9}>
              {bill.updatedAt ? bill.updatedAt.fromNow() : "Jamais"}
            </Grid>
            {bill.quoteId && (
              <>
                <Grid item xs={6} sm={3}>
                  Devis associé
                </Grid>
                <Grid item xs={6} sm={9}>
                  <Button color="primary" variant="contained" onClick={e => history.push(routes.QUOTES_DETAIL.path.replace(":id", bill.quoteId ? bill.quoteId.toString() : ""))}>
                    Voir le devis
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <QuoteOrBillLineDetailTable item={bill} />
      </Grid>
    </>
  );
};

BillDetail.propTypes = {};

export default BillDetail;
