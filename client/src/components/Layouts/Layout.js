import React from "react";
import PropTypes from "prop-types";
// Utils
import { withWidth } from "@material-ui/core";
import DesktopLayout from "./DesktopLayout";

function Layout(props) {
  return <DesktopLayout {...props}>{props.children}</DesktopLayout>;
}

Layout.propTypes = {
  children: PropTypes.any.isRequired
};

export default withWidth()(Layout);
