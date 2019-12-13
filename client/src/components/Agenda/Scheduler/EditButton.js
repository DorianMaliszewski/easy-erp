import React from "react";
import { withStyles } from "@material-ui/core";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import styles from "./styles";

const EditButton = ({ classes, id, ...restProps }) => <AppointmentTooltip.CommandButton {...restProps} {...(id === "open" ? { className: "edit-button" } : null)} id={id} />;

export default withStyles(styles, { name: "EditButton" })(EditButton);
