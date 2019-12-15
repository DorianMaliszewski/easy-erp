import { BillLineRequest } from "./BillLineRequest";

export class BillRequest {
  clientId?: number;
  tva: number;
  draft: boolean;
  lines: BillLineRequest[];

  constructor() {
    this.tva = 0;
    this.draft = true;
    this.lines = [];
  }
}
