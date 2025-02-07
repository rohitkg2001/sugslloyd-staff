import { UPDATE_TASK, VIEW_TASK, INITIALIZE_TASKS, TOTAL_PENDING_STREETLIGHT, GET_PENDING_STREETLIGHTS, GET_SURVEYED_STREETLIGHTS, TOTAL_SURVEYED_STREETLIGHTS, GET_INSTALLED_STREETLIGHTS, TOTAL_INSTALLED_STREETLIGHTS } from "../constant";

const initialState = {
  tasks: [],
  currentTask: null,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        currentTask:
          state.currentTask && state.currentTask.id === action.payload.id
            ? action.payload
            : state.currentTask,
      };
    case VIEW_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    case TOTAL_PENDING_STREETLIGHT:
      return { ...state, pendingStreetLightCounts: action.payload }
    case GET_PENDING_STREETLIGHTS:
      return { ...state, pendingStreetLights: action.payload }
    case GET_SURVEYED_STREETLIGHTS:
      return { ...state, surveyedStreetLights: action.payload }
    case TOTAL_SURVEYED_STREETLIGHTS:
      return { ...state, surveyedStreetLightCounts: action.payload }
    case GET_INSTALLED_STREETLIGHTS:
      return { ...state, installedStreetLights: action.payload }
    case TOTAL_INSTALLED_STREETLIGHTS:
      return { ...state, installedStreetLightCounts: action.payload }
    default:
      return state;
  }
};
