import { fromFetch } from "rxjs/fetch";
import { switchMap } from "rxjs/operators";
import { throwError } from "rxjs";

export class HttpClient {
  static GET(url: string) {
    return fromFetch(url, {
      method: "GET"
    }).pipe(switchMap(response => (response.ok ? response.json() : throwError({ error: true, message: `Error ${response.status}` }))));
  }

  static POST(url: string, body?: any) {
    return fromFetch(url, {
      method: "POST",
      body
    }).pipe(switchMap(response => (response.ok ? response.json() : throwError({ error: true, message: `Error ${response.status}` }))));
  }

  static PATCH(url: string, body?: any) {
    return fromFetch(url, {
      method: "PATCH",
      body
    }).pipe(switchMap(response => (response.ok ? response.json() : throwError({ error: true, message: `Error ${response.status}` }))));
  }

  static PUT(url: string, body?: any) {
    return fromFetch(url, {
      method: "PUT",
      body
    }).pipe(switchMap(response => (response.ok ? response.json() : throwError({ error: true, message: `Error ${response.status}` }))));
  }
}
