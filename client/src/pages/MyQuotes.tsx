import React, { useEffect } from "react";
import routes from "../routes";
import { Button, makeStyles, Theme, Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useQuoteContext } from "../providers/QuoteProvider";
import { BillOrQuoteTableEnhanced } from "../components/Tables/BillOrQuoteTableEnhanced/BillOrQuoteTableEnhanced";

const MyQuotes: React.FC<any> = props => {
  const quoteContext = useQuoteContext();
  const history = useHistory();
  const classes = useStyles();

  const handleRowClick = (event: any, id: string) => {
    history.push(routes.QUOTES_DETAIL.path.replace(":id", id));
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Button color="primary" variant="contained" onClick={(e: any) => history.push(routes.QUOTES_FORM.path)}>
          Créer un devis
        </Button>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <BillOrQuoteTableEnhanced rows={quoteContext.state.quotes} isLoading={quoteContext.state.isLoading} handleRowClick={handleRowClick} />
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

export default MyQuotes;
