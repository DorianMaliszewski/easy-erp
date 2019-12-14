import { priorities } from "./test_data";

export const getPriorityById = (priorityId: number) => {
  const priorityFinded = priorities.find(({ id }) => id === priorityId);
  return priorityFinded ? priorityFinded.title : "";
};

export const createClassesByPriorityId = (priorityId: number, classes: any, { background = false, color = false, hover = false }) => {
  const priority = getPriorityById(priorityId);
  const result = [];
  if (background) result.push(classes[`${priority}PriorityBackground`]);
  if (color) result.push(classes[`${priority}PriorityColor`]);
  if (hover) result.push(classes[`${priority}PriorityHover`]);
  return result.join(" ");
};
