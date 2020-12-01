import { HttpClient } from "./HttpClient";
import { QUOTE_SERVICE, INSTANCE_URL } from "../constants";
import { QuoteData } from "../models/QuoteData";
import { map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { DTO } from "../models/DTO";
import moment from "moment";
import { QuoteRequest } from "../models/ApiRequests/QuoteRequest";
import { QuoteLineRequest } from "../models/ApiRequests/QuoteLineRequest";

export class QuoteApi {
  private static INSTANCE = new QuoteApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  public getApiUrl() {
    return sessionStorage.getItem(INSTANCE_URL) + "/" + QUOTE_SERVICE;
  }

  public findAll() {
    return HttpClient.GET(this.getApiUrl() + "/api/quotes").pipe(
      map((res: any) => {
        const dto = res as DTO<QuoteData>;
        dto.items = dto.items.map(item => this.convertJSONToQuoteData(item));
        return dto;
      }),
      catchError(err => {
        console.error(err);
        return of(new DTO<QuoteData>());
      })
    );
  }

  public findOneById(id: number) {
    return HttpClient.GET(this.getApiUrl() + "/api/quotes/" + id.toString()).pipe(map((res: any) => this.convertJSONToQuoteData(res as QuoteData)));
  }

  public save(quote: QuoteData, draft: boolean = true): Observable<QuoteData> {
    return quote.id ? this.update(quote, draft) : this.create(quote, draft);
  }

  public create(quote: QuoteData, draft: boolean = true): Observable<QuoteData> {
    return HttpClient.POST(this.getApiUrl() + "/api/quotes", this.convertQuoteDataToRequest(quote, draft)).pipe(map((res: any) => this.convertJSONToQuoteData(res as QuoteData)));
  }

  public update(quote: QuoteData, draft: boolean = true): Observable<QuoteData> {
    return HttpClient.PUT(this.getApiUrl() + "/api/quotes/" + quote.id?.toString(), this.convertQuoteDataToRequest(quote, draft)).pipe(
      map((res: any) => this.convertJSONToQuoteData(res as QuoteData))
    );
  }

  public accept(quoteId: number) {
    return HttpClient.PATCH(this.getApiUrl() + "/api/quotes/" + quoteId + "/accept").pipe(map((res: any) => this.convertJSONToQuoteData(res as QuoteData)));
  }

  public send(quoteId: number) {
    return HttpClient.PATCH(this.getApiUrl() + "/api/quotes/" + quoteId + "/send").pipe(map((res: any) => this.convertJSONToQuoteData(res as QuoteData)));
  }

  public cancel(quoteId: number) {
    return HttpClient.PATCH(this.getApiUrl() + "/api/quotes/" + quoteId + "/cancel").pipe(map((res: any) => this.convertJSONToQuoteData(res as QuoteData)));
  }

  public getPDF(quoteId: number) {
    return HttpClient.GET(this.getApiUrl() + "/api/quotes/" + quoteId + "/show-pdf");
  }

  private convertJSONToQuoteData(item: QuoteData) {
    item.createdAt = moment(item.createdAt);
    if (item.updatedAt) {
      item.updatedAt = moment(item.updatedAt);
    }
    return item;
  }

  private convertQuoteDataToRequest(quote: QuoteData, draft: boolean = true): QuoteRequest {
    return {
      lines: quote.lines.map((line, index) => ({ lineNumber: index + 1, description: line.description, preTaxPrice: line.preTaxPrice, quantity: line.quantity } as QuoteLineRequest)),
      draft,
      clientId: quote.clientId,
      tva: quote.tva
    };
  }
}
