import React from "react";
import PropTypes from "prop-types";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from "@material-ui/core";
import { red, blue } from "@material-ui/core/colors";
import { withRouter } from "react-router-dom";
import AdminCustomersTableRow from "./AdminCustomersTableRow";

const AdminCustomersTable = ({ classes, customers, history }) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>E-Mail</TableCell>
            <TableCell align='right' style={{ paddingRight: 50 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(row => (
            <AdminCustomersTableRow customer={row} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

AdminCustomersTable.propTypes = {
  classes: PropTypes.object.isRequired,
  customers: PropTypes.arrayOf(PropTypes.object).isRequired
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  editButton: {
    color: blue[500]
  },
  deleteButton: {
    color: red[700]
  }
});

export default withRouter(withStyles(styles)(AdminCustomersTable));
