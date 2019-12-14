import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import QuoteActivityListItem from "./QuoteActivityListItem";

const QuoteActivityList: React.FC<any> = ({ quotes }) => {
  return (
    <List component="nav">
      {quotes.map((quote: any) => (
        <QuoteActivityListItem key={quote.id} quote={quote} />
      ))}
    </List>
  );
};

QuoteActivityList.propTypes = {
  quotes: PropTypes.array.isRequired
};

export default QuoteActivityList;
