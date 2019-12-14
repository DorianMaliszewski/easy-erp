import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Divider, Grid, withStyles, Link, Theme, makeStyles } from "@material-ui/core";
import routes from "../../routes";
import classnames from "classnames";

const CustomerUserCard: React.FC<any> = ({ user }) => {
  const classes = useStyles();
  return (
    <Paper className={classnames(classes.root)}>
      <Typography variant="h5" gutterBottom>
        Fiche client : {user.name}
      </Typography>
      <Divider />
      <Grid container style={{ paddingTop: 20 }} spacing={3}>
        <Grid item xs={6} sm={3}>
          Nom
        </Grid>
        <Grid item xs={6} sm={9}>
          {user.name}
        </Grid>
        <Grid item xs={6} sm={3}>
          Téléphone
        </Grid>
        <Grid item xs={6} sm={9}>
          <Link href={"tel:" + user.phone}>{user.phone}</Link>
        </Grid>
        <Grid item xs={6} sm={3}>
          E-mail
        </Grid>
        <Grid item xs={6} sm={9}>
          {user.email}
        </Grid>
        <Grid item xs={6} sm={3}>
          Site
        </Grid>
        <Grid item xs={6} sm={9}>
          {user.site}
        </Grid>
        <Grid item xs={6} sm={3}>
          Adresse
        </Grid>
        <Grid item xs={6} sm={9}>
          {user.address}
        </Grid>
      </Grid>
    </Paper>
  );
};

CustomerUserCard.propTypes = {
  user: PropTypes.object.isRequired
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export default CustomerUserCard;
