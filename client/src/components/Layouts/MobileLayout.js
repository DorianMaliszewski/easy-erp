import React, { useState } from "react";
import {
  BottomNavigation,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  BottomNavigationAction,
  Typography,
  withStyles
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import routes from "../../routes";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationList from "../NotificationList";
import MoreVertMenu from "../MoreVertMenu";
import classNames from "classnames";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DescriptionIcon from "@material-ui/icons/Description";
import MyDrawer from "./MyDrawer";

const MobileLayout = ({ showGoBack, history, children, location, title, classes }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleChange = (e, newValue) => {
    history.push(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        {!showGoBack ? (
          <>
            <AppBar position="fixed" className={classNames(classes.appBar)}>
              <Toolbar className={classNames(classes.toolbar)}>
                <IconButton color="inherit" aria-label="Open drawer" onClick={handleDrawerOpen} className={classNames(classes.menuButton)}>
                  <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classNames(classes.title)}>
                  {title}
                </Typography>
                <NotificationList />
                <MoreVertMenu />
              </Toolbar>
            </AppBar>
            <MyDrawer open={open} setOpen={setOpen} />
          </>
        ) : (
          <AppBar position="fixed" className={classNames(classes.appBar)}>
            <Toolbar disableGutters className={classNames(classes.toolbar)}>
              <IconButton color="inherit" aria-label="Précédent" onClick={e => history.goBack()}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                {title}
              </Typography>
              <NotificationList />
              <MoreVertMenu />
            </Toolbar>
          </AppBar>
        )}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
      <BottomNavigation value={location.pathname} onChange={handleChange} className={classNames(classes.bottomNavigation)}>
        <BottomNavigationAction label={routes.DASHBOARD.title} value={routes.DASHBOARD.path} icon={<DashboardIcon />} />
        <BottomNavigationAction label={routes.MY_AGENDA.title} value={routes.MY_AGENDA.path} icon={<CalendarTodayIcon />} />
        <BottomNavigationAction label={routes.MY_QUOTES.title} value={routes.MY_QUOTES.path} icon={<DescriptionIcon />} />
        <BottomNavigationAction label={routes.MY_BILLS.title} value={routes.MY_BILLS.path} icon={<EuroSymbolIcon />} />
      </BottomNavigation>
    </>
  );
};

MobileLayout.propTypes = {};

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginBottom: 50,
    overflow: "auto"
  },
  bottomNavigation: {
    position: "fixed",
    bottom: 0,
    width: "100%"
  }
});

export default withStyles(styles)(withRouter(MobileLayout));
