import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BillStatusIcon from "./BillStatusIcon";
import { withRouter } from "react-router-dom";
import routes from "../../routes";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

function BillsTable(props) {
  const { classes, bills, history } = props;

  const goToBill = id => {
    history.push(routes.BILLS_DETAIL.path.replace(":id", id));
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Crée par</TableCell>
            <TableCell>Crée le</TableCell>
            <TableCell>Mise à jour le</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map(row => (
            <TableRow onClick={e => goToBill(row.id)} hover key={row.id}>
              <TableCell component="th" scope="row">
                <BillStatusIcon status={row.status} />
              </TableCell>
              <TableCell>{row.client}</TableCell>
              <TableCell>{row.creator}</TableCell>
              <TableCell>{row.createdAt.toLocaleString()}</TableCell>
              <TableCell>{row.updatedAt.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

BillsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(BillsTable));
