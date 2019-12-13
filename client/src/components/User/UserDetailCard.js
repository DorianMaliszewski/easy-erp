import React, { useContext } from "react";
import { Paper, Grid, Typography, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AuthContext from "../../contexts/AuthContext";
import UserResetPasswordGridItem from "./UserResetPasswordGridItem";
import UserReinitPasswordGridItem from "./UserReinitPasswordGridItem";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit
  },
  gridLine: {
    paddingTop: theme.spacing.unit * 2
  }
}));

const UserDetailCard = ({ user }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={16} direction="row">
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" component="p">
            Id
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" component="p">
            {user.id}
          </Typography>
        </Grid>
        <Grid item className={classes.gridLine} xs={12}>
          <Divider />
        </Grid>
        <Grid item className={classes.gridLine} xs={12} sm={6}>
          <Typography variant="body1" component="p">
            Nom
          </Typography>
        </Grid>
        <Grid item className={classes.gridLine} xs={12} sm={6}>
          <Typography variant="body1" component="p">
            {user.name}
          </Typography>
        </Grid>
        <Grid item className={classes.gridLine} xs={12}>
          <Divider />
        </Grid>
        <Grid item className={classes.gridLine} xs={12} sm={6}>
          <Typography variant="body1" component="p">
            Email
          </Typography>
        </Grid>
        <Grid item className={classes.gridLine} xs={12} sm={6}>
          <Typography variant="body1" component="p">
            {user.email}
          </Typography>
        </Grid>
        {authContext.user.id === user.id ? <UserResetPasswordGridItem user={user} /> : authContext.isMoreThanOrEqualAdmin() && <UserReinitPasswordGridItem />}
      </Grid>
    </Paper>
  );
};

export default UserDetailCard;
