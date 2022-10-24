import { createSelector } from "reselect";

const contextMenu = (state) => state.contextMenu;

export const selectCollections = createSelector([contextMenu], (state, cb) => shop.collections);
