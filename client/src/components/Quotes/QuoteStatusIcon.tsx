import React from "react";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import SendIcon from "@material-ui/icons/Send";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";

export const QUOTE_STATUS = {
  DRAFT: { enum: "DRAFT", text: "Brouillon", weight: 0, icon: <EditIcon /> },
  NEED_CONFIRMATION: {
    enum: "NEED_CONFIRMATION",
    text: "En attente de confirmation",
    weight: 1,
    icon: <VpnKeyIcon style={{ color: "#ffc107" }} />
  },
  WAITING_CUSTOMER: { enum: "WAITING_CUSTOMER", text: "En attente client", weight: 2, icon: <SendIcon style={{ color: "#2196f3" }} /> },
  ACCEPTED: { enum: "ACCEPTED", text: "Accepté / Terminé", weight: 3, icon: <CheckIcon style={{ color: "green" }} /> },
  CANCELED: { enum: "CANCELED", text: "Annulé / Refusé", weight: 4, icon: <CancelIcon color="error" /> }
};

const QuoteStatusIcon: React.FC<any> = props => {
  let status = Object.values(QUOTE_STATUS).find(s => s.enum === props.status);
  return status ? status.icon : <ErrorIcon />;
};

QuoteStatusIcon.propTypes = {
  status: PropTypes.string.isRequired
};

export default QuoteStatusIcon;
