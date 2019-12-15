import { BILL_SERVICE, INSTANCE_URL } from "../constants";
import { getAjaxRequestHeaders, handleApiError } from ".";
import { AjaxResponse, ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { DTO } from "../models/DTO";
import { BillData } from "../models/BillData";
import Axios from "axios";
import { of } from "rxjs";
import moment from "moment";

export class BillApi {
  private static INSTANCE = new BillApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  private getApiUrl() {
    return sessionStorage.getItem(INSTANCE_URL) + "/" + BILL_SERVICE;
  }

  public findAll() {
    return ajax({
      method: "GET",
      url: this.getApiUrl() + "/api/bills",
      headers: getAjaxRequestHeaders()
    }).pipe(
      map((res: AjaxResponse) => {
        const dto = res.response as DTO<BillData>;
        dto.items = dto.items.map(item => this.convertJSONtoBillData(item));
        return dto;
      }),
      catchError(err => {
        console.error(err);
        return of(new DTO<BillData>());
      })
    );
  }

  public findOneById(id: number) {
    return ajax({
      method: "GET",
      url: this.getApiUrl() + "/api/bills/" + id,
      headers: getAjaxRequestHeaders()
    }).pipe(map((res: AjaxResponse) => this.convertJSONtoBillData(res.response as BillData)));
  }

  public create(bill: BillData) {
    return Axios.post(this.getApiUrl() + "/api/bills", bill)
      .then(res => res.data)
      .catch(handleApiError("Erreur lors de la création d'une facture", {}));
  }

  private convertJSONtoBillData(bill: BillData) {
    bill.createdAt = moment(bill.createdAt);
    if (bill.updatedAt) {
      bill.updatedAt = moment(bill.updatedAt);
    }
    return bill;
  }
}
