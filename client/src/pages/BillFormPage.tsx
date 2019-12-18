import React, { useState } from "react";
import { BillFormProvider } from "../providers/BillFormProvider";
import Splashscreen from "./Splashscreen";
import { Typography, Divider } from "@material-ui/core";
import BillForm from "../components/Bills/BillForm/BillForm";
import { useParams } from "react-router-dom";
import BillContext from "../contexts/BillContext";
import { BillData } from "../models/BillData";

const BillFormPage: React.FC<any> = props => {
  const { id } = useParams();
  const [bill, setQuote] = useState(new BillData());
  const billContext = React.useContext(BillContext);

  if (id && !bill.id) {
    billContext.findById(parseInt(id, 10)).subscribe((billFinded: BillData) => {
      if (!billFinded.lines) {
        billFinded.lines = [];
      }
      setQuote(billFinded);
    });
    return <Splashscreen text="Récupération de la facture" />;
  }

  return (
    <BillFormProvider bill={bill}>
      <Typography variant="h5">{bill.id ? "Modifier" : "Créer"} une facture</Typography>
      <Divider style={{ margin: 10 }} />
      <BillForm bill={bill} />
    </BillFormProvider>
  );
};

export default BillFormPage;
