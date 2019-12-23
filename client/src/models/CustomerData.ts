import { Moment } from "moment";

export class CustomerData {
  name: string;
  contact?: string;
  phone: string;
  email: string;
  site: string;
  city: string;
  address: string;
  postalCode: string;
  enabled: boolean;
  deleted: boolean;
  createdBy?: number;
  id?: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  version?: number;

  constructor() {
    this.name = "";
    this.phone = "";
    this.email = "";
    this.site = "";
    this.city = "";
    this.address = "";
    this.postalCode = "";
    this.enabled = true;
    this.deleted = false;
  }
}
