import { all, call, put, takeLatest } from "redux-saga/effects";
import Actions from "./actions";
import { get } from "lodash";
import ApiService from "./api";
import { showError } from "../../utils";
import configure from "./../../i18n/configure";

const i18n = configure();

function* setMenuItemActiveId(action) {
  const { id = null } = action.payload;
  try {
    yield put({
      type: Actions.SET_ACTIVE_MENU_ITEM_ID.SUCCESS,
      payload: { id },
    });
  } catch (e) {
    yield put({
      type: Actions.SET_ACTIVE_MENU_ITEM_ID.FAILURE,
    });
  }
}

function* setOpenSubmenu(action) {
  const { open = null } = action.payload;
  try {
    yield put({
      type: Actions.SET_OPEN_SUBMENU.SUCCESS,
      payload: { open },
    });
  } catch (e) {
    yield put({
      type: Actions.SET_OPEN_SUBMENU.FAILURE,
    });
  }
}

function* setOpenSidebar(action) {
  const { open = null } = action.payload;
  try {
    yield put({
      type: Actions.SET_OPEN_SIDEBAR.SUCCESS,
      payload: { open },
    });
  } catch (e) {
    yield put({
      type: Actions.SET_OPEN_SIDEBAR.FAILURE,
    });
  }
}

function* setBreadcrumbItem(action) {
  const { item = null } = action.payload;
  try {
    yield put({
      type: Actions.ADD_BREADCRUMB_ITEM.SUCCESS,
      payload: { item },
    });
    yield put({
      type: Actions.SET_ACTIVE_BREADCRUMB_ITEM.SUCCESS,
      payload: { pathname: get(item, "url", null) },
    });
  } catch (e) {
    yield put({
      type: Actions.SET_ACTIVE_BREADCRUMB_ITEM.FAILURE,
    });
  }
}
function* setActiveBreadcrumbItem(action) {
  const { pathname = null } = action.payload;

  try {
    yield put({
      type: Actions.SET_ACTIVE_BREADCRUMB_ITEM.SUCCESS,
      payload: { pathname },
    });
  } catch (e) {
    yield put({
      type: Actions.SET_ACTIVE_BREADCRUMB_ITEM.FAILURE,
    });
  }
}

function* removeBreadcrumbItem(action) {
  const { items = [] } = action.payload;
  try {
    yield put({
      type: Actions.REMOVE_BREADCRUMB_ITEM.SUCCESS,
      payload: { items },
    });
  } catch (e) {
    yield put({
      type: Actions.REMOVE_BREADCRUMB_ITEM.FAILURE,
    });
  }
}

function* changeModuleOrDepartmentOrPageOrder(action) {
  const {
    payload: {
      attributes,
      formMethods: { setError = () => {} },
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;

  try {
    const { data } = yield call(ApiService.ChangeModuleOrDepartmentOrPageOrder, attributes);
    yield put({
      type: Actions.CHANGE_MODULE_OR_DEPARTMENT_OR_PAGE_ORDER.SUCCESS,
      payload: { data },
    });
    // yield call(cb.success,{...data});
  } catch (e) {
    yield put({
      type: Actions.CHANGE_MODULE_OR_DEPARTMENT_OR_PAGE_ORDER.FAILURE,
    });
    showError(e, setError);
  }
}

function* updateModuleOrDepartmentOrPageTitle(action) {
  const {
    payload: {
      attributes,
      formMethods: { setError = () => {} },
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;

  try {
    yield put({ type: Actions.SET_LOADER.REQUEST });
    const { data } = yield call(ApiService.UpdateModuleOrDepartmentOrPageTitle, attributes);
    yield put({
      type: Actions.UPDATE_MODULE_OR_DEPARTMENT_OR_PAGE_TITLE.SUCCESS,
      payload: { data },
    });
    yield put({ type: Actions.SET_LOADER.SUCCESS });
    yield call(cb.success, { ...data });
  } catch (e) {
    yield put({
      type: Actions.UPDATE_MODULE_OR_DEPARTMENT_OR_PAGE_TITLE.FAILURE,
    });
    yield put({ type: Actions.SET_LOADER.SUCCESS });
    const isField = false;
    showError(e, setError, isField);
  }
}

function* setLang(action) {
  const {
    lang,
    cb = {
      success: () => {},
      fail: () => {},
    },
  } = action.payload;
  try {
    yield put({ type: Actions.SET_LANG.SUCCESS, payload: { lang } });
    i18n.changeLanguage(lang);
    yield call(cb.success);
  } catch (e) {
    yield put({
      type: Actions.SET_LANG.FAILURE,
    });
    yield call(cb.fail);
    showError(e);
  }
}

function* fileUpload(action) {
  const {
    payload: {
      attributes,
      url = `attachment/v1/attachment/upload`,
      formMethods: { setLoading, setError = () => {} },
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;

  try {
    const {
      data: { data },
    } = yield call(ApiService.FileUpload, attributes, url);
    yield put({ type: Actions.FILE_UPLOAD.SUCCESS, payload: { data } });
    yield call(cb.success, data);
  } catch (e) {
    yield put({ type: Actions.FILE_UPLOAD.FAILURE });
    yield call(cb.fail, e);
    showError(e, setError);
  }
}

export default function* sagas() {
  yield all([
    takeLatest(Actions.SET_ACTIVE_MENU_ITEM_ID.REQUEST, setMenuItemActiveId),
    takeLatest(Actions.SET_OPEN_SUBMENU.REQUEST, setOpenSubmenu),
    takeLatest(Actions.SET_OPEN_SIDEBAR.REQUEST, setOpenSidebar),
    takeLatest(Actions.ADD_BREADCRUMB_ITEM.REQUEST, setBreadcrumbItem),
    takeLatest(Actions.SET_ACTIVE_BREADCRUMB_ITEM.REQUEST, setActiveBreadcrumbItem),
    takeLatest(Actions.REMOVE_BREADCRUMB_ITEM.REQUEST, removeBreadcrumbItem),
    takeLatest(Actions.CHANGE_MODULE_OR_DEPARTMENT_OR_PAGE_ORDER.REQUEST, changeModuleOrDepartmentOrPageOrder),
    takeLatest(Actions.UPDATE_MODULE_OR_DEPARTMENT_OR_PAGE_TITLE.REQUEST, updateModuleOrDepartmentOrPageTitle),
    takeLatest(Actions.SET_LANG.REQUEST, setLang),
    takeLatest(Actions.FILE_UPLOAD.REQUEST, fileUpload),
  ]);
}
