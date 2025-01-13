import axios from "axios";
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

    dispatch({ type: INITIALIZE_TASKS, payload: myTasks });
  } catch (error) {
    console.error(error);
  }
};

export const getVendorPerformance = async (my_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data, status } = response;
    const myTasks =
      Array.isArray(data) &&
      data.filter((task) => task.engineer_id === my_id && task.vendor !== null);
    if (status === 200 && Array.isArray(data)) {
      const myTasks = data.filter(
        (task) => task.engineer_id === my_id && task.vendor !== null
      );

      const tasksByVendor = myTasks.reduce((acc, task) => {
        const { vendor, status: taskStatus } = task;
        const vendorId = vendor.id;
        const vendorName = vendor.name;

        if (!acc[vendorId]) {
          acc[vendorId] = {
            id: vendorId,
            name: vendorName,
            total_alloted: 0,
            status: 0,
          };
        }

        acc[vendorId].total_alloted += 1;
        if (taskStatus !== "Pending") {
          acc[vendorId].status += 1;
        }

        return acc;
      }, {});

      // Convert the object to a flat array
      const result = Object.values(tasksByVendor);
      return result;
    }
  } catch (err) {
    console.error(err);
  }
};
// TODO:Change in backend later on

export const getStaffPerformance = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data, status } = response;
    const userResponse = await axios.get(`${BASE_URL}/api/staff`);
    const siteEngineers = userResponse.data.vendors;
    // Filter tasks by

    const performanceByEngineer = siteEngineers.map((engineer) => {
      const engineerTasks = data.filter(
        (task) => task.engineer_id === engineer.id
      );

      // Summarize tasks for the engineer
      const total_alloted = engineerTasks.length;
      const status_not_pending = engineerTasks.filter(
        (task) => task.status !== "Pending"
      ).length;

      return {
        id: engineer.id,
        name: `${engineer.firstName} ` + `${engineer.lastName}`,
        total_alloted,
        status_not_pending,
      };
    });

    return performanceByEngineer; // Return the result array
    // Write methods to filter tasks by engineer_id where engineer_id is the id of the engineer from siteEngineers
  } catch (err) {
    console.error(err);
  }
};
// TODO:Change in backend later on

export const getTaskById = async (task_id) => {
  const response = await fetch(`${BASE_URL}/api/task/${task_id}`);
  const data = await response.json();
  return data;
  // dispatch({ type: VIEW_TASK, payload: data })
};

export const getTaskByCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data, status } = response;
    const filteredData = data.filter(
      (task) => task.activity.toLowerCase() === category.toLowerCase()
    );
    dispatch({ type: INITIALIZE_TASKS, payload: filteredData });
  } catch (error) {
    console.log(error);
  }
};

export const getTaskByVendor = (id) => async (dispatch) => {
  try {
    console.log(id);
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data, status } = response;
    console.log(data);
    const filteredData = data.filter((task) => task.vendor_id === id);
    dispatch({ type: INITIALIZE_TASKS, payload: filteredData });
  } catch (error) {
    console.log(error);
  }
};

export const getTaskByEngineer = (id) => async (dispatch) => {
  try {
    console.log(id);
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data, status } = response;
    console.log(data);
    const filteredData = data.filter((task) => task.engineer_id === id);
    dispatch({ type: INITIALIZE_TASKS, payload: filteredData });
  } catch (error) {
    console.log(error);
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
