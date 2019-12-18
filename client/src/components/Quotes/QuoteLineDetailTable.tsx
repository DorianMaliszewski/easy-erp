import React from "react";
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Theme } from "@material-ui/core";
import { QuoteLineData } from "../../models/QuoteLineData";
import QuoteLineDetailTableRow from "./QuoteLineDetailTableRow";
import { calculTotalTTC } from "../../utils/quote";

const QuoteLineDetailTable: React.FC<any> = ({ quote }) => {
  const classes = useStyles();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeadCell}>Description</TableCell>
          <TableCell className={classes.tableHeadCell}>Prix UHT</TableCell>
          <TableCell className={classes.tableHeadCell}>Quantité</TableCell>
          <TableCell className={classes.tableHeadCell}>Prix TTC</TableCell>
          <TableCell className={classes.tableHeadCell}>Sous total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quote.lines.map((line: QuoteLineData) => (
          <QuoteLineDetailTableRow tva={quote.tva} quoteLine={line} />
        ))}
        <TableRow>
          <TableCell className={classes.totalLine} colSpan={4}>
            Total
          </TableCell>
          <TableCell className={classes.totalLine}>{calculTotalTTC(quote).toFixed(2)} €</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  totalLine: theme.typography.h6,
  tableHeadCell: {
    fontWeight: "bold"
  }
}));

export default QuoteLineDetailTable;
