import React from "react";
import { Button, Grid, makeStyles, Table, TableCell, TableHead, TableRow, Theme, TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { green, purple } from "@material-ui/core/colors";

const TenantForm: React.FC<any> = ({ tenant, setTenant, handleSubmit }) => {
  const classes = useStyles();

  const handleInputChange = (key: string) => (event: any) => {
    setTenant({ ...tenant, [key]: event.target.value });
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <TextField variant="outlined" label="Nom de l'entreprise" fullWidth value={tenant.name} onChange={handleInputChange("name")} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Email" fullWidth value={tenant.email} onChange={handleInputChange("email")} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Site" fullWidth value={tenant.site} onChange={handleInputChange("site")} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Adresse" fullWidth value={tenant.address} onChange={handleInputChange("address")} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Code postal" fullWidth value={tenant.postalCode} onChange={handleInputChange("postalCode")} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Téléphone" fullWidth value={tenant.phone} onChange={handleInputChange("phone")} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Logo" fullWidth value={tenant.logo ? tenant.logo : ""} onChange={handleInputChange("logo")} />
      </Grid>
      <Grid item container alignItems="center" direction="row-reverse" spacing={1}>
        <Grid item xs={12} sm="auto">
          <Button startIcon={<CheckIcon />} variant="contained" className={classes.validateButton} onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  validateButton: {
    color: "white",
    backgroundColor: green[500],
    "&:hover": { backgroundColor: green[700] }
  },
  saveButton: {
    color: "white",
    backgroundColor: purple[500],
    "&:hover": { backgroundColor: purple[700] }
  }
}));
export default TenantForm;
