import { QuoteLineRequest } from "./QuoteLineRequest";

export class QuoteRequest {
  clientId?: number;
  tva: number;
  draft: boolean;
  lines: QuoteLineRequest[];

  constructor() {
    this.tva = 0;
    this.draft = true;
    this.lines = [];
  }
}
