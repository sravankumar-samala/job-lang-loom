import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobsReducer";

export const store = configureStore({
  reducer: jobsReducer,
});
