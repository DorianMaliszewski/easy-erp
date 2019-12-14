import React, { useState } from "react";
import { MenuItem } from "@material-ui/core";

const ReOrganizeDashboardMenuItem: React.FC<any> = props => {
  const [openOrganizeDashobardDialog, setOpenOrganizeDashobardDialog] = useState(false);

  function toggleOpenOrganizeDashboard() {
    setOpenOrganizeDashobardDialog(!openOrganizeDashobardDialog);
    props.onClick();
  }

  return <MenuItem onClick={toggleOpenOrganizeDashboard}>Réorganiser mon tableau de bord</MenuItem>;
};

ReOrganizeDashboardMenuItem.propTypes = {};

export default ReOrganizeDashboardMenuItem;
