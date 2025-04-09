import api, { handleAxiosError } from "../../utils/api";
import {
  VIEW_TASK,
  INITIALIZE_TASKS,
  BASE_URL,
  TOTAL_PENDING_STREETLIGHT,
  GET_PENDING_STREETLIGHTS,
  GET_SURVEYED_STREETLIGHTS,
  TOTAL_SURVEYED_STREETLIGHTS,
  GET_INSTALLED_STREETLIGHTS,
  TOTAL_INSTALLED_STREETLIGHTS,
  SET_BILL_DATA,
} from "../constant";

import axios from "axios";

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
    const response = await api.get(`${BASE_URL}/api/task`);
    const { data, status } = response;
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
            total_completed: 0,
            total_pending: 0,
          };
        }

        acc[vendorId].total_alloted += 1;
        if (taskStatus === "Completed") {
          acc[vendorId].total_completed += 1;
        } else if (taskStatus === "Pending") {
          acc[vendorId].total_pending += 1;
        }

        return acc;
      }, {});
      // Convert the object to a flat array
      const result = Object.values(tasksByVendor);
      // Sort vendors by performance (e.g., by total_completed in descending order)
      result.sort((a, b) => b.total_completed - a.total_completed);
      return result;
    }
  } catch (err) {
    handleAxiosError(err);
  }
};
// TODO:Change in backend later on

export const getStaffPerformance = async (my_id) => {
  try {
    console.log(my_id)
    const response = await api.get(`${BASE_URL}/api/staff/get-performance/${my_id}`);
    const { data, status } = response;
    console.log(data)
    return data
    // Write methods to filter tasks by engineer_id where engineer_id is the id of the engineer from siteEngineers
  } catch (err) {
    handleAxiosError(err);
  }
};
// TODO:Change in backend later on

export const getTaskById = async (task_id) => {
  const response = await fetch(`${BASE_URL}/api/task/${task_id}`);
  const data = await response.json();
  return data;
  // dispatch({ type: VIEW_TASK, payload: data })
};

export const getStreetlightById = async (streetlight_id) => {
  const response = await fetch(
    `${BASE_URL}api/streetlight/tasks/engineers/${streetlight_id}`
  );
  const data = await response.json();
 // console.log(data);
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
    console.error(error);
  }
};

export const getTaskByVendor = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data, status } = response;
    const filteredData = data.filter((task) => task.vendor_id === id);
    dispatch({ type: INITIALIZE_TASKS, payload: filteredData });
  } catch (error) {
    console.error(error);
  }
};

export const getTaskByEngineer = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data, status } = response;
    const filteredData = data.filter((task) => task.engineer_id === id);
    dispatch({ type: INITIALIZE_TASKS, payload: filteredData });
  } catch (error) {
    console.error(error);
  }
};

export const viewTask = (taskId) => ({
  type: VIEW_TASK,
  payload: taskId,
});

export const getStreetLightTasks = (my_id) => async (dispatch) => {
  const response = await axios.get(
    `${BASE_URL}/api/streetlight/tasks/engineers`,
    {
      params: { id: my_id },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { data } = response;
  const pendingSites = data.filter((task) => task.status === "Pending");
  const pendingSitesCount = pendingSites.length;
  const surveyedSites = data.filter((task) => task.site?.isSurveyDone);
  const surveyedSitesCount = surveyedSites.length;
  const installedSites = data.filter((task) => task.site?.isInstallationDone);
  const installedSitesCount = installedSites.length;
  dispatch({ type: TOTAL_PENDING_STREETLIGHT, payload: pendingSitesCount });
  dispatch({ type: GET_PENDING_STREETLIGHTS, payload: pendingSites });
  dispatch({ type: GET_SURVEYED_STREETLIGHTS, payload: surveyedSites });
  dispatch({ type: TOTAL_SURVEYED_STREETLIGHTS, payload: surveyedSitesCount });
  dispatch({ type: GET_INSTALLED_STREETLIGHTS, payload: installedSites });
  dispatch({
    type: TOTAL_INSTALLED_STREETLIGHTS,
    payload: installedSitesCount,
  });
};

export const setBillData = (billData) => ({
  type: "SET_BILL_DATA",
  payload: billData,
});
