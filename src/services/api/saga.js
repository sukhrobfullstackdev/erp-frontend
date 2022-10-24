import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { get, isFunction, isNull } from "lodash";
import Actions from "./actions";
import Api from "./api";
import Normalizer from "../normalizer";
import NormalizerAction from "../normalizer/actions";
import { showError } from "../../utils";

function* getAll(action) {
  const {
    url,
    config,
    method = "get",
    scheme,
    storeName,
    entityName,
    infinite = false,
    isChangeListState = true,
    cb = {
      success: () => {},
      fail: () => {},
    },
    setDataOnlyEntities = false,
  } = action.payload;
  try {
    const { data } = yield call(Api.getAll, url, config, method);
    let normalizedData = {};
    if (isChangeListState) {
      normalizedData = yield call(Normalizer.Normalize, data, scheme);
      yield put({
        type: NormalizerAction.NORMALIZE.REQUEST,
        payload: {
          ...normalizedData,
          storeName,
          entityName,
          infinite,
          setDataOnlyEntities,
        },
      });
    }

    yield put({ type: Actions.GET_ALL.SUCCESS, payload: normalizedData });
    yield call(cb.success, normalizedData, data);
  } catch (e) {
    yield put({
      type: Actions.GET_ALL.FAILURE,
      payload: { storeName, errors: e?.response?.data },
    });
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: { storeName, errors: e?.response?.data },
    });
    showError(e, (e) => "", false);
    yield call(cb.fail, e);
  }
}
function* getAllTrigger(action) {
  const {
    payload: { storeName },
  } = action;
  yield put({
    type: NormalizerAction.NORMALIZE.TRIGGER,
    payload: { storeName },
  });
}
function* getOneTrigger(action) {
  const {
    payload: { storeName },
  } = action;
  yield put({
    type: NormalizerAction.NORMALIZE.TRIGGER,
    payload: { storeName },
  });
}
function* getOne(action) {
  const {
    payload: { url, config, scheme = {}, storeName, entityName, callback },
  } = action;
  try {
    const { data } = yield call(Api.getOne, url, config);

    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName, entityName },
    });
    try {
      yield call(callback, data);
    } catch (e) {}
    yield put({ type: Actions.GET_ONE.SUCCESS, payload: normalizedData });
  } catch (e) {
    yield put({
      type: Actions.GET_ONE.FAILURE,
      payload: { storeName, errors: e.response },
    });
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: { storeName, errors: e.response },
    });
    showError(e, (e) => "", false);
  }
}

function* getData(action) {
  const {
    url,
    storeName,
    method = "post",
    isChangeState = true,
    config = {},
    cb = {
      success: () => {},
      fail: () => {},
    },
  } = action.payload;
  try {
    const { data } = yield call(Api.getData, url, config, method);
    if (isChangeState) {
      yield put({
        type: Actions.GET_DATA.SUCCESS,
        payload: { result: data, storeName },
      });
    }

    try {
      yield call(cb.success, data);
    } catch (e) {}
  } catch (e) {
    yield put({
      type: Actions.GET_DATA.FAILURE,
      payload: { storeName, errors: e?.response?.data },
    });
    showError(e, (e) => "", false);
    yield call(cb.fail, e);
  }
}

function* getDataTrigger(action) {
  const {
    payload: { storeName },
  } = action;
  yield put({ type: Actions.GET_DATA.TRIGGER, payload: { storeName } });
}

