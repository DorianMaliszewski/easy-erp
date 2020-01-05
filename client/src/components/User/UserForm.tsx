import React from "react";
import { Grid, TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import useCustomers from "../../hooks/useCustomers";
import { CustomerData } from "../../models/CustomerData";
import { UserFormData } from "../../models/UserFormData";

type UserFormProps = {
  user: UserFormData;
  setUser: Function;
  isInternal?: boolean;
};

const UserForm: React.FC<UserFormProps> = ({ user, setUser, isInternal = false }) => {
  const { customers, isLoading } = useCustomers();
  const handleChange = (event: any) => {
    const newUser: any = { ...user };
    newUser[event.target.id] = event.target.value;
    setUser(newUser);
  };

  const handleClientChange = (event: any, value: any) => {
    const newUser: any = { ...user };
    newUser.clientId = value.id;
    setUser(newUser);
  };

  const handleCheckboxChange = (event: any) => {
    const newUser: any = { ...user };
    newUser[event.target.id] = event.target.checked;
    setUser(newUser);
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <TextField variant="outlined" label="Identifiant" value={user.username} id="username" disabled={user.id ? true : false} onChange={handleChange} fullWidth />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Nom" value={user.firstName || ""} id="firstName" onChange={handleChange} fullWidth />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Prénom" value={user.lastName || ""} id="lastName" onChange={handleChange} fullWidth />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Email" value={user.email || ""} id="email" onChange={handleChange} fullWidth />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Téléphone" value={user.phoneNumber || ""} id="phoneNumber" onChange={handleChange} fullWidth />
      </Grid>
      {!isInternal && (
        <Grid item>
          <Autocomplete
            id="customer"
            options={customers}
            getOptionLabel={(option: CustomerData) => option.name}
            loading={isLoading}
            getOptionSelected={(option, value) => option.id === value}
            value={user.clientId && customers ? customers.find((c: any) => c.id === user.clientId) : null}
            onChange={handleClientChange}
            renderInput={params => <TextField {...params} variant="outlined" required id="client" name="client" label="Client" fullWidth />}
          />
        </Grid>
      )}
      <Grid item>
        {user.sendPasswordByEmail !== undefined && (
          <FormControlLabel
            control={<Checkbox checked={user.sendPasswordByEmail} id="sendPasswordByEmail" onChange={handleCheckboxChange} value="sendPasswordByEmail" color="primary" />}
            label={`Envoyer ${!user.id ? "le" : "un nouveau"} mot de passe par mail`}
          />
        )}
      </Grid>
      {!user.sendPasswordByEmail && (
        <>
          <Grid item>
            <TextField variant="outlined" type="password" InputProps={{autoComplete: "off"}} label="Mot de passe" value={user.password} id="password" onChange={handleChange} fullWidth />
          </Grid>
          <Grid item>
            <TextField variant="outlined" type="password" InputProps={{autoComplete: "off"}} label="Confirmer mot de passe" value={user.confirmPassword} id="confirmPassword" onChange={handleChange} fullWidth />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default UserForm;
