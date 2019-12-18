import React from "react";
import { Grid, Button, makeStyles, Theme } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";

import QuoteSavePDFAndViewPDFActions from "./QuoteSavePDFAndViewPDFActions";
import { QUOTE_STATUS } from "./QuoteStatusIcon";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { getQuoteStatus } from "../../utils/utils";
import { green, red } from "@material-ui/core/colors";

const QuoteActionButtons: React.FC<any> = ({ quote }) => {
  const quoteStatus = getQuoteStatus(quote.status as string);
  const history = useHistory();

  const classes = useStyles();

  return (
    <Grid container spacing={1} alignItems="center">
      {quoteStatus?.enum === QUOTE_STATUS.DRAFT.enum && (
        <Grid item>
          <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={e => history.push(routes.QUOTES_FORM.path + "/" + quote.id?.toString())}>
            Modifier
          </Button>
        </Grid>
      )}
      {quoteStatus?.enum === QUOTE_STATUS.WAITING_CUSTOMER.enum && (
        <>
          <Grid item>
            <Button variant="contained" className={classes.greenButton} startIcon={<DoneIcon />} onClick={e => history.push(routes.QUOTES_FORM.path + "/" + quote.id?.toString())}>
              Valider
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.redButton} startIcon={<ClearIcon />} onClick={e => history.push(routes.QUOTES_FORM.path + "/" + quote.id?.toString())}>
              Refuser
            </Button>
          </Grid>
        </>
      )}
      {quoteStatus?.enum === QUOTE_STATUS.NEED_CONFIRMATION.enum && (
        <Grid item>
          <Button variant="contained" color="primary" startIcon={<SendIcon />} onClick={e => history.push(routes.QUOTES_FORM.path + "/" + quote.id?.toString())}>
            Confirmer
          </Button>
        </Grid>
      )}
      <Grid item>
        <QuoteSavePDFAndViewPDFActions />
      </Grid>
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
