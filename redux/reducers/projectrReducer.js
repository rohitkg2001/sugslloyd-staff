import {
  FETCH_PROJECTS,
  VIEW_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  ADD_PROJECT,
  ADD_CONVEYANCE,
  ADD_BILL,
  GET_ALL_BILLS,
  GET_ALL_CONVEYANCE,
  GET_CONVEYANCE_BY_ID,
  GET_BILL_BY_ID,
  GET_ALL_VEHICLES,
} from "../constant";

const initialState = {
  projects: [],
  filteredProjects: [],
  currentProject: null,
  projectCount: 0,
  conveyanceList: [],
  bills: [],
  vehicles: [],
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
    case ADD_BILL:
      return {
        ...state,
        billData: [...state.billData, action.payload],
      };
    case GET_ALL_CONVEYANCE:
      return {
        ...state,
        conveyanceList: action.payload,
      };

    case GET_CONVEYANCE_BY_ID:
      return {
        ...state,
        conveyances: action.payload,
      };

    case GET_BILL_BY_ID:
      return { ...state, bills: action.payload };
    case GET_ALL_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };

    default:
      return state;
  }
};
