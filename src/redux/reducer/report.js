import { createReducer } from "@reduxjs/toolkit";

export const reportReducer = createReducer(
  {},
  {
    reportfetchRequest: (state) => {
      state.loading = true;
    },
    reportfetchSuccess: (state, action) => {
      state.loading = false;
      state.allReports = action.payload.reports;
      state.message = action.payload.message;
    },
    reportfetchFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentRequest: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.allReports = action.payload.reports;
      state.message = action.payload.message;
    },
    addCommentFailed: (state, action) => {
      state.loading = false;
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
