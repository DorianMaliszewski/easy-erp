import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { UserData } from "../models/UserData";
import { DTO } from "../models/DTO";
import { of } from "rxjs";
import { HttpClient } from "./HttpClient";

export class UserApi {
  private static INSTANCE = new UserApi();

  public static getInstance() {
    return this.INSTANCE;
  }

  private getApiUrl() {
    return process.env.REACT_APP_OAUTH_SERVICE_URL + "/api/users";
  }

  public findAll() {
    return HttpClient.GET(this.getApiUrl()).pipe(
      map((res: any) => {
        const dto = res as DTO<UserData>;
        dto.items = dto.items.map(item => this.convertJSONToUserData(item));
        return dto;
      }),
      catchError(err => {
        console.error(err);
        return of(new DTO<UserData>());
      })
    );
  }

  public save(user: UserData): Observable<UserData> {
    return user.id ? this.update(user) : this.create(user);
  }

  public create(user: UserData): Observable<UserData> {
    return HttpClient.POST(this.getApiUrl(), this.convertJSONToUserData(user)).pipe(map((res: any) => this.convertJSONToUserData(res as UserData)));
  }

  public update(user: UserData): Observable<UserData> {
    return HttpClient.PUT(this.getApiUrl() + "/" + user.id?.toString(), this.convertJSONToUserData(user)).pipe(map((res: any) => this.convertJSONToUserData(res as UserData)));
  }

  private convertJSONToUserData(userJson: any): UserData {
    return userJson as UserData;
  }
}
