import axios from "axios";
import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  BASE_URL,
  ADD_CONVEYANCE,
  ADD_BILL,
  GET_ALL_BILLS,
  GET_ALL_CONVEYANCE,
  GET_CONVEYANCE_BY_ID,
  GET_BILL_BY_ID,
  GET_ALL_VEHICLES,
  GET_ALLOWED_EXPENSE,
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

export const getConveyanceById = (my_id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/conveyances/${my_id}`);
    dispatch({ type: GET_CONVEYANCE_BY_ID, payload: data.data });
  } catch (error) {
    console.error(
      "Error fetching conveyance:",
      error?.response?.data?.message || error.message
    );
  }
};

export const getAllConveyance = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/conveyances`);
    console.log("API Response:", response.data);

    const result = response.data;

    if (result.status) {
      dispatch({
        type: GET_ALL_CONVEYANCE,
        payload: response.data.data,
      });
    } else {
      console.warn("Failed to fetch conveyances:", result.message);
    }
  } catch (error) {
    console.error("Failed to fetch conveyances:", error);
  }
};

// export const addBill = (billData) => async (dispatch) => {
//   try {
//     console.log("Sending bill data:", JSON.stringify(billData, null, 2)); // prettier logging

//     const response = await axios.post(`${BASE_URL}/api/tadas`, billData);

//     console.log("Response:", response.status, response.data);

//     // Safe check before dispatch
//     if (response?.data) {
//       dispatch({ type: ADD_BILL, payload: response.data });
//     } else {
//       console.warn("Response data is undefined!");
//     }

//     return true;
//   } catch (error) {
//     console.error("Add Bill Error:", error?.message || error);

//     if (error.response) {
//       // Server responded but with error status (e.g. 400/500)
//       console.error(
//         "Server responded with:",
//         error.response.status,
//         error.response.data
//       );
//     } else if (error.request) {
//       // Request made but no response
//       console.error("No response received:", error.request);
//     } else {
//       // Setup or config error
//       console.error("Error setting up request:", error.message);
//     }

//     return false;
//   }
// };

export const addBill = (billData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/tadas`, billData);

    if (response.status === 201) {
      dispatch({ type: "ADD_BILL_SUCCESS", payload: response.data });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Redux Add Bill Error:", error);
    return false;
  }
};

export const getAllowedExpense = (my_id, city) => async (dispatch) => {
  try {
    console.log(my_id, city);

    const URL = `${BASE_URL}/api/allow-expense?user_id=${my_id}&city=${city}`;
    console.log(URL);
    const res = await axios.get(URL);
    console.log(res.data);

    console.log("Allowed Expense Data:", JSON.stringify(res.data, null, 2));

    dispatch({
      type: GET_ALLOWED_EXPENSE,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching allowed expense:", error.message);
    dispatch({
      type: GET_ALLOWED_EXPENSE,
      payload: null,
    });
  }
};

export const getBillById = (my_id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/tadas/${my_id}`);

    // Extract 'tadas' from the response
    const tadas = data?.tadas;

    if (Array.isArray(tadas)) {
      dispatch({ type: GET_BILL_BY_ID, payload: tadas });
    } else {
      dispatch({ type: GET_BILL_BY_ID, payload: [] });
    }
  } catch (error) {
    console.error("Failed to fetch bills:", error);
    dispatch({ type: GET_BILL_BY_ID, payload: [] });
  }
};

export const getAllVehicles = () => async (dispatch) => {
  try {
    const response = await axios.get("${BASE_URL}/api/all-vehicles");
    console.log("Vehicles API Response:", response.data);

    const result = response.data;

    if (result.status) {
      dispatch({
        type: GET_ALL_VEHICLES,
        payload: result.data,
      });
    } else {
      console.warn("Failed to fetch vehicles:", result.message);
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error);
  }
};
