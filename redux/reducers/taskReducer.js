import { UPDATE_TASK, VIEW_TASK, INITIALIZE_TASKS } from "../constant";

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
        currentTask: state.tasks.find((task) => task.id === action.payload),
      };
    default:
      return state;
  }
};
