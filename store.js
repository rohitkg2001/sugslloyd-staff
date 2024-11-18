// // import { configureStore, createSlice } from '@reduxjs/toolkit'
import { initialState } from "./redux/constant";
import { staffReducer } from "./redux/reducers/staffReducer";
import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

const store = createStore(staffReducer, initialState, applyMiddleware(Thunk));
export default store;
