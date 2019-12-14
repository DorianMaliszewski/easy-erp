import React, { useState } from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import QuoteStatusIcon, { QUOTE_STATUS } from "../../Quotes/QuoteStatusIcon";
import moment from "moment";
import QuoteDetailDialog from "../../Quotes/QuoteDetailDialog";

const QuoteActivityListItem: React.FC<any> = ({ quote }) => {
  const [openDetail, setOpenDetail] = useState(false);

  const getActivityText = () => {
    return "Devis n°" + quote.id + " pour " + quote.client + " " + getActivityStatustext(quote);
  };

  const getSinceTimeActivity = () => {
    return moment(quote.updateAt).fromNow();
  };

  const showQuoteDetail = (e: any) => {
    setOpenDetail(true);
  };

  return (
    <>
      <ListItem button onClick={showQuoteDetail}>
        <ListItemIcon>
          <QuoteStatusIcon status={quote.status} />
        </ListItemIcon>
        <ListItemText primary={getActivityText()} secondary={getSinceTimeActivity()} />
      </ListItem>
      {openDetail && <QuoteDetailDialog open={openDetail} quote={quote} closeModal={(e: any) => setOpenDetail(false)} />}
    </>
  );
};

const getActivityStatustext = (quote: any) => {
  switch (quote.status) {
    case QUOTE_STATUS.WAITING_CUSTOMER.enum:
      return "à été envoyé";
    case QUOTE_STATUS.ACCEPTED.enum:
      return "à été accepté";
    case QUOTE_STATUS.CANCELED.enum:
      return "à été refusé";
    default:
      return "activité inconnue";
  }
};

QuoteActivityListItem.propTypes = {
  quote: PropTypes.object.isRequired
};

export default QuoteActivityListItem;
