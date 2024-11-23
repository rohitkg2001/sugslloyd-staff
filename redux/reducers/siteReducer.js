import { VIEW_SITE, SEARCH_SITE } from "../actions/siteActions";
import { taskslistdata } from "../../utils/faker";

// Define initial state
const initialState = {
  sites: [],
  searchText: "",
  filteredTasks: taskslistdata,
  selectedTask: null,
};

// Ensure initialState is used when state is undefined
const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SITE:
      return {
        ...state,
        searchText: action.payload,
        filteredTasks: taskslistdata.filter((task) =>
          task.projectName.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case VIEW_SITE:
      return {
        ...state,
        selectedTask: action.payload,
      };
    default:
      return state;
  }
};

export { taskListReducer, initialState };
