import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@material-ui/core";
import QuoteDetailDialogContentText from "./QuoteDetailDialogContentText";
import { getQuoteStatus } from "../../utils/utils";
import SearchIcon from "@material-ui/icons/Search";
import QuoteDetailDialogTopActions from "./QuoteDetailDialogTopActions";
import routes from "../../routes";
import { withRouter } from "react-router-dom";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const QuoteDetailDialog = ({ open, closeModal, quote, history, width }) => {
  const goToQuote = e => {
    e.preventDefault();
    history.push(routes.QUOTES_DETAIL.path.replace(":id", quote.id));
  };

  // Too much margin on mobile
  const paperProps = isWidthUp("sm", width)
    ? { style: { marginRight: "auto", marginLeft: "auto" } }
    : { style: { marginRight: 12, marginLeft: 12 } };

  return (
    <Dialog
      PaperProps={paperProps ? paperProps : null}
      open={open}
      onClose={closeModal}
      scroll="body"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <QuoteDetailDialogTopActions />
      </div>
      <DialogTitle style={{ paddingTop: 0 }} id="alert-dialog-title">
        <div style={{ verticalAlign: "middle", display: "flex" }}>
          <div style={{ paddingRight: 15 }}>{getQuoteStatus(quote.status).icon}</div>
          <Typography component="h6" variant="h6" style={{ flexGrow: 1 }}>
            Aperçu du devis n° {quote.id}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent>
        <QuoteDetailDialogContentText quote={quote} />
      </DialogContent>
      <DialogActions>
        <Button onClick={goToQuote} variant="contained" color="primary">
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

QuoteDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  quote: PropTypes.object.isRequired
};

export default withRouter(withWidth()(QuoteDetailDialog));
