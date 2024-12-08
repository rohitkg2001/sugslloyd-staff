import {
  UPDATE_TASK,
  VIEW_TASK,
  INITIALIZE_TASKS,
  BASE_URL,
} from "../constant";

export const getAllTasks = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/tasks`);
    const data = await response.json();

    dispatch({ type: INITIALIZE_TASKS, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const viewTask = (taskId) => ({
  type: VIEW_TASK,
  payload: taskId,
});
