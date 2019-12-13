import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import BillActivityListItem from "./BillActivityListItem";

const BillActivityList = ({ bills }) => {
  return (
    <List>
      {bills.map(bill => (
        <BillActivityListItem key={bill.id} bill={bill} />
      ))}
    </List>
  );
};

BillActivityList.propTypes = {
  bills: PropTypes.array.isRequired
};

export default BillActivityList;
