import React from "react";
import Layout from "../components/Layouts/Layout";
import routes from "../routes";
import AgendaScheduler from "../components/Agenda/AgendaScheduler";
import { withStyles } from "@material-ui/core";

const MyAgenda = props => {
  return (
    <Layout title={routes.MY_AGENDA.title}>
      <AgendaScheduler />
    </Layout>
  );
};

const styles = theme => ({});

export default withStyles(styles)(MyAgenda);
