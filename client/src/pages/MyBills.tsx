import React, { useContext } from "react";
import BillsTable from "../components/Bills/BillsTable";
import { Button } from "@material-ui/core";
import BillContext from "../contexts/BillContext";
import Splashscreen from "./Splashscreen";
import { getBillStatus } from "../utils/utils";
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
        Créer un devis
      </Button>
      <BillsTable
        bills={billContext.state.bills.sort((b1: any, b2: any) => {
          if (!b1 && !b2) return 0;
          if (!b1) return -1;
          if (!b2) return 1;
          return (getBillStatus(b1.status) as any).weight >= (getBillStatus(b2.status) as any).weight ? 1 : -1;
        })}
      />
    </>
  );
};

export default MyBills;
