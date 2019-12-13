import React from "react";
import { Toolbar } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core";
import AppointmentTypeSelector from "./AppointmentTypeSelector";
import styles from "./styles";

const FlexibleSpace = ({ classes, type, typeChange, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <AppointmentTypeSelector type={type} typeChange={typeChange} />
  </Toolbar.FlexibleSpace>
);

export default withStyles(styles, { name: "FlexibleSpace" })(FlexibleSpace);
