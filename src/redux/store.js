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

// export const server = "http://localhost:8000/api/v1";
export const server = "https://quantic.onrender.com/v1";
