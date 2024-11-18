// import { configureStore, createSlice } from '@reduxjs/toolkit'
import { initialState } from "./redux/constant";
import { vendorReducer } from "./redux/reducers/vendorReducer";
import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

const store = createStore(vendorReducer, initialState, applyMiddleware(Thunk));
export default store;
