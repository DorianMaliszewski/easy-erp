import { INSTANCE_URL, CLIENT_SERVICE } from "../constants";
import Axios from "axios";
import { CustomerData } from "../models/CustomerData";

const SERVICE_URL = sessionStorage.getItem(INSTANCE_URL) + "/" + CLIENT_SERVICE;

class CustomerApi {
  static findAll() {
    return Axios.get(SERVICE_URL + "/api/client").then(res => res.data);
  }

  static create(customer: CustomerData) {
    return Axios.post(SERVICE_URL + "/api/client").then(res => res.data);
  }
}

export default CustomerApi;
