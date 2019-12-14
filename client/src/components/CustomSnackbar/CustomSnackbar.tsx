import React from "react";
import PropTypes from "prop-types";
import { Snackbar, Theme, makeStyles } from "@material-ui/core";
import CustomSnackbarWrapper from "./CustomSnackbarWrapper";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(2)
  }
}));

const CustomSnackbar: React.FC<any> = ({ open, setOpen, message, variant, autoHideDuration }) => {
  const classes = useStyles();

  function handleClose(event: any, reason: any) {
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
      onClose={handleClose}
    >
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
};

export default CustomSnackbar;
