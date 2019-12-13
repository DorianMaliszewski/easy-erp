import React from "react";
import PropTypes from "prop-types";
import { Grid, Link } from "@material-ui/core";
import moment from "moment";
import { getQuoteStatus } from "../../utils/utils";
import { makeStyles } from "@material-ui/styles";
import routes from "../../routes";

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit,
    color: theme.palette.text.primary
  }
}));

const QuoteDetailDialogContentText = ({ quote }) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={4} className={classes.paper}>
          Client
        </Grid>
        <Grid item xs={8} className={classes.paper}>
          <Link href={routes.CUSTOMERS_DETAIL.path.replace(":id", 1)}>{quote.client}</Link>
        </Grid>
        <Grid item xs={4} className={classes.paper}>
          Etat
        </Grid>
        <Grid item xs={8} className={classes.paper}>
          {getQuoteStatus(quote.status).text}
        </Grid>
        <Grid item xs={4} className={classes.paper}>
          Crée
        </Grid>
        <Grid item xs={8} className={classes.paper}>
          {moment(quote.createdAt).fromNow()}
        </Grid>
        <Grid item xs={4} className={classes.paper}>
          Mis à jour
        </Grid>
        <Grid item xs={8} className={classes.paper}>
          {moment(quote.updatedAt).fromNow()}
        </Grid>
      </Grid>
    </div>
  );
};

QuoteDetailDialogContentText.propTypes = {
  quote: PropTypes.object.isRequired
};

export default QuoteDetailDialogContentText;
