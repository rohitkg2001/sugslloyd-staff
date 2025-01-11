import { UPDATE_TASK, VIEW_TASK, INITIALIZE_TASKS } from "../constant";

const initialState = {
  tasks: [],
  currentTask: null,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_TASKS:
      return { ...state, tasks: action.payload };
    case UPDATE_TASK:
      return { ...state, tasks: action.payload };
    case VIEW_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    default:
      return state;
  }
};
