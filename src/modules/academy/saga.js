import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import Actions from "./actions";
import SettingsActions from "../settings/actions";
import ApiService from "./api";
import { showError } from "../../utils";

function* changeOrder(action) {
  const {
    payload: {
      attributes: { id, ...rest },
      url,
      formMethods: { setError = () => {} },
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;

  try {
    yield put({ type: SettingsActions.SET_LOADER.REQUEST });
    const { data } = yield call(ApiService.ChangeOrder, url, id, rest);
    yield put({ type: Actions.CHANGE_ORDER.SUCCESS, payload: { data } });
    yield put({ type: SettingsActions.SET_LOADER.SUCCESS });
    yield call(cb.success, { ...data });
  } catch (e) {
    yield put({ type: Actions.CHANGE_ORDER.FAILURE });
    yield put({ type: SettingsActions.SET_LOADER.SUCCESS });
    showError(e, setError);
  }
}

function* setRedionOption(action) {
  const { open = null } = action.payload;
  try {
    yield put({ type: Actions.REGION_OPTIONS.SUCCESS, payload: { open } });
  } catch (e) {
    yield put({
      type: Actions.SET_OPEN_SIDEBAR.FAILURE,
    });
  }
}

export default function* sagas() {
  yield all([takeLatest(Actions.CHANGE_ORDER.REQUEST, changeOrder)]);
}
