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
          {quotes.map((row: any) => (
            <TableRow hover key={row.id} onClick={e => goToQuote(row.id)}>
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
};

export default QuotesTable;
