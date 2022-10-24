import { all } from "redux-saga/effects";
import normalizer from "./../../services/normalizer/saga";
import api from "./../../services/api/saga";
import auth from "./../../modules/auth/saga";
import settings from "./../../modules/settings/saga";
import academic from "./../../modules/academy/saga";
export default function* sagas() {
  yield all([auth(), normalizer(), api(), settings(), academic()]);
}
