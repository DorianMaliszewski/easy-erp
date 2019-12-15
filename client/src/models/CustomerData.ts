export class CustomerData {
  name: string;
  contact?: number;
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
  createdAt?: Date;
  updatedAt?: Date;
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