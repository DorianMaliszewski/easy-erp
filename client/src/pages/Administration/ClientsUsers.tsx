import React, { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import usePromise from "../../hooks/usePromise";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const UserTable = React.lazy(() => import("../../components/User/UserTable"));

const ClientsUsers: React.FC<any> = props => {
  const userContext = useContext(UserContext);
  const { data, error, isLoading } = usePromise(userContext.findAll, null);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  useEffect(() => {
    if (error) {
      setShowErrorSnackbar(true);
    }
  }, [error]);

  return (
    <>
      {data && (
        <React.Suspense fallback={<div>Chargement</div>}>
          <UserTable users={data} isLoading={isLoading} />
        </React.Suspense>
      )}
      <CustomSnackbar open={showErrorSnackbar} variant="error" message="Une erreur est survenue" setOpen={setShowErrorSnackbar} />
    </>
  );
};

export default ClientsUsers;
