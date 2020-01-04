import React from "react";
import { Button, Paper, makeStyles, Grid, Theme } from "@material-ui/core";
import routes from "../routes";
import { useHistory } from "react-router-dom";
import { BillOrQuoteTableEnhanced } from "../components/Tables/BillOrQuoteTableEnhanced/BillOrQuoteTableEnhanced";
import { useBillContext } from "../providers/BillProvider";

const MyBills: React.FC<any> = props => {
  const billContext = useBillContext();
  const history = useHistory();
  const classes = useStyles();

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
