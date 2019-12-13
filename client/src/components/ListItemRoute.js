import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";

const ListItemRoute = props => {
  const isCurrentRouter = () => {
    return props.location.pathname === props.route;
  };

  return (
    <ListItem button selected={isCurrentRouter()} component={Link} to={props.route}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
};

export default withRouter(ListItemRoute);
