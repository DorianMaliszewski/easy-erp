import React from "react";
import GroupIcon from "@material-ui/icons/Group";
import CallIcon from "@material-ui/icons/Call";
import Event from "@material-ui/icons/Event";
import { ListItem, Avatar, ListItemText } from "@material-ui/core";
import moment from "moment";

const SchedulerListItem: React.FC<any> = props => {
  const { appointmentData } = props;

  const secondaryText = moment(appointmentData.startDate, "YYYY-MM-DD HH:mm").format("HH[h]mm") + "-" + moment(appointmentData.endDate, "YYYY-MM-DD HH:mm").format("HH[h]mm");
  let icon = <GroupIcon style={{ color: "#81c784" }} />;
  if (appointmentData.priorityId === 2) icon = <Event style={{ color: "#4fc3f7" }} />;
  else if (appointmentData.priorityId === 3) icon = <CallIcon style={{ color: "#ff8a65" }} />;
  return (
    <ListItem button>
      <Avatar style={{ backgroundColor: "transparent" }}>{icon}</Avatar>
      <ListItemText primary={appointmentData.title} secondary={secondaryText} />
    </ListItem>
  );
};

export default SchedulerListItem;
