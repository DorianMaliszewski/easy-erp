import { QUOTE_STATUS } from "../components/Quotes/QuoteStatusIcon";
import { BILL_STATUS } from "../components/Bills/BillStatusIcon";

export function getQuoteStatus(status) {
  return Object.values(QUOTE_STATUS).find(s => s.enum === status);
}

export function getBillStatus(status) {
  return Object.values(BILL_STATUS).find(s => s.enum === status);
}
