import { map } from "rxjs/operators";
import { TenantData } from "../models/TenantData";
import { Observable } from "rxjs";
import { HttpClient } from "./HttpClient";

export class TenantApi {
  private static INSTANCE = new TenantApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  private getApiUrl() {
    return process.env.REACT_APP_OAUTH_SERVICE_URL + "/api/tenant";
  }

  public findMine() {
    return HttpClient.GET(this.getApiUrl() + "/mine").pipe(map(res => this.convertJSONToTenantData(res)));
  }

  public save(tenant: TenantData): Observable<TenantData> {
    return tenant.id ? this.update(tenant) : this.create(tenant);
  }

  public create(tenant: TenantData): Observable<TenantData> {
    return HttpClient.POST(this.getApiUrl(), this.convertJSONToTenantData(tenant)).pipe(map(res => this.convertJSONToTenantData(res as TenantData)));
  }

  public update(tenant: TenantData): Observable<TenantData> {
    return HttpClient.PUT(this.getApiUrl() + "/" + tenant.id?.toString(), this.convertJSONToTenantData(tenant)).pipe(map(res => this.convertJSONToTenantData(res as TenantData)));
  }

  private convertJSONToTenantData(tenantJson: any): TenantData {
    return tenantJson as TenantData;
  }
}
