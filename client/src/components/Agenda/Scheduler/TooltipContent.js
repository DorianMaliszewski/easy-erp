import React from "react";
import { withStyles, ListItemText, ListItemIcon, ListItem, List } from "@material-ui/core";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import AccessTime from "@material-ui/icons/AccessTime";
import GroupIcon from "@material-ui/icons/Group";
import CallIcon from "@material-ui/icons/Call";
import Event from "@material-ui/icons/Event";
import styles from "./styles";
import moment from "moment";
import { getPriorityById, createClassesByPriorityId } from "./utils";

const TooltipContent = ({ classes, appointmentData, ...restProps }) => {
  const priority = getPriorityById(appointmentData.priorityId);
  const priorityClasses = createClassesByPriorityId(appointmentData.priorityId, classes, { color: true });
  let icon = <GroupIcon />;
  if (appointmentData.priorityId === 2) icon = <Event />;
  else if (appointmentData.priorityId === 3) icon = <CallIcon />;
  return (
    <AppointmentTooltip.Content {...restProps} className={classes.tooltipContent}>
      <List>
        <ListItem className={classes.contentItem}>
          <ListItemIcon className={`${classes.contentItemIcon} ${priorityClasses}`}>{icon}</ListItemIcon>
          <ListItemText className={classes.contentItemValue}>
            <span className={priorityClasses}>{` ${priority}`}</span>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.contentItem}>
          <ListItemIcon className={`${classes.contentItemIcon}`}>
            <AccessTime />
          </ListItemIcon>
          <ListItemText className={classes.contentItemValue}>
            {moment(appointmentData.startDate).format("H:mm")}
            {" - "}
            {moment(appointmentData.endDate).format("H:mm")}
          </ListItemText>
        </ListItem>
      </List>
    </AppointmentTooltip.Content>
  );
};

export default withStyles(styles, { name: "TooltipContent" })(TooltipContent);
