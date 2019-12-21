import React, { useState } from "react";
import { Grid, Typography, Button, Divider, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import UserResetPasswordDialog from "./UserReinitPasswordDialog";

const useStyles = makeStyles((theme: Theme) => ({
  gridLine: {
    paddingTop: theme.spacing(1)
  }
}));

const UserReinitPasswordGridItem: React.FC<any> = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <Grid item className={classes.gridLine} xs={12}>
        <Divider />
      </Grid>
      <Grid item className={classes.gridLine} xs={12} sm={6}>
        <Typography variant="body1" component="p">
          Mot de passe
        </Typography>
      </Grid>
      <Grid item className={classes.gridLine} xs={12} sm={6}>
        <Button variant="contained" onClick={(e: any) => setOpenDialog(true)}>
          Réinitialiser le mot de passe
        </Button>
      </Grid>
      <UserResetPasswordDialog open={openDialog} closeModal={(e: any) => setOpenDialog(false)} />
    </>
  );
};

export default UserReinitPasswordGridItem;
