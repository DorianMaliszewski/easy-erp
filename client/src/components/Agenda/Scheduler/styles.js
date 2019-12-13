import { priorities } from "./test_data";
import { lighten } from "@material-ui/core/styles/colorManipulator";

export default theme => ({
  ...priorities.reduce((acc, { title, color, activeColor }) => {
    acc[`${title}PriorityBackground`] = { background: color, "& button.edit-button": { background: lighten(color, 0.15) } };
    acc[`${title}PriorityColor`] = { color };
    acc[`${title}PriorityHover`] = { "&:hover": { background: activeColor } };
    return acc;
  }, {}),
  contentItem: {
    paddingLeft: 0
  },
  contentItemValue: {
    padding: 0
  },
  contentItemIcon: {
    marginRight: theme.spacing.unit
  },
  flexibleSpace: {
    margin: "0 auto 0 0"
  },
  prioritySelector: {
    marginLeft: theme.spacing.unit * 2,
    minWidth: 140
  },
  prioritySelectorItem: {
    display: "flex",
    alignItems: "center"
  },
  priorityBullet: {
    borderRadius: "50%",
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    display: "inline-block"
  },
  defaultBullet: {
    background: theme.palette.divider
  },
  tooltipContent: {
    paddingLeft: theme.spacing.unit * 2.2,
    paddingRight: theme.spacing.unit * 2.2
  }
});
