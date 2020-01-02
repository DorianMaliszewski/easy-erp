export const AUTH_TOKEN = "AUTH_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const INSTANCE_URL = "INSTANCE_URL";

export const CLIENT_SERVICE = "client-service";
export const QUOTE_SERVICE = "quote-service";
export const BILL_SERVICE = "bill-service";

export const MESSAGES = {
  CONFIRM_DELETE_CUSTOMER: "Etes-vous sur de vouloir supprimer ce client ?",
  MODALS_MESSAGES: {
    SEND_QUOTE: {
      title: "Confirmation d'envoi",
      message: "Êtes-vous sûr de vouloir envoyer le devis ?"
    },
    ACCEPT_QUOTE: {
      title: "Confirmation d'acception",
      message: "Êtes-vous sûr d'accepter le devis ?"
    },
    CANCEL_QUOTE: {
      title: "Confirmation d'annulation",
      message: "Êtes-vous sûr d'annuler le devis ?"
    },
    CREATE_BILL_FROM_QUOTE: {
      title: "Confirmation de création",
      message: "Êtes-vous sûr de vouloir créer une facture depuis ce devis ?"
    },
    SEND_BILL: {
      title: "Confirmation d'envoi",
      message: "Êtes-vous sûr de vouloir envoyer la facture ?"
    },
    ACCEPT_BILL: {
      title: "Confirmation d'acception",
      message: "Êtes-vous sûr d'accepter la facture ?"
    },
    CANCEL_BILL: {
      title: "Confirmation d'annulation",
      message: "Êtes-vous sûr d'annuler la facture ?"
    },
    PAYED_BILL: {
      title: "Confirmation de paiement",
      message: "Êtes-vous sûr de vouloir considérer cette facture comme payée ?"
    }
  }
};
