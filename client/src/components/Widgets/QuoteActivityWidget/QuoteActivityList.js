import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import QuoteActivityListItem from "./QuoteActivityListItem";

const QuoteActivityList = ({ quotes }) => {
  return (
    <List component="nav">
      {quotes.map(quote => (
        <QuoteActivityListItem key={quote.id} quote={quote} />
      ))}
    </List>
  );
};

QuoteActivityList.propTypes = {
  quotes: PropTypes.array.isRequired
};

export default QuoteActivityList;
