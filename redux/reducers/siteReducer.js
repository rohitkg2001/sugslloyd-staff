import { VIEW_SITE, SEARCH_SITE } from "../actions/siteActions";
import { taskslistdata } from "../../utils/faker";

const initialState = {
  searchText: "",
  filteredTasks: taskslistdata,
  selectedTask: null,
};

const siteReducer = (state, action) => {
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

export { siteReducer, initialState };