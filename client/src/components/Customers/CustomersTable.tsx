import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import routes from "../../routes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

const CustomersTable: React.FC<any> = props => {
  const { customers } = props;
  const classes = useStyles();
  const history = useHistory();

  const goToCustomer = (id: number) => {
    history.push(routes.CUSTOMERS_DETAIL.path.replace(":id", id.toString()));
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
          {customers.map((row: any) => (
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
};

export default CustomersTable;
