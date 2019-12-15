import Axios from "axios";
import { handleApiError, getAjaxRequestHeaders } from ".";
import { QUOTE_SERVICE, INSTANCE_URL, AUTH_TOKEN } from "../constants";
import { QuoteData } from "../models/QuoteData";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { DTO } from "../models/DTO";

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
      map((res: AjaxResponse) => res.response as DTO<QuoteData>),
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
    }).pipe(map((res: AjaxResponse) => res.response as QuoteData));
  }

  public create(quote: QuoteData) {
    return Axios.post(this.getApiUrl() + "/api/quotes", quote)
      .then(res => res.data)
      .catch(handleApiError("Erreur lors de la création d'un devis", {}));
  }
}
