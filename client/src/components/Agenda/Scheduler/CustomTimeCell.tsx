import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import TableCell from "@material-ui/core/TableCell";
import { Theme } from "@material-ui/core/styles";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    border: 0,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "right",
    "&:last-child": {
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(1)
    }
  },
  text: {
    ...theme.typography.caption,
    whiteSpace: "nowrap"
  }
}));

const CustomTimeCell: React.FC<any> = ({ className, startDate, endDate, ...restProps }) => {
  const currentTime = moment(endDate);
  const classes = useStyles();
  return (
    <TableCell className={classNames(classes.cell, className)} {...restProps}>
      <span className={classes.text}>{currentTime.format("HH:mm")}</span>
    </TableCell>
  );
};

CustomTimeCell.propTypes = {
  endDate: PropTypes.instanceOf(Date).isRequired,
  startDate: PropTypes.instanceOf(Date),
  className: PropTypes.string
};

CustomTimeCell.defaultProps = {
  className: undefined,
  startDate: undefined
};

export default CustomTimeCell;
