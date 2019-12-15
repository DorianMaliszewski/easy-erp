import { QuoteLineData } from "./QuoteLineData";

export class QuoteData {
  lines = [new QuoteLineData()];
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;
  status?: string;
  total: number;
  clientId?: number;
  createdBy?: number;
  deleted?: boolean;
  id?: number;

  constructor() {
    this.lines = [new QuoteLineData()];
    this.total = 0;
  }
}
