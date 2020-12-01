import React from "react";
import { useUserContext } from "../../providers/UserProvider";
import { Button, Grid } from "@material-ui/core";
import routes from "../../routes";
import { useHistory } from "react-router-dom";

const UserTable = React.lazy(() => import("../../components/User/UserTable"));

const InternalUsers: React.FC<any> = props => {
  const userContext = useUserContext();
  const [internalUsers, setInternalUsers] = React.useState<any>();
  const history = useHistory();

  React.useEffect(() => {
    if (!internalUsers && !userContext.state.isLoading) {
      userContext.getInternalUsers().subscribe((users: any) => {
        setInternalUsers(users);
      });
    }
  }, [userContext, internalUsers]);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={e => history.push(routes.USER_ADD.path)}>
          Ajouter un utilisateur
        </Button>
      </Grid>
      <Grid item>
        <React.Suspense fallback={<div>Chargement</div>}>
          <UserTable users={internalUsers} isInternal isLoading={userContext.state.isLoading} />
        </React.Suspense>
      </Grid>
    </Grid>
  );
};

export default InternalUsers;
