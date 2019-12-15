import { AUTH_TOKEN } from "../constants";

export function handleApiError(description: string, defaultValue: any) {
  return (err: any) => {
    console.log(description, err);
  };
}

export function getAjaxRequestHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN)
  };
}
