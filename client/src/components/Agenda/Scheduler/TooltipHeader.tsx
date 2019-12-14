import React from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { createClassesByPriorityId } from "./utils";
import styles from "./styles";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(styles);

const TooltipHeader: React.FC<any> = ({ appointmentData, ...restProps }) => {
  const classes = useStyles();
  const priorityClasses = createClassesByPriorityId(appointmentData.priorityId, classes, { background: true });
  return <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData} className={priorityClasses} />;
};

export default TooltipHeader;
