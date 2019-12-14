export class QuoteLineData {
  description: string;
  quantity: number;
  puht: number;
  puttc: number;
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;

  constructor() {
    this.description = "";
    this.quantity = 0;
    this.puht = 0;
    this.puttc = 0;
  }
}
