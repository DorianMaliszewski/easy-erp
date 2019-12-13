import React from "react";
import { withStyles, FormControl, Select, MenuItem } from "@material-ui/core";
import AppointmentTypeSelectorItem from "./AppointmentTypeSelectorItem";

import { priorities } from "./test_data";
import styles from "./styles";

const AppointTypeSelector = ({ classes, typeChange, type }) => (
  <FormControl className={classes.prioritySelector}>
    <Select
      disableUnderline
      value={type}
      onChange={e => {
        typeChange(e.target.value);
      }}
      renderValue={value => <AppointmentTypeSelectorItem id={value} classes={classes} />}>
      <MenuItem value={0}>
        <AppointmentTypeSelectorItem id={0} classes={classes} />
      </MenuItem>
      {priorities.map(({ id }) => (
        <MenuItem value={id} key={id.toString()}>
          <AppointmentTypeSelectorItem id={id} classes={classes} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles, { name: "AppointTypeSelector" })(AppointTypeSelector);
