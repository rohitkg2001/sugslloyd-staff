



import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { taskReducer } from './redux/reducers/taskReducer';

import {  siteReducer } from './redux/reducers/siteReducer';
import { staffReducer } from './redux/reducers/staffReducer';
import { projectReducer } from './redux/reducers/projectrReducer';
import { project } from "./utils/faker";
const rootReducer = combineReducers({
    tasks: taskReducer, 
    staff: staffReducer, 
    // totalSites: totalSitesReducer,  
    project: projectReducer 
  });
  

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;