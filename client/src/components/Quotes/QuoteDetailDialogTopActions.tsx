import React from "react";
import { IconButton } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import VisibilityIcon from "@material-ui/icons/Visibility";

const QuoteDetailDialogTopActions: React.FC<any> = props => {
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
    <div style={{ display: "flex", paddingLeft: 10 }}>
      <IconButton color="secondary" title="Enregistrer au format PDF" onClick={savePDF}>
        <SaveIcon />
      </IconButton>
      <IconButton title="Voir au format PDF" onClick={viewPDF}>
        <VisibilityIcon />
      </IconButton>
    </div>
  );
};

QuoteDetailDialogTopActions.propTypes = {};

export default QuoteDetailDialogTopActions;
