import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import DashboardContext from "../contexts/DashboardContext";

const DashboardProvider = props => {
  const [editingMode, setEditingMode] = useState(false);
  return <DashboardContext.Provider value={{ editingMode, setEditingMode }}>{props.children}</DashboardContext.Provider>;
};

DashboardProvider.propTypes = {};

export default withRouter(DashboardProvider);
