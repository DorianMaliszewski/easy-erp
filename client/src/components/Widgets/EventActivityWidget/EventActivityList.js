import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import EventActivityListItem from "./EventActivityListItem";

const EventActivityList = ({ events }) => {
  return (
    <List>
      {events.map(quote => (
        <EventActivityListItem key={quote.id} quote={quote} />
      ))}
    </List>
  );
};

EventActivityList.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventActivityList;
