import {
  FETCH_PROJECTS,
  SEARCH_PROJECTS,
  VIEW_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  CHANGE_PROJECT_STATUS,
  ADD_PROJECT,
  BASE_URL,
} from "../constant";

export const getStateById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/fetch-states`, {
    method: "POST",
  });
  const data = await response.json();
  const state = await data?.states.find((item) => item.id === id);
  return state.name;
};

export const fetchProjects = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects`);
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Ensure data is an array before filtering
    if (!Array.isArray(data)) {
      throw new Error('Expected an array of projects but got something else');
    }
    const myProjects = data.filter((project, index) => project.project_type !== "1")
    console.log(myProjects)
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


// export const viewProject = (projectId) => async (dispatch) => {
//   try {
//     setTimeout(() => {
//       const getData = async () => {
//         const response = await fetch(`${BASE_URL}/api/projects/${projectId}`);
//         const data = await response.json();
//         dispatch({ type: VIEW_PROJECT, payload: data });
//       };
//       getData();
//     }, 1500);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const updateProject = (project) => ({
//   type: UPDATE_PROJECT,
//   payload: project,
// });

// export const countProjects = () => ({
//   type: COUNT_PROJECTS,
// });

// export const changeProjectStatus = (projectId, newStatus) => ({
//   type: CHANGE_PROJECT_STATUS,
//   payload: { projectId, newStatus },
// });

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
