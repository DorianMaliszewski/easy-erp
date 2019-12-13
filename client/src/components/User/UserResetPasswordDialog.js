import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const UserResetPasswordDialog = ({ closeModal, open }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleConfirm = e => {
    setOpenSnackbar(true);
    closeModal();
  };

  return (
    <>
      <Dialog onClose={closeModal} aria-labelledby="reinit-user-dialog" open={open}>
        <DialogTitle id="reinit-user-dialog-title">Modifier mon mot de passe</DialogTitle>
        <DialogContent>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
            required
            id="old-password"
            label="Ancien mot de passe"
            placeholder="Mot de passe actuel"
            type="password"
            margin="normal"
          />
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
            required
            id="new-password"
            label="Nouveau mot de passe"
            placeholder="Nouveau mot de passe"
            type="password"
            margin="normal"
          />
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
            required
            id="confirm-password"
            label="Confirmer le mot de passe"
            placeholder="Confirmer le mot de passe"
            type="password"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Annuler</Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      {openSnackbar && <CustomSnackbar open={true} autoHideDuration={3000} variant="success" message="Votre mot de passe à été modifié" setOpen={setOpenSnackbar} />}
    </>
  );
};

export default UserResetPasswordDialog;
