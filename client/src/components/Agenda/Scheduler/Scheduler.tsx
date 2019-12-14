import React, { useEffect } from "react";
import { Scheduler, DayView, Appointments, Toolbar, DateNavigator, AppointmentForm, WeekView, MonthView, ViewSwitcher, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { Paper, Theme } from "@material-ui/core";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { connectProps } from "@devexpress/dx-react-core";
import FlexibleSpace from "./FlexibleSpace";
import Appointment from "./Appointment";
import TooltipHeader from "./TooltipHeader";
import TooltipContent from "./TooltipContent";
import EditButton from "./EditButton";
import AppointmentContent from "./AppointmentContent";
import { makeStyles } from "@material-ui/styles";

const filterTasks = (items: any, priorityId: number) => items.filter((task: any) => !priorityId || task.priorityId === priorityId);

const AgendaScheduler: React.FC<any> = props => {
  const classes = useStyles();
  const { currentViewNameChange, currentDateChange, currentType, data, currentDate, currentViewName } = props;

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
        <DayView name="Jour" startDayHour={7} endDayHour={19} />
        <WeekView name="Semaine" startDayHour={7} endDayHour={19} excludedDays={[0, 6]} />
        <MonthView name="Mois" />
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    overflowX: "auto"
  }
}));

export default AgendaScheduler;
