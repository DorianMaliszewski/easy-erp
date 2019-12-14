import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Navbar from "./Navbar";
import Copyright from "./Copyright";
import CustomDrawer from "./CustomDrawer";
import { useMediaQuery, Theme } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

type MainLayoutProps = any;

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [openDrawer, setOpenDrawer] = React.useState(!matches);
  const toggleDrawer = (event: any) => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar toggleDrawer={toggleDrawer} open={openDrawer} />
      <CustomDrawer toggleDrawer={toggleDrawer} open={openDrawer} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {children}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default MainLayout;
