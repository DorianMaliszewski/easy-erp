import React, { useState } from "react";
import { Theme, useMediaQuery } from "@material-ui/core";
import { tasks } from "./Scheduler/test_data";
import SchedulerList from "./SchedulerList/SchedulerList";
import Scheduler from "./Scheduler/Scheduler";

const AgendaScheduler: React.FC<any> = props => {
  const [currentDate, setCurrentDate] = useState("2019-04-23");
  const [currentViewName, setCurrentViewName] = useState("Jour");
  const [data] = useState(tasks);
  const [currentType, setCurrentType] = useState(0);

  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const currentViewNameChange = (viewName: string) => {
    setCurrentViewName(viewName);
  };
  const currentDateChange = (date: string) => {
    setCurrentDate(date);
  };

  const state = { currentDate, currentDateChange, currentViewNameChange, data, currentType, setCurrentType, currentViewName };

  return matches ? <Scheduler {...state} /> : <SchedulerList {...state} />;
};

export default AgendaScheduler;
