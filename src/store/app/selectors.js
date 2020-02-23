import { createSelector } from "reselect";

export const selectApp = state => state.app;

export const selectAppLoading = state => state.app.isLoading;

export const selectModalStatus = name => createSelector(
  selectApp,
  state => state.modals[name]
);
