import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import TuneIcon from "@material-ui/icons/Tune";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { Collapse, createStyles, List, makeStyles, Theme } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import StoreIcon from "@material-ui/icons/Store";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import DescriptionIcon from "@material-ui/icons/Description";
import EnterpriseIcon from "@material-ui/icons/AccountBalance";

import AuthContext from "../../contexts/AuthContext";


type ListItemLinkProps = {
  icon: any;
  path: string;
  text: string;
  className?: string;
};

const ListItemLink: React.FC<ListItemLinkProps> = ({ icon, path, text, className }) => {
  const IconComponent = icon;
  return (
    <ListItem className={className} component={Link} to={path} button>
      <ListItemIcon>
        <IconComponent />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export const MainMenuList: React.FC = () => {
  return (
    <List>
      <ListItemLink text="Mon Tableau de bord" icon={DashboardIcon} path={routes.DASHBOARD.path} />
      <ListItemLink text="Emploi du temps" icon={CalendarTodayIcon} path={routes.MY_AGENDA.path} />
      <ListItemLink text="Clients" icon={StoreIcon} path={routes.MY_CUSTOMERS.path} />
      <ListItemLink text="Devis" icon={DescriptionIcon} path={routes.MY_QUOTES.path} />
      <ListItemLink text="Factures" icon={EuroSymbolIcon} path={routes.MY_BILLS.path} />
    </List>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

export const AdministrationMenuList: React.FC = (props: any) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const authContext = React.useContext(AuthContext);
  return (
    <List>
      <ListItem button onClick={e => setOpen(!open)}>
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Administration" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {authContext.user && authContext.user.role.name === "ROLE_SUPER_ADMIN" && (
            <ListItemLink className={classes.nested} text="Mon entreprise" icon={EnterpriseIcon} path={routes.ADMIN_TENANT.path} />
          )}
          <ListItemLink className={classes.nested} text="Utilisateurs internes" icon={PeopleIcon} path={routes.ADMIN_USERS.path} />
          <ListItemLink className={classes.nested} text="Utilisateurs clients" icon={PeopleIcon} path={routes.ADMIN_CLIENTS_USERS.path} />
        </List>
      </Collapse>
    </List>
  );
};
