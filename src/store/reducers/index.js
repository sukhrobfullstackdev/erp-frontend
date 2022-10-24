import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import normalizer from "./../../services/normalizer/reducers";
import auth from "./../../modules/auth/reducers";
import settings from "../../modules/settings/reducers";
import api from "../../services/api/reducers";
import contextMenu from "../../services/globalContextMenu/reducers";

const rootReducer = combineReducers({
  auth,
  normalizer,
  settings,
  api,
  contextMenu,
});

const persistConfig = {
  key: "storage",
  whitelist: ["auth", "settings"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
