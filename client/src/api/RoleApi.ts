import { Observable } from "rxjs";
import { HttpClient } from "./HttpClient";
import { RoleData } from "../models/RoleData";

const SERVICE_URL = process.env.REACT_APP_OAUTH_SERVICE_URL;

export class RoleApi {
  private static INSTANCE = new RoleApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  private getApiUrl() {
    return SERVICE_URL + "/api/roles";
  }

  public findAll(): Observable<RoleData[]> {
    return HttpClient.GET(this.getApiUrl());
  }
}
