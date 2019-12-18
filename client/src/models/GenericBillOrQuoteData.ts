import { Moment } from "moment";

export interface GenericBillOrQuoteData {
  id?: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  version?: number;
  status?: string;
  total: number;
  createdBy?: number;
  clientId?: number;
  lines: GenericBillOrQuoteLineData[];
  tva: number;
  deleted?: boolean;
}

export interface GenericBillOrQuoteLineData {
  lineNumber?: number;
  description: string;
  quantity: number;
  preTaxPrice: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  version?: number;
}
