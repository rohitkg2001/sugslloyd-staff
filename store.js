import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./redux/reducers";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
