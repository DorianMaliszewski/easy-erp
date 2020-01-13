import fetchIntercept from "fetch-intercept";
import { AUTH_TOKEN } from "../constants";

let unregister: any = null;

export function initInterceptor() {
  unregister = fetchIntercept.register({
    request: function(url, config) {
      // Modify the url or config here

      if (localStorage.getItem(AUTH_TOKEN)) {
        if (config) {
          if (!config.headers) {
            config.headers = new Headers();
            config.headers.append("Content-Type", "application/json");
          }
          config.headers.append("Authorization", "Bearer " + localStorage.getItem(AUTH_TOKEN));
        }
      }

      if (config && config.body && config.headers.get("Content-Type") === "application/json") {
        config.body = JSON.stringify(config.body);
      }

      return [url, config];
    },

    requestError: function(error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: function(response) {
      // Modify the reponse object
      return response;
    },

    responseError: function(error) {
      // Handle an fetch error
      return Promise.reject(error);
    }
  });
}

export function destroyInterceptor() {
  // Unregister your interceptor
  if (unregister) unregister();
}
