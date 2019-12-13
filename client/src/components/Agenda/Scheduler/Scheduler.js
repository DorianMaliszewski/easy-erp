import React, { useEffect } from "react";
import { Scheduler, DayView, Appointments, Toolbar, DateNavigator, AppointmentForm, WeekView, MonthView, ViewSwitcher, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { Paper, withStyles } from "@material-ui/core";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { connectProps } from "@devexpress/dx-react-core";
import FlexibleSpace from "./FlexibleSpace";
import Appointment from "./Appointment";
import TooltipHeader from "./TooltipHeader";
import TooltipContent from "./TooltipContent";
import EditButton from "./EditButton";
import CustomTimeCell from "./CustomTimeCell";
import AppointmentContent from "./AppointmentContent";

const filterTasks = (items, priorityId) => items.filter(task => !priorityId || task.priorityId === priorityId);

const AgendaScheduler = props => {
  const { classes, currentViewNameChange, currentDateChange, currentType, data, currentDate, currentViewName } = props;

  const flexibleSpace = connectProps(FlexibleSpace, () => {
    return {
      type: props.currentType,
      typeChange: props.setCurrentType
    };
  });

  useEffect(() => {
    flexibleSpace.update();
  });
  return (
    <Paper className={classes.root}>
      <Scheduler data={filterTasks(data, currentType)}>
        <ViewState currentDate={currentDate} currentViewName={currentViewName} onCurrentViewNameChange={currentViewNameChange} onCurrentDateChange={currentDateChange} />
        <DayView timeScaleCellComponent={CustomTimeCell} name='Jour' startDayHour={7} endDayHour={19} />
        <WeekView name='Semaine' startDayHour={7} endDayHour={19} excludedDays={[0, 6]} />
        <MonthView name='Mois' startDayHour={7} endDayHour={19} excludedDays={[0, 6]} />
        <Appointments appointmentContentComponent={AppointmentContent} appointmentComponent={Appointment} />
        <Toolbar flexibleSpaceComponent={flexibleSpace} />
        <DateNavigator />
        <ViewSwitcher />
        <AppointmentTooltip headerComponent={TooltipHeader} contentComponent={TooltipContent} commandButtonComponent={EditButton} showOpenButton showCloseButton />
        <AppointmentForm readOnly />
      </Scheduler>
    </Paper>
  );
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

export default withStyles(styles)(AgendaScheduler);
