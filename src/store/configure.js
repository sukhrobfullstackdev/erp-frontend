import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import reducers from "./reducers";
import { apply, afterCreate } from "./middlewares";

export default function configureStore(initialState = {}) {
  const Apply = () => {
    if (process.env.NODE_ENV === "development") return composeWithDevTools(apply);
    else return apply;
  };

  let store = afterCreate(createStore(reducers, Apply()));
  let persistor = persistStore(store);
  return { store, persistor };
}
