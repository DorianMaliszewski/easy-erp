import React from "react";
import { Grid, Button, makeStyles, Theme } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";

import QuoteSavePDFAndViewPDFActions from "./QuoteSavePDFAndViewPDFActions";
import { QUOTE_STATUS } from "./QuoteStatusIcon";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { getQuoteStatus } from "../../utils/utils";
import { green, red } from "@material-ui/core/colors";
import { QuoteData } from "../../models/QuoteData";
import useSnackbar from "../../hooks/useSnackbar";
import { useQuoteContext } from "../../providers/QuoteProvider";
import useConfirmModal from "../../hooks/useConfirmModal";
import { MESSAGES } from "../../constants";
import { BillData } from "../../models/BillData";
import { useBillContext } from "../../providers/BillProvider";

const QuoteActionButtons: React.FC<any> = ({ setQuote, quote }) => {
  const quoteStatus = getQuoteStatus(quote.status as string);
  const history = useHistory();
  const snackbar = useSnackbar();
  const classes = useStyles();
  const quoteContext = useQuoteContext();
  const billContext = useBillContext();

  const modal = useConfirmModal();

  const handleClick = (callback: Function, object?: any) => (event: any) => {
    modal.setCallback(callback);
    if (object) {
      if (object.message) {
        modal.setText(object.message);
      }
      if (object.title) {
        modal.setTitle(object.title);
      }
    }
    modal.setOpen(true);
  };

  const handleSend = (event: React.MouseEvent) => {
    quoteContext.send(quote.id).subscribe((quote: QuoteData) => {
      setQuote(quote);
      snackbar.show("Devis envoyé", "success");
    });
  };

  const handleAccept = (event: React.MouseEvent) => {
    quoteContext.accept(quote.id).subscribe((quote: QuoteData) => {
      setQuote(quote);
      snackbar.show("Devis accepté", "success");
    });
  };

  const handleCancel = (event: React.MouseEvent) => {
    quoteContext.cancel(quote.id).subscribe((quote: QuoteData) => {
      setQuote(quote);
      snackbar.show("Devis annulé", "success");
    });
  };

  const handleCreateBill = (e: React.MouseEvent) => {
    billContext.createFromQuote(quote).subscribe((bill: BillData) => {
      snackbar.show("Facture créée", "success");
      console.log("Bill créée", bill);

      if (bill.id) {
        history.push(routes.BILLS_FORM.path + "/" + bill.id);
      }
    });
  };

  const handleShowBillClick = (e: React.MouseEvent) => {
    if (quote.billId) {
      history.push(routes.BILLS_DETAIL.path.replace(":id", quote.billId));
    }
  };

  return (
    <Grid container spacing={1} alignItems="center">
      {quoteStatus?.enum === QUOTE_STATUS.DRAFT.enum && (
        <>
          <Grid item>
            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={e => history.push(routes.QUOTES_FORM.path + "/" + quote.id?.toString())}>
              Modifier
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.greenButton} startIcon={<SendIcon />} onClick={handleClick(() => handleSend, MESSAGES.MODALS_MESSAGES.SEND_QUOTE)}>
              Envoyer
            </Button>
          </Grid>
        </>
      )}
      {quoteStatus?.enum === QUOTE_STATUS.WAITING_CUSTOMER.enum && (
        <>
          <Grid item>
            <Button variant="contained" className={classes.greenButton} startIcon={<DoneIcon />} onClick={handleClick(() => handleAccept, MESSAGES.MODALS_MESSAGES.ACCEPT_QUOTE)}>
              Valider
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.redButton} startIcon={<ClearIcon />} onClick={handleClick(() => handleCancel, MESSAGES.MODALS_MESSAGES.CANCEL_QUOTE)}>
              Refuser
            </Button>
          </Grid>
        </>
      )}
      {quoteStatus?.enum === QUOTE_STATUS.NEED_CONFIRMATION.enum && (
        <Grid item>
          <Button variant="contained" color="primary" startIcon={<SendIcon />} onClick={handleClick(() => handleSend, MESSAGES.MODALS_MESSAGES.SEND_QUOTE)}>
            Envoyer
          </Button>
        </Grid>
      )}
      {quoteStatus?.enum === QUOTE_STATUS.ACCEPTED.enum &&
        (!quote.billId ? (
          <Grid item>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClick(() => handleCreateBill, MESSAGES.MODALS_MESSAGES.CREATE_BILL_FROM_QUOTE)}>
              Créer la facture
            </Button>
          </Grid>
        ) : (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleShowBillClick}>
              Voir la facture associée
            </Button>
          </Grid>
        ))}
      <Grid item>
        <QuoteSavePDFAndViewPDFActions />
      </Grid>
      {modal.ConfirmDialogComponent}
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  greenButton: {
    color: "white",
    backgroundColor: green[500],
    "&:hover": { backgroundColor: green[700] }
  },
  redButton: {
    color: "white",
    backgroundColor: red[600],
    "&:hover": { backgroundColor: red[800] }
  }
}));

export default QuoteActionButtons;
