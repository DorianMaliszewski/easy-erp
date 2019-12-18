import { ajax, AjaxResponse } from "rxjs/ajax";
import { getAjaxRequestHeaders } from "./index";
import { map } from "rxjs/operators";
import { TenantData } from "../models/TenantData";
import { Observable } from "rxjs";

export class TenantApi {
  private static INSTANCE = new TenantApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  private getApiUrl() {
    return process.env.REACT_APP_OAUTH_SERVICE_URL + "/api/tenant";
  }

  public findMine() {
    return ajax({
      method: "GET",
      url: this.getApiUrl() + "/mine",
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => this.convertJSONToTenantData(res.response)));
  }

  public save(tenant: TenantData): Observable<TenantData> {
    return tenant.id ? this.update(tenant) : this.create(tenant);
  }

  public create(tenant: TenantData): Observable<TenantData> {
    return ajax({
      method: "POST",
      url: this.getApiUrl(),
      headers: getAjaxRequestHeaders(),
      body: this.convertJSONToTenantData(tenant)
    }).pipe(map((res: AjaxResponse) => this.convertJSONToTenantData(res.response as TenantData)));
  }

  public update(tenant: TenantData): Observable<TenantData> {
    return ajax({
      method: "PUT",
      url: this.getApiUrl() + "/" + tenant.id?.toString(),
      headers: getAjaxRequestHeaders(),
      body: this.convertJSONToTenantData(tenant)
    }).pipe(map((res: AjaxResponse) => this.convertJSONToTenantData(res.response as TenantData)));
  }

  private convertJSONToTenantData(tenantJson: any): TenantData {
    return tenantJson as TenantData;
  }
}
