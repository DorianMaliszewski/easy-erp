import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useConfirmModal = (callbackFunction?: Function) => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState<any>("Êtes-vous sur de vouloir effectué cette action ? ");
  const [title, setTitle] = React.useState("Confirmation requise");
  const [callback, setCallback] = React.useState();

  React.useMemo(() => {
    setCallback(callbackFunction);
  }, [callbackFunction]);

  const handleClose = (response: boolean) => (event: React.MouseEvent) => {
    setOpen(false);
    if (callback && response) {
      callback();
    }
  };

  return {
    setOpen,
    open,
    setText,
    setTitle,
    setCallback,
    ConfirmDialogComponent: (
      <Dialog open={open} onClose={handleClose(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(false)}>Annuler</Button>
          <Button onClick={handleClose(true)} color="primary" variant="contained" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };
};

export default useConfirmModal;
