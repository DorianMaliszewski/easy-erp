import React from "react";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { createClassesByPriorityId } from "./utils";
import styles from "./styles";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(styles);

const Appointment: React.FC<any> = ({ data, ...restProps }) => {
  const classes = useStyles();
  const priorityClasses = createClassesByPriorityId(data.priorityId, classes, { background: true, hover: true });
  return <Appointments.Appointment {...restProps} data={data} className={priorityClasses} />;
};

export default Appointment;
