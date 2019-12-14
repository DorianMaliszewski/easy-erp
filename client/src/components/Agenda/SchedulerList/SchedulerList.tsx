import React from "react";
import { List, Grid, Button, IconButton, Divider, AppBar, Theme } from "@material-ui/core";
import SchedulerListItem from "./SchedulerListItem";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import moment from "moment";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";

const SchedulerList: React.FC<any> = ({ currentViewNameChange, currentDateChange, currentType, data, currentDate, currentViewName }) => {
  const classes = useStyles();
  const getForDate = (dateString: string) => {
    const date = new Date(dateString);
    return data.filter((item: any) => new Date(item.startDate).toLocaleDateString() === date.toLocaleDateString());
  };

  const lessOneDay = () => {
    currentDateChange(
      moment(currentDate, "YYYY-MM-DD")
        .subtract("1", "day")
        .format("YYYY-MM-DD")
    );
  };

  const addOneDay = () => {
    currentDateChange(
      moment(currentDate, "YYYY-MM-DD")
        .add("1", "day")
        .format("YYYY-MM-DD")
    );
  };

  return (
    <div className={classes.root} style={{ height: 5000 }}>
      <AppBar position="absolute" style={{ paddingTop: 60, zIndex: 1099 }} color="default">
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton color="primary" onClick={lessOneDay}>
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <Button variant="text" color="default">
              {moment(currentDate, "YYYY-MM-DD").format("DD MMM YYYY")}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <div style={{ float: "right" }}>
              <IconButton color="primary" onClick={addOneDay}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" />
      </AppBar>
      <div className={classNames(classes.mainContainer)}>
        <List component="nav">
          {getForDate(currentDate).map((appointment: any, i: number) => (
            <SchedulerListItem key={i} appointmentData={appointment} />
          ))}
        </List>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  mainContainer: {
    paddingTop: theme.spacing(3)
  }
}));

export default SchedulerList;
