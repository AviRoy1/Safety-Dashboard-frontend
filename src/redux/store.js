import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import { reportReducer } from "./reducer/report";

const store = configureStore({
  reducer: {
    user: userReducer,
    report: reportReducer,
  },
});

export default store;

export const server = "https://quantic.onrender.com/api/v1";
