import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { CustomerData } from "../../../models/CustomerData";

interface AdminCustomerFormProps {
  customer: CustomerData;
  setCustomer: any;
  handleSubmit: any;
}

const AdminCustomerForm: React.FC<AdminCustomerFormProps> = ({ customer, setCustomer, handleSubmit }) => {
  const handleChange = (event: any) => {
    const newCustomer: any = { ...customer };
    newCustomer[event.target.id as keyof CustomerData] = event.target.value as any;
    setCustomer(newCustomer);
  };
  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <TextField variant="outlined" required id="name" name="name" label="Nom du client" fullWidth value={customer.name} onChange={handleChange} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" required id="contact" name="contact" label="Nom du contact" fullWidth value={customer.contact ? customer.contact : ""} onChange={handleChange} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" required id="phone" name="phone" label="Téléphone" fullWidth value={customer.phone ? customer.phone : ""} onChange={handleChange} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" required id="address" name="address" label="Adresse" fullWidth value={customer.address} onChange={handleChange} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" required id="city" name="city" label="Ville" fullWidth value={customer.city} onChange={handleChange} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" required id="postalCode" name="postalCode" label="Code Postal" fullWidth value={customer.postalCode ? customer.postalCode : ""} onChange={handleChange} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" required id="email" name="email" label="Adresse électronique" fullWidth value={customer.email ? customer.email : ""} onChange={handleChange} />
      </Grid>
      <Grid item>
        <TextField variant="outlined" id="site" name="site" label="Site internet (optionnel)" fullWidth value={customer.site ? customer.site : ""} onChange={handleChange} />
      </Grid>
      <Grid item container direction="row-reverse">
        <Grid item>
          <Button startIcon={<SaveIcon />} variant="contained" color="primary" onClick={e => handleSubmit()}>
            Enregistrer
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

AdminCustomerForm.propTypes = {};

export default AdminCustomerForm;
