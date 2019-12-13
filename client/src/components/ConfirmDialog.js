import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, withStyles } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const ConfirmDialog = ({ open, closeModal, text, onConfirm, onCancel, width, classes }) => {
  // Too much margin on mobile
  const paperProps = isWidthUp("sm", width) ? { style: { marginRight: "auto", marginLeft: "auto" } } : { style: { marginRight: 12, marginLeft: 12 } };

  return (
    <Dialog PaperProps={paperProps ? paperProps : null} open={open} onClose={closeModal} scroll='body' aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>Confirmation requise</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='primary' autoFocus>
          Annuler
        </Button>
        <Button onClick={onConfirm} variant='contained' color='primary'>
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

const styles = theme => ({
  root: {
    ...theme.mixins.gutters()
  }
});

export default withStyles(styles)(withWidth()(ConfirmDialog));
