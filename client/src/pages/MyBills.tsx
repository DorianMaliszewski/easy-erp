import React, { useContext, useEffect } from "react";
import BillsTable from "../components/Bills/BillsTable";
import { Button, Paper, makeStyles, Grid, Theme } from "@material-ui/core";
import BillContext from "../contexts/BillContext";
import routes from "../routes";
import { useHistory } from "react-router-dom";
import { BillOrQuoteTableEnhanced } from "../components/Tables/BillOrQuoteTableEnhanced/BillOrQuoteTableEnhanced";

const MyBills: React.FC<any> = props => {
  const billContext = useContext(BillContext);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!billContext.state.bills && !billContext.state.isLoading) {
      billContext.findAll();
    }
  }, [billContext]);

  const handleRowClick = (event: any, id: string) => {
    history.push(routes.BILLS_DETAIL.path.replace(":id", id));
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Button color="primary" variant="contained" onClick={e => history.push(routes.BILLS_FORM.path)}>
          Créer une facture
        </Button>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <BillOrQuoteTableEnhanced rows={billContext.state.bills} isLoading={billContext.state.isLoading} handleRowClick={handleRowClick} />
        </Paper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

export default MyBills;
