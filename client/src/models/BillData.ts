import { Moment } from "moment";
import { GenericBillOrQuoteData, GenericBillOrQuoteLineData } from "./GenericBillOrQuoteData";

// Generated by https://quicktype.io

export class BillData implements GenericBillOrQuoteData {
  id?: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  version?: number;
  status?: string;
  total: number;
  createdBy?: number;
  clientId?: number;
  lines: BillLineData[] = [];
  tva: number;
  deleted?: boolean;
  quoteId?: number;

  constructor() {
    this.total = 0;
    this.lines = [];
    this.tva = 0;
  }
}

export class BillLineData implements GenericBillOrQuoteLineData {
  lineNumber: number;
  description: string;
  quantity: number;
  preTaxPrice: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  version?: number;

  constructor() {
    this.lineNumber = -1;
    this.description = "";
    this.quantity = 0;
    this.preTaxPrice = 0;
  }
}
