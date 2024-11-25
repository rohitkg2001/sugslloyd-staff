<<<<<<< HEAD
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { taskReducer } from "./redux/reducers/taskReducer";
import { siteReducer } from "./redux/reducers/siteReducer";
import { staffReducer } from "./redux/reducers/staffReducer";
import { projectReducer } from "./redux/reducers/projectrReducer";
=======
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { taskReducer } from './redux/reducers/taskReducer';
import { siteReducer } from './redux/reducers/siteReducer';
import { staffReducer } from './redux/reducers/staffReducer';
import { projectReducer } from './redux/reducers/projectrReducer';
import { inventoryReducer } from './redux/reducers/inventoryReducer';
import { vendorReducer } from './redux/reducers/vendorReducer';
>>>>>>> 3bdc52102b39f666d6730fa05aef993e3abf44dd
import { project } from "./utils/faker";

const rootReducer = combineReducers({
<<<<<<< HEAD
  tasks: taskReducer,
  staff: staffReducer,
  site: siteReducer,
  project: projectReducer,
=======
    tasks: taskReducer,
    staff: staffReducer,
    site: siteReducer,
    project: projectReducer, 
    vendor: vendorReducer,
    inventory: inventoryReducer,
>>>>>>> 3bdc52102b39f666d6730fa05aef993e3abf44dd
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
