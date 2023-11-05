import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.use = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
