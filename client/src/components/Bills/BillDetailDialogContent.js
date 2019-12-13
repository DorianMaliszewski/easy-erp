import React from "react";
import PropTypes from "prop-types";
import { Grid, Link } from "@material-ui/core";
import moment from "moment";
import { getBillStatus } from "../../utils/utils";
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

const BillDetailDialogContent = ({ bill }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={4} className={classes.paper}>
          Client
        </Grid>
        <Grid item xs={8} className={classes.paper}>
          <Link href={routes.CUSTOMERS_DETAIL.path.replace(":id", 1)}>{bill.client}</Link>
        </Grid>
        <Grid item xs={4} className={classes.paper}>
          Etat
        </Grid>
        <Grid item xs={8} className={classes.paper}>
          {getBillStatus(bill.status).text}
        </Grid>
        <Grid item xs={4} className={classes.paper}>
          Crée
        </Grid>
        <Grid item xs={8} className={classes.paper}>
          {moment(bill.createdAt).fromNow()}
        </Grid>
        <Grid item xs={4} className={classes.paper}>
          Mis à jour
        </Grid>
        <Grid item xs={8} className={classes.paper}>
          {moment(bill.updatedAt).fromNow()}
        </Grid>
      </Grid>
    </div>
  );
};

BillDetailDialogContent.propTypes = {
  bill: PropTypes.object.isRequired
};

export default BillDetailDialogContent;
