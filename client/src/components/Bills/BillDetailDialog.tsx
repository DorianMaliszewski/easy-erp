import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@material-ui/core";
import { getBillStatus } from "../../utils/utils";
import SearchIcon from "@material-ui/icons/Search";
import routes from "../../routes";
import { useHistory } from "react-router-dom";
import QuoteDetailDialogTopActions from "../Quotes/QuoteSavePDFAndViewPDFActions";
import BillDetailDialogContent from "./BillDetailDialogContent";

const BillDetailDialog: React.FC<any> = ({ open, closeModal, bill }) => {
  const history = useHistory();

  const goToBill = (e: any) => {
    e.preventDefault();
    history.push(routes.BILLS_DETAIL.path.replace(":id", bill.id));
  };

  return (
    <Dialog open={open} onClose={closeModal} scroll="body" aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <QuoteDetailDialogTopActions />
      </div>
      <DialogTitle style={{ paddingTop: 0 }} id="alert-dialog-title">
        <div style={{ verticalAlign: "middle", display: "flex" }}>
          <div style={{ paddingRight: 15 }}>{getBillStatus(bill.status)?.icon}</div>
          <Typography component="h6" variant="h6" style={{ flexGrow: 1 }}>
            Aperçu facture n° {bill.id}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent>
        <BillDetailDialogContent bill={bill} />
      </DialogContent>
      <DialogActions>
        <Button onClick={goToBill} variant="contained" color="primary">
          <SearchIcon />
          Détails
        </Button>
        <Button onClick={closeModal} color="primary" autoFocus>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BillDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  bill: PropTypes.object.isRequired
};

export default BillDetailDialog;
