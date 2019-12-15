export class QuoteLineData {
  description: string;
  quantity: number;
  preTaxPrice: number;
  postTaxPrice: number;
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;

  constructor() {
    this.description = "";
    this.quantity = 0;
    this.preTaxPrice = 0;
    this.postTaxPrice = 0;
  }
}
