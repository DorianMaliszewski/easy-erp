import React from "react";
import { Grid, Button, Typography, TextField, MenuItem } from "@material-ui/core";
import UserForm from "../../components/User/UserForm";
import { useUserContext } from "../../providers/UserProvider";
import { useParams, useHistory } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import { UserFormData } from "../../models/UserFormData";
import { RoleApi } from "../../api/RoleApi";
import { Subscription } from "rxjs";
import { RoleData } from "../../models/RoleData";

let rolesSubscription: Subscription;

const UserFormPage = () => {
  const [user, setUser] = React.useState(new UserFormData());
  const [roles, setRoles] = React.useState([]);
  const userContext = useUserContext();
  const { id } = useParams();
  const history = useHistory();
  const snackbar = useSnackbar();

  React.useEffect(() => {
    if (id && userContext.state.users) {
      userContext.findById(parseInt(id, 10)).subscribe((u: any) => {
        setUser({ ...u, password: "", sendPasswordByEmail: false, roleId: u.role.id });
      });
    }
  }, [id, userContext]);

  React.useEffect(() => {
    rolesSubscription = RoleApi.getInstance()
      .findAll()
      .subscribe((list: any) => {
        setRoles(list);
      });
    return () => rolesSubscription.unsubscribe();
  }, []);

  const handleSubmit = (event: any) => {
    userContext.save(user, true).subscribe((u: any) => {
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
    <form autoComplete="off">
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
          <UserForm user={user} setUser={setUser} isInternal />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="role"
            disabled={roles.length === 0}
            select
            label="Role"
            SelectProps={{
              displayEmpty: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            value={user.roleId || ""}
            onChange={e => setUser({ ...user, roleId: parseInt(e.target.value, 10) })}
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Utilisateur
            </MenuItem>
            {roles &&
              roles.map((option: RoleData) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.description}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item container direction="row-reverse">
          <Button color="primary" type="button" onClick={handleSubmit} variant="contained" disabled={disableSave()}>
            Enregistrer
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserFormPage;
