import { priorities } from "./test_data";

export const getPriorityById = priorityId => priorities.find(({ id }) => id === priorityId).title;

export const createClassesByPriorityId = (priorityId, classes, { background = false, color = false, hover = false }) => {
  const priority = getPriorityById(priorityId);
  const result = [];
  if (background) result.push(classes[`${priority}PriorityBackground`]);
  if (color) result.push(classes[`${priority}PriorityColor`]);
  if (hover) result.push(classes[`${priority}PriorityHover`]);
  return result.join(" ");
};
