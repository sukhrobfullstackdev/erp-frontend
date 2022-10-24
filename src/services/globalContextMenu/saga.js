// import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
// import { get, isFunction, isNull } from "lodash";
// import Actions from "./actions";
// import Api from "./api";
// import Normalizer from "../normalizer";
// import NormalizerAction from "../normalizer/actions";

// function* setTempData(action) {
//   const { item = null, storeName = "tempData" } = action.payload;
//   try {
//     yield put({
//       type: Actions.TEMP_DATA.SUCCESS,
//       payload: { item, storeName },
//     });
//   } catch (e) {
//     yield put({
//       type: Actions.TEMP_DATA.FAILURE,
//       payload: { item, storeName },
//     });
//   }
// }

// export default function* sagas() {
//   yield all([takeLatest(Actions.TEMP_DATA.REQUEST, setTempData)]);
// }
