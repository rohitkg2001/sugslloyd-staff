import { 
    FETCH_PROJECTS, 
    SEARCH_PROJECTS, 
   
    VIEW_PROJECT,
    UPDATE_PROJECT,
    COUNT_PROJECTS,
    CHANGE_PROJECT_STATUS
  } from '../constants';
  
  const initialState = {
    projects: [],
    filteredProjects: [],
    searchText: '',
    currentProject: null,
    projectCount: 0
  };
  
  export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PROJECTS:
        return {
          ...state,
          projects: action.payload,
          filteredProjects: action.payload,
          projectCount: action.payload.length
        };
      case SEARCH_PROJECTS:
        return {
          ...state,
          searchText: action.payload,
          filteredProjects: state.projects.filter(project => 
            project.projectName.toLowerCase().includes(action.payload.toLowerCase())
          )
        };
     
      
      case UPDATE_PROJECT:
        return {
          ...state,
          projects: state.projects.map(project => 
            project.id === action.payload.id ? action.payload : project
          ),
          filteredProjects: state.filteredProjects.map(project => 
            project.id === action.payload.id ? action.payload : project
          ),
          currentProject: state.currentProject && state.currentProject.id === action.payload.id ? action.payload : state.currentProject
        };
      
      case VIEW_PROJECT:
        return {
          ...state,
          currentProject: state.projects.find(project => project.id === action.payload)
        };
      case COUNT_PROJECTS:
        return {
          ...state,
          projectCount: state.projects.length
        };
      case CHANGE_PROJECT_STATUS:
        return {
          ...state,
          projects: state.projects.map(project => 
            project.id === action.payload.projectId 
              ? { ...project, status: action.payload.newStatus } 
              : project
          ),
          filteredProjects: state.filteredProjects.map(project => 
            project.id === action.payload.projectId 
              ? { ...project, status: action.payload.newStatus } 
              : project
          ),
          currentProject: state.currentProject && state.currentProject.id === action.payload.projectId 
            ? { ...state.currentProject, status: action.payload.newStatus } 
            : state.currentProject
        };
      default:
        return state;
    }
  };