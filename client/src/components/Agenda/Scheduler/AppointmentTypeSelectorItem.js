import React from "react";
import { withStyles } from "@material-ui/core";

import styles from "./styles";
import { getPriorityById, createClassesByPriorityId } from "./utils";

const AppointmentTypeSelectorItem = ({ id, classes }) => {
  let bulletClass = classes.defaultBullet;
  let text = "Tous";
  if (id) {
    bulletClass = createClassesByPriorityId(id, classes, { background: true });
    text = getPriorityById(id);
  }
  return (
    <div className={classes.prioritySelectorItem}>
      <span className={`${classes.priorityBullet} ${bulletClass}`} />
      {text}
    </div>
  );
};

export default withStyles(styles)(AppointmentTypeSelectorItem);
