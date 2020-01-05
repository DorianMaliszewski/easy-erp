import React from "react";
import { useUserContext } from "../../providers/UserProvider";
import { Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import routes from "../../routes";

const UserTable = React.lazy(() => import("../../components/User/UserTable"));

const ClientsUsers: React.FC<any> = props => {
  const userContext = useUserContext();
  const [customersUsers, setCustomersUsers] = React.useState<any>();
  const history = useHistory();

  React.useEffect(() => {
    if (!customersUsers && !userContext.state.isLoading) {
      userContext.getCustomerUsers().subscribe((users: any) => setCustomersUsers(users));
    }
  }, [userContext, customersUsers]);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={e => history.push(routes.CUSTOMER_USER_ADD.path)}>
          Ajouter un contact
        </Button>
      </Grid>
      <Grid item>
        <React.Suspense fallback={<div>Chargement</div>}>
          <UserTable users={customersUsers} isLoading={userContext.state.isLoading} />
        </React.Suspense>
      </Grid>
    </Grid>
  );
};

export default ClientsUsers;
