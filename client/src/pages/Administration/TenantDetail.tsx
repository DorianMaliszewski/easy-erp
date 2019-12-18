import React, { useState } from "react";
import { Button, Divider, Grid, Paper, Theme, Typography } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Splashscreen from "../Splashscreen";
import { TenantData } from "../../models/TenantData";
import { TenantApi } from "../../api/TenantApi";
import EditIcon from "@material-ui/icons/Edit";
import routes from "../../routes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const TenantDetail: React.FC<any> = () => {
  const [tenant, setTenant] = useState<TenantData>();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  if (!tenant) {
    if (!isLoading) {
      setIsLoading(true);
      TenantApi.getInstance()
        .findMine()
        .subscribe((result: TenantData) => {
          console.log(result);
          setTenant(result);
          setIsLoading(false);
        });
    }
    return <Splashscreen text="Récupération des informations d'entreprise" />;
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item xs container justify="space-between">
        <Grid item>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </Grid>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={e => history.push(routes.ADMIN_TENANT_FORM.path)}>
                Modifier
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper className={classnames(classes.root)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Mon entreprise
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6} sm={3}>
            Nom de l'entreprise
          </Grid>
          <Grid item xs={6} sm={9}>
            {tenant?.name}
          </Grid>
          <Grid item xs={6} sm={3}>
            Créé par
          </Grid>
          <Grid item xs={6} sm={9}>
            {tenant.mainUser.username}
          </Grid>
          <Grid item xs={6} sm={3}>
            Téléphone
          </Grid>
          <Grid item xs={6} sm={9}>
            {tenant?.phone}
          </Grid>
          <Grid item xs={6} sm={3}>
            Email
          </Grid>
          <Grid item xs={6} sm={9}>
            {tenant?.email}
          </Grid>
          <Grid item xs={6} sm={3}>
            Addresse
          </Grid>
          <Grid item xs={6} sm={9}>
            {tenant?.address}
          </Grid>
          <Grid item xs={6} sm={3}>
            Code postal
          </Grid>
          <Grid item xs={6} sm={9}>
            {tenant?.postalCode}
          </Grid>
          <Grid item xs={6} sm={3}>
            Site web
          </Grid>
          <Grid item xs={6} sm={9}>
            {tenant.site}
          </Grid>
          <Grid item xs={6} sm={3}>
            Logo
          </Grid>
          <Grid item xs={6} sm={9}>
            {tenant.logo}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default TenantDetail;
