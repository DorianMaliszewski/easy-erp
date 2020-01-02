import { QUOTE_STATUS } from "../components/Quotes/QuoteStatusIcon";
import { BILL_STATUS } from "../components/Bills/BillStatusIcon";
import { GenericBillOrQuoteData } from "../models/GenericBillOrQuoteData";
import moment from "moment";

export function getQuoteStatus(status: string) {
  return Object.values(QUOTE_STATUS).find(s => s.enum === status);
}

export function getBillStatus(status: string) {
  return Object.values(BILL_STATUS).find(s => s.enum === status);
}

export function convertJSONToGenericBillOrQuoteData(item: GenericBillOrQuoteData) {
  item.createdAt = moment(item.createdAt);
  if (item.updatedAt) {
    item.updatedAt = moment(item.updatedAt);
  }
  return item;
}

export function convertGenericBillOrQuoteDataToRequest(item: GenericBillOrQuoteData, draft: boolean = true): any {
  return {
    lines: item.lines.map((line, index) => ({ lineNumber: index + 1, description: line.description, preTaxPrice: line.preTaxPrice, quantity: line.quantity })),
    draft,
    clientId: item.clientId,
    tva: item.tva as number
  };
}
