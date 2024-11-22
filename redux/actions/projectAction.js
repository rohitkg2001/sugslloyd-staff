import { 
    FETCH_PROJECTS, 
    SEARCH_PROJECTS, 
    VIEW_PROJECT,
    UPDATE_PROJECT,
    COUNT_PROJECTS,
    CHANGE_PROJECT_STATUS
  } from '../constant';
  
  import { project as mockProjects } from "../../utils/faker";
  
  export const fetchProjects = () => {
    return {
      type: FETCH_PROJECTS,
      payload: mockProjects
    };
  };
  
  export const searchProjects = (searchText) => {
    return {
      type: SEARCH_PROJECTS,
      payload: searchText
    };
  };
 
  
  export const viewProject = (projectId) => {
    return {
      type: VIEW_PROJECT,
      payload: projectId
    };
  };
  
  export const updateProject = (project) => {
    return {
      type: UPDATE_PROJECT,
      payload: project
    };
  };
  
  export const countProjects = () => {
    return {
      type: COUNT_PROJECTS
    };
  };
  
  export const changeProjectStatus = (projectId, newStatus) => {
    return {
      type: CHANGE_PROJECT_STATUS,
      payload: { projectId, newStatus }
    };
  };