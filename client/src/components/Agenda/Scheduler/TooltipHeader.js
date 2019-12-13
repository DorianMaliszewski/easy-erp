import React from "react";
import { withStyles } from "@material-ui/core";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import styles from "./styles";
import { createClassesByPriorityId } from "./utils";

const TooltipHeader = ({ classes, appointmentData, ...restProps }) => {
  const priorityClasses = createClassesByPriorityId(appointmentData.priorityId, classes, { background: true });
  return <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData} className={priorityClasses} />;
};

export default withStyles(styles, { name: "TooltipHeader" })(TooltipHeader);
