import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import routes from "../../routes";
import { withStyles } from "@material-ui/core";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import usePromise from "../../hooks/usePromise";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const UserTable = React.lazy(() => import("../../components/User/UserTable"));

const ClientsUsers = props => {
  const userContext = useContext(UserContext);
  const { data, error, isLoading } = usePromise(userContext.findAll);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  
  useEffect(() => {
    if (error) {
      setShowErrorSnackbar(true);
    }
    
  }, [error]);

  return (
    <Layout title={routes.ADMIN.CLIENTS_USERS.title}>
      {data && (
        <React.Suspense fallback={<div>Chargement</div>}>
          <UserTable users={data} isLoading={isLoading} />
        </React.Suspense>
      )}
      <CustomSnackbar open={showErrorSnackbar} variant="error" message="Une erreur est survenue" setOpen={setShowErrorSnackbar} />
    </Layout>
  );
};

const styles = theme => ({});

export default withStyles(styles)(ClientsUsers);
