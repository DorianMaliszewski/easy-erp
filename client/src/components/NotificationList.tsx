import React from "react";
import { IconButton, Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

const NotificationList: React.FC<any> = props => {
  return (
    <IconButton color="inherit">
      <Badge badgeContent={4} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

NotificationList.propTypes = {};

export default NotificationList;
