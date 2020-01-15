import React from "react";
import { Button, Grid, makeStyles, TextField, Theme, Typography, Divider } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { green, purple, teal } from "@material-ui/core/colors";
import { useTenantContext } from "../../providers/TenantProvider";
import { AUTH_TOKEN } from "../../constants";

const TenantForm: React.FC<any> = ({ tenant, setTenant, handleSubmit }) => {
  const classes = useStyles();
  const tenantContext = useTenantContext();
  const [logo, setLogo] = React.useState("");

  const handleInputChange = (key: string) => (event: any) => {
    setTenant({ ...tenant, [key]: event.target.value });
  };

  const handleUploadNewIcon = (e: any) => {
    if (e.target.files.length === 1) {
      tenantContext.uploadLogo(e.target.files[0]).subscribe((result: string) => {
        setTenant({ ...tenant, logo: result });
      });
    }
  };

  if (tenant.logo) {
    fetch(tenant.logo + "?access_token=" + localStorage.getItem(AUTH_TOKEN))
      .then(response => response.blob())
      .then(blob => {
        var reader = new FileReader();
        reader.onload = function() {
          setLogo(this.result as string);
        }; // <--- `this.result` contains a base64 data URI
        reader.readAsDataURL(blob);
      });
  }

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
      <Grid item container direction="column" spacing={1}>
        <Grid item>
          <Typography gutterBottom>Logo</Typography>
          <Divider />
        </Grid>
        <Grid item>
          <input type="file" accept="image/x-png,image/jpeg" style={{ display: "none" }} id="icon-upload" onChange={handleUploadNewIcon} />
          <label htmlFor="icon-upload">
            <Button variant="contained" color="secondary" component="span">
              Uploader une nouvelle icône
            </Button>
          </label>
        </Grid>
        <Grid item>{tenant.logo && <img height="100" width="100" style={{ objectFit: "cover" }} src={logo.toString()} alt="tenant icon" />}</Grid>
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
