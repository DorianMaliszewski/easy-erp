import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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

function CustomersTable(props) {
  const { classes, customers, history } = props;

  const goToCustomer = id => {
    history.push(routes.CUSTOMERS_DETAIL.path.replace(":id", id));
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>E-Mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(row => (
            <TableRow hover onClick={e => goToCustomer(row.id)} key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomersTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(CustomersTable));
