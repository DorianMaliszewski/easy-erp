import React, { useContext } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core";

import DescriptionIcon from "@material-ui/icons/Description";
import DashboardContext from "../../../contexts/DashboardContext";
import BillActivityList from "./EventActivityList";

const BillActivityWidget = ({ classes, events }) => {
  const dashboardContext = useContext(DashboardContext);

  return (
    <Card className={classes.card} draggable={dashboardContext.editingMode}>
      <CardHeader
        avatar={
          <Avatar aria-label='Bills activity'>
            <DescriptionIcon />
          </Avatar>
        }
        title='Activités récente des évènements'
        subheader='7 derniers jours'
      />
      <CardContent>
        <BillActivityList events={events} />
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing />
    </Card>
  );
};

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 3
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

BillActivityWidget.propTypes = {
  events: PropTypes.array.isRequired
};

export default withStyles(styles)(BillActivityWidget);
