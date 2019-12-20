import { INSTANCE_URL, CLIENT_SERVICE } from "../constants";

//Models
import { CustomerData } from "../models/CustomerData";
import { DTO } from "../models/DTO";

// Rxjs
import { Observable } from "rxjs/internal/Observable";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import Axios from "axios";
import { getAjaxRequestHeaders } from ".";

class CustomerApi {
  private static SINGLETON = new CustomerApi();

  private getServiceUrl() {
    return sessionStorage.getItem(INSTANCE_URL) + "/" + CLIENT_SERVICE;
  }

  public static getInstance() {
    return this.SINGLETON;
  }

  public findAll(): Observable<DTO<CustomerData>> {
    return ajax({
      url: this.getServiceUrl() + "/api/clients",
      method: "GET",
      headers: getAjaxRequestHeaders()
    }).pipe(
      map((res: AjaxResponse) => res.response as DTO<CustomerData>),
      catchError(error => {
        console.error(error);
        return of(new DTO<CustomerData>());
      })
    );
  }

  public findOneById(id: number): Observable<CustomerData> {
    return ajax({
      url: this.getServiceUrl() + "/api/clients/" + id.toString(),
      method: "GET",
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => res.response as CustomerData));
  }

  public create(customer: CustomerData) {
    return ajax({
      url: this.getServiceUrl() + "/api/clients/",
      method: "POST",
      headers: getAjaxRequestHeaders(),
      body: customer
    }).pipe(map((res: AjaxResponse) => res.response as CustomerData));
  }
}

export default CustomerApi;
