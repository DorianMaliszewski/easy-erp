import { UserData } from "./UserData";

export class UserFormData extends UserData {
  confirmPassword: string;
  sendEmail: boolean;
  constructor() {
    super();
    this.confirmPassword = "";
    this.sendEmail = true;
  }
}
