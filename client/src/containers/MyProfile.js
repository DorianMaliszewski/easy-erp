import React from "react";
import Layout from "../components/Layouts/Layout";
import routes from "../routes";
import { withStyles } from "@material-ui/core";

const MyProfile = props => {
  return (
    <Layout title={routes.MY_PROFILE.title}>
      <div>Mon profil</div>
    </Layout>
  );
};
const styles = theme => ({});

export default withStyles(styles)(MyProfile);
