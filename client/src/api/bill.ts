import { BILL_SERVICE, INSTANCE_URL } from "../constants";
import { getAjaxRequestHeaders } from ".";
import { AjaxResponse, ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { DTO } from "../models/DTO";
import { BillData } from "../models/BillData";
import { of, Observable } from "rxjs";
import { QuoteData } from "../models/QuoteData";
import { convertGenericBillOrQuoteDataToRequest, convertJSONToGenericBillOrQuoteData } from "../utils/utils";

export class BillApi {
  private static INSTANCE = new BillApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  private getApiUrl() {
    return sessionStorage.getItem(INSTANCE_URL) + "/" + BILL_SERVICE + "/api/bills";
  }

  public findAll() {
    return ajax({
      method: "GET",
      url: this.getApiUrl(),
      headers: getAjaxRequestHeaders()
    }).pipe(
      map((res: AjaxResponse) => {
        const dto = res.response as DTO<BillData>;
        dto.items = dto.items.map(item => convertJSONToGenericBillOrQuoteData(item) as BillData);
        return dto;
      }),
      catchError(err => {
        console.error(err);
        return of(new DTO<BillData>());
      })
    );
  }

  public findOneById(id: number): Observable<BillData> {
    return ajax({
      method: "GET",
      url: this.getApiUrl() + "/" + id,
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => convertJSONToGenericBillOrQuoteData(res.response) as BillData));
  }

  public save(bill: BillData, draft: boolean = true): Observable<BillData> {
    return bill.id ? this.update(bill, draft) : this.create(bill, draft);
  }

  public create(bill: BillData, draft: boolean = true): Observable<BillData> {
    return ajax({
      method: "POST",
      url: this.getApiUrl(),
      headers: getAjaxRequestHeaders(),
      body: convertGenericBillOrQuoteDataToRequest(bill, draft)
    }).pipe(map((res: AjaxResponse) => convertJSONToGenericBillOrQuoteData(res.response) as BillData));
  }

  public update(bill: BillData, draft: boolean = true): Observable<BillData> {
    return ajax({
      method: "PUT",
      url: this.getApiUrl() + "/" + bill.id?.toString(),
      headers: getAjaxRequestHeaders(),
      body: convertGenericBillOrQuoteDataToRequest(bill, draft)
    }).pipe(map((res: AjaxResponse) => convertJSONToGenericBillOrQuoteData(res.response) as BillData));
  }

  public accept(billId: number): Observable<BillData> {
    return ajax({
      method: "PATCH",
      url: this.getApiUrl() + "/" + billId + "/accept",
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => convertJSONToGenericBillOrQuoteData(res.response) as BillData));
  }

  public send(billId: number): Observable<BillData> {
    return ajax({
      method: "PATCH",
      url: this.getApiUrl() + "/" + billId + "/send",
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => convertJSONToGenericBillOrQuoteData(res.response) as BillData));
  }

  public cancel(billId: number): Observable<BillData> {
    return ajax({
      method: "PATCH",
      url: this.getApiUrl() + "/" + billId + "/cancel",
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => convertJSONToGenericBillOrQuoteData(res.response) as BillData));
  }

  public createFromQuote(quote: QuoteData): Observable<BillData> {
    return ajax({
      method: "POST",
      url: this.getApiUrl() + "/from-quote",
      headers: getAjaxRequestHeaders(),
      body: { ...convertGenericBillOrQuoteDataToRequest(quote), quoteId: quote.id }
    }).pipe(map((res: AjaxResponse) => convertJSONToGenericBillOrQuoteData(res.response) as BillData));
  }
}
