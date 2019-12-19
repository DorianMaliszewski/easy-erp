import React from "react";
import { IconButton, makeStyles, Theme } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { purple } from "@material-ui/core/colors";

const BillDetailDialogTopActions: React.FC<any> = props => {
  const classes = useStyles();

  const savePDF = (e: any) => {
    var aLink = document.createElement("a");
    aLink.href = "/assets/modele-devis.pdf";
    aLink.download = "devis.pdf";
    aLink.style.display = "none";
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  };

  const viewPDF = (e: any) => {
    window.open("/assets/modele-devis.pdf", "_blank");
  };

  return (
    <>
      <IconButton className={classes.saveButton} title="Enregistrer au format PDF" onClick={savePDF}>
        <SaveIcon />
      </IconButton>
      <IconButton title="Voir au format PDF" onClick={viewPDF}>
        <VisibilityIcon />
      </IconButton>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  saveButton: {
    color: purple[500]
  }
}));

export default BillDetailDialogTopActions;
