import React, { useContext } from "react";
import { Paper, Grid, Typography, Divider, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AuthContext from "../../contexts/AuthContext";
import UserResetPasswordGridItem from "./UserResetPasswordGridItem";
import UserReinitPasswordGridItem from "./UserReinitPasswordGridItem";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
  gridLine: {
    paddingTop: theme.spacing(1)
  }
}));

let keys = [
  { id: "id", label: "Id" },
  { id: "username", label: "Identifiant" },
  { id: "email", label: "Email" },
  { id: "lastName", label: "Nom" },
  { id: "firstName", label: "Prénom" }
];

const UserDetailCard: React.FC<any> = ({ user }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} direction="column">
        {keys.map(key => (
          <Grid key={key.id} container item spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">{key.label}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" component="p">
                {user[key.id]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        ))}
        {authContext.user.id === user.id ? (
          <UserResetPasswordGridItem user={user} />
        ) : (
          authContext.isMoreThanOrEqualAdmin() && user.role && user.role.name !== "ROLE_SUPER_ADMIN" && <UserReinitPasswordGridItem />
        )}
      </Grid>
    </Paper>
  );
};

export default UserDetailCard;
