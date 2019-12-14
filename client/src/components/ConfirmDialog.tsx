import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from "@material-ui/core";

const ConfirmDialog: React.FC<any> = ({ open, closeModal, text, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={closeModal} scroll="body" aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Confirmation requise</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" autoFocus>
          Annuler
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  text: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ConfirmDialog;
