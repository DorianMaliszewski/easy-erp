import React from "react";
import { IconButton, makeStyles, Theme } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { purple } from "@material-ui/core/colors";
import { BillApi } from "../../api/BillApi";
import { AUTH_TOKEN } from "../../constants";

const BillDetailDialogTopActions: React.FC<any> = ({ bill }) => {
  const classes = useStyles();

  const savePDF = (e: any) => {
    var a = document.createElement("a");
    //On met l'url en dur pour ne pas perdre le nom du fichier
    a.href = BillApi.getInstance().getApiUrl() + "/" + bill.id + "/show-pdf?access_token=" + localStorage.getItem(AUTH_TOKEN);
    document.body.appendChild(a);
    a.target = "_blank";
    a.click();
    a.remove();
  };

  const viewPDF = (e: any) => {
    BillApi.getInstance()
      .getPDF(bill.id)
      .subscribe(pdf => {
        var url = window.URL.createObjectURL(pdf);
        window.open(url, "_blank");
      });
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
