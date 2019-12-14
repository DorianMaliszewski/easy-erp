import React, { useContext } from "react";
import { Table, TableHead, TableRow, TableCell, TextField, TableFooter, Fab, Button, Grid } from "@material-ui/core";
import QuoteFormBody from "./QuoteFormBody";
import SingleSelectAutoComplete from "../Autocomplete/SingleSelectAutoComplete";
import QuoteFormContext from "../../contexts/QuoteFormContext";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";

const QuoteForm: React.FC<any> = ({ quote }) => {
  const quoteFormContext = useContext(QuoteFormContext);
  const [single, setSingle] = React.useState(null);

  function handleChangeSingle(value: any) {
    setSingle(value);
    quoteFormContext.setClient(value);
  }
  return (
    <>
      <Grid container direction="row" alignItems="center" alignContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            style={{ marginTop: 20 }}
            label="TVA"
            variant="outlined"
            type="number"
            value={quoteFormContext.tva ? quoteFormContext.tva : ""}
            onChange={e => quoteFormContext.changeTva(parseInt(e.target.value, 10))}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <SingleSelectAutoComplete
            label="Client"
            placeholder="Chercher un client"
            value={single}
            onChange={handleChangeSingle}
            options={["Client 1", "Client 2", "Client 3"].map((el, i) => ({ value: i, label: el }))}
          />
        </Grid>
      </Grid>
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
        <QuoteFormBody quote={quote} />
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} align="center">
              <Fab aria-label="Ajouter une ligne" color="primary" onClick={e => quoteFormContext.addLine()}>
                <AddIcon />
              </Fab>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Grid container alignItems="center" direction="row-reverse">
        <Grid item>
          <Button variant="contained" color="secondary" onClick={e => quoteFormContext.submit()}>
            <CheckIcon style={{ marginRight: 10 }} /> Valider
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

QuoteForm.propTypes = {};

export default QuoteForm;
