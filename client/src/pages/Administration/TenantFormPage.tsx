import React, { useState } from "react";

import { Divider, Typography, Grid, Button } from "@material-ui/core";
import Splashscreen from "../Splashscreen";
import { TenantData } from "../../models/TenantData";
import { TenantApi } from "../../api/TenantApi";
import { useTenantContext } from "../../providers/TenantProvider";
import TenantForm from "../../components/Administration/TenantForm";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useHistory } from "react-router-dom";
import routes from "../../routes";

const TenantFormPage: React.FC<any> = () => {
  const [tenant, setTenant] = useState<TenantData>();
  const [isLoading, setIsLoading] = useState(false);
  const tenantContext = useTenantContext();
  const history = useHistory();

  if (!tenant?.id) {
    if (!isLoading) {
      setIsLoading(true);
      TenantApi.getInstance()
        .findMine()
        .subscribe((result: TenantData) => {
          setTenant(result);
          setIsLoading(false);
        });
    }
    return <Splashscreen text="Récupération des informations d'entreprise" />;
  }

  const handleSubmit = (event: any) => {
    tenantContext.submit(tenant).subscribe(() => {
      history.push(routes.ADMIN_TENANT.path);
    });
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Button onClick={e => history.goBack()}>
          <ChevronLeftIcon /> Retour
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5">{tenant?.id ? "Modifier mon" : "Créer une"} entreprise</Typography>
        <Divider style={{ margin: 10 }} />
        <TenantForm tenant={tenant} setTenant={setTenant} handleSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
};

TenantFormPage.propTypes = {};

export default TenantFormPage;
