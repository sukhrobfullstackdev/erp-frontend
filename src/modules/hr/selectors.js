import { createSelector } from "reselect";
import { get } from "lodash";
const entities = (state, props) => get(state, "normalizer.entities", {});
export const entitiesSelector = createSelector([entities]);
