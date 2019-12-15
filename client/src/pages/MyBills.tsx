import React, { useContext } from "react";
import BillsTable from "../components/Bills/BillsTable";
import { Button } from "@material-ui/core";
import BillContext from "../contexts/BillContext";
import Splashscreen from "./Splashscreen";
import routes from "../routes";
import { useHistory } from "react-router-dom";

const MyBills: React.FC<any> = props => {
  const billContext = useContext(BillContext);
  const history = useHistory();

  if (!billContext.state.bills) {
    billContext.findAll();
    return <Splashscreen text="Récupération des factures" />;
  }

  return (
    <>
      <Button color="primary" variant="contained" onClick={e => history.push(routes.QUOTES_FORM.path)}>
        Créer une facture
      </Button>
      <BillsTable bills={billContext.state.bills} />
    </>
  );
};

export default MyBills;
