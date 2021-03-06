import Axios from "axios";
import { REFRESH_TOKEN } from "../constants";

const SERVICE_URL = process.env.REACT_APP_OAUTH_SERVICE_URL;

export const login = (username:string, password:string) => {
  let form = new FormData();
  form.append("grant_type", "password");
  form.append("username", username);
  form.append("password", password);
  return Axios.post(SERVICE_URL + "/oauth/token", form, {
    headers: {
      Authorization: "Basic " + process.env.REACT_APP_CLIENT_CREDENTIAL,
      "Content-Type": "application/www-form-urlencoded"
    }
  }).then(response => response.data);
}

export const refreshToken = () => {
  let form = new FormData();
  form.append("grant_type", "refresh_token");
  form.append("refresh_token", localStorage.getItem(REFRESH_TOKEN) as string);
  return Axios.post(SERVICE_URL + "/oauth/token", form, {
    headers: {
      Authorization: "Basic " + process.env.REACT_APP_CLIENT_CREDENTIAL,
      "Content-Type": "application/www-form-urlencoded"
    }
  }).then(response => response.data);
}
