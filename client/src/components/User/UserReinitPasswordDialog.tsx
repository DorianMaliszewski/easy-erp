import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const UserResetPasswordDialog: React.FC<any> = ({ closeModal, open }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [newPasswd, setNewPasswd] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");
  const handleConfirm = (e: any) => {
    if (sendEmail) {
      setSnackbarText("Mot de passe envoyé par email");
    } else {
      setSnackbarText("Mot de passe modifié");
    }
    setOpenSnackbar(true);
    closeModal();
  };

  const enableConfirmButton = () => {
    return sendEmail ? false : newPasswd.length < 6 || newPasswd !== confirmPasswd;
  };

  return (
    <>
      <Dialog onClose={closeModal} aria-labelledby="reinit-user-dialog" open={open}>
        <DialogTitle id="reinit-user-dialog-title">Réinitialiser le mot de passe</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox checked={sendEmail} onChange={e => setSendEmail(!sendEmail)} value="sendEmail" />} label="Envoyer un nouveau mot de passe par email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{
                  shrink: true
                }}
                disabled={sendEmail}
                fullWidth
                required
                id="new-password"
                label="Nouveau mot de passe"
                placeholder="Nouveau mot de passe"
                type="password"
                margin="normal"
                value={newPasswd}
                onChange={e => setNewPasswd(e.target.value)}
              />
              <TextField
                InputLabelProps={{
                  shrink: true
                }}
                disabled={sendEmail}
                fullWidth
                required
                value={confirmPasswd}
                onChange={e => setConfirmPasswd(e.target.value)}
                id="confirm-password"
                label="Confirmer le mot de passe"
                placeholder="Confirmer le mot de passe"
                type="password"
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Annuler</Button>
          <Button disabled={enableConfirmButton()} variant="contained" color="primary" onClick={handleConfirm}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      {openSnackbar && <CustomSnackbar open={true} autoHideDuration={3000} variant="success" message={snackbarText} setOpen={setOpenSnackbar} />}
    </>
  );
};

export default UserResetPasswordDialog;
