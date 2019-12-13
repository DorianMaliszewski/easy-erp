import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function OrganizeDashboardDialog(props) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby='add-widget-dashboard-dialog-title'>
      <DialogTitle id='add-widget-dashboard-dialog-title'>Réorganiser mon tableau de bord</DialogTitle>
      <DialogContent>
        <DialogContentText>Choisissez dans la liste déroulante l'outil que vous souhaitez ajouter</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Annuler
        </Button>
        <Button onClick={handleClose} color='primary'>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrganizeDashboardDialog;
