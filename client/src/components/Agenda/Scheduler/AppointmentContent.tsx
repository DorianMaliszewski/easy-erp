import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Typography } from "@material-ui/core";

const AppointmentContent: React.FC<any> = props => {
  return (
    <div>
      <Typography color="textPrimary">{props.data.title}</Typography>
      <Typography color="textSecondary">
        {moment(props.data.startDate, "YYYY-MM-DD HH:mm").format("HH[h]mm")} - {moment(props.data.endDate, "YYYY-MM-DD HH:mm").format("HH[h]mm")}
      </Typography>
    </div>
  );
};

AppointmentContent.propTypes = {
  data: PropTypes.object.isRequired
};

export default AppointmentContent;
