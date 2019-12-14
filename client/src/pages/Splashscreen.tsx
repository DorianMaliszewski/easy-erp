import React from "react";
import { CircularProgress, Grid, Typography, makeStyles, Theme } from "@material-ui/core";
import classNames from "classnames";

const Splashscreen: React.FC<any> = ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.root)}>
      <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <CircularProgress variant="indeterminate" thickness={1.5} disableShrink size={100} className={classes.progress} />
          <Typography variant="h5">{text ? text : "Chargement en cours"}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  progress: {
    margin: theme.spacing(3),
    color: theme.palette.primary.main,
    animationDuration: "1000ms"
  }
}));

export default Splashscreen;
