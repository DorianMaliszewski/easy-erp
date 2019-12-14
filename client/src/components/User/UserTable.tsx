import React from "react";

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const UserTable: React.FC<any> = ({ users, isLoading }) => {
  const classes = useStyles();
  const history = useHistory();
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
            users.map((row: any) => (
              <TableRow key={row.id} hover onClick={e => history.push(routes.USER_DETAIL.path.replace(":id", row.id as string))}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.client}</TableCell>
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
