import { combineReducers } from "@reduxjs/toolkit";
import stockSlice from "./stockSlice";

export const rootReducer = combineReducers({
  stock: stockSlice,
})