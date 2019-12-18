export class UserData {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    clientId: number;

    constructor() {
        this.username = "";
        this.password = "";
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.clientId = 0;
    }
}