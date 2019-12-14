import React from "react";
import { ListItemText, ListItemIcon, ListItem, List, makeStyles } from "@material-ui/core";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import AccessTime from "@material-ui/icons/AccessTime";
import GroupIcon from "@material-ui/icons/Group";
import CallIcon from "@material-ui/icons/Call";
import Event from "@material-ui/icons/Event";
import moment from "moment";
import { getPriorityById, createClassesByPriorityId } from "./utils";
import styles from "./styles";

const useStyles = makeStyles(styles);

const TooltipContent: React.FC<any> = ({ appointmentData, ...restProps }) => {
  const classes = useStyles();
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

export default TooltipContent;
