import { UserData } from "./UserData";

export class TenantData {
  id?: number;
  name: string;
  phone?: string;
  email: string;
  site?: string;
  address: string;
  logo?: string;
  postalCode: string;
  instanceUrl: string;

  mainUser: UserData;
  users?: UserData[];

  constructor() {
    this.name = "";
    this.email = "";
    this.address = "";
    this.postalCode = "";
    this.instanceUrl = "";
    this.mainUser = new UserData();
  }
}
