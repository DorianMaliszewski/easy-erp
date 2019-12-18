import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { BillLineData } from "../../../models/BillData";
import { QuoteLineData } from "../../../models/QuoteLineData";
import { calculPostTaxPriceLine } from "../../../utils/quote";
import { GenericBillOrQuoteLineData } from "../../../models/GenericBillOrQuoteData";
type QuoteOrBillLineDetailTableProps = {
  itemLine: GenericBillOrQuoteLineData;
  tva: number;
};

const QuoteOrBillLineDetailTableRow: React.FC<QuoteOrBillLineDetailTableProps> = ({ itemLine, tva }) => {
  return (
    <TableRow>
      <TableCell>{itemLine.description}</TableCell>
      <TableCell>{itemLine.preTaxPrice} €</TableCell>
      <TableCell>{itemLine.quantity}</TableCell>
      <TableCell>{calculPostTaxPriceLine(tva, itemLine).toFixed(2)} €</TableCell>
      <TableCell>{(calculPostTaxPriceLine(tva, itemLine) * itemLine.quantity).toFixed(2)} €</TableCell>
    </TableRow>
  );
};

export default QuoteOrBillLineDetailTableRow;
