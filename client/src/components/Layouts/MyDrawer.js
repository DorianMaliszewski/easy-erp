import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SwipeableDrawer, IconButton, Divider } from "@material-ui/core";
import { PrincipalMenu } from "./PrincipalMenu";
import AuthContext from "../../contexts/AuthContext";
import AdministrationMenu from "../Administration/AdministrationMenu";
import { makeStyles } from "@material-ui/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const MyDrawer = ({ open, setOpen }) => {
  const authContext = useContext(AuthContext);
  const classes = useStyle();
  return (
    <SwipeableDrawer variant="temporary" onClose={e => setOpen(false)} onOpen={e => setOpen(true)} open={open}>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={e => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <PrincipalMenu />
      {authContext.isMoreThanOrEqualAdmin() ? (
        <>
          <Divider />
          <AdministrationMenu />
        </>
      ) : null}
    </SwipeableDrawer>
  );
};

MyDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

const useStyle = makeStyles(theme => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
}));

export default MyDrawer;
