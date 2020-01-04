import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import UserForm from "../../components/User/UserForm";
import { useUserContext } from "../../providers/UserProvider";
import { useParams, useHistory } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import { UserFormData } from "../../models/UserFormData";

const UserFormPage = () => {
  const [user, setUser] = React.useState(new UserFormData());
  const userContext = useUserContext();
  const { id } = useParams();
  const history = useHistory();
  const snackbar = useSnackbar();

  React.useEffect(() => {
    if (id) {
      userContext.findById(id).subscribe((u: any) => setUser(u));
    }
  }, [id, userContext]);

  const handleSubmit = (event: any) => {
    userContext.save(user).subscribe((u: any) => {
      snackbar.show("Modification enregistrée", "success");
    });
  };

  const disableSave = () => {
    let success = true;
    if (!user.sendPasswordByEmail) {
      if (user.password.length < 8 || user.password !== user.confirmPassword) {
        success = false;
      }
    } else {
      if (!user.email || !user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        success = false;
      }
    }
    if (user.username.length < 6 || !user.firstName || !user.lastName) {
      success = false;
    }
    return !success;
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Button onClick={e => history.goBack()}>Retour</Button>
      </Grid>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          {user.id ? "Modification" : "Création"} d'un utilisateur
        </Typography>
      </Grid>
      <Grid item>
        <UserForm user={user} setUser={setUser} />
      </Grid>
      <Grid item container direction="row-reverse">
        <Button color="primary" onClick={handleSubmit} variant="contained" disabled={disableSave()}>
          Enregistrer
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserFormPage;
