import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import StoreIcon from "@material-ui/icons/Store";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import DescriptionIcon from "@material-ui/icons/Description";

import { withRouter } from "react-router-dom";
import routes from "../../routes";
import { List } from "@material-ui/core";
import ListItemRoute from "../ListItemRoute";

export const PrincipalMenu = props => {
  return (
    <List>
      <ListItemRoute text="Mon Tableau de bord" icon={<DashboardIcon />} route={routes.DASHBOARD.path} />
      <ListItemRoute text="Emploi du temps" icon={<CalendarTodayIcon />} route={routes.MY_AGENDA.path} />
      <ListItemRoute text="Clients" icon={<StoreIcon />} route={routes.MY_CUSTOMERS.path} />
      <ListItemRoute text="Devis" icon={<DescriptionIcon />} route={routes.MY_QUOTES.path} />
      <ListItemRoute text="Factures" icon={<EuroSymbolIcon />} route={routes.MY_BILLS.path} />
    </List>
  );
};

export default withRouter(PrincipalMenu);
