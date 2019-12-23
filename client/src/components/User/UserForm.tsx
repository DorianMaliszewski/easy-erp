import React from "react";
import { Grid, TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { UserData } from "../../models/UserData";
import { Autocomplete } from "@material-ui/lab";
import useCustomers from "../../hooks/useCustomers";
import { CustomerData } from "../../models/CustomerData";
import { UserFormData } from "../../models/UserFormData";

type UserFormProps = {
  user: UserFormData;
  setUser: Function;
};

const UserForm: React.FC<UserFormProps> = ({ user, setUser }) => {
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
        <TextField variant="outlined" label="Nom" value={user.firstName} id="firstName" onChange={handleChange} fullWidth />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Prénom" value={user.lastName} id="lastName" onChange={handleChange} fullWidth />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Email" value={user.email} id="email" onChange={handleChange} fullWidth />
      </Grid>
      <Grid item>
        <TextField variant="outlined" label="Téléphone" value={user.phoneNumber} id="phoneNumber" onChange={handleChange} fullWidth />
      </Grid>
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
      <Grid item>
        {user.sendEmail !== undefined && (
          <FormControlLabel control={<Checkbox checked={user.sendEmail} id="sendEmail" onChange={handleCheckboxChange} value="sendEmail" color="primary" />} label="Envoyer le mot de passe par mail" />
        )}
      </Grid>
      {!user.sendEmail && (
        <>
          <Grid item>
            <TextField variant="outlined" label="Mot de passe" value={user.password} id="password" onChange={handleChange} fullWidth />
          </Grid>
          <Grid item>
            <TextField variant="outlined" label="Confirmer mot de passe" value={user.confirmPassword} id="confirmPassword" onChange={handleChange} fullWidth />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default UserForm;