function* deleteItemRequest(action) {
  const {
    payload: {
      id,
      url,
      config = {},
      formMethods = {},
      scheme = {},
      storeName,
      entityName,
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;
  try {
    const { data } = yield call(Api.operationDelete, url, config);
    yield call(cb.success, data);
    yield put({
      type: Actions.OPERATION_DELETE.SUCCESS,
      payload: { id, storeName, scheme, entityName },
    });
  } catch (e) {
    yield put({
      type: Actions.OPERATION_DELETE.FAILURE,
    });
    const isField = false;
    showError(e, () => {}, isField);
  }
}

function* addItemRequest(action) {
  const {
    payload: {
      attributes,
      url,
      formMethods: { setError = () => {} },
      scheme = {},
      storeName,
      entityName,
      cb = {
        success: () => {},
        fail: () => {},
      },
      isChangeListState = true,
      infinite = false,
      additionalStoreNameKey = "-create",
    },
  } = action;
  try {
    const { data } = yield call(Api.operationAdd, url, attributes);
    let normalizedData = {};
    if (isChangeListState) {
      normalizedData = yield call(Normalizer.Normalize, data, scheme);
      yield put({
        type: NormalizerAction.NORMALIZE.REQUEST,
        payload: {
          ...normalizedData,
          storeName: `${entityName}${additionalStoreNameKey}`,
          entityName: entityName,
          infinite,
        },
      });
      yield put({
        type: Actions.OPERATION_ADD.SUCCESS,
        payload: { ...normalizedData, storeName, scheme, entityName },
      });
    }
    yield call(cb.success, normalizedData, data);
  } catch (e) {
    yield put({
      type: Actions.OPERATION_ADD.FAILURE,
    });
    yield call(cb.fail, e?.response?.data);
    const isField = false;
    showError(e, setError, isField);
  }
}

function* updateItemRequest(action) {
  const {
    payload: {
      attributes,
      url,
      method = "put",
      formMethods: { setError = () => {} },
      scheme = {},
      storeName,
      entityName,
      isChangeListState = true,
      cb = {
        success: () => {},
        fail: () => {},
      },
      isStoreUpdate = true,
      setResponseToEntity = false,
    },
  } = action;

  try {
    const { data } = yield call(Api.operationUpdate, url, attributes, method);
    if (isChangeListState) {
      const normalizedData = yield call(Normalizer.Normalize, data, scheme);

      yield put({
        type: NormalizerAction.NORMALIZE.REQUEST,
        payload: {
          ...normalizedData,
          ...(isStoreUpdate ? { storeName: storeName || `${entityName}-update` } : {}),
          entityName: entityName,
        },
      });

      yield put({ type: Actions.OPERATION_UPDATE.SUCCESS });
      yield call(cb.success, normalizedData, data);
    } else {
      yield put({ type: Actions.OPERATION_UPDATE.SUCCESS });
      yield call(cb.success, data);
    }
    if (setResponseToEntity && isFunction(setResponseToEntity)) {
      yield call(setResponseToEntity, get(data, "data", {}));
    }
  } catch (e) {
    yield put({
      type: Actions.OPERATION_UPDATE.FAILURE,
    });
    showError(e, (e) => "", false);
    yield call(cb.fail, e);
  }
}

function* request(action) {
  const {
    payload: {
      attributes,
      url,
      method = "get",
      formMethods = {},
      cb = {
        success: () => {},
        fail: () => {},
      },
      config,
    },
  } = action;
  try {
    const { data } = yield call(Api.request, url, attributes, method, config);
    yield call(cb.success, data);
    yield put({ type: Actions.REQUEST.SUCCESS });
  } catch (e) {
    yield put({
      type: Actions.REQUEST.FAILURE,
    });
    showError(e, (e) => "", false);
    yield call(cb.fail, e?.response?.data);
  }
}

function* getAllForBoardViewAndListView(action) {
  const {
    url,
    config,
    method = "get",
    scheme,
    storeName,
    entityName,
    infinite = false,
    cb = {
      success: () => {},
      fail: () => {},
    },
  } = action.payload;
  try {
    const { data } = yield call(Api.getAll, url, config, method);

    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName, entityName, infinite },
    });
    yield put({ type: Actions.GET_ALL.SUCCESS, payload: normalizedData });
    yield call(cb.success, normalizedData, data);
  } catch (e) {
    yield put({
      type: Actions.GET_ALL.FAILURE,
      payload: { storeName, errors: e?.response?.data },
    });
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: { storeName, errors: e?.response?.data },
    });
    showError(e, (e) => "", false);
    yield call(cb.fail, e);
  }
}

function* setTempData(action) {
  const { item = null, storeName = "tempData" } = action.payload;
  try {
    yield put({
      type: Actions.TEMP_DATA.SUCCESS,
      payload: { item, storeName },
    });
  } catch (e) {
    yield put({
      type: Actions.TEMP_DATA.FAILURE,
      payload: { item, storeName },
    });
  }
}

function* setGlobalModal(action) {
  const { position = false, body = null, storeName = "global-modal", props = {} } = action.payload;
  try {
    yield put({
      type: Actions.GLOBAL_MODAL.SUCCESS,
      payload: { storeName, position, body, props },
    });
  } catch (e) {
    yield put({
      type: Actions.GLOBAL_MODAL.FAILURE,
      payload: { storeName, position, body, props },
    });
  }
}

export default function* sagas() {
  yield all([
    takeEvery(Actions.GET_ALL.REQUEST, getAll),
    takeEvery(Actions.GET_ONE.REQUEST, getOne),
    takeEvery(Actions.GET_ALL.TRIGGER, getAllTrigger),
    takeEvery(Actions.GET_ONE.TRIGGER, getOneTrigger),
    takeEvery(Actions.GET_DATA.REQUEST, getData),
    takeEvery(Actions.GET_DATA.TRIGGER, getDataTrigger),
    takeEvery(Actions.OPERATION_DELETE.REQUEST, deleteItemRequest),
    takeEvery(Actions.OPERATION_ADD.REQUEST, addItemRequest),
    takeEvery(Actions.OPERATION_UPDATE.REQUEST, updateItemRequest),
    takeEvery(Actions.REQUEST.REQUEST, request),
    takeEvery(Actions.GET_DATA_FOR_BOARD_VIEW_AND_LIST_VIEW.REQUEST, getAllForBoardViewAndListView),
    takeLatest(Actions.TEMP_DATA.REQUEST, setTempData),
    takeLatest(Actions.GLOBAL_MODAL.REQUEST, setGlobalModal),
  ]);
}
