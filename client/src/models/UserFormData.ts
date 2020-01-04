import { UserData } from "./UserData";

export class UserFormData extends UserData {
  confirmPassword: string;
  sendPasswordByEmail: boolean;
  constructor() {
    super();
    this.confirmPassword = "";
    this.sendPasswordByEmail = true;
  }
}
