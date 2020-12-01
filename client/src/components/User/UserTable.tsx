import React, { useEffect, useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { Theme } from "@material-ui/core";
import { UserData } from "../../models/UserData";
import { useCustomersContext } from "../../providers/CustomerProvider";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const UserTable: React.FC<any> = ({ users, isLoading, isInternal = false }) => {
  const classes = useStyles();
  const history = useHistory();
  const customerContext = useCustomersContext();
  const [customers, setCustomers] = useState<any>([]);
  useEffect(() => {
    if (customerContext.state.isLoading === false && customers.length === 0) {
      setCustomers(customerContext.state.customers);
    }
  }, [customerContext.state, customers.length]);

  const getCustomerName = (row: UserData) => {
    if (!row.clientId) return "Aucun client";
    const customerFinded = customers.find((c: any) => c.id === row.clientId);
    return customerFinded ? customerFinded.name : "Non trouvé";
  };

  const editRoute = isInternal ? routes.USER_DETAIL.path : routes.CUSTOMER_USER_DETAIL.path;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Client</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map ? (
            users.map((row: UserData) => (
              <TableRow key={row.id} hover onClick={e => history.push(editRoute.replace(":id", row.id ? row.id.toString() : ""))}>
                <TableCell component="th" scope="row">
                  {row.firstName + " " + row.lastName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber ? row.phoneNumber : "Non renseigné"}</TableCell>
                <TableCell>{getCustomerName(row)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                {isLoading ? "Chargement des utilisateurs" : "Aucun utilisateur"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserTable;
