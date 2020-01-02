import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center"
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      },
      color: green[500]
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    },
    checkIconSuccess: {
      color: "white",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
  })
);

export const LoadingButton: React.FC<any> = ({ onClick, loading, success, children, fullWidth, color, size, icon }) => {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  return (
    <div className={classes.wrapper}>
      <Button variant="contained" startIcon={icon} color={color} fullWidth={fullWidth} className={buttonClassname} disabled={loading} onClick={onClick} size={size ? size : "medium"}>
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      {success && <CheckIcon className={classes.checkIconSuccess} />}
    </div>
  );
};
