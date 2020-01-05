import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import { useHistory, useParams } from "react-router-dom";
import UserDetailCard from "../components/User/UserDetailCard";
import { useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useUserContext } from "../providers/UserProvider";
import { UserData } from "../models/UserData";
import routes from "../routes";

const CustomerUserDetail: React.FC<any> = () => {
  const history = useHistory();
  const { id } = useParams();
  const userContext = useUserContext();
  const [user, setUser] = React.useState<UserData>(new UserData());

  useEffect(() => {
    if (id) {
      userContext.findById(parseInt(id, 10)).subscribe((u: UserData) => setUser(u));
    }
  }, [id, userContext]);

  if (userContext.state.isLoading || !user) {
    return <Splashscreen text="Chargement du contact" />;
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Button onClick={e => history.goBack()}>
          <ChevronLeftIcon /> Retour
        </Button>
      </Grid>
      <Grid item container justify="space-between">
        <Grid item>
          <Typography gutterBottom variant="h5" component="h1">
            {user.firstName + " " + user.lastName}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={e => history.push(routes.CUSTOMER_USER_UPDATE.path.replace(":id", user.id ? user.id.toString() : ""))}>
            Modifier
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <UserDetailCard user={user} />
      </Grid>
    </Grid>
  );
};

export default CustomerUserDetail;
