import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import EventStatusIcon, { EVENT_STATUS } from "../../Events/EventStatusIcon";
import moment from "moment";

const EventActivityListItem = ({ event }) => {
  const getActivityText = () => {
    return "Devis n°" + event.id + " pour " + event.client + " " + getActivityStatustext(event);
  };

  const getSinceTimeActivity = () => {
    return moment(event.updateAt).fromNow();
  };

  return (
    <ListItem>
      <ListItemIcon>
        <EventStatusIcon status={event.status} />
      </ListItemIcon>
      <ListItemText primary={getActivityText()} secondary={getSinceTimeActivity()} />
    </ListItem>
  );
};

const getActivityStatustext = event => {
  switch (event.status) {
    case EVENT_STATUS.WAITING_CUSTOMER.enum:
      return "à été envoyé";
    case EVENT_STATUS.ACCEPTED.enum:
      return "à été accepté";
    case EVENT_STATUS.CANCELED.enum:
      return "à été refusé";
    default:
      return "activité inconnue";
  }
};

EventActivityListItem.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventActivityListItem;
