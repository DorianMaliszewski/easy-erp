import { BILL_SERVICE, INSTANCE_URL } from "../constants";
import { map, catchError } from "rxjs/operators";
import { DTO } from "../models/DTO";
import { BillData } from "../models/BillData";
import { of, Observable } from "rxjs";
import { QuoteData } from "../models/QuoteData";
import { convertGenericBillOrQuoteDataToRequest, convertJSONToGenericBillOrQuoteData } from "../utils/utils";
import { HttpClient } from "./HttpClient";

export class BillApi {
  private static INSTANCE = new BillApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  public getApiUrl() {
    return sessionStorage.getItem(INSTANCE_URL) + "/" + BILL_SERVICE + "/api/bills";
  }

  public findAll() {
    return HttpClient.GET(this.getApiUrl()).pipe(
      map((res: any) => {
        const dto = res as DTO<BillData>;
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
    return HttpClient.GET(this.getApiUrl() + "/" + id).pipe(map((res: any) => convertJSONToGenericBillOrQuoteData(res) as BillData));
  }

  public save(bill: BillData, draft: boolean = true): Observable<BillData> {
    return bill.id ? this.update(bill, draft) : this.create(bill, draft);
  }

  public create(bill: BillData, draft: boolean = true): Observable<BillData> {
    return HttpClient.POST(this.getApiUrl(), convertGenericBillOrQuoteDataToRequest(bill, draft)).pipe(map((res: any) => convertJSONToGenericBillOrQuoteData(res) as BillData));
  }

  public update(bill: BillData, draft: boolean = true): Observable<BillData> {
    return HttpClient.PUT(this.getApiUrl() + "/" + bill.id?.toString(), convertGenericBillOrQuoteDataToRequest(bill, draft)).pipe(
      map((res: any) => convertJSONToGenericBillOrQuoteData(res) as BillData)
    );
  }

  public accept(billId: number): Observable<BillData> {
    return HttpClient.PATCH(this.getApiUrl() + "/" + billId + "/accept").pipe(map((res: any) => convertJSONToGenericBillOrQuoteData(res) as BillData));
  }

  public send(billId: number): Observable<BillData> {
    return HttpClient.PATCH(this.getApiUrl() + "/" + billId + "/send").pipe(map((res: any) => convertJSONToGenericBillOrQuoteData(res) as BillData));
  }

  public cancel(billId: number): Observable<BillData> {
    return HttpClient.PATCH(this.getApiUrl() + "/" + billId + "/cancel").pipe(map((res: any) => convertJSONToGenericBillOrQuoteData(res) as BillData));
  }

  public payed(billId: number): Observable<BillData> {
    return HttpClient.PATCH(this.getApiUrl() + "/" + billId + "/payed").pipe(map((res: any) => convertJSONToGenericBillOrQuoteData(res) as BillData));
  }

  public createFromQuote(quote: QuoteData): Observable<BillData> {
    return HttpClient.POST(this.getApiUrl() + "/from-quote", { ...convertGenericBillOrQuoteDataToRequest(quote), quoteId: quote.id }).pipe(
      map((res: any) => convertJSONToGenericBillOrQuoteData(res) as BillData)
    );
  }

  public getPDF(billId: number) {
    return HttpClient.GET(this.getApiUrl() + "/" + billId + "/show-pdf");
  }
}
