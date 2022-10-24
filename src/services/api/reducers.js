import Actions from "./actions";
import { get } from "lodash";

export default function ApiReducer(state = {}, action) {
  switch (action.type) {
    case Actions.GET_DATA.REQUEST:
      return ((action, state) => {
        const { storeName } = action.payload;
        return {
          ...state,
          [storeName]: {
            data: {
              ...get(state, `${storeName}.data`, {}),
              isFetched: false,
            },
          },
        };
      })(action, state);
    case Actions.GET_DATA.SUCCESS:
      return ((action, state) => {
        const { result, storeName } = action.payload;
        return {
          ...state,
          [storeName]: {
            data: { result, isFetched: true },
          },
        };
      })(action, state);
    case Actions.GET_DATA.FAILURE:
      return (() => {
        const { storeName, errors } = action.payload;
        return {
          ...state,
          data: {
            [storeName]: {
              isFetched: true,
              hasErrors: true,
              errors,
            },
          },
        };
      })();

    case Actions.GET_DATA.TRIGGER:
      return (() => {
        const { storeName } = action.payload;
        return {
          ...state,
          data: {
            ...get(state, "data", {}),
            [storeName]: {
              isFetched: false,
            },
          },
        };
      })();

    case Actions.TEMP_DATA.REQUEST:
      return ((action, state) => {
        const { storeName = "tempData" } = action.payload;
        return {
          ...state,
          [storeName]: get(state, storeName, ""),
        };
      })(action, state);
    case Actions.TEMP_DATA.SUCCESS:
      return ((action, state) => {
        const { item, storeName = "tempData" } = action.payload;
        return {
          ...state,
          [storeName]: item,
        };
      })(action, state);
    case Actions.TEMP_DATA.FAILURE:
      return ((action, state) => {
        const { storeName = "tempData" } = action.payload;
        return {
          ...state,
          [storeName]: get(state, storeName, ""),
        };
      })(action, state);

    case Actions.GLOBAL_MODAL.REQUEST:
      return ((action, state) => {
        const { position, body, storeName = "global-modal", props } = action.payload;
        return {
          ...state,
          [storeName]: get(state, storeName, ""),
        };
      })(action, state);
    case Actions.GLOBAL_MODAL.SUCCESS:
      return ((action, state) => {
        const { position, body, storeName = "global-modal", props } = action.payload;
        return {
          ...state,
          [storeName]: {
            position,
            body,
            props,
          },
        };
      })(action, state);
    case Actions.GLOBAL_MODAL.FAILURE:
      return ((action, state) => {
        const { position, body, storeName = "global-modal", props } = action.payload;
        return {
          ...state,
          [storeName]: get(state, storeName, ""),
        };
      })(action, state);

    default:
      return state;
  }
}
