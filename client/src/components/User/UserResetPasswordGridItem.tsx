import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import UserResetPasswordDialog from "./UserResetPasswordDialog";

const UserResetPasswordGridItem: React.FC<any> = ({ user }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Grid item container direction="row" alignItems="center" spacing={1}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" component="p">
          Mot de passe
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" onClick={(e: any) => setOpenDialog(true)}>
          Modifier mon mot de passe
        </Button>
      </Grid>
      <UserResetPasswordDialog user={user} closeModal={(e: any) => setOpenDialog(false)} open={openDialog} />
    </Grid>
  );
};

export default UserResetPasswordGridItem;
