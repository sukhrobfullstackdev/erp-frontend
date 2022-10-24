import { get } from "lodash";
import { createSelector } from "reselect";

const datePickerGlobalData = (state) => state.contextMenu.datePickerGlobalData ?? {};

export const getGlobalDatepickerData = createSelector([datePickerGlobalData], (data) => data);

export const getGlobalSelectData = createSelector(
  (state) => get(state, "contextMenu.selectGlobalData", {}),
  (data) => data
);
export const getGlobalSelectStateData = createSelector(
  (state) => get(state, "contextMenu.selectGlobalStateData", {}),
  (data) => data
);
