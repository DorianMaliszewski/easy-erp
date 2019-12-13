import React from "react";
import routes from "../routes";
import Layout from "../components/Layouts/Layout";

const EventDetail = props => {
  return (
    <Layout title={routes.EVENTS_DETAIL.title}>
      <div>Détail évènement</div>
    </Layout>
  );
};

EventDetail.propTypes = {};

export default EventDetail;
