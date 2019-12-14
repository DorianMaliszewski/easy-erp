import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import EventActivityListItem from "./EventActivityListItem";

const EventActivityList: React.FC<any> = ({ events }) => {
  return (
    <List>
      {events.map((event: any) => (
        <EventActivityListItem key={event.id} event={event} />
      ))}
    </List>
  );
};

EventActivityList.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventActivityList;
