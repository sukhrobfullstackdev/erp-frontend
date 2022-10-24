import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const list = [sagaMiddleware];
const apply = applyMiddleware(...list);
const afterCreate = (store) => {
  sagaMiddleware.run(sagas);
  return store;
};

export { apply, afterCreate, list };
