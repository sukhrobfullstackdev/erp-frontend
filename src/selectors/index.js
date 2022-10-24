import { createSelector } from "reselect";
import { get } from "lodash";

export const getEntities = createSelector(
  (state) => get(state, "normalizer.entities", {}),
  (entities) => entities
);
export const getViewTypesList = createSelector(
  (state) => get(state, "normalizer.data.view-types-list", {}),
  (data) => data
);
export const getView = createSelector(
  (state) => get(state, "normalizer.data.view-one", {}),
  (data) => data
);
export const getIdList = createSelector(
  (state) => get(state, "api.data.view-data-id-list", {}),
  (data) => data
);
export const getViewData = createSelector(
  (state, props) => get(state, `normalizer.data.${props.entityName}-view-data-list`, {}),
  (data) => data
);
