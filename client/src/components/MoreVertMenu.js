import React, { useContext } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReOrganizeDashboardMenuItem from "./ReOrganizeDashboardMenuItem";
import { withRouter } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import routes from "../routes";
import { Link } from "react-router-dom";
import DashboardContext from "../contexts/DashboardContext";

const MoreVertMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(DashboardContext);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    authContext.logout();
  };

  const handleEditDashboard = () => {
    dashboardContext.setEditingMode(true);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color='inherit' onClick={handleClick} aria-owns={anchorEl ? "more-menu" : undefined} aria-haspopup='true'>
        <MoreVertIcon />
      </IconButton>
      <Menu id='more-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {props.location.pathname === routes.DASHBOARD.path ? <ReOrganizeDashboardMenuItem onClick={handleEditDashboard} /> : null}
        <MenuItem component={Link} to={routes.MY_PROFILE.path} onClick={handleClose}>
          Mon profil
        </MenuItem>
        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
      </Menu>
    </div>
  );
};

MoreVertMenu.propTypes = {};

export default withRouter(MoreVertMenu);
