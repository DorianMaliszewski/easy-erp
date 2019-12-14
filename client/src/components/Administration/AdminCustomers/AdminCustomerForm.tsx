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
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField InputLabelProps={{ shrink: true }} required id="name" name="name" label="Nom du client" fullWidth value={customer.name} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField InputLabelProps={{ shrink: true }} required id="contact" name="contact" label="Nom du contact" fullWidth value={customer.contact} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField InputLabelProps={{ shrink: true }} required id="phone" name="phone" label="Téléphone" fullWidth value={customer.phone} onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField InputLabelProps={{ shrink: true }} required id="address" name="address" label="Adresse" fullWidth value={customer.address} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField InputLabelProps={{ shrink: true }} required id="city" name="city" label="Ville" fullWidth value={customer.city} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField InputLabelProps={{ shrink: true }} required id="postalCode" name="postalCode" label="Code Postal" fullWidth value={customer.postalCode} onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField InputLabelProps={{ shrink: true }} required id="email" name="email" label="Adresse électronique" fullWidth value={customer.email} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField InputLabelProps={{ shrink: true }} id="site" name="site" label="Site internet (optionnel)" fullWidth value={customer.site} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} alignItems="flex-end">
        <Button variant="contained" color="primary" size="large" onClick={e => handleSubmit()}>
          <SaveIcon />
          Enregistrer
        </Button>
      </Grid>
    </Grid>
  );
};

AdminCustomerForm.propTypes = {};

export default AdminCustomerForm;
