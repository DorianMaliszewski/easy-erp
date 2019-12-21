import { INSTANCE_URL, CLIENT_SERVICE } from "../constants";

//Models
import { CustomerData } from "../models/CustomerData";
import { DTO } from "../models/DTO";

// Rxjs
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import { map, catchError, first } from "rxjs/operators";
import { HttpClient } from "./HttpClient";

class CustomerApi {
  private static SINGLETON = new CustomerApi();
  private getServiceUrl() {
    return sessionStorage.getItem(INSTANCE_URL) + "/" + CLIENT_SERVICE;
  }

  public static getInstance() {
    return this.SINGLETON;
  }

  public findAll(): Observable<DTO<CustomerData>> {
    return HttpClient.GET(this.getServiceUrl() + "/api/clients").pipe(
      first(),
      catchError(error => {
        console.error(error);
        return of(new DTO<CustomerData>());
      })
    );
  }

  public findOneById(id: number): Observable<CustomerData> {
    return HttpClient.GET(this.getServiceUrl() + "/api/clients/" + id.toString());
  }

  public save(customer: CustomerData): Observable<CustomerData> {
    return customer.id ? this.update(customer) : this.create(customer);
  }

  public create(customer: CustomerData): Observable<CustomerData> {
    return HttpClient.POST(this.getServiceUrl() + "/api/clients/", customer);
  }

  public update(customer: CustomerData): Observable<CustomerData> {
    return HttpClient.PUT(this.getServiceUrl() + "/api/clients/" + customer.id, customer);
  }
}

export default CustomerApi;
