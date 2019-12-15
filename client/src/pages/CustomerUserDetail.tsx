import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Theme } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import { makeStyles } from "@material-ui/styles";
import QuoteDetailDialogTopActions from "../components/Quotes/QuoteSavePDFAndViewPDFActions";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import UserContext from "../contexts/UserContext";
import CustomerUserCard from "../components/Customers/CustomerUserCard";

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  }
}));

const CustomerUserDetail: React.FC<any> = props => {
  const history = useHistory();
  const { id } = useParams();
  const userContext = useContext(UserContext);
  const [user, setUser] = useState({});
  const classes = useStyle();

  if (!user) {
    if (id) {
      userContext.findById(parseInt(id, 10)).then((u: any) => {
        if (u) {
          setUser(u);
        } else {
          history.goBack();
        }
      });
    } else {
      history.goBack();
    }
    return <Splashscreen text="Récupération de l'utilisateur client" />;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", paddingBottom: 20 }}>
        <div style={{ flexGrow: 1 }}>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </div>
        <QuoteDetailDialogTopActions />
      </div>
      <CustomerUserCard user={user} />
    </>
  );
};

CustomerUserDetail.propTypes = {};

export default CustomerUserDetail;
