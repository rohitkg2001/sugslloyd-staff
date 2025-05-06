import axios from "axios";
import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  BASE_URL,
  ADD_CONVEYANCE,
  ADD_BILL,
  GET_ALL_BILLS,
} from "../constant";

export const getStateById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/fetch-states`, {
    method: "POST",
  });
  const data = await response.json();
  const state = await data?.states.find((item) => item.id === id);
  return state.name;
};

export const fetchProjects = (my_id) => async (dispatch) => {
  try {
    const response = await fetch(`
  ${BASE_URL}/api/projects/${my_id}`);
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Ensure data is an array before filtering
    if (!Array.isArray(data)) {
      throw new Error("Expected an array of projects but got something else");
    }
    const myProjects = data.filter(
      (project, index) => project.project_type !== "1"
    );
    dispatch({ type: FETCH_PROJECTS, payload: myProjects });
  } catch (error) {
    console.error(error);
  }
};

export const getProjectCounts = async () => {
  const response = await fetch(`${BASE_URL}/api/projects/`);
  const data = await response.json();
  const projectCounts = data.length;
  return [
    {
      id: 1,
      count: projectCounts,
      status: "total_projects",
      page: "totalProjectsScreen",
      backgroundColor: "#A0D3E8",
    },
  ];
};

export const addProject = (project) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    const data = await response.json();
    dispatch({ type: ADD_PROJECT, payload: data.project });
    return true;
  } catch (error) {
    return false;
  }
};

export const addConveyance = (conveyance) => async (dispatch) => {
  try {
    console.log("Submitting conveyance:", conveyance);

    const response = await axios.post(
      `${BASE_URL}/api/conveyances`,
      conveyance,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Full response from API:", response.data);

    // Adjust this according to actual response structure
    const submittedData = response?.data?.data || response?.data;

    if (!submittedData) {
      console.error("No conveyance data returned from server.");
      return false;
    }

    dispatch({ type: ADD_CONVEYANCE, payload: submittedData });
    console.log("Conveyance submitted successfully.");
    return true;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    console.error("Error submitting conveyance:", message);
    return false;
  }
};

export const addBill = (billData) => async (dispatch) => {
  try {
    console.log("Posting bill data to API:", billData);

    const response = await axios.post(`${BASE_URL}/api/tadas`, billData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: ADD_BILL,
      payload: response.data,
    });

    console.log("Bill posted successfully.");
    return true;
  } catch (error) {
    console.error(
      "Failed to post bill:",
      error.response?.data?.message || error.message
    );
    return false;
  }
};

export const getAllBills = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tadas`);

    dispatch({
      type: GET_ALL_BILLS,
      payload: response.data,
    });

    console.log("Fetched all bills successfully.");
  } catch (error) {
    console.error(
      "Failed to fetch bills:",
      error.response?.data?.message || error.message
    );
  }
};
