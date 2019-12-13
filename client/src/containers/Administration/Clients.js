import React from 'react';
import Layout from '../../components/Layouts/Layout';
import routes from '../../routes';
import AdminCustomersTable from '../../components/Administration/AdminCustomers/AdminCustomersTable';
import { withStyles, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

let id = 0;
function createData(name, contact, phone, email, site, address, postalCode, createdBy) {
  id += 1;
  return { id, name, contact, phone, email, site, address, postalCode, createdBy };
}

const rows = [
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin'),
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin'),
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin'),
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin'),
  createData('Client', 'John Doe', '0619755845', 'contact@dorianmaliszewski.fr', 'http://www.dorianmaliszewski.fr', 'Mon adresse', '20137', 'admin')
];

const Clients = props => {
  return (
    <Layout title={routes.ADMIN.CLIENTS.title}>
      <Button color="primary" variant="contained" onClick={e => props.history.push(routes.CUSTOMERS_FORM.path)}>
        Créer un client
      </Button>
      <AdminCustomersTable customers={rows} />
    </Layout>
  );
};

const styles = theme => ({});

export default withStyles(styles)(withRouter(Clients));
