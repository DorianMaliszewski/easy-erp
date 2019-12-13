import React, { useState } from "react";
import { withStyles, withWidth } from "@material-ui/core";
import { tasks } from "./Scheduler/test_data";
import { isWidthUp } from "@material-ui/core/withWidth";
import SchedulerList from "./SchedulerList/SchedulerList";
import Scheduler from "./Scheduler/Scheduler";

const AgendaScheduler = props => {
  const [currentDate, setCurrentDate] = useState("2019-04-23");
  const [currentViewName, setCurrentViewName] = useState("Jour");
  const [data] = useState(tasks);
  const [currentType, setCurrentType] = useState(0);

  const currentViewNameChange = viewName => {
    setCurrentViewName(viewName);
  };
  const currentDateChange = date => {
    setCurrentDate(date);
  };

  const state = { currentDate, currentDateChange, currentViewNameChange, data, currentType, setCurrentType, currentViewName };

  return isWidthUp("sm", props.width) ? <Scheduler {...state} /> : <SchedulerList {...state} />;
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

export default withWidth()(withStyles(styles)(AgendaScheduler));
