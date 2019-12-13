import React, { useState } from "react";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import UserResetPasswordDialog from "./UserReinitPasswordDialog";

const useStyles = makeStyles(theme => ({
  gridLine: {
    paddingTop: theme.spacing.unit * 2
  }
}));

const UserReinitPasswordGridItem = () => {
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
        <Button variant="contained" onClick={e => setOpenDialog(true)}>
          Réinitialiser le mot de passe
        </Button>
      </Grid>
      <UserResetPasswordDialog open={openDialog} closeModal={setOpenDialog} />
    </>
  );
};

export default UserReinitPasswordGridItem;
