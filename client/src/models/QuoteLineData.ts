import { GenericBillOrQuoteLineData } from "./GenericBillOrQuoteData";

export class QuoteLineData implements GenericBillOrQuoteLineData {
  lineNumber?: number;
  description: string;
  quantity: number;
  preTaxPrice: number;
  postTaxPrice: number;
  total?: number;
  version?: number;

  constructor() {
    this.description = "";
    this.quantity = 0;
    this.preTaxPrice = 0;
    this.postTaxPrice = 0;
  }
}
