import { fromFetch } from "rxjs/fetch";
import { switchMap } from "rxjs/operators";
import { throwError } from "rxjs";

export class HttpClient {
  static GET(url: string) {
    return fromFetch(url, {
      method: "GET"
    }).pipe(switchMap(response => (response.ok ? this.convertResponse(response) : throwError({ error: true, message: `Error ${response.status}` }))));
  }

  static POST(url: string, body?: any) {
    return fromFetch(url, {
      method: "POST",
      body
    }).pipe(switchMap(response => (response.ok ? this.convertResponse(response) : throwError({ error: true, message: `Error ${response.status}` }))));
  }

  static PATCH(url: string, body?: any) {
    return fromFetch(url, {
      method: "PATCH",
      body
    }).pipe(switchMap(response => (response.ok ? this.convertResponse(response) : throwError({ error: true, message: `Error ${response.status}` }))));
  }

  static PUT(url: string, body?: any, headers?: any) {
    return fromFetch(url, {
      method: "PUT",
      headers,
      body
    }).pipe(switchMap(response => (response.ok ? this.convertResponse(response) : throwError({ error: true, message: `Error ${response.status}` }))));
  }

  private static convertResponse(response: Response) {
    var contentType = response.headers.get("content-type");
    if (contentType) {
      if (contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else if (contentType.indexOf("application/octet-stream") !== -1 || contentType.indexOf("application/pdf") !== -1) {
        return response.blob();
      }
    }

    return response.text();
  }
}
