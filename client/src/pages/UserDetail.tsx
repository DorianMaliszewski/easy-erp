import React, { useContext } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import usePromise from "../hooks/usePromise";
import UserContext from "../contexts/UserContext";
import { useHistory, useParams } from "react-router-dom";
import UserDetailCard from "../components/User/UserDetailCard";
import { useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useUserContext } from "../providers/UserProvider";
import { UserData } from "../models/UserData";

const UserDetail: React.FC<any> = () => {
  const history = useHistory();
  const { id } = useParams();
  const userContext = useUserContext();
  const [user, setUser] = React.useState<UserData>(new UserData());

  useEffect(() => {
    if (id) {
      userContext.findById(parseInt(id, 10)).subscribe((u: UserData) => setUser(u));
    }
  }, [id]);

  if (userContext.state.isLoading || !user) {
    return <Splashscreen text="Chargement de l'utilisateur" />;
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Button onClick={e => history.goBack()}>
          <ChevronLeftIcon /> Retour
        </Button>
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="h5" component="h1">
          {user.firstName + " " + user.lastName}
        </Typography>
      </Grid>
      <Grid item>
        <UserDetailCard user={user} />
      </Grid>
    </Grid>
  );
};

export default UserDetail;
