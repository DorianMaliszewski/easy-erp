import React from "react";
import { Grid, Button, makeStyles, Theme } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import CreditCardIcon from "@material-ui/icons/CreditCard";

import BillSavePDFAndViewPDFActions from "./BillSavePDFAndViewPDFActions";
import { BILL_STATUS } from "./BillStatusIcon";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { getBillStatus } from "../../utils/utils";
import { green, red } from "@material-ui/core/colors";
import { BillData } from "../../models/BillData";
import useSnackbar from "../../hooks/useSnackbar";
import useConfirmModal from "../../hooks/useConfirmModal";
import { MESSAGES } from "../../constants";
import { useBillContext } from "../../providers/BillProvider";

const BillActionButtons: React.FC<any> = ({ bill }) => {
  const billStatus = getBillStatus(bill.status as string);
  const history = useHistory();
  const snackbar = useSnackbar();
  const classes = useStyles();
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
    billContext.send(bill.id).subscribe((bill: BillData) => {
      snackbar.show("Facture envoyée", "success");
    });
  };

  const handleAccept = (event: React.MouseEvent) => {
    billContext.accept(bill.id).subscribe((bill: BillData) => {
      snackbar.show("Facture acceptée", "success");
    });
  };

  const handleCancel = (event: React.MouseEvent) => {
    billContext.cancel(bill.id).subscribe((bill: BillData) => {
      snackbar.show("Facture annulée", "success");
    });
  };

  const handlePayed = (event: React.MouseEvent) => {
    billContext.payed(bill.id).subscribe((bill: BillData) => {
      snackbar.show("Facture payée", "success");
    });
  };

  return (
    <Grid container spacing={1} alignItems="center">
      {billStatus?.enum === BILL_STATUS.DRAFT.enum && (
        <>
          <Grid item>
            <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={e => history.push(routes.BILLS_FORM.path + "/" + bill.id?.toString())}>
              Modifier
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.greenButton} startIcon={<SendIcon />} onClick={handleClick(() => handleSend, MESSAGES.MODALS_MESSAGES.SEND_BILL)}>
              Envoyer
            </Button>
          </Grid>
        </>
      )}
      {billStatus?.enum === BILL_STATUS.WAITING_CUSTOMER.enum && (
        <>
          <Grid item>
            <Button variant="contained" className={classes.greenButton} startIcon={<DoneIcon />} onClick={handleClick(() => handleAccept, MESSAGES.MODALS_MESSAGES.ACCEPT_BILL)}>
              Valider
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.redButton} startIcon={<ClearIcon />} onClick={handleClick(() => handleCancel, MESSAGES.MODALS_MESSAGES.CANCEL_BILL)}>
              Refuser
            </Button>
          </Grid>
        </>
      )}
      {billStatus?.enum === BILL_STATUS.NEED_CONFIRMATION.enum && (
        <Grid item>
          <Button variant="contained" color="primary" startIcon={<SendIcon />} onClick={handleClick(() => handleSend, MESSAGES.MODALS_MESSAGES.SEND_BILL)}>
            Envoyer
          </Button>
        </Grid>
      )}
      {billStatus?.enum === BILL_STATUS.ACCEPTED.enum && (
        <Grid item>
          <Button variant="contained" color="primary" startIcon={<CreditCardIcon />} onClick={handleClick(() => handlePayed, MESSAGES.MODALS_MESSAGES.PAYED_BILL)}>
            Facture payée
          </Button>
        </Grid>
      )}
      <Grid item>
        <BillSavePDFAndViewPDFActions />
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

export default BillActionButtons;
