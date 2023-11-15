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
    tagfetchRequest: (state) => {
      state.loading = true;
    },
    tagfetchSuccess: (state, action) => {
      state.loading = false;
      state.allTags = action.payload.tags;
      state.message = action.payload?.message;
    },
    tagfetchFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    locationfetchRequest: (state) => {
      state.loading = true;
    },
    locationfetchSuccess: (state, action) => {
      state.loading = false;
      state.allLocations = action.payload.locations;
      state.message = action.payload.message;
    },
    locationfetchFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    statusfetchRequest: (state) => {
      state.loading = true;
    },
    statusfetchSuccess: (state, action) => {
      state.loading = false;
      state.allStatus = action.payload.status;
      state.message = action.payload.message;
    },
    statusfetchFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    violationTypefetchRequest: (state) => {
      state.loading = true;
    },
    violationTypefetchSuccess: (state, action) => {
      state.loading = false;
      state.allViolationType = action.payload.violations;
      state.message = action.payload.message;
    },
    violationTypefetchFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentRequest: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.allReports = action.payload;
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
