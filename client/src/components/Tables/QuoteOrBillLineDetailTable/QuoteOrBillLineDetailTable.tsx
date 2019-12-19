import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Theme } from "@material-ui/core";
import QuoteOrBillLineDetailTable from "./QuoteOrBillLineDetailTableRow";
import { calculTotalTTC } from "../../../utils/quote";
import { BillLineData } from "../../../models/BillData";
import { QuoteLineData } from "../../../models/QuoteLineData";

const QuoteLineDetailTable: React.FC<any> = ({ item }) => {
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
        {item.lines.map((line: QuoteLineData | BillLineData) => (
          <QuoteOrBillLineDetailTable tva={item.tva} itemLine={line} />
        ))}
        <TableRow>
          <TableCell className={classes.totalLine} colSpan={4}>
            Total
          </TableCell>
          <TableCell className={classes.totalLine}>{calculTotalTTC(item).toFixed(2)} €</TableCell>
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
