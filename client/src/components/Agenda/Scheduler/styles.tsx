import { priorities } from "./test_data";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { Theme } from "@material-ui/core";

export default (theme: Theme) => ({
  contentItem: {
    paddingLeft: 0
  },
  contentItemValue: {
    padding: 0
  },
  contentItemIcon: {
    marginRight: theme.spacing(2)
  },
  flexibleSpace: {
    margin: "0 auto 0 0"
  },
  prioritySelector: {
    marginLeft: theme.spacing(1),
    minWidth: 140
  },
  prioritySelectorItem: {
    display: "flex",
    alignItems: "center"
  },
  priorityBullet: {
    borderRadius: "50%",
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: "inline-block"
  },
  defaultBullet: {
    background: theme.palette.divider
  },
  tooltipContent: {
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(1.2)
  },
  ...(priorities.reduce((acc: any, { title, color, activeColor }) => {
    acc[`${title}PriorityBackground`] = { background: color, "& button.edit-button": { background: lighten(color, 0.15) } };
    acc[`${title}PriorityColor`] = { color };
    acc[`${title}PriorityHover`] = { "&:hover": { background: activeColor } };
    return acc;
  }, {}) as {})
});
