import React from "react";
import Layout from "../../components/Layouts/Layout";
import routes from "../../routes";
import { withStyles } from "@material-ui/core";

const Users = props => {
  return (
    <Layout title={routes.ADMIN.USERS.title}>
      <div>Admin utilisateurs internes</div>
    </Layout>
  );
};

const styles = theme => ({});

export default withStyles(styles)(Users);
