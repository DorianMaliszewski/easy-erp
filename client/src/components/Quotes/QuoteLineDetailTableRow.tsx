import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { QuoteLineData } from "../../models/QuoteLineData";
import { calculPostTaxPriceLine } from "../../utils/quote";

type QuoteLineDetailTableRowProps = {
  quoteLine: QuoteLineData;
  tva: number;
};

const QuoteLineDetailTableRow: React.FC<QuoteLineDetailTableRowProps> = ({ quoteLine, tva }) => {
  return (
    <TableRow>
      <TableCell>{quoteLine.description}</TableCell>
      <TableCell>{quoteLine.preTaxPrice} €</TableCell>
      <TableCell>{quoteLine.quantity}</TableCell>
      <TableCell>{calculPostTaxPriceLine(tva, quoteLine).toFixed(2)} €</TableCell>
      <TableCell>{(calculPostTaxPriceLine(tva, quoteLine) * quoteLine.quantity).toFixed(2)} €</TableCell>
    </TableRow>
  );
};

export default QuoteLineDetailTableRow;
