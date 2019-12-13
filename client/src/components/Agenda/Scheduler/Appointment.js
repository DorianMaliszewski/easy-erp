import React from "react";
import { withStyles } from "@material-ui/core";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import styles from "./styles";
import { createClassesByPriorityId } from "./utils";

const Appointment = ({ classes, data, ...restProps }) => {
  const priorityClasses = createClassesByPriorityId(data.priorityId, classes, { background: true, hover: true });
  return <Appointments.Appointment {...restProps} data={data} className={priorityClasses} />;
};

export default withStyles(styles, { name: "Appointment" })(Appointment);
