import React from "react";
import { makeStyles } from "@material-ui/core";

import { getPriorityById, createClassesByPriorityId } from "./utils";
import styles from "./styles";

const useStyles = makeStyles(styles);

const AppointmentTypeSelectorItem: React.FC<any> = ({ id }) => {
  const classes = useStyles();
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

export default AppointmentTypeSelectorItem;
