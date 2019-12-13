import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Divider, Grid, withStyles, Link } from "@material-ui/core";
import routes from "../../routes";
import classnames from "classnames";

const CustomerCard = ({ customer, classes }) => {
  return (
    <Paper className={classnames(classes.root)}>
      <Typography variant="h5" gutterBottom>
        Fiche client : {customer.name}
      </Typography>
      <Divider />
      <Grid container style={{ paddingTop: 20 }} spacing={24}>
        <Grid item xs={4} sm={3}>
          Nom
        </Grid>
        <Grid item xs={8} sm={9}>
          {customer.name}
        </Grid>
        <Grid item xs={4} sm={3}>
          Contact
        </Grid>
        <Grid item xs={8} sm={9}>
          <Link href={routes.USER_DETAIL.path.replace(":id", 1)}>{customer.contact}</Link>
        </Grid>
        <Grid item xs={4} sm={3}>
          Téléphone
        </Grid>
        <Grid item xs={8} sm={9}>
          <Link href={"tel:" + customer.phone}>{customer.phone}</Link>
        </Grid>
        <Grid item xs={4} sm={3}>
          E-mail
        </Grid>
        <Grid item xs={8} sm={9}>
          <Link href={"mailto:" + customer.email} target="_blank" rel="noopener noreferrer">
            {customer.email}
          </Link>
        </Grid>
        <Grid item xs={4} sm={3}>
          Site
        </Grid>
        <Grid item xs={8} sm={9}>
          <Link href={customer.site} target="_blank" rel="noopener noreferrer">
            {customer.site}
          </Link>
        </Grid>
        <Grid item xs={4} sm={3}>
          Adresse
        </Grid>
        <Grid item xs={8} sm={9}>
          {customer.address}
        </Grid>
      </Grid>
    </Paper>
  );
};

CustomerCard.propTypes = {
  customer: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

export default withStyles(styles)(CustomerCard);
