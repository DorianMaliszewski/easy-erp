import React from "react";
import PropTypes from "prop-types";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Theme } from "@material-ui/core";
import { red, blue } from "@material-ui/core/colors";
import AdminCustomersTableRow from "./AdminCustomersTableRow";
import { makeStyles } from "@material-ui/styles";

const AdminCustomersTable: React.FC<any> = ({ customers }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>E-Mail</TableCell>
            <TableCell align="right" style={{ paddingRight: 50 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row: any) => (
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
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
}));

export default AdminCustomersTable;
