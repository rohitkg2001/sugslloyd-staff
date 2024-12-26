import {
  UPDATE_TASK,
  VIEW_TASK,
  INITIALIZE_TASKS,
  BASE_URL,
} from "../constant";

export const getAllTasks = (my_id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/task`);
    const data = await response.json();

    const myTasks =
      Array.isArray(data) && data.filter((task) => task.engineer_id === my_id);
    // console.log(myTasks);
    dispatch({ type: INITIALIZE_TASKS, payload: myTasks });
  } catch (error) {
    console.error(error);
  }
};

export const getTaskById = async (task_id) => {
  const response = await fetch(`${BASE_URL}/api/task/${task_id}`)
  const data = await response.json()
  return data
  // dispatch({ type: VIEW_TASK, payload: data })
}

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const viewTask = (taskId) => ({
  type: VIEW_TASK,
  payload: taskId,
});
