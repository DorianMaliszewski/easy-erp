import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layouts/Layout';
import routes from '../routes';

const BillForm = props => {
  return <Layout title={routes.BILLS_FORM.title} />;
};

BillForm.propTypes = {};

export default BillForm;
