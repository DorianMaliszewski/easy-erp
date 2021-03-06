import { Moment } from "moment";
import { GenericBillOrQuoteData, GenericBillOrQuoteLineData } from "./GenericBillOrQuoteData";

export class QuoteData implements GenericBillOrQuoteData {
  lines: GenericBillOrQuoteLineData[] = [];
  createdAt?: Moment;
  updatedAt?: Moment;
  version?: number;
  status?: string;
  total: number;
  clientId?: number;
  createdBy?: number;
  deleted?: boolean;
  tva: number;
  id?: number;
  billId?: number;

  constructor() {
    this.lines = [];
    this.total = 0;
    this.tva = 0;
  }
}
