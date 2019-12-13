import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';

/**
 *
 * @param {{..., customer: Customer}} param0
 */
const AdminCustomerForm = ({ customer, setCustomer, handleSubmit }) => {
  const handleChange = event => {
    const newCustomer = { ...customer };
    newCustomer[event.target.id] = event.target.value;
    setCustomer(newCustomer);
  };
  return (
    <Grid container spacing={32}>
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
      <Grid item xs={12} align="right">
        <Button variant="contained" color="primary" size="large" onClick={e => handleSubmit()}>
          <SaveIcon />
          Enregistrer
        </Button>
      </Grid>
    </Grid>
  );
};

AdminCustomerForm.propTypes = {};

export default withStyles()(AdminCustomerForm);
