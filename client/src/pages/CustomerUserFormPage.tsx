import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import UserForm from "../components/User/UserForm";
import { useUserContext } from "../providers/UserProvider";
import { useParams, useHistory } from "react-router-dom";
import useSnackbar from "../hooks/useSnackbar";
import { UserFormData } from "../models/UserFormData";

const CustomerUserFormPage = () => {
  const [user, setUser] = React.useState(new UserFormData());
  const userContext = useUserContext();
  const { id } = useParams();
  const history = useHistory();
  const snackbar = useSnackbar();

  React.useEffect(() => {
    if (id && userContext.state.users) {
      userContext.findById(parseInt(id, 10)).subscribe((u: any) => {
        setUser({ ...u, password: "", sendPasswordByEmail: false });
      });
    }
  }, [id, userContext]);

  const handleSubmit = (event: any) => {
    userContext.save(user, false).subscribe((u: any) => {
      snackbar.show("Modification enregistrée", "success");
    });
  };

  const disableSave = () => {
    let success = true;
    if (!user.sendPasswordByEmail) {
      // Si le mot de passe entrer ne dépasse pas 6 caractères et les mot de passes ne correspondent pas
      // S'il s'agit d'une modification alors si le champs password est vide alors ça veut dire qu'on veut pas changer le mot de passe de l'utilisateur
      if ((user.password.length < 8 || user.password !== user.confirmPassword) && !(user.id && user.password.length === 0)) {
        success = false;
      }
    } else {
      // Dans le cas où l'on choisi d'envoyer le mot de passe par email on vérifie qu'il s'agit d'un email valide
      if (!user.email || !user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        success = false;
      }
    }
    // On veirifie que le username, le nom et le prenom soit correctement renseigné
    if (user.username.length < 4 || !user.firstName || !user.lastName) {
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
          {user.id ? "Modification" : "Création"} d'un contact
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

export default CustomerUserFormPage;
