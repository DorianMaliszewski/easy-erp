import React from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import CustomSnackbarWrapper from "./CustomSnackbarWrapper";
import { makeStyles } from "@material-ui/styles";

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing.unit
  }
}));

const CustomSnackbar = ({ open, setOpen, message, variant, autoHideDuration }) => {
  const classes = useStyles2();

  function handleClose(event, reason) {
    setOpen(false);
  }
  return (
    <Snackbar
      className={classes.margin}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}>
      <CustomSnackbarWrapper onClose={handleClose} variant={variant} message={message} />
    </Snackbar>
  );
};

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired
};

CustomSnackbar.defaultProps = {
  autoHideDuration: 6000
}

export default CustomSnackbar;
