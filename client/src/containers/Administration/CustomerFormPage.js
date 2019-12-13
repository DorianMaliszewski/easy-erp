import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Customer from '../../models/Customer';
import Layout from '../../components/Layouts/Layout';
import routes from '../../routes';
import { Typography } from '@material-ui/core';
import AdminCustomerForm from '../../components/Administration/AdminCustomers/AdminCustomerForm';
import CustomerContext from '../../contexts/CustomerContext';

const CustomerFormPage = ({ match }) => {
  const [customer, setCustomer] = useState(new Customer());
  const customerContext = useContext(CustomerContext);

  if (match.params.id) {
    customerContext.findById(parseInt(match.params.id, 10)).then(customerFinded => {
      setCustomer(customer);
    });
  }

  const submit = () => {
    customerContext.create(customer).then(data => {
      console.log("Retour de create", data)
    });
  }

  return (
    <Layout title={routes.CUSTOMERS_FORM.title}>
      <Typography variant="h5" gutterBottom style={{marginBottom: 20}}>{customer.id ? 'Modifier' : 'Créer'} un client</Typography>
      <AdminCustomerForm customer={customer} setCustomer={setCustomer} handleSubmit={submit} />
    </Layout>
  );
};

CustomerFormPage.propTypes = {};

export default CustomerFormPage;
