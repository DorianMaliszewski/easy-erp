import React from "react";
import { Paper, Typography, Divider, Grid, Link, makeStyles, Theme } from "@material-ui/core";
import routes from "../../routes";
import classnames from "classnames";
import useUsers from "../../hooks/useUsers";

const CustomerCard: React.FC<any> = ({ customer }) => {
  const classes = useStyles();
  const users = useUsers();

  const getUserLabel = (contact: any) => {
    return contact ? contact.firstName + " " + contact.lastName : "Non renseigné";
  };

  const contact = users ? users.find((u: any) => u.username === customer.contact) : null;

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
          <Link href={routes.USER_DETAIL.path.replace(":id", contact ? contact.id.toString() : "")}>{contact ? getUserLabel(contact) : customer.contact}</Link>
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
    padding: theme.spacing(2)
  }
}));

export default CustomerCard;
