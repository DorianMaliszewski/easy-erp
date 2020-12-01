import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import UserResetPasswordDialog from "./UserReinitPasswordDialog";

const UserReinitPasswordGridItem: React.FC<any> = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Grid item container alignItems="center" spacing={1}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" component="p">
          Mot de passe
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" onClick={(e: any) => setOpenDialog(true)}>
          Réinitialiser le mot de passe
        </Button>
      </Grid>
      <UserResetPasswordDialog open={openDialog} closeModal={(e: any) => setOpenDialog(false)} />
    </Grid>
  );
};

export default UserReinitPasswordGridItem;
