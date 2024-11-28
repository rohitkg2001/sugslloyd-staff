import { UPDATE_TASK, VIEW_TASK, INITIALIZE_TASKS } from "../constant";

export const initializeTasks = () => ({
  type: INITIALIZE_TASKS,
});

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const viewTask = (taskId) => ({
  type: VIEW_TASK,
  payload: taskId,
});