import React, { useContext, useState } from "react";
import Layout from "../components/Layouts/Layout";
import routes from "../routes";
import { withRouter } from "react-router-dom";
import { Button, withStyles } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import { makeStyles } from "@material-ui/styles";
import QuoteDetailDialogTopActions from "../components/Quotes/QuoteDetailDialogTopActions";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyle = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3
  }
}));

const CustomerUserDetail = ({ location, match, history }) => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  const classes = useStyle();

  if (!user) {
    userContext.findById(parseInt(match.params.id, 10)).then(u => {
      if (u) {
        setUser(u);
      } else {
        history.goBack();
      }
    });
    return (
      <Layout title={routes.CUSTOMER_USER_DETAIL.title}>
        <Splashscreen text="Récupération de l'utilisateur client" />
      </Layout>
    );
  }

  return (
    <Layout title={routes.CUSTOMER_USER_DETAIL.title} showGoBack>
      <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", paddingBottom: 20 }}>
        <div style={{ flexGrow: 1 }}>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </div>
        <QuoteDetailDialogTopActions />
      </div>
      <CustomerUserCard user={user} />
    </Layout>
  );
};

CustomerUserDetail.propTypes = {};

const styles = theme => ({});

export default withStyles(styles)(withRouter(CustomerUserDetail));
