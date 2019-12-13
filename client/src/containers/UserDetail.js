import React, { useContext } from "react";
import Layout from "../components/Layouts/Layout";
import routes from "../routes";
import { Typography, withStyles, Button } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import usePromise from "../hooks/usePromise";
import UserContext from "../contexts/UserContext";
import { withRouter } from "react-router-dom";
import UserDetailCard from "../components/User/UserDetailCard";
import { useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const UserDetail = ({ match, history }) => {
  const userContext = useContext(UserContext);

  const { data, isLoading, race } = usePromise(userContext.findOneById, parseInt(match.params.id, 10));

  useEffect(() => {
    race(parseInt(match.params.id, 10));
  }, [match]);

  return (
    <Layout title={routes.USER_DETAIL.title}>
      <div>
        {isLoading ? (
          <Splashscreen text="Chargement de l'utilisateur" />
        ) : (
          data && (
            <>
              <Button onClick={e => history.goBack()}>
                <ChevronLeftIcon /> Retour
              </Button>
              <Typography gutterBottom align="center" variant="h3" component="h1">
                {data.name}
              </Typography>
              <UserDetailCard user={data} />
            </>
          )
        )}
      </div>
    </Layout>
  );
};

export default withStyles({})(withRouter(UserDetail));
