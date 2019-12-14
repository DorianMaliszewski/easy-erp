import React from "react";
import { Toolbar } from "@devexpress/dx-react-scheduler-material-ui";
import AppointmentTypeSelector from "./AppointmentTypeSelector";
import styles from "./styles";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(styles);

const FlexibleSpace: React.FC<any> = ({ type, typeChange, ...restProps }) => {
  const classes = useStyles();
  return (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <AppointmentTypeSelector type={type} typeChange={typeChange} />
    </Toolbar.FlexibleSpace>
  );
};

export default FlexibleSpace;
