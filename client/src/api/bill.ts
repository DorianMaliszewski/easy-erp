import { BILL_SERVICE, INSTANCE_URL } from "../constants";
import { getAjaxRequestHeaders } from ".";
import { AjaxResponse, ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { DTO } from "../models/DTO";
import { BillData } from "../models/BillData";
import { of, Observable } from "rxjs";
import moment from "moment";
import { BillRequest } from "../models/ApiRequests/BillRequest";
import { BillLineRequest } from "../models/ApiRequests/BillLineRequest";

export class BillApi {
  private static INSTANCE = new BillApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  private getApiUrl() {
    return sessionStorage.getItem(INSTANCE_URL) + "/" + BILL_SERVICE;
  }

  public findAll() {
    return ajax({
      method: "GET",
      url: this.getApiUrl() + "/api/bills",
      headers: getAjaxRequestHeaders()
    }).pipe(
      map((res: AjaxResponse) => {
        const dto = res.response as DTO<BillData>;
        dto.items = dto.items.map(item => this.convertJSONToBillData(item));
        return dto;
      }),
      catchError(err => {
        console.error(err);
        return of(new DTO<BillData>());
      })
    );
  }

  public findOneById(id: number) {
    return ajax({
      method: "GET",
      url: this.getApiUrl() + "/api/bills/" + id,
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => this.convertJSONToBillData(res.response as BillData)));
  }

  public save(bill: BillData, draft: boolean = true): Observable<BillData> {
    return bill.id ? this.update(bill, draft) : this.create(bill, draft);
  }

  public create(bill: BillData, draft: boolean = true): Observable<BillData> {
    return ajax({
      method: "POST",
      url: this.getApiUrl() + "/api/bills",
      headers: getAjaxRequestHeaders(),
      body: this.convertBillDataToRequest(bill, draft)
    }).pipe(map((res: AjaxResponse) => this.convertJSONToBillData(res.response as BillData)));
  }

  public update(bill: BillData, draft: boolean = true): Observable<BillData> {
    return ajax({
      method: "PUT",
      url: this.getApiUrl() + "/api/bills/" + bill.id?.toString(),
      headers: getAjaxRequestHeaders(),
      body: this.convertBillDataToRequest(bill, draft)
    }).pipe(map((res: AjaxResponse) => this.convertJSONToBillData(res.response as BillData)));
  }

  private convertJSONToBillData(bill: BillData) {
    bill.createdAt = moment(bill.createdAt);
    if (bill.updatedAt) {
      bill.updatedAt = moment(bill.updatedAt);
    }
    return bill;
  }

  private convertBillDataToRequest(bill: BillData, draft: boolean = true): BillRequest {
    return {
      lines: bill.lines.map((line, index) => ({ lineNumber: index + 1, description: line.description, preTaxPrice: line.preTaxPrice, quantity: line.quantity } as BillLineRequest)),
      draft,
      clientId: bill.clientId,
      tva: bill.tva as number
    };
  }
}
