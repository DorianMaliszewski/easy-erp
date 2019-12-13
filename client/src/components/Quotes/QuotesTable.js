import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import QuoteStatusIcon from "./QuoteStatusIcon";
import routes from "../../routes";
import { withRouter } from "react-router-dom";

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

function QuotesTable(props) {
  const { classes, quotes, history } = props;

  const goToQuote = q => {
    history.push(routes.QUOTES_DETAIL.path.replace(":id", q.id));
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
          {quotes.map(row => (
            <TableRow hover key={row.id} onClick={e => goToQuote(row)}>
              <TableCell component="th" scope="row">
                <QuoteStatusIcon status={row.status} />
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

QuotesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(QuotesTable));
