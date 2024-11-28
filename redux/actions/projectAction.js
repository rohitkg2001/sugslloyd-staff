import {
  FETCH_PROJECTS,
  SEARCH_PROJECTS,
  VIEW_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  CHANGE_PROJECT_STATUS,
  ADD_PROJECT,
} from '../constant';

import { projects as mockProjects } from "../../utils/faker";

export const fetchProjects = () => {
  return (dispatch) => {
    // Simulating an API call with a small delay
    setTimeout(() => {
      dispatch({
        type: FETCH_PROJECTS,
        payload: mockProjects,
      });
    }, 100);
  };
};

export const searchPjerocts = (searchText) => ({
  type: SEARCH_PROJECTS,
  payload: searchText,
});

export const viewProject = (projectId) => ({
  type: VIEW_PROJECT,
  payload: projectId,
});

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
} );

export const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project,
});

