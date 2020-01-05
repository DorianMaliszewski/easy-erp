import { UserData } from "./UserData";

export class UserFormData extends UserData {
  confirmPassword: string;
  sendPasswordByEmail: boolean;
  roleId?: number;

  constructor() {
    super();
    this.confirmPassword = "";
    this.sendPasswordByEmail = true;
  }
}
