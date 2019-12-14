import Axios from "axios";
import { handleApiError } from ".";
import { QUOTE_SERVICE, INSTANCE_URL } from "../constants";
import { QuoteData } from "../models/QuoteData";

const API_URL = sessionStorage.getItem(INSTANCE_URL) + "/" + QUOTE_SERVICE;

export class QuoteApi {
  static create(quote: QuoteData) {
    return Axios.post(API_URL + "/api/quotes", quote)
      .then(res => res.data)
      .catch(handleApiError("Erreur lors de la création d'un devis", {}));
  }
}
