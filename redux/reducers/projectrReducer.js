import {
  FETCH_PROJECTS,
  VIEW_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  ADD_PROJECT,
  ADD_CONVEYANCE,
} from "../constant";

const initialState = {
  projects: [],
  filteredProjects: [],
  currentProject: null,
  projectCount: 0,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case FETCH_PROJECTS:
      return { ...state, projects: action.payload };
    case VIEW_PROJECT:
      return { ...state, currentProject: action.payload };
    case UPDATE_PROJECT:
      return { ...state, project: action.payload };
    case COUNT_PROJECTS:
      return {
        ...state,
        projectCount: state.projects.length,
      };
    case ADD_CONVEYANCE:
      return {
        ...state,
        conveyances: [...state.conveyances, action.payload],
      };
    default:
      return state;
  }
};
