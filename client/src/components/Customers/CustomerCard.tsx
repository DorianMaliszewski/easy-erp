import React from "react";
import { Paper, Typography, Divider, Grid, Link, makeStyles, Theme } from "@material-ui/core";
import routes from "../../routes";
import classnames from "classnames";

const CustomerCard: React.FC<any> = ({ customer }) => {
  const classes = useStyles();
  return (
    <Paper className={classnames(classes.root)}>
      <Typography variant="h5" gutterBottom>
        Client n°{customer.id} : {customer.name}
      </Typography>
      <Divider />
      <Grid container style={{ paddingTop: 20 }} spacing={3}>
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
          <Link href={routes.USER_DETAIL.path.replace(":id", customer.contact)}>{customer.contact}</Link>
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    overflowX: "auto"
  }
}));

export default CustomerCard;
