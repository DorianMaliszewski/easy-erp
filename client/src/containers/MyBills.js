import React, { useContext } from 'react';
import Layout from '../components/Layouts/Layout';
import routes from '../routes';
import BillsTable from '../components/Bills/BillsTable';
import { withStyles, Button } from '@material-ui/core';
import BillContext from '../contexts/BillContext';
import Splashscreen from './Splashscreen';
import { getBillStatus } from '../utils/utils';

const MyBills = props => {
  const billContext = useContext(BillContext);

  if (!billContext.state.bills) {
    billContext.findAll();
    return (
      <Layout title={routes.MY_BILLS.title}>
        <Splashscreen text="Récupération des factures" />
      </Layout>
    );
  }

  return (
    <Layout title={routes.MY_BILLS.title}>
      <Button color="primary" variant="contained" onClick={e => props.history.push(routes.QUOTES_FORM.path)}>
        Créer un devis
      </Button>
      <BillsTable bills={billContext.state.bills.sort((b1, b2) => (getBillStatus(b1.status).weight >= getBillStatus(b2.status).weight ? 1 : -1))} />
    </Layout>
  );
};

const styles = theme => ({});

export default withStyles(styles)(MyBills);
