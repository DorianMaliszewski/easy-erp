import React from "react";
import { Table, TableHead, TableRow, TableCell, TextField, TableFooter, Button, Grid, makeStyles, Theme } from "@material-ui/core";
import BillFormBody from "./BillFormBody";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { green, purple } from "@material-ui/core/colors";
import { useBillFormContext } from "../../../providers/BillFormProvider";
import SingleSelectAutoComplete from "../../Autocomplete/SingleSelectAutoComplete";
import useCustomers from "../../../hooks/useCustomers";

const BillForm: React.FC<any> = ({ bill }) => {
  const billForm = useBillFormContext();
  const [clientSelected, setClientSelected] = React.useState(billForm.bill.clientId);
  const { customers, isLoading } = useCustomers();
  const classes = useStyles();

  function handleChangeSelectedClient(event: any) {
    setClientSelected(event.value);
    billForm.setClient(event.value);
  }

  const getCustomersList = () => {
    return customers ? customers.map(customer => ({ value: customer.id, label: customer.name })) : [];
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item container direction="row" alignItems="center" alignContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            style={{ marginTop: 20 }}
            label="TVA"
            variant="outlined"
            type="number"
            value={billForm.bill.tva ? billForm.bill.tva * 100 : ""}
            onChange={e => billForm.changeTva(parseInt(e.target.value, 10))}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <SingleSelectAutoComplete
            label="Client"
            placeholder="Chercher un client"
            value={getCustomersList().find(entry => entry.value === clientSelected)}
            isLoading={isLoading}
            onChange={handleChangeSelectedClient}
            options={getCustomersList()}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Quantité</TableCell>
              <TableCell align="right">Prix UHT</TableCell>
              <TableCell align="right">Prix UTTC</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <BillFormBody bill={bill} />
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Button variant="contained" startIcon={<AddIcon />} aria-label="Ajouter une ligne" color="primary" onClick={e => billForm.addLine()}>
                  Ajouter une ligne
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
      <Grid item container alignItems="center" direction="row-reverse" spacing={1}>
        <Grid item xs={12} sm="auto">
          <Button startIcon={<SaveIcon />} variant="contained" className={classes.saveButton} onClick={e => billForm.saveDraft()}>
            Enregistrer comme brouillon
          </Button>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Button startIcon={<CheckIcon />} variant="contained" className={classes.validateButton} onClick={e => billForm.submit()}>
            Valider le devis
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  validateButton: {
    color: "white",
    backgroundColor: green[500],
    "&:hover": { backgroundColor: green[700] }
  },
  saveButton: {
    color: "white",
    backgroundColor: purple[500],
    "&:hover": { backgroundColor: purple[700] }
  }
}));
export default BillForm;
