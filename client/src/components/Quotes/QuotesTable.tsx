import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import QuoteStatusIcon from "./QuoteStatusIcon";
import routes from "../../routes";
import { useHistory } from "react-router-dom";
import { QuoteData } from "../../models/QuoteData";
import useCustomers from "../../hooks/useCustomers";
import { Skeleton } from "@material-ui/lab";

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

const QuotesTable: React.FC<any> = ({ quotes }) => {
  const history = useHistory();
  const classes = useStyles();
  const { customers } = useCustomers();

  const goToQuote = (id: number) => {
    history.push(routes.QUOTES_DETAIL.path.replace(":id", id.toString()));
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
          {quotes.map((row: QuoteData) => (
            <TableRow hover key={row.id} onClick={e => goToQuote(row.id as number)}>
              <TableCell component="th" scope="row">
                <QuoteStatusIcon status={row.status} />
              </TableCell>
              <TableCell>{customers ? customers.find(customer => customer.id === row.clientId)?.name : <Skeleton width={100} />}</TableCell>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>{row.createdAt?.format("L LTS")}</TableCell>
              <TableCell>{row.updatedAt ? row.updatedAt.format("L LTS") : "Jamais"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default QuotesTable;
