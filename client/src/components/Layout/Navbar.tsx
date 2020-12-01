import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useLocation } from "react-router-dom";
import routes from "../../routes";
import { useMediaQuery, Theme } from "@material-ui/core";
import TopSearchBar from "./TopSearchBar";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
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
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  }
}));

type NavbarProps = {
  toggleDrawer: (event: any) => void;
  open: Boolean;
};

const Navbar: React.FC<NavbarProps> = ({ toggleDrawer, open }) => {
  const classes = useStyles();
  const location = useLocation();
  const pageTitle = Object.values(routes).find(route => route.path === location.pathname);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, matches && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} className={clsx(classes.menuButton, matches && open && classes.menuButtonHidden)}>
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {pageTitle ? pageTitle.title : ""}
        </Typography>
        <TopSearchBar />
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
