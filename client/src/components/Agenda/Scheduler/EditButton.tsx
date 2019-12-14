import React from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

const EditButton: React.FC<any> = ({ id, ...restProps }) => {
  return <AppointmentTooltip.CommandButton {...restProps} {...(id === "open" ? { className: "edit-button" } : null)} id={id} />;
};

export default EditButton;
