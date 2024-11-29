import {
  FETCH_PROJECTS,
  SEARCH_PROJECTS,
  VIEW_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  CHANGE_PROJECT_STATUS,
  ADD_PROJECT,
  BASE_URL,
} from '../constant';


import { projects as mockProjects } from "../../utils/faker";

export const fetchProjects = () => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/api/projects`)
  const data = await response.json()
  dispatch({
    type: FETCH_PROJECTS,
    payload: data,
  });
};

export const searchPjerocts = (searchText) => ({
  type: SEARCH_PROJECTS,
  payload: searchText,
});

export const viewProject = (projectId) => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/api/projects/${projectId}`)
  const data = await response.json()
  dispatch({ type: VIEW_PROJECT, payload: data })
}

export const updateProject = (project) => ({
  type: UPDATE_PROJECT,
  payload: project,
});

export const countProjects = () => ({
  type: COUNT_PROJECTS,
});

export const changeProjectStatus = (projectId, newStatus) => ({
  type: CHANGE_PROJECT_STATUS,
  payload: { projectId, newStatus },
});

export const addProject = (project) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
      }
    )
    const data = await response.json()
    dispatch({ type: ADD_PROJECT, payload: data.project })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
};

