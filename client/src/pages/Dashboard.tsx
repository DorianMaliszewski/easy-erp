import React, { useContext, useState } from "react";
import QuoteActivityWidget from "../components/Widgets/QuoteActivityWidget/QuoteActivityWidget";
import { Grid, Button, makeStyles, Theme } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import classNames from "classnames";
import DashboardContext from "../contexts/DashboardContext";
import { green } from "@material-ui/core/colors";
import CustomSnackbar from "../components/CustomSnackbar/CustomSnackbar";
import BillActivityWidget from "../components/Widgets/BillActivityWidget/BillActivityWidget";

let id = 0;
function createQuoteData(status: string, price: number, creator: string, client: string, createdAt: Date, updatedAt: Date) {
  id += 1;
  return { id, status, price, creator, client, createdAt, updatedAt };
}

const quotesRows = [
  createQuoteData("WAITING_CUSTOMER", 0.0, "admin", "Client 1", new Date("2019-04-05T08:24:00"), new Date()),
  createQuoteData("WAITING_CUSTOMER", 0.0, "admin", "Client 1", new Date("2019-04-03T08:24:00"), new Date()),
  createQuoteData("ACCEPTED", 0.0, "admin", "Client 2", new Date("2019-04-01T08:24:00"), new Date()),
  createQuoteData("CANCELED", 0.0, "admin", "Client 6", new Date("2019-04-03T08:24:00"), new Date())
];

id = 0;
function createBillData(status: string, price: number, creator: string, client: number, createdAt: Date, updatedAt: Date) {
  id += 1;
  return { id, status, price, creator, client, createdAt, updatedAt };
}

const billsRows = [
  createBillData("WAITING_CUSTOMER", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("ACCEPTED", 0.0, "admin", 1, new Date(), new Date()),
  createBillData("CANCELED", 0.0, "admin", 1, new Date(), new Date())
];

const Dashboard = () => {
  const classes = useStyles();
  const dashboardContext = useContext(DashboardContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const savePreferences = () => {
    dashboardContext.setEditingMode(false);
    setOpenSnackbar(true);
  };

  return (
    <>
      {dashboardContext.editingMode ? (
        <Grid container alignContent="center" justify="center">
          <Grid item>
            <Button variant="outlined" className={classNames(classes.saveButton)} onClick={savePreferences}>
              <SaveIcon />
              Enregistrer mes préférences
            </Button>
          </Grid>
        </Grid>
      ) : null}
      <QuoteActivityWidget quotes={quotesRows} />
      <BillActivityWidget bills={billsRows} />
      <CustomSnackbar open={openSnackbar} variant="success" message="Vos modifications ont été enregistrées" setOpen={setOpenSnackbar} />
    </>
  );
};

Dashboard.propTypes = {};

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(2)
  },
  leftIcon: {
    marginRight: theme.spacing(2)
  },
  rightIcon: {
    marginLeft: theme.spacing(2)
  },
  iconSmall: {
    fontSize: 20
  },
  saveButton: {
    backgroundColor: "white",
    borderColor: green[500],
    color: green[500],
    "&:hover": {
      backgroundColor: green[500],
      color: "white"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: green[500],
      borderColor: green[500]
    }
  }
}));

export default Dashboard;
