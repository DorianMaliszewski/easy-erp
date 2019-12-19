import { getAjaxRequestHeaders } from ".";
import { QUOTE_SERVICE, INSTANCE_URL } from "../constants";
import { QuoteData } from "../models/QuoteData";
import { ajax, AjaxResponse } from "rxjs/ajax";
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

  private getApiUrl() {
    return sessionStorage.getItem(INSTANCE_URL) + "/" + QUOTE_SERVICE;
  }

  public findAll() {
    return ajax({
      method: "GET",
      url: this.getApiUrl() + "/api/quotes",
      headers: getAjaxRequestHeaders()
    }).pipe(
      map((res: AjaxResponse) => {
        const dto = res.response as DTO<QuoteData>;
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
    return ajax({
      method: "GET",
      url: this.getApiUrl() + "/api/quotes/" + id.toString(),
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => this.convertJSONToQuoteData(res.response as QuoteData)));
  }

  public save(quote: QuoteData, draft: boolean = true): Observable<QuoteData> {
    return quote.id ? this.update(quote, draft) : this.create(quote, draft);
  }

  public create(quote: QuoteData, draft: boolean = true): Observable<QuoteData> {
    return ajax({
      method: "POST",
      url: this.getApiUrl() + "/api/quotes",
      headers: getAjaxRequestHeaders(),
      body: this.convertQuoteDataToRequest(quote, draft)
    }).pipe(map((res: AjaxResponse) => this.convertJSONToQuoteData(res.response as QuoteData)));
  }

  public update(quote: QuoteData, draft: boolean = true): Observable<QuoteData> {
    return ajax({
      method: "PUT",
      url: this.getApiUrl() + "/api/quotes/" + quote.id?.toString(),
      headers: getAjaxRequestHeaders(),
      body: this.convertQuoteDataToRequest(quote, draft)
    }).pipe(map((res: AjaxResponse) => this.convertJSONToQuoteData(res.response as QuoteData)));
  }

  public accept(quoteId: number) {
    return ajax({
      method: "PATCH",
      url: this.getApiUrl() + "/api/quotes/" + quoteId + "/accept",
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => this.convertJSONToQuoteData(res.response as QuoteData)));
  }

  public send(quoteId: number) {
    return ajax({
      method: "PATCH",
      url: this.getApiUrl() + "/api/quotes/" + quoteId + "/send",
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => this.convertJSONToQuoteData(res.response as QuoteData)));
  }

  public cancel(quoteId: number) {
    return ajax({
      method: "PATCH",
      url: this.getApiUrl() + "/api/quotes/" + quoteId + "/cancel",
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => this.convertJSONToQuoteData(res.response as QuoteData)));
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
