import { GenericBillOrQuoteLineData, GenericBillOrQuoteData } from "../models/GenericBillOrQuoteData";

export const calculPostTaxPriceLine = (tva: number, itemLine: GenericBillOrQuoteLineData) => {
  return (1 + tva) * itemLine.preTaxPrice;
};

export const calculTotalTTC = (item: GenericBillOrQuoteData) => {
  let total = 0;
  if (item.lines) {
    total = item.lines.map(line => calculPostTaxPriceLine(item.tva, line) * line.quantity).reduce((ttc1, ttc2) => ttc1 + ttc2);
  }
  return total;
};
