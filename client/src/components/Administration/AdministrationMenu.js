import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText, Collapse, List, withStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import StoreIcon from "@material-ui/icons/Store";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { withRouter } from "react-router-dom";
import routes from "../../routes";
import ListItemRoute from "../ListItemRoute";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const AdministrationMenu = props => {
  const [open, setOpen] = useState(props.location.pathname.includes("admin"));
  const { classes } = props;
  return (
    <List>
      <ListItem button onClick={e => setOpen(!open)}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Administration' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemRoute className={classes.nested} text='Utilisateurs internes' icon={<PeopleIcon />} route={routes.ADMIN.USERS.path} />
          <ListItemRoute className={classes.nested} text='Client' icon={<StoreIcon />} route={routes.ADMIN.CLIENTS.path} />
          <ListItemRoute className={classes.nested} text='Utilisateurs clients' icon={<PeopleIcon />} route={routes.ADMIN.CLIENTS_USERS.path} />
        </List>
      </Collapse>
    </List>
  );
};

export default withRouter(withStyles(styles)(AdministrationMenu));
