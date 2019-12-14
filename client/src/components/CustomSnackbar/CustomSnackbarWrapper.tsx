import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { Theme, makeStyles } from "@material-ui/core";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(2)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  close: {
    display: "flex"
  }
}));

const CustomSnackbarWrapper: React.FC<any> = props => {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant as "success" | "info" | "error" | "warning"];

  return (
    <SnackbarContent
      className={classNames(classes[variant as "success" | "info" | "error" | "warning"], className)}
      style={{ display: "flex", flexDirection: "row" }}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
};

CustomSnackbarWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

export default CustomSnackbarWrapper;
