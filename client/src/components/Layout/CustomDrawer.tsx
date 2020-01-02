import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainMenuList, AdministrationMenuList } from "./MenuLists";
import clsx from "clsx";
import { makeStyles, ListItem, ListItemText, ListItemIcon, useMediaQuery, Theme, Typography } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { AUTH_TOKEN } from "../../constants";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AuthContext from "../../contexts/AuthContext";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "100vh",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    overflowY: "auto",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: 0,
    maxHeight: "100vh",
    [theme.breakpoints.up("sm")]: {
      //width: theme.spacing(9)
    }
  },
  fixedBottom: {
    position: "relative",
    marginTop: "auto",
    paddingBottom: 0
  }
}));

type CustomDrawerProps = {
  open: boolean;
  toggleDrawer: (event: any) => void;
};

const CustomDrawer: React.FC<CustomDrawerProps> = ({ toggleDrawer, open }) => {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const authContext = React.useContext(AuthContext);

  const handleLogout = (event: React.MouseEvent) => {
    localStorage.removeItem(AUTH_TOKEN);
    history.push(routes.LOGIN.path);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        {!matches ? (
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <Typography align="center" variant="h5" style={{ width: "100%" }} color="textSecondary">
            Menu
          </Typography>
        )}
      </div>
      <Divider />
      <div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            {authContext.user && <ListItemText primary={authContext.user.firstName} secondary={authContext.user.username} />}
          </ListItem>
        </List>
      </div>
      <Divider />
      <MainMenuList />
      <Divider />
      <AdministrationMenuList />

      <List className={classes.fixedBottom}>
        <Divider />
        <ListItem onClick={handleLogout} button>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText>Se déconnecter</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
